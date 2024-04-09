const axios = require('axios');

const servers = [
    "http://localhost:3001",
    "http://localhost:3002",
];

let current = 0, server;
exports.handler = async (req, res) => {
    console.log('LoadBalancer || entered handler');
    const { method, url, headers, body: data } = req;
    server = servers[current];
    current === (servers.length - 1) ? current = 0 : current++;

    console.log(`server`, server)
    console.log(`current`, current)
    console.log(`method`, method)
    console.log(`url`, url)
    console.log(`headers`, headers)
    console.log(`data`, data)


    
    try {
        const response = await axios({
            url: `${server}${url}`,
            method,
            headers,
            data
        });

        console.log(`proxy to ${server} succeded`);

        console.log('LoadBalancer || exiting handler');
        res.send(response.data); 
    } catch (error) {

        console.warn(`proxy to ${server} failed`, error);

        res.statusCode = 500;

        res.send({msg: 'failed to send request'}); 

        // handler(req, res);

    }
}

