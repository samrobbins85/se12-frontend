import React, {Component, useState} from 'react';
import {Button} from 'grommet';
import {Deploy, Services, Deliver, Analytics, User, Home} from 'grommet-icons';
import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '../react-sidenav.css';

import {NavLink as RouterNavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    Collapse,
    Container,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import {useAuth0} from "../react-auth0-spa";

const CustomSideBar = () => {
    let state = {
        showSidebar: true,
    };
    const [isOpen, setIsOpen] = useState(false);
    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();
    const toggle = () => setIsOpen(!isOpen);

    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin
        });


    // const { showSidebar } = this.state;
    return (
        <SideNav
            onSelect={(selected) => {
                console.log(selected)
            }}>
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <Button icon={<Home color="#ffffff"/>} style={{fontSize: '1.75em'}}/>
                    </NavIcon>
                    <NavText>
                        <NavLink
                            tag={RouterNavLink}
                            to="/"
                            exact
                            activeClassName="router-link-exact-active"
                        >
                            Home
                        </NavLink>

                    </NavText>
                </NavItem>
                {isAuthenticated && (
                    <NavItem eventKey="stock_take">
                        <NavIcon>
                            <Button icon={<Deploy color="#ffffff"/>} style={{fontSize: '1.75em'}}/>
                        </NavIcon>
                        <NavText>
                            <NavLink
                                tag={RouterNavLink}
                                to="/stocktake"
                                exact
                                activeClassName="router-link-exact-active"
                            >
                                Stock Take
                            </NavLink>
                        </NavText>
                    </NavItem>
                )}
                {isAuthenticated && (
                    <NavItem eventKey="settings">

                        <NavIcon>
                            <Button icon={<Services color="#ffffff"/>} style={{fontSize: '1.75em'}}/>
                        </NavIcon>
                        <NavText>
                            <NavLink
                                tag={RouterNavLink}
                                to="/designer"
                                exact
                                activeClassName="router-link-exact-active"
                            >
                                Warehouse Designer
                            </NavLink>
                        </NavText>

                    </NavItem>
                )}
                {isAuthenticated && (
                    <NavItem eventKey="reports">
                        <NavIcon>
                            <Button icon={<Analytics color="#ffffff"/>} style={{fontSize: '1.75em'}}/>
                        </NavIcon>
                        <NavText>

                            <NavLink
                                tag={RouterNavLink}
                                to="/reports"
                                exact
                                activeClassName="router-link-exact-active"
                            >
                                Reports
                            </NavLink>
                        </NavText>
                    </NavItem>
                )}

                {!isAuthenticated && (
                    <NavItem onClick={() => loginWithRedirect({})}>
                        <NavIcon>
                            <Button icon={<User color="#ffffff"/>} style={{fontSize: '1.75em'}} href={'/'}/>
                        </NavIcon>
                        <NavText>
                            Login
                        </NavText>
                    </NavItem>
                )}
                {isAuthenticated && (
                    <NavItem eventKey="account">

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret id="profileDropDown">
                                <img
                                    src={user.picture}
                                    alt="Profile"
                                    className="nav-user-profile rounded-circle"
                                    width="50"
                                />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>{user.name}</DropdownItem>
                                <DropdownItem
                                    tag={RouterNavLink}
                                    to="/profile"
                                    className="dropdown-profile"
                                    activeClassName="router-link-exact-active"
                                >
                                    <FontAwesomeIcon icon="user" className="mr-3"/> Profile
                                </DropdownItem>
                                <DropdownItem
                                    id="qsLogoutBtn"
                                    onClick={() => logoutWithRedirect()}
                                >
                                    <FontAwesomeIcon icon="power-off" className="mr-3"/> Log
                                    out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </NavItem>
                )}
                {/*<NavItem eventKey="account">*/}
                {/*    <NavIcon>*/}
                {/*        <Button icon={<User color="#ffffff"/>} style={{fontSize: '1.75em'}} href={'/'}/>*/}
                {/*    </NavIcon>*/}
                {/*    <NavText>*/}
                {/*        My Account*/}
                {/*    </NavText>*/}
                {/*    <NavItem eventKey="Accoount_settings">*/}
                {/*        <NavText>*/}
                {/*            Account Settings*/}
                {/*        </NavText>*/}
                {/*    </NavItem>*/}
                {/*    <NavItem eventKey="Sign_out">*/}
                {/*        <NavText>*/}
                {/*            Sign Out*/}
                {/*        </NavText>*/}
                {/*    </NavItem>*/}
                {/*</NavItem>*/}


            </SideNav.Nav>
        </SideNav>

    );

}

export default CustomSideBar;
