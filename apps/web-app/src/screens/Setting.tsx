import React from 'react';
import { useTranslation } from 'react-i18next';

const Setting = () => {
  const { i18n } = useTranslation();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button onClick={() => switchLanguage('en')}>English</button>
      <button onClick={() => switchLanguage('he')}>Hebrew</button>
    </div>
  );
};
export default Setting;
