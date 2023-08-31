import { Link, useLoaderData } from 'react-router-dom'
import { getChefs } from '../api/chef'

export function ChefList() {
  const chefs = useLoaderData()

  return (
    <>
      <h1 className="page-title">Chefs</h1>
      <main>
        <section className="section">
          <div className="recipe-grid">
            {chefs.map((chef) => (
              <div key={chef.id} className="recipe-card">
                <h2 className="directions-icon">{chef.username}</h2>
                <p className="profile">{chef.profile}</p>
                <div className="card-footer">
                  <button className="view btn">
                    <Link to={`/chefs/${chef.id}`}>
                      {chef.username}&#39;s Recipes
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
function loader({ request: { signal } }) {
  const chefs = getChefs({ signal })
  return chefs
}

export const chefListRoute = {
  loader,
  element: <ChefList />,
}
