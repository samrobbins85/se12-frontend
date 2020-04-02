import React, {Component} from 'react';
import {Alert, Col, Container, Jumbotron, Row, Table} from "react-bootstrap";
import {Accordion, AccordionPanel, Box, Select, Meter, Stack, Text, Grommet} from "grommet/es6";
import {DocumentExcel} from "grommet-icons";
import {grommet} from "grommet/themes";
import index from "styled-components/dist/styled-components-macro.esm";
import Loading from "../components/Loading";

function zoneWeight(allTrayData,zones,bays){

	let weights = {}

	for (let zoneKeys in bays) {
		if(zoneKeys !== undefined){
			weights[zoneKeys] = 0
			for (let bayKey in bays[zoneKeys]) {
				if(bayKey !== undefined) {
					weights[zoneKeys+"-"+bayKey] = 0

				}
			}

		}
	}

	allTrayData.forEach((dbKey) =>{
		dbKey.trays.forEach((trayWeight)=>{
			weights[trayWeight.zone] += trayWeight.weight
			weights[trayWeight.zone +"-"+trayWeight.bay] += trayWeight.weight
		})


	})
	console.log("recorded weights are:", weights)
	return weights

}

function findAllCategories(db){
	let cats = []
	db.forEach((loop)=>{
		loop.trays.forEach((loop1)=>{
			if(!cats.includes(loop1.contents)){
				cats.push(loop1.contents)
			}
		})
	});
	return cats
}

