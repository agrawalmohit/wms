import React from 'react'

export default function WarehouseConfig() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">गोदाम कॉन्फ़िगरेशन</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">चैंबर सेटअप</h3>
          <div className="space-y-4">
            <div>
              <label className="form-label">कुल चैंबर</label>
              <input type="number" className="form-input" defaultValue="5" />
            </div>
            <div>
              <label className="form-label">प्रति चैंबर फ्लोर</label>
              <input type="number" className="form-input" defaultValue="6" />
            </div>
            <div>
              <label className="form-label">प्रति फ्लोर ब्लॉक</label>
              <input type="number" className="form-input" defaultValue="10" />
            </div>
            <button className="btn-primary">
              कॉन्फ़िगरेशन सेव करें
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">चैंबर स्थिति</h3>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((chamber) => (
              <div key={chamber} className="text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium ${
                  chamber <= 3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                }`}>
                  C{chamber}
                </div>
                <div className="text-xs mt-1">
                  {chamber <= 3 ? 'भरा हुआ' : 'खाली'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">चैंबर विवरण</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">चैंबर</th>
                <th className="text-left py-3 px-4">कुल फ्लोर</th>
                <th className="text-left py-3 px-4">भरे हुए ब्लॉक</th>
                <th className="text-left py-3 px-4">खाली ब्लॉक</th>
                <th className="text-left py-3 px-4">क्षमता उपयोग</th>
                <th className="text-left py-3 px-4">स्थिति</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, floors: 6, filled: 45, empty: 15, usage: '75%', status: 'active' },
                { id: 2, floors: 6, filled: 38, empty: 22, usage: '63%', status: 'active' },
                { id: 3, floors: 6, filled: 52, empty: 8, usage: '87%', status: 'active' },
                { id: 4, floors: 6, filled: 0, empty: 60, usage: '0%', status: 'empty' },
                { id: 5, floors: 6, filled: 0, empty: 60, usage: '0%', status: 'empty' },
              ].map((chamber) => (
                <tr key={chamber.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">चैंबर {chamber.id}</td>
                  <td className="py-3 px-4">{chamber.floors}</td>
                  <td className="py-3 px-4">{chamber.filled}</td>
                  <td className="py-3 px-4">{chamber.empty}</td>
                  <td className="py-3 px-4">{chamber.usage}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      chamber.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {chamber.status === 'active' ? 'सक्रिय' : 'खाली'}
                    </span>
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
