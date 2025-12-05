import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filters from './Filters';
import TourCard from './TourCard';
import { fetchTours, setCurrentPage } from '../redux/tourSlice';

const ToursList = () => {
  const dispatch = useDispatch();
  const { tours, status, error, currentPage, limit, totalTours } = useSelector(state => state.tours);

  // Calculate total pages for client-side pagination UI
  const totalPages = Math.ceil(totalTours / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Initial data fetch and refetch on page/filter change
  useEffect(() => {
    // We pass the page and limit to fetchTours, but the thunk also uses the state.filters
    dispatch(fetchTours({ page: currentPage, limit: limit }));
  }, [dispatch, currentPage, limit]);

  // Handler for pagination button click
  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  let content;

  if (status === 'loading') {
    // Simple Tailwind loading spinner
    content = (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        <span className="ml-3 text-lg text-green-700">Loading tours...</span>
      </div>
    );
  } else if (status === 'succeeded') {
    if (tours.length === 0) {
      content = <p className="text-xl text-center text-gray-500 mt-10">No tours found matching your criteria.</p>;
    } else {
      content = (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tours.map(tour => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      );
    }
  } else if (status === 'failed') {
    content = <p className="text-center text-red-500 mt-10">Error fetching tours: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header and Filter Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-teal-500">
          🌍 Natours Booking
        </h1>
        <p className="text-gray-600 mt-2 text-xl">Explore the best adventures nature has to offer!</p>
      </header>

      <div className="lg:flex lg:space-x-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4 mb-8 lg:mb-0">
          <Filters />
        </aside>

        {/* Tour List Content */}
        <main className="lg:w-3/4">
          {content}

          {/* Pagination */}
          {status === 'succeeded' && tours.length > 0 && (
            <div className="flex justify-center mt-12 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition duration-150 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Previous
              </button>

              {pageNumbers.map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition duration-150 ${
                    page === currentPage
                      ? 'bg-green-700 text-white shadow-lg'
                      : 'bg-white text-green-700 hover:bg-green-100 border border-green-700'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition duration-150 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ToursList;
