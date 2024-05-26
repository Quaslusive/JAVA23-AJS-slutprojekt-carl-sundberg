/*
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

 */

import React from "react";
import ScrumBoard from './ScrumBoard.jsx';
//import './src/css/style.css'; // Add some basic styling

const App = () => {
    return (
        <div className="App">
            <h1>Scrum Board</h1>
            <ScrumBoard />
        </div>
    );
};

export default App;
