import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import {Box, Grommet, ResponsiveContext,} from 'grommet';
import './auth0.css';
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
// import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Designer from "./views/Designer";
import Reports from "./views/Reports";
import StockTake from "./views/StockTake/StockTake";
import './react-sidenav.css';
import CustomSideBar from './components/CustomSideBar'
import TopBar from './components/TopBar'
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const theme = {
  global: {

    colors: {
      brand: '#365260',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },

  },
};

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <Grommet theme={theme} full>
      <div id="app" className="d-flex flex-column h-100">
        <CustomSideBar/>
        <TopBar/>
        {/*<NavBar/>*/}
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/designer" component={Designer} />
            <PrivateRoute path="/reports" component={Reports} />
            <PrivateRoute path="/stocktake" component={StockTake} />
          </Switch>
        </Container>
        <Footer />
      </div>
      </Grommet>
    </Router>
  );
};

export default App;
