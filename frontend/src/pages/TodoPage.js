import React, {useState, useEffect}  from 'react'
import {
    useParams,
    useNavigate
  } from "react-router-dom";
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg';
import { API_PATH } from '../Config';

const TodoPage = () => {
    const params = useParams()
    let todoId = params.id
    let navigate = useNavigate()
    let [todo, setTodo] = useState(null)
    
    useEffect(()=> {
        getTodo()
        // eslint-disable-next-line 
      }, [todoId])

    let getTodo = async () => {
        if (todoId === "new") return
        let response = await fetch(`${API_PATH}/api/todos/${todoId}`)
        let data = await response.json()
        setTodo(data)
    }

    let createTodo =  async () => {
        fetch(`${API_PATH}/api/todos/create`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
    }

    let updateTodo =  async () => {
        fetch(`${API_PATH}/api/todos/${todoId}/update`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
    }

    let deleteTodo = async () => {
        fetch(`${API_PATH}/api/todos/${todoId}/delete`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(todo)}
        )
        navigate("/todos")
    }

    let handleSubmit = () => {
        if (todoId !== "new" && !todo.body){
            deleteTodo()
        }else if (todoId!== "new"){
            updateTodo()
        }else if (todoId==="new" && todo.body!== null)
        {
            createTodo()
        }
        navigate("/todos")
    }

    let handleChange = (value) => {
        setTodo(todo => ({...todo, "body":value}))
    }

    return (
    <div className='AppTodo'>
        <div className="todo">
            <div className="todo-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                {todoId !== 'new' ? (
                    <button onClick={deleteTodo}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
                
            </div>
            <textarea onChange={(e) => {handleChange(e.target.value)}} value = {todo?.body}/>
        </div>
    </div>
    )
}

export default TodoPage