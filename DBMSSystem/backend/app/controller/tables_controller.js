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
    const tabledata = {
        tablehead: [],
        tablevalues: []
    }

    sequelize.query(`SELECT * FROM ${tablename}`,
        { type: sequelize.QueryTypes.SELECT })
        .then(data => {
            if (data != "") {
                //get keys
                tabledata.tablehead = Object.keys(data[0]);
                //get values
                tabledata.tablevalues = data.map(obj => Object.values(obj));
                return;
            } else {
                return sequelize.query(`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_SCHEMA = 'dbms-app' AND TABLE_NAME = '${tablename}'`,
                    { type: sequelize.QueryTypes.SELECT })
            }
        }).then(result => {
            //get keys
            if (tabledata.tablevalues.length <= 0) {
                tabledata.tablehead = result.map(row => row.COLUMN_NAME);
            }
            return res.status(200).send(tabledata);
        }).catch(error => {
            console.error(error);
            return res.status(500).send("failded to fetch table credentials");
        });
}

exports.addTable = (req, res, next) => {

}

exports.deleteFieldInTable = (req, res, next) => {
    const { id } = req.params;
    const { tablename, fieldname } = req.query;

    sequelize.query(`DELETE FROM ${tablename} WHERE ${fieldname} = ${id}`,
        { type: sequelize.QueryTypes.DELETE })
        .then(data => {
            console.log(data);
            res.status(200).send("deleted successfully");
        }).catch(err => {
            console.log(err);
            res.status(500).send("failed to delete field");
        })
}
exports.addFieldInTable = (req, res, next) => {

}
