import React from 'react'
import {Link} from 'react-router-dom'


let getTime = (todo) => {
  return new Date(todo.updated).toLocaleDateString()
}

let getTitle = (todo) => {
  let title = todo.body.split('\n')[0]
  if (title.length > 45) {
    return title.slice(0, 45)
  }
  return title
}


let getContent = (todo) => {
  let title = getTitle(todo)
  let content = todo.body.replaceAll('\n', '')
  content = content.replaceAll(title, '')
  if (content.length > 45){
    return content.slice(0, 45) + "..."
  }
  else {
    return content
  }
}
const ListItem = ({todo}) => {
  return (
    <Link to= {`todo/${todo.id}`}>
      <div className="todos-list-item">
        <h3>{getTitle(todo)}</h3>
        <p><span>{getTime(todo)}</span>{getContent(todo)}</p>
      </div>
    </Link>
  )
}

export default ListItem