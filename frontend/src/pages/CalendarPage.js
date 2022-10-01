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
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
          ].join('/');
};

const CalendarPage = () => {
  let [events, setEvents] = useState([])
  let [popup, setPopup] = useState(false)
  let [selectedDate, setSelectedDate] = useState([])
  useEffect(()=> {
    getEvents()
  }, [])

  let getEvents = async () => {
    let response = await fetch(`${API_PATH}/api/calendarapi/`)
    let data = await response.json()
    setEvents(data)
  }

  function handleDateSelect(selectInfo){
    setSelectedDate(selectInfo.start.yyyymmdd())
    setPopup(true)
    // let title = window.prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar
    // let createEvent = {
    //   title: title,
    //   start: selectInfo.start,
    //   end: selectInfo.end,
    //   allDay: false
    // }
    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   console.log(selectInfo)
    //   fetch(`${API_PATH}/api/calendarapi/create`, {
    //     method: "POST",
    //     headers:{
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(createEvent)
    //   })
    //   calendarApi.addEvent({
    //     title: title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: false 
    //   })
    // }
  }

  let calendar = <FullCalendar
  plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
  initialView="dayGridMonth"
  eventContent={renderEventContent}
  eventClick={handleEventClick}
  // dateClick={handleDateClick}
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
      <PopupCreateEvent trigger={popup} setTrigger={setPopup}>
        <h3>{selectedDate}</h3>
      </PopupCreateEvent>
    </div>
  )
}

export default CalendarPage