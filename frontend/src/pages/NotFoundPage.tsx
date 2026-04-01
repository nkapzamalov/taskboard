import { Link } from "react-router";

function NotFoundPage(){
  return (
    <div>
      <div>404 NOT FOUND</div>
      <Link to={"/"}>Go back to Homepage</Link>
    </div>
  )
}

export default NotFoundPage;