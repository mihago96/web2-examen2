const patrimoineData = require('../data/data.json');

// Obtenir la valeur du patrimoine à une date donnée
exports.getValeurPatrimoine = (req, res) => {
  const { date } = req.query;
  const possessions = patrimoineData[1].data.possessions;

  const time = new Date(date).getTime();
  const valeur = possessions.reduce((acc, possession) => {
    const dateDebut = new Date(possession.dateDebut).getTime();
    const dateFin = possession.dateFin ? new Date(possession.dateFin).getTime() : null;

    if (time < dateDebut || (dateFin && time > dateFin)) {
      return acc;
    }

    let valeurActuelle = possession.valeur;

    if (possession.tauxAmortissement) {
      const anneeAmort = (time - dateDebut) / (1000 * 60 * 60 * 24 * 365);
      const tauxAmort = valeurActuelle * (possession.tauxAmortissement / 100) * anneeAmort;
      valeurActuelle = Math.max(0, valeurActuelle - tauxAmort);
    }

    if (possession.valeurConstante) {
      valeurActuelle += possession.valeurConstante;
    }

    return acc + valeurActuelle;
  }, 0);

  res.json({ valeur });
};

// Trier les possessions par critère
exports.sortPossessions = (req, res) => {
  const { criteria } = req.query;
  let possessions = [...patrimoineData[1].data.possessions];

  possessions.sort((a, b) => {
    if (a[criteria] < b[criteria]) return -1;
    if (a[criteria] > b[criteria]) return 1;
    return 0;
  });

  res.json(possessions);
};

// Obtenir la valeur du patrimoine sur une période donnée
exports.getValeurPatrimoinePeriode = (req, res) => {
  const { dateDebut, dateFin } = req.query;
  const possessions = patrimoineData[1].data.possessions;

  const timeDebut = new Date(dateDebut).getTime();
  const timeFin = new Date(dateFin).getTime();

  const valeur = possessions.reduce((acc, possession) => {
    const possessionDebut = new Date(possession.dateDebut).getTime();
    const possessionFin = possession.dateFin ? new Date(possession.dateFin).getTime() : null;

    if (possessionFin && (timeDebut > possessionFin || timeFin < possessionDebut)) {
      return acc;
    }

    let valeurActuelle = possession.valeur;

    if (possession.tauxAmortissement) {
      const anneeAmort = (Math.min(timeFin, possessionFin || timeFin) - possessionDebut) / (1000 * 60 * 60 * 24 * 365);
      const tauxAmort = valeurActuelle * (possession.tauxAmortissement / 100) * anneeAmort;
      valeurActuelle = Math.max(0, valeurActuelle - tauxAmort);
    }

    if (possession.valeurConstante) {
      valeurActuelle += possession.valeurConstante;
    }

    return acc + valeurActuelle;
  }, 0);

  res.json({ valeur });
};
