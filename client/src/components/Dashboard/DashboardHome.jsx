import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import styled from 'styled-components'

const Main = styled.div`
    display: flex;
    flex-direction: row;
`

function DashboardHome() {
    return (
        <Main>
            <Navbar/>
            <div>
                <h1>Welcome to NEService</h1>
                <h1>Upcoming appointment</h1>
            </div>
        </Main>
    )
}

export default DashboardHome
