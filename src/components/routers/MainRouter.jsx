import { createBrowserRouter } from "react-router-dom"
import { Root } from "../../Root"
import { ErrorPage } from "../ErrorPage"
import { Home } from "../home/Home"
import { Calendar } from "../calendar/Calendar.jsx";
import { Dasboard } from "../dashboard/Dasboard.jsx";
import AddMember from './../members/AddMember';
import { MembersInfo } from "../members/MembersInfo.jsx";
import AddRecipe from "../recipes/AddRecipe.jsx";
import Login from "../auth/Login.jsx";
import { PrivateRouter } from './PrivateRouter';
import { RoleBasedPrivateRouter } from "./RoleBasedPrivateRoter.jsx";
import UnauthorizedPage from "../auth/Unauthoraized.jsx";

export const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/calendar',
        element: <PrivateRouter><Calendar /></PrivateRouter>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/dashboard',
        element: <Dasboard />
      },
      {
        path: '/addMember',
        element: <RoleBasedPrivateRouter allowedRoles={['gm']}>
          <AddMember />
        </RoleBasedPrivateRouter>
      },

      {
        path: '/membersInfo',
        element: <RoleBasedPrivateRouter allowedRoles={['gm']}>
          <MembersInfo />
        </RoleBasedPrivateRouter>
      },
      {
        path: '/addRecipe',
        element: <RoleBasedPrivateRouter allowedRoles={['gm', 'agm']}>
          <AddRecipe />
        </RoleBasedPrivateRouter>
      },
      {
        path: '/unauthorized',
        element: <UnauthorizedPage /> // A page to show unauthorized access
      }
    ]
  }
])