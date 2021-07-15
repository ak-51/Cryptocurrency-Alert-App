import axios from "axios";
import React from "react";
import { useState } from "react";
import Target from "../components/TargetPrice"
import styles from "./styles";

const Main = ({ EmId }) => {
    const [Text, setText] = useState('');
    const [showPrice, setShowPrice] = useState('');
    const [data_btc, setData_btc] = React.useState(null);
    const [data_eth, setData_eth] = React.useState(null);
    const [data_usdt, setData_usdt] = React.useState(null);
    const [Crr, setCrr] = useState('');

    const getVal = (e) => {
        e.preventDefault();
        if(Text.toUpperCase() === "BTC" || Text.toUpperCase() === "BITCOIN"){
            axios.post('/api/cname',{
                cname:"btc"
            })
            .then(res => {
                setData_btc(res.data.btc);
            })
            setShowPrice("Currency Price: " + "$" + data_btc);
            setCrr("BTC");
        }
        else if(Text.toUpperCase() === "ETH" || Text.toUpperCase() === "ETHEREUM"){
            axios.post('/api/cname',{
                cname:"eth"
            })
            .then(res => {
                setData_eth(res.data.eth);
            })
            setShowPrice("Currency Price: " + "$" + data_eth);
            setCrr("ETH");
        }
        else if(Text.toUpperCase() === "USDT" || Text.toUpperCase() === "TETHER"){
            axios.post('/api/cname',{
                cname:"usdt"
            })
            .then(res => {
                setData_usdt(res.data.usdt);
            })
            setShowPrice("Currency Price: " + "$" + data_usdt);
            setCrr("USDT");
            
        }
        else{
            setShowPrice("Invalid Input");
        }
    }

    return(
        <div className="Main" style={styles.mainStyles}>
            <p>
                The following cryptocurrencies are available: Bitcoin(BTC), Ethereum(ETH), Tether(USDT). 
            </p>
            <form onSubmit={getVal} style={styles.formStyles}>
                <label htmlFor="CurrencyName">Currency Name: </label>
                <input style={styles.inpStyles} type="text" className="CurrencyName" value={Text} onChange={(e) => setText(e.target.value)} />
                <button style={styles.btnStyles} type="submit" onClick={{position:"relative", top:"1px"}}>Submit</button>
            </form>
            {showPrice !== '' && 
            <div>
                <div className="priceDisplay" style={styles.abc}>
                    {showPrice}
                </div>
                <div className="tgParent">
                    <Target EmId={EmId} which={Crr} val={showPrice} />
                </div>
            </div>
            }
        </div>
    )
}
export default Main;