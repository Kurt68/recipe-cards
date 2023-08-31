import { redirect, useActionData, useLoaderData } from 'react-router-dom'
import { getChefs } from '../api/chef'
import { createRecipe } from '../api/recipe'
import { RecipeForm, recipeFormValidator } from '../components/RecipeForm'

function NewRecipe() {
  const chefs = useLoaderData()
  const errors = useActionData()

  return (
    <>
      <h1 className="page-title">New Recipe</h1>
      <RecipeForm chefs={chefs} errors={errors} />
    </>
  )
}

async function action({ request }) {
  const FormData = await request.formData()
  const chefId = FormData.get('chefId')
  const title = FormData.get('title')
  const serves = FormData.get('serves')
  const prepTime = FormData.get('prepTime')
  const totalTime = FormData.get('totalTime')
  const ingredients = FormData.get('ingredients')
  const directions = FormData.get('directions')

  const errors = recipeFormValidator({
    title,
    serves,
    prepTime,
    totalTime,
    chefId,
    ingredients,
    directions,
  })

  if (Object.keys(errors).length > 0) {
    return errors
  }

  const recipe = await createRecipe(
    { chefId, title, serves, prepTime, totalTime, ingredients, directions },
    { signal: request.signal }
  )
  return redirect(`/recipes/${recipe.id}`)
}

function loader({ request: { signal } }) {
  return getChefs({ signal })
}

export const NewRecipeRoute = {
  loader,
  action,
  element: <NewRecipe />,
}
