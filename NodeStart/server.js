const http = require("http");

//creating an server
const app = http.createServer((req, res) => {
    res.write("Ankush");
    res.end();
});

//listener for request
app.listen(4000, () => {
    console.log(`Ankush server is running on ${4000}`)
});


