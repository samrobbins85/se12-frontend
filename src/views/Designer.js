import React, {Component} from 'react';
import {Form, FormField, Accordion, AccordionPanel, Box, Grommet, Meter, Stack, Text, Layer, Button} from "grommet/es6";
import {Alert, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {SettingsOption, Add, Trash} from "grommet-icons";
import {grommet} from "grommet/themes";
import Loading from "../components/Loading";

function getBaysInZone(query) {
	return new Promise((resolve, reject) => {
		fetch('http://127.0.0.1:3001/stockTake/getBaysInZone', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(query)
		})
			.then((resp) => resp.json())
			.then((data) => {
				resolve(data)
			})
	});
}


class Designer extends Component {
	removeZone(zone) {
		fetch('http://127.0.0.1:3001/stockTake/removeZone', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(zone)
		});
		window.location.reload();
	}

	removeBay(bay) {
		fetch('http://127.0.0.1:3001/stockTake/removeBay', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bay)
		});
		window.location.reload();
	}

	editZone(zone) {
		// Currently only able to change zone name
		zone["zone"] = this.state.layerArgs["zone"];
		console.log(zone);

		fetch('http://127.0.0.1:3001/stockTake/editZone', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(zone)
		});
		window.location.reload();
	}

	editBay(bay) {
		bay["ySize"] = parseInt(bay["ySize"]);
		bay["xSize"] = parseInt(bay["xSize"]);

		bay["xVal"] = 0;
		bay["yVal"] = 0;
		bay["zone"] = this.state.layerArgs["zone"];
		bay["bay"] = this.state.layerArgs["bay"];

		fetch('http://127.0.0.1:3001/stockTake/editBay', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bay)
		});
		window.location.reload();
	}

	addZone(zone) {
		zone["height"] = parseInt(zone["height"]);
		zone["width"] = parseInt(zone["width"]);

		fetch('http://127.0.0.1:3001/stockTake/addZone', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(zone)
		});
		window.location.reload();
	}

	addBay(bay) {
		bay["ySize"] = parseInt(bay["ySize"]);
		bay["xSize"] = parseInt(bay["xSize"]);

		bay["xVal"] = 0;
		bay["yVal"] = 0;
		bay["zone"] = this.state.layerArgs;

		fetch('http://127.0.0.1:3001/stockTake/addBay', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bay)
		});
		window.location.reload();
	}

	componentDidMount() {

		let zonesList;
		fetch("http://127.0.0.1:3001/stockTake/getZones", {
		 method: 'GET',
		 mode: 'cors',
		 headers: {
			 'Content-Type': 'application/json'
		 }
		})
		 .then(res => res.json())
		 .then((data) => {
			 zonesList = data.zones;

			 let bayQuerys = [];
			 for (let currentZone = 0; currentZone < zonesList.length; currentZone++) {
			 	bayQuerys.push({"zone":zonesList[currentZone].zone});
			 }

			 let bayList = [];

			 bayQuerys.forEach(
			 	(query)=>{
			 		bayList.push(getBaysInZone(query));
			 	});
			 Promise.all(bayList).then((allBayData)=>{
			 	let x = {};
			 	allBayData.forEach(
			 		(aLoop) => {
			 			let temp = aLoop.bays;
			 			let temp1 = [];
			 			temp.forEach(
			 				(loop) => {
			 					temp1.push({name:loop.bay, xVal:loop.xVal , yVal:loop.yVal, xSize:loop.xSize, ySize:loop.ySize});
							});
			 			x[aLoop.bays[0].zone] = temp1;
			 		});

			 	this.loading = false;
			 	this.setState({bays: x, zones: zonesList});
			 });
		 })
	}

	constructor(props){
		super(props);
		this.loading = true;
		this.state = {bays: {}, zones: [], layerType: undefined, layerArgs: undefined, reload: false};

		this.removeZone = this.removeZone.bind(this);
		this.removeBay = this.removeBay.bind(this);
		this.editZone = this.editZone.bind(this);
		this.editBay = this.editBay.bind(this);
		this.addZone = this.addZone.bind(this);
		this.addBay = this.addBay.bind(this);
	}

	render() {
		const ConfirmRemoveZone = ({ onClose }) => (
		  <Layer position='center' onClickOutside={onClose}>
			<Box pad='large' gap='medium'>
			  <Text>Are you sure? All bays & trays contained within will be deleted!</Text>
			  <Box direction='row' gap='medium' align='center'>
				<Button label='Yes' onClick={() => {this.removeZone(this.state.layerArgs)}} />
				<Button label='No' primary={true} onClick={onClose} />
			  </Box>
			</Box>
		  </Layer>
		);

		const ConfirmRemoveBay = ({ onClose }) => (
		  <Layer position='center' onClickOutside={onClose}>
			<Box pad='large' gap='medium'>
				<Text>Are you sure? All trays contained within will be deleted!</Text>
				<Box direction='row' gap='medium' align='center'>
					<Button label='Yes' onClick={() => {this.removeBay(this.state.layerArgs)}} />
					<Button label='No' primary={true} onClick={onClose} />
				</Box>
			</Box>
		  </Layer>
		);

		const DoAddBay = ({ onClose }) => (
		  <Layer position='center' onClickOutside={onClose}>
			<Box pad='large' gap='medium'>
				<Text>Add Bay</Text>
				<Box>
					<Form onSubmit={({ value }) => this.addBay(value)}>
						<FormField name="bay" label="Bay Name" required={true} />

						<FormField name="ySize" label="Height" required={true} />
						<FormField name="xSize" label="Width" required={true} />

						<Button type="submit" primary label="Submit" />
						<Button label='Back' primary={true} onClick={onClose} />
					</Form>
				</Box>
			</Box>
		  </Layer>
		);

		const DoAddZone = ({ onClose }) => (
		  <Layer position='center' onClickOutside={onClose}>
			<Box pad='large' gap='medium'>
				<Text>Add Zone</Text>
				<Box>
					<Form onSubmit={({ value }) => this.addZone(value)}>
						<FormField name="zone" label="Zone Name" required={true} />

						<FormField type="number" name="height" label="Height" required={true} />
						<FormField type="number" name="width" label="Width" required={true} />

						<Button type="submit" primary label="Submit" />
						<Button label='Back' primary={true} onClick={onClose} />
					</Form>
				</Box>
			</Box>
		  </Layer>
		);

		const DoEditBay = ({ onClose }) => (
		  <Layer position='center' onClickOutside={onClose}>
			<Box pad='large' gap='medium'>
				<Text>Edit Bay {this.state.layerArgs["bay"]}</Text>
				<Box>
					<Form onSubmit={({ value }) => this.editBay(value)}>
						{/*<FormField name="bay" label="Bay Name" value={this.state.layerArgs["bay"]} required={true} />*/}

						<FormField type="number" name="ySize" label="Height" value={this.state.layerArgs["ySize"]} required={true} />
						<FormField type="number" name="xSize" label="Width" value={this.state.layerArgs["xSize"]} required={true} />

						<Button type="submit" primary label="Submit" />
						<Button label='Back' primary={true} onClick={onClose} />
					</Form>
				</Box>
			</Box>
		  </Layer>
		);

		const DoEditZone = ({ onClose }) => (
		  <Layer position='center' onClickOutside={onClose}>
			<Box pad='large' gap='medium'>
				<Text>Edit Zone {this.state.layerArgs["zone"]}</Text>
				<Box>
					<Form onSubmit={({ value }) => this.editZone(value)}>
						<FormField name="newname" label="Zone Name" value={this.state.layerArgs["zone"]} required={true} />

						<Button type="submit" primary label="Submit" />
						<Button label='Back' primary={true} onClick={onClose} />
					</Form>
				</Box>
			</Box>
		  </Layer>
		);


    	let layer;

    	if (this.state.layerType === "ConfirmRemoveZone") {
    		layer = <ConfirmRemoveZone onClose={() => this.setState({layerType: undefined, layerArgs: undefined})} />;
		}
    	else if (this.state.layerType === "ConfirmRemoveBay") {
    		layer = <ConfirmRemoveBay onClose={() => this.setState({layerType: undefined, layerArgs: undefined})} />;
		}
    	else if (this.state.layerType === "DoAddBay") {
    		layer = <DoAddBay onClose={() => this.setState({layerType: undefined, layerArgs: undefined})} />;
		}
    	else if (this.state.layerType === "DoAddZone") {
    		layer = <DoAddZone onClose={() => this.setState({layerType: undefined, layerArgs: undefined})} />;
		}
    	else if (this.state.layerType === "DoEditBay") {
    		layer = <DoEditBay onClose={() => this.setState({layerType: undefined, layerArgs: undefined})} />;
		}
    	else if (this.state.layerType === "DoEditZone") {
    		layer = <DoEditZone onClose={() => this.setState({layerType: undefined, layerArgs: undefined})} />;
		}
    	else {
    		layer = undefined;
		}

		if (this.loading){
			return <Loading/>
		}else {
			return (
				<Container>
					<Row>
						<Col md={9}>
							<div>
								<br/>
								<br/>
								<Jumbotron>
									<Container>
										<h1>Warehouse Designer</h1>

										<li>We will have a list of zones, that will collapse into an accordion component
											(search grommet accordion to see what i mean)
										</li>
										<li>further accordions will expand to show the bays, each bay will have a gear
											icon
										</li>
										<li>the gear icon will yield a pop out (not sure which react framework will
											support this.)
										</li>
										<li>the pop out will allow user to increase the dimensions of the bay or
											decrease them if no bays will be lost.
										</li>
										<li>the popout we see here will be the same component visible in the gear icon
											in the stocktake component.
										</li>

									</Container>
								</Jumbotron>

								<Accordion>

									{this.state.zones.map(i => {
										return <AccordionPanel label={i.zone}>
											<Box pad="medium" background="light-2">
												<Alert variant={'info'} style={{alignContent: 'left'}}>
													<Row onClick={() => this.setState({layerType: "DoEditZone", layerArgs: {"zone": i.zone}})}>
														<Col>
															<SettingsOption color="#000066"/>
														</Col>

														Edit Zone Name

													</Row>
												</Alert>
												<Alert variant={'danger'} style={{alignContent: 'left'}}>
													<Row onClick={() => this.setState({layerType: "ConfirmRemoveZone", layerArgs: {"zone": i.zone}})}>

														<Col>
															<Trash color="#000066"/>
														</Col>

														Delete this Zone

													</Row>
													{layer}
												</Alert>
												<Alert variant={'success'} style={{alignContent: 'left'}}>
													<Row onClick={() => this.setState({layerType: "DoAddBay", layerArgs: i.zone})}>
														<Col>
															<Add color="#000066"/>
														</Col>

														Add Bay

													</Row>
												</Alert>

												{this.state.bays[i.zone].map(z => {

													return <Accordion>
														<AccordionPanel label={'Bay: ' + z.name}>
															<Box pad="medium" background="light-2">
																<text>{z.ySize} trays high and {z.xSize} trays
																	wide:
																</text>
																<Alert variant={'success'}
																	   style={{alignContent: 'left'}}>
																	<Row onClick={() => this.setState({layerType: "DoEditBay", layerArgs: {"bay": z.name, "zone": i.zone, "xSize": z.xSize, "ySize": z.ySize}})}>
																		<Col>
																			<SettingsOption color="#000066"/>
																		</Col>

																		Change The dimensions of this bay

																	</Row>
																</Alert>
																<Alert variant={'danger'}
																	   style={{alignContent: 'left'}}>
																	<Row onClick={() => this.setState({layerType: "ConfirmRemoveBay", layerArgs: {"bay": z.name, "zone": i.zone}})}>
																		<Col>
																			<Trash color="#000066"/>
																		</Col>

																		Delete This Bay

																	</Row>
																</Alert>
															</Box>
														</AccordionPanel>
													</Accordion>

												})}


											</Box>
										</AccordionPanel>
									})}
								</Accordion>

							</div>
						</Col>
						<Col md={3}>
							<li style={{color: '#ffffff'}}>Hello World</li>

							<li style={{color: '#ffffff'}}>Hello World</li>
							<Alert variant={'success'} style={{alignContent: 'left'}}>
								<Row onClick={() => this.setState({layerType: "DoAddZone"})}>
									<Col>
										<Add color="#000066"/>
									</Col>

									Add a new zone

								</Row>
							</Alert>
						</Col>
					</Row>
				</Container>
			);
		}
	}
}

export default Designer;