import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from '../Authentication/AuthenticatedRoute.jsx'

import LandingComponent from '../Landing/LandingComponent.jsx'
import RegisterComponent from '../Register/RegisterComponent.jsx'
import HomeComponent from '../Home/HomeComponent.jsx'
import ErrorComponent from '../Error/ErrorComponent.jsx'


class BodyComponent extends Component {
    render() {
        return (
            <div className="BodyComponent">
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LandingComponent} />
                            <Route path="/register" exact component={RegisterComponent} />
							<AuthenticatedRoute path="/home" exact component={HomeComponent} />
							<AuthenticatedRoute component={ErrorComponent} />
                        </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

export default BodyComponent
