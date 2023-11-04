//const config ={
  //  server: process.env.SQLSERVER_SERVIDOR,
    //user: process.env.SQLSERVER_USER,
    //password: process.env.SQLSERVER_ROOT_PASSWORD,
    //database: process.env.SQLSERVER_DATABASE,
    //options: {
    //    trustServerCertificate: true
    //}
//}
const config = {
    user: process.env.SQLSERVER_SERVIDOR,
    password: process.env.SQLSERVER_ROOT_PASSWORD,
    server: process.env.SQLSERVER_SERVIDOR,
    database: process.env.SQLSERVER_DATABASE,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustServerCertificate: true
    }
}
module.exports.config = config;