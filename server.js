const app = require("./reprogramafy/src/app");
const PORT = 7878;

app.listen(PORT, ()=>{
  console.log(`Seu servidor está rodando na porta ${PORT}`);
});