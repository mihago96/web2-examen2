const patrimoineData = require('../data/data.json');

// Obtenir la liste des possessions
exports.getPossessions = (req, res) => {
  const possessions = patrimoineData[1].data.possessions;
  res.json(possessions);
};

// Créer une nouvelle possession
exports.createPossession = (req, res) => {
  const { libelle, valeur, dateDebut, dateFin } = req.body;

  const newPossession = {
    possesseur: { nom: "John Doe" },
    libelle,
    valeur,
    dateDebut,
    dateFin,
    tauxAmortissement: null,
    valeurConstante: null
  };

  patrimoineData[1].data.possessions.push(newPossession);
  res.status(201).json(newPossession);
};

// Mettre à jour une possession
exports.updatePossession = (req, res) => {
  const libelle = req.params.libelle;
  const { dateFin } = req.body;

  const possession = patrimoineData[1].data.possessions.find(p => p.libelle === libelle);

  if (!possession) {
    return res.status(404).json({ message: "Possession non trouvée" });
  }

  possession.dateFin = dateFin;
  res.json(possession);
};

// Fermer une possession
exports.closePossession = (req, res) => {
  const libelle = req.params.libelle;

  const possession = patrimoineData[1].data.possessions.find(p => p.libelle === libelle);

  if (!possession) {
    return res.status(404).json({ message: "Possession non trouvée" });
  }

  possession.dateFin = new Date().toISOString();
  res.json(possession);
};
