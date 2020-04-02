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
        this.state = {selectAll: false};
        // this.props.db = this.props.db;
        console.log("The props received in BayView are: ", props);
        // this.props.db = props.db["RED-A"];

        this.y = new Date();
        this.y = this.y.getYear();
        this.selectedList = [];
        for (let loop = 0; loop < this.props.db.length; loop++) {
            this.selectedList.push(false)
        }
        // this.categories = ['Tinned Fruit', 'Tinned Beans', 'Tinned Soup', 'Tinned Sauce', 'Cereal', 'Pasta', 'Juice', 'Milk', 'Toiletries', 'Nappies', 'Feminine Products', 'Cleaning Products']
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.selectedList = [];
        for (let loop = 0; loop < nextProps.length; loop++) {
            this.selectedList.push(false)
        }
        console.log("componentWillReceiveProps says current props are: ", this.props)
        console.log("componentWillReceiveProps says new props are: ", nextProps)
    }

    callbackFunction = (childData) => {
        for (let loop = 0; loop < this.props.db.length; loop++) {
            if (this.props.db[loop]._id === childData.id) {
                this.selectedList[loop] = childData.selected
            }
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.prevstate = {x: prevProps.db};
    }

    performCategoryChange = (ef) => {
        console.log("desired category is:", ef)
        if (this.selectedList.includes(true)) {
            let temp1 = [];
            for (let y = 0; y < this.props.db.length; y++) {
                temp1.push(this.props.db[y]);
            }
            for (let y = 0; y < this.selectedList.length; y++) {
                if (this.selectedList[y] === true) {
                    temp1[y].contents = ef.id;
                }
            }
            this.sendData({x: temp1})
        }

    };
    performExpiryChange = (ef) => {
        if (this.selectedList.includes(true)) {
            let temp1 = [];
            for (let y = 0; y < this.props.db.length; y++) {
                temp1.push(this.props.db[y]);
            }
            for (let y = 0; y < this.selectedList.length; y++) {
                if (this.selectedList[y] === true) {

                    if (ef === "") {
                        temp1[y].expiry = ""
                    } else {
                        if (Number.isInteger(ef)) {
                            // this is the case that it is a year
                            temp1[y].expiry = ef.toString()
                        } else {
                            if (!temp1[y].expiry.includes("/")) {
                                temp1[y].expiry = ef + "/" + temp1[y].expiry;
                            }
                        }

                    }

                }
            }
            this.sendData({x: temp1})
        }

    };
    performWeightChange = (ef) => {
        if (this.selectedList.includes(true)) {
            let new_weight;

            if (ef.weight === "") {
                new_weight = 0
            } else {
                new_weight = parseFloat(ef.weight);
            }

            let temp1 = [];
            for (let y = 0; y < this.props.db.length; y++) {
                temp1.push(this.props.db[y]);
            }
            for (let y = 0; y < this.selectedList.length; y++) {
                if (this.selectedList[y] === true) {
                    temp1[y].weight = new_weight;
                }
            }
            this.sendData({x: temp1})
        }

    };

    sendData = (data) => {
        // console.log("fuck react up the ass", { x:this.props.db})

        this.props.parentCallback("update", {target: {zone: data.x[0].zone, bay: data.x[0].bay}, newstate: data.x});
    };

    render() {


        return (<div>

                {/*Here is the The box containing the Trays*/}

                <div style={{background: '#f4f4f4', padding: '20px', borderRadius: '20px'}}>
                    <CardDeck style={{paddingTop: '20px'}}>
                        {this.props.db.map((z, loop) => {
                            return <TrayItem i={z} y={this.y} parentCallback={this.callbackFunction}
                                             selected={this.selectedList[loop]}
                                             width={30 / this.props.dimensons.xSize}/>
                        })}
                    </CardDeck>
                </div>

                {/*Here we have the bay functions*/}

                <div style={{paddingTop: '10px'}}>
                    <Grommet theme={grommet}>
                        <Container>
                            <Row>
                                <Col>
                                    <Box align="center" style={{paddingTop: '10px'}}>
                                        <Button label="Select All" fill onClick={() => {

                                            for (let loop = 0; loop < this.props.db.length; loop++) {
                                                this.selectedList[loop] = !this.state.selectAll
                                            }
                                            this.setState({selectAll: !this.state.selectAll})

                                        }}/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box align="center" style={{paddingTop: '10px'}}>
                                        <Button label="Swap" fill onClick={() => {

                                            let loc = [];
                                            this.selectedList.forEach((loop, ind) => {
                                                if (loop === true) {
                                                    loc.push(ind)
                                                }
                                            });
                                            if (loc.length === 2) {
                                                let temp = [];
                                                for (let y = 0; y < this.props.db.length; y++) {
                                                    temp.push(this.props.db[y]);
                                                }
                                                let cpy0 = temp[loc[0]], cpy1 = temp[loc[1]];
                                                temp[loc[0]] = cpy1;
                                                temp[loc[1]] = cpy0;
                                                temp[loc[0]].tray = cpy0.tray;
                                                temp[loc[1]].tray = cpy1.tray;

                                                this.sendData({x: temp})
                                            } else {
                                                alert("You can only swap TWO trays within the same bay.")
                                            }

                                        }}/>
                                    </Box>
                                </Col>

                                <Col>
                                    <Box align="center" style={{paddingTop: '10px'}}>
                                        <Button label="Undo" fill onClick={() => {
                                            this.props.parentCallback("undo", {})
                                        }}/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box align="center" style={{paddingTop: '10px'}}>
                                        <Button label="Redo" fill onClick={() => {
                                            this.props.parentCallback("redo", {})
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
                                    <CategoryButtons categories={this.props.categories}
                                                     parentCallback={this.performCategoryChange}/>
                                </Container>
                                <Form
                                    onReset={event => console.log(event)}
                                    onSubmit={({value}) => this.performCategoryChange(value)}>
                                    <FormField label="Custom Category" name="id"/>
                                    <Box direction="row" justify="between" margin={{top: 'medium'}}>
                                        <Button type="submit" label="Set" primary/>
                                    </Box>
                                </Form>
                            </Tab>
                            <Tab title={<RichTabTitle icon={<Schedule color="#f44336"/>} label="Expiry"/>}>
                                <Container>
                                    <Row style={{paddingTop: '10px'}}>
                                        <Col>
                                            <Box align="center">
                                                <Button label="None" fill onClick={() => {
                                                    this.performExpiryChange("")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="01 January" fill onClick={() => {
                                                    this.performExpiryChange("01")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="02 February" fill onClick={() => {
                                                    this.performExpiryChange("02")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="03 March" fill onClick={() => {
                                                    this.performExpiryChange("03")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="04 April" fill onClick={() => {
                                                    this.performExpiryChange("04")
                                                }}/>
                                            </Box>
                                        </Col>
                                    </Row>
                                    <Row style={{paddingTop: '10px'}}>
                                        <Col>
                                            <Box align="center">
                                                <Button label="05 May" fill onClick={() => {
                                                    this.performExpiryChange("05")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="06 June" fill onClick={() => {
                                                    this.performExpiryChange("06")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="07 July" fill onClick={() => {
                                                    this.performExpiryChange("07")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="08 August" fill onClick={() => {
                                                    this.performExpiryChange("08")
                                                }}/>
                                            </Box>
                                        </Col>
                                    </Row>
                                    <Row style={{paddingTop: '10px'}}>
                                        <Col>
                                            <Box align="center">
                                                <Button label="09 September" fill onClick={() => {
                                                    this.performExpiryChange("09")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="10 October" fill onClick={() => {
                                                    this.performExpiryChange("10")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="11 November" fill onClick={() => {
                                                    this.performExpiryChange("11")
                                                }}/>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box align="center">
                                                <Button label="12 December" fill onClick={() => {
                                                    this.performExpiryChange("12")
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
                                <Col>
                                    <Box align="center">
                                        <Button label="None" fill onClick={() => {
                                            this.performWeightChange(0)
                                        }}/>
                                    </Box>
                                </Col>
                                <Form
                                    onReset={event => console.log(event)}
                                    onSubmit={({value}) => this.performWeightChange(value)}>
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