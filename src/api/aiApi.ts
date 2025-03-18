import { log } from "console";


export const getGptCommercial = async() => {
    try{
        const url = import.meta.env.VITE_REACT_APP_GPT_URL
        const resp = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_GPT_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages:[{role:'system', content:'give me a dummy vacation commercial'}]
            })
        });
        const data = await resp.json();
        return data.choices[0].message.content;
    }catch(err){
        return "";
    }
}
export const getGemeniCommercial = async() => {
    try{
        const url = `${import.meta.env.VITE_REACT_APP_AI_URL}${import.meta.env.VITE_REACT_APP_AI_KEY}`
        const resp = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{parts:
                    [{"text": "give me a dummy text vacation commercial with slogen:string, short description: string as a json"}]
                }]

            })
        });
        const data = await resp.json();
        const rawData = data.candidates[0].content.parts[0].text;  
        console.log(rawData.substring(7  , rawData.length-5));
        
        const commercials = JSON.parse(rawData.substring(7  , rawData.length-5));
        console.log( commercials);
        
        return commercials
    }catch(err){
        console.log(err);
        
        return "";
    }
}
/**
 * 
 * 
 * ```json
{
  "commercial": {
    "slogan": "Unwind, Reconnect, Reimagine: Your Perfect Escape Awaits!",
    "short_description": "Escape the ordinary with our curated vacation packages. From serene beach getaways to thrilling adventure tours, we offer unforgettable experiences tailored just for you. Book now and create memories that last a lifetime!"
  }
}
```

 */

