import axios from 'axios'

export const fetchTrending = async(limit, offset, setOffset, setTrending, setData, setLoader, setTotalCount, content, setTrendSearch, title, setTitle) => {
    try {
        let URL = `https://api.giphy.com/v1/gifs/trending?&api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}&offset=${offset}`;
        let fetchGif = await axios(URL);
        let fetchRes = await fetchGif;
        // Set State console log
        if (fetchRes.status === 200) {
            // console.log(fetchRes)
            // Set Data
            setData(fetchRes.data.data)
                // Set Total Count
            setTotalCount(fetchRes.data.pagination.total_count)
                // Set loader false
            setLoader(false)
                // Set random
            setTrending(true)
                // Set title
            if (title !== 'Trending') {
                setTitle('Trending')
                if (offset > 0) {
                    setOffset(0)
                }
            }
            // Call new content
            content()
                // Set trend search false
            setTrendSearch(false)
        }
    } catch (error) {
        if (error) throw error;
    }
}