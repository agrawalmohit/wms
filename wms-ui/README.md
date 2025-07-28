# WMS UI - Frontend Application

Frontend application for the Warehouse Management System built with Next.js, TypeScript, and Tailwind CSS featuring complete Hindi interface for potato warehouse operations.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.10.0 (managed via asdf - see `.tool-versions`)
- pnpm 8.15.7

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at `http://localhost:3000`

## 🌟 Features

### ✅ Currently Implemented
- **Farmer Management** (किसान प्रबंधन) - Register and manage farmer information
- **Stock Entry** (स्टॉक आमद) - Record incoming potato stock from farmers
- **Stock Withdrawal** (स्टॉक निकासी) - Track outgoing potato stock
- **Lot Management** (लॉट प्रबंधन) - Monitor and search warehouse lots
- **Dashboard** (डैशबोर्ड) - Overview statistics and navigation
- **Hindi Interface** - Complete user interface in Hindi
- **Responsive Design** - Works on desktop and mobile devices

### ⚠️ Current Limitations
- **No Data Persistence** - Data is lost on page refresh (uses React state only)
- **No Database** - All data stored in browser memory temporarily
- **Single Session** - No multi-user support
- **No Backup** - Data cannot be saved or restored

### 🚧 Planned Features (Not Implemented)
- **Warehouse Configuration** (गोदाम सेटिंग) - Configure warehouse settings
- **Database Integration** - SQLite for data persistence
- **Print Functionality** - Receipts and reports
- **Electron App** - Desktop application for offline use
- **Data Backup/Restore** - Save and restore functionality

### Key Features
- **Hindi Interface**: Complete user interface in Hindi for local operators
- **Unique Farmer Identification**: Name + Father's Name + Village for accurate identification
- **Quality-based Categorization**: Three potato categories (मोटा/गुल्ला/किरी)
- **Lot Tracking**: Room/Floor/Block number system for precise location tracking
- **Real-time Calculations**: Automatic weight and quantity calculations
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Technical Stack

### Frontend
- **Next.js 14.2.30** - React framework for production
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### Development Tools
- **Node.js 20.10.0** - JavaScript runtime (managed via .tool-versions)
- **pnpm 8.15.7** - Package manager (managed via .tool-versions)
- **asdf** - Version manager for consistent development environment

### Database (Planned)
- **SQLite 5.1.7** - Local database for data persistence (NOT IMPLEMENTED)

### Current Data Storage
- **React State** - Temporary in-memory storage
- **No Persistence** - Data lost on page refresh

## 🚀 Getting Started

### Prerequisites
- asdf version manager installed
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install tool versions**
   ```bash
   asdf install
   ```
   This will automatically install Node.js 20.10.0 and pnpm 8.15.7 as specified in `.tool-versions`

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Start development server**
   ```bash
   pnpm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## 📁 Project Structure

```
project/
├── .tool-versions              # Tool version specifications
├── components/                 # React components
│   ├── FarmerManagement.tsx   # Farmer registration and management
│   ├── InventoryManagement.tsx # Stock entry (आमद) functionality
│   ├── InventoryWithdrawal.tsx # Stock withdrawal (निकासी) functionality
│   ├── Layout.tsx             # Main application layout
│   ├── LotManagement.tsx      # Lot search and monitoring
│   └── WarehouseConfig.tsx    # Warehouse configuration
├── pages/                     # Next.js pages
│   ├── _app.tsx              # App wrapper
│   ├── _document.tsx         # Document structure
│   └── index.tsx             # Main dashboard
├── styles/                   # Styling
│   └── globals.css          # Global styles and Tailwind CSS
├── docs/                    # Documentation
├── package.json            # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🌐 Application Navigation

The system has 6 main sections accessible via tabs:

1. **डैशबोर्ड** (Dashboard) - Overview and statistics ✅ **Implemented**
2. **किसान प्रबंधन** (Farmer Management) - Farmer registration ✅ **Implemented**
3. **स्टॉक आमद** (Stock Entry) - Incoming stock recording ✅ **Implemented**
4. **स्टॉक निकासी** (Stock Withdrawal) - Outgoing stock recording ✅ **Implemented**
5. **गोदाम सेटिंग** (Warehouse Settings) - Configuration ⚠️ **Placeholder Only**
6. **लॉट प्रबंधन** (Lot Management) - Lot monitoring ✅ **Implemented**

