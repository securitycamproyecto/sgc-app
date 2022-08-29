/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from 'react';

const settingDefault = {
    headerComponent: () => null,
    headerTitle: '',
    headerShown: true
};

export const SettingContext = createContext({
    settings: settingDefault,
    setSettings: (setting?:any) => {}
});

export const SettingProvider = ({ children }: { children: JSX.Element }) => {
    const [settings, setSettings] = useState(settingDefault);

    return (
        <SettingContext.Provider value={{
            settings,
            setSettings
        }}>
            { children }
        </SettingContext.Provider>
    );
};
