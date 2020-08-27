import React from 'react'
import './App.css'
import Predictor from './components/Predictor'
import Navbar from 'react-bootstrap/Navbar'
import {DeathStatsLineGraph, SurvivalStatsLineGraph} from './components/Charts'
import Experiment from './components/Experiment'
import { Header, Segment } from 'semantic-ui-react'

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Machine Learning Model
        </Navbar.Brand>
      </Navbar>
      <Header as='h2' attached='top'>
        Using Machine Learning to Predict Melanoma
      </Header>
      <Segment attached>
       Upload a photo below, of suspected melanoma on your skin to recieve a procedurally generated prediction of whether it's benign or malignant
      </Segment>
      <div class="main">
        <Predictor />
      </div>
      <div className="d-flex" style={{justifyContent: 'space-around'}}>
      <DeathStatsLineGraph />
      <SurvivalStatsLineGraph />
      <Experiment />
     </div>
    </div>
  )
}

export default App
