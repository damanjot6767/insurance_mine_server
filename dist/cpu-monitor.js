"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pm2_1 = __importDefault(require("pm2"));
const MONITOR_INTERVAL_MS = 5000; // Check every 5 seconds
const CPU_THRESHOLD = 70; // CPU usage threshold in percentage
const APP_NAME = 'insurance-mine'; // The name of the application to monitor
function checkCpuUsage() {
    pm2_1.default.list((err, processes) => {
        if (err) {
            console.error('Error fetching PM2 processes:', err);
            return;
        }
        const processToMonitor = processes.find(process => process.name === APP_NAME);
        if (!processToMonitor) {
            console.error(`Process ${APP_NAME} not found.`);
            return;
        }
        const { name, pid, monit } = processToMonitor;
        console.log(`Current cpu usage ${monit.cpu}%`);
        if (monit && monit.cpu > CPU_THRESHOLD) {
            console.log(`Process ${name} (PID: ${pid}) is using ${monit.cpu}% CPU. Restarting...`);
            pm2_1.default.restart(name, err => {
                if (err) {
                    console.error('Error restarting process:', err);
                }
                else {
                    console.log(`Process ${name} (PID: ${pid}) restarted.`);
                }
            });
        }
    });
}
function startMonitoring() {
    pm2_1.default.connect(err => {
        if (err) {
            console.error('Error connecting to PM2:', err);
            process.exit(2);
        }
        setInterval(checkCpuUsage, MONITOR_INTERVAL_MS);
    });
}
startMonitoring();
