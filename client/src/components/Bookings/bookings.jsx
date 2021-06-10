import { rootCertificates } from "tls";

import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import styled from 'styled-components'
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
import './bookings.css'

const Main = styled.div`
    display: flex;
    flex-direction: row;
    background: #DCCEDF
`

const Detail = styled.p`
    font-family: 'Raleway';
    font-size: 15px;
    color: #BDACE6;
    font-weight: 500;
`


function Bookings() {
    const [data, setData] = useState([]);
    const email = sessionStorage.getItem('authenticatedUser')

    useEffect(() => {
        axios.get(`${JPA_URL}/${email}/get/bookings/reserver`)
        .then((res) =>{
            setData(res.data)
            console.log(res.data)
        })
    }, [])

    const handleCancel = (id, start, end, date) => {

        let booking = {
			startTime: start,
			endTime: end,
			dayMonthYear: date,
		};

        axios.post(`${JPA_URL}/${email}/cancel/booking/${id}`, booking)
        .then((res)=>{

            axios.get(`${JPA_URL}/${email}/get/bookings/reserver`)
            .then((res) =>{
                setData(res.data)
            })

        })
    }

    return (
        <Main>
            <Navbar/>

            <Container className="contain">
                <h1>Your Bookings </h1>
                {data.length === 0 ? <div>You have no upcoming bookings</div> : ``}
                {data.map((ele) => 
                    <Row className="bubble">
                        <Detail>Service : {ele.service.title}</Detail>
                        <Detail>Service description: { ele.service.desc }</Detail>
                        <Detail>Price: {ele.service.price}</Detail>
                        <Detail>Date: {ele.booking.dayMonthYear}</Detail>
                        <Detail>Time : {(ele.booking.startTime).substr(11, 5)} -  {(ele.booking.endTime).substr(11, 5)}</Detail>
                        <button className="delete-btn" onClick={() => 
                            handleCancel(ele.booking.id,(ele.booking.startTime).substr(11, 5),(ele.booking.endTime).substr(11, 5),ele.booking.dayMonthYear )}>Cancel booking</button>
                    </Row>
                )}
                

            </Container>
        </Main>
    )
}

export default Bookings
