import React, {Component} from 'react';
import {CardDeck, Row, Col, Container} from "react-bootstrap";
import TrayItem from "./trayItem.js";
import CategoryButtons from './CategoryButtons.js';

import {Box, FormField, Grommet, Tab, Tabs, Text, Form, Button} from "grommet";
import {grommet} from "grommet/themes";
import {Calculator, Schedule, Cafeteria} from "grommet-icons";


const RichTabTitle = ({icon, label}) => (
	<Box direction="row" align="center" gap="xsmall" margin="xsmall">
		{icon}
		<Text size="small">
			<strong>{label}</strong>
		</Text>
	</Box>
);


class BayView extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		// this.props.db = this.props.db;
		this.y = new Date();
		this.y = this.y.getYear();
		this.selectedList = [false, false, false, false, false, false, false, false, false]
		this.categories = ['Tinned Fruit', 'Tinned Beans', 'Tinned Soup', 'Tinned Sauce', 'Cereal', 'Pasta', 'Juice', 'Milk', 'Toiletries', 'Nappies', 'Feminine Products', 'Cleaning Products']
	}

	callbackFunction = (childData) => {
		this.selectedList[childData.id - 1] = childData.selected;
	};

	performCategoryChange = (ef) => {
		if (this.selectedList.includes(true)) {
			let temp1 = [];
			for (let y = 0; y < this.props.db.length; y++) {
				temp1.push(this.props.db[y][0]);
				temp1.push(this.props.db[y][1]);
				temp1.push(this.props.db[y][2]);
			}
			for (let y = 0; y < this.selectedList.length; y++) {
				if (this.selectedList[y] === true) {
					temp1[y].title = ef.id;
				}
			}
			let temp = [];
			for (let y = 0; y < 9; y += 3) {

				temp.push([temp1[y], temp1[y + 1], temp1[y + 2]])
			}
			this.setState({x: temp})
		}

	};
	performExpiryChange = (ef) => {
		if (this.selectedList.includes(true)) {
			let temp1 = [];
			for (let y = 0; y < this.props.db.length; y++) {
				temp1.push(this.props.db[y][0]);
				temp1.push(this.props.db[y][1]);
				temp1.push(this.props.db[y][2]);
			}
			for (let y = 0; y < this.selectedList.length; y++) {
				if (this.selectedList[y] === true) {
					if (Number.isInteger(ef)) {
						temp1[y].expiry = ef.toString()
					} else {
						if (parseFloat(temp1[y].expiry)) {
							temp1[y].expiry = ef + " " + temp1[y].expiry;
						}
					}
				}
			}
			let temp = [];
			for (let y = 0; y < 9; y += 3) {

				temp.push([temp1[y], temp1[y + 1], temp1[y + 2]])
			}
			this.setState({x: temp})
		}

	};

	performWeightChange = (ef) => {
		if (this.selectedList.includes(true)) {
			let new_weight;

			if (ef.weight === "") {
				new_weight = null
			} else {
				new_weight = parseFloat(ef.weight);
				new_weight = new_weight.toString() + 'kg'
			}

			let temp1 = [];
			for (let y = 0; y < this.props.db.length; y++) {
				temp1.push(this.props.db[y][0]);
				temp1.push(this.props.db[y][1]);
				temp1.push(this.props.db[y][2]);
			}
			for (let y = 0; y < this.selectedList.length; y++) {
				if (this.selectedList[y] === true) {
					temp1[y].weight = new_weight;
				}
			}
			let temp = [];
			for (let y = 0; y < 9; y += 3) {

				temp.push([temp1[y], temp1[y + 1], temp1[y + 2]])
			}
			this.setState({x: temp})
		}

	};

	componentDidUpdate(prevProps, prevState) {


		if (typeof this.state.x !== 'undefined') {


			this.sendData()
		}
	}


	sendData = () => {
		let newArr = [];
		for (let loop = 0; loop < this.state.x.length; loop++) {
			newArr = newArr.concat(this.state.x[loop]);
		}
		this.props.parentCallback(newArr);
	};

	render() {


		return (<div>
				{/*style={{left: '50%', transform: 'translate(20%, 5%)'}}*/}

				{/*Here is the The box containing the Trays*/}

				<div style={{background: '#f4f4f4', padding: '20px', borderRadius: '20px'}}>
					{this.props.db.map(z => {
						return <CardDeck style={{padding: '20px'}}>

							{z.map(i => {
								return <TrayItem i={i} y={this.y} parentCallback={this.callbackFunction}/>

							})}
						</CardDeck>
					})}
				</div>

				{/*Here we have the bay functions*/}

				<div style={{paddingTop: '10px'}}>
					<Grommet theme={grommet}>
						<Container>
							<Row>
								<Col>
									<Box align="center" height="60px">
										<Button label="Select All" fill onClick={() => {
										}}/>
									</Box>
								</Col>
								<Col>
									<Box align="center" height="60px">
										<Button label="Copy" fill onClick={() => {
										}}/>
									</Box>
								</Col>
								<Col>
									<Box align="center" height="60px">
										<Button label="Paste" fill onClick={() => {
										}}/>
									</Box>
								</Col>
								<Col>
									<Box align="center" height="60px">
										<Button label="Move" fill onClick={() => {
										}}/>
									</Box>
								</Col>
								<Col>
									<Box align="center" height="60px">
										<Button label="Swap" fill onClick={() => {
										}}/>
									</Box>
								</Col>

								<Col>
									<Box align="center" style={{paddingTop: '10px'}}>
										<Button label="Undo" fill onClick={() => {
										}}/>
									</Box>
								</Col>
								<Col>
									<Box align="center" style={{paddingTop: '10px'}}>
										<Button label="Redo" fill onClick={() => {
										}}/>
									</Box>
								</Col>
							</Row>
						</Container>
					</Grommet>
				</div>

				{/*Here is the tabs on the bottom that allow tray attribute manipulation*/}
				<div>
					<Grommet theme={grommet}>
						<Tabs>
							<Tab title={<RichTabTitle icon={<Cafeteria color="#f44336"/>} label="Category"/>}>
								<Container>
									<CategoryButtons categories={this.categories}
									                 parentCallback={this.performCategoryChange}/>
								</Container>
							</Tab>
							<Tab title={<RichTabTitle icon={<Schedule color="#f44336"/>} label="Expiry"/>}>
								<Container>
									<Row style={{paddingTop: '10px'}}>
										<Col>
											<Box align="center">
												<Button label="January " fill onClick={() => {
													this.performExpiryChange("January")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="February" fill onClick={() => {
													this.performExpiryChange("February")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="March" fill onClick={() => {
													this.performExpiryChange("March")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="April" fill onClick={() => {
													this.performExpiryChange("April")
												}}/>
											</Box>
										</Col>
									</Row>
									<Row style={{paddingTop: '10px'}}>
										<Col>
											<Box align="center">
												<Button label="May " fill onClick={() => {
													this.performExpiryChange("May")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="June" fill onClick={() => {
													this.performExpiryChange("June")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="July" fill onClick={() => {
													this.performExpiryChange("July")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="August" fill onClick={() => {
													this.performExpiryChange("August")
												}}/>
											</Box>
										</Col>
									</Row>
									<Row style={{paddingTop: '10px'}}>
										<Col>
											<Box align="center">
												<Button label="September " fill onClick={() => {
													this.performExpiryChange("September")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="October" fill onClick={() => {
													this.performExpiryChange("October")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="November" fill onClick={() => {
													this.performExpiryChange("November")
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="December" fill onClick={() => {
													this.performExpiryChange("December")
												}}/>
											</Box>
										</Col>
									</Row>

									<Row style={{paddingTop: '10px'}}>
										<Col>
											<Box align="center">
												<Button label="2019" fill onClick={() => {
													this.performExpiryChange(2019)
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="2020" fill onClick={() => {
													this.performExpiryChange(2020)
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="2021" fill onClick={() => {
													this.performExpiryChange(2021)
												}}/>
											</Box>
										</Col>
										<Col>
											<Box align="center">
												<Button label="2022" fill onClick={() => {
													this.performExpiryChange(2022)
												}}/>
											</Box>
										</Col>
									</Row>
								</Container>
							</Tab>
							<Tab title={<RichTabTitle icon={<Calculator color="#f44336"/>} label="Weight"/>}>
								<Form
									onReset={event => console.log(event)}
									onSubmit={({value}) => this.performWeightChange(value)}
								>
									<FormField label="Weight" name="weight"/>
									<Box direction="row" justify="between" margin={{top: 'medium'}}>
										<Button type="submit" label="Update" primary/>
									</Box>
								</Form>
							</Tab>
						</Tabs>
					</Grommet>
				</div>

			</div>
		);
	}
}


export default BayView;