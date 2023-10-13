import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import RestingLocationReport from './resting-location';
import { Button } from '@mui/material';

function RestingLocationsPage() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Button onClick={handlePrint} variant='outlined' color='info'>Download as pdf</Button>
      <RestingLocationReport />
    </>
  );
}

export default RestingLocationsPage;
