'use client';

import { useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import api from '../lib/api';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export default function AddProductModal({ isOpen, onClose, onAdded }: AddProductModalProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await api.post('/products/add', { url });
      setUrl('');
      onAdded();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add product. Make sure the URL is accessible.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Track New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Product URL (Amazon or Flipkart)
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.amazon.in/dp/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm text-gray-900"
              required
            />
          </div>
          
          {error && <div className="mb-5 p-3 rounded-lg bg-red-50 text-sm text-red-600 border border-red-100">{error}</div>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Scraping Product Data...
              </>
            ) : (
              <>
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Start Tracking Price
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
