const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
// const helmet = require('helmet')

const routes = require('./routes/routes')

dotenv.config()
app.use(cors())
app.use(express.json())
// app.use(
// 	helmet({
// 		crossOriginEmbedderPolicy: false,
// 	})
// )

app.use((req, res, next) => {
	res.removeHeader('Cross-Origin-Resource-Policy')
	res.removeHeader('Cross-Origin-Embedder-Policy')
	next()
})

app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
	})
	.then(() => console.log('Database is connected successfully...👍'))
	.catch(err => console.log('Connection Failed..😢 ', err))

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images')
	},
	filename: (req, file, callback) => {
		callback(null, req.body.name) // hello.jpg
	},
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded')
})

app.use(routes)

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running...🔥 on port ${process.env.PORT || 8080}..🚀`)
})
