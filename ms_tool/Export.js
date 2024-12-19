import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';

export const handleExportEvent = (rows,columns, action) => {
    console.log('rows,', rows);
    console.log('action :1', action);
    if (action == 'downloadexcel')
        downloadObjectToExcel(rows,columns);
    if (action == 'printpdf')
        printPdf(rows);
    if (action == 'downloadpdf')
        downloadPdf(rows,columns);
    return true;
}
function downloadObjectToExcel(data,columns) {
    // Specify the columns you want to include in the Excel file
    const columnsToInclude = columns;

    // Filter the data to include only the specified columns
    data = data.map(item =>
    columnsToInclude.reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
    }, {})
    );
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = generateFileName() + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
async function printPdf(data){
    const headers = Object.keys(data[0]);
    console.log('printPdf :58', headers);

// Create an HTML element with a table and dynamic headers
const htmlContent = `
  <table border="1">
    <thead>
      <tr>
        ${headers.map(header => `<th>${header}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${data.map((data, index) => `
        <tr key=${index}>
          ${headers.map(header => `<td>${data[header]}</td>`).join('')}
        </tr>
      `).join('')}
    </tbody>
  </table>
`;
console.log('htmlContent :51', htmlContent);
const element = document.createElement('div');
element.innerHTML = htmlContent;
html2pdf(htmlContent)
.save('your-generated-pdf.pdf')
.then((pdfData) => {
  // Open the saved PDF in a new tab
  localStorage.setItem('generatedPdfData', JSON.stringify(pdfData));
//   window.open('pdf-viewer', '_blank');
  renderPdfFromLocalStorage();
});

}
function downloadPdf(data,columns){
    const headers = Object.keys(data[0]);
// Create an HTML element with a table and dynamic headers
const htmlContent = `
  <table border="1">
    <thead>
      <tr>
        ${headers.map(header => `<th>${header}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${data.map((data, index) => `
        <tr key=${index}>
          ${headers.map(header => `<td>${data[header]}</td>`).join('')}
        </tr>
      `).join('')}
    </tbody>
  </table>
`;

// Create a PDF from the HTML element
const element = document.createElement('div');
element.innerHTML = htmlContent;

html2pdf(element, {
  margin: 10,
  filename: generateFileName()+'.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
});
}



function generateFileName() {
    const slug = window.location.href.split('/').pop();;
    return slug + ' - ' + new Date();
}

const renderPdfFromLocalStorage = () => {
    // Retrieve the PDF data from localStorage
    const pdfData = JSON.parse(localStorage.getItem('generatedPdfData'));

    if (pdfData) {
      // Create a Blob from the PDF data
      const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

      // Create a Blob URL
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab
      window.open(pdfUrl, '_blank');

      // Scroll to the anchor element with ID 'pdf-viewer-anchor'
      document.getElementById('pdf-viewer-anchor').scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('No PDF data found in localStorage. Generate PDF first.');
    }
  };