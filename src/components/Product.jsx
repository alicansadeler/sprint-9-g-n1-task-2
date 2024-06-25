export default function Product(props) {
  const { product } = props;

  return (
    <div className="product-card">
      <img src={product.image} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>{product.price}$</p>
    </div>
  );
}
