import React, {Component} from "react";
import "./LandingComponent.css";
import FooterComponent from "../Footer/FooterComponent.jsx";
import {Container, Form, Button} from "react-bootstrap";
import AuthenticationService from "../Authentication/AuthenticationService.js";
import {Link} from 'react-router-dom';
import axios from 'axios'
import { JPA_URL } from '../../Constants'
export const ROLE = 'role'

class LandingComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			error: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name: fieldName, value} = event.target;
		this.setState({
			[fieldName]: value,
		});
	}

	handle_typing_username = (event) => {
		this.setState({
			username: event.target.value,
		});
	};
	handle_typing_password = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	handleSubmit(e) {
		e.preventDefault();

		AuthenticationService.executeJwtAuthenticationService(
			this.state.username,
			this.state.password
		).then((response) => {
			AuthenticationService.registerSuccessfulLoginForJwt(
				this.state.username,
				response.data.token
			);
			// Add User Role to the Storage
			axios.get(`${JPA_URL}/${this.state.username}/role`).then((response) => {
				sessionStorage.setItem(ROLE, response.data);
				let url = "/dashboard";
				this.props.history.push(url);
			});
		})
		.catch((err) =>{
			this.setState({error :"Incorrect credentials"})
			setTimeout(() => this.setState({error: ``}), 2000);
			console.log(err)
		});
	}

	componentDidMount() {
		localStorage.clear();
		sessionStorage.clear();
	}

	render() {
		return (
			<div>
				<div className="home-page">
					<div className="extra-container"></div>
					<div className="login-container">
						<Container>
							<Form className="login-form" onSubmit={this.handleSubmit}>
								<h1 className="login-title">LOGIN</h1>
								<Form.Group className="input-container">
									
									<input
										type="text"
										name="username"
										className="input-field"
										placeholder="Enter your username"
										onChange={this.handleChange.bind(this)}
										value={this.state.username}></input>
								</Form.Group>
								<Form.Group className="input-container">
									
									<input
										type="password"
										name="password"
										className="input-field"
										placeholder="Enter your password"
										onChange={this.handleChange.bind(this)}
										value={this.state.password}></input>
								</Form.Group>

								<button
									type="submit"
									variant="secondary"
									size="lg"
									className="register-btn">
									SIGN IN
								</button>
								<Link className="register-btn" to="/register">Register</Link>
							</Form>
							<div>{this.state.error}</div>
						</Container>
					</div>
				</div>
			</div>
		);
	}
}

export default LandingComponent;