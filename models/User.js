const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [4, 'Minimum password length is 4 characters'],
  }
});

// Fire a Function after the user (doc) is saved in the db creating a instance of it 

// userSchema.post('save',function(doc,next){
//   console.log('new user was created & saved',doc)
//    next();
// })

// Fire a Function before a doc save in db going to harsh the user password before it 
// will save in the db so we are using pre hook in mangooes with (this will create a instance of user password ) 
// bcrypt is used to hash the password
userSchema.pre('save', async function(next){
  console.log('user about to created & save in the db',this)
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password,salt)
  next();
})

// static method to login user

userSchema.statics.login = async function(email,password){
  const user = await this.findOne({email})
  if(user){
   const auth = await bcrypt.compare(password,user.password)

   if(auth){
    return user;
   }
   throw Error('Incorrect password')
  }
  throw Error('This email  incorrect')
}

const User = mongoose.model('user', userSchema);

module.exports = User;