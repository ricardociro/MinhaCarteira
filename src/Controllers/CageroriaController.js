const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { UsuarioId } = request.query;
    const categorias = await connection('TB_CATEGORIAS')
      .select(
        'CategoriaId',
        'UsuarioId',
        'Categoria',
        'Icone',
        'Cor',
      ).where({ 'USUARIOID': UsuarioId });
    return response.json(categorias);
  },

  async create(request, response) {
    const { UsuarioId, Categoria, Icone, Cor } = request.body;
    console.log(request.body);
    const result = await connection('TB_CATEGORIAS').returning('CATEGORIAID').insert({
      USUARIOID: UsuarioId,
      CATEGORIA: Categoria,
      ICONE: Icone,
      COR: Cor
    });
    console.log(result);
    return response.json({ id: result[0] });
  },

  async Update(request, response) {
    const { CategoriaId, Categoria, Icone, Cor } = request.body;
    await connection('TB_CATEGORIAS').where('CATEGORIAID', CategoriaId).update({
      CATEGORIA: Categoria,
      ICONE: Icone,
      COR: Cor
    });
    return response.status(204).send();
  },

  async delete(request, response) {
    const { CategoriaId } = request.query;
    await connection('TB_CATEGORIAS').where('CATEGORIAID', CategoriaId).delete();
    return response.status(204).send();
  },
};
