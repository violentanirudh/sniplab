require('dotenv').config()
const cluster = require('cluster')
const os = require('os')
const http = require('http')
const app = require('./app')

const cpus = os.cpus().length

if (cluster.isMaster && (process.env.CLUSTERS === 'true')) {
    console.log(`Master ${process.pid}`)
    for (let i = 0; i < cpus; i++) 
        cluster.fork()

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${process.pid} died`)
    })
} else {
    const server = http.createServer(app)
    server.listen(process.env.PORT, () => {
        console.log(`${process.pid} running : http://127.0.0.1:${process.env.PORT}`)
    })
}