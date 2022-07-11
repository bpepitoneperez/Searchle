import { Link } from "react-router-dom";
import '../Styles/NotFound.css'

const NotFound = () => {
    return (
      <div id='not-found-div'>
        <h1>Page not found!</h1>
        <Link className='page-link' to="/">Take me back</Link>
      </div>
    );
  };
  
  export default NotFound;