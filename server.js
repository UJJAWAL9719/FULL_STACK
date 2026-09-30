const http = require("http");
const url = require("url");

const students = [
    { id: 1, name: "Ujjawal", age: 21, course: "CSE" },
    { id: 2, name: "Rahul", age: 22, course: "CSE" },
    { id: 3, name: "Aman", age: 20, course: "IT" }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === "GET" && pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Student Server");
    }
else if (req.method === "GET" && pathname === "/search") {
    const keyword = parsedUrl.query.keyword;

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("You searched for: " + keyword);
}
    else if (req.method === "GET" && pathname === "/students") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students));
    }

    else if (req.method === "GET" && pathname.startsWith("/students/")) {
        const id = parseInt(pathname.split("/")[2]);

        const student = students.find(student => student.id === id);

        if (student) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Student not found" }));
        }
    }

    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page Not Found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});