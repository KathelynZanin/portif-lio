let portfolio = JSON.parse(localStorage.getItem("portfolio")) || {

nome: "Kathelyn Cauane de Oliveira Zanin",

titulo: "Dev Iniciante | Estudante de DSM | Explorando o mundo do desenvolvimento",

descricao: "Técnico em Administração pela ETEC, agora cursando Desenvolvimento de Software Multiplataforma na FATEC.",

sobre: "Sou estudante de Desenvolvimento de Software Multiplataforma apaixonada por tecnologia."

};

function carregarPortfolio(){

document.getElementById("nome").textContent = portfolio.nome;
document.getElementById("titulo").textContent = portfolio.titulo;
document.getElementById("descricao").textContent = portfolio.descricao;
document.getElementById("sobreTexto").textContent = portfolio.sobre;

}

function salvarPortfolio(){

portfolio.nome = document.getElementById("editNome").value;
portfolio.titulo = document.getElementById("editTitulo").value;
portfolio.descricao = document.getElementById("editDescricao").value;
portfolio.sobre = document.getElementById("editSobre").value;

localStorage.setItem("portfolio", JSON.stringify(portfolio));

carregarPortfolio();

alert("Portfólio atualizado!");

}

window.onscroll = function(){

let navbar = document.getElementById("navbar");

if(document.documentElement.scrollTop > 50){
navbar.classList.add("scrolled");
}else{
navbar.classList.remove("scrolled");
}

}

function atualizarSaudacao(){

const saudacaoElemento = document.getElementById("saudacao");

if(!saudacaoElemento) return;

const hora = new Date().getHours();

let mensagem = "";

if(hora >= 5 && hora < 12){
mensagem = "Bom dia!";
}
else if(hora >= 12 && hora < 18){
mensagem = "Boa tarde!";
}
else{
mensagem = "Boa noite!";
}

saudacaoElemento.textContent = mensagem;

}

let modoAdmin = false;

let projetos = JSON.parse(localStorage.getItem("projetos")) || [

{
id:1,
nome:"API de Censo 2022",
descricao:"Projeto em grupo com dados do censo.",
imagem:"img/api.webp",
github:"https://github.com/",
vercel:"https://vercel.com/"
},

{
id:2,
nome:"Doces Simples",
descricao:"Site com receitas simples.",
imagem:"img/doces.webp",
github:"https://github.com/",
vercel:"https://vercel.com/"
}

];

function mostrarProjetos(){

const container = document.getElementById("lista-projetos");

container.innerHTML = "";

projetos.forEach(projeto => {

container.innerHTML += `

<div class="project">

<h3>${projeto.nome}</h3>

<img src="${projeto.imagem}" width="200">

<p>${projeto.descricao}</p>

<a href="${projeto.github}" target="_blank">GitHub</a>

<a href="${projeto.vercel}" target="_blank">Ver Site</a>

${modoAdmin ? `

<div class="admin-buttons">

<button class="btn-editar" onclick="editarProjeto(${projeto.id})">✏️ Editar</button>

<button class="btn-deletar" onclick="deletarProjeto(${projeto.id})">🗑 Deletar</button>

</div>

` : ""}

</div>

`;

});

}

let formacoes = JSON.parse(localStorage.getItem("formacoes")) || [

{
id:1,
instituicao:"FATEC",
curso:"Desenvolvimento de Software Multiplataforma",
status:"Em andamento - 2º semestre"
},

{
id:2,
instituicao:"ETEC",
curso:"Técnico em Administração",
status:"Concluído"
},

{
id:3,
instituicao:"Escola de Inovadores",
curso:"Curso sobre inovação",
status:"Concluído"
}

];

