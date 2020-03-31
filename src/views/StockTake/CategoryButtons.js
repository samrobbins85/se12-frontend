import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from "react-bootstrap";
import {Box, Button} from "grommet/es6";


class CategoryButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {selected: null};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (id) => {

		this.setState({selected: id});
		this.props.parentCallback({id: id});

	};


	render() {
		return (
			<div>
				<Col>
					<Row style={{paddingTop: '10px'}}>
						{this.props.categories.map(z => {
							return <Box align="center" height="90px" width="130px" style={{padding: '10px'}}>
								<Button label={z} fill onClick={() => {
									this.handleClick(z);
								}}/>
							</Box>
						})}
					</Row>
				</Col>


			</div>
		);
	}
}

CategoryButtons.propTypes = {};

export default CategoryButtons;