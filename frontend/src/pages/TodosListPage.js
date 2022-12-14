import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton';
import { API_PATH } from '../Config';

const TodosListPage = () => {
  let [todos, setTodos] = useState([])
  useEffect(()=> {
    getTodos()
  }, [])

  let getTodos = async () => {
    let response = await fetch(`${API_PATH}/api/todos/`)
    let data = await response.json()
    setTodos(data)
  }

  return (
    <div className='AppTodo'>
        <div className = "todos">
          <div className = "todos-header">
            <h2 className="todos-title">&#9782; Todos </h2>
            <p className="todos-count">{todos.length}</p>
          </div>
          <div className = "todos-list">
            {todos.map((todo, index) =>(
            <ListItem key={index} todo = {todo}/>))}
          </div>
          <AddButton/>
      </div>
    </div> 
  )
}

export default TodosListPage