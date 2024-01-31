const express = require("express");
const app = express();
const bodyParser = require("body-parser");//incluindo o módulo bodyparser que traduz os dados enviados pelo usuário em comandos javascript e permite a utilização destes dentro do projeto
const connection = require("./database/database");//importando o arquivo correspondente à conexão do banco
const Pergunta = require("./database/pergunta");//importando o arquivo correspondente à model Pergunta do banco
const Resposta = require("./database/Resposta");
//Database

connection
.authenticate()//tentando realizar a conexão com o banco
.then(()=>{//caso dê certo
    console.log("conexao do banco feita com sucesso")
}).catch((msgerro)=>{ //caso dê errado
    console.log(msgerro);
})
app.set('view engine', 'ejs');//dizendo ao express para usar o ejs como motor de engine ou template
app.use(express.static('public'));//dizendo ao express para usar arquivos estáticos na pasta public
app.use(bodyParser.urlencoded({extended: false}));//decodifica os dados enviados pelo formulário em comandos javascript
//app.use(bodyParser.json);//permite a leitura de dados de formulário via json, bem usado para API

app.get("/", (req, res)=>{
    Pergunta.findAll({raw: true,//semelhante ao comando SELECT * FROM Perguntas no SQL, listará todas as perguntas. o raw permite a listagem apenas dos atributos da tabela
    order:[['id', 'DESC']//order permite a ordenação dos elementos a partir de um atribudo(primeiro parâmetro) e a ordem deles(segundo parâmetro). DESC é descrescente e ASC é crescente
]}).then(perguntas=>{//acessando as perguntas do banco
        res.render("index", { //o metódo render irá converter os comandos html e apresentar o desenho da tela para o usuário passando como parâmetro o arquivo da view
            perguntas: perguntas //mandando as perguntas do banco(primeira variável) na variável criada que as recebe perguntas(segunda variável)
        });
    });
    
}); 

//Rotas
app.get("/perguntar", (req, res)=>{
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res)=>{ //passando a rota do tipo post
    var titulo = req.body.titulo;//acessando o titulo pelo objeto 'body' do modulo body-parser
    var descricao = req.body.descricao;//acessando a descrição pelo objeto 'body' do modulo body-parser
    
    //semelhante ao comando INSERT INTO table_name VALUES()
    Pergunta.create({ //chamando o metódo create que vai inserir os dados na tabela da model Pergunta
        //passando os valores do formulário para a tabela perguntas do banco
        titulo: titulo,
        descricao: descricao,
    }).then(()=>{
        res.redirect("/"); //redirecionando o usuário para a página inicial
    });
    
});

app.get("/pergunta/:id", (req, res)=> {
    var id = req.params.id;
    Pergunta.findOne({//este método buscará apenas um dado
        where: {id : id}//busque a pergunta que tiver o id passado da rota igual ao da pergunta no banco
    }).then(pergunta => { //passando a pergunta do banco correspondente ao id da rota
        if(pergunta != undefined){//caso seja diferente de undefined, significa que ele achou a pergunta, então ele vai mostrar a pergunta
            res.render("pergunta", {
                pergunta: pergunta
            });
        }else {//caso seja unndefined, significa que ele não achou a pergunta, então ele redirecionará para a página inicial
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res)=> {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId,
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    })
});

app.listen(3000,()=>{
    console.log("servidor rodando");
});