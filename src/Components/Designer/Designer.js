import React, {Component} from 'react';
import {Accordion, AccordionPanel, Box, Grommet, Meter, Select, Stack, Text} from "grommet/es6";
import {Alert, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {SettingsOption, Add, Trash, DocumentExcel} from "grommet-icons";
import {grommet} from "grommet/themes";



class Designer extends Component {
	constructor(props){
		super(props);
		this.state = {warehouse:[
									{   name:'Zone A',
										Bays:[
											[{id:'A1', dimension:{width:3,height:3}},{id:'A2', dimension:{width:3,height:3}},{id:'A3', dimension:{width:3,height:3}},{id:'A4', dimension:{width:3,height:3}},{id:'A5', dimension:{width:3,height:3}}],
											[{id:'B1', dimension:{width:3,height:3}},{id:'B2', dimension:{width:3,height:3}},{id:'B3', dimension:{width:3,height:3}},{id:'B4', dimension:{width:3,height:3}},{id:'B5', dimension:{width:3,height:3}}],
											[{id:'C1', dimension:{width:3,height:3}},{id:'C2', dimension:{width:3,height:3}},{id:'C3', dimension:{width:3,height:3}},{id:'C4', dimension:{width:3,height:3}},{id:'C5', dimension:{width:3,height:3}}],
											[{id:'D1', dimension:{width:3,height:3}},{id:'D2', dimension:{width:3,height:3}},{id:'D3', dimension:{width:3,height:3}},{id:'D4', dimension:{width:3,height:3}},{id:'D5', dimension:{width:3,height:3}}],

											]
									},
									{   name:'Zone B',
										Bays:[
											[{id:'A1', dimension:{width:3,height:3}},{id:'A2', dimension:{width:3,height:3}},{id:'A3', dimension:{width:3,height:3}},{id:'A4', dimension:{width:3,height:3}},{id:'A5', dimension:{width:3,height:3}}],
											[{id:'B1', dimension:{width:3,height:3}},{id:'B2', dimension:{width:3,height:3}},{id:'B3', dimension:{width:3,height:3}},{id:'B4', dimension:{width:3,height:3}},{id:'B5', dimension:{width:3,height:3}}],
											[{id:'C1', dimension:{width:3,height:3}},{id:'C2', dimension:{width:3,height:3}},{id:'C3', dimension:{width:3,height:3}},{id:'C4', dimension:{width:3,height:3}},{id:'C5', dimension:{width:3,height:3}}],
											[{id:'D1', dimension:{width:3,height:3}},{id:'D2', dimension:{width:3,height:3}},{id:'D3', dimension:{width:3,height:3}},{id:'D4', dimension:{width:3,height:3}},{id:'D5', dimension:{width:3,height:3}}],
										]
									},
				{   name:'Zone C',
					Bays:[
						[{id:'A1', dimension:{width:3,height:3}},{id:'A2', dimension:{width:3,height:3}},{id:'A3', dimension:{width:3,height:3}},{id:'A4', dimension:{width:3,height:3}},{id:'A5', dimension:{width:3,height:3}}],
						[{id:'B1', dimension:{width:3,height:3}},{id:'B2', dimension:{width:3,height:3}},{id:'B3', dimension:{width:3,height:3}},{id:'B4', dimension:{width:3,height:3}},{id:'B5', dimension:{width:3,height:3}}],
						[{id:'C1', dimension:{width:3,height:3}},{id:'C2', dimension:{width:3,height:3}},{id:'C3', dimension:{width:3,height:3}},{id:'C4', dimension:{width:3,height:3}},{id:'C5', dimension:{width:3,height:3}}],
						[{id:'D1', dimension:{width:3,height:3}},{id:'D2', dimension:{width:3,height:3}},{id:'D3', dimension:{width:3,height:3}},{id:'D4', dimension:{width:3,height:3}},{id:'D5', dimension:{width:3,height:3}}],
					]
				},
				{   name:'Zone D',
					Bays:[
						[{id:'A1', dimension:{width:3,height:3}},{id:'A2', dimension:{width:3,height:3}},{id:'A3', dimension:{width:3,height:3}},{id:'A4', dimension:{width:3,height:3}},{id:'A5', dimension:{width:3,height:3}}],
						[{id:'B1', dimension:{width:3,height:3}},{id:'B2', dimension:{width:3,height:3}},{id:'B3', dimension:{width:3,height:3}},{id:'B4', dimension:{width:3,height:3}},{id:'B5', dimension:{width:3,height:3}}],
						[{id:'C1', dimension:{width:3,height:3}},{id:'C2', dimension:{width:3,height:3}},{id:'C3', dimension:{width:3,height:3}},{id:'C4', dimension:{width:3,height:3}},{id:'C5', dimension:{width:3,height:3}}],
						[{id:'D1', dimension:{width:3,height:3}},{id:'D2', dimension:{width:3,height:3}},{id:'D3', dimension:{width:3,height:3}},{id:'D4', dimension:{width:3,height:3}},{id:'D5', dimension:{width:3,height:3}}],
					]
				}
					]}
	}
	render() {
		return (
			<Container>
				<Row>
					<Col md={9}>
			<div>
				<p style={{color:'#ffffff'}}>sduasgfhrsilfgho9shdigjiehtodfpugjdouirfud\o;sflhdiofghsdlnfkhzdvbsdliubflakhsdbfiuldfbguibdiubg</p>
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


				{this.state.warehouse.map(i =>{
					return <AccordionPanel label={i.name}>
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
							{i.Bays.map(z=>{
								return z.map(a=>{

									return <Accordion>
											<AccordionPanel label={'Bay: '+a.id}>
										<Box pad="medium" background="light-2">
											<text>{a.dimension.height}  trays high and {a.dimension.width} trays wide:</text>
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