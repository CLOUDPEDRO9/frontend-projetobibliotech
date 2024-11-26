async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const EmprestimoDTO = {
        "idAluno": document.querySelectorAll("input")[0].value,
        "idLivro": document.querySelectorAll("input")[1].value,
        "dataEmprestimo": date(document.querySelectorAll("input")[2].value),
        "dataDevolucao": date(document.querySelectorAll("input")[3].value),
        "statusEmprestimo": document.querySelectorAll("input")[4].value,
    }

console.log(EmprestimoDTO)


    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/emprestimo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EmprestimoDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }
    
        alert("Emprestimo cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaEmprestimos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/emprestimo");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeEmprestimos = await respostaServidor.json();

        criarTabelaEmprestimos(listaDeEmprestimos)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaEmprestimos(emprestimos) {
    const tabela = document.getElementById('corpoEmprestimo');

    emprestimos.forEach(emprestimo => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Coluna do ID do Pedido
        const id = document.createElement('td');
        id.textContent = emprestimo.idEmprestimo;

        const idAluno = document.createElement('td');
        idAluno.textContent = emprestimo.idAluno;
        idAluno.hidden = true;

        const nomeAluno = document.createElement('td');
        nomeAluno.textContent = emprestimo.nomeAluno;

        const idLivro = document.createElement('td');
        idLivro.textContent = emprestimo.idLivro;
        idLivro.hidden = true;

        const tituloLivro = document.createElement('td');
        tituloLivro.textContent = emprestimo.tituloLivro;
        
        const dataEmprestimo = document.createElement('td');
        dataEmprestimo.textContent = new Date (emprestimo.dataEmprestimo).toLocaleDateString('pt-br');

        const dataDevolucao = document.createElement('td');
        dataDevolucao.textContent = new Date (emprestimo.dataDevolucao).toLocaleDateString('pt-br');

        const statusEmprestimo = document.createElement('td');
        statusEmprestimo.textContent = emprestimo.statusEmprestimo;

        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); // Cria o elemento <img>
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; // Define o caminho da imagem
        iconAtualizar.alt = 'Ícone de edição'; // Texto alternativo para acessibilidade


        const iconExcluir = document.createElement('img'); // Cria o elemento <img>
        iconExcluir.src = 'assets/icons/trash-fill.svg'; // Define o caminho da imagem
        iconExcluir.alt = 'Ícone de excluir'; // Texto alternativo para acessibilidade
        iconExcluir.addEventListener('click', () => excluirEmprestimo(emprestimo.idEmprestimo));


        linha.appendChild(id);
        linha.appendChild(idAluno);
        linha.appendChild(nomeAluno);
        linha.appendChild(idLivro);
        linha.appendChild(tituloLivro);
        linha.appendChild(dataEmprestimo);
        linha.appendChild(dataDevolucao);
        linha.appendChild(statusEmprestimo);
        tdAcoes.appendChild(iconAtualizar); // Adiciona o <img> dentro da célula <td>
        linha.appendChild(tdAcoes); // Adiciona a célula de imagem à linha
        tdAcoes.appendChild(iconExcluir); // Adiciona o <img> dentro da célula <td>

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(linha);

    });
}

async function excluirEmprestimo(idEmprestimo) {
    const url = `http://localhost:3333/delete/emprestimo/${idEmprestimo}`;

    try {
        const response = await fetch(url, { method: 'DELETE' });

        if (response.ok) {
            alert('Emprestimo removido com sucesso');
            window.location.reload();
        } else {
            const error = await response.json();
            alert(`Erro: ${error}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar excluir o Emprestimo.');
    }
}
