import Switch from '@mui/material/Switch';
import { useState } from 'react';
import ModalHeader from './ModalHeader.jsx';
import PaymentTable from './PaymentTable.jsx';

const ModalContent = ({ loanTerm, results, paymentType }) => {
  const currentDate = new Date();
  const months = loanTerm * 12;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  
  const handleChange = (event) => setIsSwitchOn(event.target.checked);

  return (
    <div>
      <ModalHeader
        totalPayment={results.totalPayment}
        paymentType={paymentType}
        months={months}
        isSwitchOn={isSwitchOn}
        handleChange={handleChange}
      />
      <PaymentTable
        months={months}
        currentDate={currentDate}
        results={results}
        isSwitchOn={isSwitchOn}
        paymentType={paymentType}
      />
    </div>
  );
};

export default ModalContent;
