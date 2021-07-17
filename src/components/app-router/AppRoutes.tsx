import { Route, Switch } from "react-router-dom";
import routes from "./routes";

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.id}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  );
};

export default AppRoutes;
