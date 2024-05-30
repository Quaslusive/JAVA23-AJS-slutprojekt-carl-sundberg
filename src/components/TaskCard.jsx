import React, {useState} from 'react';

function TaskCard  ({ id, task, updateTask, deleteTask })  {
    const [assignedUser, setAssignedUser] = useState('');

    function handleAssignUser() {
        if (assignedUser.trim() !=='') {
            updateTask(id, {assignedUser, column: 'in-progress'});
            setAssignedUser('');
        }
    }

    return (

        <div className="assignment">
            <p>{task.description}</p>
            <small>Department: {task.category}</small>
            {task.assignedUser && <p>Assigned to: {task.assignedUser}</p>}
            {task.column === 'to-do' && (
                <div>
                    <input
                        type="text"
                        placeholder="Assign user"
                        value={assignedUser}
                        onChange={(event) => setAssignedUser(event.target.value)}
                    />
                    <button onClick={handleAssignUser}>Assign >></button>
                </div>
            )}
            {task.column === 'in-progress' && (
                <button onClick={() => updateTask(id, { column: 'done' })}>Done >></button>
            )}
            {task.column === 'done' && (
                <button onClick={() => deleteTask(id)}>Remove</button>
            )}
        </div>
    );

    }


export default TaskCard;
