require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    maxConcurrentQueries: 100,
    dialect: "mysql",
    dialectOptions: {
      ssl: "AMAZON RDS",
    },
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
};
