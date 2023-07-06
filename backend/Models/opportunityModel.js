const mongoose = require('mongoose');
mongoose.set('strictQuery', true ); // Set strictQuery option to false

// create schema
const opportunitySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
        minlength: [3, 'too short title name']
    },
    description: {
        type: String,
        required: [true, 'Description required'],
        lowercase: true,
    },
    certificate:{
        type: String,
        default:'Awarded'
    },
    duration:{
        type:String,
        required:[true, 'Duration required']
    },
    location:{
        type:String,
        required:[true, 'Location required']
    },
    hired:{
        type:Boolean,
        default:false
    },
    paid:{
        type:Boolean,
        default:false
    },
    amount:{
        type:Number,
        required:[true, 'Amount required']
    },
    currency:{
        type:String,
        default:'USD'
    },
    respons:{
        type:String,
        default:""
    },
    requires:{
        type:String,
        default:""
    },
    expOutcome:{
        type:String,
        default:""
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},
    //to create tow document in database with category
    { timestamp: true }  

);
// create model
const OpportunityModel = mongoose.model('opportunity', opportunitySchema);
module.exports = OpportunityModel;