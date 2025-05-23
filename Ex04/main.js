
class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
        this._salario = salario;
    }
    
    getNome(){
        return this._nome;
    }
    getIdade(){
        return this._idade;
    }
    getCargo(){
        return this._cargo;
    }
    getSalario(){
        return this._salario;
    }
    setNome(nome){
        this._nome = nome || this._nome;
    }
    setIdade(idade){
        this._idade = idade || this._idade;
    }
    setCargo(cargo){
        this._cargo = cargo || this._cargo
    }
    setSalario(salario){
        this._salario = salario || this._salario
    }
    toString() {
        return `${this._nome}, ${this._idade} anos, Cargo: ${this._cargo}, Salario: ${this._salario}`;
    }
}

let funcionarios = [];


document.getElementById("Funcionario Form").addEventListener("submit", (event) => {
    
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let idade = parseInt(document.getElementById("idade").value);
    let cargo = document.getElementById("cargo").value;
    let salario = parseInt(document.getElementById("salario").value);

    if (!nome || !cargo || isNaN(idade) || isNaN(salario) || idade < 18 || salario < 0){
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let funcionario = new Funcionario(nome, idade, cargo, salario);

    funcionarios.push(funcionario);

    atualizartabela();
    document.getElementById("Funcionario Form").reset();

    alert("Funcionário adicionado");
})


function atualizartabela(){

    let tabela = document.querySelector("#tabelaFuncionarios tbody");
    tabela.innerHTML = "";

    for (let index = 0; index < funcionarios.length; index++){

        let funcionario = funcionarios[index];

        let linha = tabela.insertRow();

        linha.insertCell(0).textContent = funcionario.getNome();
        linha.insertCell(1).textContent = funcionario.getIdade();
        linha.insertCell(2).textContent = funcionario.getCargo();
        linha.insertCell(3).textContent = funcionario.getSalario();

        let acoes = linha.insertCell(4);
        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.type = "button";
        botaoEditar.onclick = () => {
        
            document.getElementById("nome").value = funcionario.getNome();
            document.getElementById("idade").value = funcionario.getIdade();
            document.getElementById("cargo").value = funcionario.getCargo();
            document.getElementById("salario").value = funcionario.getSalario();
        
            funcionarios.splice(index, 1);
            
            atualizartabela();

            alert("Editando Funcionário");
        
        }
        acoes.appendChild(botaoEditar);

        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.type = "button";
        botaoExcluir.onclick = () => {

            funcionarios.splice(index, 1);
            
            atualizartabela();

            alert("Funcionário excluido");
        
        }
        acoes.appendChild(botaoExcluir);   
    }
}

function listarSalariosMaiores5000() {
    let lista = funcionarios.filter(f => f.getSalario() > 5000);
    document.getElementById("relatorio").innerHTML = `<p>Salários acima de R$5000: </p>${lista.map(f => f.toString()).join("<br/>")}`;
}

function calcularMediaSalarial() {
    let media = funcionarios.reduce((sum, f) => sum + f.getSalario(), 0) / funcionarios.length || 0;
    document.getElementById("relatorio").innerHTML = `<p>Média Salarial: R$${media.toFixed(2)}</p>`;
}

function listarCargosUnicos() {
    let cargos = [...new Set(funcionarios.map(f => f.getCargo()))];
    document.getElementById("relatorio").innerHTML = `<p>Cargos únicos: </p>${cargos.join("</br>")}`;
}

function listarNomesMaiusculos() {
    let nomes = funcionarios.map(f => f.getNome().toUpperCase());
    document.getElementById("relatorio").innerHTML = `<p>Nomes em Maiúsculo: </p>${nomes.join("</br>")}`;
}
