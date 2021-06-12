import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { JPA_URL } from '../../Constants'
import styled from 'styled-components'
import profile from './profile.css'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import defaultPic from '../Image/default.png'; 
import Workinghours from '../Workinghours/workinghours'
import {useHistory, useLocation} from "react-router-dom";

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
    
    let history = useHistory();

    //files uploads states 

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    
    let output={};

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
            if(res.data === true){
                setOldPw("")
                setNewPw("")
                setTimeout(()=> {setMessage("Password Changed! you'll be logged out")}, 3000)
                
                setTimeout(()=> {history.push('/')}, 2000)
                

            }
            else{console.log(res)
                console.log("old password is wrong")
                setTimeout(()=> {setMessage("Old password is incorrect!")}, 1000)
                
            }
            
        })

    }

    const displayOverlay = () =>{
        setOn(true)
    }
    const close = () =>{
        setOn(false)
    }

    //fetch user 
     useEffect(() =>{
         axios.get(`${JPA_URL}/${email}`)
         .then((res)=>{
             console.log(res)
             setData(res.data)
         })
     },[])


    const handleFile= (e) => {
        setSelectedFiles(e.target.files[0])
        console.log(e.target.files[0])
     }
     
     const upload = () =>{
        //using File API to get chosen file
        // setSelectedFiles(selectedFiles[0]);
        
        const data = new FormData();
        // //using File API to get chosen file
        data.append('file', selectedFiles);
        data.append('name', email);

        // //calling async Promise and handling response or error situation
        axios.post(`${JPA_URL}/${email}/profile/picture/upload`, data)
        .then((response) => {
            console.log(response.data);
            axios.get(`${JPA_URL}/${email}`)
            .then((res)=>{
                console.log(res)
                setData(res.data)
            })

        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                //HTTP error happened
                console.log("Upload error. HTTP error/status code=",error.response.status);
            } else {
                //some other error happened
               console.log("Upload error. HTTP error/status code=",error.message);
            }
        });

     }

    return (
        <Main>
            <Navbar/>
            <Background>
                <Block>
                    <div>
                        <div>
                            <p>Change profile picture</p>
                            <input type="file" onChange={(e) => handleFile(e)}/>
                            <button
                                className="btn btn-success"
                                disabled={!selectedFiles}
                                onClick={() => upload()}
                            >
                                Upload
                            </button>
                        </div>
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
                                output ={}
                                const data ={
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    address: values.address,
                                    media: values.media,
                                    about: values.about,
                                }

                                axios.post(`${JPA_URL}/${email}`, data)
                                .then((res)=> {
                                    console.log('successfully updated')
                                    output.message = "Successfully updated!"
                                    setTimeout(() => output.message ="", 3000);
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            }}
                        >

                            {({isSubmitting, status, handleChange, values}) => (
                                <Form>
                                    <p>My Profile</p>
                                    <img src={data.profilePicture} width="200px"></img>
                                    <Field className="profile-input" name="firstName" value={values.firstName} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="lastName" value={values.lastName} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="address" value={values.address} onChange={handleChange}></Field>
                                    <Field className="profile-input" name="media"  value={values.media} onChange={handleChange}></Field>
                                    <textarea className="text" type="textarea" name="about" value={values.about} onChange={handleChange}></textarea>
                                    <div>
                                        <SaveBtn type="submit" disabled={isSubmitting}>Save</SaveBtn>
                                        <div>{output.message}</div>
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
                        <input type="password" value={oldPw} onChange={(e) => onOldPasswordChange(e.target.value)}></input>

                        <label>New password</label>
                        <input type="password" value={newPw} onChange={(e) => onNewPasswordChange(e.target.value)}></input>

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
