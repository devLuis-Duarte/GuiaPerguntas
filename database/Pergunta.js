const Sequelize = require("sequelize"); //importando o módulo sequelize
const connection = require("./database");//importando o arquivo de conexão do banco

//definindo os atributos da model que será uma tabela chamada Pergunta no banco de dados
const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING, //tipo do dado, nesse caso, STRING que é para textos curtos
        allowNull: false, //allowNull: false, impedirá de receber valores nulos
    },
    descricao:{
        type: Sequelize.TEXT, //tipo do dado, nesse caso, TEXT que é para textos longos
        allowNull: false, 
    }
});

Pergunta.sync({force: false}).then(()=>{}); //sincroniza com o banco de dados e o force: false impedirá de criar uma tabela pergunta, caso ela já exista no banco. o then é o que ele fará após criar a tabela

module.exports = Pergunta;