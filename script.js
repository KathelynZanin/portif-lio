window.onscroll = function() {
    var navbar = document.getElementById("navbar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};



 const hora = new Date().getHours();
        const saudacao = document.getElementById('saudacao');

        if (hora < 5) {
            saudacao.textContent = 'Boa madrugada!';
        } else if (hora < 12) {
            saudacao.textContent = 'Bom dia!';
        } else if (hora < 18) {
            saudacao.textContent = 'Boa tarde!';
        } else {
            saudacao.textContent = 'Boa noite!';
        }




        

        let modoAdmin = false;

let projetos = JSON.parse(localStorage.getItem("projetos")) || [

  {
    id: 1,
    nome: "API de Censo 2022",
    descricao: "Projeto em grupo com dados do censo e mapas interativos.",
    imagem: "img/api.webp",
    github: "https://github.com/OmniDevsOficial/API-Censo-2022",
    vercel: "https://api-censo-2022.vercel.app/"
  },
  {
    id: 2,
    nome: "Doces Simples",
    descricao: "Site com receitas de doces simples e fáceis de preparar.",
    imagem: "img/doces.webp",
    github: "https://github.com/KathelynZanin/Doces-Simples",
    vercel: "https://doces-simples.vercel.app/"
  }
];



function mostrarProjetos(){

const container = document.getElementById("lista-projetos");

container.innerHTML="";

projetos.forEach(projeto=>{

container.innerHTML += `

<div class="project fade-in">

<h3>${projeto.nome}</h3>

<img src="${projeto.imagem}">

<p>${projeto.descricao}</p>

<a href="${projeto.github}" target="_blank">GitHub</a>
<a href="${projeto.vercel}" target="_blank">Vercel</a>

${modoAdmin ? `
<div class="admin-buttons">

<button onclick="editarProjeto(${projeto.id})">✏ Editar</button>
<button onclick="deletarProjeto(${projeto.id})">🗑 Deletar</button>

</div>
`:''}

</div>

`;

});

}


function loginAdmin(){

let senha = prompt("Digite a senha de administrador");

if(senha === "1234"){

modoAdmin = true;

document.getElementById("admin-area").style.display = "block";

mostrarProjetos(); // 

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

const reader = new FileReader();

reader.onload = function(e){

const novoProjeto = {

id: Date.now(),

nome,

descricao,

imagem:e.target.result,

github,

vercel

};

projetos.push(novoProjeto);

salvarProjetos();

mostrarProjetos();

}

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

mostrarProjetos();

