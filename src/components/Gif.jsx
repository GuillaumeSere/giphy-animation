import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Download from '../assets/Download.svg'
import Home from '../assets/Home.svg'
import Heart from '../assets/Heart.svg'
import Right from '../assets/arrowRight.svg'
import Left from '../assets/arrowLeft.svg'
import Reset from '../assets/reset.svg'
import { Search } from './Search'
import { fetchTrending } from './Giftrending'
import { fetchTrendSearch } from './GiftrendingSearch'

const Gif = () => {

    const [data, setData] = useState([])
    const [title, setTitle] = useState('Gif')
    const [loader, setLoader] = useState(true)
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(8)
    const [totalCount, setTotalCount] = useState(0)
    const [search, setSearch] = useState('')
    const [trending, setTrending] = useState(false)
    const [trendSearch, setTrendSearch] = useState(false)
    const [tSearch, setTsearch] = useState([])

    // get the datas
    const fetchData = async (title) => {
        let URL = `http://api.giphy.com/v1/gifs/search?q=${title}&api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}&offset=${offset}`
        // try catch
        try {
            let fetchGif = await axios(URL)
            // await promise response
            let fetchRes = await fetchGif
            // check response
            if (fetchRes.status === 200) {
                // set data state
                setData(fetchRes.data.data)
                // set total count
                setTotalCount(fetchRes.data.pagination.total_count)
                // set loader false
                setLoader(false)
                // call new content
                if (trending) {
                    setTrending(false)
                    // reset offset
                    setOffset(0)
                }
                // set trend search
                setTrendSearch(false)
            }
        } catch (error) {
            if (error) throw error
        }
    }
    useEffect(() => {
        if(trending){
            fetchTrending(limit, offset, setOffset, setTrending, setData, setLoader, setTotalCount, content, setTrendSearch, title, setTitle)
        }
        if (!trending) {
            fetchData(title)
        }
    }, [offset])

    const handleDownload = (url) => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", url, true)
        xhr.responseType = "blob"
        xhr.onload = function () {
            let urlCreator = window.URL || window.webkitURL
            let imageUrl = urlCreator.createObjectURL(this.response)
            let tag = document.createElement('a')
            tag.href = imageUrl
            tag.download = title.charAt(0).toUpperCase() + title.slice(1)
            document.body.appendChild(tag)
            tag.click()
            document.body.removeChild(tag)
        }
        xhr.send()
    }

    const content = () => {
        switch (true) {
            case loader:
                return <div>Loader...</div>
            case data.length > 0:
                return data.map(g => {
                    return (
                        <div className="gif-card" key={g.id}>
                            <details>
                                <summary>
                                    Afficher
                                </summary>
                                <h4>{g.title !== undefined ? (g.title.charAt(0).toUpperCase() + g.title.slice(1)) : ''}</h4>
                                <button onClick={() => handleDownload(g.images.fixed_height.url)} className="gif-download">
                                    <img className='svg' src={Download} alt="download" />
                                </button>
                            </details>
                            <img onClick={() => handleDownload(g.images.fixed_height.url)} src={g.images.fixed_width.url} alt="gif" className="image" />
                        </div>
                    )
                })
            default:
                return data
        }
    }

    const onTop = () => {
        let options = {top:0, left:0, behavior:'smooth'}
        window.scrollTo(options)
    }

    const handleNext = () => {
        setLoader(true)
        setOffset(offset + limit)
        onTop()
    }

    const handlePrev = () => {
        setLoader(true)
        setOffset(offset - limit)
        onTop()
    }

    return (
        <div>
            <header>
                <a href="#">
                    <img className='svg' src={Home} alt="Home" />
                </a>
                <div className="gif-title">
                    <img className='svg' src={Heart} alt="Heart" />
                    <h1 className="gif-title-h1">Recherche GIF</h1>
                </div>
                <div> <strong>Recherche:</strong> {title}</div>
                <Search search={search} setSearch={setSearch} fetchData={fetchData} setTitle={setTitle} />
                <a href="./giphy-animation">
                    <img src={Reset} alt="reset" className="svg" />
                </a>
            </header>
            <button className="gif-btn-trending"
                onClick={() => fetchTrending(limit, offset, setOffset, setTrending, setData, setLoader, setTotalCount, content, setTrendSearch, title, setTitle)}>
                Tendance
            </button>
            <button className="gif-btn-trendsearch"
                onClick={() => trendSearch ? setTrendSearch(false) : fetchTrendSearch(setTrendSearch, trendSearch, setTsearch, setData)}
            >
                Recherche
            </button>
            <div className="gif-wrap">
                {
                trendSearch ?
                 (
                    <div className='gif-trend-search'>
                        <ul>
                            {tSearch.map((t, i) => <li key={i}> <strong>{i + 1}</strong> {t.toUpperCase()}</li>)}
                        </ul>
                    </div>
                )
                :
                ''
            }
            {content()}
            </div>
            <div className="pagination">
                {
                    totalCount === 0 ?
                    ''
                    :
                    offset < limit ?
                    <img src={Right} onClick={handleNext} className='svg' alt='right' />
                    :
                    offset >= totalCount ?
                    <img src={Left} onClick={handlePrev} className='svg' alt='left' />
                    :
                    <>
                     <img src={Left} onClick={handlePrev} className='svg' alt='left' />
                    <img src={Right} onClick={handleNext} className='svg' alt='right' />
                    </>
                }

            </div>
        </div>
    )
}

export default Gif
