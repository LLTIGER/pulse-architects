'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Home,
  Calculator,
  TrendingUp,
  Building,
  Square,
  Layers,
  DollarSign,
  Search,
  Save,
  RefreshCw,
  Settings
} from 'lucide-react'

interface PricingFactors {
  baseRatePerSqM: number
  baseRatePerSqFt: number
  floorMultipliers: { [key: number]: number }
  styleMultipliers: { [key: string]: number }
  complexityMultipliers: { [key: string]: number }
  regionMultipliers: { [key: string]: number }
}

interface CalculatorResult {
  totalPrice: number
  pricePerSqM: number
  pricePerSqFt: number
  breakdown: {
    basePrice: number
    floorAdjustment: number
    styleAdjustment: number
    complexityAdjustment: number
    regionAdjustment: number
  }
}

interface BudgetRecommendation {
  maxSqM: number
  maxSqFt: number
  suggestedFloors: number
  recommendedStyle: string
  planType: string
}

const PricingCalculatorPage: React.FC = () => {
  // Pricing factors - these could be stored in database
  const [pricingFactors, setPricingFactors] = useState<PricingFactors>({
    baseRatePerSqM: 15, // $15 per square meter
    baseRatePerSqFt: 1.39, // $1.39 per square foot
    floorMultipliers: {
      1: 1.0,
      2: 1.3,
      3: 1.6,
      4: 2.0
    },
    styleMultipliers: {
      'MODERN': 1.2,
      'TRADITIONAL': 1.0,
      'LUXURY': 1.8,
      'MINIMALIST': 0.9,
      'FARMHOUSE': 1.1,
      'VICTORIAN': 1.5,
      'COLONIAL': 1.3,
      'COMMERCIAL': 1.4
    },
    complexityMultipliers: {
      'SIMPLE': 0.8,
      'MODERATE': 1.0,
      'COMPLEX': 1.4,
      'VERY_COMPLEX': 1.8
    },
    regionMultipliers: {
      'NORTH_AMERICA': 1.0,
      'EUROPE': 1.2,
      'ASIA': 0.8,
      'AUSTRALIA': 1.1,
      'OTHER': 0.9
    }
  })

  // Calculator inputs
  const [area, setArea] = useState<number>(150) // square meters
  const [areaUnit, setAreaUnit] = useState<'sqm' | 'sqft'>('sqm')
  const [floors, setFloors] = useState<number>(1)
  const [style, setStyle] = useState<string>('MODERN')
  const [complexity, setComplexity] = useState<string>('MODERATE')
  const [region, setRegion] = useState<string>('NORTH_AMERICA')

  // Budget calculator inputs
  const [budget, setBudget] = useState<number>(1500)
  const [budgetRecommendation, setBudgetRecommendation] = useState<BudgetRecommendation | null>(null)

  // Results
  const [result, setResult] = useState<CalculatorResult | null>(null)

  // Convert between units
  const convertAreaToSqM = (value: number, unit: 'sqm' | 'sqft'): number => {
    return unit === 'sqft' ? value * 0.092903 : value
  }

  const convertAreaToSqFt = (value: number, unit: 'sqm' | 'sqft'): number => {
    return unit === 'sqm' ? value * 10.7639 : value
  }

  // Calculate pricing
  const calculatePricing = (): CalculatorResult => {
    const areaSqM = convertAreaToSqM(area, areaUnit)
    const baseRate = pricingFactors.baseRatePerSqM
    
    const basePrice = areaSqM * baseRate
    const floorMultiplier = pricingFactors.floorMultipliers[floors] || 1.0
    const styleMultiplier = pricingFactors.styleMultipliers[style] || 1.0
    const complexityMultiplier = pricingFactors.complexityMultipliers[complexity] || 1.0
    const regionMultiplier = pricingFactors.regionMultipliers[region] || 1.0

    const floorAdjustment = basePrice * (floorMultiplier - 1)
    const styleAdjustment = basePrice * (styleMultiplier - 1)
    const complexityAdjustment = basePrice * (complexityMultiplier - 1)
    const regionAdjustment = basePrice * (regionMultiplier - 1)

    const totalPrice = basePrice + floorAdjustment + styleAdjustment + complexityAdjustment + regionAdjustment

    return {
      totalPrice,
      pricePerSqM: totalPrice / areaSqM,
      pricePerSqFt: totalPrice / convertAreaToSqFt(areaSqM, 'sqm'),
      breakdown: {
        basePrice,
        floorAdjustment,
        styleAdjustment,
        complexityAdjustment,
        regionAdjustment
      }
    }
  }

  // Calculate budget recommendations
  const calculateBudgetRecommendation = (): BudgetRecommendation => {
    // Start with simple calculation and work backwards
    const targetFloors = 1
    const targetStyle = 'TRADITIONAL' // Most cost-effective
    const targetComplexity = 'SIMPLE'
    const targetRegion = region

    const baseRate = pricingFactors.baseRatePerSqM
    const floorMultiplier = pricingFactors.floorMultipliers[targetFloors] || 1.0
    const styleMultiplier = pricingFactors.styleMultipliers[targetStyle] || 1.0
    const complexityMultiplier = pricingFactors.complexityMultipliers[targetComplexity] || 1.0
    const regionMultiplier = pricingFactors.regionMultipliers[targetRegion] || 1.0

    const totalMultiplier = floorMultiplier * styleMultiplier * complexityMultiplier * regionMultiplier
    const effectiveRate = baseRate * totalMultiplier

    const maxSqM = Math.floor(budget / effectiveRate)
    const maxSqFt = Math.floor(maxSqM * 10.7639)

    return {
      maxSqM,
      maxSqFt,
      suggestedFloors: targetFloors,
      recommendedStyle: targetStyle,
      planType: maxSqM > 200 ? 'Large Family Home' : maxSqM > 100 ? 'Medium Family Home' : 'Small Home/Apartment'
    }
  }

  // Update calculations when inputs change
  useEffect(() => {
    if (area > 0) {
      setResult(calculatePricing())
    }
  }, [area, areaUnit, floors, style, complexity, region, pricingFactors])

  useEffect(() => {
    if (budget > 0) {
      setBudgetRecommendation(calculateBudgetRecommendation())
    }
  }, [budget, region, pricingFactors])

  // Save pricing factors (placeholder - would save to database)
  const savePricingFactors = async () => {
    // TODO: Implement API call to save pricing factors
    alert('Pricing factors saved! (This would save to database in production)')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 mt-8">
        <div className="container max-w-8xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80">
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-dark">Pricing Calculator</h1>
                <p className="text-sm text-dark/60">Calculate architectural plan pricing and budget recommendations</p>
              </div>
            </div>
            <button
              onClick={savePricingFactors}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-8xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Calculator Inputs */}
          <div className="space-y-6">
            
            {/* Plan Specifications Calculator */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark">Plan Pricing Calculator</h3>
                  <p className="text-sm text-dark/60">Calculate cost based on plan specifications</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Area Input */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Floor Area</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter area"
                      min="1"
                    />
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value as 'sqm' | 'sqft')}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="sqm">sq m</option>
                      <option value="sqft">sq ft</option>
                    </select>
                  </div>
                </div>

                {/* Number of Floors */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Number of Floors</label>
                  <select
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value={1}>1 Floor (×{pricingFactors.floorMultipliers[1]})</option>
                    <option value={2}>2 Floors (×{pricingFactors.floorMultipliers[2]})</option>
                    <option value={3}>3 Floors (×{pricingFactors.floorMultipliers[3]})</option>
                    <option value={4}>4+ Floors (×{pricingFactors.floorMultipliers[4]})</option>
                  </select>
                </div>

                {/* Architectural Style */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Architectural Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {Object.entries(pricingFactors.styleMultipliers).map(([key, multiplier]) => (
                      <option key={key} value={key}>
                        {key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')} (×{multiplier})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Design Complexity */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Design Complexity</label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {Object.entries(pricingFactors.complexityMultipliers).map(([key, multiplier]) => (
                      <option key={key} value={key}>
                        {key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')} (×{multiplier})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Region</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {Object.entries(pricingFactors.regionMultipliers).map(([key, multiplier]) => (
                      <option key={key} value={key}>
                        {key.replace('_', ' ')} (×{multiplier})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Budget-Based Calculator */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark">Budget Calculator</h3>
                  <p className="text-sm text-dark/60">Find what plan you can get with your budget</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Available Budget (USD)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your budget"
                  min="1"
                />
              </div>

              {budgetRecommendation && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Budget Recommendation</h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><span className="font-medium">Max Area:</span> {budgetRecommendation.maxSqM} sq m ({budgetRecommendation.maxSqFt} sq ft)</p>
                    <p><span className="font-medium">Suggested Floors:</span> {budgetRecommendation.suggestedFloors}</p>
                    <p><span className="font-medium">Recommended Style:</span> {budgetRecommendation.recommendedStyle}</p>
                    <p><span className="font-medium">Plan Type:</span> {budgetRecommendation.planType}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Results & Settings */}
          <div className="space-y-6">
            
            {/* Pricing Result */}
            {result && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark">Pricing Result</h3>
                    <p className="text-sm text-dark/60">Calculated plan pricing</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-3xl font-bold text-primary">${result.totalPrice.toFixed(2)}</div>
                    <div className="text-sm text-dark/60">Total Price</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-dark">${result.pricePerSqM.toFixed(2)}</div>
                      <div className="text-xs text-dark/60">per sq m</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-dark">${result.pricePerSqFt.toFixed(2)}</div>
                      <div className="text-xs text-dark/60">per sq ft</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-dark">Price Breakdown:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-dark/60">Base Price:</span>
                        <span className="font-medium">${result.breakdown.basePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/60">Floor Adjustment:</span>
                        <span className="font-medium">${result.breakdown.floorAdjustment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/60">Style Adjustment:</span>
                        <span className="font-medium">${result.breakdown.styleAdjustment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/60">Complexity Adjustment:</span>
                        <span className="font-medium">${result.breakdown.complexityAdjustment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/60">Region Adjustment:</span>
                        <span className="font-medium">${result.breakdown.regionAdjustment.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Configuration */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark">Pricing Configuration</h3>
                  <p className="text-sm text-dark/60">Adjust base rates and multipliers</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Base Rate per sq m ($)</label>
                  <input
                    type="number"
                    value={pricingFactors.baseRatePerSqM}
                    onChange={(e) => setPricingFactors(prev => ({ 
                      ...prev, 
                      baseRatePerSqM: Number(e.target.value),
                      baseRatePerSqFt: Number(e.target.value) * 0.092903
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Base Rate per sq ft ($)</label>
                  <input
                    type="number"
                    value={pricingFactors.baseRatePerSqFt}
                    onChange={(e) => setPricingFactors(prev => ({ 
                      ...prev, 
                      baseRatePerSqFt: Number(e.target.value),
                      baseRatePerSqM: Number(e.target.value) / 0.092903
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="text-xs text-dark/60 mt-2">
                  * Base rates are automatically synchronized between sq m and sq ft
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PricingCalculatorPage