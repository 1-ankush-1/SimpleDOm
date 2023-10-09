const http = require("http");
const routes = require("./Route/routes.js");

//created server
const app = http.createServer(routes);

//listen for request
app.listen(4000, () => {
    console.log(`server is running on http://localhost:${4000} `);
})

