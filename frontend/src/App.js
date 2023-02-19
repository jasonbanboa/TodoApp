import './App.css';
import React, { useState, useEffect } from 'react';



function App() {

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState({
    url: `http://127.0.0.1:8000/api/tasks/create/`,
    method: "POST",
});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/api/tasks/', {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(response => setTasks(response))
      .catch(error => console.log(error))
      .then(console.log(tasks))
  }

  const taskComplete = (task) => {

    let completed = task.completed ? false : true;

    fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title: task.title,
        completed : completed
      }),
    }).then(fetchData)
      .catch(error => console.log(error))
  } 
  
  const taskDelete = (task_id) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${task_id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(fetchData);
  }


  // post
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(query.url, {
      method: query.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputValue,
        completed: false,
    })
  })
      .then(() => { fetchData() })
      .then(() => { setInputValue('') })
      .then(() => {
        setQuery({
          url: `http://127.0.0.1:8000/api/tasks/create/`,
          method: "POST",
        })
      })
  }

const edit = (task) => {
  setInputValue(task.title);
  setQuery({
    url: `http://127.0.0.1:8000/api/tasks/${task.id}/`,
    method: "PUT",
  })
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo</h1>
      </header>
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <input
              id="task-input"
              type="text"
              placeholder='add a new task'
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <input type="submit" id="submit" value="Add"/>
          </form>
          <hr />
        </section>
        <section className='todos'>
          {
            tasks.map((task) => {
              return (
                  <React.Fragment key={task.id}>
                    <div className="indi-task" key={task.id} style={{ display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', alignItems: 'center'}}>
                        <div>
                          <button onClick={() => taskComplete(task)} className={task.completed ? 'unfinish' : 'complete'}>{task.completed ? 'unfinish' : 'complete'}</button>
                        </div>
                        <div className={task.completed ? "completed" : "not-complete"}>
                          {task.title}
                        </div>
                      </div>
                      <div >
                        <button className='options edit' onClick={() => { edit(task) }}>Edit</button>
                        <button className='options delete' onClick={() => taskDelete(task.id)}>Delete</button>
                      </div>
                    </div>  
                    <hr />        
                  </React.Fragment>
              );
            })
          }
        </section>
      </main>
    </div>
  );
}

export default App;
