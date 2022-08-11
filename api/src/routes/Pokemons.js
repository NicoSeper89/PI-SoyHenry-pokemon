const { Router } = require('express');
const axios = require("axios");
const { Op } = require("sequelize");
const {Pokemon, Tipo} = require('../db');

const router = Router();

const pokemonInfo = (data) => {return {
                                 id: data.id,
                                 name: data.name,
                                 hp: data.stats[0].base_stat,
                                 attack: data.stats[1].base_stat,
                                 defense: data.stats[2].base_stat,
                                 speed: data.stats[5].base_stat,
                                 height: data.height,
                                 weight: data.weight,
                                 img: data.sprites.other["official-artwork" ].front_default,
                                 types: data.types.map(t => t.type.name)}
} 

router.get("/", async (req, res) => {

    const {name} = req.query;
    
    if (!name) {
        try {//Request a PokeApi para obtener url con info de los 40 pokemons principales
            let pokeInfoApi = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`)
                                         .then(r => r.data.results)

            //Request a las url's obtenidas antes 
            pokeInfoApi =  pokeInfoApi.map((p) => axios.get(p.url)
                                                       .then((r) => {let info = pokemonInfo(r.data);
                                                                    return {id: info.id,
                                                                            name : info.name,
                                                                            img: info.img,
                                                                            types: info.types,
                                                                            attack: info.attack}
                                                                            }));
                                                                        
            pokeInfoApi = await Promise.all(pokeInfoApi);
            
            //Request a DB para obtener las instancias del modelo "Pokemon" 
            //Incluye asociaciones que tiene con "Tipo" mediante "Pokemon_Tipos"

            let pokeInfoDb = await Pokemon.findAll({
                                                    include: {
                                                        model: Tipo,
                                                         as: 'types',
                                                         attributes: ["name"],
                                                         through: {
                                                             attributes: []
                                                         }
                                                    }});    
            

            pokeInfoDb = pokeInfoDb.map(p => {let info = p.toJSON();
                                              return {
                                                id: info.id,
                                                name: info.name,
                                                img: info.img,
                                                types: info.types,
                                                attack: info.attack
                                              }})

            pokeInfoDb.forEach(p => { if (p.types.length > 1) {p.types = [p.types[0].name, p.types[1].name];}
                                      else {p.types = [p.types[0].name]}
                                    });
            
            return res.json(pokeInfoApi.concat(pokeInfoDb))

        } 
        catch (err) { 
            return res.status(404).json(err.message)
        }
    }
    else if (name) {
        try{//Request a DB para obtener la instancia de "Pokemon" que coincida su propiedad name con el name pasado por query
            let pokemonDb = await Pokemon.findOne({
                where: { name },
                include: {
                     model: Tipo,
                     as: 'types',
                     attributes: ["name"],
                     through: {
                         attributes: []
                        }
                    }
                });
            
            //Si una instancia tiene como propiedad name el mismo name que se paso por query, devuelve esa instancia
            if (pokemonDb) {pokemonDb = pokemonDb.toJSON();

                            if(pokemonDb.types.length > 1){
                                pokemonDb.types = [pokemonDb.types[0].name, pokemonDb.types[1].name]
                            }else{
                                pokemonDb.types = [pokemonDb.types[0].name]
                            }

                            return res.json(pokemonDb)
                        };

            

            //Si no se encontro la instancia en DB, request a pokeApi para buscar un pokemon con ese nombre
            let searchedPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                                             .then(r => r.data);

            //Si pokeApi devuelve la info del pokemon, la devolvemos. Si no hay info en la busque anterior, enviamos una res con status 404.
            return res.json(pokemonInfo(searchedPokemon))

        } catch (err) {
            return res.status(404).json(err.message)
        }
    }

})

router.get("/:id", async (req, res) =>{

    try {
        let {id} = req.params;

        // Si el id enviado en la request tiene guiones es un id UUID de pokemones creados en la DB
        if (id.includes("-")) {
            //Buscar instancia con ese id UUID en la DB
            let pokemonDb = await Pokemon.findOne({
                where: { id },
                include: {
                     model: Tipo,
                     as: 'types',
                     attributes: ["name"],
                     through: {
                         attributes: []
                        }
                    }
                });
            
            //Si se encontro instancia, la devuelve
            if (pokemonDb) {pokemonDb = pokemonDb.toJSON();
                if(pokemonDb.types.length > 1){
                    pokemonDb.types = [pokemonDb.types[0].name, pokemonDb.types[1].name]
                }else{
                    pokemonDb.types = [pokemonDb.types[0].name]
                }
                return res.json(pokemonDb)
            };

            //Si no se encontro instancia se envia un msj con status 404
            return res.status(404).json("no se encontro el pokemon");
        
        } else {
            
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                                       .then((r) => r.data)
    
            res.json(pokemonInfo(pokemon))
        }
        

    } catch (err) {
        return res.status(404).json(err.message)
    }
})

router.post("/", async (req, res) => {
    
    const {name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    
    try {    
    //Si no hay name o no hay type en el body pasado en la request, retorna msj con status 404 
    if (!types.length || !name) return res.status(404).send("Falta informacion para crear un Pokemon");

        //Crear nuevo Pokemon en DB
        const newPokemon = await Pokemon.create({
                                                 name,
                                                 hp,
                                                 attack,
                                                 defense,
                                                 speed,
                                                 height,
                                                 weight,
                                                 img: img? img : "https://www.topofarmer.com/wp-content/uploads/2013/05/whos-that-pokemon.png" 
                                                }); 

        //Buscar en DB los id de los Tipos que tengan el/los names que se pasaron por body
        const pokemonTypes = await Tipo.findAll({
                                            where: {
                                            [Op.or]: !types[1]? [{ name: types[0] }]:
                                                                [{ name: types[0] },{ name: types[1]}]
                                            }
                                        })
                                       .then(arrTypes => arrTypes.map(type => type.id))
        
        //Asocio los id de los Tipos con el Pokemon creado (el Pokemon pertenece a esos Tipos de Pokemon)
        await newPokemon.addTypes(pokemonTypes)

        return res.status(201).json(true)

    } catch (err) {
        return res.status(404).json(err.message)
    }
})

module.exports = router; 

// [ ] GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal

// [ ] POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.

// -----------------------------------------------------------------------------------------------
// [ ] GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

// [ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado
