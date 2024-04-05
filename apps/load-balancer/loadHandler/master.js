const cluster = require('cluster');
const os = require('os');
const http = require('http');


const servers = [
    "http://localhost:3001",
    "http://localhost:3002",
];

const numCPUs = os.cpus().length;

// Function to get CPU usage (optional)
exports.getCPUUsage = () => {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach((cpu) => {
        for (const type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });

    return Math.floor(100 - (100 * totalIdle) / totalTick);
}


exports.startCluster = (app) => {
    var server = http.createServer(app);
    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} is running`);

        // Track worker IDs
        let workers = [];

        // Create a new worker when the master requests it
        cluster.on('message', (worker, message) => {
            if (message === 'createWorker') {
                createWorker();
            }
        });

        // Initial worker creation
        createWorker();

        function createWorker() {
            const newWorker = cluster.fork();
            workers.push(newWorker.id);
            console.log(`Worker ${newWorker.id} started`);
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
            const index = workers.indexOf(worker.id);
            if (index !== -1) {
                workers.splice(index, 1);
            }
        });

        // Monitor CPU usage periodically (optional)
        setInterval(() => {
            const cpuUsage = getCPUUsage();
            console.log(`CPU usage: ${cpuUsage}%`);
            if (cpuUsage > 80) { // Adjust the threshold as needed
                createWorker();
            }
        }, 5000); // Adjust the interval as needed

    } else {
        // Create HTTP server for each worker
        app.use(function (req, res, next) {
            // Forward the request to the target API server
            // const proxyReq = http.request({
            //     hostname: targetHost,
            //     port: targetPort,
            //     path: req.url,
            //     method: req.method,
            //     headers: req.headers,
            // }, (proxyRes) => {
            //     res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
            //     proxyRes.pipe(res, { end: true });
            // });

            // proxyReq.on('error', (error) => {
            //     console.error(`Proxy request failed: ${error.message}`);
            //     res.writeHead(500, { 'Content-Type': 'text/plain' });
            //     res.end('Proxy Error');
            // });

            // req.pipe(proxyReq, { end: true });
        });
    }

    return server;
}
