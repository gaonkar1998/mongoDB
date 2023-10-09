const userService = require("../services/userService");
const CONSTANTS = require('../shared/constants');
const logger = require('../logger/logger');


const register = async (req, res) => {
    try {
        const userServiceData = userService.register(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const login = async (req, res) => {
    try {
        const userServiceData = userService.login(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const userServiceData = userService.updateUser(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userServiceData = userService.deleteUser(req, res);
    } catch (err) {
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

const getAllUsers = async (req, res) => {
    try{
        const getUsers = userService.getAllUsers(req,res)
    }
    catch(err){
        logger.error(err);
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.CUSTOMS.SOME_ERROR, error: err.message });
    }
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    getAllUsers
}