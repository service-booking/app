import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import './RegisterComponent.css'
import AuthenticationService from "../Authentication/AuthenticationService.js";
import {useHistory, useLocation} from "react-router-dom";

function Register_service() {
   
    let history = useHistory();
    return (
        <div className="register-form-wrap">
            <div>
                <h1>Register for Providing a Service</h1>
            </div>
            
            <Formik
                initialValues={{
                    firstName:``,
                    lastName:``,
                    email:``,
                    password:``,
                    address:``,
                    media:``,
                    about:``
                }}

                validate={(values, actions) => {
                    let error={}

                    if(!values.firstName){
                        error.firstName = `First name cannot be empty`
                    }

                    if(!values.lastName){
                        error.lastName = `Last name cannot be empty`
                    }

                    if(!values.businessName){
                        error.businessName = `Business name cannot be empty`
                    }

                    if(!values.email){
                        error.email = `Email cannot be empty`
                    }

                    if(!values.password){
                        error.password = `Password cannot be empty`
                    }

                    if(!values.address){
                        error.address = `Address cannot be empty`
                    }

                    if(!values.about){
                        error.about = `About cannot be empty`
                    }

                    return error
                }}

                onSubmit ={async(values, actions) => {
                    let output ={};

                    const data = {
                        firstName: values.firstName.trim(),
                        lastName: values.lastName.trim(),
                        businessName: values.businessName.trim(),
                        email: values.email.trim(),
                        password: values.password,
                        address: values.address,
                        media: values.media,
                        about: values.about,
                        accountType: 'service'
                    }

                    AuthenticationService.checkForUser(data.email).then((response) => {
                        if(response.data){
                            output.type = `error`
                            output.classes = "fail"
                            output.message = "User exists already"
                        }
                        else{
                            AuthenticationService.registerNewUser(data).then((response) => {

                                output.classes = "success"
                                output.message = `User created!`
                                output.type = `success`
                                actions.resetForm()
                                console.log("user created")
                                //settimeout
                                setTimeout(() => history.push("/"), 3000);
                            })
                        }
                    })

                   
                    actions.setStatus(output)
                    actions.setSubmitting(true)

                    setTimeout(() => actions.setStatus(output), 3000);
                    setTimeout(() => actions.setSubmitting(false), 3000);

                    values.email = ""
                    values.password = ""
                    setTimeout(() => output.message= "", 3000);

                    
                }}
            >
                {({isSubmitting, status, handleChange, values}) => (
                    <Form className="form">
                        <div className="label-input">
                            <div display="flex" flex-direction="column">
                                <label>First name</label>
                                <Field
                                    className="register-input"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={values.firstName}
                                />
                            </div>
                            <div>
                                <label>Last name</label>
                                <Field
                                    className="register-input"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={values.lastName}
                                />
                            </div>
                        </div>
                        <ErrorMessage className="fail" name="firstName" component='div'/>
                        
                        <ErrorMessage className="fail" name="lastName" component='div'/>

                        <div className="label-input">
                            <label>Business name</label>
                            <Field
                                className="register-input"
                                name="businessName"
                                onChange={handleChange}
                                value={values.businessName}
                            />
                        </div>
                        <ErrorMessage className="fail" name="businessName" component='div'/>

                        <div className="label-input">
                            <div display="flex" flex-direction="column">
                                <label>Email Address</label>
                                <Field
                                    className="register-input"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                            </div>
                        </div>
                        <ErrorMessage className="fail" name="email" component='div'/>

                        <div className="label-input">
                            <div display="flex" flex-direction="column">
                                <label>Password</label>
                                <Field
                                    className="register-input"
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    type="password"
                                />
                            </div>
                        </div>
                        <ErrorMessage className="fail" name="password" component='div'/>

                        <div className="label-input">
                            <div display="flex" flex-direction="column">
                                <label>Address</label>
                                <Field
                                    className="register-input"
                                    name="address"
                                    onChange={handleChange}
                                    value={values.address}
                                />
                            </div>
                        </div>
                        <ErrorMessage className="fail" name="address" component='div'/>
                        
                        <div className="label-input">
                            <div display="flex" flex-direction="column">
                                <label>Social Media Handler</label>
                                <Field
                                    className="register-input"
                                    name="media"
                                    onChange={handleChange}
                                    value={values.media}
                                />
                            </div>
                        </div>
                        <ErrorMessage className="fail" name="media" component='div'/>

                        <div className="label-input">
                            <div display="flex" flex-direction="column">
                                <label>About me/us</label>
                                <Field
                                    className="register-about-me"
                                    name="about"
                                    onChange={handleChange}
                                    value={values.about}
                                />
                            </div>
                        </div>  
                        <ErrorMessage className="fail" name="about" component='div'/>
                        
                        <button className="submit-btn" type="submit" disabled={isSubmitting}>{isSubmitting? "Submitting..." : "Submit"}</button>
                        {status && <div className={status.classes}>{status.message}</div>}
                </Form>

                )}
            
            
        </Formik>
            
        </div>
    )
}

export default Register_service
