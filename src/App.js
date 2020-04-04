import React from 'react';
import logo from './virus_PNG22.png';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Table, Nav, Navbar } from 'react-bootstrap';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      run: false,
      cases: '',
      todayCases: '',
      deaths: '',
      todayDeaths: '',
      critical: '',
      recovered: '',
      upd: '',
      url: 'https://coronavirus-19-api.herokuapp.com/countries/brazil',
      country: 'Loading...'
    };
  }

  startInterval = () => {
    setInterval(() => {
      axios.get(this.state.url)
        .then(res => {
          let info = res.data;
          let lastUpdt = new Date() + '';
          this.setState({ cases: info.cases, todayCases: info.todayCases, deaths: info.deaths, todayDeaths: info.todayDeaths, critical: info.critical, recovered: info.recovered, run: true, upd: lastUpdt, country: info.country })
          //console.log(info);
        });
    }, 3000);
  }

  render() {
    //console.log(this.state.run);
    this.state.run !== false ? console.log() : this.startInterval();

    var setStateToLoad = (v) => {
      this.setState({ url: 'https://coronavirus-19-api.herokuapp.com/countries/' + v });
      this.setState({ cases: '', todayCases: '', deaths: '', todayDeaths: '', critical: '', recovered: '', run: true, country: 'Loading...' });
    }

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Covid19Monitor</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => setStateToLoad('brazil')}>Brazil</Nav.Link>
              <Nav.Link onClick={() => setStateToLoad('usa')}>USA</Nav.Link>
              <Nav.Link onClick={() => setStateToLoad('italy')}>Italia</Nav.Link>
              <Nav.Link onClick={() => setStateToLoad('china')}>China</Nav.Link>
              <Nav.Link onClick={() => setStateToLoad('russia')}>Russia</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container fluid>

          <Row>
            <Col md={12}>
              <div>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  <code>COVID-19 Status Monitor. # {this.state.country} #</code>
                </p>

                <Table responsive>
                  <thead>
                    <tr>
                      <th>country</th>
                      <th>Confirmed</th>
                      <th>Confirmed Today</th>
                      <th>Deaths</th>
                      <th>Deaths Today</th>
                      <th>Critical Cases</th>
                      <th>Total Recovered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.country}</td>
                      <td>{this.state.cases ? this.state.cases : '0'}</td>
                      <td>{this.state.cases ? this.state.todayCases : '0'}</td>
                      <td>{this.state.cases ? this.state.deaths : '0'}</td>
                      <td>{this.state.cases ? this.state.todayDeaths : '0'}</td>
                      <td>{this.state.cases ? this.state.critical : '0'}</td>
                      <td>{this.state.cases ? this.state.recovered : '0'}</td>
                    </tr>
                  </tbody>
                </Table>

                <p>Last Update: {this.state.upd ? this.state.upd : new Date() + ''}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

