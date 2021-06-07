import React , {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import styled from 'styled-components'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
import './Service.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container, Button} from 'react-bootstrap'

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
    display:flex;
    flex-direction: row;
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
const Edit = styled(Link)`
    background-color: #7b77bd;
    color: white;
    font-family: 'Raleway';
    padding: 10px;
    border-radius: 5px;
    border: none;
    text-decoration: none;
    height: 50px;

`

function Service_main() {
    let history = useHistory();
    let email = sessionStorage.getItem('authenticatedUser')

    const [data, setData] = useState([]);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleDelete= (id) =>{
        axios.delete(`${JPA_URL}/${email}/disable/service/${id}`)
        .then((res)=>{
            setSubmitting(true);
            setTimeout(setSubmitting(false), 3000);
        })

    }

    useEffect(() => {   
        axios.get(`${JPA_URL}/${email}/get/services`)
        .then((res)=> {
            console.log(res)
            setData(res.data)
        })
       
    }, [isSubmitting])

    return (
        <Main>
            <Navbar/>
            <ServiceWrap>
                <div className="row-wrap">
                    <div>
                        <h1>Current Services</h1>
                    </div>
                    <Link className="add-btn" to="/service-create">Add Service</Link>
                </div>
                
                <WhiteWrap>
                    <Container>
                    {data.map((ele)=> 
                    <Bubble> 
                        <div>
                            <ServiceTitle>{ele.title}</ServiceTitle>
                            <Detail>Description :{ele.desc}</Detail>
                            <Detail> Duration: {ele.duration} mins</Detail>
                            <p className="price">${ele.price}</p>
                        </div>   
                        <div className="btn-wrap">
                            <Edit to="">Edit</Edit>
                            <button className="delete-btn" onClick={() => handleDelete(ele.id)}>remove</button>
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
