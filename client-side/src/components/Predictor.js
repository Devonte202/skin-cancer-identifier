import React, {useState, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
const tf = require('@tensorflow/tfjs')
const tmImage = require('@teachablemachine/image')


const Predictor = () => {
  const [userImg, setUserImg] = useState('')
  const [prediction, setPrediction] = useState(0)
  const props = useSpring({ number: Math.round(prediction['Benign'] * 100), from: { number: 0 } })
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
    reader.readAsDataURL(file)
  }
  const getPrediction = async (img) => {
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
       setPrediction(predictions)
        
    })
    
}

  return (
    <div>
      <label for="userImg">Upload a picture</label>
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
      <img src={userImg}></img>
      <button onClick={() => getPrediction(userImg)}>Process</button>
    <p>Benign: {Math.round(prediction['Benign'] * 100)}</p>
    <animated.span>{props.number}</animated.span>
    <p>Malignant: {Math.round(prediction['Malignant'] * 100)}</p>
    </div>
  )
}

export default Predictor