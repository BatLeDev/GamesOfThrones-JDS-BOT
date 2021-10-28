const mongoose = require("mongoose");

const guildShema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Guild", guildShema);