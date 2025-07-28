import React, { useState } from 'react'

interface Farmer {
  id: string
  name: string
  fatherName: string
  phone: string
  village: string
}

interface InventoryEntry {
  id: string
  farmerId: string
  farmerName: string
  fatherName: string
  village: string
  date: string
  lotNumber: string
  remarks?: string
  categories: {
    mota: {
      bagCount: number
      sampleWeights: number[]
      averageWeight: number
      totalWeight: number
    }
    gulla: {
      bagCount: number
      sampleWeights: number[]
      averageWeight: number
      totalWeight: number
    }
    kirri: {
      bagCount: number
      sampleWeights: number[]
      averageWeight: number
      totalWeight: number
    }
  }
  totalBags: number
  totalWeight: number
}

export default function InventoryManagement() {
  // Sample farmers data (in real app, this would come from FarmerManagement)
  const [farmers] = useState<Farmer[]>([
    {
      id: '1',
      name: 'रामेश कुमार',
      fatherName: 'श्याम लाल',
      phone: '9876543210',
      village: 'रामपुर'
    },
    {
      id: '2',
      name: 'सुरेश सिंह',
      fatherName: 'हरी सिंह',
      phone: '9876543211',
      village: 'श्यामपुर'
    },
    {
      id: '3',
      name: 'रामेश कुमार',
      fatherName: 'गोपाल दास',
      phone: '9876543212',
      village: 'गांधीपुर'
    }
  ])

  const [inventory, setInventory] = useState<InventoryEntry[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [nextLotNumber, setNextLotNumber] = useState(1)
  
  const [newEntry, setNewEntry] = useState({
    farmerId: '',
    entryDate: new Date().toISOString().split('T')[0],
    remarks: '',
    mota: {
      bagCount: 0,
      sampleWeights: [0, 0, 0, 0, 0]
    },
    gulla: {
      bagCount: 0,
      sampleWeights: [0, 0, 0, 0, 0]
    },
    kirri: {
      bagCount: 0,
      sampleWeights: [0, 0, 0, 0, 0]
    }
  })

  const calculateAverage = (weights: number[]): number => {
    const validWeights = weights.filter(w => w > 0)
    return validWeights.length > 0 ? validWeights.reduce((a, b) => a + b, 0) / validWeights.length : 0
  }

  const getTotalBags = () => {
    return newEntry.mota.bagCount + newEntry.gulla.bagCount + newEntry.kirri.bagCount
  }

  const getTentativeLotNumber = () => {
    const totalBags = getTotalBags()
    const baseLotNumber = totalBags > 0 ? `${nextLotNumber}/${totalBags}` : `${nextLotNumber}/-`
    return newEntry.remarks.trim() ? `${baseLotNumber}*` : baseLotNumber
  }

  const handleSampleWeightChange = (category: 'mota' | 'gulla' | 'kirri', index: number, value: number) => {
    setNewEntry(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        sampleWeights: prev[category].sampleWeights.map((w, i) => i === index ? value : w)
      }
    }))
  }

  const handleBagCountChange = (category: 'mota' | 'gulla' | 'kirri', value: number) => {
    setNewEntry(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        bagCount: value
      }
    }))
  }

  const handleAddInventory = () => {
    if (!newEntry.farmerId) {
      alert('कृपया किसान का चयन करें')
      return
    }

    const selectedFarmer = farmers.find(f => f.id === newEntry.farmerId)
    if (!selectedFarmer) return

    const motaAvg = calculateAverage(newEntry.mota.sampleWeights)
    const gullaAvg = calculateAverage(newEntry.gulla.sampleWeights)
    const kirriAvg = calculateAverage(newEntry.kirri.sampleWeights)

    // Calculate total bags for lot number
    const totalBags = getTotalBags()
    
    // Generate lot number with new format: sequenceNumber/numberOfBags
    const baseLotNumber = `${nextLotNumber}/${totalBags}`
    const finalLotNumber = newEntry.remarks.trim() ? `${baseLotNumber}*` : baseLotNumber

    const inventoryEntry: InventoryEntry = {
      id: Date.now().toString(),
      farmerId: selectedFarmer.id,
      farmerName: selectedFarmer.name,
      fatherName: selectedFarmer.fatherName,
      village: selectedFarmer.village,
      date: newEntry.entryDate,
      lotNumber: finalLotNumber,
      remarks: newEntry.remarks.trim() || undefined,
      categories: {
        mota: {
          bagCount: newEntry.mota.bagCount,
          sampleWeights: newEntry.mota.sampleWeights,
          averageWeight: motaAvg,
          totalWeight: motaAvg * newEntry.mota.bagCount
        },
        gulla: {
          bagCount: newEntry.gulla.bagCount,
          sampleWeights: newEntry.gulla.sampleWeights,
          averageWeight: gullaAvg,
          totalWeight: gullaAvg * newEntry.gulla.bagCount
        },
        kirri: {
          bagCount: newEntry.kirri.bagCount,
          sampleWeights: newEntry.kirri.sampleWeights,
          averageWeight: kirriAvg,
          totalWeight: kirriAvg * newEntry.kirri.bagCount
        }
      },
      totalBags: newEntry.mota.bagCount + newEntry.gulla.bagCount + newEntry.kirri.bagCount,
      totalWeight: (motaAvg * newEntry.mota.bagCount) + (gullaAvg * newEntry.gulla.bagCount) + (kirriAvg * newEntry.kirri.bagCount)
    }

    setInventory([...inventory, inventoryEntry])
    setNextLotNumber(nextLotNumber + 1)
    
    // Reset form
    setNewEntry({
      farmerId: '',
      entryDate: new Date().toISOString().split('T')[0],
      remarks: '',
      mota: { bagCount: 0, sampleWeights: [0, 0, 0, 0, 0] },
      gulla: { bagCount: 0, sampleWeights: [0, 0, 0, 0, 0] },
      kirri: { bagCount: 0, sampleWeights: [0, 0, 0, 0, 0] }
    })
    setShowAddForm(false)
  }

  const getTotalStats = () => {
    const totalBags = inventory.reduce((sum, entry) => sum + entry.totalBags, 0)
    const totalWeight = inventory.reduce((sum, entry) => sum + entry.totalWeight, 0)
    const todayEntries = inventory.filter(entry => entry.date === new Date().toISOString().split('T')[0])
    const todayBags = todayEntries.reduce((sum, entry) => sum + entry.totalBags, 0)
    
    return { totalBags, totalWeight, todayBags }
  }

  const stats = getTotalStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">स्टॉक प्रबंधन</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          नया स्टॉक एंट्री
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">नया स्टॉक एंट्री</h3>
          
          {/* Tentative Lot Number Display */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-blue-800">अनुमानित लॉट नंबर</label>
                <div className="text-2xl font-bold text-blue-900 font-mono mt-1">
                  {getTentativeLotNumber()}
                </div>
              </div>
              <div className="text-sm text-blue-600">
                फॉर्मेट: क्रम संख्या/कुल बैग
                {newEntry.remarks.trim() && <div className="text-orange-600">* टिप्पणी सहित</div>}
              </div>
            </div>
          </div>
          
          {/* Entry Date */}
          <div className="mb-6">
            <label className="form-label">एंट्री की तारीख</label>
            <input
              type="date"
              className="form-input"
              value={newEntry.entryDate}
              onChange={(e) => setNewEntry({...newEntry, entryDate: e.target.value})}
            />
          </div>

          {/* Farmer Selection */}
          <div className="mb-6">
            <label className="form-label">किसान का चयन करें (नाम, पिता का नाम, गांव)</label>
            <select 
              className="form-input"
              value={newEntry.farmerId}
              onChange={(e) => setNewEntry({...newEntry, farmerId: e.target.value})}
            >
              <option value="">किसान चुनें</option>
              {farmers.map(farmer => (
                <option key={farmer.id} value={farmer.id}>
                  {farmer.name} - {farmer.fatherName} - {farmer.village}
                </option>
              ))}
            </select>
          </div>

          {/* Potato Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {(['mota', 'gulla', 'kirri'] as const).map(category => (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-center">
                  {category === 'mota' ? 'मोटा आलू' : category === 'gulla' ? 'गुल्ला आलू' : 'किरी आलू'}
                </h4>
                
                <div className="mb-4">
                  <label className="form-label">बैगों की संख्या</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newEntry[category].bagCount}
                    onChange={(e) => handleBagCountChange(category, parseInt(e.target.value) || 0)}
                    placeholder="बैग संख्या"
                  />
                </div>

                <div>
                  <label className="form-label">5 बैगों का वजन (किलो में)</label>
                  <div className="grid grid-cols-5 gap-2">
                    {newEntry[category].sampleWeights.map((weight, index) => (
                      <input
                        key={index}
                        type="number"
                        className="form-input text-sm"
                        value={weight}
                        onChange={(e) => handleSampleWeightChange(category, index, parseFloat(e.target.value) || 0)}
                        placeholder={`बैग ${index + 1}`}
                      />
                    ))}
                  </div>
                  {newEntry[category].sampleWeights.some(w => w > 0) && (
                    <div className="mt-2 text-sm text-gray-600">
                      औसत वजन: {calculateAverage(newEntry[category].sampleWeights).toFixed(2)} किलो
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Remarks - moved to bottom */}
          <div className="mb-6">
            <label className="form-label">टिप्पणी (वैकल्पिक)</label>
            <textarea
              className="form-input"
              value={newEntry.remarks}
              onChange={(e) => setNewEntry({...newEntry, remarks: e.target.value})}
              placeholder="यदि इस लॉट के लिए कोई विशेष टिप्पणी है तो यहाँ लिखें..."
              rows={3}
            />
            <div className="text-sm text-gray-500 mt-1">
              टिप्पणी के साथ लॉट नंबर में * (तारा) चिह्न जोड़ा जाएगा
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              रद्द करें
            </button>
            <button
              onClick={handleAddInventory}
              className="btn-primary"
            >
              स्टॉक जोड़ें
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">कुल बैग</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.totalBags}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">कुल वजन</h3>
          <p className="text-2xl font-bold text-green-600">{stats.totalWeight.toFixed(2)} किलो</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">आज के बैग</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.todayBags}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">कुल एंट्रीज</h3>
          <p className="text-2xl font-bold text-orange-600">{inventory.length}</p>
        </div>
      </div>

      {/* Inventory List */}
      {inventory.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">स्टॉक एंट्री सूची</h3>
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">कुल वजन</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">टिप्पणी</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">तारीख</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{entry.farmerName}</td>
                    <td className="py-3 px-4">{entry.fatherName}</td>
                    <td className="py-3 px-4">{entry.village}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-mono">
                        {entry.lotNumber}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{entry.categories.mota.bagCount} बैग</div>
                        <div>{entry.categories.mota.totalWeight.toFixed(1)} किलो</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{entry.categories.gulla.bagCount} बैग</div>
                        <div>{entry.categories.gulla.totalWeight.toFixed(1)} किलो</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{entry.categories.kirri.bagCount} बैग</div>
                        <div>{entry.categories.kirri.totalWeight.toFixed(1)} किलो</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{entry.totalBags}</td>
                    <td className="py-3 px-4 font-semibold">{entry.totalWeight.toFixed(1)} किलो</td>
                    <td className="py-3 px-4">
                      <div className="text-sm max-w-xs truncate" title={entry.remarks}>
                        {entry.remarks || '-'}
                      </div>
                    </td>
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
