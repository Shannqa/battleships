import { Outlet, Link } from "react-router-dom"

function Root() {
  
  return(
    <div>
      <div className="links">
        <Link to={`battleships`}>Battleships</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
    )
}

export default Root

<div className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : "">
                        </div>