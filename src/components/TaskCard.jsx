import React from 'react';

function TaskCard  ({ id, task, updateTask, deleteTask })  {

    return (
        <div className="assignment">
            <p>{task.description}</p>
            <p>Department: {task.department}</p>
            {task.column !== 'done' ? (
                <button onClick={() => updateTask(id, { column: task.column === 'to-do' ? 'in-progress' : 'done' })}>
                    {task.column === 'to-do' ? 'Assign >>' : 'Done >>'}
                </button>
            ) : (
                <button onClick={() => deleteTask(id)}>Remove</button>
            )}
        </div>
    );
}


export default TaskCard;
