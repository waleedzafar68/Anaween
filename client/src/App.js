import Router from "./routes";
import { useContext } from "react";

import { ToggleModeContext } from "./context/toggle-mode";

function App() {
  const { mode } = useContext(ToggleModeContext);

  return (
    <div className={`App ${mode} ${mode === "dark" ? 'bg-[#212121] text-white' : 'bg-white text-black'} h-screen w-full overflow-x-hidden`}>
      <Router />
    </div>
  );
}

export default App;
