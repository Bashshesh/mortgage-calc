import React, { useEffect } from 'react';
import Bank2Config from '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/components/programs/config/Bank2Config';
import { useTranslation } from 'react-i18next';


const Bank2 = ({ isActive }) => {
    const {t} = useTranslation();
    useEffect(() => {
        if (isActive) {
            console.log('Активная программа: bank2');
        }
    }, [isActive]);

    return (
        <div className="AltynBank-block">
            <div className="header-program">Bank2</div>
            <div className="desc-block">
                <p className="desc-text">
                {t('Максимальная сумма кредита:')} {Bank2Config.maxLoanAmount ? `${Bank2Config.maxLoanAmount.toLocaleString()} ₸` : 'Не задано'}
                </p>
                <p className="desc-text">{t('Максимальный срок:')} {Bank2Config.maxTerm} {t('лет')}</p>
                <p className="desc-text">{t('Минимальный первый взнос:')} {Bank2Config.minDownPaymentPercent}%</p>
                <p className="desc-text">
                    {t('Диапазон процентной ставки:')} {Bank2Config.interestRateRange.min}% - {Bank2Config.interestRateRange.max}%
                </p>
            </div>
        </div>
    );
};

export default Bank2;
