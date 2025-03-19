import React from 'react';
import '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css';

export default function Result({ results, activeTab }) {
  const hasDifferentiatedPayments = results.payments && results.payments.length > 0;

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
          Сумма ипотеки <span className='result-total'>{results.requiredLoanAmount.toLocaleString()} ₸</span>
        </span>
        <span>
        <span style={{
            width: "13px",
            height: "13px",
            backgroundColor: "#28a745",
            borderRadius: "50%",
            display: "inline-block"
          }}></span>
          Первоначальная <span className="result-initial">{results.downPayment.toLocaleString()} ₸</span>
        </span>
      </div>

      <div className="result">
        <h3>
          {activeTab === 'by-cost'
            ? 'СУММА ИПОТЕКИ, КОТОРАЯ ВАМ НУЖНА'
            : 'СУММА ИПОТЕКИ, КОТОРАЯ ВАМ ПОДХОДИТ'}
        </h3>
        <p>{results.requiredLoanAmount.toLocaleString()} ₸</p>
      </div>

      <div className="result-details">
        <p>
          Ежемесячный платеж <span>{results.monthlyPayment.toLocaleString()} ₸</span>
        </p>
        <p>
          Переплата <span>{results.overpayment.toLocaleString()} ₸</span>
        </p>
        <p>
          Итого к возврату <span>{results.totalPayment.toLocaleString()} ₸</span>
        </p>
        <p>
          Общий семейный доход не менее{' '}
          <span>{results.requiredIncome.toLocaleString()} ₸ в месяц</span>
        </p>

        {hasDifferentiatedPayments && (
          <>
            <p>
              Первый платеж <span>{results.payments[0].totalMonthlyPayment.toLocaleString()} ₸</span>
            </p>
            <p>
              Последний платеж{' '}
              <span>{results.payments[results.payments.length - 1].totalMonthlyPayment.toLocaleString()} ₸</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
