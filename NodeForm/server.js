const http = require("http");
const fs = require("fs");

//created server
const app = http.createServer((req, res) => {
    const url = req.url;
    try {
        if (url === "/") {
            res.setHeader('Content-Type', 'text/html');
            //read the file
            const fileContent = fs.readFileSync("./Files/Home.html", 'utf8');
            res.write("<html>")
            res.write("<head><title>Home</title></head>")
            res.write('<body>');
            res.write(fileContent);
            res.write('<form action="/message" method="POST"><input type="text" name="msg"><button type="submit">Submit</button></form>')
            res.write('</body>');
            res.write("</html>")
            return res.end();
        } else if (url === "/message" && req.method === "POST") {
            const body = [];
            //listen from data that is coming
            req.on('data', (chunk) => {
                body.push(chunk);
            })

            //when stream end get the data from buffer . add it in file
            req.on('end', async () => {
                const parseBody = Buffer.concat(body).toString();
                const storeInFile = parseBody.split('=')[1];
                fs.writeFile("./Files/Home.html", storeInFile, (err) => {
                    if (err) throw err;
                    console.log('File is created successfully.');
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                });
            })
        } else {
            const fileContent = fs.readFileSync("./Files/404.html", 'utf8');
            res.write("<html>")
            res.write("<head><title>Home</title></head>")
            res.write('<body>');
            res.write(fileContent);
            res.write('</body>')
            res.write("</html>")
            res.end();
        }
    } catch (err) {
        console.log(err);
    }
})

//listen for request
app.listen(4000, () => {
    console.log(`server is running on http://localhost:${4000} `);
})

