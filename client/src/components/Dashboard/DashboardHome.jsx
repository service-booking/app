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
    justify-content: center;
    align-items: center;
    width: 100%;
`

function DashboardHome() {
    const [data, setData] = useState([]);

    const [events, setEvents] = useState([]);
    const email = sessionStorage.getItem("authenticatedUser")
  
    let role = sessionStorage.getItem("role")

    useEffect(() => {  
        
        const fetchData = () =>{
            if(role === "customer"){
                axios.get(`${JPA_URL}/${email}/get/bookings/reserver`)
                .then((res)=> {
                    console.log(res.data)
                    console.log("got it from reserver" )
                    setData(res.data)
                })
                .catch((err)=>{
                    console.log(err)
                    console.log("error from reserver")
                })
            }
            else if(role === "service"){
                axios.get(`${JPA_URL}/${email}/get/bookings/provider`)
                .then((res)=> {
                    console.log(res)
                    setData(res.data)
                })
                .catch((err) =>{
                    console.log(err)
                    console.log("error from provider")
                })
    
            }

        }

        fetchData()
        
       
    }, [])

    const eventArr = data.map((ele) =>({
        title : ele.service.title  ,
        allDay :false,
        start : new Date (convertDate(ele.booking.startTime)),
        end:new Date(convertDate(ele.booking.endTime))
    }))
    
    function convertDate (date){
        var value = date 
        var time = value.substring(11, 16)
        var year = value.substring(0,4);
        var month = moment(value.substring(5,8)).format('MMMM');
        var day = value.substring(8, 10)
        var isoDateTime =month +" "+day+ ", " + year + " " + time
        return isoDateTime
    }
    

    const event = [{
        title: "abc",
        allDay: false,
        start: new Date(convertDate("2021-06-09T10:39:00Z")),
        end: new Date('June 09, 2021 21:00:00')
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
