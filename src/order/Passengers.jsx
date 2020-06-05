import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './Passengers.css'

const Passenger = memo(function Passenger(props) {
  const {
    id,
    name,
    followAdult,
    ticketType,
    licenceNo,
    gender,
    birthday,
    onRemove,
    onUpdate,
  } = props

  const isAdult = ticketType === 'adult'

  return (
    <li className="passenger">
      <i className="delete" onClick={() => onRemove(id)}>
        -
      </i>
      <ol className="items">
        <li className="item">
          <label className="label name">姓名</label>
          <input
            type="text"
            className="input name"
            placeholder="乘客姓名"
            value={name}
            onChange={(e) => onUpdate(id, { name: e.target.value })}
          />
          <label className="ticket-type">{isAdult ? '成人票' : '儿童票'}</label>
        </li>
        {isAdult && (
          <li className="item">
            <label className="label licenceNo">身份证</label>
            <input
              type="text"
              className="input licenceNo"
              placeholder="证件号码"
              value={licenceNo}
              onChange={(e) => onUpdate(id, { licenceNo: e.target.value })}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item arrow">
            <label className="label gender">性别</label>
            <input
              type="text"
              className="input gender"
              placeholder="请选择"
              value={gender === 'male' ? '男' : gender === 'female' ? '女' : ''}
              readOnly
            />
          </li>
        )}
        {!isAdult && (
          <li className="item">
            <label className="label birthday">身份证</label>
            <input
              type="text"
              className="input birthday"
              placeholder="如 2010"
              value={birthday}
              onChange={(e) => onUpdate(id, { birthday: e.target.value })}
            />
          </li>
        )}
      </ol>
    </li>
  )
})

Passenger.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  followAdult: PropTypes.number,
  ticketType: PropTypes.string.isRequired,
  licenceNo: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
}

const Passengers = memo(function Passengers(props) {
  const {
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
  } = props

  return (
    <div className="passengers">
      <ul>
        {passengers.map((passenger) => {
          return (
            <Passenger
              {...passenger}
              key={passenger.id}
              onRemove={removePassenger}
              onUpdate={updatePassenger}
            />
          )
        })}
      </ul>
      <section className="add">
        <div className="adult" onClick={() => createAdult()}>
          添加成人
        </div>
        <div className="child" onClick={() => createChild()}>
          添加儿童
        </div>
      </section>
    </div>
  )
})

Passengers.propTypes = {
  passengers: PropTypes.array.isRequired,
  createAdult: PropTypes.func.isRequired,
  createChild: PropTypes.func.isRequired,
}

export default Passengers
