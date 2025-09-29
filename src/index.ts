import express from 'express'
import databaseService from './services/database.services'

const app = express()
const router = express.Router()
const port = 3000

app.use('/api', router)
databaseService.connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`)
  next()
})

router.get('/tweets', (req, res) => {
  res.json({
    data: [
      { id: '1', text: 'Hello World!' },
      { id: '2', text: 'HEllo2' }
    ]
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
