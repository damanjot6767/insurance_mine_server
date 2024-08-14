import { Worker } from "worker_threads";
import path from "path";
import { asyncHandler } from "../../utils/async-handler"
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";


export const createPolicyDataThroughtSheet = asyncHandler(async (req, res) => {
    if (!req.file?.path) {
        throw new ApiError(500, 'File required');
    }

    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();

    const worker = new Worker(path.resolve(__dirname, './policy-worker.ts'), {
        workerData: { filePath, fileType },
    });

    let responseSent = false;

    worker.on('message', (message) => {
        if (!responseSent) {
            responseSent = true;
            return res.status(201).json(new ApiResponse(201, message, 'Data created successfully'));
        }
    });

    worker.on('error', (error) => {
        if (!responseSent) {
            responseSent = true;
            console.error('Worker error:', error);
            return res.status(500).json(new ApiResponse(500, 'Something went wrong', 'Data creation failed'));
        }
    });

    worker.on('exit', (code) => {
        if (code !== 0 && !responseSent) {
            responseSent = true;
            console.error(`Worker stopped with exit code ${code}`);
            return res.status(500).json(new ApiResponse(500, 'Worker stopped with an error', 'Data creation failed'));
        }
    });
});