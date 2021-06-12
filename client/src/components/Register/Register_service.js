import React , {useState, useEffect} from 'react'
import {Formik, Form, Field, ErrorMessage, validateYupSchema} from 'formik'
import './RegisterComponent.css'
import AuthenticationService from "../Authentication/AuthenticationService.js";
import {useHistory, useLocation} from "react-router-dom";
import { checkServerIdentity } from 'tls';
import axios from 'axios';
import { JPA_URL } from '../../Constants';
import {Row, FormGroup} from 'react-bootstrap';

function Register_service() {
   
    let history = useHistory();
    const [list, setList] = useState([]);
    const [newList, setNewList] = useState([]);
    const [profilePicture, setProfilePicture] = useState("");

    const handleCheckBox = (day) =>{
        if(list.includes(day)){
            var newList ;
            newList = list.pop(day)
            setList(newList)
        }
        else{
            list.push(day)
            setList(list)
        }

        console.log(list)
    }

    const toggleCheckedbox = () =>{

    }

    useEffect(() => {
        axios.get(`${JPA_URL}/default`).then((res) =>{
            setProfilePicture(res.data)
        })
    }, [])


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
                    about:``,
                    mondayStart:``,
                    mondayEnd:``,
                    tuesdayStart:``,
                    tuesdayEnd:``,
                    wednesdayStart:``,
                    wednesdayEnd: ``,
                    thursdayStart: ``,
                    thursdayEnd: ``,
                    fridayStart: ``,
                    fridayEnd: ``,
                    saturdayStart: ``,
                    saturdayEnd: ``,
                    sundayStart: ``,
                    sundayEnd: ``

                }}


                validate={(values, actions) => {
                    let error={}
                    let regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

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

                    if((values.mondayStart && !values.mondayEnd) || !values.mondayStart && values.mondayEnd){
                        error.mondayStart = `Both start time and end time are required`
                    }

                    //if values.mondayStart && monday exists in array of day 
                    if((values.mondayStart && !(regex).test(values.mondayStart)) || (values.mondayEnd && !(regex).test(values.mondayEnd))){
                        error.mondayStart = `Time format has to be valid HH:MM`
                    }

                    if((values.mondayStart && !values.mondayEnd) || !values.mondayStart && values.mondayEnd){
                        error.mondayStart = `Both start time and end time are required`
                    }

                    if(values.tuesdayStart && !(regex).test(values.tuesdayStart)){
                        error.mondayStart = `Time format has to be valid HH:MM`
                    }

                    return error
                }}

                onSubmit ={async(values, actions) => {
                    let output ={};
                    let workingHours ={};
                    const data = {
                        firstName: values.firstName.trim(),
                        lastName: values.lastName.trim(),
                        businessName: values.businessName.trim(),
                        email: values.email.trim(),
                        password: values.password,
                        address: values.address,
                        media: values.media,
                        about: values.about,
                        profilePicture: profilePicture,
                        accountType: 'service'
                    }

                    if(list.includes("monday")){
                        workingHours.monday = {start: values.mondayStart, end : values.mondayEnd }
                    }
                    if(list.includes("tuesday")){
                        workingHours.tuesday = {start: values.tuesdayStart, end : values.tuesdayEnd }
                    }
                    if(list.includes("wednesday")){
                        workingHours.wednesday = {start: values.wednesdayStart, end : values.wednesdayEnd }
                    }
                    if(list.includes("thursday")){
                        workingHours.thursday = {start: values.thursdayStart, end : values.thursdayEnd }
                    }
                    if(list.includes("friday")){
                        workingHours.friday = {start: values.fridayStart, end : values.fridayEnd }
                    }
                    if(list.includes("saturday")){
                        workingHours.saturday = {start: values.saturdayStart, end : values.saturdayEnd }
                    }
                    if(list.includes("sunday")){
                        workingHours.sunday = {start: values.sundayStart, end : values.sundayEnd }
                    } 
        
                    AuthenticationService.checkForUser(data.email).then((response) => {
                        if(response.data){
                            output.type = `error`
                            output.classes = "fail"
                            output.message = "User exists already"
                        }
                        else{
                            AuthenticationService.registerNewUser(data).then((response) => {

                                axios.post(`${JPA_URL}/${data.email}/set/workingHours`, workingHours);
        
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
                        <div>
                            <div className="label-input">
                                <div>
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

                            <FormGroup>
                                <div display="flex">
                                <label>Business name</label>
                                <Field
                                    className="register-input"
                                    name="businessName"
                                    onChange={handleChange}
                                    value={values.businessName}
                                />

                                </div>
                                
                            </FormGroup>
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
                                <div>
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
                        </div>
                        <div>
                            <h4>Operating hours</h4>
                            <label>
                                <Field name="days" type="checkbox" value="monday" onChange={(e) => handleCheckBox(e.target.value)}/>
                                Monday
                            </label>
                            <div>
                                <label>Hours from </label>
                                <Field name="mondayStart" onChange={handleChange} value={values.mondayStart} disabled={!(list.includes("monday"))}/>
                                <label>to </label>
                                <Field name="mondayEnd" onChange={handleChange} value={values.mondayEnd} disabled={!(list.includes("monday"))}/>
    
                            </div>
                            <label>
                                <Field name="days" type="checkbox" value="tuesday" onChange={(e) => handleCheckBox(e.target.value)}/>
                                Tuesday
                            </label>
                            <div>
                                <label>Hours from </label>
                                <Field name="tuesdayStart" onChange={handleChange} value={values.tuesdayStart} disabled={!(list.includes("tuesday"))}/>
                                <label>to </label>
                                <Field name="tuesdayEnd" onChange={handleChange} value={values.tuesdayEnd} disabled={!(list.includes("tuesday"))}/>
    
                            </div>
                            <label>
                                <Field name="days" type="checkbox" value="wednesday" onChange={(e) => handleCheckBox(e.target.value)}/>
                                Wednesday
                            </label>
                            <div>
                                <label>Hours from </label>
                                <Field name="wednesdayStart" onChange={handleChange} value={values.wednesdayStart} disabled={!(list.includes("wednesday"))}/>
                                <label>to </label>
                                <Field name="wednesdayEnd" onChange={handleChange} value={values.wednesdayEnd} disabled={!(list.includes("wednesday"))}/>
    
                            </div>
                            <label>
                                <Field name="days" type="checkbox" value="thursday" onChange={(e) => handleCheckBox(e.target.value)}/>
                                Thursday
                            </label>
                            <div>
                                <label>Hours from </label>
                                <Field name="thursdayStart" onChange={handleChange} value={values.thursdayStart} disabled={!(list.includes("thursday"))}/>
                                <label>to </label>
                                <Field name="thursdayEnd" onChange={handleChange} value={values.thursdayEnd} disabled={!(list.includes("thursday"))}/>
    
                            </div>
                            <label>
                                <Field name="days" type="checkbox" value="friday" onChange={(e) => handleCheckBox(e.target.value)}/>
                                Friday
                            </label>
                            <div>
                                <label>Hours from </label>
                                <Field name="fridayStart" onChange={handleChange} value={values.fridayStart} disabled={!(list.includes("friday"))}/>
                                <label>to </label>
                                <Field name="fridayEnd" onChange={handleChange} value={values.fridayEnd} disabled={!(list.includes("friday"))}/>
    
                            </div>
                            <label>
                                <Field name="days" type="checkbox" value="saturday" onChange={(e) => handleCheckBox(e.target.value)}/>
                                Saturday
                            </label>
                            <div>
                                <label>Hours from </label>
                                <Field name="saturdayStart" onChange={handleChange} value={values.saturdayStart} disabled={!(list.includes("saturday"))}/>
                                <label>to </label>
                                <Field name="saturdayEnd" onChange={handleChange} value={values.saturdayEnd} disabled={!(list.includes("saturday"))}/>
    
                            </div>
                            <label>
                                <Field name="days" type="checkbox" value="sunday" onChange={(e) => handleCheckBox(e.target.value)}/>
                                Sunday
                            </label>
                            <div>
                                <label>Hours from </label>
                                <Field name="sundayStart" onChange={handleChange} value={values.sundayStart} disabled={!(list.includes("sunday"))}/>
                                <label>to </label>
                                <Field name="sundayEnd" onChange={handleChange} value={values.sundayEnd} disabled={!(list.includes("sunday"))}/>
                            </div>
                            
                        </div>

                        
                        <ErrorMessage className="fail" name="mondayStart" component='div'/>
                        
                        {status && <div className={status.classes}>{status.message}</div>}
                </Form>

                )}
            
            
        </Formik>
            
        </div>
    )
}

export default Register_service
