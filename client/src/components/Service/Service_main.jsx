import React , {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import styled from 'styled-components'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
import './Service.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container, Button} from 'react-bootstrap'
import {Formik, Form, Field, ErrorMessage} from 'formik';

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

const Wrap = styled.label`
    width: 120px;
`


function Service_main() {
    let history = useHistory();
    let email = sessionStorage.getItem('authenticatedUser')
    const [on, setOn] = useState(false);
    

    const [data, setData] = useState([]);
    const [isSubmitting, setSubmitting] = useState(false);
    const [serviceData, setServiceData] = useState([]);
    const [id, setBookingId] = useState("")

    const displayOverlay = (id) =>{
        setOn(true)
        setBookingId(id)

        axios.get(`${JPA_URL}/${email}/get/service/${id}`)
        .then((res)=>{
            setServiceData(res.data)
        })
    }

    const close =()=>{
        setOn(false)
    }


    const Overlay = () =>{
        return(
            <div className="overlayService">
                
                <Formik
                    enableReinitialize

                    initialValues={{
                        serviceName: serviceData.title,
                        price: serviceData.price,
                        duration: serviceData.duration,
                        desc: serviceData.desc,
                    }}

                    validate={(values, actions) => {
                        let error ={}

                        if(!values.serviceName){
                            error.serviceName = `Service name cannot be empty`
                        }

                        if(!values.price){
                            error.price = `Price cannot be empty`
                        }

                        if(!(/^(0(?!\.00)|[1-9]\d{0,6})\.\d{2}$/).test(values.price)){
                            error.price= `Please key in valid price (1.00)`
                        }

                        if(!values.duration){
                                error.duration= `Please key in valid duration`
                        }
                        
                        if(!(/^[0-9]*$/).test(values.duration)){
                            error.duration= `Please key in valid duration`
                        }

                        if(!values.desc){
                            error.desc = `Description cannot be empty`
                        }
                        
                        return error
                    }}

                    onSubmit ={async(values,actions) => {
                        let output ={};
                        let sent = false;
                        let email = sessionStorage.getItem('authenticatedUser')
                        const service ={
                            title: values.serviceName,
                            price: values.price,
                            duration: parseInt(values.duration),
                            desc: values.desc,
                        }

                        await axios.post(`${JPA_URL}/${email}/update/service/${id}`, service)
                        .then((res) => {
                            sent = true
                            console.log('update')
    
                        })
                        .catch(
                            err => {
                                console.log(err)
                                console.log(id)
                            }
                        )

                        // service created redirect to service main page 
                        if(sent === true){
                            output.classes = "success"
                            output.message = 'Service created! You will be redirected'
                            output.type= "success"

                            actions.setStatus(output)
                            actions.setSubmitting(true)

                            setTimeout(() => output.message= " ", 2000);
                            setTimeout(() => actions.setStatus(output), 3000);

                            close();


                            axios.get(`${JPA_URL}/${email}/get/services`)
                            .then((res)=> {
                                setData(res.data)
                            })
          
                        }

                    }}

                >
                    {({isSubmitting, status, handleChange, values}) => (
                        <Form>
                            <div>
                                <div className="label-input">
                                    <Wrap>
                                        <label>Service name</label>
                                        <Field
                                            className="register-input"
                                            name="serviceName"
                                            onChange={handleChange}
                                            value={values.serviceName}
                                        />
                                    </Wrap>
                                    <ErrorMessage className="fail" name="serviceName" component='div'/>
                                </div>

                                <div className="label-input">
                                    <label>Price</label>
                                    <Field
                                        className="register-input"
                                        name="price"
                                        onChange={handleChange}
                                        value={values.price}
                                    />
                                </div>
                                <ErrorMessage className="fail" name="price" component='div'/>

                                <div className="label-input">
                                    <label>Duration</label>
                                    <Row>
                                        <Field
                                            className="register-input"
                                            name="duration"
                                            onChange={handleChange}
                                            value={values.duration}
                                        />
                                        <p>min</p>
                                    </Row>
                                </div>
                                <ErrorMessage className="fail" name="duration" component='div'/>

                                <div className="label-input">
                                    <label>Service description</label>
                                    <Field
                                        className="register-about-me"
                                        name="desc"
                                        onChange={handleChange}
                                        value={values.desc} 
                                    >
                                    </Field>
                                </div>
                                <ErrorMessage className="fail" name="desc" component="div"/>

                                <div>
                                    <button className="booking-btn" type="submit" disabled={isSubmitting} >Update</button>
                                    <button className="booking-btn" onClick={() => close()}>Cancel</button>
                                </div>
                                {status && <div className={status.classes}>{status.message}</div>}
                            </div>
                        </Form>
                    )}


                </Formik>
               
               
                
            </div>
        )
    }


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
       
    }, [])

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
                            <Edit onClick={() => displayOverlay(ele.id)}>Edit</Edit>
                            <button className="delete-btn" onClick={() => handleDelete(ele.id)}>remove</button>
                        </div>
                

                    </Bubble>
                     
                    )}
                    </Container>                    
                </WhiteWrap> 
                {on? <Overlay className="overlay"/>:""}

            </ServiceWrap>
            
        </Main>
    )
}

export default Service_main
