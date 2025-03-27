import React, { useEffect } from 'react';
import Bank3Config from '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/components/programs/config/Bank3Config';
import { useTranslation } from 'react-i18next';

const Bank3 = ({ isActive }) => {
    const {t} = useTranslation();

    useEffect(() => {
        if (isActive) {
            console.log('Активная программа: bank3');
        }
    }, [isActive]);

    return (
        <div className="AltynBank-block">
            <div className="header-program">Bank3</div>
            <div className="desc-block">
                <p className="desc-text">
                {t('Максимальная сумма кредита:')} {Bank3Config.maxLoanAmount ? `${Bank3Config.maxLoanAmount.toLocaleString()} ₸` : 'Не задано'}
                </p>
                <p className="desc-text">{t('Максимальный срок:')} {Bank3Config.maxTerm} {t('лет')}</p>
                <p className="desc-text">{t('Минимальный первый взнос:')} {Bank3Config.minDownPaymentPercent}%</p>
                <p className="desc-text">
                    {t('Диапазон процентной ставки:')} {Bank3Config.interestRateRange.min}% - {Bank3Config.interestRateRange.max}%
                </p>
            </div>
        </div>
    );
};

export default Bank3;
