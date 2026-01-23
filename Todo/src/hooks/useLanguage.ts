import { useState, useEffect } from 'react'
import { translations, Language, Translations } from '../i18n/translations'

const LANGUAGE_KEY = 'todo-language'

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY)
    return (saved as Language) || 'zh'
  })

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const t: Translations = translations[language]

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh')
  }

  return {
    language,
    t,
    toggleLanguage,
  }
}