## 📋 Workflow

### 1. Farmer Registration
- Register farmers with Name, Father's Name, and Village
- Unique identification system prevents duplicates

### 2. Stock Entry (आमद)
- Select registered farmer
- Choose potato quality (मोटा/गुल्ला/किरी)
- Enter bag quantities and weights
- Auto-assign lot numbers (Room/Floor/Block format)
- System calculates totals automatically

### 3. Stock Withdrawal (निकासी)
- Select farmer for withdrawal
- Choose lot number
- Specify quantities by quality category
- Record withdrawal date
- Track only bag counts (no weight calculations)

### 4. Lot Management
- Search existing lots
- Monitor lot status and contents
- Track farmer assignments

## 🔧 Configuration

### Environment Setup
The project uses `.tool-versions` file for consistent development environment:
- Node.js: 20.10.0
- pnpm: 8.15.7

### Version Management
Uses asdf version manager for automatic tool version switching.

## 🎨 UI/UX Design

### Design Principles
- **Simplicity**: Clean, intuitive interface for rural operators
- **Hindi First**: All text and labels in Hindi
- **Color Coding**: Different colors for different potato qualities
- **Responsive**: Works on various screen sizes
- **Accessibility**: High contrast and readable fonts

### Color Scheme
- Primary: Blue tones for main actions
- Quality Categories:
  - मोटा (Mota): Blue background
  - गुल्ला (Gulla): Green background  
  - किरी (Kirri): Orange background

## 📊 Data Models

### Farmer Data
```typescript
interface FarmerData {
  id: string
  name: string        // किसान का नाम
  fatherName: string  // पिता का नाम
  village: string     // गांव
}
```

### Inventory Entry
```typescript
interface InventoryEntry {
  id: string
  farmerName: string
  fatherName: string
  village: string
  lotNumber: {
    roomNumber: string
    floorNumber: string
    blockNumber: string
  }
  categories: {
    mota: QualityData
    gulla: QualityData
    kirri: QualityData
  }
  totalBags: number
  totalWeight: number
  date: string
}
```

### Withdrawal Entry
```typescript
interface WithdrawalEntry {
  id: string
  farmerName: string
  fatherName: string
  village: string
  lotNumber: {
    roomNumber: string
    floorNumber: string
    blockNumber: string
  }
  categories: {
    mota: { bagCount: number }
    gulla: { bagCount: number }
    kirri: { bagCount: number }
  }
  totalBags: number
  date: string
}
```

## 🔮 Future Enhancements

### Immediate Next Steps (v1.1)
- [ ] **SQLite database integration** for data persistence
- [ ] **Database schema implementation** with proper tables
- [ ] **Data migration system** from current state to database
- [ ] **Backup and restore** functionality

### Short-term Goals (v1.2)
- [ ] **Warehouse Configuration** component implementation
- [ ] **Print functionality** for receipts and reports
- [ ] **Data validation** and error handling improvements
- [ ] **Search and filtering** enhancements

### Long-term Vision (v2.0+)
- [ ] **Electron desktop application** for offline usage
- [ ] **User authentication and roles**
- [ ] **Advanced reporting and analytics**
- [ ] **Barcode/QR code integration**
- [ ] **Multi-language support** (additional regional languages)
- [ ] **Multi-warehouse support**
- [ ] **Cloud synchronization** capabilities

### Database Schema (Planned)
- Farmers table with unique constraints
- Inventory entries table with lot tracking
- Withdrawal entries table
- Lots table with status management
- Warehouse configuration table

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Use Hindi for all user-facing text
3. Maintain responsive design principles
4. Test on multiple screen sizes
5. Follow existing code structure and naming conventions

### Code Style
- Use descriptive variable names in English for code
- Use Hindi for UI labels and user messages
- Follow React/Next.js best practices
- Use Tailwind CSS for styling

## 🐛 Known Issues

- None currently reported

## 📞 Support

For technical support or feature requests, please create an issue in the project repository.

## 📄 License

[License information to be added]

---

**Note**: This system is designed specifically for potato traders in rural India and follows local business practices and language preferences.
