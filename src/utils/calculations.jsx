export const calculateMortgage = ({
  activeTab,
  loanAmount,
  monthlyPaymentInput,
  downPaymentPercent,
  loanTerm,
  interestRate,
  paymentType,
}) => {
  let loanAmountCalc, monthlyPaymentCalc, requiredLoanAmount, downPayment;
  let payments = [];

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTerm * 12;

  if (activeTab === 'by-cost') {
    loanAmountCalc = loanAmount;
    downPayment = (downPaymentPercent / 100) * loanAmountCalc;
    requiredLoanAmount = loanAmountCalc - downPayment;

    if (paymentType === 'annuity') {
      monthlyPaymentCalc =
        requiredLoanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      var totalPayment = monthlyPaymentCalc * totalMonths; // Фиксируем totalPayment для аннуитета
    } else {
      // Дифференцированные платежи
      let remainingBalance = requiredLoanAmount;
      let principalPayment = requiredLoanAmount / totalMonths; // D (фиксированная часть основного долга)

      for (let i = 0; i < totalMonths; i++) {
        let interestPayment = remainingBalance * monthlyRate; // I (проценты на остаток)
        let totalMonthlyPayment = principalPayment + interestPayment; // M_i = D + I_i
        
        payments.push({
          month: i + 1,
          totalMonthlyPayment: Math.round(totalMonthlyPayment),
          interestPayment: Math.round(interestPayment),
          principalPayment: Math.round(principalPayment),
          remainingBalance: Math.round(remainingBalance - principalPayment),
        });

        remainingBalance -= principalPayment;
      }

      monthlyPaymentCalc = payments[0].totalMonthlyPayment; // Первый платеж (максимальный)
      totalPayment = payments.reduce((sum, p) => sum + p.totalMonthlyPayment, 0); // Считаем totalPayment через сумму платежей
    }
  } else {
    monthlyPaymentCalc = monthlyPaymentInput;

    if (paymentType === 'annuity') {
      requiredLoanAmount =
        (monthlyPaymentCalc * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
      
      totalPayment = monthlyPaymentCalc * totalMonths; // Фиксируем totalPayment для аннуитета
    } else {
      // Дифференцированные платежи (по известному ежемесячному платежу)
      let remainingBalance = 0;
      let principalPayment = monthlyPaymentCalc / 2; // Предположительная часть основного долга

      for (let i = 0; i < totalMonths; i++) {
        let interestPayment = remainingBalance * monthlyRate;
        remainingBalance += (monthlyPaymentCalc - interestPayment); 
      }

      requiredLoanAmount = remainingBalance; 
      totalPayment = payments.reduce((sum, p) => sum + p.totalMonthlyPayment, 0); // Считаем totalPayment через сумму платежей
    }

    loanAmountCalc = requiredLoanAmount / (1 - downPaymentPercent / 100);
    downPayment = loanAmountCalc - requiredLoanAmount;
  }

  const overpayment = totalPayment - requiredLoanAmount; // Правильный расчет переплаты
  const requiredIncome = monthlyPaymentCalc * 2;

  return {
    requiredLoanAmount: Math.round(requiredLoanAmount),
    downPayment: Math.round(downPayment),
    monthlyPayment: Math.round(monthlyPaymentCalc),
    overpayment: Math.round(overpayment),
    totalPayment: Math.round(totalPayment),
    requiredIncome: Math.round(requiredIncome),
    loanPercentage: (requiredLoanAmount / totalPayment) * 100,
    downPaymentPercentage: (downPayment / totalPayment) * 100,
    overPaymentPercantage: (overpayment / totalPayment) * 100,
    payments, // Добавляем массив с платежами
  };
};
