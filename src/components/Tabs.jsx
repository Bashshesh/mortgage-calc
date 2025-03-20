import React from 'react'
import { useTranslation } from 'react-i18next';
import '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css';

export default function Tabs({ activeTab, handleTabSwitch}){
  const {t} = useTranslation();

    return(
        <div className="tabs">
                <button
                  className={`tab ${activeTab === 'by-cost' ? 'active' : ''}`}
                  onClick={() => handleTabSwitch('by-cost')}
                >
                  {t('ПО СТОИМОСТИ НЕДВИЖИМОСТИ')}
                </button>
                <button
                  className={`tab ${activeTab === 'by-payment' ? 'active' : ''}`}
                  onClick={() => handleTabSwitch('by-payment')}
                >
                  {t('ПО ЕЖЕМЕСЯЧНОМУ ПЛАТЕЖУ')}
                </button>
              </div>
    )
}