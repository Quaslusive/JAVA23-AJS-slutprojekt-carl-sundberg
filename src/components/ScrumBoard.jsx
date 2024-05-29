import React, { useState, useEffect } from 'react';
import { db, ref } from '../utils/firebaseConfig';
import { onValue, update, remove, push } from "firebase/database";

const ScrumBoard = () => {
    const [tasks, setTasks] = useState({});
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState('UX');

    useEffect(() => {
        const tasksRef = ref(db, 'assignment');
        const unsubscribe = onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            setTasks(data || {});
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleAddTask = () => {
        if (newTaskDesc.trim() === '') {
            alert('Task description cannot be empty.');
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

    const updateTask = (taskId, updates) => {
        update(ref(db, `assignment/${taskId}`), updates);
    };

    const delTask = (taskId) => {
        remove(ref(db, `assignment/${taskId}`));
    };

    return (
        <div className="scrum-board">

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
                <button onClick={handleAddTask}>Add</button>
            </div>
            <div className="columns">
                <div className="column to-do">
                    <h2>To Do</h2>
                    {Object.entries(tasks)
                        .filter(([id, task]) => task.column === 'to-do')
                        .map(([id, task]) => (
                            <div key={id} className="assignment">
                                <p>{task.description}</p>
                                <small>Department: {task.department}</small>
                                <button onClick={() => updateTask(id, { column: 'in-progress' })}>Assign >></button>
                            </div>
                        ))}
                </div>

                <div className="column in-progress">
                    <h2>In Progress</h2>
                    {Object.entries(tasks)
                        .filter(([id, task]) => task.column === 'in-progress')
                        .map(([id, task]) => (
                            <div key={id} className="assignment">
                                <p>{task.description}</p>
                                <small>Department: {task.department}</small>
                                <button onClick={() => updateTask(id, { column: 'done' })}>Done >></button>
                            </div>
                        ))}
                </div>

                <div className="column done">
                    <h2>Done</h2>
                    {Object.entries(tasks)
                        .filter(([id, task]) => task.column === 'done')
                        .map(([id, task]) => (
                            <div key={id} className="task">
                                <p>{task.description}</p>
                                <small>Department: {task.department}</small>
                                <button onClick={() => delTask(id)}>Remove</button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ScrumBoard;
