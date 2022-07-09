

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
      <div>
        <h1>Page not found!</h1>
        <Link className='page-link' to="/store">Take me back</Link>
      </div>
    );
  };
  
  export default NotFound;