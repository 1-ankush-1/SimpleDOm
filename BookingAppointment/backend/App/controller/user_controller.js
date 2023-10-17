const User = require('../model/user.js');

exports.getAllUser = (req, res, next) => {
    //check if user exist
    User.findAll().then((result) => {
        return res.status(200).send({ message: "successfull", data: result });
    }).catch(err => {
        console.log(`${err} in registerUser`);
        return res.status(500).send({ message: "Failed to fetch user" });
    })
}

exports.deleteUser = (req, res, next) => {
    const { userid } = req.params;
   
    User.destroy({
        where: {
            userid: userid
        }
    }).then(() => {
        res.status(200).send("user get deleted successfully");
    }).catch(err => {
        console.log(`${err} in deleteproductbyID`)
    });

}
exports.updateUser = (req, res, next) => {
    res.status(200).send("you are in Updated");
}