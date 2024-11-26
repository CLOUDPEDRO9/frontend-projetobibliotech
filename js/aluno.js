async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "sobrenome": document.querySelectorAll("input")[1].value,
        "dataNascimento": document.querySelectorAll("input")[2].value,
        "endereco": document.querySelectorAll("input")[3].value,
        "email": document.querySelectorAll("input")[4].value,
        "celular": Number(document.querySelectorAll("input")[5].value)
    }

console.log(alunoDTO)


    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }
    
        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaAlunos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/aluno");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeAlunos = await respostaServidor.json();

        criarTabelaAlunos(listaDeAlunos)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaAlunos(alunos) {
    const tabela = document.getElementById('corpoAluno');

    alunos.forEach(aluno => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const id = document.createElement('td');
        id.textContent = aluno.idAluno; // Preenche com o id do aluno


        const ra = document.createElement('td');
        ra.textContent = aluno.ra; // Preenche com a ra do aluno


        const nome = document.createElement('td');
        nome.textContent = aluno.nome; // Preenche com o nome do aluno

        const sobrenome = document.createElement('td');
        sobrenome.textContent = aluno.sobrenome; // Preenche com o sobrenome do aluno


        const dataNascimento = document.createElement('td');
        dataNascimento.textContent = new Date (aluno.dataNascimento).toLocaleDateString('pt-br'); // Preenche com a data de nascimento do aluno

        const endereco = document.createElement('td');
        endereco.textContent = aluno.endereco; // Preenche com o endereço do aluno

        const email = document.createElement('td');
        email.textContent = aluno.email; // Preenche com o emmail do aluno

        const celular = document.createElement('td');
        celular.textContent = aluno.celular; // Preenche com o celular do aluno


        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); // Cria o elemento <img>
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; // Define o caminho da imagem
        iconAtualizar.alt = 'Ícone de edição'; // Texto alternativo para acessibilidade


        const iconExcluir = document.createElement('img'); // Cria o elemento <img>
        iconExcluir.src = 'assets/icons/trash-fill.svg'; // Define o caminho da imagem
        iconExcluir.alt = 'Ícone de excluir'; // Texto alternativo para acessibilidade
        iconExcluir.addEventListener('click', () => excluirAluno(aluno.idAluno));


        //chamando
        linha.appendChild(id);
        linha.appendChild(ra);
        linha.appendChild(nome);
        linha.appendChild(sobrenome);
        linha.appendChild(dataNascimento);
        linha.appendChild(endereco);
        linha.appendChild(email);
        linha.appendChild(celular);
        tdAcoes.appendChild(iconAtualizar); // Adiciona o <img> dentro da célula <td>
        linha.appendChild(tdAcoes); // Adiciona a célula de imagem à linha
        tdAcoes.appendChild(iconExcluir); // Adiciona o <img> dentro da célula <td>

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(linha);

    });
}

async function excluirAluno(idAluno) {
    const url = `http://localhost:3333/delete/aluno/${idAluno}`;

    try {
        const response = await fetch(url, { method: 'DELETE' });

        if (response.ok) {
            alert('aluno removido com sucesso');
            window.location.reload();
        } else {
            const error = await response.json();
            alert(`Erro: ${error}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar excluir o aluno.');
    }
}    


