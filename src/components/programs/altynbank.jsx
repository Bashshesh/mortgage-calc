import React, { useEffect } from 'react';
import AltynBankConfig from '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/components/programs/config/AltynBankConfig.jsx';
import { useTranslation } from 'react-i18next';


const AltynBank = ({ isActive }) => {
    const {t} = useTranslation();
    useEffect(() => {
        if (isActive) {
            console.log('Активная программа: AltynBank');
        }
    }, [isActive]);

    return (
        <div className="AltynBank-block">
            <div className="header-program">AltynBank</div>
            <div className="desc-block">
                <p className="desc-text">
                {t('Максимальная сумма кредита:')} {(AltynBankConfig.maxLoanAmount) ? `${AltynBankConfig.maxLoanAmount.toLocaleString()} ₸` : 'Не задано'}                </p>
                <p className="desc-text">{t('Максимальный срок:')} {AltynBankConfig.maxTerm} {t('лет')}</p>
                <p className="desc-text">{t('Минимальный первый взнос:')} {AltynBankConfig.minDownPaymentPercent}%</p>
                <p className="desc-text">
                    {t('Диапазон процентной ставки:')} {AltynBankConfig.interestRateRange.min}% - {AltynBankConfig.interestRateRange.max}%
                </p>
            </div>
        </div>
    );
};

export default AltynBank;
