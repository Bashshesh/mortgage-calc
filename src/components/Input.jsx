import React, { useState, useEffect } from 'react';
import '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css';

export default function Input({
    loanAmount, setLoanAmount,
    monthlyPaymentInput, setMonthlyPaymentInput,
    downPaymentPercent, setDownPaymentPercent,
    loanTerm, setLoanTerm,
    interestRate, setInterestRate,
    paymentType, setPaymentType,
    results, activeTab, setActiveTab
  })
   {
    
    return (


    <div className="input-section">
          {activeTab === 'by-cost' ? (
            <div id="by-cost-inputs">
              <label>СУММА КРЕДИТА</label>
              <div className="input-group">
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
                <span>₸</span>
              </div>
            </div>
          ) : (
            <div id="by-payment-inputs">
              <label>Я ГОТОВ ПЛАТИТЬ (ЕЖЕМЕСЯЧНО)</label>
              <div className="input-group">
                <input
                  type="number"
                  value={monthlyPaymentInput}
                  onChange={(e) =>
                    setMonthlyPaymentInput(Number(e.target.value))
                  }
                />
                <span>₸</span>
              </div>
            </div>
          )}

          <label>ПЕРВОНАЧАЛЬНЫЙ ВЗНОС</label>
          <div className="input-group">
            <input
              type="number"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            />
            <span>%</span>
            <span>{results.downPayment.toLocaleString()} ₸</span>
          </div>

          <label>СРОК</label>
          <div className="input-group">
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            >
              <option value="1">1 лет</option>
              <option value="3">3 лет</option>
              <option value="5">5 лет</option>
              <option value="7">7 лет</option>            
              <option value="10">10 лет</option>
              <option value="15">15 лет</option>
              <option value="20">20 лет</option>
            </select>
          </div>

          <label>СТАВКА</label>
          <div className="input-group">
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <span>%</span>
          </div>

          <label>ТИП ПЛАТЕЖА</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="paymentType"
                value="annuity"
                checked={paymentType === 'annuity'}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              АННУИТЕТ
            </label>
            <label>
              <input
                type="radio"
                name="paymentType"
                value="differentiated"
                checked={paymentType === 'differentiated'}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              ДИФФЕРЕНЦИРОВАННЫЙ
            </label>
          </div>
        </div>


    );
}
