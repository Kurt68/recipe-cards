import { Link } from 'react-router-dom'

export function RecipeCard({
  id,
  title,
  serves,
  prepTime,
  totalTime,
  ingredients,
}) {
  return (
    <>
      <div className="recipe-card">
        <h2 className="recipe-icon">{title}</h2>

        <ul className="recipe-list">
          <ul>
            <li>
              <span>Serves:</span> {serves}
            </li>
            <li>
              <span>Prep Time:</span> {prepTime}
            </li>
            <li>
              <span>Total Time:</span> {totalTime}
            </li>
          </ul>
        </ul>
        <span className="ingredients">Ingredients:</span>
        <div className="ingredients-list">
          <div>{ingredients}</div>
        </div>
        <div className="card-footer">
          <button className="view btn">
            <Link to={`/recipes/${id}`}>View</Link>
          </button>
        </div>
      </div>
    </>
  )
}
