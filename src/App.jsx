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
// class Counter extends PureComponent {
//   render() {
//     const { props } = this
//     return <h1>{props.count}</h1>
//   }
// }
// const Counter = memo(function Counter(props) {
//   console.log('Counter render')
//   return <h1 onClick={props.onClick}>{props.count}</h1>
// })

function useCounter(count) {
  const size = useSize()
  return (
    <h1>
      {count},{size.width}x{size.height}
    </h1>
  )
}

function useCount(defaultCount) {
  const [count, setCount] = useState(0)
  const it = useRef()

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

  return [count, setCount]
}

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return size
}

function App(props) {
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()
  // const it = useRef()

  /**
   * 与useEffect不同，useEffect在渲染后执行
   * useMemo在渲染期间执行，有返回值
   * useMemo(()=>fn) === useCallback(fn)
   */

  // useEffect(() => {
  //   it.current = setInterval(() => {
  //     setCount((count) => count + 1)
  //   }, 1000)
  // }, [])

  // useEffect(() => {
  //   if (count >= 10) {
  //     clearInterval(it.current)
  //   }
  // })

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click ({count}),{size.width}x{size.height}
      </button>
      {/* <Counter count={count} /> */}
      {Counter}
    </div>
  )
}

export default App
