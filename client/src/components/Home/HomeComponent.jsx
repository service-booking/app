import React, {Component} from "react";
import "./Home.css";
import AuthenticationService from "../Authentication/AuthenticationService.js";
import { Link } from "react-router-dom";


class HomeComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	logout() {
		AuthenticationService.logout();
		this.props.history.replaceState("/")
	}

	render() {
		return (
			<div>
				<div className="home-page">
					<h1>Welcome</h1>
				</div>
				<Link to="/" onClick={this.logout}>
					<span className="link-text">Logout</span>
				</Link>
			</div>
		);
	}
}

export default HomeComponent;