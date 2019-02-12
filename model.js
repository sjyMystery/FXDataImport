const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'root','123456',{
    dialect:'sqlite',
    storage:'./sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const {DATE,STRING,FLOAT} = Sequelize

const HistoryPrice = sequelize.define('bins', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    start_date:{
        type: DATE,
    },
    end_date:{
        type:DATE,
    },
    bid_open:FLOAT,
    bid_high:FLOAT,
    bid_low:FLOAT,
    bid_close:FLOAT,
    ask_open:FLOAT,
    ask_high:FLOAT,
    ask_low:FLOAT,
    ask_close:FLOAT,
    type:{
        type:STRING,
    }
}, {
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    indexes:[
        {
            fields: ['id']
        },
        {
            fields:['start_date','end_date','type']
        },
    ]
});

sequelize.sync()

module.exports={
    HistoryPrice,
    Sequelize
};