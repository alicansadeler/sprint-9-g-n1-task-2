import Product from './Product';

export default function ProductList(props) {
  const { products } = props;
  return (
    <>
      {products.map((item, index) => (
        <Product key={index} product={item} />
      ))}
    </>
  );
}
