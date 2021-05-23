import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./Context/auth-context";

function App() {
  const contextData = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!contextData.isLoggedIn && <Login />}
        {contextData.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
