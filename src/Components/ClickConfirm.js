import '../Styles/ClickConfirm.css'
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";

const ClickConfirm = ( { show, win, anchorPoint, clickConfirm, miss } ) => {
  let y = anchorPoint.y, x = anchorPoint.x, icon = <MdCheck id='checkmark'/>
  if (miss)
  {
    icon = <MdClose id='miss-icon'/>
  }
  

  if (show && !win) {
    return (
      <div className="circle-div" onClick={clickConfirm} style={{ top: `calc(${y}px - 2.5em)`, left: `calc(${x}px - 2.5em)`}}>{icon}</div>
    );
  }
  return <></>;
};

export default ClickConfirm;