'use client';

import { Trash2, LineChart } from 'lucide-react';
import Link from 'next/link';

interface ProductProps {
  product: {
    id: number;
    product_title: string;
    product_url: string;
    current_price: number;
    product_image: string;
    created_at: string;
  };
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: ProductProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="relative h-48 w-full bg-white flex items-center justify-center p-4 border-b border-gray-50">
        {product.product_image ? (
          <img 
            src={product.product_image} 
            alt={product.product_title} 
            className="h-full w-full object-contain mix-blend-multiply transition-transform hover:scale-105 duration-500"
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3" title={product.product_title}>
          {product.product_title}
        </h3>
        <div className="flex items-center justify-between mb-4 mt-auto">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{Number(product.current_price).toLocaleString('en-IN')}
          </span>
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-500 hover:text-blue-700 underline"
          >
            View Store
          </a>
        </div>
        <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
          <Link 
            href={`/product/${product.id}`}
            className="flex-1 flex justify-center items-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <LineChart className="w-4 h-4 mr-2" />
            Price History
          </Link>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
            title="Remove Tracking"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
