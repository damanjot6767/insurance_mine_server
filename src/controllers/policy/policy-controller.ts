import { Worker } from "worker_threads";
import path from "path";
import { asyncHandler } from "../../utils/async-handler"
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";


export const createPolicyDataThroughtSheet = asyncHandler(async (req, res) => {
    if(!req.file?.path) throw new ApiError(500, "file required");

    const filePath = req.file.path

    const worker = new Worker( path.resolve(__dirname, 'policy-worker.mjs'),{
        workerData: {
            filePath: filePath,
            fileType: path.extname(req.file.originalname).toLowerCase()
        }
    })

    worker.on('message', (message)=>{
        return res.
        status(201).
        json(
            new ApiResponse(
                201, message, 'data created successfully'
            )
        )
    })

    worker.on('error', (error)=>{
        console.log("error", error)
        throw new ApiError(500, "something went wrong while import policy data");
    })
})