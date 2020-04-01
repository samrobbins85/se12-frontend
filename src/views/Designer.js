import React, {Component} from 'react';
import {Accordion, AccordionPanel, Box, Grommet, Meter, Select, Stack, Text, Layer, Button} from "grommet/es6";
import {Alert, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {SettingsOption, Add, Trash, DocumentExcel} from "grommet-icons";
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
		let jsonBuild = {};
		jsonBuild["zone"] = zone;

		fetch('http://127.0.0.1:3001/stockTake/removeZone', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonBuild)
		})
	}

	removeBay(bay) {
		let jsonBuild = {};
		jsonBuild["bay"] = bay;

		fetch('http://127.0.0.1:3001/stockTake/removeBay', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonBuild)
		})
	}

	editZone(zone) {
		// Currently only able to change zone name

		let jsonBuild = {};
		jsonBuild["zone"] = zone;

		fetch('http://127.0.0.1:3001/stockTake/editZone', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonBuild)
		})
	}

	editBay(bay) {
		// Currently only able to change zone name

		let jsonBuild = {};
		// may be obsolete... check again in morning <matt, 1/4/20, 3:57>
		//jsonBuild["xSize"] = bay["xSize"];
		//jsonBuild["ySize"] = bay["ySize"];
		//jsonBuild["bay"] = bay["bay"];

		fetch('http://127.0.0.1:3001/stockTake/editBay', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonBuild)
		})
	}

	addZone(zone) {
		// Currently only able to change zone name

		let jsonBuild = {};
		// may be obsolete... check again in morning <matt, 1/4/20, 3:57>
		//jsonBuild["height"] = zone["height"];
		//jsonBuild["width"] = zone["width"];
		//jsonBuild["zone"] = zone["zone"];

		fetch('http://127.0.0.1:3001/stockTake/addZone', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonBuild)
		})
	}

	addBay(zone) {
		// Currently only able to change zone name

		let jsonBuild = {};
		// may be obsolete... check again in morning <matt, 1/4/20, 3:57>
		//jsonBuild["xSize"] = bay[xSize];
		//jsonBuild["ySize"] = bay[ySize];
		//jsonBuild["xVal"] = bay[xVal];
		//jsonBuild["yVal"] = bay[yVal];
		//jsonBuild["bay"] = bay[bay];
		//jsonBuild["zone"] = bay[zone];

		fetch('http://127.0.0.1:3001/stockTake/addBay', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonBuild)
		})
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
		this.state = {bays: {}, zones: [], layerType: undefined, layerArgs: undefined};

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
			  <Text>Are you sure?</Text>
			  <Box direction='row' gap='medium' align='center'>
				<Button label='Yes' onClick={this.removeZone(this.state.layerArgs)} />
				<Button label='No' primary={true} onClick={onClose} />
			  </Box>
			</Box>
		  </Layer>
		);

		const ConfirmRemoveBay = ({ onClose }) => (
		  <Layer position='center' onClickOutside={onClose}>
			<Box pad='large' gap='medium'>
			  <Text>Are you sure?</Text>
			  <Box direction='row' gap='medium' align='center'>
				<Button label='Yes' onClick={this.removeBay(this.state.layerArgs)} />
				<Button label='No' primary={true} onClick={onClose} />
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
													<Row>
														<Col>
															<SettingsOption color="#000066"/>
														</Col>

														Edit Zone Name

													</Row>
												</Alert>
												<Alert variant={'danger'} style={{alignContent: 'left'}}>
													<Row onClick={() => this.setState({layerType: "ConfirmRemoveZone", layerArgs: i.zone})}>

														<Col>
															<Trash color="#000066"/>
														</Col>

														Delete this Zone

													</Row>
													{layer}
												</Alert>
												<Alert variant={'success'} style={{alignContent: 'left'}}>
													<Row>
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
																	<Row>
																		<Col>
																			<SettingsOption color="#000066"/>
																		</Col>

																		Change The dimensions of this bay

																	</Row>
																</Alert>
																<Alert variant={'danger'}
																	   style={{alignContent: 'left'}}>
																	<Row onClick={() => this.setState({layerType: "ConfirmRemoveBay", layerArgs: z.name})}>
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
								<Row>
									<Col>
										<Add color="#000066"/>
									</Col>

									Add a new zone

								</Row>
							</Alert>
							<Alert variant={'danger'} style={{alignContent: 'left'}}>
								<Row>
									<Col>
										<Add color="#000066"/>
									</Col>

									Download Previous stock takes from

								</Row>
							</Alert>
							<Grommet theme={grommet}>
								<Box align="center" pad="large">
									<Stack anchor="center">
										<Meter
											type="circle"
											background="light-4"
											values={[{value: 30}]}
											size="small"
											thickness="medium"
										/>
										<Box direction="row" align="center" pad={{bottom: "medium"}}>
											<Text size="xlarge" weight="bold">
												{30}
											</Text>
											<Text size="small">% </Text>
										</Box>
									</Stack> <Text weight="bold" size="small"
												   style={{textAlign: '-webkit-center'}}> Vacant, 338 free of 1125
									spaces left. </Text>
								</Box></Grommet>


						</Col>
					</Row>
				</Container>
			);
		}
	}
}

export default Designer;