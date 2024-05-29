import React, { useState } from 'react';
import { db, ref } from '../utils/firebaseConfig';
import { push, update } from "firebase/database";

function AddTaskForm  () {
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState('UX');

    const handleAddTask = () => {
        if (newTaskDesc.trim() === '') {
            alert('Description cannot be empty.');
            return;
        }
        const newTaskKey = push(ref(db, 'assignment')).key;
        const updates = {};
        updates[`/assignment/${newTaskKey}`] = {
            department: newTaskCategory,
            description: newTaskDesc,
            column: 'to-do'
        };
        update(ref(db), updates);
        setNewTaskDesc('');
    };

    return (
        <div className="add-task-form">
            <input
                type="text"
                placeholder="Enter task description"
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
            />
            <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
            >
                <option value="UX">UX</option>
                <option value="Dev Backend">Dev Backend</option>
                <option value="Dev Frontend">Dev Frontend</option>
            </select>
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default AddTaskForm;
