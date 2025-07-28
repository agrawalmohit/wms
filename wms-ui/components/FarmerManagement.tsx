import React, { useState } from 'react'

interface Farmer {
  id: string
  name: string
  fatherName: string
  phone: string
  village: string
  totalBags: number
  registrationDate: string
}

export default function FarmerManagement() {
  const [farmers, setFarmers] = useState<Farmer[]>([
    {
      id: '1',
      name: 'रामेश कुमार',
      fatherName: 'श्याम लाल',
      phone: '9876543210',
      village: 'रामपुर',
      totalBags: 45,
      registrationDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'सुरेश सिंह',
      fatherName: 'हरी सिंह',
      phone: '9876543211',
      village: 'श्यामपुर',
      totalBags: 38,
      registrationDate: '2024-01-20'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newFarmer, setNewFarmer] = useState({
    name: '',
    fatherName: '',
    phone: '',
    village: ''
  })

  const handleAddFarmer = () => {
    if (newFarmer.name && newFarmer.fatherName && newFarmer.phone && newFarmer.village) {
      const farmer: Farmer = {
        id: Date.now().toString(),
        ...newFarmer,
        totalBags: 0,
        registrationDate: new Date().toISOString().split('T')[0]
      }
      setFarmers([...farmers, farmer])
      setNewFarmer({ name: '', fatherName: '', phone: '', village: '' })
      setShowAddForm(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">किसान प्रबंधन</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          नया किसान जोड़ें
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">नया किसान पंजीकरण</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="form-label">किसान का नाम</label>
              <input
                type="text"
                className="form-input"
                value={newFarmer.name}
                onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                placeholder="किसान का नाम दर्ज करें"
              />
            </div>
            <div>
              <label className="form-label">पिता का नाम</label>
              <input
                type="text"
                className="form-input"
                value={newFarmer.fatherName}
                onChange={(e) => setNewFarmer({ ...newFarmer, fatherName: e.target.value })}
                placeholder="पिता का नाम दर्ज करें"
              />
            </div>
            <div>
              <label className="form-label">फोन नंबर</label>
              <input
                type="tel"
                className="form-input"
                value={newFarmer.phone}
                onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                placeholder="फोन नंबर दर्ज करें"
              />
            </div>
            <div>
              <label className="form-label">गांव का नाम</label>
              <input
                type="text"
                className="form-input"
                value={newFarmer.village}
                onChange={(e) => setNewFarmer({ ...newFarmer, village: e.target.value })}
                placeholder="गांव का नाम दर्ज करें"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              रद्द करें
            </button>
            <button
              onClick={handleAddFarmer}
              className="btn-primary"
            >
              किसान जोड़ें
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">किसान का नाम</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">पिता का नाम</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">फोन नंबर</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">गांव</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">कुल बैग</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">पंजीकरण तारीख</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">कार्य</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{farmer.name}</td>
                  <td className="py-3 px-4">{farmer.fatherName}</td>
                  <td className="py-3 px-4">{farmer.phone}</td>
                  <td className="py-3 px-4">{farmer.village}</td>
                  <td className="py-3 px-4">{farmer.totalBags}</td>
                  <td className="py-3 px-4">{farmer.registrationDate}</td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:text-primary/80 text-sm">
                      विवरण देखें
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
