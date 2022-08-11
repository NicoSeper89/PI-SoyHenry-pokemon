const { Router } = require('express');
const axios = require("axios");
const {Pokemon, Tipo} = require('../db');

const router = Router();

router.get("/", async (req, res) => {

    try {
        
        // Buscar instancias del modelo "Tipo" en DB. Si no hay, buscar en PokeApi los nombres y crear las instancias en DB.
        // Devuelve las instancias del modelo "Tipo" de DB.  

        let typesDb = await Tipo.findAll();
        
        if(!typesDb.length) {

            const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`)
                                        .then((r) => r.data.results.map(type => Tipo.create({name: type.name})));


            typesDb = await Promise.all(typesApi);
        }

        return res.json(typesDb);

    } catch (err) {
        
        return res.status(404).json(err.message);

    }

})

module.exports = router; 

// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
