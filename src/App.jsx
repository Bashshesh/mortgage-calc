import React from 'react';
import { useMortgageCalculator } from './hooks/usecalc.jsx'; 
import Input from './components/Input';
import Result from './components/Result';
import Tabs from './components/Tabs';
import './App.css';
import Modal from './components/modal.jsx';
import ModalContent from './components/Schedule.jsx';
import { useTranslation } from 'react-i18next';

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
  const { i18n, t } = useTranslation();

  const [activeLanguage, setActiveLanguage] = React.useState(i18n.language || 'ru');

  function changeLanguage(e) {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    setActiveLanguage(newLang);
  }

  return (
    <div className="calculator">
      <div className='button-group-lng'>
        <button
          className={`button-lng ${activeLanguage === 'en' ? 'active' : ''}`}
          onClick={changeLanguage}
          value='en'
        >
          English
        </button>
        <button
          className={`button-lng ${activeLanguage === 'kz' ? 'active' : ''}`}
          onClick={changeLanguage}
          value='kz'
        >
          Қазақша
        </button>
        <button
          className={`button-lng ${activeLanguage === 'ru' ? 'active' : ''}`}
          onClick={changeLanguage}
          value='ru'
        >
          Русский
        </button>
        </div>
      <Tabs activeTab={activeTab} handleTabSwitch={setActiveTab} />
      <div className="calculator-content">
        <Input
          {...{ numericMonthlyPaymentInput, setNumericMonthlyPaymentInput, numericLoanAmount, setNumericLoanAmount, loanAmount, setLoanAmount, monthlyPaymentInput, setMonthlyPaymentInput, downPaymentPercent, setDownPaymentPercent, loanTerm, setLoanTerm, interestRate, setInterestRate, paymentType, setPaymentType, results, activeTab }}
        />
        <Result results={results} activeTab={activeTab} />
      </div>
      <div className="buttons">
        <button onClick={() => alert('Заявка подана!')}>{t('Подать заявку')}</button>
        <button onClick={() => setOpen(true)}>{t('Показать таблицу')}</button>
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
