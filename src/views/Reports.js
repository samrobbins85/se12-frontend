import React, {Component} from 'react';
import {Alert, Col, Container, Jumbotron, Row, Table, Button} from "react-bootstrap";
import {Accordion, AccordionPanel, Box, Select, Meter, Stack, Text, Grommet, Menu} from "grommet/es6";
import {DocumentExcel} from "grommet-icons";
import {grommet} from "grommet/themes";
import index from "styled-components/dist/styled-components-macro.esm";
import Loading from "../components/Loading";
import {CSVLink} from "react-csv"

var currentdate = new Date();

function zoneWeight(allTrayData, zones, bays) {

    let weights = {}

    for (let zoneKeys in bays) {
        if (zoneKeys !== undefined) {
            weights[zoneKeys] = 0
            for (let bayKey in bays[zoneKeys]) {
                if (bayKey !== undefined) {
                    weights[zoneKeys + "-" + bayKey] = 0

                }
            }

        }
    }

    allTrayData.forEach((dbKey) => {
        dbKey.trays.forEach((trayWeight) => {
            weights[trayWeight.zone] += trayWeight.weight
            weights[trayWeight.zone + "-" + trayWeight.bay] += trayWeight.weight
        })


    })
    console.log("recorded weights are:", weights)
    return weights

}

