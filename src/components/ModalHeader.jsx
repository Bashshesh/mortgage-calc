import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';

const ModalHeader = ({ totalPayment, paymentType, months, isSwitchOn, handleChange }) => {
  const { t } = useTranslation();

  return (
    <div className="modal-header">
      <div className="modal-header-base">{t('Таблица платежей')}</div>
      <div className="modal-header-items">
        <div className="modal-header-item">{t('Итого к возврату')}:<br/><h3>{totalPayment.toLocaleString()} ₸</h3></div>
        <div className="modal-header-item">{t('Тип платежа')}:<br/><h3>{paymentType === 'annuity' ? t('Аннуитет') : t('Диффер.')}</h3></div>
        <div className="modal-header-item">{t('Срок ипотеки')}:<br/><h3>{months} {t('мес.')}</h3></div>
        <div className="modal-header-item">
          {t('Показать процентный долг')}: <Switch color='black' checked={isSwitchOn} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
