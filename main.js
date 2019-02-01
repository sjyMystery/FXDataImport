const {ungzip} = require('node-gzip');

const fs = require('fs');

async function readPath(path='./data'){
    filenames=fs.readdirSync(path);
    console.log(filenames)
    return ;
}




readPath();