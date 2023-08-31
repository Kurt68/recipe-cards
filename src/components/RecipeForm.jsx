import { Form, Link, useNavigation } from 'react-router-dom'
import { FormGroup } from './FormGroup'

export function RecipeForm({ chefs, defaultValues = {}, errors = {} }) {
  const { state } = useNavigation()

  const isSubmitting = state === 'submitting'

  return (
    <>
      <Form method="post" className="form">
        <fieldset>
          <legend>Create Recipe</legend>
          <div className="form-row">
            <div className="two-column-container">
              <FormGroup errorMessage={errors.title}>
                <label htmlFor="title">Recipe Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={defaultValues.title}
                />
              </FormGroup>
              <FormGroup errorMessage={errors.serves}>
                <label htmlFor="serves">Number Served</label>
                <input
                  type="text"
                  name="serves"
                  id="serves"
                  defaultValue={defaultValues.serves}
                />
              </FormGroup>
              <FormGroup errorMessage={errors.prepTime}>
                <label htmlFor="prepTime">Prep Time</label>
                <input
                  type="text"
                  name="prepTime"
                  id="prepTime"
                  defaultValue={defaultValues.prepTime}
                />
              </FormGroup>
              <FormGroup errorMessage={errors.totalTime}>
                <label htmlFor="totalTime">Total Time</label>
                <input
                  type="text"
                  name="totalTime"
                  id="totalTime"
                  defaultValue={defaultValues.totalTime}
                />
              </FormGroup>
            </div>
            <div className="two-column-container">
              <FormGroup errorMessage={errors.ingredients}>
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                  placeholder="Please list ingredients line by line"
                  name="ingredients"
                  id="ingredients"
                  defaultValue={defaultValues.ingredients}
                ></textarea>
              </FormGroup>
              <FormGroup errorMessage={errors.directions}>
                <label htmlFor="directions">Directions</label>
                <textarea
                  placeholder="Please list directions line by line"
                  name="directions"
                  id="directions"
                  defaultValue={defaultValues.directions}
                ></textarea>
              </FormGroup>
              <FormGroup errorMessage={errors.chefId}>
                <label htmlFor="chefId">Chef</label>
                <select
                  name="chefId"
                  id="chefId"
                  defaultValue={defaultValues.chefId}
                >
                  {chefs.map((chef) => (
                    <option key={chef.id} value={chef.id}>
                      {chef.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>
        </fieldset>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button disabled={isSubmitting} className="btn">
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  )
}

export function recipeFormValidator({
  title,
  serves,
  prepTime,
  totalTime,
  chefId,
  ingredients,
  directions,
}) {
  const errors = {}

  if (title === '') {
    errors.title = 'Title is required'
  }
  if (serves === '') {
    errors.serves = 'Number served is required'
  }
  if (prepTime === '') {
    errors.prepTime = 'Prep time is required'
  }
  if (totalTime === '') {
    errors.totalTime = 'Total time is required'
  }
  if (chefId === '') {
    errors.chefId = 'A chef is required'
  }
  if (ingredients === '') {
    errors.ingredients = 'Ingredients are required'
  }
  if (directions === '') {
    errors.directions = 'Directions are required'
  }

  return errors
}
