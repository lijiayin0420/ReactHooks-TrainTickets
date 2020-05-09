import React, { useState, useCallback, useRef, useEffect } from 'react'
import { createSet, createAdd, createRemove, createToggle } from './actions'
import reducer from './reducers'
import './App.css'

function bindActionCreators(actionCreators, dispatch) {
  const ret = {}

  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }

  return ret
}

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

    addTodo(newText)

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
    toggleTodo(id)
  }

  const onRemove = () => {
    removeTodo(id)
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

let store = {
  todos: [],
  incrementCount: 0,
}

function TodoList() {
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  useEffect(() => {
    Object.assign(store, {
      todos,
      incrementCount,
    })
  }, [todos, incrementCount])

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

  // function reducer(state, action) {
  //   const { type, payload } = action
  //   const { todos, incrementCount } = state

  //   switch (type) {
  //     case 'set':
  //       return {
  //         ...state,
  //         todos: payload,
  //         incrementCount: incrementCount + 1,
  //       }
  //     case 'add':
  //       return {
  //         ...state,
  //         todos: [...todos, payload],
  //         incrementCount: incrementCount + 1,
  //       }
  //     case 'remove':
  //       return {
  //         ...state,
  //         todos: todos.filter((todo) => {
  //           return todo.id !== payload
  //         }),
  //       }
  //     case 'toggle':
  //       return {
  //         ...state,
  //         todos: todos.map((todo) => {
  //           return todo.id === payload
  //             ? { ...todo, complete: !todo.complete }
  //             : todo
  //         }),
  //       }
  //     default:
  //   }
  // }

  // const dispatch = useCallback((action) => {
  //   const { type, payload } = action
  //   switch (type) {
  //     case 'set':
  //       setTodos(payload)
  //       setIncrementCount((c) => c + 1)
  //       break
  //     case 'add':
  //       setTodos((todos) => [...todos, payload])
  //       setIncrementCount((c) => c + 1)
  //       break
  //     case 'remove':
  //       setTodos((todos) =>
  //         todos.filter((todo) => {
  //           return todo.id !== payload
  //         }),
  //       )
  //       break
  //     case 'toggle':
  //       setTodos((todos) =>
  //         todos.map((todo) => {
  //           return todo.id === payload
  //             ? { ...todo, complete: !todo.complete }
  //             : todo
  //         }),
  //       )
  //       break
  //     default:
  //   }
  // }, [])

  const dispatch = (action) => {
    // const state = {
    //   todos,
    //   incrementCount,
    // }

    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount,
    }

    if ('function' === typeof action) {
      action(dispatch, () => store)
      return
    }

    const newState = reducer(store, action)
    for (let key in newState) {
      setters[key](newState[key])
    }
  }

  //使用多个useEffect，从上往下顺序执行
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos)
    dispatch(createSet(todos))
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-list">
      <Control
        {...bindActionCreators(
          {
            addTodo: createAdd,
          },
          dispatch,
        )}
      />
      <Todos
        {...bindActionCreators(
          {
            removeTodo: createRemove,
            toggleTodo: createToggle,
          },
          dispatch,
        )}
        todos={todos}
      />
    </div>
  )
}

export default TodoList
