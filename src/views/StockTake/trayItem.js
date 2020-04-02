import React, {Component} from 'react';
import {Badge, Card} from "react-bootstrap";

class TrayItem extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: this.props.selected};
        this.handleClick = this.handleClick.bind(this);

    }


    componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState) {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({selected: nextProps.selected})
    }

    componentWillUnmount() {

    }

    handleClick = () => {
        if (this.state.selected === false) {
            this.setState({selected: true});
        } else {
            this.setState({selected: false});
        }
        this.sendData()
        // this.onChange(this.state.selected);

    };

    sendData = () => {
        this.props.parentCallback({id: this.props.i._id, selected: !this.state.selected});
    };

    render() {

        return (
            // <div style={this.state.selected === true ? {borderRadius:'10px',borderStyle: 'solid', borderColor:'#2196f3'}:{}}>
            <div style={{padding: "5px"}}>
                <Card onClick={this.handleClick} style={{width: `${this.props.width}rem`, overflow: "auto"}}
                      border={this.state.selected === true ? "primary" : "light"}>

                    <Card.Header>{this.props.i.contents}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Weight:
                            <div><Badge
                                variant="light"> {this.props.i.weight == null ? 'N/A' : this.props.i.weight} kg</Badge>
                            </div>
                            Expires:
                            <div><Badge
                                variant={(parseInt(this.props.i.expiry.split("/").length > 1 ? this.props.i.expiry.split("/")[1] : this.props.i.expiry.split("/")[0]) > 2021 ? "success" : (parseInt(this.props.i.expiry.split("/").length > 1 ? this.props.i.expiry.split("/")[1] : this.props.i.expiry.split("/")[0]) < 2021 ? "danger" : "warning"))}>  {this.props.i.expiry}</Badge>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}

TrayItem.propTypes = {};

export default TrayItem;