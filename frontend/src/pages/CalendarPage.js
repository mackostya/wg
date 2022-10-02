import React, {useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { API_PATH } from '../Config';
import PopupCreateEvent from '../components/PopupCreateEvent'

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function handleEventClick(clickInfo){
  if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    fetch(`${API_PATH}/api/calendarapi/${clickInfo.event.id}/delete`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clickInfo.event)}
      )
    clickInfo.event.remove()
  }
}

// eslint-disable-next-line no-extend-native
Date.prototype.yyyymmddstart = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
          ].join('-');
}

// eslint-disable-next-line no-extend-native
Date.prototype.yyyymmddend = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate() - 1; // enddate is always todays date+1

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
          ].join('-');
}
  
const CalendarPage = () => {
  let [events, setEvents] = useState([])
  let [popup, setPopup] = useState(false)
  let [startDate, setStartDate] = useState([])
  let [endDate, setEndDate] = useState([])
  let [calendarApi, setCalendarApi] = useState([])
  useEffect(()=> {
    getEvents()
  }, [])

  let getEvents = async () => {
    let response = await fetch(`${API_PATH}/api/calendarapi/`)
    let data = await response.json()
    setEvents(data)
  }

  function handleDateSelect(selectInfo){
    setCalendarApi(selectInfo.view.calendar)
    setStartDate(selectInfo.start.yyyymmddstart())
    setEndDate(selectInfo.end.yyyymmddend())
    setPopup(true)
  }
  let calendar = <FullCalendar
    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
    timeZone= 'local'
    initialView="dayGridMonth"
    eventContent={renderEventContent}
    eventClick={handleEventClick}
    editable={true}
    selectable={true}
    selectMirror={true}
    dayMaxEvents={true}
    weekends={true}
    select={handleDateSelect}
    events= {
      events
    }
  />

  return (
    <div className='CalendarApp'>
      {calendar}
      <PopupCreateEvent 
        trigger={popup} 
        setTrigger={setPopup} 
        calendar={calendarApi} 
        startDate={startDate} 
        endDate={endDate}
      />
    </div>
  )
}

export default CalendarPage