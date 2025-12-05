const TourCard = ({ tour }) => {
  const { name, duration, difficulty, price, description, imageCover } = tour;

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const truncatedDescription = truncateText(description, 100);

  const imagePath = `img/tours/${imageCover}`;

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out">
      <div className="relative h-48">
        <img
          className="w-full h-full object-cover"
          src={imagePath}
          alt={`Cover for ${name}`}
          onError={e => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=Tour+Image';
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-green-700/80 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold uppercase tracking-wider">{name}</h3>
      </div>

      {/* Tour Details */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4">{truncatedDescription}</p>

        <div className="grid grid-cols-2 gap-y-3 mb-4 text-sm font-medium">
          {/* Duration */}
          <div className="flex items-center text-green-600">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{duration} days</span>
          </div>

          {/* Difficulty */}
          <div className="flex items-center text-gray-500 capitalize">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span>{difficulty}</span>
          </div>

          {/* Price */}
          <div className="flex items-center text-green-700 font-extrabold text-lg col-span-2">
            ${price}
            <span className="text-xs font-normal text-gray-500 ml-1">/ person</span>
          </div>
        </div>

        <button className="w-full mt-2 py-2 px-4 bg-linear-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transition duration-150">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TourCard;
