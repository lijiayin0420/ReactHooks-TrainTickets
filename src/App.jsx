import React, { Component, PureComponent, memo } from 'react'
import './App.css'

/**
 * @class Foo
 * @extends {PureComponent}
 * 如果props的第一级发生变化才会重新渲染，深级变化不会渲染
 * 避免组件不必要的重新渲染，减少性能开销
 */
// class Foo extends PureComponent {
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   if (nextProps.name === this.props.name) {
//   //     return false
//   //   }
//   //   return true
//   // }
//   render() {
//     console.log('Foo render')
//   return <div>{this.props.person.age}</div>
//   }
// }

/**
 * 无状态组件是函数式的，不能继承PureComponent
 * 但可使用memo包裹，达到同样的效果
 */
const Foo = memo(function Foo(props) {
  console.log('Foo render')
  return <div>{props.person.age}</div>
})

class App extends Component {
  state = {
    count: 0,
    person: {
      age: 1,
    },
  }

  // callback(){
  //   //this指向无法保证
  // }
  callback = () => {}

  render() {
    const person = this.state.person
    return (
      <div>
        <button
          onClick={() => {
            person.age++
            this.setState({
              count: this.state.count + 1,
            })
          }}
        >
          Add
        </button>
        <Foo person={person} name="Mike" cb={this.callback} />
      </div>
    )
  }
}

export default App
