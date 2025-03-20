import { useState, useEffect } from 'react';
import { calculateMortgage } from '../utils/calculations';

export const useMortgageCalculator = () => {
  const [activeTab, setActiveTab] = useState('by-cost');
  const [loanAmount, setLoanAmount] = useState(100000); // Numeric value for calculations
  const [numericLoanAmount, setNumericLoanAmount] = useState("100 000"); // Formatted string for display
  const [monthlyPaymentInput, setMonthlyPaymentInput] = useState(200000);
  const [numericMonthlyPaymentInput, setNumericMonthlyPaymentInput] = useState("200 000"); // Formatted string for display
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [loanTerm, setLoanTerm] = useState(5);
  const [interestRate, setInterestRate] = useState(12.5);
  const [paymentType, setPaymentType] = useState('annuity');

  const [results, setResults] = useState({
    requiredLoanAmount: 0,
    downPayment: 0,
    monthlyPayment: 0,
    overpayment: 0,
    totalPayment: 0,
    requiredIncome: 0,
    loanPercentage: 0,
    downPaymentPercentage: 0,
  });

  useEffect(() => {
    setResults(
      calculateMortgage({
        activeTab,
        loanAmount,
        monthlyPaymentInput,
        downPaymentPercent,
        loanTerm,
        interestRate,
        paymentType,
      })
    );
  }, [
    activeTab,
    loanAmount,
    monthlyPaymentInput,
    downPaymentPercent,
    loanTerm,
    interestRate,
    paymentType,
  ]);

  return {
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
  };
};