import React from 'react';

const TicketPrintContent = ({ Slot, duration, totalAmount }) => (
  <div>
    <h2>Ticket Print</h2>
    <p>Slot Number - {Slot.slotNumber}</p>
    <p>Vehicle Number - {Slot.vehicleNumber}</p>
    <p>Duration - {duration}</p>
    <p>Amount - {totalAmount}</p>
    <p>Start Time - {Slot.startTime}</p>
    <p>End Time - {Slot.endTime}</p>
  </div>
);

export default TicketPrintContent;
