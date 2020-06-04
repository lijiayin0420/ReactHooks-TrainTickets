import React from 'react'
import { connect } from 'react-redux'
import Header from '../common/Header.jsx'
import Account from './Account.jsx'
import Choose from './Choose.jsx'
import Passengers from './Passengers.jsx'
import Ticket from './Ticket.jsx'
import './App.css'

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch,
  } = props

  return <div className="app"></div>
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    }
  },
)(App)
