const sequelize = require("../config/connect");

exports.getAllTables = (req, res, next) => {

    sequelize.getQueryInterface().showAllSchemas().then((alltables) => {
        //getting only names
        const tables = alltables.map(obj => obj['Tables_in_dbms-app']);
        res.status(200).send(tables);
    }).catch((err) => {
        console.log('showAllSchemas ERROR', err);
    });
}

exports.getTableByName = (req, res, next) => {
    const { tablename } = req.body;

    sequelize.query(`SELECT * FROM ${tablename}`,
        { type: sequelize.QueryTypes.SELECT })
        .then(data => {
            res.status(200).send(data);
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

exports.addTable = (req, res, next) => {
    

}
exports.deleteFieldInTable = (req, res, next) => {

}
exports.addFieldInTable = (req, res, next) => {

}
