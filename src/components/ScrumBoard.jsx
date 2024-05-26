import React, { useState, useEffect } from 'react';
import { db, ref } from '../utils/firebaseConfig';
import { onValue, set, update, remove, push } from "firebase/database";

const ScrumBoard = () => {
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const tasksRef = ref(db, 'tasks');
        const unsubscribe = onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            setTasks(data || {});
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const addTask = (column, task) => {
        const newTaskKey = push(ref(db, 'tasks')).key;
        const updates = {};
        updates[`/tasks/${newTaskKey}`] = { ...task, column };
        update(ref(db), updates);
    };

    const updateTask = (taskId, updates) => {
        update(ref(db, `tasks/${taskId}`), updates);
    };

    const deleteTask = (taskId) => {
        remove(ref(db, `tasks/${taskId}`));
    };

    return (
        <div className="scrum-board">
            <div className="column to-do">
                <h2>To Do</h2>
                {Object.entries(tasks)
                    .filter(([id, task]) => task.column === 'to-do')
                    .map(([id, task]) => (
                        <div key={id} className="task">
                            <p>{task.description}</p>
                            <button onClick={() => updateTask(id, { column: 'in-progress' })}>Start</button>
                        </div>
                    ))}
                <button onClick={() => addTask('to-do', { description: 'New Task' })}>Add Task</button>
            </div>

            <div className="column in-progress">
                <h2>In Progress</h2>
                {Object.entries(tasks)
                    .filter(([id, task]) => task.column === 'in-progress')
                    .map(([id, task]) => (
                        <div key={id} className="task">
                            <p>{task.description}</p>
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
                            <button onClick={() => deleteTask(id)}>Remove</button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ScrumBoard;
