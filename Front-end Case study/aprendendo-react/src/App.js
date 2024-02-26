import './App.css';
import { useState, useEffect } from "react";
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [tittle,setTittle] = useState("");
  const [time,setTime] = useState("");
  const [todos,setTodos] = useState([]);
  const [loading,setLoading] = useState(false);
  

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const res = await fetch(API + "/todos")
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

      setLoading(false)
      setTodos(res);
    }
    loadData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = {
      id: Math.random(),
      tittle,
      time,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers:{
        "Content-Type": "application/json",
      },
    });
    
    setTodos((prevState) => [...prevState, todo]);

    setTittle("");
    setTime("");
  };

  const handleDelete = async (id) => {
      await fetch(API + "/todos/" + id, {
        method: 'DELETE'
      });
      
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const handleDone = async(todo) => {
    todo.done = !todo.done;
    const data = await fetch(API + "/todos/" + todo.id, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers:{
        "Content-Type": "application/json",
      },
    });
  
    
  setTodos((prevState) => prevState.map((t) => (t.id === data.id) ? (t = data) : t));
  }
  
  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>React todo</h1>
      </div>

      <div className='form-todo'>

        <h2>Insira sua próxima tarefa:</h2>

        <form onSubmit={handleSubmit}>

          <div className='form-control'>
            <label htmlFor='tittle'>O que você vai fazer?</label>
            <input 
            type='text' 
            name='tittle' 
            placeholder='Titulo da tarefa' 
            onChange={(e) => setTittle(e.target.value)}
            value={tittle || ""}
            required
            />

          </div>

          <div className='form-control'>
            <label htmlFor='time'>Duração:</label>
            <input 
            type='text' 
            name='time' 
            placeholder='Tempo estimado (em horas)' 
            onChange={(e) => setTime(e.target.value)}
            value={time || ""}
            required
            />

          </div>

          <input type='submit' value="Criar Tarefa"></input>
        </form>
      </div>

      <div className='list-todo'>
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className='todo' key={todo.id}>
            <h3 className={todo.done ? "todo-done" : ""}>{todo.tittle}</h3>
            <p>Duração: {todo.time}</p>
            <div className='actions'>
              <span onClick={() => handleDone(todo)}> 
                {!todo.done ? <BsBookmarkCheck></BsBookmarkCheck> : <BsBookmarkCheckFill></BsBookmarkCheckFill>}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)}/>
            </div>
          </div> 
          
        ))}
      </div>

    </div>
  );
}

export default App;
