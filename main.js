const {ungzip} = require('node-gzip');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const root_path = './data';

function readTypes(path){
    filenames=fs.readdirSync(path);
    return filenames
}

const parse_data=(data,type)=>
    data.split('\r\n').slice(1,-2).map(line=>({
        start_date:moment(line[0]),
        end_date:moment(line[0]).add(1,'m'),
        bid_open:line[1],
        bid_high:line[2],
        bid_low:line[3],
        bid_close:line[4],
        ask_open:line[5],
        ask_high:line[6],
        ask_low:line[7],
        ask_close:line[8],
        type,
    }));

async function handleFile(type,year,filename){
    const full_path = `${type}/${year}/${filename}`;
    file = fs.readFile(full_path,async (err,data)=>{
        if(err){
            console.log(err);
        }
        const solved_data = await ungzip(data);
        /**
         * Here , we've ungzipped this data, and trying to format it.
         */
        const parsed_data = await parse_data(solved_data,type);

        console.log(parsed_data);
    })
}


const types = readTypes(root_path);

