import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton';
import { API_PATH } from '../Config';

const TodosListPage = () => {
  console.log("In TodosListPage ")
  let [todos, setTodos] = useState([])
  useEffect(()=> {
    getTodos()
  }, [])

  let getTodos = async () => {
    let response = await fetch(`${API_PATH}/api/todos/`)
    console.log("data:", response)
    let data = await response.json()
    console.log('Data:', data)
    setTodos(data)
  }

  return (
    <div className = "container dark">
      <div className='app'>
      <div className = "todos">
        <div className = "todos-header">
          <h2 className="todos-title">&#9782; Todos</h2>
          <p className="todos-count">{todos.length}</p>
        </div>
        <div className = "todos-list">
          {todos.map((todo, index) =>(
          <ListItem key={index} todo = {todo}/>))}
        </div>
        <AddButton/>
      </div>
      </div>
    </div> 
  )
}

export default TodosListPage