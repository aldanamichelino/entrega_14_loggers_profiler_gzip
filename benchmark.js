const autocannon = require('autocannon')
const {PassThrough} = require('stream');

function run(url) {
    const buf = []
    const outputStream = new PassThrough()

    //configuración original
    // const inst = autocannon({
    //     url,
    //     connections: 100,
    //     duration: 20
    // })

    //configuración adaptada a la carga de artillery
    const inst = autocannon({
        url,
        connections: 50,
        pipelining: 20,
        duration: 20
    })

    autocannon.track(inst, {outputStream})

    outputStream.on('data', data => {buf.push(data)})
    inst.on('done', ()=>{
        process.stdout.write(Buffer.concat(buf))
    })
}

console.log('Running benchmarks in Parallel')

run("http://localhost:3001/info")