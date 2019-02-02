const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'root', '123456', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 8,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging:false,
});

const {DATE,STRING,FLOAT} = Sequelize

const HistoryPrice = sequelize.define('user', {
    start_date:DATE,
    end_date:DATE,
    bid_open:FLOAT,
    bid_high:FLOAT,
    bid_low:FLOAT,
    bid_close:FLOAT,
    ask_open:FLOAT,
    ask_high:FLOAT,
    ask_low:FLOAT,
    ask_close:FLOAT,
    type:STRING,
});

sequelize.sync()

module.exports={
    HistoryPrice,
    Sequelize
};