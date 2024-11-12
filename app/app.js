// Adiciona um evento de escuta ao formulário
document.getElementById('notaForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Coleta os dados do formulário
    const nomeAluno = document.getElementById('nome-aluno').value;
    const serie = document.getElementById('serie').value;
    const disciplina = document.getElementById('disciplina').value;
    const nota1 = document.getElementById('nota1').value;
    const nota2 = document.getElementById('nota2').value;
    const nota3 = document.getElementById('nota3').value;
    const nota4 = document.getElementById('nota4').value;

    // Cria uma nova linha na tabela da área do aluno
    const tableBody = document.getElementById('table-body');
    const newRow = tableBody.insertRow();

    newRow.insertCell(0).textContent = nomeAluno;
    newRow.insertCell(1).textContent = serie;
    newRow.insertCell(2).textContent = disciplina;
    newRow.insertCell(3).textContent = nota1;
    newRow.insertCell(4).textContent = nota2;
    newRow.insertCell(5).textContent = nota3;
    newRow.insertCell(6).textContent = nota4;

    // Limpa o formulário após o envio
    document.getElementById('notaForm').reset();
});

// Função para gerar o PDF
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
