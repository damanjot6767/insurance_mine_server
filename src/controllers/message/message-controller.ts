
import { addSheduleMessageToQueue } from "../../queue-services/shedule-message-queue";
import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";

export const createSingleMessageOnSheduleDate = asyncHandler(async (req, res) => {

    const payload = req.body;

    const [hour, minute, second] = payload.time.split(':').map(Number);
    const [year, month, dayOfMonth] = payload.day.split('-').map(Number);

    const sheduleDate = new Date(year, month - 1, dayOfMonth, hour, minute, 0);

    if (isNaN(sheduleDate.getTime())) {
        return res.status(400).json(new ApiResponse(201, 'error', 'Invalid date or time format'));
    }

    if (sheduleDate <= new Date()) {
        return res.status(400).json(new ApiResponse(202, 'error', 'Scheduled date must be in the future.'));
    }

    const jobId = await addSheduleMessageToQueue(payload.message, sheduleDate);

    return res.status(200).json(new ApiResponse(200, {id: jobId}, "Message sheduled sucessfully"));

});