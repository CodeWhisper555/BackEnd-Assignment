const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        password : {
            type : String,
            requried : true,
            minlength : 6,
            select : false
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true, 
            trim: true       
        }
    },
    { timestamps : true}
);
module.exports = mongoose.model("User",userSchema);