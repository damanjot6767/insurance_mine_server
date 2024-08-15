"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSingleMessageOnSheduleDate = void 0;
const shedule_message_queue_1 = require("../../queue-services/shedule-message-queue");
const api_response_1 = require("../../utils/api-response");
const async_handler_1 = require("../../utils/async-handler");
exports.createSingleMessageOnSheduleDate = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const payload = req.body;
    const [hour, minute, second] = payload.time.split(':').map(Number);
    const [year, month, dayOfMonth] = payload.day.split('-').map(Number);
    const sheduleDate = new Date(year, month - 1, dayOfMonth, hour, minute, 0);
    if (isNaN(sheduleDate.getTime())) {
        return res.status(400).json(new api_response_1.ApiResponse(201, 'error', 'Invalid date or time format'));
    }
    if (sheduleDate <= new Date()) {
        return res.status(400).json(new api_response_1.ApiResponse(202, 'error', 'Scheduled date must be in the future.'));
    }
    const jobId = await (0, shedule_message_queue_1.addSheduleMessageToQueue)(payload.messsage, sheduleDate);
    return res.status(200).json(new api_response_1.ApiResponse(200, { id: jobId }, "Message sheduled sucessfully"));
});
