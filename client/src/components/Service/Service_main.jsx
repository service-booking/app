import React , {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import styled from 'styled-components'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
import {Col, Row, Container} from 'react-bootstrap'

const Main = styled.div`
    display: flex;
    flex-direction: row;
    background: #DCCEDF
`
const ServiceWrap = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    align-items: center;
`
const WhiteWrap = styled.div`
    background: white;
    width: 700px;
    height: 50vh;
    border-radius: 15px;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 4%;

`
const Bubble = styled.div`
    border-radius: 15px;
    background: #DED6E5;
    margin-top: .5em;
    margin-bottom: .5em;
    padding: 5px;
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

function Service_main() {
    let history = useHistory();
    let email = sessionStorage.getItem('authenticatedUser')

    const [data, setData] = useState([]);

    const handleDelete= (id) =>{
        axios.delete(`${JPA_URL}/${email}/disable/service/${id}`);
        history.push('/service')
    }

    useEffect(() => {   
        axios.get(`${JPA_URL}/${email}/get/services`)
        .then((res)=> {
            console.log(res)
            setData(res.data)
        })
       
    }, [])

    return (
        <Main>
            <Navbar/>
            <ServiceWrap>
                <Link to="/service-create">Add Service</Link>
                <h1>Current Services</h1>
                <WhiteWrap>
                    <Container>
                    {data.map((ele)=> 
                    <Bubble> 
                        <div>
                            <ServiceTitle>{ele.title}</ServiceTitle>
                            <Detail>Description :{ele.desc}</Detail>
                            <Detail> Duration: {ele.duration} mins</Detail>
                            <Detail>${ele.price}</Detail>
                        </div>   
                        <div>
                            <a>Edit</a>
                            <button onClick={() => handleDelete(ele.id)}>remove</button>
                        </div>
                            
                    </Bubble>
                     
                    )}
                    </Container>                    
                </WhiteWrap> 

            </ServiceWrap>
            
        </Main>
    )
}

export default Service_main
