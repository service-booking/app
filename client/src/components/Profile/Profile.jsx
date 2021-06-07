import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
import styled from 'styled-components'
import profile from './profile.css'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import defaultPic from '../Image/default.png'; 
import Workinghours from '../Workinghours/workinghours'

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
    padding: 5%;

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
    box-shadow: -5px 7px 13px 0px #6B6B6B;
    height: 45%;
    padding: 5px;
`

const PasswordBtn=styled.button`
    border: none; 
    width: 12rem;
    background: linear-gradient(#986DEA, #DAB8F3);
    font-family: 'Raleway';
    border-radius: 8px;
    margin-top: 5px;
`

const ChangeHours=styled.button`
    border: none; 
    width: 12rem;
    background: linear-gradient(#986DEA, #DAB8F3);
    font-family: 'Raleway';
    border-radius: 8px;
    margin-top: 5px;
    height: 25%;

`

const CloseOverlay= styled.button`
    position: fixed;
    top: 6%;
    z-index: 2;
    right: 12%;
`

function Profile() {

    const [data, setData] = useState([]);
    const [file, setFile] = useState(undefined);
    const email = sessionStorage.getItem('authenticatedUser')
    const [oldPw, setOldPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const[message, setMessage] = useState('');
    const [on, setOn] = useState(false);

    let sent = false;

    let role = sessionStorage.getItem('role');

    const onNewPasswordChange =(value) =>{
        setNewPw(value)
    }

    const onOldPasswordChange = (value) =>{
        setOldPw(value)
    }

    const handleChangePassword = () =>{
        let email = sessionStorage.getItem('authenticatedUser')
        let obj= {
            password: newPw
        }
        axios.post(`${JPA_URL}/${email}/${oldPw}/update`, obj)
        .then((res)=> {
            if(res.data === "true"){
                setOldPw("")
                setNewPw("")
                setTimeout(()=> {setMessage("Password Changed!")}, 2000)
                setTimeout(()=> {setMessage("")}, 2000)

            }
            else{console.log(res)
                console.log("old password is wrong")
                setTimeout(()=> {setMessage("Old password is incorrect!")}, 2000)
            }
            
        })

    }

    const displayOverlay = () =>{
        setOn(true)
    }
    const close = () =>{
        setOn(false)
    }

     useEffect(() =>{
         axios.get(`${JPA_URL}/${email}`)
         .then((res)=>{
             console.log(res)
             setData(res.data)
         })
     },[])
     

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
                                    <textarea className="text" type="textarea" name="about" value={values.about} onChange={handleChange}></textarea>
                                    <div>
                                        <SaveBtn type="submit" >Save</SaveBtn>
                                    </div>
                                </Form>

                            )}

                            
                        </Formik>
                    </div>
                    
                </Block>

                <div className="column-wrap">
                    <PasswordBlock>
                        <h1 className="title">Change Password</h1>
                        <label>Old passowrd</label>
                        <input value={oldPw} onChange={(e) => onOldPasswordChange(e.target.value)}></input>

                        <label>New password</label>
                        <input value={newPw} onChange={(e) => onNewPasswordChange(e.target.value)}></input>

                        <PasswordBtn onClick={()=> handleChangePassword()} >Change password</PasswordBtn>
                        {<div className="">{message}</div>}
                    </PasswordBlock>
                    
                    { role === "service" && 
                        <div className="hours-block">
                            <ChangeHours onClick={()=>displayOverlay()}>Change Operating hours</ChangeHours>
                        </div>
                    }
                    {on === true ? <Workinghours/>: ""}
                    {on === true? <CloseOverlay onClick={() =>close()}>Close</CloseOverlay>: ""}
                </div>
                
            </Background>
            
        </Main>
    )
}

export default Profile
