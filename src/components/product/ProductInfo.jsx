import { useState } from "react";
import ProductRating from "../cards/ProductRating";
import { FiThumbsUp, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { cn } from "../../utils/cn";

export default function ProductInfo({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const toggleQuestion = (id) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${product.customerReviews?.length || 0})` },
    { id: "questions", label: `Questions (${product.questions?.length || 0})` },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex overflow-x-auto gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-secondary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === "description" && (
          <div
            className="text-text-secondary space-y-4"
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />
        )}

        {activeTab === "specifications" && (
          <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
            {product.specifications?.map((spec, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4 p-4">
                <div className="col-span-1 text-sm font-medium text-text-secondary">
                  {spec.name}
                </div>
                <div className="col-span-2 text-sm text-secondary">{spec.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {product.customerReviews?.map((review) => (
              <div key={review.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-secondary">{review.name}</p>
                      <p className="text-xs text-text-muted">{review.date}</p>
                    </div>
                  </div>
                  <ProductRating
                    rating={review.rating}
                    showCount={false}
                    className="text-sm"
                  />
                </div>
                <h4 className="font-medium text-secondary mb-2">{review.title}</h4>
                <p className="text-text-secondary text-sm mb-3">{review.text}</p>
                <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <FiThumbsUp size={14} />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            ))}
            {product.customerReviews?.length === 0 && (
              <p className="text-center text-text-muted py-8">
                No reviews yet. Be the first to review this product!
              </p>
            )}
          </div>
        )}

        {activeTab === "questions" && (
          <div className="space-y-4">
            {product.questions?.map((q) => (
              <div
                key={q.id}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-secondary">{q.question}</span>
                  {expandedQuestions.has(q.id) ? (
                    <FiChevronUp size={18} />
                  ) : (
                    <FiChevronDown size={18} />
                  )}
                </button>
                {expandedQuestions.has(q.id) && (
                  <div className="px-4 pb-4 pt-1 border-t border-border text-text-secondary text-sm">
                    <p className="font-medium text-primary mb-1">Answer:</p>
                    <p>{q.answer}</p>
                    <p className="text-xs text-text-muted mt-2">{q.date}</p>
                  </div>
                )}
              </div>
            ))}
            {product.questions?.length === 0 && (
              <p className="text-center text-text-muted py-8">
                No questions yet. Ask the first question!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
