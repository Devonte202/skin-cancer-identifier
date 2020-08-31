import React, {useState, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import { Button, Divider, Grid, Image, Segment, Statistic, Dimmer, Loader } from 'semantic-ui-react'
import '../styles.css'


const tf = require('@tensorflow/tfjs')
const tmImage = require('@teachablemachine/image')



const Predictor = () => {
  const [userImg, setUserImg] = useState('')
  const [prediction, setPrediction] = useState({Benign: 0, Malignant: 0})
  const [loading, setLoading] = useState(false)
  const benignNum = useSpring({ number: Math.round((prediction['Benign'] + Number.EPSILON) * 100) , from: { number: 0 } })
  
  const malignantNum = useSpring({ number: Math.round((prediction['Malignant'] + Number.EPSILON) * 100), from: { number: 0 } })

  
  const readImage = (file) => {
    if(!file) return ''
    if (file.type && file.type.indexOf('image') === -1) {
        console.log('File is not an image.', file.type, file)
        return ''
    }
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
    setUserImg(event.target.result)
    })
    console.log(file)
    reader.readAsDataURL(file)
  }
  
  const getPrediction = async (img) => {
    setLoading(true)
    const tmURL = 'https://teachablemachine.withgoogle.com/models/yFK1MCn9u/'
    const modelURL = tmURL + 'model.json'
    const metadataURL = tmURL + 'metadata.json'
    const model = await tmImage.load(modelURL, metadataURL)
    const maxPredictions = model.getTotalClasses()
    const htmlIMG = document.createElement('img')
    htmlIMG.src = img
    model.predictTopK(htmlIMG, maxPredictions, false).then((data) => {
        let predictions = {}
        for(let prediction of data){
            predictions[prediction.className] = prediction.probability
        }
        console.log(predictions)
       setPrediction(predictions)
       setLoading(false)
    })
  }

  return (
    <div class='prediction-section'>
      <div class="upload-btn-wrapper">
        <Button 
        onClick={() => document.getElementById('userImg').click()}
        secondary>Upload a photo</Button>
        <Button onClick={() => getPrediction(userImg)} primary>Process</Button>
        <input 
        type="file" 
        id="userImg" 
        name="userImg" 
        accept="image/*"
        onChange={(e) => {
            readImage(e.target.files[0])
            setUserImg(e.target.files[0])
          }}
        ></input>
        <Image src={userImg} size='small' wrapped />
      </div>
      
      <Segment>
        {loading && <Dimmer active>
          <Loader indeterminate>Running Analysis</Loader>
        </Dimmer>}
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
          <h1>Benign</h1>
          <Statistic label='Percent Chance' value={<animated.div style={{fontSize:'40px', fontWeight:'bold', fontFamily:'monospace'}}>{benignNum.number}</animated.div>}/>
          <p>Accuracy: 81%</p>
          </Grid.Column>
          <Grid.Column>
          <h1>Malignant</h1>
          <Statistic label='Percent Chance' value={<animated.div style={{fontSize:'40px', fontWeight:'bold', fontFamily:'monospace'}}>{malignantNum.number}</animated.div>}/>
          <p>Accuracy: 84%</p>
          </Grid.Column>
        </Grid>

        <Divider vertical></Divider>
      </Segment>
    </div>
  )
}

export default Predictor