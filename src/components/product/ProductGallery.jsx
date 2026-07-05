import { useState } from "react";
import { FiZoomIn, FiPlay, FiRotateCw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../ui/Modal";
import { cn } from "../../utils/cn";

export default function ProductGallery({ product }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("photos"); // photos, video, 360
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  const allImages = [
    product.image,
    product.hoverImage,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab("photos")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            activeTab === "photos"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-text-secondary hover:bg-muted/80"
          )}
        >
          Photos
        </button>
        {product.hasVideo && (
          <button
            onClick={() => setActiveTab("video")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "video"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-text-secondary hover:bg-muted/80"
            )}
          >
            Video
          </button>
        )}
        {product.has360 && (
          <button
            onClick={() => setActiveTab("360")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "360"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-text-secondary hover:bg-muted/80"
            )}
          >
            360° View
          </button>
        )}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeTab === "photos" && (
          <motion.div
            key="photos"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div
              className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden cursor-zoom-in group"
              onClick={() => setZoomModalOpen(true)}
            >
              <img
                src={allImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button className="absolute bottom-4 right-4 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FiZoomIn size={20} />
              </button>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    idx === activeImageIndex
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="aspect-video bg-gray-50 rounded-2xl overflow-hidden"
          >
            <iframe
              src={product.videoUrl}
              title={`${product.name} Video`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </motion.div>
        )}

        {activeTab === "360" && (
          <motion.div
            key="360"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex flex-col items-center justify-center gap-4"
          >
            <FiRotateCw size={64} className="text-gray-400" />
            <p className="text-gray-500 font-medium">360° Preview Coming Soon</p>
            <p className="text-gray-400 text-sm">Drag to rotate the product</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Modal */}
      <Modal
        isOpen={zoomModalOpen}
        onClose={() => setZoomModalOpen(false)}
        title="Product Image"
      >
        <div className="flex items-center justify-center max-h-[70vh]">
          <img
            src={allImages[activeImageIndex]}
            alt={product.name}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
      </Modal>
    </div>
  );
}
