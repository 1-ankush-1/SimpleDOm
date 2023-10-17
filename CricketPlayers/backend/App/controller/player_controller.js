const Player = require("../model/player.js");
const { Op } = require("sequelize");

exports.getAllPlayer = (req, res, next) => {
    Player.findAll().then(result => {
        res.status(200).send({
            message: "successfully fetched all data",
            data: result
        })
    }).catch(err => {
        console.log(`${err} in getAllPlayer`);
        return res.status(500).send({ message: "Something went wrong try again" });
    })
}

exports.getPlayerByName = (req, res, next) => {
    let { name } = req.body;
    name = name.toUpperCase()
    Player.findAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%'
            }
        }
    }).then(result => {
        res.status(200).send({
            message: "successfully fetched data",
            data: result
        })
    }).catch(err => {
        console.log(`${err} in getPlayerByName`)
        return res.status(500).send({ message: "Something went wrong try again" });
    })
}

exports.addPlayer = (req, res, next) => {

    const { avg, birthplace, century,
        dob, fifties, img, name, noofmatches
        , score, wickets, career } = req.body;

    const player = {
        avg, birthplace, century,
        dob, fifties, img, name: name.toUpperCase(), noofmatches
        , score, wickets, career
    };

    Player.create(player).then((data) => {
        return res.status(200).send({ message: "Player added successfully" });
    }).catch(err => {
        console.log(`${err} in addPlayer`)
        return res.status(500).send({ message: "Something went wrong try again" });
    })


}
exports.deletePlayer = (req, res, next) => {
    const { id } = req.params;

    Player.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).send("Player get deleted successfully");
    }).catch(err => {
        console.log(`${err} in deletePlayer`)
        return res.status(500).send({ message: "Something went wrong try again" });
    });
}

exports.editPlayer = (req, res, next) => {
    const { avg, birthplace, century,
        dob, fifties, img, name, noofmatches
        , score, wickets, career } = req.body;

    const { id } = req.params;

    const player = {
        avg, birthplace, century,
        dob, fifties, img, name: name.toUpperCase(), noofmatches
        , score, wickets, career
    }

    Player.update(player,
        {
            where: {
                id: id
            }
        }).then(() => {
            res.status(200).send("Player get updated successfully");
        }).catch(err => {
            console.log(`${err} in editPlayer`)
            return res.status(500).send({ message: "Something went wrong try again" });
        });
}