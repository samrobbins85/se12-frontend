import React, {Component} from 'react';
import BayView from "./BayView";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import {Box, Button, Menu} from "grommet/es6";

class StockTake extends Component {

	constructor(props) {
		super(props);
		// TODO: Make sure that Bays and zones are pulled from the server in the right format once there is actual dummy data.
		let x = [[{id: 1, title: 'Tinned Apples', expiry: '2020', weight: '2000kg'}, {
			id: 2,
			title: 'Tinned Apples',
			expiry: '2021',
			weight: '2000kg'
		}, {id: 3, title: 'Tinned Apples', expiry: '2020', weight: null}], [{
			id: 4,
			title: 'Tinned Apples',
			expiry: '2020',
			weight: '2000kg'
		}, {id: 5, title: 'Tinned Apples', expiry: '2021', weight: '2000kg'}, {
			id: 6,
			title: 'Tinned Apples',
			expiry: '2020',
			weight: null
		}], [{id: 7, title: 'Tinned Apples', expiry: '2020', weight: '2000kg'}, {
			id: 8,
			title: 'Tinned Apples',
			expiry: '2020',
			weight: '2000kg'
		}, {id: 9, title: 'Tinned Apples', expiry: '2021', weight: null}]];


		this.state = {
			db: [[x, x], [x, x], [x, x], [x, x], [x, x], [x, x]],
			selected: {zone: 4, bay: 10},
			zones: [
				{_id: "5e28562ed1fbad2e68287983", name: "0", height: 2, width: 6, bays: [1, 2]},
				{_id: "5e2856a6d1fbad2e68287984", name: "1", height: 2, width: 6, bays: [3, 4]},
				{_id: "5e2a26d0e7aaa7314c58a3ff", name: "2", height: 69, width: 420, bays: [5, 6]},
				{_id: "5e2b2e9d157fd0087051fc72", name: "3", height: 10, width: 10, bays: [7, 8]},
				{_id: "5e3309096c64f1561c3fc672", name: "4", height: 6, width: 2, bays: [9, 10]},
				{_id: "5e3309486c64f1561c3fc673", name: "5", height: 6, width: 2, bays: [11, 12]}
			]
		};


	}


	callbackFunction = (childData) => {
		// TODO: Sync changes made to the server once the API is able to support it.
		// Each Bay will have an id which makes syncing it actually feasible
		// Im currently not saving changes made because the ids format aren't finalised.
		console.log('I will actually save this locally and sync up once server is ready');
	};

	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col md={12}>
							<Jumbotron>
								<Container>
									<h1>Zone
										<Menu
											label={this.state.selected.zone}
											items={this.state.zones.map(z => {
												return {
													label: z.name, onClick: () => {
														this.setState({
															selected: {
																zone: parseInt(z.name),
																bay: this.state.zones[z.name].bays[0]
															}
														})
													}
												}
											})}
										/>
										Bay
										<Menu label={this.state.selected.bay}


										      items={this.state.zones[this.state.selected.zone].bays.map(z => {
											      return {
												      label: z, onClick: () => {
													      this.setState({
														      selected: {
															      zone: parseInt(this.state.selected.zone),
															      bay: z
														      }
													      })

												      }
											      }
										      })}
										/>
									</h1>

								</Container>
							</Jumbotron>
						</Col>
					</Row>
					<Row>

						<Col md={{span: 2, offset: 0}}>
							<Box align="center" height="60px" width="130px">
								<Button label="Previous" fill onClick={() => {

									let current_bay = this.state.zones[this.state.selected.zone].bays;
									let loc = current_bay.indexOf(this.state.selected.bay);

									if (loc - 1 < current_bay.length) {
										this.setState({
											selected: {
												zone: this.state.selected.zone,
												bay: current_bay[loc - 1]
											}
										})

									}

								}}/>
							</Box>
						</Col>
						<Col md={{span: 8, offset: 0}}>
							<BayView db={this.state.db[this.state.selected.zone][0]}
							         parentCallback={this.callbackFunction}/>
						</Col>
						<Col md={{span: 2, offset: 14}}>
							<Box align="center" height="60px" width="130px">
								<Button label="Next" fill onClick={() => {

									let current_bay = this.state.zones[this.state.selected.zone].bays;
									let loc = current_bay.indexOf(this.state.selected.bay);

									if (loc + 1 < current_bay.length) {
										this.setState({
											selected: {
												zone: this.state.selected.zone,
												bay: current_bay[loc + 1]
											}
										})

									}

								}}/>
							</Box>
						</Col>
					</Row>
				</Container>
			</div>

		)
	}

}

export default StockTake;