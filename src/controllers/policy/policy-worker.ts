import { parentPort, workerData } from "worker_threads";
import fs from "fs";
import xlsx from "xlsx";
import { parse } from "csv-parse";
import { PolicySheetJoiValidation } from "../../common/validation/policy-sheet";
import { PolicySheetDataDto } from "../../common/dto/policy-dto";


const processXlsx = (filePath: string) => {
    try {
        const workbook = xlsx.readFile(filePath);

        if (!workbook.SheetNames.length) {
            throw new Error('No sheets found in the Excel file.');
        }

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        if (!sheet) {
            throw new Error(`Sheet with name "${sheetName}" not found.`);
        }

        const jsonData = xlsx.utils.sheet_to_json(sheet);

        if (!jsonData.length) {
            throw new Error('No data found in the sheet.');
        }

        jsonData.map((row)=>{
            const { error } = PolicySheetJoiValidation(row);
            if (error) {
                new Error(error.message);
            }
        })
        parentPort?.postMessage({ status: "success", message: "Data successfully imported", data: jsonData });

    } catch (error) {

        console.error('Error processing XLSX file:', (error as Error).message);
        parentPort?.postMessage({ status: "error", message: (error as Error).message });
    }
};


const processCsv = (filePath: string) => {
    const csvData: PolicySheetDataDto[] = [];
    const readStream = fs.createReadStream(filePath).pipe(parse({ columns: true }));

    readStream
        .on('data', (row) => {

            const { error } = PolicySheetJoiValidation(row);
            if (error) {
                readStream.destroy(new Error(error.message));
            }
            csvData.push(row);
        })
        .on('end', async () => {
            try {
                parentPort?.postMessage({ status: "success", message: "Data successfully imported", data: csvData });
            } catch (err: any) {
                parentPort?.postMessage({ status: "error", message: err?.message });
            }
        })
        .on('error', (err) => {
            parentPort?.postMessage({ status: "error", message: err.message });
        });
};


if (workerData.fileType === ".xlsx") {
    processXlsx(workerData.filePath)
}
else if (workerData.fileType === ".csv") {
    processCsv(workerData.filePath)
}
else {
    parentPort?.postMessage("Unsupported file type")
}