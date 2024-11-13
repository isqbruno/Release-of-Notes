# Área do Professor - Lançamento de Notas dos Alunos

Este projeto é uma aplicação simples que permite ao professor lançar e visualizar as notas dos alunos por meio de um formulário, além de gerar um relatório em PDF com as informações inseridas.

## Funcionalidades

1. **Lançamento de Notas dos Alunos**:
   - O formulário permite que o professor insira o nome do aluno, série, disciplina e notas para até quatro trimestres.
   - Após preencher os campos, o professor pode submeter o formulário, e os dados são exibidos em uma tabela na seção "Área do Aluno".
   
2. **Geração de Relatório em PDF**:
   - Um botão "Gerar PDF" está disponível para que o professor possa baixar um relatório das notas lançadas em formato PDF.
   - O PDF contém as informações de todos os alunos cadastrados na tabela e é gerado utilizando a biblioteca jsPDF e o plugin AutoTable.

## Estrutura do Código

### HTML

- O HTML cria a estrutura básica da página, com duas áreas principais:
  - **Área do Professor**: Onde o formulário de lançamento de notas está localizado.
  - **Área do Aluno**: Onde a tabela com as notas lançadas é exibida e onde está o botão para gerar o PDF.
  
### CSS

- O CSS estiliza a página com um design simples e moderno:
  - Estiliza o formulário e a tabela, deixando-os com bordas arredondadas e um leve sombreamento.
  - Define botões com efeitos de hover, para melhorar a experiência do usuário.
  - Garante responsividade em diferentes dispositivos.

### JavaScript

- **Evento de Submissão do Formulário**:
  - O código JavaScript captura o evento de submissão do formulário, previne o comportamento padrão e coleta os dados inseridos.
  - Os dados são então adicionados como uma nova linha na tabela da "Área do Aluno".
  - Após a inserção dos dados, o formulário é limpo para novas entradas.

- **Geração de PDF**:
  - A função `gerarPDF()` utiliza jsPDF e AutoTable para criar e formatar o PDF.
 ```js
function gerarPDF() {
    const { jsPDF } = window.jspdf; // Assegura que jsPDF está acessível
    const doc = new jsPDF();
    
    doc.text('Notas dos Alunos', 20, 10);
    
    const tableBody = document.getElementById('table-body');
    const rows = Array.from(tableBody.rows);

    const pdfRows = [['Nome', 'Série', 'Disciplina', 'Nota 1º Trimestre', 'Nota 2º Trimestre', 'Nota 3º Trimestre', 'Nota 4º Trimestre']];

    rows.forEach(row => {
        const cols = Array.from(row.cells).map(cell => cell.textContent);
        pdfRows.push(cols);
    });

    doc.autoTable({
        head: pdfRows.slice(0, 1),
        body: pdfRows.slice(1),
        startY: 20,
        margin: { horizontal: 10 },
    });

    // Salva o PDF
    doc.save('notas_alunos.pdf');
}
```

  - 
  - A tabela exibida na "Área do Aluno" é convertida em um formato que o AutoTable usa para preencher o PDF, garantindo que todas as informações estejam organizadas e formatadas.
  - Ao final, o PDF é salvo no dispositivo do usuário com o nome `notas_alunos.pdf`.

## Bibliotecas Utilizadas

- **jsPDF**: Biblioteca JavaScript para geração de PDFs no navegador.
- **jsPDF-AutoTable**: Plugin para criação de tabelas formatadas no PDF, facilitando a organização dos dados da tabela HTML no PDF.

## Como Executar o Projeto

1. Clone o repositório para o seu ambiente local.
2. Abra o arquivo `areaDoProfessor.html` em um navegador para visualizar e interagir com a aplicação.
3. Preencha os dados no formulário da "Área do Professor" e clique em "Lançar" para adicionar os dados à tabela.
4. Clique em "Gerar PDF" para baixar um relatório das notas lançadas.
