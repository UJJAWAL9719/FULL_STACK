const fs = require("fs");

fs.writeFile("student.txt", "Name: Ujjawal Chauhan\nRoll Number: 101", (err) => {
    if (err) throw err;

    console.log("student.txt created and data written.");

    fs.appendFile("student.txt", "\nCourse: B.Tech CSE", (err) => {
        if (err) throw err;

        console.log("Course appended successfully.");

        fs.readFile("student.txt", "utf8", (err, data) => {
            if (err) throw err;

            console.log("\nFile Content:");
            console.log(data);

            fs.rename("student.txt", "profile.txt", (err) => {
                if (err) throw err;

                console.log("File renamed to profile.txt");
            });
        });
    });
});