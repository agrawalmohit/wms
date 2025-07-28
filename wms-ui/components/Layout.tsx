import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🥔</div>
              <h1 className="text-xl font-semibold text-gray-800">
                आलू गोदाम प्रबंधन
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                आज की तारीख: {new Date().toLocaleDateString('hi-IN')}
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                सेटिंग्स
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            © 2025 आलू गोदाम प्रबंधन सिस्टम - सभी अधिकार सुरक्षित
          </div>
        </div>
      </footer>
    </div>
  )
}
