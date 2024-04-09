const http = require('http');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config()

const maxInstances = 4; // Maximum number of instances to spawn
const appDirectory = path.join(__dirname, '../', 'backend'); // Path to the Nest.js application directory
const usedPorts = new Set(); // Set to keep track of used ports
const minPort = 3001;
const maxPort = 3004; // Adjusted to match the maximum number of instances (4)

// Function to allocate an available port
function allocatePort() {
    for (let port = minPort; port <= maxPort; port++) {
        if (!usedPorts.has(port)) {
            usedPorts.add(port);
            return port;
        }
    }
    throw new Error('No available ports in the range');
}

// Function to release a port
function releasePort(port) {
    usedPorts.delete(port);
    instancePortsMap = instancePortsMap.filter(x => x.port != port);
}


const instancePortsMap = [];

// Function to spawn a new instance
function spawnInstance() {
    if (usedPorts.size < maxInstances) {
        const port = allocatePort();

        const instance = spawn('C:\\Users\\DD611950\\AppData\\Roaming\\npm\\yarn.cmd', ['start:dev'], {
            cwd: appDirectory,
            env: { ...process.env, PORT: port.toString() },
        });
        instancePortsMap.push({ pid: instance.pid, port: port.toString() })


        console.log(`Spawned instance on port ${port}, PID: ${instance.pid}`);

        instance.on('exit', (code, signal) => {
            console.log(`Instance on port ${port}, PID: ${instance.pid} exited with code ${code} and signal ${signal}`);
            releasePort(port);
        });

        instance.stderr.on('data', (data) => {
            console.error(`Error from instance on port ${port}: ${data}`);
        });

        instance.stdout.on('data', (data) => {
            console.log(`Data from instance on port ${port} and PID: ${instance.pid}: ${data}`);
        });

        return instance;
    } else {
        console.error('Maximum instances reached');
        return null;
    }
}

const requestTimeout = (instance, res) => setTimeout(() => {
    console.error('Request forwarding timed out');
    res.writeHead(504, { 'Content-Type': 'text/plain' });
    res.end('Gateway Timeout');
    // Close the instance process if the timeout occurs
    instance.kill();
}, 200000);

// Function to forward request to a specific instance
function forwardRequestToInstance(instance, req, res) {
    // Set a timeout for forwarding the request
    requestTimeout(instance, res);
    // Forward the request body to the instance
    req.pipe(instance.stdin);

    // Pipe instance stdout back to the response
    instance.stdout.pipe(res);

    // Handle errors from the instance
    instance.stderr.on('data', (data) => {
        console.error(`Error from instance: ${data}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    });

    // Handle close event of the instance
    instance.on('close', (code) => {
        console.log(`Instance closed with code ${code}`);
        res.end();
    });
}

// Array to store instances
const instances = [];

// Create a function to add new instances to the array
function addInstance() {
    const newInstance = spawnInstance();
    if (newInstance) {
        instances.push(newInstance);
        return newInstance;
    } else {
        return null;
    }
}

// Create a simple HTTP server to handle incoming requests
const server = http.createServer((req, res) => {
    // Check if there are any instances available
    if (instances.length === 0) {
        // If no instances are available, spawn a new instance
        const newInstance = addInstance();
        if (!newInstance) {
            // If spawning a new instance fails, return a 503 Service Unavailable response
            res.writeHead(503, { 'Content-Type': 'text/plain' });
            res.end('Service Unavailable - Maximum instances reached');
            return;
        }
    }

    // Randomly select an instance to forward the request to
    const randomInstance = instances[Math.floor(Math.random() * instances.length)];
    // console.log('randomInstance', randomInstance)
    
    const randomInstancePort = instancePortsMap[Math.floor(Math.random() * instances.length)];
    console.log('instancePortsMap', instancePortsMap)
    console.log('randomInstancePort', randomInstancePort)

    setTimeout(() => {
    // Forward the request to the randomly selected instance
    const baseHost = process.env.baseHost ?? ""
    const proxyReq = http.request(
        { hostname: baseHost, port: randomInstancePort.port, path: req.url, method: req.method },
        (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        }
    );

    console.log('piping via ', baseHost + ':' + randomInstancePort.port)

    req.pipe(proxyReq);
    }, 50000)

});

const port = process.env.PORT || 3005;

// Start the HTTP server
server.listen(port, () => {
    console.log(`Reverse proxy running on port ${port}`);
});

