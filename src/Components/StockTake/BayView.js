import React, {Component} from 'react';
import { CardDeck,Row,Col,Container} from "react-bootstrap";
import TrayItem from "./trayItem.js";
import CategoryButtons from'./CategoryButtons.js';

import {Box, FormField, Grommet, Tab, Tabs, Text, Form, Button} from "grommet";
import {grommet} from "grommet/themes";
import {Calculator,Schedule , Cafeteria} from "grommet-icons";


const RichTabTitle = ({ icon, label }) => (
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
		this.db = [[{id:1,title:'Tinned Apples', expiry:'2020',weight:'2000kg'},{id:2,title:'Tinned Apples', expiry:'2021',weight:'2000kg'},{id:3,title:'Tinned Apples', expiry:'2020',weight:null}],[{id:4,title:'Tinned Apples', expiry:'2020',weight:'2000kg'},{id:5,title:'Tinned Apples', expiry:'2021',weight:'2000kg'},{id:6,title:'Tinned Apples', expiry:'2020',weight:null}],[{id:7,title:'Tinned Apples', expiry:'2020',weight:'2000kg'},{id:8,title:'Tinned Apples', expiry:'2020',weight:'2000kg'},{id:9,title:'Tinned Apples', expiry:'2021',weight:null}]]
		this.y = new Date();
		this.y = this.y.getYear();
		this.selectedList =  [false,false,false,false,false,false,false,false,false]
		this.categories = ['Tinned Fruit', 'Tinned Beans', 'Tinned Soup', 'Tinned Sauce', 'Cereal', 'Pasta', 'Juice', 'Milk', 'Toiletries', 'Nappies', 'Feminine Products', 'Cleaning Products']
	}

	callbackFunction = (childData) => {
		this.selectedList[childData.id -1] = childData.selected;
	};

	performCategoryChange = (ef) =>{

		let temp1= [];
		for(let y = 0;y < this.db.length; y++){
			temp1.push(this.db[y][0]);
			temp1.push(this.db[y][1]);
			temp1.push(this.db[y][2]);
		}
		for(let y = 0; y < this.selectedList.length; y++ ){
			if(this.selectedList[y] === true){
				temp1[y].title = ef.id;
			}
		}
		let temp = [];
		for(let y = 0; y < 9; y+=3 ) {

			temp.push([temp1[y],temp1[y+1],temp1[y+2]])
		}
		this.setState({x:temp})

	};
	performExpiryChange = (ef) =>{

		let temp1= [];
		for(let y = 0;y < this.db.length; y++){
			temp1.push(this.db[y][0]);
			temp1.push(this.db[y][1]);
			temp1.push(this.db[y][2]);
		}
		for(let y = 0; y < this.selectedList.length; y++ ){
			if(this.selectedList[y] === true){
				if (Number.isInteger(ef)){
					temp1[y].expiry = ef.toString()
				}else{
					if (parseFloat(temp1[y].expiry)){
						temp1[y].expiry =  ef +" "+temp1[y].expiry;
					}
				}
			}
		}
		let temp = [];
		for(let y = 0; y < 9; y+=3 ) {

			temp.push([temp1[y],temp1[y+1],temp1[y+2]])
		}
		this.setState({x:temp})

	};

	performWeightChange = (ef) =>{

		let new_weight;

		if(ef.weight === ""){
			new_weight = null
		}else{
			new_weight = parseFloat(ef.weight);
			new_weight = new_weight.toString()+'kg'
		}

		let temp1= [];
		for(let y = 0;y < this.db.length; y++){
			temp1.push(this.db[y][0]);
			temp1.push(this.db[y][1]);
			temp1.push(this.db[y][2]);
		}
		for(let y = 0; y < this.selectedList.length; y++ ){
			if(this.selectedList[y] === true){
				temp1[y].weight =  new_weight;
			}
		}
		let temp = [];
		for(let y = 0; y < 9; y+=3 ) {

			temp.push([temp1[y],temp1[y+1],temp1[y+2]])
		}
		this.setState({x:temp})

	};



	render() {


		return (<div style={{

				left: '50%',
				transform: 'translate(20%, 5%)'}}>
			<div style={{background:'#f4f4f4',padding:'20px',borderRadius:'20px' }}>
				{this.db.map(z => {
					return <CardDeck style={{padding:'20px'}}>

						{z.map(i => {
							return <TrayItem i ={i} y ={this.y} parentCallback = {this.callbackFunction}/>

						})}
						</CardDeck>
				})}
			</div>
				<div>
				<Grommet theme={grommet}>
					<Tabs>
						<Tab title={<RichTabTitle icon={<Cafeteria color = "#f44336"/>} label="Category" />}>
							<Container>
								<CategoryButtons categories={this.categories} parentCallback = {this.performCategoryChange}/>
							</Container>
						</Tab>
						<Tab title={<RichTabTitle icon={<Schedule color = "#f44336"/>} label="Expiry" />}>
							<Container>
								<Row style={{paddingTop: '10px'}}>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="January " fill onClick={() => {this.performExpiryChange("January")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="February" fill onClick={() => {this.performExpiryChange("February")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="March" fill onClick={() => {this.performExpiryChange("March")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="April" fill onClick={() => {this.performExpiryChange("April")}} />
										</Box>
									</Col>
								</Row>
								<Row style={{paddingTop: '10px'}}>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="May " fill onClick={() => {this.performExpiryChange("May")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="June" fill onClick={() => {this.performExpiryChange("June")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="July" fill onClick={() => {this.performExpiryChange("July")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="August" fill onClick={() => {this.performExpiryChange("August")}} />
										</Box>
									</Col>
								</Row>
								<Row style={{paddingTop: '10px'}}>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="September " fill onClick={() => {this.performExpiryChange("September")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="October" fill onClick={() => {this.performExpiryChange("October")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="November" fill onClick={() => {this.performExpiryChange("November")}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="December" fill onClick={() => {this.performExpiryChange("December")}} />
										</Box>
									</Col>
								</Row>

								<Row style={{paddingTop: '10px'}}>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="2019" fill onClick={() => {this.performExpiryChange(2019)}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="2020" fill onClick={() => {this.performExpiryChange(2020)}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="2021" fill onClick={() => {this.performExpiryChange(2021)}} />
										</Box>
									</Col>
									<Col>
										<Box align="center" height="60px" width="130px">
											<Button label="2022" fill onClick={() => {this.performExpiryChange(2022)}} />
										</Box>
									</Col>
								</Row>
							</Container>
						</Tab>
						<Tab title={<RichTabTitle icon={<Calculator color = "#f44336"/>} label="Weight" />}>
							<Form
								onReset={event => console.log(event)}
								   onSubmit={({ value }) => this.performWeightChange(value)}
							>
							<FormField label="Weight" name="weight"  />
							<Box direction="row" justify="between" margin={{ top: 'medium' }}>
								<Button type="submit" label="Update" primary />
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