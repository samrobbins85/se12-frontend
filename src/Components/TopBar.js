import React, { Component } from 'react';
import {Box, Heading} from 'grommet';


const AppBar = (props) => (
	<Box
		tag='header'
		direction='row'
		align='center'
		justify='between'
		background='brand'
		pad={{ left: 'medium', right: 'small', vertical: 'small' }}
		elevation='medium'
		style={{ zIndex: '1' }}
		{...props}
	/>
);

class TopBar extends Component {

	render() {
		return(
			<AppBar>
				<Heading level='3' margin='none'></Heading>
				<Heading level='3' margin='none'>Shelfie V2.0</Heading>
			</AppBar>
		)
	}
}

export default TopBar;