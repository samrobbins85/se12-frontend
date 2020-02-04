import React, {Component} from 'react';
import {AccordionPanel, Box, Accordion, Text, Stack, Meter, Grommet} from "grommet";
import {Alert, Col, Container, Jumbotron, Row} from "react-bootstrap";
import {DocumentExcel, MailOption} from "grommet-icons";
import {grommet} from "grommet/themes";
class Orders extends Component {
	render() {
		return (
			<Container>
				<Row>
					<Col md={9}>
			<div>
				<li style={{color:'#ffffff'}}>there will be a list of alerts stating the order location, the date placed and a pdf button to download the order sheet (all rendered on the client side)</li>

				<Jumbotron >
					<Container>
						<h1>Orders</h1>
						<p>
							Here you will find Orders placed by your various sites on their own portal.
						</p>
					</Container>
				</Jumbotron>
				<Accordion>
					<AccordionPanel label="Bishop Auckland">
						<Alert  variant={'warning'} style={{alignContent:'left'}}>
							<Row>
								<Col>
									<DocumentExcel color = "#000066"/>
								</Col>

								Download All Orders from this site

							</Row>
						</Alert>
						<Accordion>

							<AccordionPanel label="Tuesday 28/01/2020 09:23" pad={'medium'}  >
								<Alert  variant={'info'} style={{alignContent:'left'}}>
									<Row>
										<Col>
											<DocumentExcel color = "#000066"/>
										</Col>

										Download This Order

									</Row>
								</Alert>
								<Box pad="large" background="light-2">
									<Text>10 Tins Beans</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Tins Soup</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>15 Tins Fruit</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Cases Milk</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Cases Juice</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>15 Boxes Nappiea</Text>
								</Box>
							</AccordionPanel>
							<AccordionPanel label="Tuesday 21/01/2020 14:43" pad={'medium'}>
								<Alert  variant={'info'} style={{alignContent:'left'}}>
									<Row>
										<Col>
											<DocumentExcel color = "#000066"/>
										</Col>

										Download This Order

									</Row>
								</Alert>
								<Box pad="large" background="light-2">
									<Text>10 Tins Beans</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Tins Soup</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>15 Tins Fruit</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Cases Milk</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Cases Juice</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>15 Boxes Nappiea</Text>
								</Box>
							</AccordionPanel>
							<AccordionPanel label="Tuesday 14/01/2020 08:25" pad={'medium'}>
								<Alert  variant={'info'} style={{alignContent:'left'}}>
									<Row>
										<Col>
											<DocumentExcel color = "#000066"/>
										</Col>

										Download This Order

									</Row>
								</Alert>
								<Box pad="large" background="light-2">
									<Text>10 Tins Beans</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Tins Soup</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>15 Tins Fruit</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Cases Milk</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Cases Juice</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>15 Boxes Nappiea</Text>
								</Box>
							</AccordionPanel>
							<AccordionPanel label="Tuesday 07/01/2020 12:54" pad={'medium'}>
								<Alert  variant={'info'} style={{alignContent:'left'}}>
									<Row>
										<Col>
											<DocumentExcel color = "#000066"/>
										</Col>

										Download This Order

									</Row>
								</Alert>
								<Box pad="large" background="light-2">
									<Text>10 Tins Beans</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Tins Soup</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>15 Tins Fruit</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Cases Milk</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>10 Cases Juice</Text>
								</Box>
								<Box pad="large" background="light-2">
									<Text>15 Boxes Nappiea</Text>
								</Box>
							</AccordionPanel>
						</Accordion>

					</AccordionPanel>
					<AccordionPanel label="Consett">
					</AccordionPanel>
					<AccordionPanel label="Aykley Heads">
					</AccordionPanel>
					<AccordionPanel label="Moorepeth">
					</AccordionPanel>
					<AccordionPanel label="Langley Moor">
					</AccordionPanel>
					<AccordionPanel label="Spenymoor">
					</AccordionPanel>
					<AccordionPanel label="Ferry hill">
					</AccordionPanel>
					<AccordionPanel label="Brancepeth">
					</AccordionPanel>
					<AccordionPanel label="Sherburn">
					</AccordionPanel>
					<AccordionPanel label="Shincliffe">
					</AccordionPanel>
					<AccordionPanel label="Coxhoe">
					</AccordionPanel>
					<AccordionPanel label="Newton Ayecliffe">
					</AccordionPanel>
					<AccordionPanel label="Washington">
					</AccordionPanel>
					<AccordionPanel label="Sunderland">
					</AccordionPanel>
					<AccordionPanel label="Mordon">
					</AccordionPanel>
					<AccordionPanel label="Chester-le-Street">
					</AccordionPanel>
					<AccordionPanel label="Gateshead">
					</AccordionPanel>
					<AccordionPanel label="South Shields">
					</AccordionPanel>
					<AccordionPanel label="Murton">
					</AccordionPanel>
					<AccordionPanel label="Peterlee">
					</AccordionPanel>
				</Accordion>

			</div>
					</Col>
					<Col md={3}>
						<li style={{color:'#ffffff'}}>Hello World </li>

						<li style={{color:'#ffffff'}}>Hello World </li>
						<Alert  variant={'success'} style={{alignContent:'left'}}>
							<Row>
								<Col>
									<DocumentExcel color = "#000066"/>
								</Col>

								Download Most recent Orders from all Sites

							</Row>
						</Alert>
						<Alert  variant={'danger'} style={{alignContent:'left'}}>
							<Row>
								<Col>
									<DocumentExcel color = "#000066"/>
								</Col>

								Download All Previous Orders From all Sites

							</Row>
						</Alert>
						<Grommet theme={grommet}>
							<Box align="center" pad="large">
								<Stack anchor="center">
									<Meter
										type="circle"
										background="light-4"
										values={[{ value: 100 }]}
										size="small"
										thickness="medium"
									/>
									<Box direction="row" align="center" pad={{ bottom: "medium" }}>
										<Text size="xlarge" weight="bold">
											{100}
										</Text>
										<Text size="small">% </Text>
									</Box>
								</Stack>  <Text  weight="bold" size="small" style={{textAlign:'-webkit-center'}}>Of Orders have been received For this Rotation </Text>
							</Box></Grommet>

					</Col>
					<Col>

					</Col>
				</Row>
			</Container>
		);
	}
}

export default Orders;