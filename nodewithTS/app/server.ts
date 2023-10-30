import express from "express";
import bodyParser from "body-parser";
import todoRoutes from "./route/todos-route";

const app = express();

//middleware
app.use(bodyParser.json());

//routes
app.use(todoRoutes)

//server start
app.listen(3000);