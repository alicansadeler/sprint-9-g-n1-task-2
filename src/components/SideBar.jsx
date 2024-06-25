import { useState } from 'react';
import CategoryList from './CategoryList';

export default function SideBar() {
  const [categories, setCategories] = useState([
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ]);

  return (
    <div className="side-container">
      <h2>Categories</h2>
      <CategoryList categories={categories} />
    </div>
  );
}
