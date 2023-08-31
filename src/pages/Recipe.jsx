import { Link, useLoaderData } from 'react-router-dom'
import { getRecipe } from '../api/recipe'
import { getChef } from '../api/chef'
import { getComments } from '../api/comments'
import { RecipeCard } from '../components/RecipeCard'

function Recipe() {
  const { recipe, chef, comments } = useLoaderData()
console.log(recipe)
  return (
    <>
      <h1 className="page-title">
        {recipe.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to="edit">
            Edit Recipe
          </Link>
        </div>
      </h1>
      <span className="chef title">
        <Link to="/chefs">By {chef.username}</Link>
      </span>

      <main>
        <section className="section">
          <div className="recipe-grid recipe-page">
            <RecipeCard key={recipe.id} {...recipe} />
            <div className="recipe-card">
              <h2 className="directions-icon">Directions</h2>
              <div className="directions-list">
                <div>{recipe.directions}</div>
              </div>
            </div>
            {comments.map((comment) => (
              <div key={comment.id} className="comments">
                <h2 className='comments-icon'>Comments</h2>
                <span className="email">
                  <Link to={`mailto:${comment.email}`}>{comment.email}</Link>
                </span>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

async function loader({ request: { signal }, params: { recipeId } }) {
  const comments = getComments(recipeId, { signal })
  const recipe = await getRecipe(recipeId, { signal })
  const chef = getChef(recipe.chefId, { signal })

  return { recipe, chef: await chef, comments: await comments }
}

export const recipeRoute = {
  loader,
  element: <Recipe />,
}
