const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//     process.env.DATABASE_NAME,
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {
//         host: process.env.DATABASE_HOST,
//         dialect: "mysql",
//         logging: (log) => console.log(log),
//     }
// );

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging:false
});

console.log(sequelize);


module.exports = sequelize;
