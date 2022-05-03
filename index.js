const cluster = require('cluster');
const os = require('os');
const {startServer} = require('./utils/initServer');
const minimist = require('minimist');
require('dotenv').config();

const args = minimist(process.argv.slice(2), {
    default: {
      PORT: 3001,
      MODE: 'FORK'
    },
    alias: {
      p: 'PORT',
      m: 'MODE'
    }
});

const CPUS_NUM = os.cpus().length;

if(args.MODE =='CLUSTER'){
    if(cluster.isMaster){
        console.log(`Proceso principal pid: ${process.pid}`)
        console.log(`Cantidad de procesadores en cluster: ${CPUS_NUM}`);
        for(let i = 0; i< CPUS_NUM;i++){
            cluster.fork();
        }
    }else{
        startServer(args);
        console.log(`Proceso secundario pid: ${process.pid}`)
    }
}else{
    startServer(args);
    console.log(`Cantidad de procesadores en Fork: ${CPUS_NUM}`);
}



