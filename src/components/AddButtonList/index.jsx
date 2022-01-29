import React, {useState} from 'react';
import close from '../../assets/img/close.png';

import './AddButtonList.css';

const AddButtonList = () => {

    const [visiblePopup, setVisiblePopup] = useState(false);

    return (
        <div className="add-list">
        <button onClick={() => setVisiblePopup(true)} className="todo__btn">Add list</button>
        {visiblePopup && (
        <div className="add-list__popup">
            <img 
                onClick={() => setVisiblePopup(false)}
                width ="20"
                height="20"
                src={close}
                className="add-list__popop-close-btn"
                alt="close"
            />
            <input className="field" placeholder="List name"/>
            {/* <div className="add-list__popup-image">
                <ul>
                    <li><i><img src={image} width="20" height="20"/></i></li>
                </ul>
            </div> */}
            <button className="button">Add</button>
        </div>
        )}
        </div>
    );
};

export default AddButtonList;