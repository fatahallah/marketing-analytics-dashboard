import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { DollarSign, ShoppingCart, Users, Target, Filter, Download, Flame } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const rawCategories = [
    { Category: 'Wines', Total_Spend: 520000, Purchases: 18000, Conversions: 1400, Avg_Income: 72000 },
    { Category: 'Meat', Total_Spend: 380000, Purchases: 12500, Conversions: 1100, Avg_Income: 68000 },
    { Category: 'Gold', Total_Spend: 190000, Purchases: 6200, Conversions: 650, Avg_Income: 75000 },
    { Category: 'Fish', Total_Spend: 140000, Purchases: 4500, Conversions: 420, Avg_Income: 61000 },
    { Category: 'Fruits', Total_Spend: 85000, Purchases: 2500, Conversions: 200, Avg_Income: 55000 },
    { Category: 'Sweets', Total_Spend: 42890, Purchases: 1500, Conversions: 120, Avg_Income: 52000 }
  ];

  const channelsData = {
    'All': [
      { Channel: 'Store Sales', Purchases: 18500 },
      { Channel: 'Web Sales', Purchases: 16200 },
      { Channel: 'Catalog Sales', Purchases: 10500 }
    ],
    'Wines': [
      { Channel: 'Store Sales', Purchases: 8000 },
      { Channel: 'Web Sales', Purchases: 6000 },
      { Channel: 'Catalog Sales', Purchases: 4000 }
    ],
    'Meat': [
      { Channel: 'Store Sales', Purchases: 5500 },
      { Channel: 'Web Sales', Purchases: 4500 },
      { Channel: 'Catalog Sales', Purchases: 2500 }
    ],
    'Gold': [
      { Channel: 'Store Sales', Purchases: 2000 },
      { Channel: 'Web Sales', Purchases: 2700 },
      { Channel: 'Catalog Sales', Purchases: 1500 }
    ],
    'Fish': [
      { Channel: 'Store Sales', Purchases: 1800 },
      { Channel: 'Web Sales', Purchases: 1700 },
      { Channel: 'Catalog Sales', Purchases: 1000 }
    ],
    'Fruits': [
      { Channel: 'Store Sales', Purchases: 800 },
      { Channel: 'Web Sales', Purchases: 1100 },
      { Channel: 'Catalog Sales', Purchases: 600 }
    ],
    'Sweets': [
      { Channel: 'Store Sales', Purchases: 400 },
      { Channel: 'Web Sales', Purchases: 800 },
      { Channel: 'Catalog Sales', Purchases: 300 }
    ]
  };

  // Campaign Response Heatmap Matrix Data
  const campaignData = [
    { category: 'Wines', c1: 85, c2: 70, c3: 45, c4: 90, c5: 60 },
    { category: 'Meat', c1: 60, c2: 80, c3: 30, c4: 75, c5: 50 },
    { category: 'Gold', c1: 40, c2: 50, c3: 90, c4: 65, c5: 40 },
    { category: 'Fish', c1: 30, c2: 40, c3: 20, c4: 55, c5: 35 },
    { category: 'Fruits', c1: 20, c2: 30, c3: 15, c4: 40, c5: 25 },
    { category: 'Sweets', c1: 15, c2: 25, c3: 10, c4: 30, c5: 20 },
  ];

  const filteredCategories = selectedCategory === 'All' 
    ? rawCategories 
    : rawCategories.filter(c => c.Category === selectedCategory);

  const totalRevenue = filteredCategories.reduce((acc, curr) => acc + curr.Total_Spend, 0);
  const totalPurchases = filteredCategories.reduce((acc, curr) => acc + curr.Purchases, 0);
  const totalConversions = filteredCategories.reduce((acc, curr) => acc + curr.Conversions, 0);
  const avgIncome = Math.round(
    filteredCategories.reduce((acc, curr) => acc + curr.Avg_Income, 0) / filteredCategories.length
  );

  const currentChannels = channelsData[selectedCategory] || channelsData['All'];
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // CSV Export Functionality
  const exportToCSV = () => {
    const headers = ["Category,Total_Spend,Purchases,Conversions,Avg_Income\n"];
    const rows = filteredCategories.map(c => 
      `${c.Category},${c.Total_Spend},${c.Purchases},${c.Conversions},${c.Avg_Income}`
    );
    const blob = new Blob([headers.concat(rows.join("\n"))], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Marketing_Report_${selectedCategory}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function for Heatmap Colors based on performance intensity
  const getHeatmapBg = (val) => {
    if (val >= 80) return 'bg-emerald-500/80 text-white font-bold';
    if (val >= 60) return 'bg-emerald-600/50 text-emerald-100';
    if (val >= 40) return 'bg-amber-500/40 text-amber-100';
    if (val >= 25) return 'bg-slate-700/60 text-slate-300';
    return 'bg-slate-800 text-slate-500';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <header className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-slate-800 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Digital Marketing & Ecommerce Performance
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Interactive Customer Behavior, Channel Attribution & Campaign Analytics
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-slate-800 p-2 rounded-xl border border-slate-700">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">Category:</span>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {rawCategories.map((cat, idx) => (
                <option key={idx} value={cat.Category}>{cat.Category}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-emerald-500 transition-all shadow-lg cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase">Total Revenue</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><DollarSign className="w-5 h-5" /></div>
          </div>
          <div className="text-2xl font-bold mt-3 text-white">
            {totalRevenue >= 1000000 ? `$${(totalRevenue / 1000000).toFixed(2)}M` : `$${(totalRevenue / 1000).toFixed(1)}K`}
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase">Total Purchases</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><ShoppingCart className="w-5 h-5" /></div>
          </div>
          <div className="text-2xl font-bold mt-3 text-white">{(totalPurchases / 1000).toFixed(2)}K</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase">Total Conversions</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><Target className="w-5 h-5" /></div>
          </div>
          <div className="text-2xl font-bold mt-3 text-white">{totalConversions}</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase">Avg Customer Income</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Users className="w-5 h-5" /></div>
          </div>
          <div className="text-2xl font-bold mt-3 text-white">${(avgIncome / 1000).toFixed(2)}K</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4">Revenue by Product Category</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredCategories}>
                <XAxis dataKey="Category" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
                <Bar dataKey="Total_Spend" radius={[6, 6, 0, 0]}>
                  {filteredCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4">Channel Sales Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={currentChannels} dataKey="Purchases" nameKey="Channel" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5}>
                  {currentChannels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Marketing Campaigns Response Heatmap Section */}
      <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl shadow-lg mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Flame className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold text-white">Campaign Response Heatmap (Acceptance Rates)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase">
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4">Campaign 1</th>
                <th className="py-3 px-4">Campaign 2</th>
                <th className="py-3 px-4">Campaign 3</th>
                <th className="py-3 px-4">Campaign 4</th>
                <th className="py-3 px-4">Campaign 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {campaignData
                .filter(row => selectedCategory === 'All' || row.category === selectedCategory)
                .map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-left font-semibold text-slate-200">{row.category}</td>
                  <td className="py-2 px-3"><span className={`block py-1.5 px-3 rounded-lg ${getHeatmapBg(row.c1)}`}>{row.c1}%</span></td>
                  <td className="py-2 px-3"><span className={`block py-1.5 px-3 rounded-lg ${getHeatmapBg(row.c2)}`}>{row.c2}%</span></td>
                  <td className="py-2 px-3"><span className={`block py-1.5 px-3 rounded-lg ${getHeatmapBg(row.c3)}`}>{row.c3}%</span></td>
                  <td className="py-2 px-3"><span className={`block py-1.5 px-3 rounded-lg ${getHeatmapBg(row.c4)}`}>{row.c4}%</span></td>
                  <td className="py-2 px-3"><span className={`block py-1.5 px-3 rounded-lg ${getHeatmapBg(row.c5)}`}>{row.c5}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
