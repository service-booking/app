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


    const displayOverlay = () =>{
        setOn(true)
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

                <h1>
                    Select booking time 
                </h1>

                
                <p>booking </p>
                <div>
                    <button className="booking-btn" >Book</button>
                    <button className="booking-btn" onClick={() => close()}>Cancel</button>
                </div>
                
            </div>
        )
    }

    return (
        <Main>
            <Navbar/>
            <OuterDiv>
                <WhiteDiv>
                    <WhiteBar>
                        <input className="search-input"/>
                        <button className="search-btn">Search</button>
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
                                            <button className="book-btn" onClick={() => (displayOverlay())}>Book</button>
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
