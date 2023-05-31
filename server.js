const app = require("./reprogramafy/src/app");
require('dotenv').config();

const PORT = process.env.API_PORT || 7878;
app.listen(PORT, ()=>{
  console.log(`Seu servidor está rodando na porta ${PORT}`);
});
