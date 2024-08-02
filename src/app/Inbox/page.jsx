"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../sidebar/page'; // Adjust the import based on the relative path

const Inbox = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className="p-8 flex-1">
        <h1 className="text-2xl font-bold mb-4">Inbox</h1>

        {/* Task List Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
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

export default Inbox;
