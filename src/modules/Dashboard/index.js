import React, { useEffect, useState } from 'react';
import avatar from '../../assets/avatar.svg';
import { io } from 'socket.io-client';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import TaskForm from './TaskForm';

const socket = io(process.env.REACT_APP_API_BASE_URL); // Initialize Socket.io connection

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user:detail')); // Removed setUser
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ task: '', description: '', dueDate: '', priority: 'Low', status: 'Pending', collaborators: [] });
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // For modal
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false); // For task form modal

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tasks/${user.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) {
          throw new Error(`Error fetching tasks: ${res.statusText}`);
        }
        const resData = await res.json();
        setTasks(resData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message);
      }
    };
    fetchTasks();

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) => prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    });
    socket.on('taskAdded', (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    return () => {
      socket.off('taskUpdated');
      socket.off('taskAdded');
    };
  }, [user.id, setError]);

  const handleAddOrUpdateTask = async () => {
    if (newTask.task.trim() === '') {
      setError('Task name cannot be empty.');
      return;
    }

    try {
      const payload = { ...newTask, userId: user.id };
      const method = editingTask ? 'PUT' : 'POST';
      const url = editingTask ? `${process.env.REACT_APP_API_BASE_URL}/api/tasks/${editingTask._id}` : `${process.env.REACT_APP_API_BASE_URL}/api/tasks`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(`Error adding/updating task: ${resData.message}`);
      } else {
        setNewTask({ task: '', description: '', dueDate: '', priority: 'Low', status: 'Pending', collaborators: [] });
        setEditingTask(null);
        setError(null); // Clear any previous errors
        if (method === 'POST') {
          socket.emit('taskAdded', resData);
        } else {
          socket.emit('taskUpdated', resData);
        }
        setIsTaskFormVisible(false); // Hide the task form modal after adding/updating
      }
    } catch (error) {
      console.error('Error adding/updating task:', error);
      setError(error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error('Error: taskId is undefined');
      setError('Task ID is undefined');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId)); // Changed task.id to task._id
      } else {
        const resData = await res.json();
        throw new Error(`Error deleting task: ${resData.message}`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleEditTask = (task) => {
    setNewTask({
      task: task.task,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      collaborators: task.collaborators,
    });
    setEditingTask(task);
    setIsTaskFormVisible(true); // Show the task form modal when editing a task
  };

  const handleAddCollaborator = (task) => {
    setSelectedTask(task);
  };

  const handleCollaboratorAdded = async (updatedTask) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tasks/${updatedTask._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(`Error updating task: ${resData.message}`);
      } else {
        setTasks((prevTasks) => prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task));
        socket.emit('taskUpdated', resData);
        setSelectedTask(null);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      setError(error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  useEffect(() => {
    console.log('Search Query:', searchQuery);
    console.log('Filter Status:', filterStatus);
    console.log('Filter Priority:', filterPriority);
  }, [searchQuery, filterStatus, filterPriority]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearchQuery = task.task.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status.toLowerCase() === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority.toLowerCase() === filterPriority;
    return matchesSearchQuery && matchesStatus && matchesPriority;
  });

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      {/* Header */}
      <div className=' p-0'>
      <header className='w-full md:w-auto bg-slate-600 text-white p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Intelligent Task Manager</h1>
          <div className='flex items-center space-x-4'>
            <img
              src={avatar}
              alt='User Avatar'
              className='w-12 h-12 rounded-full border-2 border-white'
            />
            <div>
              <h3 className='text-xl font-bold'>{user?.fullName}</h3>
              <p className='text-gray-300'>My Account</p>
            </div>
          </div>
        </div>
      </header>
      </div>
  
      {/* Main Content */}
      <div className='flex-1 overflow-auto p-4 bg-background text-text'>
        {/* Search and Filters */}
        <div className='flex flex-wrap items-center space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-4 mb-6'>
          <input
            type='text'
            placeholder='Search tasks...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full md:w-auto px-4 py-2 border border-navy-blue rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-navy-blue text-navy-blue'
          />
          <div className='flex items-center space-x-2'>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border border-navy-blue rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy-blue text-navy-blue'
            >
              <option value='all'>All Statuses</option>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className='px-4 py-2 border border-navy-blue rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-navy-blue text-navy-blue'
            >
              <option value='all'>All Priorities</option>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>
        </div>
  
        {/* Task List */}
        <div className='w-full bg-white border-b border-gray-200 flex items-center justify-between mb-2'>
          <button
            onClick={() => setIsTaskFormVisible(true)}
            className='bg-secondary text-white py-2 px-4 rounded-md shadow-sm hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-secondary'
          >
            Add Task
          </button>
        </div>
  
        <TaskList
          tasks={filteredTasks}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleAddCollaborator={handleAddCollaborator}
        />
  
        {/* Task Modal */}
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={handleCloseModal}
            onCollaboratorAdded={handleCollaboratorAdded}
          />
        )}
  
        {/* Task Form */}
        {isTaskFormVisible && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-md shadow-md'>
              <TaskForm
                newTask={newTask}
                setNewTask={setNewTask}
                handleInputChange={handleInputChange}
                handleAddOrUpdateTask={handleAddOrUpdateTask}
                editingTask={editingTask}
                setIsTaskFormVisible={setIsTaskFormVisible}
              />
            </div>
          </div>
        )}
  
        {/* Error */}
        {error && (
          <div className='mt-4 text-red-500'>
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Dashboard;
