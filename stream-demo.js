const fs = require("fs");

let content = "";

for (let i = 1; i <= 50; i++) {
    content += `This is line number ${i}\n`;
}

fs.writeFileSync("large-file.txt", content);

console.log("File created with 50 lines.");

const readStream = fs.createReadStream("large-file.txt", {
    encoding: "utf8"
});

readStream.on("data", (chunk) => {
    console.log("Chunk received:", Buffer.byteLength(chunk), "bytes");
});

readStream.on("end", () => {
    console.log("Finished reading file.");
});