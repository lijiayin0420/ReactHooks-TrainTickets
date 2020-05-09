import React, {
  useState,
  useMemo,
  memo,
  useCallback,
  useRef,
  PureComponent,
  useEffect,
} from 'react'

/**
 * 改写Counter为类组件
 * 类组件才能实例化，才能使用ref属性
 */
class Counter extends PureComponent {
  speak() {
    console.log(`now counter is: ${this.props.count}`)
  }
  render() {
    const { props } = this
    return <h1 onClick={props.onClick}>{props.count}</h1>
  }
}
// const Counter = memo(function Counter(props) {
//   console.log('Counter render')
//   return <h1 onClick={props.onClick}>{props.count}</h1>
// })

function App(props) {
  const [count, setCount] = useState(0)
  const counterRef = useRef()
  const it = useRef()

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
    // console.log(counterRef.current)
    counterRef.current.speak()
  }, [counterRef])

  useEffect(() => {
    it.current = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })

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
      <Counter ref={counterRef} count={double} onClick={onClick} />
    </div>
  )
}

export default App
