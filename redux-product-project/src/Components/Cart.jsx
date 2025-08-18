import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from '../redux/cartSlice';

function Cart() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="p-6 border-t mt-6">
      <h2 className="text-xl font-semibold mb-4">🛒 Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map(item => (
              <li className="flex justify-between items-center" key={item.id}>
                <div>
                  <strong>{item.name} x </strong> {item.quantity}
                </div>

                <button className="text-red-600 hover:underline text-sm" onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove item
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</div>
          <button className="mt-2 py-1 px-4 bg-red-600 text-white text-sm rounded" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
