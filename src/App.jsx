import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function App() {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('welcome_message')}</h1>
    </>);
}