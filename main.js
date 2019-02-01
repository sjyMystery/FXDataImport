const {ungzip} = require('node-gzip');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const root_path = './data';

let i =0;

function readPath(path){
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

async function handleFile(root,type,year,filename){
    const full_path = path.join(root,type,year,filename);
    file = fs.readFile(full_path,async (err,data)=> {
        if (err) {
            console.log(err);
        }
        try {
            const solved_data = await ungzip(data);

        /**
         * Here , we've ungzipped this data, and trying to format it.
         */
            const parsed_data = await parse_data(solved_data.toString(), type);

            console.log(`parse compelete:${type},${year},${filename} readerror——${e.message},total:${i++}`)
        }
        catch (e) {
            console.log(`error:${type},${year},${filename} readerror——${e.message}`)
        }
    })
}
async function handleType(root,type) {
    const type_path = path.join(root,type);
    const years = readPath(type_path);
    years.forEach(
        year=>
            readPath(path.join(root,type,year))
                .forEach(
                    filename=>handleFile(root,type,year,filename))
    )
}

readPath(root_path).forEach(type=>handleType(root_path,type));