const router = require("express").Router();

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require("../../data/prove-data/prove-10/avengers.json");

router.get("/", (req, res, next) => {
    res.render("prove-views/prove-10", {
        title: "Prove 10",
        path: "/prove/10",
    });
});

router.get("/fetchAll", (req, res, next) => {
    res.json(dummyData);
});

router.post("/insert", (req, res, next) => {
    const name = req.body.name;
    const powers = req.body.powers;

    // Return an error if name or powers empty
    if (!name || !powers)
        return res.status(400).json({ errorMessage: "Must Include both Name and Powers" })

    // Retrun an error if name already exits
    if (dummyData.avengers.some(avenger => avenger.name === name))
        return res.status(400).json({ errorMessage: "Name Already Exists" })

    // Add Avenger, and return success message
    dummyData.avengers.push({
        name: name,
        powers: powers
    })
    return res.status(201).json({ message: "Avenger Successfully Submitted" })
});

module.exports = router;
