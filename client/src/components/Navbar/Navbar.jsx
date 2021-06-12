import React , {useState, useEffect} from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import AuthenticationService from '../Authentication/AuthenticationService.js';
import {useHistory, useLocation} from "react-router-dom";
import defaultPic from '../Image/default.png'; 
import axios from 'axios';
import { JPA_URL } from '../../Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome , faCalendar, faSearch, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'


const Nav = styled.nav`
    background: #28254F;
    height: 100vh;
    width: calc(210px + 2vw);
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
const NavLink = styled(Link)`
    color: #BDACE6;
    font-family: 'Raleway';
    text-decoration: none;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    width: 59%;

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
            <NavLink to="/dashboard"><div className="icon"><FontAwesomeIcon  icon={faHome}/></div>Home</NavLink>
            {role=== "service" && <NavLink to="/service">My service</NavLink>}
            <NavLink to="/bookings"><FontAwesomeIcon className="icon" icon={faCalendar} />Bookings</NavLink>
            {role === "customer" && <NavLink to="/search"><FontAwesomeIcon className="icon" icon={faSearch} />Search</NavLink>}
            <LogoutBtn onClick={() => logOut()}><FontAwesomeIcon className="icon" icon={faSignOutAlt}></FontAwesomeIcon> Log out</LogoutBtn>
            
        </Nav>

    )
}

export default Navbar
