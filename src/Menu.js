import './Menu.css'

const Menu = ( {show, anchorPoint, clickConfirm} ) => {
  let y = anchorPoint.y, x = anchorPoint.x

  if (show) {
    return (
      <div className="circle-div" onClick={clickConfirm} style={{ top: `calc(${y}px - 2.5rem)`, left: `calc(${x}px - 2.5rem)`}}>Confirm</div>
    );
  }
  return <></>;
};

export default Menu;