import { createContext, useState } from "react";

export const ToggleModeContext = createContext({
  mode: "",
  setMode: () => { },
  toggleMode: () => { },
});

export const ToggleModeContextProvider = (props) => {
  const [mode, setMode] = useState("dark");

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("");
    } else {
      setMode("dark");
    }
  };

  return (
    <ToggleModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {props.children}
    </ToggleModeContext.Provider>
  );
};
