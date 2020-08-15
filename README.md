# skin-cancer-identifier
A machine learning model designed to identify whether a tumor on the skin is benign or malignant. 

### The Question
If a machine learning model is trained to recognize skin cancer using a dataset consisting of mostly white skin, how accurate would it be in recognizing skin cancer on darker skin tones?

#### The Data
[A dataset consisting of images of benign and malignant tumors on white](https://www.kaggle.com/fanconic/skin-cancer-malignant-vs-benign)

[A dataset consisting of statistics regarding melanoma and demographics](https://www.cdc.gov/cancer/uscs/dataviz/download_data.htm)

#### Visualization 
A React interface that allws the user to upload an image of possible melanoma of the skin, and receive a prediction on whether or not it's benign or malignant

Some charts/graphs with stats about skin cancer in POC vs white people

#### Methodology 
- Train an image classification model to discern benign tumors from malignant tumors using a dataset consisting of white skin
- Test this model using 30% of that dataset, record the accuracy
- Test the same model using another dataset consisting of darker skin tumors, record the accuracy

#### Technology 
- TensorFlow.js
- React.js