const Sequelize = require("sequelize");//importando o módulo sequelize
const connection = new Sequelize('guiaperguntas', 'root', 'luismiguel123', { //abrindo nova conexão do banco
    host:'localhost', //via de acesso remoto do meu computador
    dialect:'mysql' //tipo do banco usado
});

module.exports = connection; //exportando o arquivo de conexão do banco