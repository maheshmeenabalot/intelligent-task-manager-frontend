import React from 'react';

const TaskList = ({ tasks, handleEditTask, handleDeleteTask, handleAddCollaborator }) => {
  return (
    <div className='space-y-6'>
      {tasks.map((task) => (
        <div key={task._id} className='bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='p-6 bg-primary'>
            <div className='flex justify-between items-center'>
              <h3 className='text-2xl font-bold text-white'>{task.task}</h3>
              <div className='flex space-x-2 sm:space-x-4'>
                <button
                  onClick={() => handleEditTask(task)}
                  className='hidden sm:inline-block px-4 py-2 bg-secondary text-white rounded hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-secondary'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className='hidden sm:inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAddCollaborator(task)}
                  className='hidden sm:inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
                >
                  Add Collaborators
                </button>
              </div>
            </div>
          </div>
          <div className='p-6 bg-white'>
            <p className='text-xl font-semibold mb-4'>{task.description}</p>
            <div className='font-semibold text-xl grid font-bold grid-cols-2 gap-4'>
              <p className='flex items-center'>
                <span className='font-bold mr-2'>Due Date:</span> {task.dueDate}
              </p>
              <p className='flex items-center'>
                <span className='font-bold mr-2'>Priority:</span> {task.priority}
              </p>
              <p className='flex items-center'>
                <span className='font-bold mr-2'>Status:</span> {task.status}
              </p>
            </div>
          </div>
          {/* Buttons for small screens (hidden on large screens) */}
          <div className='p-4 sm:hidden'>
            <button
              onClick={() => handleEditTask(task)}
              className='block w-full px-4 py-2 bg-secondary text-white rounded hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-secondary mb-2'
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className='block w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-2'
            >
              Delete
            </button>
            <button
              onClick={() => handleAddCollaborator(task)}
              className='block w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              Add Collaborators
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
