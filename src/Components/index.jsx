import { useState } from "react";
import data from "./data";
import './style.css'

export default function Accordion () {
    const [selected, setSelected] = useState(null);
    const [multiSelection, setMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    let handleSingleSelection = (getCurrId) => {
        setSelected(getCurrId === selected ? null : getCurrId);
    }

    let handleMultipleSelection = (getCurrId) => {
        let copyMultiple = [...multiple];
        const findCurrIndex = copyMultiple.indexOf(getCurrId);
        
        if (findCurrIndex == -1) {
            copyMultiple.push(getCurrId);
        }
        else {
            copyMultiple.splice(findCurrIndex, 1);
        }

        setMultiple(copyMultiple);
    }

    let toggleMultiSelection = () => {
        setMultiSelection(!multiSelection);
    }
    return(
        <div>
            <h3>Accordion</h3>
            <button onClick={toggleMultiSelection}>Enable Multi Selection</button>
            <div className="wrapper">
                {
                    data && data.length > 0?
                        data.map(dataItem => (
                            <div className="item">
                                <div className="title" onClick={() => multiSelection ? () => handleMultipleSelection(dataItem.id) : () => handleSingleSelection(dataItem.id)}>
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>
                                {
                                    (multiSelection && multiple.includes(dataItem.id)) || (!multiSelection && selected === dataItem.id) ? <div className="content">{dataItem.answer}</div> : null
                                }
                                {
                                    selected === dataItem.id ? 
                                        <div className="content">{dataItem.answer}</div> 
                                    : null
                                }
                            </div>
                        ))
                    : <div>No data found </div>
                }
            </div>
        </div>
    );
}