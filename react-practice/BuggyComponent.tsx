// ProductList.tsx
import React, { useEffect, useState, useMemo } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  tags: string[];
};

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value));
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  // include error state
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError("Products could not be found");
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  const total = useMemo(() => {
    return filteredProducts.reduce((acc, el) => {
      return acc + el.price;
    }, 0);
  }, [filteredProducts]);

  const displayProducts = (): React.ReactNode => {
    return error ? (
      <p>Error Loading Products</p>
    ) : (
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <input
        placeholder="Search products"
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? <p>Loading...</p> : displayProducts()}
      <p>Total Price: ${total}</p>
    </div>
  );
};

export default ProductList;
