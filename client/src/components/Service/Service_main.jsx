import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import styled from 'styled-components'

const Main = styled.div`
    display: flex;
    flex-direction: row;
`

function Service_main() {
    return (
        <Main>
            <Navbar/>
            <h1>Current Services</h1>
            //fetch service 
            //clickable editable 

            <Link to="/service-create">Add Service</Link>
        </Main>
    )
}

export default Service_main
