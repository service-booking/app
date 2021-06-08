import React , {useState, useEffect} from 'react';
import Navbar from '../Navbar/Navbar';
import styled from 'styled-components';
import './search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container, Button} from 'react-bootstrap';
import axios from 'axios';
import { JPA_URL } from '../../Constants';
import DateTimePicker from 'react-datetime-picker';




const Main = styled.div`
    display: flex;
    flex-direction: row;
    background: #DCCEDF
`
const OuterDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    position: relative;
`
const WhiteDiv = styled.div`
    background: rgba(255,255,255,0.5);
    width: 90%;
    height:80%;
    border-radius: 15px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 4%;
`
const WhiteBar = styled.div`
    width: 100%;
    background: white;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ServiceTitle = styled.h1`
    font-size: 1.5em;
    color: #BD8FDD;

`
const Detail = styled.p`
    font-family: 'Raleway';
    font-size: 15px;
    color: #BDACE6;
    font-weight: 500;
`

const WhiteWrap = styled.div`
    background: white;
    width: 100%;
    height: 50vh;
    border-radius: 15px;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 4%;
    margin-top: 30px;

`


function SearchMain() {
    let email = sessionStorage.getItem('authenticatedUser')
    const [data, setData] = useState([]);
    const [on, setOn] = useState(false);
    const [value, onChange] = useState(new Date());
    const [searchString, setSearchString] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [currentId, setCurrentId] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [date, setBookingDate] = useState("");
    const [error, setError] = useState(false);
    const [endBookingTime, setBookingEndTime] = useState("");


    const displayOverlay = (id) =>{
        setOn(true)
        setCurrentId(id)
    }

    const close =()=>{
        setOn(false)
    }

    
    useEffect(() => {   
        axios.get(`${JPA_URL}/${email}/get/services`)
        .then((res)=> {
            console.log(res)
            setData(res.data)
        })
       
    }, [])

    //send value to api to get bookings and display booking lots for use to choose 
    // send booking details to backend 
    const handleTimes = (startValue, endValue) =>{
        setBookingTime(startValue)
        setBookingEndTime(endValue)
    }

    const Overlay = () =>{
        return(
            <div className="overlay">
                <h1 className="booking-title">
                    Select booking date
                </h1>
                <DateTimePicker
                    onChange={onChange}
                    value={value}
                    format={"dd-MM-y"}
                    minDate={new Date()}
                />
                <button className="booking-btn" onClick={()=> fetchTime()}>Show time slots</button>
                <h1>
                    Select booking time 
                </h1>
                <div className="time-slot">
                    {error === true &&<div>No available booking time slots</div>}
                    {
                        availableTimes.map((time) => 
                        
                            <div>
                                <input type="radio" name="time-slot"  onClick={()=> handleTimes(time.startTime, time.endTime)} id={time.startTime}/> 
                                <label for={time.startTime}>{time.startTime} - {time.endTime}</label>
                            </div>
                    )}
                </div>
                
                <div>
                    <button className="booking-btn" onClick={() => handleBooking()}>Book</button>
                    <button className="booking-btn" onClick={() => close()}>Cancel</button>
                </div>
                
            </div>
        )
    }

    const fetchTime = () =>{
        
        // const dateString = value.getDay()+"/"+value.getMonth()+"/"+value.getFullYear();
        // setDate(dateString)

        var MyDate = new Date();
        var MyDateString;

        MyDate.setDate(value.getDate());

        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
                    + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
                    + MyDate.getFullYear();
        
        setBookingDate(MyDateString)
        console.log(MyDateString)

        axios.post(`${JPA_URL}/${email}/get/available/bookings/${currentId}`,date)
        .then((res)=>{
            console.log(res)
            setError(false)
            setAvailableTimes(res.data)
        })
        .catch((err) =>{
            setError(true)
            //display no available time slot on this day 
        })
    }

    const handleSubmit = () =>{
        const service ={
            title: searchString
        }
        axios.post(`${JPA_URL}/${email}/search/service`, service)
        .then((res)=>{
            if(res.data != []){
                setData(res.data)
            }
            else{
                //display no result 
            }
            
        })

    }

    const handleBooking = (id) => {
        const booking = {
            startTime: bookingTime,
			endTime: endBookingTime,
			dayMonthYear: date,
            
        }
        axios.post(`${JPA_URL}/${email}/create/booking/${currentId}`, booking)
        .then((res) =>{
            //redirect or close form    
            console.log("booking is made !")
            setTimeout(() => setOn(false), 3000)
        })
    }

    return (
        <Main>
            <Navbar/>
            <OuterDiv>
                <WhiteDiv>
                    <WhiteBar>
                        <input className="search-input" onChange={(e) => setSearchString(e.target.value)}/>
                        <button className="search-btn" onCLick={()=> handleSubmit()}>Search</button>
                    </WhiteBar>
                    <WhiteWrap>
                        <Container className="contain">
                            {
                                data.map((ele) =>
                                    <Row className="bubble">
                                        <Col>
                                            <ServiceTitle>{ele.title}</ServiceTitle>
                                            <Detail>Description :{ele.desc}</Detail>
                                            <Detail> Duration: {ele.duration} mins</Detail>
                                            <p className="price">${ele.price}</p>
                                        </Col>
                                        <Col>
                                            <button className="book-btn" onClick={() => (displayOverlay(ele.id))}>Book</button>
                                        </Col>
                                    </Row>
                                )
                            }

                        </Container>
                    </WhiteWrap>
                    {on? <Overlay/>:""}
                </WhiteDiv>
            </OuterDiv>
        </Main>
    )
}

export default SearchMain
