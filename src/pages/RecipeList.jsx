import { Form, Link, useLoaderData } from 'react-router-dom'
import { getRecipes } from '../api/recipe'
import { RecipeCard } from '../components/RecipeCard'
import { FormGroup } from '../components/FormGroup'
import { useEffect, useRef } from 'react'
import { getChefs } from '../api/chef'

export function RecipeList() {
  const {
    recipes,
    chefs,
    searchParams: { query, chefId },
  } = useLoaderData()

  const queryRef = useRef()
  const chefIdRef = useRef()

  useEffect(() => {
    queryRef.current.value = query || ''
  }, [query])

  useEffect(() => {
    chefIdRef.current.value = chefId || ''
  }, [chefId])

  return (
    <>
      <h1 className="page-title">
        Recipes
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New Recipe
          </Link>
        </div>
      </h1>
      <Form className="form">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="search-key-ingredients">
              Search By Key Ingredients
            </label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="chefId">Search By Chef</label>
            <select type="search" name="chefId" id="chefId" ref={chefIdRef}>
              <option value="">Any</option>
              {chefs.map((chef) => (
                <option key={chef.id} value={chef.id}>
                  {chef.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>
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
async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams
  const query = searchParams.get('query')
  const chefId = searchParams.get('chefId')
  const filterParams = { q: query }
  if (chefId !== '') filterParams.chefId = chefId

  const recipes = getRecipes({ signal, params: filterParams })
  const chefs = getChefs({ signal })

  return {
    recipes: await recipes,
    chefs: await chefs,
    searchParams: { query, chefId },
  }
}

export const recipeListRoute = {
  loader,
  element: <RecipeList />,
}
