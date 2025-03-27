import React, { useEffect } from 'react';
import Bank4Config from '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/components/programs/config/Bank4Config';
import { useTranslation } from 'react-i18next';

const Bank4 = ({ isActive }) => {
    const {t} = useTranslation();
    useEffect(() => {
        if (isActive) {
            console.log('Активная программа: bank4');
        }
    }, [isActive]);

    return (
        <div className="AltynBank-block">
            <div className="header-program">Bank4</div>
            <div className="desc-block">
                <p className="desc-text">
                {t('Максимальная сумма кредита:')} {Bank4Config.maxLoanAmount ? `${Bank4Config.maxLoanAmount.toLocaleString()} ₸` : 'Не задано'}
                </p>
                <p className="desc-text">{t('Максимальный срок:')} {Bank4Config.maxTerm} {t('лет')}</p>
                <p className="desc-text">{t('Минимальный первый взнос:')} {Bank4Config.minDownPaymentPercent}%</p>
                <p className="desc-text">
                    {t('Диапазон процентной ставки:')} {Bank4Config.interestRateRange.min}% - {Bank4Config.interestRateRange.max}%
                </p>
            </div>
        </div>
    );
};

export default Bank4;
