const mailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'trayyldz@gmail.com',
        pass: 'Saj33133081++'
    }
}

const dbConfig = {
    dialect: 'mysql',
    host: 'localhost',
    scheme: 'node-app',
    user: 'root',
    password: '1234'
}
module.exports = mailConfig;
module.exports = dbConfig;