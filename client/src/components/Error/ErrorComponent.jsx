import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";

class ErrorComponent extends Component {
	render() {
		return (
			<div className="app-window org-component">
				<Container fluid className="h-100">
					<Row
						style={{height: "fit-content"}}
						className="header-title border-bottom mb-3 align-items-center"
					>
						<h1>Error</h1>	
					</Row>
				</Container>
			</div>
		);
	}
}

export default ErrorComponent;