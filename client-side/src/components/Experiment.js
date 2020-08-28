import React, {useState, useEffect} from 'react'
import { Card, Icon, Dimmer, Loader, Image } from 'semantic-ui-react'

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
            predictions.actual = actual
            predictions.image = img
            for(let prediction of data){
                predictions[prediction.className] = prediction.probability
            }

           setImagePredictions((imagePredictions) => [...imagePredictions, predictions])
           setLoading(false)
        })
      }

      useEffect(() => {
        getImages().forEach((image) => getPrediction(image, 'Benign'))
        
      }, [])
      
    return (
        <div>
            {loading && <Dimmer active>
            <Loader indeterminate>Running Analysis</Loader>
            </Dimmer>}
            <div style={{display: 'flex'}}>
            {   imagePredictions &&
                imagePredictions.map((data) => {
                console.log(data)
                return (
                    <Card>
												<Image src={data.image} size='small' />
												<Card.Content>
												<Card.Header>Actual Status: {data.actual}</Card.Header>
												
												<Card.Description>
												{`Benign: ${Math.round((data.Benign + Number.EPSILON) * 100)}% Malignant: ${Math.round((data.Malignant + Number.EPSILON) * 100)}%`}
												</Card.Description>
												</Card.Content>
												<Card.Content extra>
												{
													Math.round((data.Benign + Number.EPSILON) * 100) > 50 ?
													<a>
														<Icon name='thumbs up outline' />
														Prediction Accurate
												</a>
												:
												<a>
														<Icon name='thumbs down' />
														Prediction Inaccurate
												</a>
												}
												</Card.Content>
										</Card>
                )
            })
            }
            </div>
            
        </div>
    )
}

