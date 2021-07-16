import Home from "../../pages/home/Home";
import Register from "../../pages/register/Register";
import TechTalks from "../../pages/tech-talks/TechTalks";


const routes = [
    {
        id:1,
        path: ["/","/home"],
        exact:true,
        component: Home
    },
    {
        id:2,
        path: "/register-talk",
        exact: false,
        component: Register
    },
    {
        id:3,
        path: "/tech-talks",
        exact: false,
        component: TechTalks
    },
  ];

  export default routes;