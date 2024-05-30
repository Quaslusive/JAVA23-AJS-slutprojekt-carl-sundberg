import React, { useState } from 'react';
import { db, ref } from '../utils/firebaseConfig';
import { push, update } from "firebase/database";

function AddTaskForm  () {
    const [newTask, setNewTask] = useState('');
    const [newCategory, setNewCategory] = useState('UX');

    function handleAddTask () {
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
        update(ref(db), updates);
        setNewTask('');
        console.log(ref(db) );
    }

    return (
        <div className="add-task-form">
            <input
                type="text"
                placeholder="Enter Assignment"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            >
                <option className='ux' value="UX">UX</option>
                <option className='Backend' value="Dev Backend">Dev Backend</option>
                <option className='Frontend' value="Dev Frontend">Dev Frontend</option>
            </select>
            <button onClick={handleAddTask}>Add Assignment</button>
        </div>
    );
}

export default AddTaskForm;
