import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocales } from "expo-localization";
import defaultLangData from '../data/en.json';

const languageFiles = {
    en: require('../data/en.json'),
    sv: require('../data/sv.json'),
};

const LangContext = createContext();

export const useData = () => {
    const { languageData, defaultLangData } = useContext(LangContext);

    const getProperty = (obj, prop) => {
        const [current, ...rest] = prop.split('.');

        if (obj && obj.hasOwnProperty(current)) {
            if (rest.length === 0) {
                return obj[current];
            } else {
                return getProperty(obj[current], rest.join('.'));
            }
        }

        return undefined;
    };

    const replacePlaceholders = (template, data) => {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const placeholder = new RegExp(`{${key}}`, 'g');
                template = template.replace(placeholder, data[key]);
            }
        }
        return template;
    };

    const getData = (property, ...additionalData) => {
        const languageValue = getProperty(languageData, property);
        const defaultValue = getProperty(defaultLangData, property);

        const template = languageValue !== undefined ? languageValue : defaultValue;

        let processedTemplate = template;
        if (additionalData.length > 0) {
            processedTemplate = replacePlaceholders(template, additionalData[0]);
        }

        return processedTemplate;
    };

    return { getData };
};

export const LangProvider = ({ children }) => {
    const [language, setLanguage] = useState('');
    const [languageData, setLanguageData] = useState(null);

    const changeLanguage = (newLanguage) => {
        try {
            const languageData = languageFiles[newLanguage];
            setLanguageData(languageData);
            setLanguage(newLanguage);
        } catch (error) {
            setLanguageData(defaultLangData);
            console.error(error, newLanguage);
        }
    };

    useEffect(() => {
        const userLanguage = getLocales()[0]?.languageCode || 'en';

        changeLanguage(userLanguage)
    }, []);

    return (
        <LangContext.Provider value={{ language, languageData, defaultLangData, changeLanguage }}>
            {children}
        </LangContext.Provider>
    );
};