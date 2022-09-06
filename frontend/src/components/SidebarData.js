import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const SidebarData = [
    {
        title: "home",
        icon: <HomeIcon/>, 
        link: "/home/"
    },
    {
        title: "todos",
        icon: <CheckBoxIcon/>, 
        link: "/todos/"
    },
    {
        title: "calendar",
        icon: <CalendarMonthIcon/>, 
        link: "/calendar/"
    }
]
