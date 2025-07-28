import React, { useState } from 'react'

interface FarmerData {
  id: string
  name: string
  fatherName: string
  village: string
}

interface QualityData {
  bagCount: number
}

interface WithdrawalEntry {
  id: string
  farmerName: string
  fatherName: string
  village: string
  lotNumber: string
  categories: {
    mota: QualityData
    gulla: QualityData
    kirri: QualityData
  }
  totalBags: number
  date: string
}

export default function InventoryWithdrawal() {
  const [selectedFarmer, setSelectedFarmer] = useState<string>('')
  const [lotNumber, setLotNumber] = useState('')
  const [categories, setCategories] = useState({
    mota: { bagCount: 0 },
    gulla: { bagCount: 0 },
    kirri: { bagCount: 0 }
  })
  const [withdrawalDate, setWithdrawalDate] = useState(new Date().toISOString().split('T')[0])
  const [withdrawalEntries, setWithdrawalEntries] = useState<WithdrawalEntry[]>([])

  // Mock farmer data - in real app, this would come from the database
  const farmers: FarmerData[] = [
    { id: '1', name: 'रामेश कुमार', fatherName: 'श्याम लाल', village: 'रामपुर' },
    { id: '2', name: 'सुरेश सिंह', fatherName: 'राम सिंह', village: 'श्यामपुर' },
    { id: '3', name: 'मोहन लाल', fatherName: 'गोपाल दास', village: 'गोपालपुर' }
  ]

  const updateCategoryBagCount = (category: keyof typeof categories, value: number) => {
    setCategories(prev => ({
      ...prev,
      [category]: { bagCount: value }
    }))
  }

  const getTotalBags = () => {
    return categories.mota.bagCount + categories.gulla.bagCount + categories.kirri.bagCount
  }

  const handleWithdrawal = () => {
    const selectedFarmerData = farmers.find(f => f.id === selectedFarmer)
    if (!selectedFarmerData || getTotalBags() === 0) {
      alert('कृपया किसान का चयन करें और मात्रा भरें')
      return
    }

    if (!lotNumber.trim()) {
      alert('कृपया लॉट नंबर भरें')
      return
    }

    const newEntry: WithdrawalEntry = {
      id: Date.now().toString(),
      farmerName: selectedFarmerData.name,
      fatherName: selectedFarmerData.fatherName,
      village: selectedFarmerData.village,
      lotNumber: lotNumber,
      categories: { ...categories },
      totalBags: getTotalBags(),
      date: withdrawalDate
    }

    setWithdrawalEntries(prev => [newEntry, ...prev])
    
    // Reset form
    setSelectedFarmer('')
    setLotNumber('')
    setCategories({
      mota: { bagCount: 0 },
      gulla: { bagCount: 0 },
      kirri: { bagCount: 0 }
    })
    setWithdrawalDate(new Date().toISOString().split('T')[0])

    alert('निकासी सफलतापूर्वक दर्ज की गई!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">स्टॉक निकासी</h2>
      </div>

      {/* Withdrawal Form */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">नई निकासी एंट्री</h3>
        
        <div className="space-y-6">
          {/* Farmer Selection */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-gray-700">किसान का चयन</h4>
            <div>
              <label className="form-label">किसान</label>
              <select 
                className="form-input" 
                value={selectedFarmer}
                onChange={(e) => setSelectedFarmer(e.target.value)}
              >
                <option value="">किसान का चयन करें</option>
                {farmers.map(farmer => (
                  <option key={farmer.id} value={farmer.id}>
                    {farmer.name} - {farmer.fatherName} - {farmer.village}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-gray-700">तारीख</h4>
            <div>
              <label className="form-label">निकासी की तारीख</label>
              <input 
                type="date" 
                className="form-input"
                value={withdrawalDate}
                onChange={(e) => setWithdrawalDate(e.target.value)}
              />
            </div>
          </div>

          {/* Lot Number */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-gray-700">लॉट नंबर</h4>
            <div>
              <label className="form-label">लॉट नंबर दर्ज करें</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="जैसे: 1/100, 2/50*, 3/75 (क्रम संख्या/बैग संख्या)"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
              />
            </div>
            {lotNumber.trim() && (
              <div className="mt-2 text-sm text-gray-600">
                लॉट नंबर: <span className="font-mono font-semibold">{lotNumber}</span>
                {lotNumber.includes('*') && <span className="text-orange-600 ml-2">(टिप्पणी सहित)</span>}
              </div>
            )}
          </div>

          {/* Quality Categories */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-gray-700">गुणवत्ता के अनुसार मात्रा</h4>
            <div className="space-y-4">
              {/* Mota */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-3">मोटा (Mota)</h5>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="form-label">बैग संख्या</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      min="0"
                      value={categories.mota.bagCount || ''}
                      onChange={(e) => updateCategoryBagCount('mota', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              {/* Gulla */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-3">गुल्ला (Gulla)</h5>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="form-label">बैग संख्या</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      min="0"
                      value={categories.gulla.bagCount || ''}
                      onChange={(e) => updateCategoryBagCount('gulla', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              {/* Kirri */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h5 className="font-semibold text-orange-800 mb-3">किरी (Kirri)</h5>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="form-label">बैग संख्या</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      min="0"
                      value={categories.kirri.bagCount || ''}
                      onChange={(e) => updateCategoryBagCount('kirri', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">कुल योग</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <span className="text-sm text-gray-600">कुल बैग:</span>
                <span className="ml-2 font-semibold text-lg">{getTotalBags()}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleWithdrawal}
            className="btn-primary w-full"
          >
            निकासी दर्ज करें
          </button>
        </div>
      </div>

      {/* Withdrawal History */}
      {withdrawalEntries.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">निकासी रिकॉर्ड</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">किसान</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">पिता का नाम</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">गांव</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">लॉट नंबर</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">मोटा</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">गुल्ला</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">किरी</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">कुल बैग</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">तारीख</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{entry.farmerName}</td>
                    <td className="py-3 px-4">{entry.fatherName}</td>
                    <td className="py-3 px-4">{entry.village}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-mono">
                        {entry.lotNumber}
                        {entry.lotNumber.includes('*') && (
                          <span className="text-orange-600 ml-1" title="इस लॉट में टिप्पणी है">
                            (टिप्पणी सहित)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{entry.categories.mota.bagCount} बैग</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{entry.categories.gulla.bagCount} बैग</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{entry.categories.kirri.bagCount} बैग</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{entry.totalBags}</td>
                    <td className="py-3 px-4">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
