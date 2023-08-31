import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from 'react-router-dom'

export function RootLayout() {
  const { state } = useNavigation()

  const isLoading = state === 'loading'
  return (
    <>
      <header className="header">
        <span className="spoon">
          <img src="../images/spoon.svg" alt="My Recipes Logo" />
          Recipe Cards!
        </span>

        <nav className="navigation">
          <ul className="link-list">
            <li className="link">
              <NavLink to="/recipes">Recipes</NavLink>
            </li>
            <li className="link">
              <NavLink to="/chefs">Chefs</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <ScrollRestoration />

      {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading ? 'loading' : ''}`}>
        <Outlet />
      </div>

      <footer className="footer">
        <span className="chef">
          <img src="../images/chef.svg" alt="" />
        </span>
        <p>Recipe Cards! &copy;2023</p>
        <span className="spoon">
          <img src="../images/spoon.svg" alt="" />
        </span>
      </footer>
    </>
  )
}
