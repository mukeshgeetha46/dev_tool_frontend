// HtmlToPdfConverter.js
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import * as XLSX from 'xlsx';

class HtmlToPdfConverter extends React.Component {

  constructor(props) {
    super(props);
    this.data = props.data;
    this.reportName = props.reportName;
    this.fileFormats = props.fileFormats;
  }

  generatePdf = async () => {
    // Create a temporary iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(this.data);
    iframeDocument.close();

    // Wait for iframe content to load
    await new Promise(resolve => iframe.onload = resolve);

    // Trigger print dialog for the iframe
    iframe.contentWindow.print();

    // Wait for a short delay for the print dialog to appear
    await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed

    // Capture printed content
    // const pdf = new jsPDF();
    // pdf.text(10, 10, 'Sample PDF from printed content'); // Add some sample text to the PDF
    // pdf.save('printed-content.pdf'); // Save PDF

    // Remove the iframe after generating PDF
    document.body.removeChild(iframe);
  };
  generateExcel = async () => {
  
    // Create a temporary div element to hold the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.data;
  
    // Get the table element from the div
    const table = tempDiv.querySelector('#pdf-content');
  
    // Convert table to worksheet
    const ws = XLSX.utils.table_to_sheet(table);
  
    // Create workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const currentDate = new Date(); // Format: YYYYMMDDHHmmss
    const filename = `${this.reportName || 'Report'}_${currentDate}.xlsx`;
  
    // Save workbook as Excel file
    XLSX.writeFile(wb, filename);
  };

  render() {
    return (
      <MenuList id="split-button-menu" autoFocusItem>
        {(!this.fileFormats || this.fileFormats.includes('pdf'))&&
        <MenuItem>
          <span style={{ width: 200, textAlign: 'left' }} onClick={() => this.generatePdf('print')}>
            Print PDF
          </span>
        </MenuItem>}
        {(!this.fileFormats || this.fileFormats.includes('xlsx'))&&
        <MenuItem>
          <span style={{ width: 200, textAlign: 'left' }} onClick={() => this.generateExcel('download')}>
            Download Excel
          </span>
        </MenuItem>}
      </MenuList>
    );
  }
}

export default HtmlToPdfConverter;
