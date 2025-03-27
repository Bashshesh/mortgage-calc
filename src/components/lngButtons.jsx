import React from 'react'
import "/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css";
import { useTranslation } from 'react-i18next';

const LngButtons = () => {
    const { i18n, t } = useTranslation();

  const [activeLanguage, setActiveLanguage] = React.useState(i18n.language || 'ru');

  function changeLanguage(e) {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    setActiveLanguage(newLang);
  }


    return(
        <div className='button-group-lng'>
        <button
          className={`button-lng ${activeLanguage === 'en' ? 'active' : ''}`}
          onClick={changeLanguage}
          value='en'
        >
          English
        </button>
        <button
          className={`button-lng ${activeLanguage === 'kz' ? 'active' : ''}`}
          onClick={changeLanguage}
          value='kz'
        >
          Қазақша
        </button>
        <button
          className={`button-lng ${activeLanguage === 'ru' ? 'active' : ''}`}
          onClick={changeLanguage}
          value='ru'
        >
          Русский
        </button>
        </div>
    );
}

export default LngButtons;