import { todoRequestBodytext, todoRequestParamsId } from "../Types/todo-type";
import { Todo } from "../models/todo";

//storage
let todos:Todo[] = [];

export const getTodo = (req:any,res:any,next:any)=>{     //any because we donot know the types
    res.status(200).send({todos:todos});
}

export const addTodo = (req:any,res:any,next:any)=>{
    const body = req.body as todoRequestBodytext        //separate alias of specific type
    const newTodo:Todo = {
        id:new Date().toISOString(),
        text:body.text
    };
    todos.push(newTodo);

    res.status(200).json({
        message:"Added",
        todo:newTodo,
        todos:todos
    });
}

export const updateTodo = (req:any,res:any,next:any)=>{
    const params = req.query as todoRequestParamsId;
    const body = req.body as todoRequestBodytext
    const todoIndex = todos.findIndex(todoItem => todoItem.id === params.todoId);

    if(todoIndex > 0){
        todos[todoIndex] = {id:todos[todoIndex].id, text:body.text};
        return res.status(200).json({message:"updated successfully",todos});
    }
    res.status(404).json({message:"not find todo"});
}

export const deleteTodo = (req:any,res:any,next:any)=>{
    const params  = req.query as todoRequestParamsId;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({message:"deleted todo",todos});
}

export default {
    addTodo,
    deleteTodo,
    updateTodo,
    getTodo
}