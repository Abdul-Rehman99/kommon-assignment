import { useState } from 'react';
import { Clock } from 'lucide-react';

// History Component
const History = ({ history, loading }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateText = (text, limit = 150) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent History
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Recent History
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No feedback history yet</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {history.slice(0, 5).map((item, index) => {
            const isExpanded = expandedItems[item._id || index];
            const feedbackText = isExpanded
              ? item.feedback
              : truncateText(item.feedback);

            return (
              <div key={item._id || index} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {item.user_input}
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap prose prose-sm bg-gray-50 p-2 rounded">
                  {feedbackText}
                  {item.feedback.length > 150 && (
                    <button
                      onClick={() => toggleExpand(item._id || index)}
                      className="text-blue-500 ml-2 text-sm hover:underline"
                    >
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
