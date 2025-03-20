import { useTranslation } from 'react-i18next';

const PaymentTable = ({ months, currentDate, results, isSwitchOn, paymentType }) => {
    const { t } = useTranslation();
    let totalPayment = results.totalPayment;
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{t('Дата')}</th>
            <th>{t('Платежи')}</th>
            {isSwitchOn && <th>{t('Процентный долг')}</th>}
            {isSwitchOn && <th>{t('Основной долг')}</th>}
            {isSwitchOn && <th>{t('Месяцный процентный долг')}</th>}
            {isSwitchOn && <th>{t('Месяцный основной долг')}</th>}
            <th className='last-th'>{t('Остаток долга')}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: months }, (_, index) => {
            const paymentDate = new Date(currentDate);
            paymentDate.setMonth(paymentDate.getMonth() + index);
            
            let paymentAmount, remainingDebt, mainDebt, percentDebt;
            let mainMonthlyPayment = (results.requiredLoanAmount / months);
            let percentMonthlyPayment;
            if (paymentType === 'annuity') {
              paymentAmount = index + 1 === months
                ? results.totalPayment - index * results.monthlyPayment
                : results.monthlyPayment;
              remainingDebt = index + 1 === months
                ? 0
                : results.totalPayment - (index + 1) * results.monthlyPayment;
                mainDebt = (results.requiredLoanAmount - ((results.requiredLoanAmount / months)*(index+1)));
                percentDebt = remainingDebt - mainDebt;
                percentMonthlyPayment =  paymentAmount - mainMonthlyPayment;
            } else {
              console.log(results.payments[index])
              paymentAmount = results.payments[index]?.totalMonthlyPayment;
              totalPayment -= paymentAmount;
              remainingDebt = totalPayment;
              mainDebt = results.payments[index]?.remainingBalance;
              percentDebt = totalPayment - mainDebt;
              percentMonthlyPayment =  paymentAmount - mainMonthlyPayment;
            }
  
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{paymentDate.toLocaleDateString()}</td>
                <td>{paymentAmount?.toLocaleString()} ₸</td>
                {isSwitchOn && <td>{Math.round(percentDebt).toLocaleString()+" ₸"}</td>}
                {isSwitchOn && <td>{Math.round(mainDebt).toLocaleString()+" ₸"}</td>}
                {isSwitchOn && <td>{Math.round(percentMonthlyPayment).toLocaleString()+" ₸"}</td>}
                {isSwitchOn && <td>{Math.round(mainMonthlyPayment).toLocaleString()+" ₸"}</td>}
                <td className='last-td'>{Math.round(remainingDebt)?.toLocaleString()} ₸</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  export default PaymentTable;