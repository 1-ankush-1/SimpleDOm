import {Router} from "express";
import TodoController from "../controller/todo-controller";

const router = Router();

router.post('/addtodo',TodoController.addTodo)

router.put('/todo',TodoController.updateTodo);

router.delete('/todo',TodoController.deleteTodo)

router.get("/",TodoController.getTodo)

router.use((req,res,next)=>{
    res.status(500).send({message:"no routes found"});
})

export default router;