import { useParams } from 'react-router-dom';

const ProductNestedDetail = () => {
  const { id } = useParams();
  return <p className="mt-4">Details for Product #{id}</p>;
};

export default ProductNestedDetail;
