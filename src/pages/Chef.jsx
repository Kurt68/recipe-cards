import { useLoaderData } from 'react-router-dom'
import { getRecipesByUser } from '../api/recipesByUser'
import { RecipeCard } from '../components/RecipeCard'
import { getChef } from '../api/chef'

function Chef() {
  const { recipes, chef } = useLoaderData()

  return (
    <>
      <h1 className="page-title">All Recipes By {chef.username}</h1>

      <main>
        <section className="section">
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

async function loader({ request: { signal }, params: { chefId } }) {
  const recipes = await getRecipesByUser(chefId, { signal })
  const chef = getChef(chefId, { signal })

  return { recipes, chef: await chef }
}

export const chefRoute = {
  loader,
  element: <Chef />,
}
