const express = require("express");

const authService = require("../shared/auth.service");

const contributeRoute = express.Router();

const contributionController = require("../controllers/contributionController");

contributeRoute.post("/addContribution",authService.validateToken, contributionController.addContribution);
contributeRoute.get("/getContribution",authService.validateToken, contributionController.getContribution);
contributeRoute.get("/getIndividualContribution/:id",authService.validateToken, contributionController.getIndividualContribution);
contributeRoute.get("/getIndividualPendingContribution/:id",authService.validateToken, contributionController.getIndividualPendingContribution);
contributeRoute.get("/getPendingContribution",authService.validateToken, contributionController.getPendingContribution);
contributeRoute.get("/getContributionInLocation/:location",authService.validateToken, contributionController.getContributionsInLocation);
contributeRoute.post("/approveContribution/:id",authService.validateToken, contributionController.approveContribution);


module.exports = contributeRoute;