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
import AltynBankConfig from './components/programs/config/AltynBankConfig.jsx';
import Bank2Config from './components/programs/config/Bank2Config.jsx';
import Bank3Config from './components/programs/config/Bank3Config.jsx';
import Bank4Config from './components/programs/config/Bank4Config.jsx';

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
  } = useMortgageCalculator();

  const [open, setOpen] = React.useState(false);
  const [activeProgramConfig, setActiveProgramConfig] = React.useState(null); // По умолчанию нет активной программы
  const { i18n, t } = useTranslation();

  const programConfigs = {
    1: AltynBankConfig,
    2: Bank2Config,
    3: Bank3Config,
    4: Bank4Config,
  };

  const handleProgramChange = (programId) => {
    setActiveProgramConfig(programConfigs[programId] || null); // Устанавливаем конфигурацию или null
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
            maxLoanAmount: activeProgramConfig?.maxLoanAmount,
            maxTerm: activeProgramConfig?.maxTerm,
            minDownPaymentPercent: activeProgramConfig?.minDownPaymentPercent,
            interestRateRange: activeProgramConfig?.interestRateRange,
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

      <Programs onProgramChange={handleProgramChange} />
    </div>
  );
};

export default App;