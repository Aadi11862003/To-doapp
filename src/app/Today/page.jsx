"use client";

import { useState, useEffect } from 'react';
import Navbar from '../sidebar/page'; // Ensure this path is correct

const Inbox = () => {
  const [tasks, setTasks] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load tasks and messages from localStorage when the component mounts
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];

    if (Array.isArray(savedTasks)) {
      setTasks(savedTasks);
      // Filter tasks for today's date
      const today = new Date().toISOString().split('T')[0];
      const todays = savedTasks.filter(task => task.dueDate === today);
      setTodaysTasks(todays);
    }

    if (Array.isArray(savedMessages)) {
      setMessages(savedMessages);
    } else {
      setMessages([]); // Ensure messages is always an array
    }
  }, []);

  const handleDeleteMessage = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    // Update today's tasks
    const today = new Date().toISOString().split('T')[0];
    const todays = updatedTasks.filter(task => task.dueDate === today);
    setTodaysTasks(todays);
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="p-8 flex-1">
        <h1 className="text-2xl font-bold mb-4">Inbox</h1>

        {/* Today's Tasks Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Today's Tasks</h2>
          {todaysTasks.length === 0 ? (
            <p>No tasks for today.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {todaysTasks.map((task, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg flex flex-col space-y-2 shadow-sm bg-white"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="font-bold text-lg">{task.text || 'No Task'}</div>
                    <div className="text-gray-700">{task.reminder || 'No Reminder'}</div>
                    <div className="text-sm text-gray-500">{task.timestamp || 'No Date'}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Messages Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          {messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg flex flex-col space-y-2 shadow-sm bg-white"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="font-bold text-lg">{message.subject || 'No Subject'}</div>
                    <div className="text-gray-700">{message.body || 'No Content'}</div>
                    <div className="text-sm text-gray-500">{message.timestamp || 'No Date'}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;


