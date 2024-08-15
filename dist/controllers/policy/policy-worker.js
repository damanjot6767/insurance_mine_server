"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
const csv_parse_1 = require("csv-parse");
const policy_sheet_1 = require("../../common/validation/policy-sheet");
const processXlsx = (filePath) => {
    try {
        const workbook = xlsx_1.default.readFile(filePath);
        if (!workbook.SheetNames.length) {
            throw new Error('No sheets found in the Excel file.');
        }
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
            throw new Error(`Sheet with name "${sheetName}" not found.`);
        }
        const jsonData = xlsx_1.default.utils.sheet_to_json(sheet);
        if (!jsonData.length) {
            throw new Error('No data found in the sheet.');
        }
        jsonData.map((row) => {
            const { error } = (0, policy_sheet_1.PolicySheetJoiValidation)(row);
            if (error) {
                new Error(error.message);
            }
        });
        worker_threads_1.parentPort?.postMessage({ status: "success", message: "Data successfully imported", data: jsonData });
    }
    catch (error) {
        console.error('Error processing XLSX file:', error.message);
        worker_threads_1.parentPort?.postMessage({ status: "error", message: error.message });
    }
};
const processCsv = (filePath) => {
    const csvData = [];
    const readStream = fs_1.default.createReadStream(filePath).pipe((0, csv_parse_1.parse)({ columns: true }));
    readStream
        .on('data', (row) => {
        const { error } = (0, policy_sheet_1.PolicySheetJoiValidation)(row);
        if (error) {
            readStream.destroy(new Error(error.message));
        }
        csvData.push(row);
    })
        .on('end', async () => {
        try {
            worker_threads_1.parentPort?.postMessage({ status: "success", message: "Data successfully imported", data: csvData });
        }
        catch (err) {
            worker_threads_1.parentPort?.postMessage({ status: "error", message: err?.message });
        }
    })
        .on('error', (err) => {
        worker_threads_1.parentPort?.postMessage({ status: "error", message: err.message });
    });
};
if (worker_threads_1.workerData.fileType === ".xlsx") {
    processXlsx(worker_threads_1.workerData.filePath);
}
else if (worker_threads_1.workerData.fileType === ".csv") {
    processCsv(worker_threads_1.workerData.filePath);
}
else {
    worker_threads_1.parentPort?.postMessage("Unsupported file type");
}
