'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await api.get(`/products/${id}/history`);
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHistory();
  }, [id]);

  const chartData = {
    labels: history.map(h => new Date(h.checked_at).toLocaleDateString() + ' ' + new Date(h.checked_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})),
    datasets: [
      {
        label: 'Price (₹)',
        data: history.map(h => h.price),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Price History',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return '₹' + value;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : history.length === 0 ? (
             <div className="flex justify-center items-center h-full text-gray-500">
               No price history available.
             </div>
          ) : (
            <div className="w-full h-full relative">
              <Line options={chartOptions} data={chartData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
