import React, { useState, useEffect } from 'react';
import { db, ref } from '../utils/firebaseConfig';
import { onValue, update, remove } from "firebase/database";
import AddTaskForm from './AddTaskForm';
import Column from './Column';

function ScrumBoard () {
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const tasksRef = ref(db, 'assignments');
        const listener = onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            setTasks(data || {});
        });


        return () => listener();
    }, []);

    const updateTask = (taskId, updates) => {
        update(ref(db, `assignments/${taskId}`), updates);
    };

    const deleteTask = (taskId) => {
        remove(ref(db, `assignments/${taskId}`));
    };

    return (
        <div className="scrum-board">
            <AddTaskForm />
            <div className="columns">
                <Column
                    title="To Do"
                    tasks={Object.entries(tasks).filter(([id, task]) => task.status === 'to-do')}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
                <Column
                    title="In Progress"
                    tasks={Object.entries(tasks).filter(([id, task]) => task.status === 'in-progress')}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
                <Column
                    title="Done"
                    tasks={Object.entries(tasks).filter(([id, task]) => task.status === 'done')}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            </div>
        </div>
    );
}

export default ScrumBoard;
