import { parentPort, workerData } from "worker_threads";
import fs from "fs";
import xlsx from "xlsx";
import { parse } from "csv-parse";


const processXlsx = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    console.log("13", jsonData)
    parentPort?.postMessage("sucess")
}

const processCsv = (filePath) => {
    const csvData = [];

    fs.createReadStream(filePath)
    .pipe(parse({ columns: true }))
    .on('data', (row)=>{
        csvData.push(row);
    })
    .on('end', ()=> {
        console.log("csvData", csvData)
        parentPort?.postMessage("sucess")
    })
}


if(workerData.fileType === ".x/sx"){
    processXlsx(workerData.filePath)
}
else if(workerData.filePath === ".csv"){
    processCsv(workerData.filePath)
}
else {
    parentPort?.postMessage("Unsupported file type")
}