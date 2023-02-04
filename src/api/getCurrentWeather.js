import errorMessages from '../data/errorMessages.js';
export async function getCurrentWeather(cityKey) {
    try{
        const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${import.meta.env.VITE_API_KEY}&language=en-us&details=false`);
        
        if (!response.ok) {
            const message = errorMessages[response.status] || 'Network error';
            throw new NetworkError(message);
        }

        const data = await response.json();
        return data;

    }catch (err){
        throw(err);
    }
    
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
    }
}