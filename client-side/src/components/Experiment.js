import React, {useState, useEffect} from 'react'
import { Card, Icon } from 'semantic-ui-react'

const tf = require('@tensorflow/tfjs')
const tmImage = require('@teachablemachine/image')

export default function Experiment() {
    const [loading, setLoading] = useState(0)
    const [imagePredictions, setImagePredictions] = useState([])
    const getImages = () => {
        let images = []
        for(let i = 1; i <= 5; i += 1){
            let benignImageDir = require(`../poc-dataset/Benign/${i}.jpeg`)
            images.push(benignImageDir)
        }
        return images
    }
    const getPrediction = async (img, actual) => {
        
        const tmURL = 'https://teachablemachine.withgoogle.com/models/yFK1MCn9u/'
        const modelURL = tmURL + 'model.json'
        const metadataURL = tmURL + 'metadata.json'
        const model = await tmImage.load(modelURL, metadataURL)
        const maxPredictions = model.getTotalClasses()
        const htmlIMG = document.createElement('img')
        htmlIMG.src = img
        model.predictTopK(htmlIMG, maxPredictions, false).then((data) => {
            let predictions = {}
            predictions.actual = actual
            predictions.image = img
            for(let prediction of data){
                predictions[prediction.className] = prediction.probability
            }
           setLoading((loading) => loading += 1)
           setImagePredictions((imagePredictions) => [...imagePredictions, predictions])
        })
      }

      useEffect(() => {
        getImages().forEach((image) => getPrediction(image, 'Benign'))
        
      }, [])
      useEffect(() => {
          console.log(imagePredictions)
          console.log(loading)
      }, [imagePredictions])
    return (
        <div>
            {   imagePredictions &&
                imagePredictions.map((data) => {
                console.log(data)
                return (
                    <Card
                        image={data.image}
                        header={data.actual}
                        meta={`Benign: ${Math.round((data.Benign + Number.EPSILON) * 100)}% Malignant: ${Math.round((data.Malignant + Number.EPSILON) * 100)}%`}
                        description=''
                    />
                )
            })
            }
            
        </div>
    )
}

