export const ACTION_SET_DEPART_DATE = 'ACTION_SET_DEPART_DATE'
export const ACTION_SET_ARRIVE_DATE = 'ACTION_SET_ARRIVE_DATE'
export const ACTION_SET_DEPART_TIME_STR = 'ACTION_SET_DEPART_TIME_STR'
export const ACTION_SET_ARRIVE_TIME_STR = 'ACTION_SET_ARRIVE_TIME_STR'
export const ACTION_SET_DEPART_STATION = 'ACTION_SET_DEPART_STATION'
export const ACTION_SET_ARRIVE_STATION = 'ACTION_SET_ARRIVE_STATION'
export const ACTION_SET_TRAIN_NUMBER = 'ACTION_SET_TRAIN_NUMBER'
export const ACTION_SET_DURATION_STR = 'ACTION_SET_DURATION_STR'
export const ACTION_SET_TICKETS = 'ACTION_SET_TICKETS'
export const ACTION_SET_IS_SCHEDULE_VISIBLE = 'ACTION_SET_IS_SCHEDULE_VISIBLE'
export const ACTION_SET_SEARCH_PARSED = 'ACTION_SET_SEARCH_PARSED'

export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate
    }
}
export function setArriveDate(arriveDate) {
    return {
        type: ACTION_SET_ARRIVE_DATE,
        payload: arriveDate
    }
}
export function setDepartTimeStr(departTimeStr) {
    return {
        type: ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr
    }
}
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr
    }
}
export function setDepartStation(departStation) {
    return {
        type: ACTION_SET_DEPART_STATION,
        payload: departStation
    }
}
export function setArriveStation(arriveStation) {
    return {
        type: ACTION_SET_ARRIVE_STATION,
        payload: arriveStation
    }
}
export function setTrainNumber(trainNumber) {
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber
    }
}
export function setDurationStr(durationStr) {
    return {
        type: ACTION_SET_DURATION_STR,
        payload: durationStr
    }
}
export function setTickets(tickets) {
    return {
        type: ACTION_SET_TICKETS,
        payload: tickets
    }
}
export function setIsScheduleVisible(isScheduleVisible) {
    return {
        type: ACTION_SET_IS_SCHEDULE_VISIBLE,
        payload: isScheduleVisible
    }
}
export function toggleIsScheduleVisible() {
    return (dispatch, getState) => {
        const { isScheduleVisible } = getState()

        dispatch(setIsScheduleVisible(!isScheduleVisible))
    }
}
export function setSearchParsed(searchParsed) {
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed
    }
}

