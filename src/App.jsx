import React, { useState, useEffect } from 'react';
import { 
  Home, Users, DollarSign, TrendingUp, Phone, Mail, MapPin, 
  AlertCircle, Check, ChevronRight, Search, PlusCircle, FileText,
  Target, Zap, BarChart3, Clock, CheckCircle, XCircle, Activity,
  Calculator, Calendar, Bell, Settings, LogOut, Menu, X, Filter,
  Star, MessageSquare, Briefcase, Eye, Download, Upload
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'John Smith',
      property: '123 Main St, Dallas, TX',
      phone: '555-0123',
      email: 'john@email.com',
      motivation: 9,
      askingPrice: 250000,
      arv: 320000,
      repairCost: 45000,
      status: 'hot',
      source: 'PPC',
      dateAdded: '2024-01-15',
      lastContact: '2024-01-16',
      notes: 'Motivated seller, divorce situation. Needs quick sale.',
      dealType: 'wholesale',
      estimatedProfit: 25000
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      property: '456 Oak Ave, Fort Worth, TX',
      phone: '555-0124',
      email: 'sarah@email.com',
      motivation: 7,
      askingPrice: 180000,
      arv: 240000,
      repairCost: 30000,
      status: 'warm',
      source: 'Cold Call',
      dateAdded: '2024-01-14',
      lastContact: '2024-01-15',
      notes: 'Inherited property, lives out of state',
      dealType: 'subject-to',
      estimatedProfit: 18000
    },
    {
      id: 3,
      name: 'Mike Williams',
      property: '789 Pine Rd, Arlington, TX',
      phone: '555-0125',
      email: 'mike@email.com',
      motivation: 8,
      askingPrice: 195000,
      arv: 260000,
      repairCost: 35000,
      status: 'hot',
      source: 'SMS Campaign',
      dateAdded: '2024-01-13',
      lastContact: '2024-01-16',
      notes: 'Job relocation, needs to sell within 30 days',
      dealType: 'wholesale',
      estimatedProfit: 22000
    }
  ]);

  const [newLead, setNewLead] = useState({
    name: '',
    property: '',
    phone: '',
    email: '',
    motivation: 5,
    askingPrice: '',
    arv: '',
    repairCost: '',
    source: 'Cold Call',
    notes: '',
    dealType: 'wholesale'
  });

  const [showAddLead, setShowAddLead] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New hot lead from PPC campaign', time: '2 min ago', read: false },
    { id: 2, message: 'Contract signed for 789 Pine Rd', time: '1 hour ago', read: false },
    { id: 3, message: 'Follow up needed: Sarah Johnson', time: '3 hours ago', read: true }
  ]);

  // Calculate MAO (Maximum Allowable Offer)
  const calculateMAO = (arv, repairCost) => {
    const wholesaleFee = 15000; // Your assignment fee
    return (arv * 0.7) - repairCost - wholesaleFee;
  };

  // Calculate estimated profit
  const calculateProfit = (askingPrice, arv, repairCost, dealType) => {
    if (dealType === 'wholesale') {
      const mao = calculateMAO(arv, repairCost);
      return Math.max(0, askingPrice - mao);
    } else {
      // Subject-to calculation
      return Math.max(0, (arv * 0.9) - askingPrice - 5000); // Simplified
    }
  };

  // Add new lead
  const handleAddLead = () => {
    const profit = calculateProfit(
      parseFloat(newLead.askingPrice),
      parseFloat(newLead.arv),
      parseFloat(newLead.repairCost),
      newLead.dealType
    );

    const lead = {
      ...newLead,
      id: leads.length + 1,
      status: newLead.motivation >= 8 ? 'hot' : newLead.motivation >= 5 ? 'warm' : 'cold',
      dateAdded: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      estimatedProfit: profit
    };

    setLeads([lead, ...leads]);
    setShowAddLead(false);
    setNewLead({
      name: '',
      property: '',
      phone: '',
      email: '',
      motivation: 5,
      askingPrice: '',
      arv: '',
      repairCost: '',
      source: 'Cold Call',
      notes: '',
      dealType: 'wholesale'
    });

    // Add notification
    setNotifications([
      { id: Date.now(), message: `New lead added: ${lead.name}`, time: 'Just now', read: false },
      ...notifications
    ]);
  };

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    totalLeads: leads.length,
    hotLeads: leads.filter(l => l.status === 'hot').length,
    totalPotentialProfit: leads.reduce((sum, l) => sum + l.estimatedProfit, 0),
    avgDealSize: leads.length > 0 ? leads.reduce((sum, l) => sum + l.estimatedProfit, 0) / leads.length : 0,
    monthlyTarget: 35000,
    currentMonthProfit: 43000 // Example current month profit
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'leads', label: 'Lead Pipeline', icon: Users },
    { id: 'analyzer', label: 'Deal Analyzer', icon: Calculator },
    { id: 'marketing', label: 'Marketing', icon: Target },
    { id: 'contracts', label: 'Contracts', icon: FileText },
    { id: 'buyers', label: 'Buyers List', icon: Briefcase },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <div>
            <h1 className="text-xl font-bold">REI Deal Machine</h1>
            <p className="text-xs text-blue-200">Wholesale & SubTo System</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-blue-700 transition-colors ${
                activeTab === item.id ? 'bg-blue-700 border-l-4 border-white' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
          <div className="text-sm text-blue-200">
            <p>Monthly Goal: $35,000</p>
            <div className="mt-2 bg-blue-700 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (stats.currentMonthProfit / stats.monthlyTarget) * 100)}%` }}
              />
            </div>
            <p className="mt-1 text-xs">${stats.currentMonthProfit.toLocaleString()} achieved</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <span className="text-sm font-medium text-gray-700">User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Track your wholesale and subject-to deals</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <Users className="w-10 h-10 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Hot Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.hotLeads}</p>
                    <p className="text-xs text-orange-600 mt-1">Ready to close</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-orange-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Potential Profit</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalPotentialProfit.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1">In pipeline</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Deal Size</p>
                    <p className="text-2xl font-bold text-gray-900">${Math.round(stats.avgDealSize).toLocaleString()}</p>
                    <p className="text-xs text-blue-600 mt-1">Per transaction</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Recent Leads</h3>
                </div>
                <div className="p-4">
                  {leads.slice(0, 5).map(lead => (
                    <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-600">{lead.property}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'hot' ? 'bg-red-100 text-red-800' :
                        lead.status === 'warm' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Marketing Performance</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">PPC Campaigns</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cold Calling</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">SMS Campaigns</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Direct Mail</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lead Pipeline */}
        {activeTab === 'leads' && (
          <div className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Lead Pipeline</h2>
                <p className="text-gray-600">Manage and track your leads</p>
              </div>
              <button
                onClick={() => setShowAddLead(true)}
                className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Lead</span>
              </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {['all', 'hot', 'warm', 'cold'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Lead Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLeads.map(lead => (
                <div key={lead.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {lead.property}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'hot' ? 'bg-red-100 text-red-800' :
                        lead.status === 'warm' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {lead.email}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Asking Price</p>
                        <p className="font-semibold">${lead.askingPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">ARV</p>
                        <p className="font-semibold">${lead.arv.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Repair Cost</p>
                        <p className="font-semibold">${lead.repairCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Est. Profit</p>
                        <p className="font-semibold text-green-600">${lead.estimatedProfit.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Motivation Level</p>
                      <div className="flex space-x-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-full ${
                              i < lead.motivation ? 'bg-gradient-to-r from-yellow-400 to-red-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Source: {lead.source}</span>
                      <span className="text-gray-500">{lead.dealType}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-3">{lead.notes}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                          View Details
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition-colors text-sm">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deal Analyzer */}
        {activeTab === 'analyzer' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Deal Analyzer</h2>
              <p className="text-gray-600">Calculate MAO and analyze deal profitability</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123 Main St, City, State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">After Repair Value (ARV)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="$300,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Repair Costs</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="$45,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Asking Price</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="$200,000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Deal Analysis</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ARV x 70%:</span>
                      <span className="font-semibold">$210,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Less Repairs:</span>
                      <span className="font-semibold text-red-600">-$45,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Less Assignment Fee:</span>
                      <span className="font-semibold text-red-600">-$15,000</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-gray-900 font-semibold">Maximum Allowable Offer:</span>
                      <span className="text-xl font-bold text-green-600">$150,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Potential Profit:</span>
                      <span className="font-semibold text-green-600">$15,000</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Calculate Deal
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                      Save to Pipeline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Marketing */}
        {activeTab === 'marketing' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h2>
              <p className="text-gray-600">Manage your lead generation campaigns</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Active Campaigns</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Google PPC - Dallas Market</h4>
                        <p className="text-sm text-gray-600">Running for 15 days</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Spend</p>
                        <p className="font-semibold">$2,450</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Leads</p>
                        <p className="font-semibold">18</p>
                      </div>
                      <div>
                        <p className="text-gray-500">CPL</p>
                        <p className="font-semibold">$136</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">SMS Campaign - Absentee Owners</h4>
                        <p className="text-sm text-gray-600">Running for 7 days</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Sent</p>
                        <p className="font-semibold">3,500</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Responses</p>
                        <p className="font-semibold">142</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rate</p>
                        <p className="font-semibold">4.1%</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Cold Calling - Pre-Foreclosure</h4>
                        <p className="text-sm text-gray-600">Running for 21 days</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Calls</p>
                        <p className="font-semibold">1,247</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Contacts</p>
                        <p className="font-semibold">89</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Leads</p>
                        <p className="font-semibold">12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Lead Sources Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">PPC (Google/Facebook)</span>
                      <span className="text-sm text-gray-600">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cold Calling</span>
                      <span className="text-sm text-gray-600">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">SMS Campaigns</span>
                      <span className="text-sm text-gray-600">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-600 h-3 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Direct Mail</span>
                      <span className="text-sm text-gray-600">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
                      <span className="text-sm font-medium">Launch New Campaign</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
                      <span className="text-sm font-medium">Import Lead List</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
                      <span className="text-sm font-medium">Campaign Templates</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contracts */}
        {activeTab === 'contracts' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Contracts & Documents</h2>
              <p className="text-gray-600">Manage your wholesale and subject-to contracts</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">Active Contracts</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Purchase Agreement - 123 Main St</h4>
                          <p className="text-sm text-gray-600">John Smith • Wholesale Deal</p>
                          <p className="text-xs text-gray-500 mt-1">Expires in 14 days</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Pending Signature</span>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Assignment Contract - 456 Oak Ave</h4>
                          <p className="text-sm text-gray-600">Sarah Johnson • Subject-To</p>
                          <p className="text-xs text-gray-500 mt-1">Signed 3 days ago</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Active</span>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold mb-4">Contract Templates</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Purchase Agreement</span>
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Assignment Contract</span>
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Subject-To Agreement</span>
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">JV Agreement</span>
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buyers List */}
        {activeTab === 'buyers' && (
          <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Buyers List</h2>
                <p className="text-gray-600">Your cash buyers and investors</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                <PlusCircle className="w-5 h-5" />
                <span>Add Buyer</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criteria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Deal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">ABC Investments LLC</div>
                        <div className="text-sm text-gray-500">Mark Thompson</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">SFH, 3+BR, Dallas Area</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$150K-$300K</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 weeks ago</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900">Contact</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Quick Flip Properties</div>
                        <div className="text-sm text-gray-500">Jennifer Davis</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Any condition, Fort Worth</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$100K-$250K</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 month ago</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900">Contact</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showAddLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Lead</h2>
                <button
                  onClick={() => setShowAddLead(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newLead.name}
                      onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                  <input
                    type="text"
                    value={newLead.property}
                    onChange={(e) => setNewLead({ ...newLead, property: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asking Price</label>
                    <input
                      type="number"
                      value={newLead.askingPrice}
                      onChange={(e) => setNewLead({ ...newLead, askingPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ARV</label>
                    <input
                      type="number"
                      value={newLead.arv}
                      onChange={(e) => setNewLead({ ...newLead, arv: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repair Cost</label>
                    <input
                      type="number"
                      value={newLead.repairCost}
                      onChange={(e) => setNewLead({ ...newLead, repairCost: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
                    <select
                      value={newLead.source}
                      onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Cold Call">Cold Call</option>
                      <option value="PPC">PPC</option>
                      <option value="SMS Campaign">SMS Campaign</option>
                      <option value="Direct Mail">Direct Mail</option>
                      <option value="Referral">Referral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deal Type</label>
                    <select
                      value={newLead.dealType}
                      onChange={(e) => setNewLead({ ...newLead, dealType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="wholesale">Wholesale</option>
                      <option value="subject-to">Subject-To</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motivation Level: {newLead.motivation}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newLead.motivation}
                    onChange={(e) => setNewLead({ ...newLead, motivation: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddLead(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLead}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
