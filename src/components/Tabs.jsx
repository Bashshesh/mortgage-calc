import React from 'react'
import '/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css';

export default function Tabs({ activeTab, handleTabSwitch}){

    return(
        <div className="tabs">
                <button
                  className={`tab ${activeTab === 'by-cost' ? 'active' : ''}`}
                  onClick={() => handleTabSwitch('by-cost')}
                >
                  ПО СТОИМОСТИ НЕДВИЖИМОСТИ
                </button>
                <button
                  className={`tab ${activeTab === 'by-payment' ? 'active' : ''}`}
                  onClick={() => handleTabSwitch('by-payment')}
                >
                  ПО ЕЖЕМЕСЯЧНОМУ ПЛАТЕЖУ
                </button>
              </div>
    )
}