const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let vehicleLocations = [];

app.use(bodyParser.json());

app.post('/location', (req, res) => {
  const { vehicleId, latitude, longitude } = req.body;
  const newLocation = { vehicleId, latitude, longitude, timestamp: new Date() };
  
  const index = vehicleLocations.findIndex(v => v.vehicleId === vehicleId);
  if (index === -1) {
    vehicleLocations.push(newLocation);
  } else {
    vehicleLocations[index] = newLocation;
  }

  res.sendStatus(200);
});

app.get('/location/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId;
  const vehicleLocation = vehicleLocations.find(v => v.vehicleId === vehicleId);

  if (vehicleLocation) {
    res.json(vehicleLocation);
  } else {
    res.sendStatus(404);
  }
});

// Inicia o servidor na porta 3000
app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});