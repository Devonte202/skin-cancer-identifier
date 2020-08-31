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
          Skin Cancer Predictor
        </Navbar.Brand>
      </Navbar>
      <Header as='h2'>
        Using Machine Learning to Predict Melanoma
      </Header>
      <Header as='h4' >
       Upload a photo below, of suspected melanoma on your skin to recieve a procedurally generated prediction of whether it's benign or malignant
      </Header>
      <div class="main">
        <Predictor />
      </div>
      <div className="d-flex" style={{justifyContent: 'space-around'}}>
      <DeathStatsLineGraph />
      <SurvivalStatsLineGraph />
     </div>
     <Header as='h2'>
        Predicting Melanoma On People Of Color
      </Header>
      <Header as='h4' >
       20% accuracy on benign predictions and 80% accuracy on malignant predictions
      </Header>
     <Experiment />
     <Segment>
       <b>Disclaimer: Due to a lack of available datasets containing benign/malignant leisions on darker skinned patients. Experiement shall remain inconclusive.</b>
     </Segment>
    </div>
  )
}

export default App
