import { useState, useEffect} from "react";
import {getGemeniCommercial} from "../api/aiApi";
import './Commercial.css'

type CommercialT={
    description: string;
    slogan: string;
}
const Commercial = () => {
    const INTERVAL = 1000 * 60 * 5;
    const [commercial, setCommercial] = useState<CommercialT>({slogan:"", description:""});
    const[loading, setLoading] = useState(false);

    const loadCommercial = async () => {
        setLoading(true);
        const c = await getGemeniCommercial()
        console.log(c);
        
        if(c == ""){
            setCommercial({slogan:"Error loading commercial", description:""});
        }else{
            // gemini returns sporadic data structure
            // if it is an array,
            if(c[0]){  
                setCommercial(c[0]);
            }else{
                setCommercial(c);
            }
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
            <h3>{commercial.slogan}</h3>
            <p>{commercial.description}</p>
        </div>
    )
}

export default Commercial;