const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
    res.json("Healthy");
});

//Include routes
const userRoutes = require("./userRoute");
const contributionRoutes = require("./contributionRoute")

router.use('/user', userRoutes);
router.use('/contribute', contributionRoutes)
module.exports = router;