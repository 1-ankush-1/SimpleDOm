const DBconfig =
{
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    dialect: "mysql" 
}

module.exports = DBconfig