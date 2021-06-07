import React , {useState, useEffect} from 'react'
import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { JPA_URL } from '../../Constants';
import "./workinghours.css"


function Workinghours() {
    const [data, setData] = useState([])
    const [list, setList] = useState([]);
    let email = sessionStorage.getItem("authenticatedUser")

    const handleCheckBox = (day) =>{
        if(list.includes(day)){
            list.pop(day)
        }
        else{
            list.push(day)
        }

        console.log(list)
    }

    useEffect(() => {
        axios.get(`${JPA_URL}/${email}/get/workingHours`)
        .then((res) =>{
            setData(res)
            console.log(res.data)
        })
    }, [])


    return (
        <div className="main">
                <div>
                    <h1>Current working hours</h1>


                </div>
                <Formik
                    initialValues={{
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
            
                        

                        axios.post(`${JPA_URL}/${email}/set/workingHours`, workingHours);

                        output.classes = "success"
                        output.message = `User created!`
                        output.type = `success`
                        actions.resetForm()
                        console.log("user created")
                        //settimeout
                        // setTimeout(() => history.push("/"), 3000);
                            

                    
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
                                <h1>Operating hours</h1>
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
                                <button className="submit-btn" type="submit" disabled={isSubmitting}>{isSubmitting? "Submitting..." : "Submit"}</button>
                                
                            </div>

                            
                            <ErrorMessage className="fail" name="mondayStart" component='div'/>
                           
                            
                            {status && <div className={status.classes}>{status.message}</div>}
                    </Form>

                    )}
                
                
            </Formik>
        </div>
    )
}

export default Workinghours
