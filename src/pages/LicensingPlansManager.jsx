import React, { useState } from 'react';
import { Search, Crown, ChevronDown, ChevronRight, Save, RefreshCw, Plus, Sparkles, Zap, Building2, Tag, Percent, DollarSign, Users, Calendar, Trash2, Eye } from 'lucide-react';

const LicensingPlansManager = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('plans');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPromoCode, setSelectedPromoCode] = useState(null);
  const [showPromoDetails, setShowPromoDetails] = useState(false);
  
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    monthlyCost: '',
    annualCost: '',
    maxUsers: '',
    icon: 'zap',
    isPublic: true,
    color: 'blue'
  });
  
  const [newPromoCode, setNewPromoCode] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    applicablePlans: [],
    maxUses: '',
    validFrom: '',
    validUntil: ''
  });
  
  const [promoCodes, setPromoCodes] = useState([
    {
      id: 1,
      code: 'SUMMER2024',
      discountType: 'percentage',
      discountValue: 25,
      applicablePlans: ['starter', 'professional'],
      maxUses: 100,
      currentUses: 47,
      validFrom: '2024-06-01',
      validUntil: '2024-08-31',
      status: 'active',
      createdAt: '2024-05-15',
      usedBy: [
        { id: 1, email: 'john@example.com', plan: 'Professional', usedAt: '2024-06-15' },
        { id: 2, email: 'sarah@example.com', plan: 'Starter', usedAt: '2024-06-20' },
        { id: 3, email: 'mike@example.com', plan: 'Professional', usedAt: '2024-07-01' }
      ]
    },
    {
      id: 2,
      code: 'WELCOME50',
      discountType: 'lumpsum',
      discountValue: 50,
      applicablePlans: ['free', 'starter', 'professional', 'enterprise'],
      maxUses: 500,
      currentUses: 324,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      status: 'active',
      createdAt: '2023-12-20',
      usedBy: [
        { id: 4, email: 'alice@example.com', plan: 'Starter', usedAt: '2024-03-10' },
        { id: 5, email: 'bob@example.com', plan: 'Professional', usedAt: '2024-04-22' }
      ]
    },
    {
      id: 3,
      code: 'BLACKFRIDAY',
      discountType: 'percentage',
      discountValue: 40,
      applicablePlans: ['professional', 'enterprise'],
      maxUses: 50,
      currentUses: 50,
      validFrom: '2023-11-24',
      validUntil: '2023-11-27',
      status: 'expired',
      createdAt: '2023-11-10',
      usedBy: [
        { id: 6, email: 'charlie@example.com', plan: 'Enterprise', usedAt: '2023-11-24' },
        { id: 7, email: 'diana@example.com', plan: 'Professional', usedAt: '2023-11-25' }
      ]
    }
  ]);

  const [plans, setPlans] = useState([
    { 
      id: 'free', 
      name: 'Free', 
      description: 'Perfect for individuals getting started',
      price: '$0',
      billingPeriod: 'forever',
      subscribers: 1247,
      color: 'gray',
      icon: 'sparkles',
      popular: false,
      limits: {
        users: 1,
        storage: '500 MB',
        contracts: 5,
        templates: 3
      }
    },
    { 
      id: 'starter', 
      name: 'Starter', 
      description: 'For small teams starting to grow',
      price: '$29',
      billingPeriod: 'per month',
      subscribers: 856,
      color: 'blue',
      icon: 'zap',
      popular: false,
      limits: {
        users: 5,
        storage: '5 GB',
        contracts: 50,
        templates: 20
      }
    },
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'Advanced features for growing businesses',
      price: '$99',
      billingPeriod: 'per month',
      subscribers: 432,
      color: 'purple',
      icon: 'crown',
      popular: true,
      limits: {
        users: 25,
        storage: '50 GB',
        contracts: 'Unlimited',
        templates: 'Unlimited'
      }
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise', 
      description: 'Custom solutions for large organizations',
      price: 'Custom',
      billingPeriod: 'contact us',
      subscribers: 89,
      color: 'amber',
      icon: 'building',
      popular: false,
      limits: {
        users: 'Unlimited',
        storage: 'Unlimited',
        contracts: 'Unlimited',
        templates: 'Unlimited'
      }
    }
  ]);

  const [features] = useState({
    dashboard: {
      label: 'Dashboard',
      category: 'Core Features',
      features: { 
        viewDashboard: { 
          label: 'View Dashboard',
          free: true, 
          starter: true, 
          professional: true, 
          enterprise: true 
        } 
      }
    },
    permissionGroups: {
      label: 'Permission Groups',
      category: 'User Management',
      features: {
        createGroups: { label: 'Create Groups', free: false, starter: false, professional: true, enterprise: true },
        updateGroups: { label: 'Update Groups', free: false, starter: false, professional: true, enterprise: true },
        deleteGroups: { label: 'Delete Groups', free: false, starter: false, professional: true, enterprise: true },
        viewGroups: { label: 'View Groups', free: false, starter: true, professional: true, enterprise: true }
      }
    },
    categories: {
      label: 'Categories',
      category: 'Content Management',
      features: {
        createCategories: { label: 'Create Categories', free: false, starter: true, professional: true, enterprise: true },
        updateCategories: { label: 'Update Categories', free: false, starter: false, professional: true, enterprise: true },
        deleteCategories: { label: 'Delete Categories', free: false, starter: false, professional: true, enterprise: true },
        viewCategories: { label: 'View Categories', free: true, starter: true, professional: true, enterprise: true }
      }
    }
  });

  const [planFeatures, setPlanFeatures] = useState({});

  const toggleModule = (moduleKey) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  const toggleFeature = (planId, moduleKey, featureKey) => {
    setPlanFeatures(prev => {
      const newFeatures = { ...prev };
      if (!newFeatures[planId]) newFeatures[planId] = {};
      if (!newFeatures[planId][moduleKey]) newFeatures[planId][moduleKey] = {};
      
      newFeatures[planId][moduleKey][featureKey] = !newFeatures[planId][moduleKey][featureKey];
      return newFeatures;
    });
    setHasChanges(true);
  };

  const getFeatureValue = (planId, moduleKey, featureKey) => {
    if (planFeatures[planId]?.[moduleKey]?.[featureKey] !== undefined) {
      return planFeatures[planId][moduleKey][featureKey];
    }
    return features[moduleKey]?.features[featureKey]?.[planId] || false;
  };

  const saveChanges = () => {
    setTimeout(() => {
      setHasChanges(false);
      alert('Plan features updated successfully!');
    }, 500);
  };

  const resetFeatures = () => {
    if (selectedPlan) {
      setPlanFeatures(prev => {
        const newFeatures = { ...prev };
        delete newFeatures[selectedPlan.id];
        return newFeatures;
      });
    }
    setHasChanges(false);
  };

  const getPlanIcon = (iconType) => {
    switch(iconType) {
      case 'crown': return <Crown className="w-6 h-6" />;
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'building': return <Building2 className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const iconOptions = [
    { value: 'sparkles', label: 'Sparkles', icon: Sparkles },
    { value: 'crown', label: 'Crown', icon: Crown },
    { value: 'zap', label: 'Zap', icon: Zap },
    { value: 'building', label: 'Building', icon: Building2 }
  ];

  const colorOptions = [
    { value: 'gray', label: 'Gray', class: 'from-gray-500 to-gray-600' },
    { value: 'blue', label: 'Blue', class: 'from-blue-500 to-blue-600' },
    { value: 'purple', label: 'Purple', class: 'from-purple-500 to-purple-600' },
    { value: 'amber', label: 'Amber', class: 'from-amber-500 to-amber-600' },
    { value: 'green', label: 'Green', class: 'from-green-500 to-green-600' },
    { value: 'red', label: 'Red', class: 'from-red-500 to-red-600' },
    { value: 'pink', label: 'Pink', class: 'from-pink-500 to-pink-600' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      gray: 'from-gray-500 to-gray-600',
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      amber: 'from-amber-500 to-amber-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      pink: 'from-pink-500 to-pink-600'
    };
    return colors[color] || colors.blue;
  };

  const groupedFeatures = Object.entries(features).reduce((acc, [key, module]) => {
    const category = module.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push({ key, ...module });
    return acc;
  }, {});

  const handleCreatePlan = (e) => {
    e.preventDefault();
    
    const planToAdd = {
      id: newPlan.name.toLowerCase().replace(/\s+/g, '-'),
      name: newPlan.name,
      description: newPlan.description,
      price: newPlan.monthlyCost ? `$${newPlan.monthlyCost}` : '$0',
      billingPeriod: 'per month',
      annualPrice: newPlan.annualCost ? `$${newPlan.annualCost}` : null,
      subscribers: 0,
      color: newPlan.color,
      icon: newPlan.icon,
      popular: false,
      isPublic: newPlan.isPublic,
      limits: {
        users: newPlan.maxUsers || 'Unlimited',
        storage: '10 GB',
        contracts: 'Custom',
        templates: 'Custom'
      }
    };

    setPlans([...plans, planToAdd]);
    
    setNewPlan({
      name: '',
      description: '',
      monthlyCost: '',
      annualCost: '',
      maxUsers: '',
      icon: 'zap',
      isPublic: true,
      color: 'blue'
    });
    
    setShowCreateForm(false);
    setActiveTab('plans');
    alert('New plan created successfully!');
  };

  const calculateAnnualSavings = () => {
    if (newPlan.monthlyCost && newPlan.annualCost) {
      const monthly = parseFloat(newPlan.monthlyCost) * 12;
      const annual = parseFloat(newPlan.annualCost);
      const savings = monthly - annual;
      const percentage = ((savings / monthly) * 100).toFixed(0);
      return { savings, percentage };
    }
    return null;
  };

  const handleCreatePromoCode = (e) => {
    e.preventDefault();
    
    const promoToAdd = {
      id: promoCodes.length + 1,
      code: newPromoCode.code.toUpperCase(),
      discountType: newPromoCode.discountType,
      discountValue: parseFloat(newPromoCode.discountValue),
      applicablePlans: newPromoCode.applicablePlans,
      maxUses: parseInt(newPromoCode.maxUses),
      currentUses: 0,
      validFrom: newPromoCode.validFrom,
      validUntil: newPromoCode.validUntil,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      usedBy: []
    };

    setPromoCodes([promoToAdd, ...promoCodes]);
    
    setNewPromoCode({
      code: '',
      discountType: 'percentage',
      discountValue: '',
      applicablePlans: [],
      maxUses: '',
      validFrom: '',
      validUntil: ''
    });
    
    alert('Promo code created successfully!');
  };

  const togglePlanSelection = (planId) => {
    setNewPromoCode(prev => {
      const plans = prev.applicablePlans.includes(planId)
        ? prev.applicablePlans.filter(p => p !== planId)
        : [...prev.applicablePlans, planId];
      return { ...prev, applicablePlans: plans };
    });
  };

  const getPromoStatus = (promo) => {
    const today = new Date().toISOString().split('T')[0];
    if (promo.currentUses >= promo.maxUses) return 'expired';
    if (today > promo.validUntil) return 'expired';
    if (today < promo.validFrom) return 'scheduled';
    return 'active';
  };

  const deletePromoCode = (id) => {
    if (window.confirm('Are you sure you want to delete this promo code?')) {
      setPromoCodes(promoCodes.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Licensing Plans Manager</h1>
                <p className="text-sm text-gray-500">Configure features and permissions for each subscription tier</p>
              </div>
            </div>
            {hasChanges && (
              <div className="flex gap-2">
                <button
                  onClick={resetFeatures}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2 transition-all shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-6 py-2.5 rounded-md font-medium transition-all ${
              activeTab === 'plans'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Manage Plans
          </button>
          <button
            onClick={() => {
              setActiveTab('create');
              setShowCreateForm(true);
            }}
            className={`px-6 py-2.5 rounded-md font-medium transition-all flex items-center gap-2 ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            Create New Plan
          </button>
          <button
            onClick={() => setActiveTab('promo')}
            className={`px-6 py-2.5 rounded-md font-medium transition-all flex items-center gap-2 ${
              activeTab === 'promo'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Tag className="w-4 h-4" />
            Promo Codes
          </button>
        </div>

        {activeTab === 'plans' && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-purple-600" />
                    Subscription Plans
                  </h2>
                </div>
                
                <div className="text-sm text-gray-500">
                  Total subscribers: {plans.reduce((sum, plan) => sum + plan.subscribers, 0).toLocaleString()}
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-320px)]">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-4 border-b border-gray-200 cursor-pointer transition-all ${
                      selectedPlan?.id === plan.id 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses(plan.color)} flex items-center justify-center text-white shadow-md`}>
                        {getPlanIcon(plan.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">{plan.name}</p>
                          {plan.popular && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{plan.description}</p>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-xs text-gray-500">/ {plan.billingPeriod}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-8 bg-white rounded-xl shadow-sm border border-gray-200">
              {selectedPlan ? (
                <>
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedPlan.name} Plan</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedPlan.description}</p>
                  </div>

                  <div className="p-6 overflow-y-auto max-h-[calc(100vh-320px)]">
                    {Object.entries(groupedFeatures).map(([category, modules]) => (
                      <div key={category} className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h4>
                        <div className="space-y-3">
                          {modules.map((module) => (
                            <div key={module.key} className="border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleModule(module.key)}
                                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
                              >
                                <span className="font-medium text-gray-900">{module.label}</span>
                                {expandedModules[module.key] ? (
                                  <ChevronDown className="w-5 h-5 text-gray-600" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-gray-600" />
                                )}
                              </button>

                              {expandedModules[module.key] && (
                                <div className="p-4 bg-white space-y-2">
                                  {Object.entries(module.features).map(([featureKey, feature]) => {
                                    const isEnabled = getFeatureValue(selectedPlan.id, module.key, featureKey);
                                    return (
                                      <label
                                        key={featureKey}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                                      >
                                        <span className="text-sm text-gray-700 font-medium">{feature.label}</span>
                                        <div className="relative">
                                          <input
                                            type="checkbox"
                                            checked={isEnabled}
                                            onChange={() => toggleFeature(selectedPlan.id, module.key, featureKey)}
                                            className="sr-only"
                                          />
                                          <div className={`w-11 h-6 rounded-full transition-all ${
                                            isEnabled ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-300'
                                          }`}>
                                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                                              isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                            } mt-0.5`} />
                                          </div>
                                        </div>
                                      </label>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Plan Selected</h3>
                    <p className="text-gray-500">Select a subscription plan to configure features</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Create New Plan</h2>
                <p className="text-sm text-gray-600 mt-1">Configure a new subscription plan for your customers</p>
              </div>
              <form onSubmit={handleCreatePlan} className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      placeholder="e.g., Premium, Business, Enterprise"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                      placeholder="Brief description of this plan's value proposition"
                      rows="3"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Cost ($) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={newPlan.monthlyCost}
                        onChange={(e) => setNewPlan({ ...newPlan, monthlyCost: e.target.value })}
                        placeholder="29.99"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Cost ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={newPlan.annualCost}
                        onChange={(e) => setNewPlan({ ...newPlan, annualCost: e.target.value })}
                        placeholder="299.99"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {calculateAnnualSavings() && (
                        <p className="text-xs text-green-600 mt-1">
                          Saves ${calculateAnnualSavings().savings.toFixed(2)} ({calculateAnnualSavings().percentage}% off)
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Number of Users
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newPlan.maxUsers}
                      onChange={(e) => setNewPlan({ ...newPlan, maxUsers: e.target.value })}
                      placeholder="Leave empty for unlimited"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave blank for unlimited users</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan Icon *
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {iconOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setNewPlan({ ...newPlan, icon: option.value })}
                            className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                              newPlan.icon === option.value
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <IconComponent className="w-8 h-8 text-gray-700" />
                            <span className="text-xs text-gray-600">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan Color *
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {colorOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setNewPlan({ ...newPlan, color: option.value })}
                          className={`h-12 rounded-lg bg-gradient-to-br ${option.class} transition-all ${
                            newPlan.color === option.value
                              ? 'ring-4 ring-offset-2 ring-blue-400'
                              : 'hover:scale-105'
                          }`}
                          title={option.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={newPlan.isPublic}
                      onChange={(e) => setNewPlan({ ...newPlan, isPublic: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="isPublic" className="text-sm text-gray-700">
                      Make this plan publicly visible
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Plan
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'promo' && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <h2 className="text-xl font-bold text-gray-900">Create Promo Code</h2>
              </div>
              <form onSubmit={handleCreatePromoCode} className="p-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    required
                    value={newPromoCode.code}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, code: e.target.value.toUpperCase() })}
                    placeholder="PROMO CODE"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg uppercase"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewPromoCode({ ...newPromoCode, discountType: 'percentage' })}
                      className={`p-3 border-2 rounded-lg ${newPromoCode.discountType === 'percentage' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
                    >
                      Percentage
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewPromoCode({ ...newPromoCode, discountType: 'lumpsum' })}
                      className={`p-3 border-2 rounded-lg ${newPromoCode.discountType === 'lumpsum' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
                    >
                      Lump Sum
                    </button>
                  </div>

                  <input
                    type="number"
                    required
                    value={newPromoCode.discountValue}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, discountValue: e.target.value })}
                    placeholder="Discount Value"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  />

                  <div className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
                    {plans.map((plan) => (
                      <label key={plan.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newPromoCode.applicablePlans.includes(plan.id)}
                          onChange={() => togglePlanSelection(plan.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">{plan.name}</span>
                      </label>
                    ))}
                  </div>

                  <input
                    type="number"
                    required
                    value={newPromoCode.maxUses}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, maxUses: e.target.value })}
                    placeholder="Maximum Uses"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      required
                      value={newPromoCode.validFrom}
                      onChange={(e) => setNewPromoCode({ ...newPromoCode, validFrom: e.target.value })}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="date"
                      required
                      value={newPromoCode.validUntil}
                      onChange={(e) => setNewPromoCode({ ...newPromoCode, validUntil: e.target.value })}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={newPromoCode.applicablePlans.length === 0}
                  className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg disabled:opacity-50"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Create Promo Code
                </button>
              </form>
            </div>

            <div className="col-span-7 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Promo Code History</h2>
              </div>

              <div className="divide-y divide-gray-200 overflow-y-auto max-h-[calc(100vh-220px)]">
                {promoCodes.map((promo) => {
                  const status = getPromoStatus(promo);
                  return (
                    <div key={promo.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <code className="text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                              {promo.code}
                            </code>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              status === 'active' ? 'bg-green-100 text-green-700' :
                              status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                            <span className="text-sm text-purple-600">
                              {promo.discountType === 'percentage' ? `${promo.discountValue}% off` : `${promo.discountValue} off`}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>Uses: <strong>{promo.currentUses} / {promo.maxUses}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{promo.validFrom} to {promo.validUntil}</span>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {promo.applicablePlans.map((planId) => {
                              const plan = plans.find(p => p.id === planId);
                              return plan ? (
                                <span key={planId} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {plan.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedPromoCode(promo);
                              setShowPromoDetails(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deletePromoCode(promo.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div
                          className={`h-2 rounded-full ${promo.currentUses >= promo.maxUses ? 'bg-gray-400' : 'bg-green-600'}`}
                          style={{ width: `${Math.min((promo.currentUses / promo.maxUses) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {showPromoDetails && selectedPromoCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Promo Code Details</h3>
                  <code className="text-lg font-bold text-green-600">{selectedPromoCode.code}</code>
                </div>
                <button
                  onClick={() => {
                    setShowPromoDetails(false);
                    setSelectedPromoCode(null);
                  }}
                  className="p-2 hover:bg-white rounded-lg"
                >
                  <span className="text-2xl text-gray-500">×</span>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Discount</p>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedPromoCode.discountType === 'percentage' 
                      ? `${selectedPromoCode.discountValue}%` 
                      : `${selectedPromoCode.discountValue}`}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Usage</p>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedPromoCode.currentUses} / {selectedPromoCode.maxUses}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Used By ({selectedPromoCode.usedBy.length})</h4>
                {selectedPromoCode.usedBy.length > 0 ? (
                  <div className="space-y-2">
                    {selectedPromoCode.usedBy.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{user.email}</p>
                          <p className="text-sm text-gray-500">Plan: {user.plan}</p>
                        </div>
                        <p className="text-sm text-gray-500">{user.usedAt}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No users have used this promo code yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicensingPlansManager;