import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

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
    clickInfo.event.remove()
  }
}

function handleDateClick(clickInfo){
  window.alert("Clicked on the Date")
}

const CalendarPage = () => {


  return (
    <div className='CalendarApp'>
        <FullCalendar
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
              initialView="dayGridMonth"
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
              events={[
              { title: 'event 1', date: '2022-09-01' },
              { title: 'event 2', date: '2022-09-05' }
          ]}
        />
    </div>
  )
}

export default CalendarPage