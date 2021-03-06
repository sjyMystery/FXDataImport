const {ungzip} = require('node-gzip');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const {HistoryPrice} = require('./model')

const root_path = './data';

let i =0,j=0;

function readPath(path){
    filenames=fs.readdirSync(path);
    return filenames
}

const parse_data=(data,type)=>
    data.split('\r\n').slice(1,-2).map(un_parsed_line=>
    {
        const line = un_parsed_line.split(',');
        return {
        start_date:moment(line[0]),
        end_date:moment(line[0]).add(1,'m'),
        bid_open:parseFloat(line[1]),
        bid_high:parseFloat(line[2]),
        bid_low:parseFloat(line[3]),
        bid_close:parseFloat(line[4]),
        ask_open:parseFloat(line[5]),
        ask_high:parseFloat(line[6]),
        ask_low:parseFloat(line[7]),
        ask_close:parseFloat(line[8]),
        type,
        }
    });

function handleFile(root,type,year,filename){
    const full_path = path.join(root,type,year,filename);
    return new Promise(
        ((resolve,reject)=>{
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
                    console.log(`parse compelete:${type},${year},${filename} total:${i++}`)
                    resolve(parsed_data)
                }
                catch (e) {
                    console.log(`error:${type},${year},${filename} readerror——${e.message}`)
                    reject(e)
                }
            })
        })
    )
}
async function handleType(root,type) {
    const type_path = path.join(root,type);
    const years = readPath(type_path);
    for(const year of years){
        try{
            const year_work=readPath(path.join(root, type, year))
                .map(
                filename => handleFile(root, type, year, filename))
            const year_result = await Promise.all(year_work)
            const history_in_year = year_result.reduce((left,right)=>left.concat(right),[]);
            await HistoryPrice.bulkCreate(history_in_year)
        }
        catch(error){
            console.log(`saving error:${type},${year} ${error.message}`)
        }
        console.log(`${type} ${year} complete`)
    }
    console.log(`${type} complete`)
    return;
}

async function main(){
    const types = readPath(root_path)
    for(type of types){
        await handleType(root_path,type)
    }
}

main()

