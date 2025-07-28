import { useState } from 'react'
import Layout from '../components/Layout'
import FarmerManagement from '../components/FarmerManagement'
import InventoryManagement from '../components/InventoryManagement'
import InventoryWithdrawal from '../components/InventoryWithdrawal'
import WarehouseConfig from '../components/WarehouseConfig'
import LotManagement from '../components/LotManagement'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'farmers':
        return <FarmerManagement />
      case 'inventory':
        return <InventoryManagement />
      case 'withdrawal':
        return <InventoryWithdrawal />
      case 'warehouse':
        return <WarehouseConfig />
      case 'lots':
        return <LotManagement />
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">कुल किसान</h3>
              <p className="text-3xl font-bold text-primary">125</p>
              <p className="text-sm text-gray-600">पंजीकृत किसान</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">आज के बैग</h3>
              <p className="text-3xl font-bold text-secondary">48</p>
              <p className="text-sm text-gray-600">नए आलू के बैग</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">कुल स्टॉक</h3>
              <p className="text-3xl font-bold text-accent">2,340</p>
              <p className="text-sm text-gray-600">आलू की बैगे</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">भरे हुए चैंबर</h3>
              <p className="text-3xl font-bold text-warning">3/5</p>
              <p className="text-sm text-gray-600">चैंबर उपयोग में</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          आलू गोदाम प्रबंधन सिस्टम
        </h1>
        <p className="text-gray-600">
          किसानों और आलू के स्टॉक का प्रबंधन करें
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm">
          {[
            { id: 'dashboard', label: 'डैशबोर्ड', icon: '🏠' },
            { id: 'farmers', label: 'किसान प्रबंधन', icon: '👨‍🌾' },
            { id: 'inventory', label: 'स्टॉक आमद', icon: '📦' },
            { id: 'withdrawal', label: 'स्टॉक निकासी', icon: '�' },
            { id: 'warehouse', label: 'गोदाम सेटिंग', icon: '🏭' },
            { id: 'lots', label: 'लॉट प्रबंधन', icon: '🏷️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {renderContent()}
      </div>
    </Layout>
  )
}
