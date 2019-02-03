const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'root', '123456', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 128,
        min: 0,
        acquire: 300000,
        idle: 100000
    },
    logging:false,
});

const {DATE,STRING,FLOAT} = Sequelize

const HistoryPrice = sequelize.define('bins', {
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
}, {
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
});

sequelize.sync()

module.exports={
    HistoryPrice,
    Sequelize
};