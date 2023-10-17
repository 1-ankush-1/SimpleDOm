const User = require('../model/user.js');

exports.registerUser = (req, res, next) => {
    const { name, email, phone } = req.body;

    //check if user exist
    User.findOne({
        where: {
            email: email
        }
    }).then((result) => {
        //if no 
        if (!result) {
            // then add new user
            const user = { name, email, phone };
            User.create(user).then((data) => {
                return res.status(200).send({ message: "user added successfully", data: data });
            })
        } else {
            return res.status(409).send({ message: "user already exist" });
        }
    }).catch(err => {
        console.log(`${err} in registerUser`);
        return res.status(500).send({ message: "Failed to add user" });
    })
}