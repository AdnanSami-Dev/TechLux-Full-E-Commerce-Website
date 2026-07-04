import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full">New</span>}
          {product.discount && (
            <span className="bg-danger text-white px-2 py-1 text-xs rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        {/* Quick actions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all">
            <FiHeart />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all">
            <FiEye />
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-secondary mb-2 line-clamp-2">{product.name}</h3>
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-yellow-400">★★★★★</div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
        <Button className="w-full" size="sm">
          <FiShoppingCart /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
