const express = require('express');
const router = express.Router();
const { getRandoms } = require('../../../utils/random.utils');


router.get('/', (req, res) => {
    const { num } = req.query;
    let amount = num ? num : 100000000;
    const randoms = getRandoms(amount);

    res.send(`El resultado es ${randoms}`);
});

module.exports = router;