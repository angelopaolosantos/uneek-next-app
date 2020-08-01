import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { useState } from 'react'

const Search = () => {
    const [keywords, setKeywords] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [countResults, setCountResults] = useState(0)
    const [limit, setLimit] = useState(9)

    return (
        <div className="search-container">
            <h1>Search Product</h1>
            <SearchForm keywords={keywords} setKeywords={setKeywords} setCurrentPage={setCurrentPage} />
            <SearchResults keywords={keywords} currentPage={currentPage} countResults={countResults} limit={limit} setCurrentPage={setCurrentPage} />
            <style jsx>{`
                .search-container {
                    max-width: 998px;
                    margin: 25px auto;
                    padding: 10px;
                }
            `}
            </style>
        </div>
    )
}

export default Search