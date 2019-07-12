import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DragDropContainer from './components/DragDropComponent/Container'
import SortableComponent from './components/SortableComponent';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

/* How to import Component */
// import EdgeScroll, { DOWNWARDS, UPWARDS } from '../src/components/EdgeScroll/EdgeScroll'
import EdgeScroll, { DOWNWARDS, UPWARDS } from  '@cogders/react-edgescroll';

class App extends Component {

  state = {
    edgeScroll: true
  }

  render() {

    const isEdgeScrollingEnabled = this.state.edgeScroll;

    const toggleEdgeScroll = () => {
      this.setState({ edgeScroll: !isEdgeScrollingEnabled })
    }

    const EdgeScrollToggler =
      <div className="toggler-wrapper">
        <span onClick={toggleEdgeScroll} style={{ paddingRight: '6px', cursor: 'pointer' }}>{isEdgeScrollingEnabled ? 'EdgeScroll Enabled' : 'EdgeScroll Disabled'}</span>
        <label className="switch">
          <input onClick={toggleEdgeScroll} type="checkbox" checked={this.state.edgeScroll} />
          <span className="slider round"></span>
        </label>
      </div>

    return (

      <Router>
        { /* Skip code above */}
        { /* HOW TO USE */}
        { /* This is an example how to mainly use EdgeScroll Component */}
        { /* For example we will use it as Headers child here */}
        <Header>
          {isEdgeScrollingEnabled &&
            <EdgeScroll
              inactiveStyle={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                height: 0,
                position: "absolute"
              }}
              activeStyle={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute"
              }}
              direction={UPWARDS}
            />}
        </Header>
        { /* For example we will use it as Footers child here */}
        <Footer>
          {isEdgeScrollingEnabled &&
            <EdgeScroll
              inactiveStyle={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute"
              }}
              activeStyle={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
              }}
              direction={DOWNWARDS}
            />
          }
        </Footer>

        {/* Skip code below */}
        <Route path="/" exact render={() => {
          return (
            <Home />
          )
        }} />
        <Route path="/sortable" exact render={() => {
          return (
            <div>
              {EdgeScrollToggler}
              <div style={{ marginTop: '75px', marginBottom: '150px', width: '98vw', display: 'flex' }}>
                <SortableComponent />
              </div>
            </div>
          )
        }} />

        <Route path="/dragdrop" exact render={() => {
          return (
            <div>
              {EdgeScrollToggler}
              <div style={{ marginTop: '100px', marginBottom: '150px', width: '98vw', display: 'flex' }}>
                <DragDropContainer />
              </div>
            </div>
          )
        }} />

        <Route path="/usage" exact render={() => {
          return (
            <div style={{ paddingTop: '50px' }}>
              DOCUMENTATION
              </div>
          )
        }} />

      </Router>
    );
  }
}

export default App;
