import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import styled from 'styled-components'
import {Calendar , momentLocalizer}from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
const localizer = momentLocalizer(moment)

const Main = styled.div`
    display: flex;
    flex-direction: row;
    background: #DCCEDF
`
const CalendarWrap = styled.div`
    height: 90vh;
`

const RowWrap = styled.div`
    display: flex;
    flex-direction: column;
`

function DashboardHome() {

    // const [events, setEvents] = useState([]);

    // useEffect(() => {   
    //     axios.get(`${JPA_URL}/${email}/get/bookings`)
    //     .then((res)=> {
    //         console.log(res)
    //         setData(res.data)
    //     })
       
    // }, [])

    const event = [{
        title: 'pedicure',
        allDay: false,
        start: new Date('2021-06-06T02:00Z'),
        end: new Date('2021-06-06T03:00Z'),
        color: 'red'
    }]

    return (
        <Main>
            <Navbar/>
            <RowWrap>
                <div>
                    <h1>Welcome to NEService</h1>
                    <p>Upcoming appointments</p>
                </div>


                <CalendarWrap>
                    <Calendar
                        localizer={localizer}
                        events={event}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </CalendarWrap>
            </RowWrap>
            
            
        </Main>
    )
}

export default DashboardHome
