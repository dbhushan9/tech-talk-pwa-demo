import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./routes";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default AppRouter;
