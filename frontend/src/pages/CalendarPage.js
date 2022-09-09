import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../components/event-utils'

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

// function handleDateClick(clickInfo){
//   window.alert("Clicked on the Date")
// }

function handleDateSelect(selectInfo){
  let title = window.prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}


const CalendarPage = () => {


  return (
    <div className='CalendarApp'>
        <FullCalendar
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
              initialEvents={
                INITIAL_EVENTS
          }
        />
    </div>
  )
}

export default CalendarPage