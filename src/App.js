import React, { Component } from 'react';
import {Box, Grommet, ResponsiveContext,} from 'grommet';
import './css/react-sidenav.css';
import CustomSideBar from './Components/CustomSideBar'
import TopBar from './Components/TopBar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Account from './Components/Account/Account.js'
import Designer from './Components/Designer/Designer.js'
import Home from './Components/Home/Home.js'
import Orders from './Components/Orders/Orders.js'
import Reports from './Components/Reports/Reports.js'
import StockTake from './Components/StockTake/StockTake.js'

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

class App extends Component {

  render() {
    return (
      <Router>
        <Grommet theme={theme} full>
          <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous"
          />
          <ResponsiveContext.Consumer>
            {size => (
              <Box fill>


                <CustomSideBar/>

                <TopBar/>

                <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                  <div id = "body">
                  <Box flex align='right' justify='right' margin={240} padding='100px' >
                    <Route exact path='/' component={Home}/>
                    <Route path='/st' component={StockTake} />
                    <Route path='/ac' component={Account} />
                    <Route path='/dr' component={Designer} />
                    <Route path='/rp' component={Reports} />
                    <Route path='/or' component={Orders} />
                  </Box>
                  </div>
                </Box>
              </Box>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </Router>
    );
  }
}

export default App;