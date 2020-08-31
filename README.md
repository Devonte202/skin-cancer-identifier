# skin-cancer-identifier
A machine learning model designed to identify whether a tumor on the skin is benign or malignant. 

### The Question
If a machine learning model is trained to recognize skin cancer using a dataset consisting of mostly white skin, how accurate would it be in recognizing skin cancer on darker skin tones?

#### The Data
[A dataset consisting of images of benign and malignant tumors on white](https://www.kaggle.com/fanconic/skin-cancer-malignant-vs-benign)

[A dataset consisting of statistics regarding melanoma and demographics](https://www.cdc.gov/cancer/uscs/dataviz/download_data.htm)

#### Visualization 
A React interface that allows the user to upload an image of possible melanoma of the skin, and receive a prediction on whether or not it's benign or malignant

Some charts/graphs with stats about skin cancer in POC vs white people

#### Purpose
This project is intended to be informative for two audiences, people seeking more information regarding melanoma and how it affects diffeent demographics, and developers interested in reading about the effect of not diversifiying data in the data science field.

#### Process
**Observation**: Machine has become a lot more prevalent in projects in the healthcare industry with its accurate predictive capabilities being quite valuable to doctors who must make predictions based on visual data alone.

**Question**: If a machine learning model is trained to recognize skin cancer using a dataset consisting of mostly white skin, how accurate would it be in recognizing skin cancer on darker skin tones?

**Hypothesis**: A lack of diversity in a dataset like this, should result in a model that has less accurate predictions for more diverse datapoints.

**Experiment**:
- Train an image classification model to discern benign tumors from malignant tumors using a dataset consisting of white skin
- Test this model using data from the same dataset, record the accuracy
- Test the same model using another dataset consisting of darker skin tumors, record the accuracy

**Observation**: 
- After scowering the internet for data consisting of benign/malignant leisions on darker skinned patients, I found that such data is far and few.
- Given the small data points I managed to gather, the machine learning model was indeed less accurate with darker skinned patients than lighter skinned patients.

**Conclusion**: 
-  Due to a lack of available datasets, experiment shall remain inconclusive.


#### Technology 
- TensorFlow.js
- React.js
