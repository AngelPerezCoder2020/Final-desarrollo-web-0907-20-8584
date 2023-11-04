
const config ={
    server: process.env.SQLSERVER_SERVIDOR,
    user: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_ROOT_PASSWORD,
    database: process.env.SQLSERVER_DATABASE,
    options: {
        trustServerCertificate: true
    }
}

module.exports.config = config;