import Category from './Category.jsx';
export default function CategoryList(props) {
  const { categories } = props;
  
  return (
    <>
      {categories.map((item, index) => (
        <Category category={item} key={index} />
      ))}
    </>
  );
}
