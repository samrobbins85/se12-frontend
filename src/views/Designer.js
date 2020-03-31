import React, {Component} from 'react';
import {Accordion, AccordionPanel, Box, Grommet, Meter, Select, Stack, Text} from "grommet/es6";
import {Alert, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {SettingsOption, Add, Trash, DocumentExcel} from "grommet-icons";
import {grommet} from "grommet/themes";

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
	async componentWillMount() {
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
			 zonesList = data;

			 let bayQuerys = [];
			 for (let currentZone = 0; currentZone < zonesList.length; currentZone++) {
			 	bayQuerys.push({"zone":data.zones[currentZone].zone});
			 }

			 let bayList = [];

			 bayQuerys.forEach(
			 	(query)=>{
			 		bayList.push(getBaysInZone(query))
			 	});
			 Promise.all(bayList).then((allBayData)=>{
			 	let x = {};
			 	allBayData.forEach(
			 		(aLoop) => {
			 			let temp = aLoop.bays;
			 			let temp1 = {};
			 			temp.forEach(
			 				(loop) => {
			 					temp1[loop.bay] = {xVal:loop.xVal , yVal:loop.yVal, xSize:loop.xSize, ySize:loop.ySize, name:loop.bay}
							});
			 			x[aLoop.bays[0].zone] =temp1
			 		});
			 	this.state.bays = x;
			 	this.state.zones = zonesList.zones;
			 	console.log("Complete");
			 });
		 })
	}


	constructor(props){
		super(props);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md={9}>
			<div>
				<br/>
				<br/>
				<Jumbotron >
					<Container>
						<h1>Warehouse Designer</h1>

							<li>We will have a list of zones, that will collapse into an accordion component (search grommet accordion to see what i mean)</li>
							<li>further accordions will expand to show the bays, each bay will have a gear icon</li>
							<li>the gear icon will yield a pop out (not sure which react framework will support this.)</li>
							<li>the pop out will allow user to increase the dimensions of the bay or decrease them if no bays will be lost.</li>
							<li>the popout we see here will be the same component visible in the gear icon in the stocktake component.</li>

					</Container>
				</Jumbotron>


				<Accordion>


				{this.state.zones.map(i =>{
					return <AccordionPanel label={i.zone}>
						<Box pad="medium" background="light-2">
							<Alert  variant={'info'} style={{alignContent:'left'}}>
								<Row>
									<Col>
										<SettingsOption color = "#000066"/>
									</Col>

									Edit Zone Name

								</Row>
							</Alert>
							<Alert  variant={'danger'} style={{alignContent:'left'}}>
								<Row>
									<Col>
										<Trash color = "#000066"/>
									</Col>

									Delete this Zone

								</Row>
							</Alert>
							<Alert  variant={'success'} style={{alignContent:'left'}}>
								<Row>
									<Col>
										<Add color = "#000066"/>
									</Col>

									Add Bay

								</Row>
							</Alert>
							{this.state.bays[i.zone].map(z=>{
								return z.map(a=>{

									return <Accordion>
											<AccordionPanel label={'Bay: '+a.name}>
										<Box pad="medium" background="light-2">
											<text>{a.ySize}  trays high and {a.xSize} trays wide:</text>
											<Alert  variant={'success'} style={{alignContent:'left'}}>
												<Row>
													<Col>
														<SettingsOption color = "#000066"/>
													</Col>

													Change The dimensions of this bay

												</Row>
											</Alert>
											<Alert  variant={'danger'} style={{alignContent:'left'}}>
												<Row>
													<Col>
														<Trash color = "#000066"/>
													</Col>

													Delete This Bay

												</Row>
											</Alert>
										</Box>
									</AccordionPanel>
									</Accordion>

									})
							})}


						</Box>
					</AccordionPanel>
				})}
				</Accordion>

			</div>
					</Col>
					<Col md={3}>
						<li style={{color:'#ffffff'}}>Hello World </li>

						<li style={{color:'#ffffff'}}>Hello World </li>
						<Alert  variant={'success'} style={{alignContent:'left'}}>
							<Row>
								<Col>
									<Add color = "#000066"/>
								</Col>

								Add a new zone

							</Row>
						</Alert>
						<Alert  variant={'danger'} style={{alignContent:'left'}}>
							<Row>
								<Col>
									<Add color = "#000066"/>
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
										values={[{ value: 30 }]}
										size="small"
										thickness="medium"
									/>
									<Box direction="row" align="center" pad={{ bottom: "medium" }}>
										<Text size="xlarge" weight="bold">
											{30}
										</Text>
										<Text size="small">% </Text>
									</Box>
								</Stack>  <Text  weight="bold" size="small" style={{textAlign:'-webkit-center'}}> Vacant, 338 free of 1125 spaces left. </Text>
							</Box></Grommet>


					</Col>
				</Row>
			</Container>
		);
	}
}

export default Designer;