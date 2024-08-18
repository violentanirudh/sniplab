require('dotenv').config()
const cluster = require('cluster')
const os = require('os')
const http = require('http')
const app = require('./app')

const cpus = os.cpus().length

if (cluster.isMaster) {
    console.log(`Master ${process.pid}`)
    for (let i = 0; i < cpus; i++) 
        cluster.fork()

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${process.pid} died`)
    })
} else {
    const server = http.createServer(app)
    server.listen(process.env.PORT, () => {
        console.log(`Worker ${process.pid} running`)
    })
}