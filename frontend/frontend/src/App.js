import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Layout from "./hocs/Layout";
import HomeScreen from "./screens/HomeScreen";
import ActivationScreen from "./screens/ActivationScreen";
import LogInScreen from "./screens/LogInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPassword from "./screens/ResetPassword";
import ResetPasswordConfirm from "./screens/ResetPasswordConfirm";



const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" Component={HomeScreen}></Route>
          <Route
            exact
            path="/activate/:uid/:token"
            Component={ActivationScreen}
          ></Route>
          <Route exact path="/login" Component={LogInScreen}></Route>
          <Route exact path="/signup" Component={RegisterScreen}></Route>
          <Route exact path="/reset-password" Component={ResetPassword}></Route>
          <Route
            exact
            path="/confirm-password/:uid/:token"
            Component={ResetPasswordConfirm}
          ></Route>
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

// function App() {
//   return (
//     <div>
//       <RegisterScreen></RegisterScreen>
//     </div>
//   );
// }

export default App;
