const contributionService = require("../services/contributionService");
const CONSTANTS = require('../shared/constants');
const logger = require('../logger/logger');


const addContribution = async (req, res) => {
    try {
        const result = contributionService.addContribution(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const getContribution = async (req, res) => {
    try {
        const result = contributionService.getContribution(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const getIndividualContribution = async (req, res) => {
    try {
        const result = contributionService.getIndividualContribution(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const getPendingContribution = async (req, res) => {
    try {
        const result = contributionService.getPendingContribution(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const getIndividualPendingContribution = async (req, res) => {
    try {
        const result = contributionService.getIndividualPendingContribution(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const getContributionsInLocation = async (req, res) => {
    try {
        const result = contributionService.getContributionsInLocation(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const approveContribution = async (req, res) => {
    try {
        const result = contributionService.approveContribution(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}


module.exports = {
    addContribution,
    getContribution,
    getIndividualContribution,
    getPendingContribution,
    getIndividualPendingContribution,
    getContributionsInLocation,
    approveContribution
}