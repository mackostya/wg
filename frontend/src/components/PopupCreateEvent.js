import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { API_PATH } from '../Config';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import React, {useState, useEffect}  from 'react'
import dayjs from 'dayjs';
import '../styling/Popup.css'

function PopupCreateEvent(props){
  const [startDateTime, setStartDateTime] = useState(dayjs('2018-01-01T00:00:00.000Z'))
  const [endDate, setEndDate] = useState(dayjs(''))
  const [title, setTitle] = useState("")
  const [save, setSave] = useState(false)
  useEffect(()=> {
    createEvent()
  }, [save])

  let createEvent = async () => {
    if (save===true)
    {
      let dateFull = props.startDate.concat("T", startDateTime)
      console.log(dateFull)
      console.log(props.calendar.props)
      let event = {
        title: title,
        start: props.startDate,
        end: endDate,
        allDay: false
      }
      props.calendar.addEvent({
            title: title,
            start: props.startDate,
            end: endDate,
            allDay: false 
          })
      fetch(`${API_PATH}/api/calendarapi/create`, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
      props.setTrigger(false)
      setSave(false)
    }
  }
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={()=>{props.setTrigger(false)}}>close</button>
          <button className="save-btn" onClick={()=>{setSave(true)}}>save</button>
          <div className="column">
            <h3>{props.startDate}</h3>
            <TextField 
              label="Event title" 
              value ={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              variant="standard" 
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={startDateTime}
                  onChange={setStartDateTime}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
        </div>
    </div>
  ) : "";
}

export default PopupCreateEvent
