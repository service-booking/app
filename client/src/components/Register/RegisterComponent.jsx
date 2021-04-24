import React, {Component} from "react";
import "./RegisterComponent.css";
import {Form, Button, Col, Container, Spinner} from "react-bootstrap";
import AuthenticationService from "../Authentication/AuthenticationService.js";

class RegisterComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validated: false,
			username: "",
			password: "",
			sessionToken: "",
		};
	}

	componentDidMount() {
		fetch("https://www.uuidgenerator.net/api/version4").then((response) => {
			response.text().then((text) => {
				this.setState({sessionToken: text});
			});
		});
	}

	handleValidation(e) {
		let fields = this.state;
		let formIsValid = true;

		return formIsValid;
	}

	handleChange(event) {
		const {name: fieldName, value} = event.target;
		this.setState({
			[fieldName]: value,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		if (this.handleValidation(e)) {
			let user = {
				username: this.state.username,
				password: this.state.password
			};
			
			AuthenticationService.checkForUser(this.state.username).then((response) => {
				if (response.data) {
					// error occured
				} else {
					AuthenticationService.registerNewUser(user).then((response) => {

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
					});
				}
			});
		}

		this.setState({validated: true});
	}

	render() {
		return (
			<div className="wrapper">
				<div className="overlay">
					<div className="info-text">
						<h1>Register</h1>
					</div>

					<Form
						noValidate
						validated={this.state.validated}
						className="signup-form"
						onSubmit={this.onSubmit.bind(this)}>
						<Container>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type="text"
										name="username"
										id="register-username"
										placeholder="Username"
										onChange={this.handleChange.bind(this)}
										value={this.state.username}
									/>
								</Form.Group>

								<Form.Group as={Col}>
									<Form.Label>Password</Form.Label>
									<Form.Control
										className="password-control"
										type="password"
										name="password"
										placeholder="Password"
										onChange={this.handleChange.bind(this)}
										value={this.state.password}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row className="justify-content-end">
								<Form.Text className="text-muted text-center">
									Password must use 6 or more characters with a mix of
									letters,numbers and symbols
								</Form.Text>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col}>
									<Button
										style={{width: "inherit"}}
										type="submit"
										className="submit-button btn-lg"
										variant="secondary">
										SIGN UP
									</Button>
								</Form.Group>
							</Form.Row>
						</Container>
					</Form>
				</div>
			</div>
		); 
	}
}

export default RegisterComponent;
