import React, { useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import cookies from 'js-cookie'
import i18next from 'i18next'
import './App.css'

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'zh',
    name: '中文',
    country_code: 'cn',
  },
  {
    code: 'es',
    name: 'Español',
    country_code: 'sp',
  },
]

export default function App() {

  const { t } = useTranslation()
  const number_of_days = 3

  return (
    <>
      {languages.map(({ code, name }) => (
        <button key={code} onClick={() => i18next.changeLanguage(code)}>{name}</button>
      ))}
      <h1>{t('welcome_message')}</h1>
      <h2>I like China</h2>
      <Trans i18nKey="google">
        Hello, Click here to see <p className="p"><a href="http://google.com">google</a></p>. You can get more info.
      </Trans>
      <h3>{t('days_since_release', { number_of_days })}</h3>
    </>);
}