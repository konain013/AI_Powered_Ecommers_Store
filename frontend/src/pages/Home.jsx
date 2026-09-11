
import React, { useEffect, useMemo, useState } from "react";
import HeroCarousal from "../components/HeroCarousal";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result = [...result].sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <>
      <HeroCarousal />

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Products</h2>

          <p className="text-muted">
            Find the products you are looking for.
          </p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="col-md-6 col-lg-3">
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 col-lg-3">
            <select
              className="form-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="text-muted mt-3">
              Loading products...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-5">
            <h4 className="fw-bold mb-3">
              Something went wrong
            </h4>

            <p className="text-muted">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <h4 className="fw-bold">
              No products found
            </h4>

            <p className="text-muted">
              Try changing your search or category.
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="row">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;

