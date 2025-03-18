import { useState, useEffect} from "react";
import {getGemeniCommercial} from "../api/aiApi";
import './Commercial.css'

type CommercialT={
    short_description: string;
    slogen: string;
}
const Commercial = () => {
    const INTERVAL = 1000 * 60 * 60
    const [commercial, setCommercial] = useState<CommercialT[]>([{slogen:"", short_description:""}]);
    const[loading, setLoading] = useState(false);

    const loadCommercial = async () => {
        setLoading(true);
        const c = await getGemeniCommercial()
        console.log(commercial);
        
        if(c == ""){
            setCommercial([{slogen:"Error loading commercial", short_description:""}]);
        }else{
            setCommercial([c]);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadCommercial();
        const intervalId = setInterval(loadCommercial, INTERVAL);
        return () => clearInterval(intervalId)
    }, [])
    
    if(loading)return (<div>Loading next commercial</div>)
    return(
        <div className="commercial-container">
            <h3>{commercial[0].slogen}</h3>
            <p>{commercial[0].short_description}</p>
        </div>
    )
}

export default Commercial;