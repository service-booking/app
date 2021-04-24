import React, {Component} from "react";
import "./LandingComponent.css";
import FooterComponent from "../Footer/FooterComponent.jsx";
import {Container, Form, Button} from "react-bootstrap";
import AuthenticationService from "../Authentication/AuthenticationService.js";

class LandingComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
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
			let url = "/home";
			this.props.history.push(url);
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
					<div className="login-container">
						<Container style={{height: "100vh"}}>
							<Form className="login-form" onSubmit={this.handleSubmit}>
								<h1 className="login-title">LOGIN</h1>
								<Form.Group className="input-container">
									<p className="input-name">Username</p>
									<input
										type="text"
										name="username"
										className="input-field username-field"
										placeholder="Enter your username"
										onChange={this.handleChange.bind(this)}
										value={this.state.username}></input>
								</Form.Group>
								<Form.Group className="input-container">
									<p className="input-name">Password</p>
									<input
										type="password"
										name="password"
										className="input-field password-field"
										placeholder="Enter your password"
										onChange={this.handleChange.bind(this)}
										value={this.state.password}></input>
								</Form.Group>

								<Button
									type="submit"
									variant="secondary"
									size="lg"
									className="submit-button button-lg">
									SIGN IN
								</Button>
							</Form>
						</Container>
						<FooterComponent />
					</div>
				</div>
			</div>
		);
	}
}

export default LandingComponent;