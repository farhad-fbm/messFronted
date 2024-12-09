/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../ContextProviders/AuthContextProvider"

export const NavLinks = () => {
  const { user } = useContext(AuthContext);
  const navs = [
    { name: 'Home', link: '/' },
    { name: 'Calendar', link: '/calendar' },
    {name: 'Dashboard', link: '/dashboard'},
    { name: 'Members', link: '/membersInfo' },
    { name: 'Recipes', link: '/addRecipe' },
  ]
  return (
    <>
      {
        navs.map((nav, idx) => (
          <div key={idx} className="">
            <NavLink
              to={`${nav.link}`}
              className={
                ({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "border-b-4 border-b-white pb-1" : '',
                    isTransitioning ? "transitioning" : "",
                  ].join("")
              }
            >
              {nav.name}
            </NavLink>
          </div>
        ))
      }
    </>
  )
}
