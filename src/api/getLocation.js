import errorMessages from '../data/errorMessages.js';
export async function getLocation(city) {
    try{
        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${import.meta.env.VITE_API_KEY}&q=${city}&language=en-us`);
        
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