function findAllCategories(db) {
    let cats = ["None"]
    let totalTrays = {totalEmpty: 0, total: 0}
    db.forEach((loop) => {
        loop.trays.forEach((loop1) => {
            totalTrays.total++
            if (loop1.contents === "EMPTY") {
                totalTrays.totalEmpty++
            }
            if (!cats.includes(loop1.contents)) {
                cats.push(loop1.contents)
            }
        })
    });
    return [cats, totalTrays]
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
        this.displayedCategory = "None"
        this.state = {selectedPrevReport: 0}
    }

    fetchDB(query) {
        if (query === "None") {
            this.setState({db: this.fullDB})
        } else {
            this.displayedCategory = query
            console.log("searching for: ", query)
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
                body: JSON.stringify({'contents': {'contents': query}})

            })
                .then(res => res.json())
                .then((data) => {
                    // console.log(data)
                    data.trays.forEach((tray) => {

                        temp[tray.zone + "-" + tray.bay].push(tray)

                    })
                    console.log("I built this ", temp)
                    console.log("should look like this", this.state.db)
                    this.setState({db: temp})
                })

        }


    }

    componentDidMount() {
        let fuckReact;

        fetch('http://127.0.0.1:3001/stockTake/getReports', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((previousReports) => {
                this.prevReports = previousReports.reports;

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
                        for (let zone = 0; zone < data.zones.length; zone++) {
                            querys1.push({"zone": data.zones[zone].zone});
                            for (let bay = 0; bay < data.zones[zone].bays.length; bay++) {
                                querys.push({"zone": data.zones[zone].zone, "bay": data.zones[zone].bays[bay]});
                            }
                        }

                        let sevedQuerys = [];
                        querys.forEach(
                            (my_query) => {
                                sevedQuerys.push(getTraysInBay(my_query))
                            });
                        Promise.all(sevedQuerys).then((allTrayData) => {

                            let fml = {}
                            for (let loop = 0; loop < allTrayData.length; loop++) {
                                if (allTrayData[loop].trays.length > 0) {
                                    fml[allTrayData[loop].trays[0].zone + "-" + allTrayData[loop].trays[0].bay] = allTrayData[loop].trays
                                }
                            }
                            let sevedQuerys1 = [];
                            querys1.forEach(
                                (my_query) => {
                                    sevedQuerys1.push(getBaysInZone(my_query))
                                });
                            Promise.all(sevedQuerys1).then((allBayData) => {
                                let x = {};
                                allBayData.forEach((aLoop) => {
                                    let temp = aLoop.bays;
                                    let temp1 = {};
                                    temp.forEach((loop) => {
                                        temp1[loop.bay] = {
                                            xVal: loop.xVal,
                                            yVal: loop.yVal,
                                            xSize: loop.xSize,
                                            ySize: loop.ySize
                                        }
                                    });
                                    x[aLoop.bays[0].zone] = temp1
                                });
                                this.loading = false;
                                this.allTrayData = allTrayData
                                let IHATEREACT = findAllCategories(allTrayData);
                                this.categories = IHATEREACT[0]
                                this.totalEmpty = IHATEREACT[1]
                                this.zoneWeights = zoneWeight(allTrayData, fuckReact.zones, x);
                                this.fullDB = fml
                                this.downloadDB()
                                this.setState({bays: x, zones: fuckReact.zones, db: fml})
                            })
                        })
                    })
            })
    }

    downloadDB() {

        let temp = []
        this.allTrayData.forEach((item) => {
            temp = temp.concat(item.trays)
        })
        this.csvData = temp

    }

    publishReport() {
        let requestBody = {
            date: currentdate.toString(),
            snapshot: this.csvData
        };

        fetch('http://127.0.0.1:3001/stockTake/publishReport', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then((resp) => resp.json())
            .then((data) => {
                Alert("The report has successfully been saved")
            })

    }


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

                                <Row>
                                    <Col>
                                        <Alert variant={'info'} style={{alignContent: 'left'}}>
                                            <Row>
                                                <Col>
                                                    <h3>Filter by</h3>
                                                </Col>
                                                <Col>
                                                    <Menu
                                                        label={this.displayedCategory}
                                                        items={this.categories.map((z) => {
                                                            return {
                                                                label: z, onClick: () => {

                                                                    this.fetchDB(z)

                                                                }
                                                            }
                                                        })}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                Show only trays with the selected category, or select None to show all
                                                trays.
                                            </Row>
                                        </Alert>
                                    </Col>
                                    <Col>

                                        <Alert variant={'success'} style={{alignContent: 'left'}}>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <h3>
                                                            Export to CSV
                                                        </h3>
                                                    </Row>
                                                </Col>


                                                <Col>

                                                    <CSVLink data={this.csvData}
                                                             filename={`Report_${currentdate.toString()}.csv`}
                                                             headers={['contents', 'expiry', 'weight', 'zone', 'bay']}>
                                                        <Button variant="outline-success">
                                                            <DocumentExcel color="#000066"/> Export
                                                        </Button>
                                                    </CSVLink>

                                                </Col>


                                            </Row>
                                            <Row>
                                                This will download the full database as of right now a CSV file
                                            </Row>
                                        </Alert>

                                    </Col>
                                </Row>
                                <Box fill='horizontal'>
                                    {this.state.zones.map((zone, zoneIndex) => {

                                        return <Accordion multiple={true}>
                                            <AccordionPanel label={"Zone: " + zone.zone}>
                                                <Alert variant={'warning'} style={{alignContent: 'left'}}>
                                                    <Row><Col> {zone.bays.length} Bays </Col> Total
                                                        weight: {this.zoneWeights[zone.zone]} kg </Row></Alert>

                                                {zone.bays.map((bay) => {

                                                    console.log()
                                                    if (this.state.db[zone.zone + "-" + bay] !== undefined) {


                                                        if (this.state.db[zone.zone + "-" + bay].length === 0) {
                                                            return
                                                        }
                                                    } else {
                                                        return
                                                    }

                                                    return <Accordion>
                                                        <AccordionPanel label={"Bay: " + bay} pad={'medium'}>
                                                            <Alert variant={'info'} style={{
                                                                paddingTop: "5px",
                                                                alignContent: 'left'
                                                            }}><Row>
                                                                <Col>{this.state.db[zone.zone + "-" + bay].length}
                                                                    Trays</Col> Total
                                                                weight: {this.zoneWeights[zone.zone + "-" + bay]} kg
                                                            </Row>
                                                            </Alert>
                                                            {this.state.db[zone.zone + "-" + bay].map((tray) => {

                                                                return <Box pad="large" background="light-2">
                                                                    <Text style={{alignContent: "Left"}}>
                                                                        {tray.contents}
                                                                    </Text>
                                                                    <Text style={{alignContent: "Centre"}}>
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
                                </Box>


                            </div>
                        </Col>
                        <Col md={3}>
                            <li style={{color: '#ffffff'}}>Hello World</li>

                            <li style={{color: '#ffffff'}}>Hello World</li>
                            <Alert variant={'success'} style={{alignContent: 'left'}}>
                                <Row>
                                    <Col>
                                        <Row>
                                            <h3>
                                                Publish Report
                                            </h3>
                                        </Row>

                                    </Col>
                                    <Button variant="outline-success" onClick={() => {
                                        this.publishReport()
                                    }}>
                                        Publish
                                    </Button>

                                </Row>
                                <Row>
                                    This will save this report in our database to be accessed later.
                                </Row>
                            </Alert>

                            <Alert variant={'info'} style={{alignContent: 'left'}}>
                                <Row>
                                    <Col>
                                        <Row>
                                            <h3>
                                                Export an old report
                                            </h3>
                                        </Row>

                                    </Col>
                                    <Col>
                                        <Row>

                                            <Menu
                                                label={this.prevReports[this.state.selectedPrevReport].date}
                                                items={this.prevReports.map((z, index) => {
                                                    return {
                                                        label: z.date, onClick: () => {

                                                            // this.selectedPrevReport = index
                                                            this.setState({selectedPrevReport: index})

                                                        }
                                                    }
                                                })}
                                            />


                                        </Row>
                                        <Row>
                                            <CSVLink data={this.prevReports[this.state.selectedPrevReport].snapshot}
                                                     filename={`Duplicate_report${this.prevReports[this.state.selectedPrevReport].date}`}>
                                                <Button variant="outline-success">
                                                    <DocumentExcel color="#000066"/> Download
                                                </Button>
                                            </CSVLink>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    You will be downloading the selected old prior report in a csv file format.
                                </Row>
                            </Alert>

                            <Grommet theme={grommet}>
                                <Box align="center" pad="large">
                                    <Stack anchor="center">
                                        <Meter
                                            type="circle"
                                            background="light-4"
                                            values={[{value: ((this.totalEmpty.total - this.totalEmpty.totalEmpty) / this.totalEmpty.total) * 100}]}
                                            size="small"
                                            thickness="medium"
                                        />
                                        <Box direction="row" align="center" pad={{bottom: "medium"}}>
                                            <Text size="xlarge" weight="bold">
                                                {(() => {
                                                    console.log(this.totalEmpty)
                                                })()}
                                                {(((this.totalEmpty.total - this.totalEmpty.totalEmpty) / this.totalEmpty.total) * 100).toString().slice(0, 4)}
                                            </Text>
                                            <Text size="small">% </Text>
                                        </Box>
                                    </Stack> <Text weight="bold" size="small" style={{textAlign: '-webkit-center'}}>Trays
                                    occupied spaces </Text>
                                </Box></Grommet>


                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Reports;