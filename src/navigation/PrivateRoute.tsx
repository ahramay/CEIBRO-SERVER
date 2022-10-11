import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { RootState } from "../redux/reducers";

interface PrivateRouteInt {
  path: string;
  component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteInt> = (props) => {
  const { component, path } = props;

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return <Route path={path} exact component={component} />;
};

export default PrivateRoute;
