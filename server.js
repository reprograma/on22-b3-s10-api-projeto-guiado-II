const app = require('./reprogramafy/src/app')
const PORT = 7878
app.listen(PORT, () => {
    console.log(`O servidor está na ${PORT}`)
})