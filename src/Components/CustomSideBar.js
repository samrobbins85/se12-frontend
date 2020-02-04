import React, { Component } from 'react';
import {Button} from 'grommet';
import { Deploy, Services,Deliver,Analytics,User ,Home } from 'grommet-icons';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '../css/react-sidenav.css';



class CustomSideBar extends Component {
	state = {
		showSidebar: true,
	};
	render() {
		// const { showSidebar } = this.state;
		return (
			<SideNav
				onSelect={(selected) => {console.log(selected)}}>
				<SideNav.Toggle />
				<SideNav.Nav defaultSelected="home"href={"/"}>
					<NavItem eventKey="home">
						<NavIcon>
							<Button icon={<Home color = "#ffffff"/>} style={{ fontSize: '1.75em' }} href={"/"}/>
						</NavIcon>
						<NavText>
							Home
						</NavText>
					</NavItem>

					<NavItem eventKey="stock_take"href={"/st"}>
						<NavIcon>
							<Button icon={<Deploy color = "#ffffff"/>} style={{ fontSize: '1.75em' }} href={"/st"} />
						</NavIcon>
						<NavText>
							Stock Take
						</NavText>
					</NavItem>

					<NavItem eventKey="orders"href={"/or"}>
						<NavIcon>
							<Button icon={<Deliver color = "#ffffff"/>} style={{ fontSize: '1.75em' }} href={"/or"} />
						</NavIcon>
						<NavText>
							Orders
						</NavText>
					</NavItem>

					<NavItem eventKey="settings"href={"/dr"}>
						<NavIcon>
							<Button icon={<Services color = "#ffffff"/>} style={{ fontSize: '1.75em' }} href={"/dr"} />
						</NavIcon>
						<NavText>
							Settings
						</NavText>
					</NavItem>

					<NavItem eventKey="reports" >
						<NavIcon>
							<Button icon={<Analytics color = "#ffffff"/>} style={{ fontSize: '1.75em' }} href={'/rp'} />
						</NavIcon>
						<NavText href={'/rp'}>
							Reports
						</NavText>
					</NavItem>

					<NavItem eventKey="account">
						<NavIcon>
							<Button icon={<User color = "#ffffff"/>} style={{ fontSize: '1.75em' }} href={'/'} />
						</NavIcon>
						<NavText>
							My Account
						</NavText>
						<NavItem eventKey="Accoount_settings" >
							<NavText>
								Account Settings
							</NavText>
						</NavItem>
						<NavItem eventKey="Sign_out">
							<NavText>
								Sign Out
							</NavText>
						</NavItem>
					</NavItem>

				</SideNav.Nav>
			</SideNav>

		);
	}
}

export default CustomSideBar;
