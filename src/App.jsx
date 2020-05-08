import React, { Component, createContext } from 'react'
import './App.css'

const BatteryContext = createContext(90) //90为默认值
const OnlineContext = createContext()

class Leaf extends Component {
  static contextType = BatteryContext
  render() {
    const battery = this.context
    return <h1>Battery:{battery}</h1>
  }
}

class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  state = {
    battery: 60,
    online: false,
  }
  render() {
    const { battery, online } = this.state

    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => this.setState({ battery: battery - 1 })}
          >
            Press
          </button>
          <button
            type="button"
            onClick={() => this.setState({ online: !online })}
          >
            Switch
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }
}

export default App
