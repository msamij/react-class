import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearFilters, fetchTours, setFilters } from '../redux/tourSlice';

const Filters = () => {
  const dispatch = useDispatch();

  // Local state for filter inputs
  const [minPrice, setMinPrice] = useState('');
  const [maxDuration, setMaxDuration] = useState('');

  // Builds the filter object and dispatches the action
  const handleApplyFilters = e => {
    e.preventDefault();
    const newFilters = {};

    // Build price filter
    if (minPrice) {
      newFilters.price = { gte: Number(minPrice) };
    }

    // Build duration filter
    if (maxDuration) {
      // For duration, let's use a "less than or equal to" (lte) query
      newFilters.duration = { lte: Number(maxDuration) };
    }

    // Set the filters in Redux state and then fetch the data
    dispatch(setFilters(newFilters));
    dispatch(fetchTours());
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxDuration('');
    dispatch(clearFilters());
    dispatch(fetchTours());
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">🔍 Filter Tours</h3>
      <form onSubmit={handleApplyFilters} className="space-y-4">
        {/* Price Filter (Minimum Price) */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min. Price ($)
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            placeholder="e.g., 300 (GTE)"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
          />
        </div>

        {/* Duration Filter (Max Duration) */}
        <div>
          <label htmlFor="maxDuration" className="block text-sm font-medium text-gray-700 mb-1">
            Max. Duration (Days)
          </label>
          <input
            type="number"
            id="maxDuration"
            value={maxDuration}
            onChange={e => setMaxDuration(e.target.value)}
            placeholder="e.g., 7 (LTE)"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-150"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-150"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
