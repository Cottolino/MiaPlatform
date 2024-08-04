// Version: 1.0
const getProdotti = async (req, res) => {
    console.log("getProdotti");
    res.send("getProdotti");
};

const createProdotto = async (req, res) => {
    console.log("createProdotto");
    res.send("createProdotto");
};

const getProdotto = async (req, res) => {
    console.log("getProdotto"+req.params.id);
    res.send("getProdotto"+req.params.id);
};

module.exports = { getProdotti, createProdotto, getProdotto };