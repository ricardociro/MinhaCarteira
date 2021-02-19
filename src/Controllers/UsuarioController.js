const connection = require('../database/connection');

module.exports = {

  async UserExist(request, response) {
    const { email } = request.query;

    const user = await connection('TB_USUARIOS')
      .where({ email: email })
      .select('USUARIOID');
    return response.json(user);

  },
  async update(request, response) {
    console.log(request.body);
    const { UsuarioId, Nome, Email, Senha, Imagem, Telefone } = request.body;
    const user = await connection('TB_USUARIOS').where('USUARIOID', '=', UsuarioId).update({
      NOME: Nome,
      EMAIL: Email,
      TELEFONE: Telefone,
      SENHA: Senha,
      IMAGEM: Imagem,
      TROCASENHA: 0
    });
    return response.status(204).send();
  },



  async create(request, response) {
    const { nome, email, senha, imagem, Telefone } = request.body;
    const result = await connection('TB_USUARIOS').returning('USUARIOID').insert({
      NOME: nome,
      EMAIL: email,
      SENHA: senha,
      IMAGEM: imagem,
      SALARIO: 0,
      PERCENTUALGASTO: 0,
      TELEFONE: Telefone,
    });
    console.log(result);

    return response.json({ id: result[0] });
  },
};
