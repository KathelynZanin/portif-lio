from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


projetos = [
    {
        "id": 1,
        "nome": "API de Censo 2022",
        "descricao": "Projeto em grupo com dados do censo 2022.",
        "tecnologias": ["Python", "Flask", "MySQL"],
        "imagem": "img/api.webp",
        "github": "https://github.com/KathelynZanin",
        "site": "https://api-censo-2022.vercel.app"
    },
    {
        "id": 2,
        "nome": "Doces Simples",
        "descricao": "Site com receitas simples de doces.",
        "tecnologias": ["HTML", "CSS", "JavaScript"],
        "imagem": "img/doces.webp",
        "github": "https://github.com/KathelynZanin",
        "site": "https://doces-simples.vercel.app"
    }
]

formacoes = [
    {
        "id": 1,
        "instituicao": "FATEC",
        "curso": "Desenvolvimento de Software Multiplataforma",
        "status": "Em andamento - 2º semestre"
    }
]

certificados = [
    {
        "id": 1,
        "nome": "Escola de Inovadores",
        "carga_horaria": 40,
        "ano": 2025,
        "instituicao": "INOVA CPS"
    },
    {
        "id": 2,
        "nome": "Técnico em Administração",
        "carga_horaria": 800,
        "ano": 2024,
        "instituicao": "ETEC"
    }
]

competencias = {
    "tecnicas": ["HTML5", "CSS3", "JavaScript", "Python", "Flask", "MySQL", "Git", "GitHub", "Bootstrap", "AWS", "Docker", "Vercel"],
    "interpessoais": ["Comunicação", "Organização", "Trabalho em equipe", "Pensamento analítico", "Aprendizado rápido"]
}

proximo_id = {"projetos": 3, "formacoes": 2, "certificados": 3}


@app.route("/")
def index():
    return jsonify({
        "mensagem": "API do Portfólio da Kathelyn está funcionando!",
        "rotas_disponíveis": [
            "GET  /projetos", "POST /projetos", "PUT  /projetos/<id>", "DELETE /projetos/<id>",
            "GET  /formacoes", "POST /formacoes", "PUT  /formacoes/<id>", "DELETE /formacoes/<id>",
            "GET  /certificados", "POST /certificados", "PUT  /certificados/<id>", "DELETE /certificados/<id>",
            "GET  /competencias", "PUT  /competencias"
        ]
    })

# ── PROJETOS ──────────────────────────────────────────────
@app.route("/projetos", methods=["GET"])
def listar_projetos():
    return jsonify(projetos), 200

@app.route("/projetos", methods=["POST"])
def criar_projeto():
    dados = request.get_json()
    if not dados or not dados.get("nome"):
        return jsonify({"erro": "O campo 'nome' é obrigatório."}), 400
    novo = {
        "id": proximo_id["projetos"],
        "nome": dados.get("nome"),
        "descricao": dados.get("descricao", ""),
        "tecnologias": dados.get("tecnologias", []),
        "imagem": dados.get("imagem", ""),
        "github": dados.get("github", ""),
        "site": dados.get("site", "")
    }
    proximo_id["projetos"] += 1
    projetos.append(novo)
    return jsonify(novo), 201

@app.route("/projetos/<int:projeto_id>", methods=["PUT"])
def atualizar_projeto(projeto_id):
    projeto = next((p for p in projetos if p["id"] == projeto_id), None)
    if not projeto:
        return jsonify({"erro": f"Projeto com id {projeto_id} não encontrado."}), 404
    dados = request.get_json()
    projeto["nome"]        = dados.get("nome",        projeto["nome"])
    projeto["descricao"]   = dados.get("descricao",   projeto["descricao"])
    projeto["tecnologias"] = dados.get("tecnologias", projeto["tecnologias"])
    projeto["imagem"]      = dados.get("imagem",      projeto["imagem"])
    projeto["github"]      = dados.get("github",      projeto["github"])
    projeto["site"]        = dados.get("site",        projeto["site"])
    return jsonify(projeto), 200

@app.route("/projetos/<int:projeto_id>", methods=["DELETE"])
def deletar_projeto(projeto_id):
    global projetos
    antes = len(projetos)
    projetos = [p for p in projetos if p["id"] != projeto_id]
    if len(projetos) == antes:
        return jsonify({"erro": f"Projeto com id {projeto_id} não encontrado."}), 404
    return jsonify({"mensagem": f"Projeto {projeto_id} removido com sucesso."}), 200

