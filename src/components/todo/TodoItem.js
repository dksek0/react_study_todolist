import { useEffect, useState, useRef } from 'react';
import styles from './Todo.module.css';
import axios from 'axios';

function TodoItem ({todo, getTodos}) {
  const inputRef = useRef();
  const [completed, setCompleted] = useState(todo.isCompleted);
  const [todoValue, setTodoValue] = useState(todo.todo);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('');
  const getText = (e) => {
    setText(e.target.value);
  }
  const updateHandler = (e) => {
    e.preventDefault();
    setCompleted(!completed);
    setTodoValue(todo.todo);
  }
  const deleteTodo = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      }
    }
    try {
      console.log(todo.id, 'todoValue', todoValue)
      await axios.delete(`https://pre-onboarding-selection-task.shop/todos/${todo.id}`, config)
      .then((res) => {
        if (res.status === 204) {
          getTodos();
        }
      });
    } catch (error) {
      alert(error)
    }
  }
  const editHandler = (e) => {
    e.preventDefault();
    setEdit(edit => !edit);
    if (edit === true) {
      const inputText = inputRef.current.value;
      if (inputText === todo.todo || text === '') {
        return;
      } else {
        setTodoValue(inputText)
      }
    }
    setText('');
  }
  const cancelEditHandler= () => {
    setText('');
    setEdit(edit => !edit);
  }
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      }
    }
    try {
      axios.put(`https://pre-onboarding-selection-task.shop/todos/${todo.id}`,{ todo: todoValue, isCompleted: completed }, config)
      .then((res) => {
        if (res.status === 200) {
          getTodos();
        }
      });
    } catch (error) {
      alert(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoValue, completed])

  return (
    <div className={styles.todoItem}>
      <input type="checkbox" value={todo.todo} onClick={updateHandler} checked={todo.isCompleted} readOnly />
      {
      edit ?
        (
          <form onSubmit={editHandler}>
            <span className={styles.input}>
              <input type="text" className={styles.input} onChange={getText} value={text} ref={inputRef} autoFocus />
            </span>
          </form>
        ) :
        (
          <span className={styles.txt}>
            {todo.todo}
          </span>
        )
      }
      <span className={styles.todoBtns}>
        {
        edit ? 
          <button type="button" onClick={cancelEditHandler}>cancel</button> :
           null
         }
        <button type="button" onClick={editHandler}>{edit ? 'ok' : 'edit' }</button>
        <button type="button" onClick={deleteTodo}>del</button>
      </span>
    </div>
  )
}

export default TodoItem;