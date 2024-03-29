import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";
import Game  from "./components/Game";
import Login from "./components/Login";
import SearchResult from "./components/SearchResult";
import Platform from "./components/Platform";
import SearchFilter from "./components/SearchFilter";
import Character from "./components/Character";
import Games from "./components/Games";

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
    path: '/games',
    element: <Games />
  },
  {
    path: '/games/:gameId',
    element: <Game />
  },
  {
    path: '/platforms/:platformId',
    element: <Platform />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/filter',
    element: <SearchFilter/>
  },
  {
    path: '/search',
    element: <SearchResult/>
  },
  {
    path: '/characters/:characterId',
    element: <Character/>
  }
];

export default AppRoutes;
