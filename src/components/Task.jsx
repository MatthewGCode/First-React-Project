import React, {useState} from "react";

export default function Task(props) {
    const {taskObj} = props;
    const [completedStatus, setCompletedStatus] = useState(false);
    const [taskName, setTaskName] = useState(taskObj.taskName);

    function handleBoxClicked(e) {
        props.onStatusChange(taskObj.id);
        setCompletedStatus(!completedStatus);
    }

    function handleNameChange(e) {
        const newTaskName = e.target.value;
        setTaskName(newTaskName);
        props.onNameChange(newTaskName, taskObj.id);
    }

    return (
        <div className="task item">
            <input 
                type="checkbox" 
                checked = {completedStatus}
                className="task-checkbox" 
                onChange = {handleBoxClicked}
            />
            <input 
                type = "text" 
                className = "task-name item-name" 
                value = {taskName}
                onChange = {handleNameChange} 
            />
            <button className="delete-btn list-btn" onClick = {() => props.onDelete(taskObj.id)}>Delete</button>
        </div>
    )
}