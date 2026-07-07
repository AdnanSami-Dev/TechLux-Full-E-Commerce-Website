import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import ProductCard from "../components/cards/ProductCard";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductRating from "../components/cards/ProductRating";
import StickyAddToCart from "../components/product/StickyAddToCart";
import {
  DiscountBadge,
  NewBadge,
  StockBadge,
  EMIBadge,
  CashbackBadge,
  DeliveryBadge,
} from "../components/cards/ProductBadges";
import { FiShoppingCart, FiHeart, FiRepeat } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { addToCompare, removeFromCompare } from "../redux/slices/compareSlice";
import { shopProducts } from "../data/shopProducts";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const compareItems = useSelector(state => state.compare.items);
  const isWishlisted = wishlistItems.some(item => item.id === parseInt(id));
  const isCompared = compareItems.some(item => item.id === parseInt(id));

  const product = useMemo(
    () => shopProducts.find((p) => p.id === parseInt(id)),
    [id]
  );

  const relatedProducts = useMemo(() => {
    return shopProducts
      .filter((p) => p.id !== product?.id && p.category === product?.category)
      .slice(0, 4);
  }, [product]);

  useEffect(() => {
    if (product) {
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((p) => p.id !== product.id);
        return [product, ...filtered].slice(0, 8);
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isWishlisted) {
        dispatch(removeFromWishlist(product.id));
        toast.success('Removed from wishlist');
      } else {
        dispatch(addToWishlist(product));
        toast.success('Added to wishlist');
      }
    }
  };

  const handleCompareToggle = () => {
    if (product) {
      if (isCompared) {
        dispatch(removeFromCompare(product.id));
        toast.success('Removed from compare');
      } else {
        if (compareItems.length >= 4) {
          toast.error('You can only compare up to 4 products');
          return;
        }
        dispatch(addToCompare(product));
        toast.success('Added to compare');
      }
    }
  };

  if (!product) {
    return (
      <MainLayout>
        <Container className="py-20 text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">
            Product Not Found
          </h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </Container>
      </MainLayout>
    );
  }

  const isDiscounted = product.discount && product.originalPrice;
  const savings = isDiscounted ? product.originalPrice - product.price : 0;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.name, href: `/product/${id}`, active: true },
  ];

  return (
    <MainLayout>
      <Container className="py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div>
            <ProductGallery product={product} />
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {product.isNew && <NewBadge size="md" />}
              {isDiscounted && <DiscountBadge discount={product.discount} size="md" />}
              <StockBadge inStock={product.inStock !== false} />
            </div>

            <div>
              <p className="text-sm text-text-muted mb-1">{product.brand} • {product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
                {product.name}
              </h1>
              <ProductRating
                rating={product.rating}
                reviewCount={product.reviews}
                className="mb-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {isDiscounted && (
                  <>
                    <span className="text-xl text-text-muted line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-success font-medium">
                      Save ${savings.toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {product.emi && <EMIBadge amount={product.emi} />}
              {product.cashback && <CashbackBadge amount={product.cashback} />}
              {product.freeDelivery !== false && <DeliveryBadge free={true} />}
            </div>

            <p className="text-text-secondary leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-secondary hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-3 font-medium text-secondary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-4 py-3 text-secondary hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-text-muted">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<FiShoppingCart />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<FiHeart className={isWishlisted ? "fill-current" : ""} />}
                onClick={handleWishlistToggle}
                className={isWishlisted ? "bg-danger/10 text-danger border-danger/30" : ""}
              >
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<FiRepeat />}
                onClick={handleCompareToggle}
                className={isCompared ? "bg-primary/10 text-primary border-primary/30" : ""}
              >
                {isCompared ? "Compared" : "Compare"}
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <ProductInfo product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-2">
                Related Products
              </h2>
              <p className="text-text-muted">
                You may also like these products
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.id}`} key={p.id} className="flex">
                  <ProductCard product={p} className="h-full" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {recentlyViewed.length > 1 && (
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-2">
                Recently Viewed
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
                <Link to={`/product/${p.id}`} key={p.id} className="flex">
                  <ProductCard product={p} className="h-full" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Frequently Bought Together
            </h2>
            <p className="text-text-muted">
              Customers often buy these items together
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shopProducts.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="flex">
                <ProductCard product={p} className="h-full" />
              </Link>
            ))}
          </div>
        </section>
      </Container>

      <StickyAddToCart product={product} onAddToCart={handleAddToCart} />
    </MainLayout>
  );
}
