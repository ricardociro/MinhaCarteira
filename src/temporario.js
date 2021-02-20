require("http")
  .createServer((req, res) => res.end("Oi :D"))
  .listen(process.env.PORT || 3000, () =>
    console.log("AplicaÃ§Ã£o temporÃ¡ria rodando.")
  );