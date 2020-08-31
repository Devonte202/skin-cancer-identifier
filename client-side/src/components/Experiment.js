import React, {useState, useEffect} from 'react'
import { Card, Icon, Dimmer, Loader, Image, Reveal } from 'semantic-ui-react'

const tf = require('@tensorflow/tfjs')
const tmImage = require('@teachablemachine/image')

export default function Experiment() {
    const [loading, setLoading] = useState(0)
		const [imagePredictions, setImagePredictions] = useState([])
	

		
    const getPredictions = async () => {
        setLoading(true)
				const experimentResults = await fetch('/api/experiment-results').then(res => res.json())
				console.log(experimentResults)
				setImagePredictions(experimentResults)
        setLoading(false)
      }

      useEffect(() => {
				getPredictions()
      }, [])
      
    return (
        <div>
            {loading && <Dimmer active>
            <Loader indeterminate>Running Analysis</Loader>
            </Dimmer>}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {   imagePredictions &&
                imagePredictions.map((data) => {
                return (
                    <Card style={{margin: '15px'}}>
												<Reveal animated='move' instant>
													<Reveal.Content visible>
														<Image src={data.image} style={{boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .5)', filter: 'blur(6px)', width: '300px', height:'250px'}} />
													</Reveal.Content>
													<Reveal.Content hidden>
													<Image src={data.image} style={{width: '300px', height:'250px'}} />
													</Reveal.Content>
												</Reveal>
												
												<Card.Content>
												<Card.Header>Actual Status: {data.actual}</Card.Header>
												
												<Card.Description>
												{`Benign: ${data.Benign}% Malignant: ${data.Malignant}%`}
												</Card.Description>
												</Card.Content>
												<Card.Content extra>
												{
												data.correct ?
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

