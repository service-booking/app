import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
import styled from 'styled-components'
import profile from './profile.css'
import {Formik, Form, Field, ErrorMessage} from 'formik'

const Main = styled.div`
    display: flex;
    flex-direction: row;
    background: #DCCEDF
`
const Block = styled.div`
    box-shadow: -5px 7px 13px 0px #6B6B6B;
    border-radius: 10px;
    background: white;
    width: 50%;
    height: 60vh;
    display: flex;
    flex-direction: column; 
    justify-content: center;

`

const Background= styled.div`
    background: rgba(255,255,255,0.5);
    width: 60%;
    height: 85vh;
    margin-left: 10%;
    margin-top: 5%;
    padding: 4%;
    border-radius: 10px;
`

const SaveBtn= styled.button`
    border: none; 
    width: 4rem;
    background: linear-gradient(#986DEA, #DAB8F3);
    font-family: 'Raleway';
    border-radius: 8px;
`

function Profile() {

    const [data, setData] = useState([]);
    const [file, setFile] = useState(undefined);
    const email = sessionStorage.getItem('authenticatedUser')


    const handleChange = () =>{

    }

     useEffect(() =>{
         axios.get(`${JPA_URL}/${email}`)
         .then((res)=>{
             console.log(res)
             setData(res.data)
         })
     },[])
     console.log(data)

     const first = data.firstName
    return (
        <Main>
            <Navbar/>
            <Background>
                <Block>
                    <div>
                        <p>Change profile picture</p>
                        <input type="file"/>
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                firstName: `${first}`,
                                lastName:data.lastName,
                                address: data.address,
                                media: data.media,
                                about: data.about,
                            }}

                            onSubmit = {async(values,actions) => {
                                const data ={
                                    firstName: values.firstName.trim(),
                                    lastName: values.lastName.trim(),
                                    address: values.address.trim(),
                                    media: values.media.trim(),
                                    about: values.about.trim()
                                }

                                axios.post(`${JPA_URL}/${email}`, data)
                                .then((res)=> {

                                })
                            }}
                        >

                            {({isSubmitting, status, handleChange, values}) => (
                                <Form>
                                    <p>My Profile</p>
                                    <Field className="profile-input" name="firstName" value={values.firstName} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="lasttName" alue={values.lastName} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="address" value={values.address} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="media"  value={values.media} onChange={handleChange}></Field>
                                    <SaveBtn>Save</SaveBtn>
                                </Form>

                            )}

                            
                        </Formik>
                    </div>
                    
                  
                </Block>
            </Background>
            
        </Main>
    )
}

export default Profile
