const os = require("os");

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Total Memory:", os.totalmem(), "bytes");
console.log("Free Memory:", os.freemem(), "bytes");
console.log("CPU Cores:", os.cpus().length);
console.log("System Uptime:", (os.uptime() / 60).toFixed(2), "minutes");