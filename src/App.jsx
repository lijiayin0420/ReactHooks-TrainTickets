import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import './App.css'

let idSeq = Date.now()

const Control = function Control(props) {
  const { addTodo, dispatch } = props
  const inputRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    console.log(inputRef.current)

    if (newText.length === 0) {
      return
    }

    dispatch({
      type: 'add',
      payload: {
        id: ++idSeq,
        text: newText,
        complete: false,
      },
    })

    inputRef.current.value = ''
  }

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  )
}

const TodoItem = function TodoItem(props) {
  const {
    todo: { id, text, complete },
    toggleTodo,
    removeTodo,
    dispatch,
  } = props

  const onChange = () => {
    dispatch({
      type: 'toggle',
      payload: id,
    })
  }

  const onRemove = () => {
    dispatch({
      type: 'remove',
      payload: id,
    })
  }

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
}

const Todos = function Todos(props) {
  const { todos, toggleTodo, removeTodo, dispatch } = props
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            dispatch={dispatch}
          />
        )
      })}
    </ul>
  )
}

const LS_KEY = '_$-todos_'

function TodoList() {
  const [todos, setTodos] = useState([])

  const addTodo = useCallback((todo) => {
    setTodos((todos) => [...todos, todo])
  }, [])

  const removeTodo = useCallback((id) => {
    setTodos((todos) =>
      todos.filter((todo) => {
        return todo.id !== id
      }),
    )
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        return todo.id === id ? { ...todo, complete: !todo.complete } : todo
      }),
    )
  }, [])

  const dispatch = useCallback((action) => {
    const { type, payload } = action
    switch (type) {
      case 'set':
        setTodos(payload)
        break
      case 'add':
        setTodos((todos) => [...todos, payload])
        break
      case 'remove':
        setTodos((todos) =>
          todos.filter((todo) => {
            return todo.id !== payload
          }),
        )
        break
      case 'toggle':
        setTodos((todos) =>
          todos.map((todo) => {
            return todo.id === payload
              ? { ...todo, complete: !todo.complete }
              : todo
          }),
        )
        break
      default:
    }
  }, [])

  //使用多个useEffect，从上往下顺序执行
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos)
    dispatch({
      type: 'set',
      payload: todos,
    })
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-list">
      <Control dispatch={dispatch} />
      <Todos dispatch={dispatch} todos={todos} />
    </div>
  )
}

export default TodoList