# ── FORMAÇÕES ─────────────────────────────────────────────
@app.route("/formacoes", methods=["GET"])
def listar_formacoes():
    return jsonify(formacoes), 200

@app.route("/formacoes", methods=["POST"])
def criar_formacao():
    dados = request.get_json()
    if not dados or not dados.get("instituicao"):
        return jsonify({"erro": "O campo 'instituicao' é obrigatório."}), 400
    nova = {
        "id": proximo_id["formacoes"],
        "instituicao": dados.get("instituicao"),
        "curso": dados.get("curso", ""),
        "status": dados.get("status", "")
    }
    proximo_id["formacoes"] += 1
    formacoes.append(nova)
    return jsonify(nova), 201

@app.route("/formacoes/<int:formacao_id>", methods=["PUT"])
def atualizar_formacao(formacao_id):
    formacao = next((f for f in formacoes if f["id"] == formacao_id), None)
    if not formacao:
        return jsonify({"erro": f"Formação com id {formacao_id} não encontrada."}), 404
    dados = request.get_json()
    formacao["instituicao"] = dados.get("instituicao", formacao["instituicao"])
    formacao["curso"]       = dados.get("curso",       formacao["curso"])
    formacao["status"]      = dados.get("status",      formacao["status"])
    return jsonify(formacao), 200

@app.route("/formacoes/<int:formacao_id>", methods=["DELETE"])
def deletar_formacao(formacao_id):
    global formacoes
    antes = len(formacoes)
    formacoes = [f for f in formacoes if f["id"] != formacao_id]
    if len(formacoes) == antes:
        return jsonify({"erro": f"Formação com id {formacao_id} não encontrada."}), 404
    return jsonify({"mensagem": f"Formação {formacao_id} removida com sucesso."}), 200

# ── CERTIFICADOS ──────────────────────────────────────────
@app.route("/certificados", methods=["GET"])
def listar_certificados():
    return jsonify(certificados), 200

@app.route("/certificados", methods=["POST"])
def criar_certificado():
    dados = request.get_json()
    if not dados or not dados.get("nome"):
        return jsonify({"erro": "O campo 'nome' é obrigatório."}), 400
    novo = {
        "id": proximo_id["certificados"],
        "nome": dados.get("nome"),
        "carga_horaria": dados.get("carga_horaria", 0),
        "ano": dados.get("ano", 2025),
        "instituicao": dados.get("instituicao", "")
    }
    proximo_id["certificados"] += 1
    certificados.append(novo)
    return jsonify(novo), 201

@app.route("/certificados/<int:cert_id>", methods=["PUT"])
def atualizar_certificado(cert_id):
    cert = next((c for c in certificados if c["id"] == cert_id), None)
    if not cert:
        return jsonify({"erro": f"Certificado com id {cert_id} não encontrado."}), 404
    dados = request.get_json()
    cert["nome"]          = dados.get("nome",          cert["nome"])
    cert["carga_horaria"] = dados.get("carga_horaria", cert["carga_horaria"])
    cert["ano"]           = dados.get("ano",           cert["ano"])
    cert["instituicao"]   = dados.get("instituicao",   cert["instituicao"])
    return jsonify(cert), 200

@app.route("/certificados/<int:cert_id>", methods=["DELETE"])
def deletar_certificado(cert_id):
    global certificados
    antes = len(certificados)
    certificados = [c for c in certificados if c["id"] != cert_id]
    if len(certificados) == antes:
        return jsonify({"erro": f"Certificado com id {cert_id} não encontrado."}), 404
    return jsonify({"mensagem": f"Certificado {cert_id} removido com sucesso."}), 200

# ── COMPETÊNCIAS ──────────────────────────────────────────
@app.route("/competencias", methods=["GET"])
def listar_competencias():
    return jsonify(competencias), 200

@app.route("/competencias", methods=["PUT"])
def atualizar_competencias():
    dados = request.get_json()
    if dados.get("tecnicas"):
        competencias["tecnicas"] = dados["tecnicas"]
    if dados.get("interpessoais"):
        competencias["interpessoais"] = dados["interpessoais"]
    return jsonify(competencias), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)