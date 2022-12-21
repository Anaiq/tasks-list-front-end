import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useEffect } from 'react';
// import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';

// // maybe delete this? (receiving tasks from API) lines 9 - 20
// const TASKSLIST = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: false,
//   },
//   {
//     id: 3,
//     title: 'Walk the dog',
//     isComplete: false,
//   },
//   {
//     id: 4,
//     title: 'Pick up kiddos',
//     isComplete: false,
//   },
//   {
//     id: 5,
//     title: 'Get the mail',
//     isComplete: false,
//   },
// ];
// maybe delete this? (receiving tasks from API) lines 9 - 20
// const TASKSLIST = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

// alternate version of Base URL
// const BASE_URL = 'https://task-list-api-c17.herokuapp.com';
const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';

// convert from API function goes here:
const convertFromApi = (apiTask) => {
  const { id, title, description, is_complete: isComplete } = apiTask;
  const newTask = { id, title, description, isComplete};
  return newTask;
};

// get request
const getAllTasksApi = () => {
  return axios
    .get(`${kBaseUrl}/tasks`)
    .then((response) => {
      console.log(response.data);
      // return response.data;
      return response.data.map(convertFromApi);
    })
    .catch((error) => {
      console.log(error.data);
    });
};
// delete request
const deleteTasksApi = (id) => {
  return axios
    .delete(`${kBaseUrl}/tasks_${id}`)
    .then((response) => {
      console.log(response.data);
      // return response.data;
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
};
// patch request
const markCompleteTasksApi = (id) => {
  return axios
    .patch(`${kBaseUrl}/tasks/task_${id}/mark_complete`)
    .then((response) => {
      console.log(response.data);
      // return response.data;
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
};

const markIncompleteTasksApi = (id) => {
  return axios
    .patch(`${kBaseUrl}/tasks/task_${id}/mark_incomplete`)
    .then((response) => {
      console.log(response.data);
      // return response.data;
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
};

const postTasksApi = () => {
  return axios.post(`${kBaseUrl}/tasks`).then((response) => {
    // return response.data;
    return convertFromApi(response.data);
  });
};


const App = () => {
  // const [tasks, setTasks] = useState(TASKSLIST);
  // default value for getting the list of tasks from API
  const [tasks, setTasks] = useState([]);
  console.log('tasklist:', tasks);

  // create a helper function above the useEffect to keep the useEffect small
  const getAllTasks = () => {
    return getAllTasksApi().then((tasks) => {
      setTasks(tasks);
      console.log(tasks);
    });
  };

  // then have to modify the useEffect
  useEffect(() => {
    getAllTasks();
  }, []);

  // old useEffect
  // useEffect(() => {
  //   getAllTasksApi().then((tasks) => {
  //     setTasks(tasks);
  //     console.log(tasks);
  //   });
  // }, []);

  const completeTask = (id) => {
    return markCompleteTasksApi(id).then((taskResult) => {
      setTasks((tasks) =>
        tasks.map((task) => {
          console.log('id:', id, 'task', task);
          if (task.id === id) {
            console.log('isComplete', task.isComplete);
            return { ...task, isComplete: !taskResult.isComplete };
          } else {
            return task;
          }
        })
      );
    });
  };

  const incompleteTask = (id) => {
    return markIncompleteTasksApi(id).then((taskResult) => {
      setTasks((tasks) =>
        tasks.map((task) => {
          console.log('id:', id, 'task', task);
          if (task.id === id) {
            console.log('isComplete', task.isComplete);
            return { ...task, isComplete: !taskResult.isComplete };
          } else {
            return task;
          }
        })
      );
    });
  };

  // update tasks, leverage the state
  const deleteTask = (id) => {
    console.log('in delete!');
    console.log('deletable task');
    return deleteTasksApi(id).then(taskResult => {
      // setTasks((tasks) =>
      //   tasks.filter((task) => {
      //     return task.id !== taskResult.id;
      //   }));
      return getAllTasks();
    });
  };
  // let updatedTasks = tasks.filter((task) => task.id !== id);
  // console.log(updatedTasks);
  // setTasks(updatedTasks);

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
