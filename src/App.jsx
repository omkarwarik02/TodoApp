import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[newItem, setNewItem] = useState('')
  const[todos, setTodos] = useState(() =>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return[]
    return JSON.parse(localValue)
  })
  useEffect(() => {
  localStorage.setItem("ITEMS", JSON.stringify(todos))}, [todos])
  
  function handleSubmit(e){
    e.preventDefault()

    setTodos(currentTodos =>{
      return[
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed:false},
      ]
    })
  }
  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo =>{
        if(todo.id == id) {
          return {...todo, completed}
        }
        return todo
      })
    })

  }
  function deleteTodo(id){
    setTodos(curentTodos =>{
      return curentTodos.filter(todo => todo.id !=id)
    })
  }
return(
  <> <form onSubmit={handleSubmit} className="new-item-form">
<div className="form-row">
  <label htmlFor="item">New Item</label>
  <input value={newItem}
  onChange={e=> setNewItem(e.target.value)}
  type="text" id="item"/>
</div>
<button className="btn">Add</button>

  </form>
  <h1 className="header">Todo List</h1>
  <ul className="list">
    {todos.map(todo =>{
    return(
    <li key={todo.id}>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={e=> toggleTodo(todo.id,e.target.checked)}/>
        {todo.title}
      </label>
      <button onClick={() => deleteTodo(todo.id)}className="btn btn-danger">
        Delete
      </button>
    </li>)
  })}
    
  </ul>
  </>
)
}

export default App
