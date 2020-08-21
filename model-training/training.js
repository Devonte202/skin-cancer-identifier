// const tf = require('@tensorflow/tfjs-node')
// const fs = require('fs')
// const path = require('path')

// const TRAIN_IMAGES_BENIGN_DIR = './melanoma-data/train/benign'
// const TRAIN_IMAGES_MALIGNANT_DIR = './melanoma-data/train/malignant'

// const TEST_IMAGES_BENIGN_DIR = './melanoma-data/test/benign'
// const TEST_IMAGES_MALIGNANT_DIR = './melanoma-data/test/malignant'

// const loadImages = (testDataDir, trainDataDir, label) => {
//     const testImages = []
//     const trainImages = []
//     const labels = []
    
//     const testFiles = fs.readdirSync(testDataDir)
//     const trainFiles = fs.readdirSync(trainDataDir)
//     for(let file in testFiles){
//         let filePath = path.join(dataDir, file)
//         let buffer = fs.readFileSync(filePath)
//         let imageTensor = tf.node.decodeImage(buffer)
//             .resizeNearestNeighbor()
//             .toFloat()
//             .div(tf.scalar(255.0))
//             .expandDims()
//         testImages.push(imageTensor)
//         labels.push(label)
//     }
//     for(let file in trainFiles){
//         let filePath = path.join(dataDir, file)
//         let buffer = fs.readFileSync(filePath)
//         let imageTensor = tf.node.decodeImage(buffer)
//             .resizeNearestNeighbor()
//             .toFloat()
//             .div(tf.scalar(255.0))
//             .expandDims()
//         trainImages.push(imageTensor)
//         labels.push(label)
//     }
//     return [testImages, trainImages, labels]
// }

// class BenignDataset {
//     constructor() {
//         this.trainData = []
//         this.testData = []
//         this.labels = []
//     }

//     loadData() {
//         console.log('Loading images...')
//         let processedData = loadImages(TEST_IMAGES_BENIGN_DIR, TRAIN_IMAGES_BENIGN_DIR, 'Benign')
//         this.trainData = processedData[1]
//         this.testData = processedData[0]
//         console.log('Images loaded successfully')
//     }
//     getTrainData() {
//         return {
//             images: tf.concat(this.trainData),
//             labels: tf.oneHot(tf.tensor1d(this.labels), 'int32', 2).toFloat()
//         }
//     }
// }

// class MalignantDataset {
//     constructor() {
//         this.trainData = []
//         this.testData = []
//         this.labels = []
//     }

//     loadData() {
//         console.log('Loading images...')
//         let processedData = loadImages(TEST_IMAGES_MALIGNANT_DIR, TRAIN_IMAGES_MALIGNANT_DIR, 'Malignant')
//         this.trainData = processedData[1]
//         this.testData = processedData[0]
//         console.log('Images loaded successfully')
//     }
//     getTrainData() {
//         return {
//             images: tf.concat(this.trainData),
//             labels: tf.oneHot(tf.tensor1d(this.labels), 'int32', 2).toFloat()
//         }
//     }
// }

// module.exports = {
//     benign: new BenignDataset(),
//     malignant: new MalignantDataset()
// }