async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value,
        "autor": document.querySelectorAll("input")[1].value,
        "editora": document.querySelectorAll("input")[2].value,
        "anoPublicacao": Number(document.querySelectorAll("input")[3].value),
        "isbn": document.querySelectorAll("input")[4].value,
        "quantTotal": Number(document.querySelectorAll("input")[5].value),
        "quantDisponivel": Number(document.querySelectorAll("input")[6].value),
        "valorAquisicao": Number(document.querySelectorAll("input")[7].value),
        "statusLivroEmprestado": document.querySelectorAll("input")[8].value,
    }

console.log(livroDTO)


    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/livro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }
    
        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaLivros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/livro");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeLivros = await respostaServidor.json();

        criarTabelaLivros(listaDeLivros)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaLivros(Livros) {
    const tabela = document.getElementById('corpoLivro');

    Livros.forEach(livro => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const id = document.createElement('td');
        id.textContent = livro.idLivro;


        const titulo = document.createElement('td');
        titulo.textContent = livro.titulo;


        const autor = document.createElement('td');
        autor.textContent = livro.autor;

        const editora = document.createElement('td');
        editora.textContent = livro.editora;


        const anoPublicacao = document.createElement('td');
        anoPublicacao.textContent = livro.anoPublicacao;

        const isbn = document.createElement('td');
        isbn.textContent = livro.isbn;

        const quantTotal = document.createElement('td');
        quantTotal.textContent = livro.quantTotal;

        const quantDisponivel = document.createElement('td');
        quantDisponivel.textContent = livro.quantDisponivel;

        const valorAquisicao = document.createElement('td');
        valorAquisicao.textContent = livro.valorAquisicao;

        const statusLivroEmprestado = document.createElement('td');
        statusLivroEmprestado.textContent = livro.statusLivroEmprestado;


        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); // Cria o elemento <img>
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; // Define o caminho da imagem
        iconAtualizar.alt = 'Ícone de edição'; // Texto alternativo para acessibilidade


        const iconExcluir = document.createElement('img'); // Cria o elemento <img>
        iconExcluir.src = 'assets/icons/trash-fill.svg'; // Define o caminho da imagem
        iconExcluir.alt = 'Ícone de excluir'; // Texto alternativo para acessibilidade


        //chamando
        linha.appendChild(id);
        linha.appendChild(titulo);
        linha.appendChild(autor);
        linha.appendChild(editora);
        linha.appendChild(anoPublicacao);
        linha.appendChild(isbn);
        linha.appendChild(quantTotal);
        linha.appendChild(quantDisponivel);
        linha.appendChild(valorAquisicao);
        linha.appendChild(statusLivroEmprestado);
        tdAcoes.appendChild(iconAtualizar); // Adiciona o <img> dentro da célula <td>
        linha.appendChild(tdAcoes); // Adiciona a célula de imagem à linha
        tdAcoes.appendChild(iconExcluir); // Adiciona o <img> dentro da célula <td>

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(linha);

    });
}
