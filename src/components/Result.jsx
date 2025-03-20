import React from 'react';
import '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css';
import { useTranslation } from 'react-i18next';

export default function Result({ results, activeTab }) {
  const hasDifferentiatedPayments = results.payments && results.payments.length > 0;
  const {t} = useTranslation();

  return (
    <div className="result-section">
      <div className="progress-bar">
        <div
          className="bar loan-bar"
          style={{ width: `${results.loanPercentage}%` }}
        ></div>
        <div
          className="bar downpayment-bar"
          style={{ width: `${results.downPaymentPercentage}%` }}
        ></div>
        <div
          className="bar overpayment-bar"
          style={{ width: `${results.overPaymentPercantage}%` }}
        ></div>
      </div>
      <div className="bar-labels">
        <span>
          <span style={{
            width: "13px",
            height: "13px",
            backgroundColor: "#007bff",
            borderRadius: "50%",
            display: "inline-block"
          }}></span>
          {t('Сумма ипотеки')} <span className='result-total'>{results.requiredLoanAmount.toLocaleString()} ₸</span>
        </span>
        <span>
        <span style={{
            width: "13px",
            height: "13px",
            backgroundColor: "#28a745",
            borderRadius: "50%",
            display: "inline-block"
          }}></span>
          {t('Первоначальная')} <span className="result-initial">{results.downPayment.toLocaleString()} ₸</span>
        </span>
        <span>
        <span style={{
            width: "13px",
            height: "13px",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
            display: "inline-block"
          }}></span>
          {t('Переплата')} <span className="result-initial">{results.overpayment.toLocaleString()} ₸</span>
        </span>
      </div>
      <div className="result">
        <h3>
          {activeTab === 'by-cost'
            ? t('СУММА ИПОТЕКИ, КОТОРАЯ ВАМ НУЖНА')
            : t('СУММА ИПОТЕКИ, КОТОРАЯ ВАМ ПОДХОДИТ')}
        </h3>
        <p>{results.requiredLoanAmount.toLocaleString()} ₸</p>
      </div>

      <div className="result-details">
        <p>
          {t('Ежемесячный платеж')} <span>{results.monthlyPayment.toLocaleString()} ₸</span>
        </p>
        <p>
          {t('Переплата')} <span>{results.overpayment.toLocaleString()} ₸</span>
        </p>
        <p>
          {t('Итого к возврату')} <span>{results.totalPayment.toLocaleString()} ₸</span>
        </p>
        <p>
          {t('Общий семейный доход не менее')}{' '}
          <span>{results.requiredIncome.toLocaleString()} ₸ {t('в месяц')}</span>
        </p>

        {hasDifferentiatedPayments && (
          <>
            <p>
              {t('Первый платеж')} <span>{results.payments[0].totalMonthlyPayment.toLocaleString()} ₸</span>
            </p>
            <p>
             {t('Последний платеж')}{' '}
              <span>{results.payments[results.payments.length - 1].totalMonthlyPayment.toLocaleString()} ₸</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
