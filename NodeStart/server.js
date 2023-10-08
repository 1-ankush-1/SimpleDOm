const http = require("http");

//creating an server
const app = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html>")
    res.write("<head><title>My First Page</title></head>")
    res.write("<body><h1>Welcome to My Nodejs Project</h1></body>");
    res.write("</html>")
    res.end();
});

//listener for request
app.listen(4000, () => {
    console.log(`Ankush server is running on ${4000}`)
});


