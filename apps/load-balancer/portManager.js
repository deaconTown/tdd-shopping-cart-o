const usedPorts = new Set(); // Set to keep track of used ports
const minPort = 3001;
const maxPort = 3004; 

// Function to allocate an available port
exports.allocatePort = () =>{
  for (let port = minPort; port <= maxPort; port++) {
    console.log('allocatePort || current port = ', port)
    if (!usedPorts.has(port)) {
      console.log('allocatePort || adding port = ', port)
      console.log('allocatePort || usedPorts = ', usedPorts)

      usedPorts.add(port);
      return port;
    }
  }
  throw new Error('No available ports in the range');
}

// Function to release a port
exports.releasePort = (port) => {
  usedPorts.delete(port);
}

// Example usage
// const allocatedPort = allocatePort();
// console.log(`Allocated port: ${allocatedPort}`);

// // Simulate application stopping
// releasePort(allocatedPort);
// console.log(`Released port: ${allocatedPort}`);
