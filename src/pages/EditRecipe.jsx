import { redirect, useActionData, useLoaderData } from 'react-router-dom'
import { RecipeForm, recipeFormValidator } from '../components/RecipeForm'
import { getChefs } from '../api/chef'
import { getRecipe, updateRecipe } from '../api/recipe'

function EditRecipe() {
  const { chefs, recipe } = useLoaderData()

  const errors = useActionData()

  return (
    <>
      <h1 className="page-title">Edit Recipe</h1>
      <RecipeForm chefs={chefs} defaultValues={recipe} errors={errors} />
    </>
  )
}

async function action({ request, params: { recipeId } }) {
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

  const recipe = await updateRecipe(
    recipeId,
    { chefId, title, serves, prepTime, totalTime, ingredients, directions },
    { signal: request.signal }
  )
  return redirect(`/recipes/${recipe.id}`)
}

async function loader({ request: { signal }, params: { recipeId } }) {
  const recipe = getRecipe(recipeId, { signal })
  const chefs = getChefs({ signal })
  return { recipe: await recipe, chefs: await chefs }
}

export const EditRecipeRoute = {
  loader,
  action,
  element: <EditRecipe />,
}
