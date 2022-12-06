import Loading from "../Component/Loading/Loading";
import Home from "../Pages/Homepage";
import Fiber from "../TestComponent/Fiber";
import TextFile from "../TestComponent/Test_Text";

export const Allroutes = [
    {
        name: "Home",
        path: "/",
        component: <Home />
    },
    {
        name: "fiber",
        path: "/fiber",
        component: <Fiber />
    },
    {
        name: "text",
        path: "/text",
        component: <TextFile />
    },
]