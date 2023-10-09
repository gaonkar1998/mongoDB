const db = require("../models/index");
const User = db.user;
const bcrypt = require("bcryptjs");
const CONSTANTS = require('../shared/constants');
const authService = require("../shared/auth.service");


const register = async (req, res) => {
    const { first_name, last_name, email, password, restaurant, address,contact } = req.body;
    const enc_password = bcrypt.hashSync(password);
    await User.find({ email }).then(data => {
        if (data.length) {
            return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.USERS.ALREADY_REGISTERED });
        } else {
            let userData = {
                first_name,
                last_name,
                email,
                state: 1,
                password: enc_password,
                restaurant,
                address,
                contact,
                role: 2
            };
            User.create(userData);
            return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.USERS.REGISTERED });
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
  
    await User.find({ email }).then(data => {
        if (data.length) {
            const db_password = data[0].password;
            const isMatched = bcrypt.compareSync(password, db_password);
            if (isMatched) {
                const payload = {
                    id: data[0]._id,
                    first_name: data[0].first_name,
                    last_name: data[0].last_name,
                    email: data[0].email,
                    state: data[0].state,
                    role: data[0].role
                }
                const token = authService.generateToken(payload);
                return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.USERS.LOGIN, data: token });

            } else {
                return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.USERS.INVALID });
            }
        } else {
            return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.USERS.INVALID });
        }
    })
}

const updateUser = async (req, res) => {
    const _id = req.params.id;
    const { first_name, last_name, email, address, restaurant, contact } = req.body;
    const find = await User.find({ _id }).then(data => {
        var newvalues = { $set: { first_name, last_name, email, address, restaurant, contact } };
        User.findOneAndUpdate(_id, newvalues, function (err, doc) {
            if (err) return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: err });
            return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.USERS.UPDATED });
        });
    }, reason => {
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.USERS.INVALID_ID });
    })
}

const deleteUser = async (req, res) => {
    const _id = req.params.id;
    User.findOneAndUpdate(_id, {$set:{state: 0}}, function (err, doc) {
        if (err) return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: err });
        return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.USERS.DELETED });
    });
}

const getAllUsers = async (req, res) => {
    const data = await User.find({state: 1}, { first_name: 1, last_name: 1, email: 1, state: 1, _id: 1, address:1, restaurant: 1, contact: 1, role: 1 }).then(data => {
        return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.USERS.FETCHED, data: data });
    },
        failure => {
            return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.USERS.NOUSERS });
        });
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    getAllUsers
}