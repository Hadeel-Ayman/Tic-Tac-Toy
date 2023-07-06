const mongoose = require('mongoose')

const MenteeSchema = new mongoose.Schema({
    lookingFor:{
        type : String ,
        required:true
    },
    designation:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true
    },
    skills :{
        type: Array ,
        default:[ ],
        required:true
    },
    avatar :{
        type : String 
    },
    availableForHiring :{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Types.ObjectId ,
        ref : "User",
        required: true
    }
    

},{timestamps:true})


const MenteeInfo = mongoose.model('MenteeInfo', MenteeSchema);

module.exports = MenteeInfo;