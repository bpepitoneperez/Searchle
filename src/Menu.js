import './Menu.css'

const Menu = ( {chars, show, anchorPoint, clickChar} ) => {
  let charsList = chars.filter((char) => !char.clicked).map((char) => <li key={char.charName} onClick={clickChar}>
    <img src={char.imgUrl} alt={char.charName} className='img-thumbnail' />
  </li>);

  if (show && charsList.length > 0) {
    return (
      <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        {charsList}
      </ul>
    );
  }
  return <></>;
};

export default Menu;