const PaymentTable = ({ months, currentDate, results, isSwitchOn, paymentType }) => {
    let totalPayment = results.totalPayment;
    console.log(results.payments)
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Платежи</th>
            <th>Остаток долга</th>
            {isSwitchOn && <th>Процентный долг</th>}
            {isSwitchOn && <th>Основной долг</th>}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: months }, (_, index) => {
            const paymentDate = new Date(currentDate);
            paymentDate.setMonth(paymentDate.getMonth() + index);
            
            let paymentAmount, remainingDebt, mainDebt, percentDebt;
            if (paymentType === 'annuity') {
              paymentAmount = index + 1 === months
                ? results.totalPayment - index * results.monthlyPayment
                : results.monthlyPayment;
              remainingDebt = index + 1 === months
                ? 0
                : results.totalPayment - (index + 1) * results.monthlyPayment;
                mainDebt = (results.requiredLoanAmount - ((results.requiredLoanAmount / months)*(index+1)));
                percentDebt = remainingDebt - mainDebt;
            } else {
              paymentAmount = results.payments[index]?.totalMonthlyPayment;
              totalPayment -= paymentAmount;
              remainingDebt = totalPayment;
              mainDebt = results.payments[index]?.remainingBalance;
              percentDebt = totalPayment - mainDebt;
            }
  
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{paymentDate.toLocaleDateString()}</td>
                <td>{paymentAmount?.toLocaleString()} ₸</td>
                <td>{remainingDebt?.toLocaleString()} ₸</td>
                {isSwitchOn && <td>{percentDebt.toLocaleString()+" ₸"}</td>}
                {isSwitchOn && <td>{mainDebt.toLocaleString()+" ₸"}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  export default PaymentTable;