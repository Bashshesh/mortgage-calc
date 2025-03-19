import Switch from '@mui/material/Switch';
import { useState } from 'react';

const ModalHeader = ({ totalPayment, paymentType, months, isSwitchOn, handleChange }) => (
  <div className="modal-header">
    <div className="modal-header-base">Таблица платежей</div>
    <div className="modal-header-items">
      <div className="modal-header-item">Итого к возврату:<br/>{totalPayment.toLocaleString()} ₸</div>
      <div className="modal-header-item">Тип платежа:<br/>{paymentType === 'annuity' ? 'Аннуитет' : 'Диффер.'}</div>
      <div className="modal-header-item">Срок ипотеки:<br/>{months} мес.</div>
      <div className="modal-header-item">
        Показать процентный долг: <Switch color='black' checked={isSwitchOn} onChange={handleChange} />
      </div>
    </div>
  </div>
);

export default ModalHeader;