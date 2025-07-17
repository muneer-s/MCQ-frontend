import Header from '../../component/Header/Header'
import PageNotFoundImage from '../../../public/404.jpg'
import { useNavigate } from 'react-router-dom'
const PageNotFound = () => {

    const navigate = useNavigate()
    const handleNavigateHome = () => {
        navigate('/')
    }
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center mt-10 px-4">
                <img
                    src={PageNotFoundImage}
                    alt="Page Not Found"
                    className="w-[800px] h-auto"
                />
                <h1 className="font-sans ui-sans-serif text-3xl mt-16 text-center text-gray-800">
                    Sorry, it looks like the page doesn't exist.
                </h1>
                <button onClick={handleNavigateHome} className="mt-7 px-4 py-2 bg-gray-600 text-white font-bold rounded hover:bg-blue-700">
                    Back to Home
                </button>
            </div>
        </div>
    )
}

export default PageNotFound