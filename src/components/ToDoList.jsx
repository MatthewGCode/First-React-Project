import React, {useState, useEffect} from "react";
import Task from "./Task.jsx";

export default function ToDoList() {
    const [currId, setCurrId] = useState(0);
    const [tasks, setTasks] = useState({});
    const [tasksLeft, setTasksLeft] = useState(0);

    useEffect(() => {
        document.title = Object.keys(tasks).length === 0? "To Do List" : `To Do List - ${tasksLeft} incomplete task${tasksLeft === 1? "" : "s"}`;
    }, [tasks, tasksLeft]);

    function addTask(){
        let name = ""
        name = window.prompt("What is this task? ");
        if(name === null || name === "") return;
        const newTask = {id: currId, taskName: name, isCompleted: false}
        let newTasks = tasks;
        newTasks[currId] = newTask;
        setTasks(newTasks);
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
        let newTasks = tasks;
        if(!newTasks[taskId].isCompleted)
            setTasksLeft(tasksLeft-1);
        delete newTasks[taskId];
        setTasks(newTasks);
        setCurrId(currId+1);
    }

    function changeTaskName(name, taskId) { 
        let newTasks = tasks;
        newTasks[taskId].name = name;
        setTasks(newTasks);
    }

    function changeTaskStatus(taskId) {
        let newTasks = tasks;
        if(tasks[taskId].isCompleted)
            setTasksLeft(tasksLeft+1);
        else 
            setTasksLeft(tasksLeft-1);
        newTasks[taskId].isCompleted = !newTasks[taskId].isCompleted;

        setTasks(newTasks);
    }

    return (
        <div className="to-do-list list">
                <h1 className = "list-title">To Do List: 
                    <span id = "tasks-left" style = {{display: tasks.length === 0? "none" : "inline"}}>{tasksLeft}</span>   
                </h1>
            <hr style = {{border: "3px solid #333", margin: "0 1rem"}}/>

            {Object.keys(tasks).map((taskId) => (
                    <Task 
                        key = {taskId} 
                        taskObj = {tasks[taskId]} 
                        onDelete = {deleteTask}
                        onNameChange = {changeTaskName} 
                        onStatusChange = {changeTaskStatus}
                    />
                )  
            )}

            <div className = "item" onClick = {addTask}>
                <p> + Add Task</p>
            </div>
        </div>
    );
}