function mostrarFormacoes(){

const container = document.getElementById("lista-formacoes");

container.innerHTML = "";

formacoes.forEach(f => {

container.innerHTML += `

<div class="degree balloon">

<h3>${f.instituicao}</h3>

<p>${f.curso}</p>

<p>${f.status}</p>

${modoAdmin ? `

<div class="admin-buttons">

<button class="btn-editar" onclick="editarFormacao(${f.id})">✏️ Editar</button>

<button class="btn-deletar" onclick="deletarFormacao(${f.id})">🗑 Deletar</button>

</div>

` : ""}

</div>

`;

});

}

function criarFormacao(){

const instituicao = document.getElementById("nomeFormacao").value;
const curso = document.getElementById("cursoFormacao").value;
const status = document.getElementById("statusFormacao").value;

const novaFormacao = {

id: Date.now(),
instituicao,
curso,
status

};

formacoes.push(novaFormacao);

salvarFormacoes();
mostrarFormacoes();

document.getElementById("nomeFormacao").value = "";
document.getElementById("cursoFormacao").value = "";
document.getElementById("statusFormacao").value = "";

}

function salvarFormacoes(){

localStorage.setItem("formacoes", JSON.stringify(formacoes));

}

function editarFormacao(id){

const formacao = formacoes.find(f => f.id === id);

const novaInstituicao = prompt("Instituição", formacao.instituicao);
const novoCurso = prompt("Curso", formacao.curso);
const novoStatus = prompt("Status", formacao.status);

if(novaInstituicao) formacao.instituicao = novaInstituicao;
if(novoCurso) formacao.curso = novoCurso;
if(novoStatus) formacao.status = novoStatus;

salvarFormacoes();
mostrarFormacoes();

}

function deletarFormacao(id){

formacoes = formacoes.filter(f => f.id !== id);

salvarFormacoes();
mostrarFormacoes();

}

function loginAdmin(){

let senha = prompt("Digite a senha de administrador");

if(senha === "1234"){

modoAdmin = true;

document.getElementById("admin-area").style.display = "block";

const adminLink = document.getElementById("admin-link");

if(adminLink){
adminLink.style.display = "inline-block";
}

document.getElementById("editNome").value = portfolio.nome;
document.getElementById("editTitulo").value = portfolio.titulo;
document.getElementById("editDescricao").value = portfolio.descricao;
document.getElementById("editSobre").value = portfolio.sobre;

mostrarProjetos();
mostrarFormacoes();

alert("Modo administrador ativado");

}else{

alert("Senha incorreta");

}

}

function criarProjeto(){

const nome = document.getElementById("nomeProjeto").value;
const descricao = document.getElementById("descricaoProjeto").value;
const github = document.getElementById("githubProjeto").value;
const vercel = document.getElementById("vercelProjeto").value;
const file = document.getElementById("imagemProjeto").files[0];

if(!file){

const novoProjeto = {

id: Date.now(),
nome,
descricao,
imagem:"",
github,
vercel

};

projetos.push(novoProjeto);

salvarProjetos();
mostrarProjetos();

return;

}

const reader = new FileReader();

reader.onload = function(e){

const novoProjeto = {

id: Date.now(),
nome,
descricao,
imagem: e.target.result,
github,
vercel

};

projetos.push(novoProjeto);

salvarProjetos();
mostrarProjetos();

};

reader.readAsDataURL(file);

}

function deletarProjeto(id){

projetos = projetos.filter(p => p.id !== id);

salvarProjetos();
mostrarProjetos();

}

function editarProjeto(id){

const projeto = projetos.find(p => p.id === id);

const novoNome = prompt("Novo nome", projeto.nome);
const novaDescricao = prompt("Nova descrição", projeto.descricao);

if(novoNome) projeto.nome = novoNome;
if(novaDescricao) projeto.descricao = novaDescricao;

salvarProjetos();
mostrarProjetos();

}

function salvarProjetos(){

localStorage.setItem("projetos", JSON.stringify(projetos));

}

document.addEventListener("DOMContentLoaded", function(){

carregarPortfolio();
mostrarProjetos();
mostrarFormacoes();
atualizarSaudacao();

});