// HtmlToPdfConverter.js
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class HtmlToPdfConverter extends React.Component {
  generatePdf = () => {
    
    const input = document.getElementById('pdf-content');
    
    // Make content visible
    input.style.display = 'block';

    html2canvas(input)
      .then((canvas) => {
console.log('canvas :13', canvas);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        // Open PDF in new tab
        pdf.output('dataurlnewwindow');
        
        // Hide content again
        input.style.display = 'none';
      });
  };

  render() {
    return (
      <div>
        <div id="pdf-content" style={{ display: 'none' }}>
          {/* Your HTML content here */}
          <h1>Hello, World!</h1>
          <p>This is the content that will be converted to PDF.</p>
        </div>
        <button onClick={this.generatePdf}>Open PDF for Print</button>
      </div>
    );
  }
}

export default HtmlToPdfConverter;
