import React, { useState, useMemo, memo, useCallback } from 'react'

const Counter = memo(function Counter(props) {
  console.log('Counter render')
  return <h1 onClick={props.onClick}>{props.count}</h1>
})

function App(props) {
  const [count, setCount] = useState(0)

  /**
   * 与useEffect不同，useEffect在渲染后执行
   * useMemo在渲染期间执行，有返回值
   * useMemo(()=>fn) === useCallback(fn)
   */
  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const onClick = useCallback(() => {
    console.log('click')
  }, [])

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click ({count}) double:({double})
      </button>
      <Counter count={double} onClick={onClick} />
    </div>
  )
}

export default App
