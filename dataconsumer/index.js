const express = require('express');
const axios = require('axios');
const client = require('prom-client');

const app = express();
const PORT = 3000;
const dataservicePort = 8080;
const dataserviceHost = 'dataservice'; // The name of the service in Kubernetes DNS
const endpoint = 'v1/api/service';

// Prometheus metrics
/*
Metric Name	Description
process_cpu_user_seconds_total	CPU time spent in user mode
process_cpu_system_seconds_total	CPU time spent in system mode
process_resident_memory_bytes	Memory usage (RSS)
process_virtual_memory_bytes	Virtual memory size
nodejs_eventloop_lag_seconds	Event loop lag
nodejs_heap_size_total_bytes	Total heap size
nodejs_heap_size_used_bytes	Heap size currently used
nodejs_active_handles_total	Number of active handles
nodejs_active_requests_total	Number of active requests
 */
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Histogram for request times
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.5, 1, 2, 5]
});

// Middleware to measure time
app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.path, code: res.statusCode });
    });
    next();
});

// Counter for total requests
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'code']
});

// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({ 
      method: req.method, 
      route: req.path, 
      code: res.statusCode 
    });
  });
  next();
});

// Prometheus metrics endpoint, Exposing metrics to Prometheus
app.get('/v1/api/service/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Helper function to fetch data
const fetchData = async (url) => {
    const start = Date.now();
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to access dataservice at ${url}: ${error.message}`);
    } finally {
        const duration = (Date.now() - start) / 1000;
        console.log(`Request took ${duration} seconds`);
    }
};

// Endpoint to expose Prometheus metrics
app.get('/dataservice', async (req, res) => {
    try {
        const data = await fetchData(`http://${dataserviceHost}:${dataservicePort}/${endpoint}`);
        res.json(data); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/dataservice/users', async (req, res) => {
    try {
        const data = await fetchData(`http://${dataserviceHost}:${dataservicePort}/${endpoint}/users`);
        res.json({ message: "users", users: data }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/dataservice/deposits', async (req, res) => {
    try {
        const data = await fetchData(`http://${dataserviceHost}:${dataservicePort}/${endpoint}/deposits`);
        res.json({ message: "deposits", deposits: data }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/dataservice/orgs', async (req, res) => {
    try {
        const data = await fetchData(`http://${dataserviceHost}:${dataservicePort}/${endpoint}/orgs`);
        res.json({ message: "orgs", deposits: data }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/dataservice/coordinates', async (req, res) => {
    try {
        const data = await fetchData(`http://${dataserviceHost}:${dataservicePort}/${endpoint}/coordinates`);
        res.json({ message: "coordinates", deposits: data }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Service A running on port ${PORT}`);
});
