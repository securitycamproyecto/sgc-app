import React from "react";
import { SettingContext } from "../context/SettingContext";
import { useIsFocused } from "@react-navigation/native";

interface IHeaderMainContextHook {
    headerComponent?: any;
    headerTitle?: string;
    headerShown?: boolean;
}

const defaultValue = {
    headerComponent: () => null,
    headerTitle: '',
    headerShown: true
};

const HeaderMainContextHook = (props:IHeaderMainContextHook = defaultValue) => {
  const { setSettings } = React.useContext(SettingContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerComponent: props.headerComponent,
        headerTitle: props.headerTitle,
        headerShown: props.headerShown
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
};

export default HeaderMainContextHook;
