import React from "react";
import { useState } from "react";
import styles from "./styles";
const axios = require('axios');

const Target = ({ EmId, which, val }) => {
    const [Val, setVal] = useState('');
    const [tq, settq] = useState('');

    const sendVal = (e) => {
        e.preventDefault();
        axios.post('/api', {
            TGVAL:Val,
            Email: EmId,
            Curr: which,
            Value: val
        })
        .then(function (response) {
            console.log(response);
        })
        settq("Great! We'll alert you once the price reaches $" + Val)
    }

    return(
        <div className="TargetPrice">
            <form onSubmit={sendVal} style={styles.formStyles}>
                <label htmlFor="inputTarget">At what value do you want the alert?</label>
                <br />
                <br />
                $ <input style={styles.inpStyles} type="text" className="inputTarget" value={Val} onChange={(e) => setVal(e.target.value)} />
                <button style={styles.btnStyles} type="submit">Submit</button>
            </form>
            <p style={styles.tqstyles}>{tq}</p>
        </div>
    )
}
export default Target;