const express = require('express');
const router = express.Router();
const { fork } = require('child_process');


router.get('/randoms', (req, res) => {
    const { num } = req.query;
    let amount = num ? num : 100000000;
    const randoms = fork('./randoms.js', [`${amount}`]);
    randoms.send('start');
    randoms.on('message', (data) => {
        res.send(`El resultado es ${data}`);
    })
});

module.exports = router;