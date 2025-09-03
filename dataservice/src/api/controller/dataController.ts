import express from 'express';
import { Request, Response } from 'express';
import {mockUser, mockOrg, mockDeposit, mockCoordinates} from '../../data/mockData';

const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Histogram for request times
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.5, 1, 2, 5]
});

// Counter for total requests
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'code']
});

// Routes requests related to data to the dataController
const dataRouter = express.Router();

// Middleware to measure request time
dataRouter.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.path, code: res.statusCode });
    });
    next();
});

// Middleware to count total requests
dataRouter.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({ 
      method: req.method, 
      route: req.path, 
      code: res.statusCode 
    });
  });
  next();
});

// Endpoint to expose metrics
dataRouter.get('/metrics', async (req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});


dataRouter.get('', async(req: Request, res: Response) =>{
  try{
    // fetching user from database
    // Axios/HTTP requests to get data from external sources
    // const data = await fetchData(req.bearerToken)
    // map data to data model
    await res.json('Accessing data service');
  }
  catch(err){
    console.error(`Error occurred: ${err.message}`);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
  
} );

dataRouter.get('/users', async(req: Request, res: Response) =>{
  try{
    // fetching user from database
    // Axios/HTTP requests to get data from external sources
    // const data = await fetchData(req.bearerToken)
    // map data to data model
    await res.json(mockUser);
    console.log(`Successfully fetched ${mockUser.length} user`)
  }
  catch(err){
    console.error(`Error occurred: ${err.message}`);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
  
} );

dataRouter.get('/orgs', async (req: Request, res: Response) => {
  try {        
    // fetching organization from database
    // make Axios/HTTP requests to get data from external sources
    await res.json(mockOrg);
    console.log(`Successfully fetched ${mockOrg.length} organizations`)
        
  } catch (err) {
    console.error(`Error occurred: ${err.message}`);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

dataRouter.get('/deposits', async(req: Request, res: Response) =>{
  try{
    // fetching deposits from database
     // need to make Axios/HTTP requests to get data from external sources
    await res.json(mockDeposit);
    console.log(`Successfully fetched ${mockDeposit.length} deposits`)
  }
  catch(err){
    console.error(`Error occurred: ${err.message}`);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
} );

dataRouter.get('/coordinates', async (req: Request, res: Response) => {
  try {
    // fetching coordinates from database
    // Axios/HTTP requests to get data from external sources
    // const data = await fetchData(req.bearerToken)
    // map data to data model
   
    res.json(mockCoordinates);
    console.log(`Successfully fetched ${mockCoordinates.length} coordinates`);
  } catch (err) {
    console.error(`Error occurred: ${err.message}`);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

export default dataRouter;