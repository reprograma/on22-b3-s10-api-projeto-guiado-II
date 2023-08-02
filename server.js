const app = require("./reprogramafy/src/appProjetoFinalizadoAluna");

const PORT = 7878;

app.listen(PORT, () => {
  console.log(`Seu servidor esta na porta ${PORT} e está funcionando`);
});
