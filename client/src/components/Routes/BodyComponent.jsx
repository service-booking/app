import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from '../Authentication/AuthenticatedRoute.jsx'

import LandingComponent from '../Landing/LandingComponent.jsx'
import RegisterComponent from '../Register/RegisterComponent.jsx'
import HomeComponent from '../Home/HomeComponent.jsx'
import ErrorComponent from '../Error/ErrorComponent.jsx'
import RegisterCustomer from '../Register/Register_customer.js'
import RegisterService from '../Register/Register_service.js'
import RegisterLanding from '../Register/Register_landing.js'
import Dashboard from '../Dashboard/DashboardHome.jsx'
import Service from '../Service/Service_main.jsx'
import CreateService from '../Service/Create_service.jsx'
import SearchComponent from '../Search/SearchMain.jsx'
import ProfileComponent from '../Profile/Profile.jsx'
import Bookings from '../Bookings/bookings.jsx'


class BodyComponent extends Component {
    render() {
        return (
            <div className="BodyComponent">
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LandingComponent} />
                            <Route path="/register" exact component={RegisterLanding} />
                            <Route path="/register-service-provider" exact component={RegisterService}></Route>
                            <Route path="/register-customer" exact component={RegisterCustomer}></Route>
                            <AuthenticatedRoute path="/dashboard" exact component={Dashboard}></AuthenticatedRoute>
                            <Route path="/service" exact component={Service}></Route>
                            <AuthenticatedRoute path="/service-create" exact component={CreateService}></AuthenticatedRoute>
							<AuthenticatedRoute path="/home" exact component={HomeComponent} />
                            <AuthenticatedRoute path="/search" exact component={SearchComponent} />
                            <AuthenticatedRoute path="/profile" exact component={ProfileComponent} />
                            <AuthenticatedRoute path="/bookings" exact component={Bookings}/>

							<AuthenticatedRoute component={ErrorComponent} />
                        </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

export default BodyComponent
