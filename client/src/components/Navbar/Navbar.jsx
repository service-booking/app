import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Nav = styled.nav`
    background: #28254F;
    height: 100vh;
    width: calc(200px + 2vw);
    display: flex;
    flex-direction: column;
    
`

const NavLink = styled(Link)`
    color: #BDACE6;
    font-family: 'Raleway';
    text-decoration: none;
`

function Navbar() {
    return (
        <Nav>
            <NavLink to="">History</NavLink>
            <NavLink to="/service">My service</NavLink>
        </Nav>
    )
}

export default Navbar
