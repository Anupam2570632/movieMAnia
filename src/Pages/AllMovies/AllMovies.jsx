import { useEffect, useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa6";
import './style.css'
import { useLoaderData } from "react-router-dom";

const getFormattedDate = (numericalDate) => {
    const date = new Date(numericalDate);
    const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};

const AllMovies = () => {
    const [movies, setMovies] = useState([])
    const { count } = useLoaderData()
    
    const moviesPerPage = 20;
    const totalPages = Math.ceil(count / moviesPerPage)
    const [currentPage, setCurrentPage] = useState(0);

    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        const maxButtonsToShow = 10;
        const buttons = [];
    
        if (totalPages <= maxButtonsToShow) {
            for (let i = 0; i < totalPages; i++) {
                buttons.push(
                    <button
                        key={`page-${i}`}
                        className={`btn ${i === currentPage ? 'btn-active' : ''}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            const startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
            const endPage = Math.min(totalPages - 1, startPage + maxButtonsToShow - 1);
    
            if (startPage > 0) {
                buttons.push(<button key="prev" className="btn" onClick={() => onPageChange(currentPage - 1)}>Prev</button>);
            }
    
            if (startPage > 1) {
                buttons.push(<span key="startEllipsis">...</span>);
            }
    
            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <button
                        key={`page-${i}`}
                        className={`btn ${i === currentPage ? 'btn-active' : ''}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
    
            if (endPage < totalPages - 2) {
                buttons.push(<span key="endEllipsis">...</span>);
            }
    
            buttons.push(
                <button
                    key={totalPages - 1}
                    className={`btn ${currentPage === totalPages - 1 ? 'btn-active' : ''}`}
                    onClick={() => onPageChange(totalPages - 1)}
                >
                    {totalPages - 1}
                </button>
            );
    
            if (currentPage < totalPages - 1) {
                buttons.push(<button key="next" className="btn" onClick={() => onPageChange(currentPage + 1)}>Next</button>);
            }
        }
    
        return (
            <div className="pagination">
                {buttons}
            </div>
        );
    };

    useEffect(() => {
        fetch(`http://localhost:5000/movies?page=${currentPage}&size=${moviesPerPage}`)
            .then(res => res.json())
            .then(data => setMovies(data))
    }, [currentPage, moviesPerPage])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-black py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-5 mx-auto w-11/12 md:w-4/5 ">
                {movies.map(movie => (
                    <div key={movie._id} className="flex gap-2 flex-col">
                        <div className="imgCard mx-auto h-[300px] w-full relative">
                            <img className="h-[100%] w-full object-cover object-center" src={movie.poster} alt="" />
                            <div className="absolute bg-black bg-opacity-35 inset-0 p-2 flex items-end justify-end ">
                                <h2 className="flex w-fit bg-black bg-opacity-90  px-2 py-1 items-center gap-1 text-yellow-300"><FaStar /><span className="text-white">{movie.imdb.rating}</span></h2>
                            </div>
                            <div className="playBtn bg-black inset-0 absolute bg-opacity-65">
                                <FaPlay className="text-white text-4xl" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-white text-[18px] font-bold hover:text-red-600">{`${(movie.title).slice(0, 20)}${movie.title.length > 20 ? '...' : ''}`}</h2>
                            <p className="text-gray-400">{getFormattedDate(movie.released)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-11/12 py-10 text-white md:w-4/5 mx-auto text-center">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default AllMovies;
