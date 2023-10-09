module.exports = mongoose => {
    var schema = new mongoose.Schema({
        restaurant_id: String,
        contribution_kg: Number,
        near_by: String,
        approved: Number
    }, { timestamps: true });

    const Contribute = mongoose.model("contribute", schema);
    return Contribute;
};