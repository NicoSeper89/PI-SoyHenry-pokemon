const { Router } = require('express');
const pokemon = require('./Pokemons.js');
const tipos = require('./Types.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemon);
router.use("/types", tipos);

module.exports = router; 

