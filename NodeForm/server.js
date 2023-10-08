const http = require("http");
const fs = require("fs");

//created server
const app = http.createServer((req, res) => {
    const url = req.url;
    res.setHeader('Content-Type', 'text/html');
    if (url === "/") {
        res.write("hello");
        res.end();
    } else {
        res.write()
        res.end();
    }
})

//listen for request
app.listen(4000, () => {
    console.log(`server is running on http://localhost:${4000} `);
})

