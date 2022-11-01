import { useState } from 'react';
import styles from './Todo.module.css';
import axios from 'axios';

function TodoCreate ({getTodos}) {
  const [todo, setTodo] = useState('');
  const getTodo = (e) => {
    setTodo(e.target.value);
  }
  const createTodo = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      }
    }
    if (todo === '') {
      return;
    } else {
      try {
        await axios.post('https://pre-onboarding-selection-task.shop/todos', {todo: todo}, config)
        .then((res) => {
          if (res.status === 201) {
            setTodo('');
          }
        });
      } catch (error) {
        alert(error)
      }
    }
    getTodos();
  }

  return (
    <div>
      <div className={styles.inputWrap}>
        <form>
          <span className="inputItem">
            <label htmlFor="createTodo" className="sr_only">create Todo</label>
            <input type="text" id="createTodo" placeholder="할일을 추가하세요" className="input" onChange={getTodo} value={todo} />
          </span>
          <button onClick={createTodo} className="btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  )
}
export default TodoCreate;