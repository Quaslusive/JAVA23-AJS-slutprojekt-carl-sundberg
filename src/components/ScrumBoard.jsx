import React, { useState, useEffect } from 'react';
import { db, ref } from '../utils/firebaseConfig';
import { onValue, update, remove } from "firebase/database";
import AddTaskForm from './AddTaskForm';
import Column from './Column';

const ScrumBoard = () => {
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const tasksRef = ref(db, 'assignment');
        const unsubscribe = onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            setTasks(data || {});
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const updateTask = (taskId, updates) => {
        update(ref(db, `assignment/${taskId}`), updates);
    };

    const deleteTask = (taskId) => {
        remove(ref(db, `assignment/${taskId}`));
    };

    return (
        <div className="scrum-board">
            <AddTaskForm />
            <div className="columns">
                <Column
                    title="To Do"
                    tasks={Object.entries(tasks).filter(([id, task]) => task.column === 'to-do')}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
                <Column
                    title="In Progress"
                    tasks={Object.entries(tasks).filter(([id, task]) => task.column === 'in-progress')}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
                <Column
                    title="Done"
                    tasks={Object.entries(tasks).filter(([id, task]) => task.column === 'done')}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            </div>
        </div>
    );
};

export default ScrumBoard;
