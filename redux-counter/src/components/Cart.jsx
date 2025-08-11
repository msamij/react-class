import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from '../redux/cartSlice';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 border-t mt-6">
      <h2 className="text-xl font-semibold mb-4">🛒 Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <strong>{item.name}</strong> x {item.quantity}
                </div>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-600 hover:underline text-sm">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</div>
          <button onClick={() => dispatch(clearCart())} className="mt-2 px-4 py-1 bg-red-600 text-white text-sm rounded">
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
