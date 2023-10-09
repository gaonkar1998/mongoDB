module.exports = mongoose => {
    var schema = new mongoose.Schema({
        email: String,
        password: String,
        first_name: String,
        last_name: String,
        state: Number,
        restaurant: String,
        address: String,
        contact: Number
    }, { timestamps: true });

    const User = mongoose.model("users", schema);
    return User;
};