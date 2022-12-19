import React from 'react';
import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';

// maybe delete this? (receiving tasks from API) lines 9 - 20
const TASKSLIST = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  // useEffect to grab list of tasks from DB to use as state
  // useEffect(()=> {1st param, 2nd param})
  // replace state with list of tasks from useEffect
  const [tasks, setTasks] = useState(TASKSLIST);
  // const [tasks, setComplete] = useState(TASKSLIST);
  console.log('tasklist:', tasks);

  console.log(tasks);
  // update completeTask function (toggleCompleteTask in README)
  // to update task isComplete in the DB
  // figure out how
  const completeTask = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        console.log('id:', id, 'task', task);
        if (task.id === id) {
          console.log('isComplete', task.isComplete);
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      })
    );
  };

  // update tasks, leverage the state
  const deleteTask = (id) => {
    console.log('in delete!');
    console.log('deletable task');
    // fix functionality! wrap next three lines in
    let updatedTasks = tasks.filter((task) => task.id !== id);
    console.log(updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
