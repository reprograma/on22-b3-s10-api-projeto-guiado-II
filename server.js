const app = require("./reprogramafy/src/app");

const PORT = 2303;

app.listen(PORT, () => {
  console.log(`Seu servidor esta na porta ${PORT} e está funcionando`);
});
