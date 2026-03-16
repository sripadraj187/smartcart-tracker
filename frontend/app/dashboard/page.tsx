'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import AddProductModal from '@/components/AddProductModal';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to stop tracking this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Tracked Products</h1>
            <p className="text-gray-500 mt-1">Manage and monitor price changes for your items.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Product
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products tracked yet</h3>
            <p className="mt-1 text-sm text-gray-500 mb-6">Start tracking a product to see price updates here.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors border hover:border-indigo-800"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Start Tracking
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((prop: any) => (
              <ProductCard key={prop.id} product={prop} onDelete={handleDelete} />
            ))}
          </div>
        )}

        <AddProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAdded={fetchProducts} 
        />
      </main>
    </div>
  );
}
