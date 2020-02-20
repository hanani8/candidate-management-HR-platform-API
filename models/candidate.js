const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const candidateSchema = new Schema({
    UID:{
        type:Number,
        required:true,
        //have to do aadhar number validation 
        unique: true,
        immutable:true
    },
    name:{
        type:String,
        required:true,
        immutable:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    emailID:{
        type:String
    },
    addressLine1:{
        type:String,
        require:true
    },
    addressLine2:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    sourceType:{
        type:String,
        required:true
    },
    employmentStatus:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    currentAnnualIncome:{
        type:String,
        required:true
    },
    educationalQualification:{
        type:String,
        required:true
    },
    successfulEnterprises:{
        type:Number,
        required:true,
        min: 0
    },
    failedEnterprises:{
        type:Number,
        required:true,
        min:0
    },
    hasABankAccount:{
        type:Boolean,
        required:true
    },
    hasACreditHistory:{
        type:Boolean,
        required:true
    },
    hasAssets:[{type:String,required:true}],
    needsTraining:{
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

schema.index({'$**': 'text'});

module.exports = mongoose.model('candidate',candidateSchema);