import React from 'react'

export default function LotManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">लॉट प्रबंधन</h2>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">लॉट खोजें</h3>
        <div className="space-y-4">
          <div>
            <label className="form-label">लॉट नंबर</label>
            <input type="text" className="form-input" placeholder="जैसे: C1-F2-B5" />
          </div>
          <button className="btn-secondary w-full">
            लॉट खोजें
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">लॉट विवरण:</h4>
          <div className="text-sm space-y-1">
            <div>लॉट नंबर: <span className="font-medium">C1-F2-B5</span></div>
            <div>किसान: <span className="font-medium">रामेश कुमार</span></div>
            <div>बैग संख्या: <span className="font-medium">25</span></div>
            <div>तारीख: <span className="font-medium">15/01/2024</span></div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">सभी लॉट्स</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">लॉट नंबर</th>
                <th className="text-left py-3 px-4">किसान का नाम</th>
                <th className="text-left py-3 px-4">चैंबर/फ्लोर/ब्लॉक</th>
                <th className="text-left py-3 px-4">बैग संख्या</th>
                <th className="text-left py-3 px-4">असाइन तारीख</th>
                <th className="text-left py-3 px-4">स्थिति</th>
              </tr>
            </thead>
            <tbody>
              {[
                { lot: 'C1-F1-B1', farmer: 'रामेश कुमार', location: 'C1/F1/B1', bags: 25, date: '15/01/2024', status: 'active' },
                { lot: 'C1-F1-B2', farmer: 'सुरेश सिंह', location: 'C1/F1/B2', bags: 30, date: '16/01/2024', status: 'active' },
                { lot: 'C2-F3-B5', farmer: 'मोहन लाल', location: 'C2/F3/B5', bags: 20, date: '17/01/2024', status: 'active' },
                { lot: 'C1-F2-B3', farmer: 'गीता देवी', location: 'C1/F2/B3', bags: 15, date: '18/01/2024', status: 'retrieved' },
              ].map((lot) => (
                <tr key={lot.lot} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">{lot.lot}</td>
                  <td className="py-3 px-4">{lot.farmer}</td>
                  <td className="py-3 px-4">{lot.location}</td>
                  <td className="py-3 px-4">{lot.bags}</td>
                  <td className="py-3 px-4">{lot.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      lot.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {lot.status === 'active' ? 'सक्रिय' : 'निकाला गया'}
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
