import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/api', (req, res) => {
  res.json({ msg: 'API funcionando' })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})