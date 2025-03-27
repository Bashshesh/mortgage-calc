import React from 'react';
import { useTranslation } from 'react-i18next';
import '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css';

export default function Input({
  loanAmount, setLoanAmount,
  monthlyPaymentInput, setMonthlyPaymentInput,
  downPaymentPercent, setDownPaymentPercent,
  loanTerm, setLoanTerm,
  interestRate, setInterestRate,
  paymentType, setPaymentType,
  results, activeTab, setActiveTab,
  numericLoanAmount, setNumericLoanAmount,
  numericMonthlyPaymentInput, setNumericMonthlyPaymentInput,
  maxLoanAmount, maxTerm, minDownPaymentPercent, interestRateRange,
}) {
  const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
  const { t } = useTranslation();

  const handleLoanAmountChange = (event) => {
    const rawValue = removeNonNumeric(event.target.value);
    const numericValue = Number(rawValue);

    if (maxLoanAmount !== undefined && numericValue > maxLoanAmount) {
      alert(`Максимальная сумма кредита: ${maxLoanAmount.toLocaleString()} ₸`);
      setLoanAmount(maxLoanAmount);
      setNumericLoanAmount(addCommas(maxLoanAmount));
    } else {
      setLoanAmount(numericValue);
      setNumericLoanAmount(addCommas(rawValue));
    }
  };

  const handleMonthlyPaymentChange = (event) => {
    const rawValue = removeNonNumeric(event.target.value);
    const numericValue = Number(rawValue);
    setMonthlyPaymentInput(numericValue);
    setNumericMonthlyPaymentInput(addCommas(rawValue));
  };

  const handleDownPaymentChange = (event) => {
    const value = Number(event.target.value);
    if (minDownPaymentPercent !== undefined && value < minDownPaymentPercent) {
      alert(`Минимальный первоначальный взнос: ${minDownPaymentPercent}%`);
      setDownPaymentPercent(minDownPaymentPercent);
    } else {
      setDownPaymentPercent(value);
    }
  };

  const handleLoanTermChange = (event) => {
    const value = Number(event.target.value);
    if (maxTerm !== undefined && value > maxTerm) {
      alert(`Максимальный срок кредита: ${maxTerm} лет`);
      setLoanTerm(maxTerm);
    } else {
      setLoanTerm(value);
    }
  };

  const handleInterestRateChange = (event) => {
    const value = Number(event.target.value);
    if (interestRateRange !== undefined) {
      const { min, max } = interestRateRange; // Деструктурируем объект
      if (value < min) {
        alert(`Минимальная ставка: ${min}%`);
        setInterestRate(min);
      } else if (value > max) {
        alert(`Максимальная ставка: ${max}%`);
        setInterestRate(max);
      } else {
        setInterestRate(value);
      }
    } else {
      setInterestRate(value);
    }
  };

  const downPayment = results?.downPayment?.toLocaleString() || '0';

  return (
    <div className="input-section">
      {activeTab === 'by-cost' ? (
        <div id="by-cost-inputs">
          <label>{t('СУММА КРЕДИТА')}</label>
          <div className="input-group">
            <input
              type="text"
              value={numericLoanAmount}
              onChange={handleLoanAmountChange}
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
              onChange={handleMonthlyPaymentChange}
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
          onChange={handleDownPaymentChange}
        />
        <span>%</span>
        <span>{downPayment} ₸</span>
      </div>

      <label>{t('СРОК')}</label>
      <div className="input-group">
        <select
          value={loanTerm}
          onChange={handleLoanTermChange}
        >
          {[1, 3, 5, 7, 10, 15, 20].map((term) => (
            <option key={term} value={term}>
              {term} {t('лет')}
            </option>
          ))}
        </select>
      </div>

      <label>{t('СТАВКА')}</label>
      <div className="input-group">
        <input
          type="number"
          step="0.1"
          value={interestRate}
          onChange={handleInterestRateChange}
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