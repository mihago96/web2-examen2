const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let patrimoineData = require('./data.json'); // Utilisation de let pour permettre la modification

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route pour obtenir les données de patrimoine
app.get('/api/patrimoine', (req, res) => {
  res.json(patrimoineData);
});

// Route pour obtenir les possessions
app.get('/api/possessions', (req, res) => {
  res.json(patrimoineData[1].data.possessions);
});

// Route pour créer une nouvelle possession
app.post('/api/possessions', (req, res) => {
  const newPossession = req.body;
  patrimoineData[1].data.possessions.push(newPossession);
  res.status(201).json(newPossession);
});

// Route pour mettre à jour une possession existante
app.put('/api/possessions/:index', (req, res) => {
  const { index } = req.params;
  const updatedPossession = req.body;
  patrimoineData[1].data.possessions[index] = updatedPossession;
  res.status(200).json(updatedPossession);
});

// Route pour supprimer une possession
app.delete('/api/possessions/:index', (req, res) => {
  const { index } = req.params;
  patrimoineData[1].data.possessions.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
