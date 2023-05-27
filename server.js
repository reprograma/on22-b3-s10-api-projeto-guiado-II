const app = require('./reprogramafy/src/app.js')
const PORT = 80

app.listen(PORT, () => {
  console.log(`listening to requests on port ${PORT}`)
})