function getTraysInBay(query) {
	return new Promise((resolve, reject) => {
		fetch('http://127.0.0.1:3001/stockTake/getTraysInBay', {
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


class Reports extends Component {
	constructor(props) {
		super(props);
		this.loading = true
	}

	fetchDB(query){
		console.log("searching for: ",query)
		let temp = {};
		for (let dbKey in this.state.db) {
			temp[dbKey] = []
		}

		let fuckReact;
		fetch("http://127.0.0.1:3001/stockTake/getAllCategory", {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'contents': {'contents':query}})

	})
			.then(res => res.json())
			.then((data) => {
			// console.log(data)
				data.trays.forEach((tray)=>{

					temp[tray.zone+"-"+tray.bay].push(tray)

				})
				console.log("I built this ",temp)
				console.log("should look like this",this.state.db)
				this.setState({db:temp})
			})




	}

	componentDidMount() {

		let fuckReact;
		fetch("http://127.0.0.1:3001/stockTake/getZones", {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then((data) => {
				fuckReact = data;

				// fetch all the bays and their contents but not their sizes.

				let querys = [];
				let querys1 = [];
				for(let zone = 0; zone < data.zones.length; zone++){
					querys1.push({"zone":data.zones[zone].zone});
					for (let bay =0; bay < data.zones[zone].bays.length; bay++){
						querys.push({"zone":data.zones[zone].zone, "bay":data.zones[zone].bays[bay]});
					}
				}

				let sevedQuerys = [];
				querys.forEach(
					(my_query)=>{
						sevedQuerys.push(getTraysInBay(my_query))
					});
				Promise.all(sevedQuerys).then((allTrayData)=>{
					let fml = {}
					for (let loop = 0; loop < allTrayData.length; loop++){
						if (allTrayData[loop].trays.length > 0) {
							fml[allTrayData[loop].trays[0].zone + "-" + allTrayData[loop].trays[0].bay] = allTrayData[loop].trays
						}
					}
					let sevedQuerys1 = [];
					querys1.forEach(
						(my_query)=>{
							sevedQuerys1.push(getBaysInZone(my_query))
						});
					Promise.all(sevedQuerys1).then((allBayData)=>{
						let x = {};
						allBayData.forEach((aLoop) => {
							let temp = aLoop.bays;
							let temp1 = {};
							temp.forEach((loop) => {
								temp1[loop.bay] = {xVal:loop.xVal , yVal:loop.yVal, xSize:loop.xSize , ySize:loop.ySize}
							});
							x[aLoop.bays[0].zone] =temp1
						});
						this.loading = false;
						this.categories = findAllCategories(allTrayData);
						this.zoneWeights = zoneWeight(allTrayData,fuckReact.zones,x);
						this.setState({bays: x, zones: fuckReact.zones, db: fml})
					})
				})
			})
	}

	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	console.log("Checking the format:",this.state)
	// }

	render() {

		if (this.loading) {
			return <Loading/>
		} else {

			return (
				<Container>
					<Row>
						<Col md={9}>
							<div>
								<li style={{color: '#ffffff'}}>there will be a list of alerts stating the order
									location, the date placed and a pdf button to download the order sheet (all rendered
									on the client side)
								</li>

								<Jumbotron>
									<Container>
										<h1>Reports</h1>
										<p>
											Here you will be able to download the stock take counts.
										</p>
									</Container>
								</Jumbotron>

								{this.state.zones.map((zone, zoneIndex) => {

									return <Accordion>
										<AccordionPanel label={zone.zone}>
											<Alert variant={'warning'} style={{alignContent: 'left'}}> <Row><Col> {zone.bays.length} </Col> {this.zoneWeights[zone.zone]} kg </Row></Alert>

											{zone.bays.map((bay)=>{

												if(this.state.db[zone.zone+"-"+bay].length === 0){
													return
												}

												return <Accordion>
													<AccordionPanel label = {bay} pad={'medium'}>
														<Alert variant={'info'} style={{alignContent: 'left'}}><Row> <Col>{this.state.db[zone.zone+"-"+bay].length}
															Trays</Col> {this.zoneWeights[zone.zone+"-"+bay]} kg </Row> </Alert>
														{this.state.db[zone.zone+"-"+bay].map((tray)=>{

															return <Box pad="large" background="light-2">
																<Text style={{alignContent:"Left"}}>
																	{tray.contents}
																</Text>
																<Text style={{alignContent:"Centre"}}>
																	{tray.weight} kg
																</Text>
																<text style={{"alignSelf": "flexEnd"}}>
																	expires: {tray.expiry}
																</text>

															</Box>

														})}

													</AccordionPanel>

												</Accordion>

											})}


										</AccordionPanel>
									</Accordion>


								})}


							</div>
						</Col>
						<Col md={3}>
							<li style={{color: '#ffffff'}}>Hello World</li>

							<li style={{color: '#ffffff'}}>Hello World</li>
							<Alert variant={'success'} style={{alignContent: 'left'}}>
								<Row>
									<Col>
										<DocumentExcel color="#000066"/>
									</Col>

									Download Most recent stock take

								</Row>
							</Alert>
							<Alert variant={'danger'} style={{alignContent: 'left'}}>
								<Row>
									<Col>
										<DocumentExcel color="#000066"/>
									</Col>

									Download Previous stock takes from
									<Select options={['3 Months', '6 Months', '12 Months', 'Historical']}
											value='3 Months'/>

								</Row>
							</Alert>
							<Grommet theme={grommet}>
								<Box align="center" pad="large">
									<Stack anchor="center">
										<Meter
											type="circle"
											background="light-4"
											values={[{value: 65}]}
											size="small"
											thickness="medium"
										/>
										<Box direction="row" align="center" pad={{bottom: "medium"}}>
											<Text size="xlarge" weight="bold">
												{65}
											</Text>
											<Text size="small">% </Text>
										</Box>
									</Stack> <Text weight="bold" size="small" style={{textAlign: '-webkit-center'}}> of
									Stock take completed </Text>
								</Box></Grommet>


						</Col>
						<Col>
							<Table responsive>
								<thead>
								<tr>
									<th>Category</th>
									<th>Tray quantity</th>
									<th>Weighed tray weight</th>
									<th>Since previous stock take</th>
									<th>Average Expiry date</th>
									<th>Trays expiring within 6 months</th>
									<th>Trays expiring within 6-12 months</th>
									<th>Trays expiring within 12+ months</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>Baked Beans</td>
									<td>70</td>
									<td>410kg</td>
									<td>▲ 4 trays</td>
									<td>January 2022</td>
									<td>20</td>
									<td>35</td>
									<td>15</td>
								</tr>
								<tr>
									<td>Tinned Soup</td>
									<td>30</td>
									<td>290kg</td>
									<td>▲ 4 trays</td>
									<td>April 2021</td>
									<td>8</td>
									<td>7</td>
									<td>15</td>
								</tr>
								<tr>
									<td>Pasta</td>
									<td>15</td>
									<td>40kg</td>
									<td>▼ 2 trays</td>
									<td>February 2023</td>
									<td>3</td>
									<td>7</td>
									<td>5</td>
								</tr>
								<tr>
									<td>...</td>
									<td>...</td>
									<td>...</td>
									<td>...</td>
									<td>...</td>
									<td>...</td>
									<td>...</td>
									<td>...</td>
								</tr>
								</tbody>
							</Table>


						</Col>
					</Row>
				</Container>
			);
		}
	}
}

export default Reports;