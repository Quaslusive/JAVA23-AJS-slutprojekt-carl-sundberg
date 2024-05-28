import React, { useState, useEffect } from 'react';
import { db, ref } from '../utils/firebaseConfig';
import { onValue, set, update, remove, push } from "firebase/database";

const ScrumBoard = () => {
    const [tasks, setTasks] = useState({});
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskDepartment, setNewTaskDepartment] = useState('UX');

    useEffect(() => {
        const tasksRef = ref(db, 'tasks');
        const unsubscribe = onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            setTasks(data || {});
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleAddTask = () => {
        if (newTaskDescription.trim() === '') {
            alert('Task description cannot be empty.');
            return;
        }
        const newTaskKey = push(ref(db, 'tasks')).key;
        const updates = {};
        updates[`/tasks/${newTaskKey}`] = {
            description: newTaskDescription,
            column: 'to-do',
            department: newTaskDepartment
        };
        update(ref(db), updates);
        setNewTaskDescription('');
    };

    const updateTask = (taskId, updates) => {
        update(ref(db, `tasks/${taskId}`), updates);
    };

    const delTask = (taskId) => {
        remove(ref(db, `tasks/${taskId}`));
    };

    return (
        <div className="scrum-board">

            <div className="add-task-form">
                <input
                    type="text"
                    placeholder="Enter task description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <select
                    value={newTaskDepartment}
                    onChange={(e) => setNewTaskDepartment(e.target.value)}
                >
                    <option value="UX">UX</option>
                    <option value="Dev Backend">Dev Backend</option>
                    <option value="Dev Frontend">Dev Frontend</option>
                </select>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="columns">
                <div className="column to-do">
                    <h2>To Do</h2>
                    {Object.entries(tasks)
                        .filter(([id, task]) => task.column === 'to-do')
                        .map(([id, task]) => (
                            <div key={id} className="task">
                                <p>{task.description}</p>
                                <small>Department: {task.department}</small>
                                <button onClick={() => updateTask(id, { column: 'in-progress' })}>Start</button>
                            </div>
                        ))}
                </div>

                <div className="column in-progress">
                    <h2>In Progress</h2>
                    {Object.entries(tasks)
                        .filter(([id, task]) => task.column === 'in-progress')
                        .map(([id, task]) => (
                            <div key={id} className="task">
                                <p>{task.description}</p>
                                <small>Department: {task.department}</small>
                                <button onClick={() => updateTask(id, { column: 'done' })}>Done</button>
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
