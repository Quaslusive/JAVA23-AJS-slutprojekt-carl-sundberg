import React, {useState} from 'react';

function TaskCard  ({ id, task, updateTask, deleteTask })  {
    const [assigned, setAssigned] = useState('');

    function handleAssignUser() {
        if (assigned.trim() !=='') {
            updateTask(id, {assigned, status: 'in-progress'});
            setAssigned('');
        }
    }
/*
    function handlerKeyPress(event) {
        if (event.key === 'Enter'){
            event.preventDefault();
            handleAssignUser();
        }
    }

 */

    return (
        <div className="task">
            <h4>Assignment:</h4> <h1>{task.assignment}</h1>
            <p>Category: {task.category}</p>
            {task.assigned && <p>Assigned to: {task.assigned}</p> }
            {task.status === 'to-do' && (
                <form onSubmit={handleAssignUser}>
                    <input
                        type="text" placeholder="Assign user" value={assigned} onChange={(event) => setAssigned(event.target.value)}

                    />
                    <button onClick={handleAssignUser}>Assign >></button>
                </form>
            )}
            {task.status === 'in-progress' && (
                <button onClick={() => updateTask(id, { status: 'done' })}
                     >Done >></button>
            )}
            {task.status === 'done' && (
                <button onClick={() => deleteTask(id)}>Remove X</button>
            )}
        </div>
    );

    }


export default TaskCard;
