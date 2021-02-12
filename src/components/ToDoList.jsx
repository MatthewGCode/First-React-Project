import React, {useState, useEffect} from "react";
import Task from "./Task.jsx";

export default function ToDoList() {
    const [currId, setCurrId] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [tasksLeft, setTasksLeft] = useState(0);

    useEffect(() => {
        document.title = tasks.length === 0? "To Do List" : `To Do List - ${tasksLeft} incomplete task${tasksLeft === 1? "" : "s"}`;
    }, [tasks, tasksLeft]);

    function addTask(){
        let name = ""
        name = window.prompt("What is this task? ");
        if(name === null || name === "") return;
        const newTask = {id: currId, taskName: name, isCompleted: false}
        setTasks([...tasks, newTask]);
        setCurrId(currId+1);
        setTasksLeft(tasksLeft+1);
    }

    useEffect(() => {
        const eventFunction = (e) => {
            if(e.code === "ArrowRight") addTask();
        }
        
        document.addEventListener("keydown", eventFunction);
        return () => {
            document.removeEventListener("keydown", eventFunction);
        }
    });

    function deleteTask(taskId) {
        for(let taskObj of tasks) 
            if(taskObj.id === taskId && !taskObj.isCompleted) setTasksLeft(tasksLeft-1);
        setTasks(tasks.filter((task) => task.id !== taskId));
    }

    function changeTaskName(name, taskId) { 
        setTasks(
            tasks.map((taskObj) => taskObj.id === taskId? {id: taskObj.id, name: name, isCompleted: taskObj.isCompleted} : taskObj)
        );
    }

    function changeTaskStatus(taskId) {
        for(let taskObj of tasks) 
            if(taskObj.id === taskId) setTasksLeft(taskObj.isCompleted? tasksLeft+1: tasksLeft-1);

        setTasks(
            tasks.map((taskObj) => taskObj.id === taskId? {id: taskObj.id, name: taskObj.name, isCompleted: !taskObj.isCompleted} : taskObj)
        );
    }

    return (
        <div className="to-do-list list">
                <h1 className = "list-title">To Do List: 
                    <span id = "tasks-left" style = {{display: tasks.length === 0? "none" : "inline"}}>{tasksLeft}</span>   
                </h1>
            <hr style = {{border: "3px solid #333", margin: "0 1rem"}}/>

            {tasks.map((taskObj) => <Task 
                key = {taskObj.id} 
                taskObj = {taskObj} 
                onDelete = {deleteTask}
                onNameChange = {changeTaskName} 
                onStatusChange = {changeTaskStatus}
                />)}

            <div className = "item" onClick = {addTask}>
                <p> + Add Task</p>
            </div>
        </div>
    );
}