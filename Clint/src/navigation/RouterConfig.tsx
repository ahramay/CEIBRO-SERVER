import { Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
// import ForgetPassword from "components/Auth/Login/ForgetPassword";
import VerifyEmail from "components/Auth/EmailVerify/VerifyEmail";
import ForgetPassword from "components/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "components/Auth/ResetPassword/ResetPassword";
import Register from "components/Auth/Register/Register";
import Projects from "components/Projects/ProjectList/Project";
import Dashboard from "components/Dashboard/Dashboard";
import Profile from "components/Profile/Profile";
import Tasks from "components/Tasks/TaskList/Task";
import SubTask from "components/Tasks/SubTasks/SubTask";
import Chat from "components/Chat/Chat";
import AppLayout from "./AppLayout";
import Connections from "components/Connection/Connection";
import PrivateRoute from "./PrivateRoute";

import { createBrowserHistory } from "history";
export const appHistory = createBrowserHistory();

interface Configs {}

const RouterConfig: React.FC<Configs> = () => {
  return (
    <Router history={appHistory}>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/forgot-password" component={ForgetPassword} />
        <Route path="/reset-password" component={ResetPassword} />

        <Route path="/register" component={Register} />
        <AppLayout>
          <Route path="/profile" component={Profile} />
          <Route path="/projects" component={Projects} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/task/:id" component={SubTask} />
          <Route path="/chat" component={Chat} />
          <Route path="/connections" component={Connections} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </AppLayout>
      </Switch>
    </Router>
  );
};

export default RouterConfig;
