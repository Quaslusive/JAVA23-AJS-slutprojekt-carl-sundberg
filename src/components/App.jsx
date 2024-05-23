import TaskBoard from "./TaskBoard";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import React from "react";


function App() {
    return (
        <>
            <h2>App</h2>
            <TaskBoard/>
            <Task/>
            <AddTaskForm/>
        </>
      );
}

export default App;