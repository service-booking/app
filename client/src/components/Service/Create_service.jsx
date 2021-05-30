import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import AuthenticationService from '../Authentication/AuthenticationService.js'
import styled from 'styled-components'

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

  
    return (
        <Main>
            <Navbar/>
            <Wrapper>
                <h1>New service</h1>
                <Formik
                    initialValues={{
                        serviceName:``,
                        price:``,
                        durationHour:``,
                        durationMin:``,
                        desc:``,
                        startTime:``
                    }}

                    validate={(values, actions) => {
                        let error ={}

                        if(!values.serviceName){
                            error.serviceName = `Service name cannot be empty`
                        }

                        if(!values.price){
                            error.price = `Price cannot be empty`
                        }

                        if(!values.durationMin){
                            if(!values.durationHour){
                                error.durationHour= `Please key in valid duration`
                            }
                        }
                        
                        if((/^[0-9]*$/).test(values.durationHour) || (/^[0-9]*$/).test(values.durationMin)){
                            error.durationHour= `Please key in valid duration`
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
                            price: parseInt(values.price.trim()),
                            duration: values.duration,
                            desc: values.desc
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
                                            name="durationHour"
                                            onChange={handleChange}
                                            value={values.durationHour}
                                        />
                                        <p>hours</p>
                                        <Field
                                            className="register-input"
                                            name="durationMin"
                                            onChange={handleChange}
                                            value={values.durationMin}
                                        />
                                        <p>min</p>
                                    </Row>
                                </div>
                                <ErrorMessage className="fail" name="durationHour" component='div'/>

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

                                <button className="submit-btn" type="submit" >Add Service</button>
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
