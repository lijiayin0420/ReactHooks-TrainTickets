import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'
import dayjs from 'dayjs'
import classNames from 'classnames'
import leftPad from 'left-pad'
import './Schedule.css'

const ScheduleRow = memo(function ScheduleRow(props) {
  const {
    index,
    station,
    arriveTime,
    departTime,
    stay,

    isStartStation,
    isEndStation,
    isDepartStation,
    isArriveStation,
    beforeDepartStation,
    afterArriveStation,
  } = props

  return (
    <li>
      <div
        className={classNames('icon', {
          'icon-red': isDepartStation || isArriveStation,
        })}
      >
        {isDepartStation ? '出' : isArriveStation ? '到' : leftPad(index, 2, 0)}
      </div>
      <div
        className={classNames('row', {
          grey: beforeDepartStation || afterArriveStation,
        })}
      >
        <span
          className={classNames('station', {
            red: isArriveStation || isDepartStation,
          })}
        >
          {station}
        </span>
        <span
          className={classNames('arrtime', {
            red: isArriveStation,
          })}
        >
          {isArriveStation ? '始发站' : arriveTime}
        </span>
        <span
          className={classNames('deptime', {
            red: isDepartStation,
          })}
        >
          {isDepartStation ? '终到站' : departTime}
        </span>
        <span className="stoptime">
          {isStartStation || isEndStation ? '-' : stay + '分'}
        </span>
      </div>
    </li>
  )
})

const Schedule = memo(function Schedule(props) {
  const { date, trainNumber, departStation, arriveStation } = props

  const [scheduleList, setScheduleList] = useState([])

  useEffect(() => {
    const url = new URI('/rest/schedule')
      .setSearch('trainNumber', trainNumber)
      .setSearch('departStation', departStation)
      .setSearch('arriveStation', arriveStation)
      .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
      .toString()

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let departRow // 出发车站
        let arriveRow // 到达车站

        for (let i = 0; i < data.length; ++i) {
          // 没有出发车站的两种情况： 1.是出发车站 2.在出发车站之前
          if (!departRow) {
            if (data[i].station === departStation) {
              departRow = Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: true,
                afterArriveStation: false,
                isArriveStation: false,
              })
            } else {
              Object.assign(data[i], {
                beforeDepartStation: true,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              })
            }
            // 没有到达车站的两种情况： 1.是到达车站 2.在出发车站和到达车站之间
          } else if (!arriveRow) {
            if (data[i].station === arriveStation) {
              arriveRow = Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: true,
              })
            } else {
              Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              })
            }
            // 一定是中间车站
          } else {
            Object.assign(data[i], {
              beforeDepartStation: false,
              isDepartStation: false,
              afterArriveStation: true,
              isArriveStation: false,
            })
          }

          // 是否是始发站，是否是终到站
          Object.assign(data[i], {
            isStartStation: i === 0,
            isEndStation: i === data.length - 1,
          })
        }

        setScheduleList(data)
      })
  }, [date, trainNumber, departStation, arriveStation])

  return (
    <div className="schedule">
      <div className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="deptime">到达</span>
          <span className="arrtime">发车</span>
          <span className="stoptime">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => {
            return (
              <ScheduleRow
                key={schedule.station}
                index={index + 1}
                {...schedule}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
})

export default Schedule

Schedule.propTypes = {
  date: PropTypes.number.isRequired,
  trainNumber: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
}
