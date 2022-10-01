import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import dayjs from 'dayjs';
import '../styling/Popup.css'

function PopupCreateEvent(props){
  const [value, setValue] = React.useState(dayjs('2018-01-01T00:00:00.000Z'))
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={()=>{props.setTrigger(false)}}>done</button>
          <div className="column">
            {props.children}
            <TextField label="Event title" variant="standard" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={value}
                  onChange={setValue}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
        </div>
    </div>
  ) : "";
}

export default PopupCreateEvent
