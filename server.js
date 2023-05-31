// IMPORTS
const app = require('./reprogramafy/src/app.js')
const PORT = 8080

// SERVER CONFIG
app.listen(PORT, () => {
  console.log(`listening to requests on port ${PORT}`)
})
