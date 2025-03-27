import React from 'react';
import { useMortgageCalculator } from './hooks/usecalc.jsx'; 
import Input from './components/Input';
import Result from './components/Result';
import Tabs from './components/Tabs';
import './App.css';
import Modal from './components/modal.jsx';
import ModalContent from './components/Schedule.jsx';
import { useTranslation } from 'react-i18next';
import Programs from './components/programs.jsx';
import LngButtons from './components/lngButtons.jsx';

const App = () => {
  const {
    activeTab, setActiveTab,
    loanAmount, setLoanAmount,
    numericLoanAmount, setNumericLoanAmount,
    monthlyPaymentInput, setMonthlyPaymentInput,
    numericMonthlyPaymentInput, setNumericMonthlyPaymentInput,
    downPaymentPercent, setDownPaymentPercent,
    loanTerm, setLoanTerm,
    interestRate, setInterestRate,
    paymentType, setPaymentType,
    results,
    activeProgramConfig,
    handleProgramChange,
  } = useMortgageCalculator();

  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  // Передаем конфигурацию напрямую в хук
  const onProgramChange = (config) => {
    handleProgramChange(config); // Просто передаем объект конфигурации
  };

  return (
    <div className="calculator">
      <LngButtons />
      <Tabs activeTab={activeTab} handleTabSwitch={setActiveTab} />
      <div className="calculator-content">
        <Input
          {...{
            numericMonthlyPaymentInput, setNumericMonthlyPaymentInput,
            numericLoanAmount, setNumericLoanAmount,
            loanAmount, setLoanAmount,
            monthlyPaymentInput, setMonthlyPaymentInput,
            downPaymentPercent, setDownPaymentPercent,
            loanTerm, setLoanTerm,
            interestRate, setInterestRate,
            paymentType, setPaymentType,
            results, activeTab, setActiveTab,
            maxLoanAmount: activeProgramConfig.maxLoanAmount,
            maxTerm: activeProgramConfig.maxTerm,
            minDownPaymentPercent: activeProgramConfig.minDownPaymentPercent,
            interestRateRange: activeProgramConfig.interestRateRange, // Объект { min, max }
          }}
        />
        <Result results={results} activeTab={activeTab} />
      </div>
      <div className="buttons">
        <button onClick={() => alert('Заявка подана!')}>{t('Подать заявку')}</button>
        <button onClick={() => setOpen(true)}>{t('Показать таблицу')}</button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="modal-table-container">
          <ModalContent loanTerm={loanTerm} results={results} paymentType={paymentType} />
        </div>
      </Modal>

      <Programs onProgramChange={onProgramChange} />
    </div>
  );
};

export default App;