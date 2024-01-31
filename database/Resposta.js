const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        alloNull: false,
    },
    perguntaId: {//relacionamento de tabela à tabela pergunta (chave estrangeira) id da pergunta
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

Resposta.sync({force: false}).then(()=>{});

module.exports = Resposta;