import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import AuthenticationService from '../Authentication/AuthenticationService.js';
import {useHistory, useLocation} from "react-router-dom";


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

`

const Navbar = () => {

    let history = useHistory();

    const logOut = () => {
        sessionStorage.removeItem('authenticatedUser');
        history.push('/');
    }

    return (
        <Nav>
            <NavLink to="">History</NavLink>
            <NavLink to="/service">My service</NavLink>
            <LogoutBtn onClick={() => logOut()}>Log out</LogoutBtn>
        </Nav>
    )
}

export default Navbar
