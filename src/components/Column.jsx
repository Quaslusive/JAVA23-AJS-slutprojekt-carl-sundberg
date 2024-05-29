import React from 'react';
import TaskCard from './TaskCard';

function Column ({ title, tasks, updateTask, deleteTask })  {
    return (
        <div className={`column ${title.toLowerCase()}`}>
            <h2>{title}</h2>
            {tasks.map(([id, task]) => (
                <TaskCard
                    key={id}
                    id={id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    );
}

export default Column;
