const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars/');

console.log("In the user schema!!")
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
    },
    friends : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
},{
    timestamps : true
});


//Configuring multer to store files in disk storage 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..' ,AVATAR_PATH));
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now());
    }
});
  
// Static
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;


// Keep in mind to use comma, we dont have to create object
const User = mongoose.model('User',userSchema);


module.exports = User;