import Detailed from "../../pages/detailed/Detailed";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import TechTalks from "../../pages/tech-talks/TechTalks";
import WithAuth from "../with-auth/WithAuth";


const routes = [
    {
        id: 1,
        path: ["/", "/home"],
        exact: true,
        component: WithAuth()(Home)
    },
    {
        id: 2,
        path: "/register-talk",
        exact: false,
        component:  WithAuth()(Register)
    },
    {
        id: 3,
        path: "/tech-talks",
        exact: false,
        component:  WithAuth()(TechTalks)
    },
    {
        id: 4,
        path: "/detailed",
        exact: false,
        component:  WithAuth()(Detailed)
    },
    {
        id: 5,
        path: "/login",
        exact: false,
        component: Login
    }
];

export default routes;