const http = require("http");

//creating an server
const app = http.createServer((req, res) => {
    const url = req.url;
    res.setHeader('Content-Type', 'text/html');
    res.write("<html>")
    res.write("<head><title>Routes</title></head>")
    if (url === "/home") {
        res.write("<body><h1>Welcome Home</h1></body>");
    } else if (url === "/about") {
        res.write("<body><h1>Welcome to About us Page</h1></body>");
    } else if (url === "/node") {
        res.write("<body><h1>Welcome to My Nodejs Project</h1></body>");
    } else {
        res.write("<body><h1>404 No Page Found</h1></body>");
    }
    res.write("</html>")
    res.end();
});

//listener for request
app.listen(4000, () => {
    console.log(`Ankush server is running on ${4000}`)
});


