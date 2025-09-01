const User = require('./models/User');
const bcrypt = require('bcrypt');
async function makeAdmin() {
    try {
        let user = await User.findOne({email : "aditisaini2403@gmail.com"});
        if(user){
            console.log("user updaated..");
        } else{
         user = new User();
         user.firstName = "Aditi";
         user.lastName = "Saini";
         user.email = "aditisaini2403@gmail.com";
         let encryptedPassword = await bcrypt.hashSync("12345", 10);
         user.password = encryptedPassword;
         user.userType = "Admin";
         await user.save();
         console.log('user saved sucessfully..');
        }
    } catch (err) {

    }
}
module.exports = makeAdmin