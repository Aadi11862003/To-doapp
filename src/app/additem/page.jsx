"use client"

import { useState, useEffect } from 'react';
import Navbar from '../sidebar/page'; // Ensure this path is correct

const AddTask = () => {
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [priority, setPriority] = useState('low');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage when component mounts
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (Array.isArray(savedTasks)) {
      setTasks(savedTasks);
    } else {
      setTasks([]); // Ensure tasks is always an array
    }
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      const newTask = {
        text: taskInput.trim(),
        dueDate,
        reminder,
        priority
      };
      const updatedTasks = [...tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setTaskInput('');
      setDueDate('');
      setReminder('');
      setPriority('low');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    const newTaskText = prompt('Edit task:', taskToEdit.text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: newTaskText.trim() } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="p-8 flex-1">
        <h1 className="text-2xl font-bold mb-4">Add Task</h1>

        {/* Input Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <form onSubmit={handleAddTask} className="flex flex-col space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder="Enter new task"
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Task
              </button>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex-1">
                <input
                  type="time"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex-1">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Task List Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          {tasks.length === 0 ? (
            <p>No tasks added yet.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border rounded-lg flex flex-col space-y-2 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex-1">
                      <span className="font-bold">Task:</span> {task.text}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTask(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <span><span className="font-bold">Due:</span> {task.dueDate || 'N/A'}</span>
                    <span><span className="font-bold">Reminder:</span> {task.reminder || 'N/A'}</span>
                    <span><span className="font-bold">Priority:</span> {task.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;


