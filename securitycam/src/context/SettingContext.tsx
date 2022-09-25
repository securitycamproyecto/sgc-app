/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from 'react';

const settingDefault = {
    headerComponent: () => null,
    headerTitle: '',
    headerShown: true
};

const notificationsSettingsDefault = {
    uuid: null,
    authorized: '1',
    notAuthorized: '1',
    unknown: '1',
    token: '',
    clientId: ''
};

export const SettingContext = createContext({
    userId: null,
    settings: settingDefault,
    notificationsSettings: notificationsSettingsDefault,
    setUserId: (userId?: any) => {},
    setSettings: (setting?: any) => {},
    setNotificationsSettings: (notificationsSettings?: any) => {}
});

export const SettingProvider = ({ children }: { children: JSX.Element }) => {
    const [settings, setSettings] = useState(settingDefault);
    const [userId, setUserId] = useState(null);
    const [notificationsSettings, setNotificationsSettings] = useState(notificationsSettingsDefault);

    return (
        <SettingContext.Provider value={{
            userId,
            settings,
            notificationsSettings,
            setUserId,
            setSettings,
            setNotificationsSettings
        }}>
            { children }
        </SettingContext.Provider>
    );
};
