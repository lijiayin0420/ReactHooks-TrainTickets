import React, { Component, useState, useEffect } from 'react'

// class App extends Component {
//   state = {
//     count: 0,
//   }
//   render() {
//     const { count } = this.state
//     return (
//       <div>
//         <button
//           type="button"
//           onClick={() => {
//             this.setState({ count: count + 1 })
//           }}
//         >
//           Click ({count})
//         </button>
//       </div>
//     )
//   }
// }

function App(props) {
  // const defaultCount = props.defaultCount || 0
  const [count, setCount] = useState(() => {
    //此逻辑只会执行一次
    return props.defaultCount || 0
  })
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }
  useEffect(() => {
    console.log(count)
  }, [count])

  useEffect(() => {
    document.title = count
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  const onClick = () => {
    console.log('click')
  }

  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick)
    return () => {
      document.querySelector('#size').removeEventListener('click', onClick)
    }
  }, [])
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click ({count})
      </button>
      <span id="size">
        size:{size.width}x{size.height}
      </span>
    </div>
  )
}

export default App
