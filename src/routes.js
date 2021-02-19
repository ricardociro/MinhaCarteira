const { Router } = require('express');
//imports controllers
const CategoriaController = require('../src/Controllers/CageroriaController');
const UsuarioController = require('../src/Controllers/UsuarioController');
const UsuarioAuthController = require('../src/Controllers/UsuarioAuthController');
const ConfiguracaoController = require('../src/Controllers/ConfiguracaoController');
const DespesaController = require('../src/Controllers/DespesaController');
const routes = Router();

//ROTAS CATEGORIAS
routes.get('/categoria', CategoriaController.index);
routes.put('/categoria', CategoriaController.Update);
routes.post('/categoria', CategoriaController.create);
routes.delete('/categoria', CategoriaController.delete);

//ROTAS USUARIO
routes.put('/usuario', UsuarioController.update);
routes.post('/usuario', UsuarioController.create);
routes.get('/usuario', UsuarioController.UserExist);

//ROTA PARA AJUSTAR CONFIGURACOES
routes.put('/config', ConfiguracaoController.update);

//ROTA PARA AUTENTICAR
routes.get('/auth', UsuarioAuthController.auth);
routes.post('/auth', UsuarioAuthController.SendMail);

//ROTAS DESPESAS
routes.post('/despesa', DespesaController.create);
routes.get('/despesa', DespesaController.index);


//export routes
module.exports = routes;