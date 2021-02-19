const nodemailer = require('nodemailer');
const crypto = require('crypto');
const connection = require('../database/connection');
const { json } = require('express');

module.exports = {
  async auth(request, response) {
    const { Email, Senha } = request.query;
    console.log(request.query);
    const usuario = await connection('TB_USUARIOS')
      .select(
        'UsuarioId',
        'Nome',
        'Email',
        'Imagem',
        'TrocaSenha',
        'Salario',
        'PercentualGasto',
        'Telefone'
      ).where({ 'EMAIL': Email, 'SENHA': Senha });
    console.log(usuario);
    return response.json(usuario);
  },

  async SendMail(request, response) {
    const { Email, Nome, UsuarioId } = request.body;
    let newPass = crypto.randomBytes(6).toString('HEX');

    console.log(request.body);
    console.log(newPass);
    await connection('TB_USUARIOS').where('USUARIOID', '=', UsuarioId).update({
      TROCASENHA: '1',
      SENHA: newPass
    });

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'ciro.ignacio@gmail.com',
        pass: 'RicardoVini@1317',
      },
    });

    var mailOptions = {
      from: 'recuperarsenha@minhacarteira.net.br',
      to: Email,
      subject: 'Recuperar senha',
      html:
        '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8" /></head><body>' +
        '<table style="margin: 0; padding: 0; color: #5d666f;max-width:  1600px!important; font-family: "Open sans",sans-serif" width="100%" height="100%" border="0"><tbody>' +
        '<tr>' +
        '<td style="padding: 20px; text-align: center"><img src="http://www.createsystem.net.br/Assets/logo_blue_white.png" alt="Minha Carteira" width="160"></td></tr><tr><td style="padding: 18px 40px 0 40px;"><h1 style="font-size: 24px;  font-weight: bold">Falta pouco para redefinir sua senha</h1></td></tr>' +
        '<tr>' +
        '<td style="padding: 24px 40px 24px 40px;"><p style="font-size: 15px;  line-height: 24px; color: #5d666f">Blz, ' + Nome +
        '!<br /><br />Recebemos uma solicitação de redefinição de senha para a conta associada ao seu email.<br /><br />Não responda a esta mensagem. Este e-mail foi enviado por um sistema automático que não processa respostas.</p></td></tr>' +
        '<tr>' +
        '<td style="padding: 0px 40px 24px 40px;"><p style="font-size: 15px; line-height: 24px; ">Sua senha temporária foi criada, faça o login no App e uma nova senha será solicitada.</p></td></tr>' +
        '<tr>' +
        '<td style="padding: 0px 40px 24px 40px;"><p style="font-size: 20px; font-weight: bold; line-height: 24px; "><b>' + newPass + '</b></p></td></tr>' +
        '<tr>' +
        '<td style="padding: 0px 40px 24px 40px;"><p style="font-size: 15px; line-height: 24px; ">Bora lá.</p></td></tr>' +
        '<tr>' +
        '<tr>' +
        '<td style="padding: 40px 10px 0px 10px;"><p style="padding: 0px; color: #b0b0b0; margin: 0; font-size: 14px; text-align: center">Dúvidas? Entre em contato com a <a href="http://createsystem.net.br" alt="Acesse | Create System" style="color: #79553E" target="_blank">Create System.</a></p></td></tr><tr><td style="padding: 34px 20px; text-align: center"><p style="font-size: 14px; color: #7e8790; margin: 0; padding: 0; font-weight: normal; line-height: 24px; font-size: 14px; line-height: 16px">Copyright &copy; Create System 2021</p></td></tr></tbody></table></body></html>',
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + email);
      }
    });
    return response.status(204).send();
  },
};
