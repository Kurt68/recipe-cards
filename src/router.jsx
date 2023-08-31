import { Navigate, createBrowserRouter, useRouteError } from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'
import { recipeListRoute } from './pages/RecipeList'
import { chefListRoute } from './pages/ChefList'
import { recipeRoute } from './pages/Recipe'
import { chefRoute } from './pages/Chef'
import { NewRecipeRoute } from './pages/NewRecipe'
import { EditRecipeRoute } from './pages/EditRecipe'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/recipes" /> },
          {
            path: 'recipes',
            children: [
              { index: true, ...recipeListRoute },
              {
                path: ':recipeId',
                children: [
                  { index: true, ...recipeRoute },
                  { path: 'edit', ...EditRecipeRoute },
                ],
              },
              { path: 'new', ...NewRecipeRoute },
            ],
          },
          {
            path: 'chefs',
            children: [
              { index: true, ...chefListRoute },
              {
                path: ':chefId',
                children: [{ index: true, ...chefRoute }],
              },
            ],
          },
          {
            path: '*',
            element: <h1 className="four-o-four">404 - Page Note Found</h1>,
          },
        ],
      },
    ],
  },
])
function ErrorPage() {
  const error = useRouteError()

  return (
    <>
      <h1 className="error-message-stack-trace">
        Error - Something went wrong
      </h1>
      {import.meta.env.MODE !== 'production' && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  )
}
