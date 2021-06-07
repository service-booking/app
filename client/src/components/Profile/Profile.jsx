import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
import styled from 'styled-components'
import profile from './profile.css'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import defaultPic from '../Image/default.png'; 

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
    height: 75vh;
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
    display: flex;
    flex-direciton: row;
    justify-content: space-between;
`

const SaveBtn= styled.button`
    border: none; 
    width: 4rem;
    background: linear-gradient(#986DEA, #DAB8F3);
    font-family: 'Raleway';
    border-radius: 8px;
`
const PasswordBlock=styled.div`
    background: white;
    font-family: 'Raleway';
    border-radius: 8px;
    width: 40%;
    box-shadow: -5px 7px 13px 0px #6B6B6B;
    height: 20%;
`

function Profile() {

    const [data, setData] = useState([]);
    const [file, setFile] = useState(undefined);
    const email = sessionStorage.getItem('authenticatedUser')
    const [oldPw, setOldPw] = useState('');
    const [newPw, setNewPw] = useState('');

    const onNewPasswordChange =(value) =>{
        setNewPw(value)
    }

    const onOldPasswordChange = (value) =>{
        setOldPw(value)
    }

    const handleChangePassword = () =>{
        let email = sessionStorage.getItem('authenticatedUser')
        axios.post(`${JPA_URL}/${email}/${oldPw}/update`, newPw)
        .then((res)=> {
            console.log(res)
            
        })

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
                            enableReinitialize
                            initialValues={{
                                firstName: data.firstName,
                                lastName: data.lastName,
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
                                    <img src={defaultPic} width="200px"></img>
                                    <Field className="profile-input" name="firstName" value={values.firstName} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="lastName" value={values.lastName} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="address" value={values.address} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="media"  value={values.media} onChange={handleChange}></Field>
                                    <Field name="about" type="text-area" value={values.about} onChange={handleChange}></Field>
                                    <div>
                                        <SaveBtn type="submit" >Save</SaveBtn>
                                    </div>
                                   
                                </Form>

                            )}

                            
                        </Formik>
                    </div>
                    
                </Block>

                <PasswordBlock>
                    change password 
                    <label>Old passowrd</label>
                    <input value={oldPw} onChange={(e) => onOldPasswordChange(e.target.value)}></input>

                    <label>New password</label>
                    <input value={newPw} onChange={(e) => onNewPasswordChange(e.target.value)}></input>

                    <SaveBtn onClick={()=> handleChangePassword()} >Change password</SaveBtn>
                </PasswordBlock>
            </Background>
            
        </Main>
    )
}

export default Profile
