"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../sidebar/page'; // Adjust the import based on the relative path

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [todaysTasks, setTodaysTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const filteredTasks = tasks.filter(task => task.dueDate === today);
    setTodaysTasks(filteredTasks);
  }, [tasks]);

  return (
    <div className="flex">
      <Navbar />
      <div className="p-8 flex-1">
        <h1 className="text-2xl font-bold mb-4">Today's Tasks</h1>

        {/* Task List Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          {todaysTasks.length === 0 ? (
            <p>No tasks for today.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {todaysTasks.map((task, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg flex flex-col space-y-2 shadow-sm"
                  style={{ backgroundColor: task.bgColor }}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="break-words max-h-20 overflow-auto">
                      <span className="font-bold">Task:</span> {task.text}
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          readOnly
                        />
                        {' '} Completed
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col space-y-1">
                      <span><span className="font-bold">Due:</span> {task.dueDate || 'N/A'}</span>
                      <span><span className="font-bold">Reminder:</span> {task.reminder || 'N/A'}</span>
                    </div>
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

export default Today;

