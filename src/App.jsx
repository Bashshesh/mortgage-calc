import React from 'react';
import { useMortgageCalculator } from './hooks/usecalc.jsx'; 
import Input from './components/Input';
import Result from './components/Result';
import Tabs from './components/Tabs';
import './App.css';
import Modal from './components/modal.jsx';
import ModalContent from './components/Schedule.jsx';

const App = () => {
  const {
    activeTab, setActiveTab,
    loanAmount, setLoanAmount,
    monthlyPaymentInput, setMonthlyPaymentInput,
    downPaymentPercent, setDownPaymentPercent,
    loanTerm, setLoanTerm,
    interestRate, setInterestRate,
    paymentType, setPaymentType,
    results,
  } = useMortgageCalculator();

  const [open, setOpen] = React.useState(false);

  return (
    <div className="calculator">
      <Tabs activeTab={activeTab} handleTabSwitch={setActiveTab} />
      <div className="calculator-content">
        <Input
          {...{ loanAmount, setLoanAmount, monthlyPaymentInput, setMonthlyPaymentInput, downPaymentPercent, setDownPaymentPercent, loanTerm, setLoanTerm, interestRate, setInterestRate, paymentType, setPaymentType, results, activeTab }}
        />
        <Result results={results} activeTab={activeTab} />
      </div>
      <div className="buttons">
        <button onClick={() => alert('Заявка подана!')}>Подать заявку</button>
        <button onClick={() => setOpen(true)}>Показать таблицу</button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="modal-table-container">
          <ModalContent loanTerm={loanTerm} results={results} paymentType={paymentType}/>
        </div>
      </Modal>

    </div>
  );
};

export default App;
