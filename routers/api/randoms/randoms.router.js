const express = require('express');
const router = express.Router();
const { fork } = require('child_process');


router.get('/', (req, res) => {
    // const { num } = req.query;
    // let amount = num ? num : 100000000;
    // const randoms = fork('./randoms.js', [`${amount}`]);
    // randoms.send('start');
    // randoms.on('message', (data) => {
    //     res.send(`El resultado es ${data}`);
    // })
    
    delay(8000);
    res.json(process.pid);
});

const delay = (duration) => {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
      // event loop is blocked
    };
  };

module.exports = router;