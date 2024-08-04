const getFeatures = (req, res) => {
    // Logica per ottenere le funzionalità (ad esempio, da un database)
    res.json({ features: ['feature1', 'feature2'] });
};

const createFeature = (req, res) => {
    // Logica per creare una nuova funzionalità
    const newFeature = req.body.feature;
    // Aggiungi la funzionalità al database (o array fittizio)
    res.status(201).json({ message: 'Feature created', feature: newFeature });
};

module.exports = { getFeatures, createFeature };