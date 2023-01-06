import axios from 'axios'

export const fetchTrendSearch = async(setTrendSearch, trendSearch, setTsearch) => {
    try {
        let URL = `https://api.giphy.com/v1/trending/searches?&api_key=${process.env.REACT_APP_API_KEY}`;
        let fetchGif = await axios(URL);
        let fetchRes = await fetchGif;
        // Set State console log
        if (fetchRes.status === 200) {
            // console.log(fetchRes)
            // Set trending true or false
            setTrendSearch(!trendSearch)
                // Set trending search
            setTsearch(fetchRes.data.data);
        }
    } catch (error) {
        if (error) throw error;
    }
}