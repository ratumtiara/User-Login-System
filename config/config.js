module.exports = {
    development: {
        dialect: "postgres",
        username: "postgres",
        password: "20210258",
        database: "user_login_system",
        host: process.env.DB_HOST ? process.env.DB_HOST : "127.0.0.1",
    },
    test: {
        dialect: "postgres",
        username: "postgres",
        password: "20210258",
        database: "user_login_system",
        host: process.env.DB_HOST ? process.env.DB_HOST : "127.0.0.1",
    },
    production: {
        dialect: "postgres",
        username: "postgres",
        password: "20210258",
        database: "user_login_system",
        host: process.env.DB_HOST ? process.env.DB_HOST : "127.0.0.1",
    }
  };
  