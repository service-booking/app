import React , {useState} from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import AuthenticationService from '../Authentication/AuthenticationService.js'
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios';
import { JPA_URL } from '../../Constants';

const Main = styled.div`
    display: flex;
    flex-direction: row;
`

const Wrap = styled.label`
    width: 120px;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
`

const Wrapper = styled.div`
   margin-left: 30px;
`

function Create_service() {

    const [value, onChange] = useState(new Date());
    let sent = false;

    let future = new Date(value)
        future.setDate(future.getDate()+ 30)

  
    return (
        <Main>
            <Navbar/>
            <Wrapper>
                <h1>New service</h1>
                <Formik
                    initialValues={{
                        serviceName:``,
                        price:``,
                        duration:``,
                        desc:``,
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
                        const data ={
                            user: sessionStorage.getItem('authenticatedUser'),
                            serviceName: values.serviceName.trim(),
                            price: values.price.trim(),
                            duration: parseInt(values.duration.trim()),
                            desc: values.desc,
                        }

                        await axios.post(`${JPA_URL}/createService`, data)
                        .then((res) => {
                            sent = true
                        })
                        .catch(
                            err => {

                            }
                        )

                        // service created redirect to service main page 
                        if(sent === true){
                            output.classes = "success"
                            output.message = 'Service created !'
                            output.type= "success"
                            actions.resetForm()
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
                                    <label>Service Commence date</label>
                                    <DateTimePicker
                                        onChange={onChange}
                                        value={value}
                                    />
                                </div>

                                <button className="submit-btn" type="submit" disabled={isSubmitting}>{isSubmitting? "Adding": "Add Service"}</button>
                                {status && <div className={status.classes}>{status.message}</div>}
                            </div>
                        </Form>
                    )}

                </Formik>
            </Wrapper>
        </Main>
    )
}

export default Create_service
