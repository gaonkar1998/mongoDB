const db = require("../models/index");
const CONSTANTS = require('../shared/constants');
const { data } = require("../logger/logger");
const Contribute = db.contribute
const User = db.user

const addContribution = async (req, res) => {
    var { restaurant_id, contribution_kg, near_by } = req.body
    Contribute.create({ restaurant_id, contribution_kg, near_by, approved: 0 })
    return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.CONTRIBUTION.ADDCONTRIBUTION });
}

const getContribution = async (req, res) => {
    const data = await Contribute.find({approved: 1}, { restaurant_id: 1, contribution_kg: 1, near_by: 1 })
    const finalData = await Promise.all(data.map(async (a) => {
        const res = await User.find({ _id: a.restaurant_id, state: 1 }, { first_name: 1, last_name: 1, email: 1, state: 1, _id: 1, address: 1, restaurant: 1, contact: 1 })
        return {
            restaurant_id: a.restaurant_id,
            restaurant: res[0].restaurant,
            first_name: res[0].first_name,
            last_name: res[0].last_name,
            email: res[0].email,
            address: res[0].address,
            restaurant: res[0].restaurant,
            contact: res[0].contact,
            contribution_kg: a.contribution_kg,
            near_by: a.near_by
        }
    }))
    return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.CONTRIBUTION.GETCONTRIBUTION , data: finalData});
}

const getPendingContribution = async (req, res) => {
    const data = await Contribute.find({approved: 0}, { restaurant_id: 1, contribution_kg: 1, near_by: 1, _id:1 })
    const finalData = await Promise.all(data.map(async (a) => {
        const res = await User.find({ _id: a.restaurant_id, state: 1 }, { first_name: 1, last_name: 1, email: 1, state: 1, _id: 1, address: 1, restaurant: 1, contact: 1 })
        return {
            restaurant_id: a.restaurant_id,
            restaurant: res[0].restaurant,
            first_name: res[0].first_name,
            last_name: res[0].last_name,
            email: res[0].email,
            address: res[0].address,
            restaurant: res[0].restaurant,
            contact: res[0].contact,
            contribution_kg: a.contribution_kg,
            near_by: a.near_by
        }
    }))
    return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.CONTRIBUTION.GETCONTRIBUTION , data: finalData});
}

const getIndividualContribution = async (req, res) => { 
    const data = await Contribute.find({restaurant_id: req.params.id, approved: 1}, { restaurant_id: 1, contribution_kg: 1, near_by: 1 })
    const finalData = await Promise.all(data.map(async (a) => {
        const res = await User.find({ _id: a.restaurant_id, state: 1 }, { first_name: 1, last_name: 1, email: 1, state: 1, _id: 1, address: 1, restaurant: 1, contact: 1 })
        return {
            restaurant_id: a.restaurant_id,
            restaurant: res[0].restaurant,
            first_name: res[0].first_name,
            last_name: res[0].last_name,
            email: res[0].email,
            address: res[0].address,
            restaurant: res[0].restaurant,
            contact: res[0].contact,
            contribution_kg: a.contribution_kg,
            near_by: a.near_by
        }
    }))
    return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.CONTRIBUTION.GETCONTRIBUTION , data: finalData});
}

const getIndividualPendingContribution = async (req, res) => { 
    const data = await Contribute.find({restaurant_id: req.params.id, approved: 0}, { restaurant_id: 1, contribution_kg: 1, near_by: 1 })
    const finalData = await Promise.all(data.map(async (a) => {
        const res = await User.find({ _id: a.restaurant_id, state: 1 }, { first_name: 1, last_name: 1, email: 1, state: 1, _id: 1, address: 1, restaurant: 1, contact: 1 })
        return {
            restaurant_id: a.restaurant_id,
            restaurant: res[0].restaurant,
            first_name: res[0].first_name,
            last_name: res[0].last_name,
            email: res[0].email,
            address: res[0].address,
            restaurant: res[0].restaurant,
            contact: res[0].contact,
            contribution_kg: a.contribution_kg,
            near_by: a.near_by
        }
    }))
    return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.CONTRIBUTION.GETCONTRIBUTION , data: finalData});
}

const getContributionsInLocation = async (req, res) => { 
    const data = await Contribute.find({near_by: req.params.location, approved: 1}, { restaurant_id: 1, contribution_kg: 1, near_by: 1 })
    const finalData = await Promise.all(data.map(async (a) => {
        const res = await User.find({ _id: a.restaurant_id, state: 1 }, { first_name: 1, last_name: 1, email: 1, state: 1, _id: 1, address: 1, restaurant: 1, contact: 1 })
        return {
            restaurant_id: a.restaurant_id,
            restaurant: res[0].restaurant,
            first_name: res[0].first_name,
            last_name: res[0].last_name,
            email: res[0].email,
            address: res[0].address,
            restaurant: res[0].restaurant,
            contact: res[0].contact,
            contribution_kg: a.contribution_kg,
            near_by: a.near_by
        }
    }))
    return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.CONTRIBUTION.GETCONTRIBUTION , data: finalData});
}

const approveContribution = async (req, res) => {
    const _id = req.params.id;
    const find = await Contribute.find({ _id }).then(data => {
        var newvalues = { $set: { approved: 1 } };
        Contribute.findOneAndUpdate(_id, newvalues, function (err, doc) {
            if (err) return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: err });
            return res.status(CONSTANTS.CUSTOMS.SUCCESS).json({ msg: CONSTANTS.USERS.UPDATED });
        });
    }, reason => {
        return res.status(CONSTANTS.CUSTOMS.ERROR).json({ msg: CONSTANTS.USERS.INVALID_ID });
    })
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