import React, { useState } from 'react';
import { db, ref } from '../utils/firebaseConfig';
import { push, update } from "firebase/database";

function AddTaskForm  () {
    const [newTask, setNewTask] = useState('');
    const [newCategory, setNewCategory] = useState('UX');

    function handleAddTask (event) {
        event.preventDefault();
        if (newTask.trim() === '') {
            alert('Beskrivningen kan inte vara tom');
            return;
        }
        const newTaskKey = push(ref(db, 'assignments')).key;
        const updates = {};
        updates[`/assignments/${newTaskKey}`] = {
            assignment: newTask,
            category: newCategory,
            status: 'to-do',
        };
        update(ref(db), updates)
            .then(() => {
                setNewTask('');
            })
            .catch(error => {
                console.error("Error adding task: ", error);
            });
    }

/*
    function handlerKeyPress(event) {
        if (event.key === 'Enter'){
            event.preventDefault();
            handleAddTask();
        }
    }

 */

    return (
        <div>
        <form className="add-task-form" onSubmit={handleAddTask}>
            <input
                type="text"
                placeholder="Enter Assignment"
                value={newTask}
                onChange={event => setNewTask(event.target.value)}
             //   onKeyPress={handlerKeyPress}
            />
            <select
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
               // onKeyPress={handlerKeyPress}
            >
                <option className='ux' value="UX">UX</option>
                <option className='Backend' value="Dev Backend">Dev Backend</option>
                <option className='Frontend' value="Dev Frontend">Dev Frontend</option>
            </select>
            <button type='submit'>Add Assignment</button>
        </form>
        </div>
    );
}

export default AddTaskForm;
