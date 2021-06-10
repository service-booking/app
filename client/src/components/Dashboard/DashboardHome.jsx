import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import styled from 'styled-components'
import {Calendar , momentLocalizer}from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
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
    const [data, setData] = useState([]);

    const [events, setEvents] = useState([]);
    const email = sessionStorage.getItem("authenticatedUser")
    const role = sessionStorage.getItem("role")

    useEffect(() => {   

        if(role === "customer"){
            axios.get(`${JPA_URL}/${email}/get/bookings/reserver`)
            .then((res)=> {
                console.log(res)
                setData(res.data)
            })
        }
        else{
            axios.get(`${JPA_URL}/${email}/get/bookings/provider`)
            .then((res)=> {
                console.log(res)
                setData(res.data)
            })

        }
       
    }, [])

    const eventArr = data.map((ele) =>({
        title : ele.service.title + " with "  ,
        allDay :false,
        start : new Date (ele.booking.startTime),
        end:new Date(ele.booking.endTime)
    }))

    console.log(eventArr)

    const event = [{
        title: "abc",
        allDay: false,
        start: new Date("2021-06-09T10:39:00Z"),
        end: new Date("2021-06-09T12:39:00Z")
    }]

    //conver dates
    console.log(event[0].start)

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
                        events={eventArr}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </CalendarWrap>
            </RowWrap>
            
            
        </Main>
    )
}

export default DashboardHome
