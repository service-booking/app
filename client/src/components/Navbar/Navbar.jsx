import React , {useState, useEffect} from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import AuthenticationService from '../Authentication/AuthenticationService.js';
import {useHistory, useLocation} from "react-router-dom";
import defaultPic from '../Image/default.png'; 
import axios from 'axios';
import { JPA_URL } from '../../Constants'



const Nav = styled.nav`
    background: #28254F;
    height: 100vh;
    width: calc(200px + 2vw);
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
const NavLink = styled(Link)`
    color: #BDACE6;
    font-family: 'Raleway';
    text-decoration: none;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    &:hover{
        color: #8C6DD8;
        text-decoration: none;
    }

`

const LogoutBtn = styled.button`
    color: #BDACE6;
    font-family: 'Raleway';
    text-decoration: none;
    margin-top: 10px;
    margin-bottom: 10px;
    background: none;
    border: none;
    font-size: 20px;
    &:hover{
        color: #8C6DD8;
        text-decoration: none;
    }
`
const ProfileDiv = styled.img`
    border-radius: 50%;
    border: solid 0.5px #979797;
`

const Navbar = () => {
    const [data, setData] = useState([]);
    let email = sessionStorage.getItem("authenticatedUser")

    let history = useHistory();

    const logOut = () => {
        sessionStorage.removeItem('authenticatedUser');
        history.push('/');
    }

    const role = sessionStorage.getItem('role')

    useEffect(() =>{
        axios.get(`${JPA_URL}/${email}`)
        .then((res)=>{
            setData(res.data)
        })
    },[])


    return (
        <Nav>
            <NavLink to="/profile"><ProfileDiv src ={data.profile} width="100px" height="100px" className="profile-pic"></ProfileDiv></NavLink>
            <NavLink to="/dashboard">Home</NavLink>
            {role=== "service" && <NavLink to="/service">My service</NavLink>}
            <NavLink to="/bookings">My Bookings</NavLink>
            {role === "customer" && <NavLink to="/search">Search</NavLink>}
            <LogoutBtn onClick={() => logOut()}>Log out</LogoutBtn>
        </Nav>
    )
}

export default Navbar
