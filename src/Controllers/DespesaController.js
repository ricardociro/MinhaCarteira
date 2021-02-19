const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    console.log(request.query);
    const { tipo, UsuarioId, referencia } = request.query;

    let despesa;
    switch (tipo) {

      case 'total':
        console.log('CASE total');
        despesa = await connection('TB_DESPESAS')
          .sum('VALOR AS Total')
          .where({ 'USUARIOID': UsuarioId, 'REFERENCIA': referencia });
        break;

      case 'mes':
        console.log('CASE mes');
        despesa = await connection('TB_DESPESAS')
          .select('Referencia', connection.raw('SUM(Valor) AS Total'))
          .where({ 'USUARIOID': UsuarioId }).groupBy('Referencia').orderBy('DATA_REFERENCIA', 'desc');
        break;

      case 'detalhe':
        console.log('CASE detalhe');
        despesa = await connection('TB_DESPESAS')
          .join('TB_CATEGORIAS', 'TB_CATEGORIAS.CATEGORIAID', '=', 'TB_DESPESAS.CATEGORIAID')
          .select(
            'Despesa',
            'Valor',
            'Data',
            'Icone',
            'Categoria',
            'Cor',
          )
          .where({ 'TB_DESPESAS.USUARIOID': UsuarioId, 'REFERENCIA': referencia }).orderBy('DESPESAID', 'DESC');
        break;
      case 'ultimogasto':
        console.log('CASE ultimo gasto');
        despesa = await connection.raw(`SELECT VALOR as Valor, CATEGORIA as Categoria ` +
          `FROM TB_DESPESAS INNER JOIN TB_CATEGORIAS ON TB_CATEGORIAS.CATEGORIAID = TB_DESPESAS.CATEGORIAID ` +
          `WHERE TB_DESPESAS.USUARIOID = ${UsuarioId} AND TB_DESPESAS.REFERENCIA='${referencia}'  ` +
          `ORDER BY DESPESAID DESC LIMIT 1`);

        despesa = despesa[0][0];

        break;

      case 'gasto':
        console.log('CASE gasto');
        despesa = await connection.raw(`SELECT CAST( SUM(VALOR)  /(  SALARIO * (PERCENTUALGASTO/100)) *100 AS DECIMAL(2,0)) as total ` +
          `FROM TB_USUARIOS INNER JOIN TB_DESPESAS ON TB_DESPESAS.USUARIOID = TB_USUARIOS.USUARIOID ` +
          `WHERE TB_DESPESAS.USUARIOID = ${UsuarioId} AND TB_DESPESAS.REFERENCIA='${referencia}' ` +
          `GROUP BY SALARIO * (PERCENTUALGASTO / 100)`);

        despesa = despesa[0][0];

        break;
    }
    return response.json(despesa);
  },

  async create(request, response) {
    const { UsuarioId, Valor, Referencia, CategoriaId, Data, Despesa, DataReferencia } = request.body;
    console.log(request.body);
    const result = await connection('TB_DESPESAS').returning('DESPESAID').insert({
      USUARIOID: UsuarioId,
      CATEGORIAID: CategoriaId,
      VALOR: Valor,
      DESPESA: Despesa,
      REFERENCIA: Referencia,
      CATEGORIAID: CategoriaId,
      DATA: Data,
      DATA_REFERENCIA: DataReferencia
    });
    console.log(result);
    return response.json({ id: result[0] });
  },
};
