import React, { Component } from 'react';
import TicketPrintContent from './TicketPrint'; // Adjust the import path as needed

class PrintComponent extends Component {
  render() {
    return (
      <div>
        <TicketPrintContent {...this.props} />
      </div>
    );
  }
}

export default PrintComponent;
