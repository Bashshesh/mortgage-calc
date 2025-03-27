import { useState, useEffect } from 'react';
import { calculateMortgage } from '../utils/calculations';

export const useMortgageCalculator = () => {
  const [activeTab, setActiveTab] = useState('by-cost');
  const [loanAmount, setLoanAmount] = useState(100000);
  const [numericLoanAmount, setNumericLoanAmount] = useState("100 000");
  const [monthlyPaymentInput, setMonthlyPaymentInput] = useState(2000);
  const [numericMonthlyPaymentInput, setNumericMonthlyPaymentInput] = useState("2 000");
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [loanTerm, setLoanTerm] = useState(5);
  const [interestRate, setInterestRate] = useState(12.5);
  const [paymentType, setPaymentType] = useState('annuity');
  const [activeProgramConfig, setActiveProgramConfig] = useState({
    maxLoanAmount: undefined,
    maxTerm: undefined,
    minDownPaymentPercent: undefined,
    interestRateRange: undefined,
  });

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

  const formatNumberWithSpaces = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Функция для применения ограничений, возвращает скорректированные значения без вызова setState
  const applyConstraints = (currentValues) => {
    let { loanAmount, loanTerm, downPaymentPercent, interestRate } = currentValues;

    if (activeProgramConfig.maxLoanAmount !== undefined && loanAmount > activeProgramConfig.maxLoanAmount) {
      loanAmount = activeProgramConfig.maxLoanAmount;
    }

    if (activeProgramConfig.maxTerm !== undefined && loanTerm > activeProgramConfig.maxTerm) {
      loanTerm = activeProgramConfig.maxTerm;
    }

    if (activeProgramConfig.minDownPaymentPercent !== undefined && downPaymentPercent < activeProgramConfig.minDownPaymentPercent) {
      downPaymentPercent = activeProgramConfig.minDownPaymentPercent;
    }

    if (activeProgramConfig.interestRateRange !== undefined) {
      const { min, max } = activeProgramConfig.interestRateRange;
      if (interestRate < min) {
        interestRate = min;
      } else if (interestRate > max) {
        interestRate = max;
      }
    }

    return { loanAmount, loanTerm, downPaymentPercent, interestRate };
  };

  // Обновление результатов и применение ограничений
  useEffect(() => {
    const constrainedValues = applyConstraints({
      loanAmount,
      loanTerm,
      downPaymentPercent,
      interestRate,
    });

    // Обновляем состояния только если значения изменились
    if (constrainedValues.loanAmount !== loanAmount) {
      setLoanAmount(constrainedValues.loanAmount);
      setNumericLoanAmount(formatNumberWithSpaces(constrainedValues.loanAmount));
    }
    if (constrainedValues.loanTerm !== loanTerm) {
      setLoanTerm(constrainedValues.loanTerm);
    }
    if (constrainedValues.downPaymentPercent !== downPaymentPercent) {
      setDownPaymentPercent(constrainedValues.downPaymentPercent);
    }
    if (constrainedValues.interestRate !== interestRate) {
      setInterestRate(constrainedValues.interestRate);
    }

    // Выполняем расчеты с откорректированными значениями
    setResults(
      calculateMortgage({
        activeTab,
        loanAmount: constrainedValues.loanAmount,
        monthlyPaymentInput,
        downPaymentPercent: constrainedValues.downPaymentPercent,
        loanTerm: constrainedValues.loanTerm,
        interestRate: constrainedValues.interestRate,
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
    activeProgramConfig,
  ]);

  const handleProgramChange = (config) => {
    setActiveProgramConfig({
      maxLoanAmount: config.maxLoanAmount,
      maxTerm: config.maxTerm,
      minDownPaymentPercent: config.minDownPaymentPercent,
      interestRateRange: config.interestRateRange,
    });
  };

  return {
    activeTab,
    setActiveTab,
    loanAmount,
    setLoanAmount,
    numericLoanAmount,
    setNumericLoanAmount,
    monthlyPaymentInput,
    setMonthlyPaymentInput,
    numericMonthlyPaymentInput,
    setNumericMonthlyPaymentInput,
    downPaymentPercent,
    setDownPaymentPercent,
    loanTerm,
    setLoanTerm,
    interestRate,
    setInterestRate,
    paymentType,
    setPaymentType,
    results,
    activeProgramConfig,
    handleProgramChange,
  };
};