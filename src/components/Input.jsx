import React from 'react';
import '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css';
import { useTranslation } from 'react-i18next';

export default function Input({
  loanAmount, setLoanAmount,
  monthlyPaymentInput, setMonthlyPaymentInput,
  downPaymentPercent, setDownPaymentPercent,
  loanTerm, setLoanTerm,
  interestRate, setInterestRate,
  paymentType, setPaymentType,
  results, activeTab, setActiveTab,
  numericLoanAmount, setNumericLoanAmount,
  numericMonthlyPaymentInput, setNumericMonthlyPaymentInput
}) {
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
  const {t} = useTranslation();

  const handleInputChange = (event) => {
    const rawValue = removeNonNumeric(event.target.value); //
    const numericValue = Number(rawValue); 
    setLoanAmount(numericValue);
    setNumericLoanAmount(addCommas(rawValue));
    setMonthlyPaymentInput(numericValue);
    setNumericMonthlyPaymentInput(addCommas(rawValue));
  };

  return (
    <div className="input-section">
      {activeTab === 'by-cost' ? (
        <div id="by-cost-inputs">
          <label>{t('СУММА КРЕДИТА')}</label>
          <div className="input-group">
            <input
              type="text"
              value={numericLoanAmount}
              onChange={handleInputChange}
            />
            <span>₸</span>
          </div>
        </div>
      ) : (
        <div id="by-payment-inputs">
          <label>{t('Я ГОТОВ ПЛАТИТЬ (ЕЖЕМЕСЯЧНО)')}</label>
          <div className="input-group">
            <input
              type="text"
              value={numericMonthlyPaymentInput}
              onChange={handleInputChange}
            />
            <span>₸</span>
          </div>
        </div>
      )}

      <label>{t('ПЕРВОНАЧАЛЬНЫЙ ВЗНОС')}</label>
      <div className="input-group">
        <input
          type="number"
          value={downPaymentPercent}
          onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
        />
        <span>%</span>
        <span>{results.downPayment.toLocaleString()} ₸</span>
      </div>

      <label>{t('СРОК')}</label>
      <div className="input-group">
        <select
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
        >
          <option value="1">1 {t('лет')}</option>
          <option value="3">3 {t('лет')}</option>
          <option value="5">5 {t('лет')}</option>
          <option value="7">7 {t('лет')}</option>
          <option value="10">10 {t('лет')}</option>
          <option value="15">15 {t('лет')}</option>
          <option value="20">20 {t('лет')}</option>
        </select>
      </div>

      <label>{t('СТАВКА')}</label>
      <div className="input-group">
        <input
          type="number"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
        <span>%</span>
      </div>

      <label>{t('ТИП ПЛАТЕЖА')}</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="paymentType"
            value="annuity"
            checked={paymentType === 'annuity'}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          {t('АННУИТЕТ')}
        </label>
        <label>
          <input
            type="radio"
            name="paymentType"
            value="differentiated"
            checked={paymentType === 'differentiated'}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          {t('ДИФФЕРЕНЦИРОВАННЫЙ')}
        </label>
      </div>
    </div>
  );
}