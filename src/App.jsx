import React, { Component, useState } from 'react'

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
  const [count, setCount] = useState(()=>{
    //此逻辑只会执行一次
    return props.defaultCount || 0
  })
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
    </div>
  )
}

export default App
