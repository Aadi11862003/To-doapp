"use client";

import { useState, useEffect } from 'react';
import Navbar from '../sidebar/page'; // Ensure this path is correct
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically register the required chart components

const AddTask = () => {
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [priority, setPriority] = useState('low');
  const [tasks, setTasks] = useState([]);
  const [taskCompletionData, setTaskCompletionData] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
    // Load tasks from localStorage when component mounts
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (Array.isArray(savedTasks)) {
      setTasks(savedTasks);
      updateTaskCompletionData(savedTasks);
    } else {
      setTasks([]); // Ensure tasks is always an array
    }

    // Update remaining time every second
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          remainingTime: calculateRemainingTime(task.timestamp),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateRemainingTime = (timestamp) => {
    const createdTime = new Date(timestamp).getTime();
    const currentTime = new Date().getTime();
    const difference = createdTime + 24 * 60 * 60 * 1000 - currentTime;
    if (difference <= 0) return 'Expired';
    const hours = Math.floor((difference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((difference % (60 * 1000)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const priorityColors = {
    low: 'rgb(200, 255, 200)', // light green
    medium: 'rgb(255, 255, 200)', // light yellow
    high: 'rgb(255, 200, 200)' // light red
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      const timestamp = new Date().toISOString();
      const newTask = {
        text: taskInput.trim(),
        dueDate,
        reminder,
        priority,
        timestamp,
        remainingTime: calculateRemainingTime(timestamp),
        bgColor: priorityColors[priority],
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      updateTaskCompletionData(updatedTasks);
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
    updateTaskCompletionData(updatedTasks);
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
      updateTaskCompletionData(updatedTasks);
    }
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    updateTaskCompletionData(updatedTasks);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const updateTaskCompletionData = (tasks) => {
    const completionData = tasks.reduce((acc, task) => {
      if (task.completed) {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
      }
      return acc;
    }, { high: 0, medium: 0, low: 0 });

    setTaskCompletionData(completionData);
  };

  const getChartData = () => {
    const labels = ['High', 'Medium', 'Low'];
    const data = [
      taskCompletionData.high || 0,
      taskCompletionData.medium || 0,
      taskCompletionData.low || 0,
    ];

    return {
      labels,
      datasets: [
        {
          label: 'Task Priority Distribution',
          data,
          backgroundColor: [
            priorityColors.high,
            priorityColors.medium,
            priorityColors.low,
          ],
        },
      ],
    };
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
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          {tasks.length === 0 ? (
            <p>No tasks added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg flex flex-col space-y-2 shadow-sm"
                  style={{ backgroundColor: task.bgColor }}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="break-words max-h-20 overflow-auto">
                      <span className="font-bold">Task:</span> {task.text}
                    </div>
                    <div className="text-gray-500">
                      <span className="font-bold">Remaining:</span> {task.remainingTime}
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskCompletion(index)}
                        />
                        {' '} Completed
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col space-y-1">
                      <span><span className="font-bold">Due:</span> {task.dueDate || 'N/A'}</span>
                      <span><span className="font-bold">Reminder:</span> {task.reminder || 'N/A'}</span>
                      <span><span className="font-bold">Priority:</span> {task.priority}</span>
                      <span><span className="font-bold">Created:</span> {formatTimestamp(task.timestamp)}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Task Completion Pie Chart */}
        <div className="bg-gray-100 p-4 rounded-lg" style={{ width: '300px', height: '300px' }}>
          <h2 className="text-xl font-bold mb-4">Task Priority Distribution</h2>
          <Pie data={getChartData()} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default AddTask;










