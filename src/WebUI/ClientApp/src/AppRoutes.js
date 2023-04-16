import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";
import Game  from "./components/Game";
import Login from "./components/Login";
import SearchResult from "./components/SearchResult";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/games/:gameId',
    element: <Game />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/search',
    element: <SearchResult/>
  }
];

export default AppRoutes;
