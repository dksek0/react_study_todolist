import { useState, useEffect } from 'react';
import TodoCreate from './TodoCreate';
import TodoItem from './TodoItem';
import axios from 'axios';

function TodoList () {
  const [todo, setTodo] = useState([]);
  const getTodos = () => {
  const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      }
    }
    try {
      axios.get('https://pre-onboarding-selection-task.shop/todos', config)
      .then((res) => {
        if (res.status === 200) {
          setTodo(res.data)
        }
      });
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div>
      <TodoCreate getTodos={getTodos} />
      {
        todo.map((todo, i) => {
          return (
            <TodoItem todo={todo} key={i} getTodos={getTodos} />
          )
        }) 
      }
    </div>
  )
}

export default TodoList;