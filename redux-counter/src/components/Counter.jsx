import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset } from '../redux/actions';

const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Counter: {count}</h1>
      <div className="mt-4 space-x-4">
        <button onClick={() => dispatch(increment())} className="px-4 py-2 bg-green-500 text-white rounded">
          Increment
        </button>
        <button onClick={() => dispatch(decrement())} className="px-4 py-2 bg-red-500 text-white rounded">
          Decrement
        </button>
        <button onClick={() => dispatch(reset())} className="px-4 py-2 bg-gray-500 text-white rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
