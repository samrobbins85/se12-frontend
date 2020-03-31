import React, {Component} from 'react';
import BayView from "./BayView";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import {Box, Button, Menu} from "grommet/es6";
import Loading from "../../components/Loading";

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

class StockTake extends Component {

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
				 	fml[allTrayData[loop].trays[0].zone + "-" + allTrayData[loop].trays[0].bay] = allTrayData[loop].trays
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
					 this.setState({bays: x, zones: fuckReact.zones, db: fml, selected: {zone: 0, bay: 0}})
				 })
			 })
		 })
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("new state!! ",this.state)
	}

	 constructor(props) {
		 super(props);
		 this.loading = true
		 this.state = {selected: {zone: 0, bay: 0}, zones: [
				 {
				 		 "_id": NaN,
				 		 "zone": "RED",
				 		 "height": 1,
				 		 "width": 1,
				 		 "bays": ["A"]
				 	 },

			 ], db:{"RED-A":[{"_id":"5e8131656ff5f04ac8e4d12f","zone":"RED","bay":"A","tray":"0","contents":"Tinned soup","expiry":"","weight":"0"}]}};
	}


	callbackFunction = (childData) => {
		// TODO: Sync changes made to the server once the API is able to support it.
		console.log("Bayview sent a new state... : ",childData);
		let temp = this.state.db ;
		temp[childData.target.zone+"-"+childData.target.bay] = childData.newstate;
		for (let loop = 0; loop < childData.newstate.length; loop++){

			fetch('http://127.0.0.1:3001/stockTake/editTray',{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"zone": childData.target.zone,
					"bay": childData.target.bay,
					"tray": childData.newstate[loop].tray,
					"contents": childData.newstate[loop].contents,
					"weight": childData.newstate[loop].weight,
					"expiry": childData.newstate[loop].expiry,
					"xpos": childData.newstate[loop].xpos,
					"ypos": childData.newstate[loop].ypos,
				})
			})
				.then(res => {

					res.json();
					if (!res.ok){
						loop--
					}
				}).catch(console.log)

		}
		this.setState({db:temp})
	};

	render() {
		if (this.loading){
			return <Loading/>
		}else{
			return (
				<div>
					<Container>
						<Row>
							<Col md={12}>
								<Jumbotron>
									<Container>
										<h1>Zone
											<Menu
												label={ this.state.zones[this.state.selected.zone].zone   }
												items={this.state.zones.map((z,index) => {
													return {
														label: z.zone, onClick: () => {
															this.setState({
																selected: {
																	zone: index,
																	bay: 0 //this.state.zones[z.name].bays[0]
																}
															})
														}
													}
												})}
											/>
											Bay
											<Menu label={this.state.zones[this.state.selected.zone].bays[this.state.selected.bay]}


												  items={this.state.zones[this.state.selected.zone].bays.map((z,index) => {
													  return {
														  label: z, onClick: () => {
															  this.setState({
																  selected: {
																	  zone: parseInt(this.state.selected.zone),
																	  bay: index
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


										if (this.state.selected.bay - 1 >= 0) {
											this.setState({
												selected: {
													zone: this.state.selected.zone,
													bay: this.state.selected.bay - 1
												}
											})

										}

									}}/>
								</Box>
							</Col>
							<Col md={{span: 8, offset: 0}}>
								{/*<BayView db={this.state.db[ this.state.zones[this.state.selected.zone].zone + "-" + this.state.zones[this.state.selected.zone].bays[this.state.selected.bay]]}*/}
								<BayView dimensons = {this.state.bays === undefined ? NaN : this.state.bays[ this.state.zones[this.state.selected.zone].zone ][ this.state.zones[this.state.selected.zone].bays[this.state.selected.bay]]} db={this.state.db[this.state.zones[this.state.selected.zone].zone + "-" + this.state.zones[this.state.selected.zone].bays[this.state.selected.bay]]} quer = {this.state.zones[this.state.selected.zone].zone + "-" + this.state.zones[this.state.selected.zone].bays[this.state.selected.bay]}

										 parentCallback={this.callbackFunction}/>
							</Col>
							<Col md={{span: 2, offset: 14}}>
								<Box align="center" height="60px" width="130px">
									<Button label="Next" fill onClick={() => {


										if (this.state.selected.bay + 1 < this.state.zones[this.state.selected.zone].bays.length) {
											this.setState({
												selected: {
													zone: this.state.selected.zone,
													bay: this.state.selected.bay + 1
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

}

export default StockTake;