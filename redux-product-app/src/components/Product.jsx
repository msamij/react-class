function Product({ product }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-white p-4 rounded">
      <img className="h-full object-cover" src={product.image} alt={product.title} />
      <h2 className="text-2xl text-white">{product.title}</h2>
      <h3 className="text-white">{product.price}$</h3>
      <p className="text-white">{product.description.slice(0, 30).concat('...')}</p>
    </div>
  );
}

export default Product;
