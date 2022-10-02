import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { API_PATH } from '../Config';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import React, {useState, useEffect}  from 'react'
import dayjs, { Dayjs } from 'dayjs';
import '../styling/Popup.css'

function PopupCreateEvent(props){
  const [startDateTime, setStartDateTime] = useState(dayjs('2022-01-01T09:00:00.000'))
  let [endDateTime, setEndDateTime] = useState(dayjs('2022-01-01T10:00:00.000'))
  let [title, setTitle] = useState("")
  let [save, setSave] = useState(false)
  useEffect(()=> {
    createEvent()
  }, [save])

  let createEvent = async () => {
    if (save===true)
    {
      let startDateAndTime = [props.startDate, 
                      " ", 
                      (startDateTime.get("hours")>9 ? '' : '0') + startDateTime.get("hours"), 
                      ":",
                      (startDateTime.get("minutes")>9 ? '' : '0') + startDateTime.get("minutes")].join("")
      let endDateAndTime = [props.endDate, 
                        " ", 
                        (endDateTime.get("hours")>9 ? '' : '0') + endDateTime.get("hours"), 
                        ":",
                        (endDateTime.get("minutes")>9 ? '' : '0') + endDateTime.get("minutes")].join("")
      console.log("Start date: ", startDateAndTime)
      console.log("End date: ", endDateAndTime)
      let event = {
        title: title,
        start: startDateAndTime,
        end: endDateAndTime,
        allDay: false
      }
      props.calendar.addEvent({
            title: title,
            start: startDateAndTime,
            end: endDateAndTime,
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
                  label="start Time"
                  value={startDateTime}
                  onChange={setStartDateTime}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  label="end Time"
                  value={endDateTime}
                  onChange={setEndDateTime}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
        </div>
    </div>
  ) : "";
}

export default PopupCreateEvent
