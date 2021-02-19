const connection = require('../database/connection');

module.exports = {
  async update(request, response) {
    console.log(request.body);
    const { UsuarioId, Salario, PercentualGasto } = request.body;
    const user = await connection('TB_USUARIOS').where('USUARIOID', '=', UsuarioId).update({
      SALARIO: Salario,
      PERCENTUALGASTO: PercentualGasto,
    });
    return response.status(204).send();
  },
};
