import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { MessageSquare, LogOut, Send } from "lucide-react";
import Button from "../ui/Button";
import History from "./History";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Dashboard Component
const Dashboard = ({ onLogout }) => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const user = AuthService.getUser();
  const token = AuthService.getToken();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const historyData = await ApiService.getHistory(token);
      setHistory(historyData);
    } catch (error) {
      toast.error("Failed to load history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleGetFeedback = async () => {
    if (!input.trim()) {
      toast.error("Please enter some text to get feedback");
      return;
    }

    setLoadingFeedback(true);

    try {
      const response = await ApiService.getFeedback(input, token);
      setFeedback(response.feedback);

      // Reload history to show the new entry
      await loadHistory();

      toast.success("Feedback generated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingFeedback(false);
      setInput("");
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    toast.success("Logged out successfully");
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Feedback Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            {/* <Button onClick={handleLogout} variant="danger" className='w-2s'>
              <LogOut className="h-4 w-4" />
              Logout
            </Button> */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xs transition duration-200"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Your Response
              </h2>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your response here to get AI-powered feedback..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />

              <div className="mt-4">
                <Button
                  onClick={handleGetFeedback}
                  loading={loadingFeedback}
                  className="w-auto"
                >
                  <Send className="h-4 w-4" />
                  Get Feedback
                </Button>
              </div>
            </div>

            {/* Feedback Display */}
            {feedback && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  AI Feedback
                </h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="text-gray-800 whitespace-pre-wrap prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {feedback}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="lg:col-span-1">
            <History history={history} loading={loadingHistory} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
