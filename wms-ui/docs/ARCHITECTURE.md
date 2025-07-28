# Component Architecture Documentation

## Current Implementation Status

### ✅ Implemented Components
- **Layout Component** - Main application wrapper ✅ **Complete**
- **Main Dashboard** - Navigation and overview ✅ **Complete** 
- **Farmer Management** - Registration and management ✅ **Complete**
- **Inventory Management** - Stock entry system ✅ **Complete**
- **Inventory Withdrawal** - Stock withdrawal system ✅ **Complete**
- **Lot Management** - Search and monitoring ✅ **Complete**

### ⚠️ Placeholder Components
- **Warehouse Configuration** - Basic component shell only ⚠️ **Needs Implementation**

### ❌ Not Implemented
- **Database Layer** - No backend integration ❌ **Future Work**
- **Authentication** - No user management ❌ **Future Work**
- **Print System** - No printing capabilities ❌ **Future Work**

## Overview
The application follows a component-based architecture using React/Next.js with TypeScript. Each major feature is implemented as a separate component with clear responsibilities. **Currently uses client-side state management only.**

## Component Structure

### Layout Component (`components/Layout.tsx`)
**Purpose**: Main application wrapper providing consistent header, navigation, and footer

**Features**:
- Application header with title in Hindi
- Date display in Hindi locale
- Settings button placeholder
- Responsive container layout
- Footer with copyright information

**Props**:
```typescript
interface LayoutProps {
  children: React.ReactNode
}
```

### Main Dashboard (`pages/index.tsx`)
**Purpose**: Central navigation hub and dashboard

**Features**:
- Tab-based navigation between features
- Dashboard statistics cards
- Component rendering based on active tab
- State management for active section

**State Management**:
```typescript
const [activeTab, setActiveTab] = useState('dashboard')
```

**Navigation Tabs**:
- डैशबोर्ड (Dashboard)
- किसान प्रबंधन (Farmer Management)  
- स्टॉक आमद (Stock Entry)
- स्टॉक निकासी (Stock Withdrawal)
- गोदाम सेटिंग (Warehouse Settings)
- लॉट प्रबंधन (Lot Management)

### Farmer Management (`components/FarmerManagement.tsx`)
**Purpose**: Farmer registration and management system

**Key Features**:
- Farmer registration form with validation
- Unique identification system (Name + Father's Name + Village)
- Registered farmers list with search
- Form validation and error handling

**Data Structure**:
```typescript
interface FarmerData {
  id: string
  name: string
  fatherName: string
  village: string
}
```

**State Management**:
- `farmers`: Array of registered farmers
- `formData`: Current form input data
- Form validation states

**Key Functions**:
- `handleSubmit()`: Process farmer registration
- `handleInputChange()`: Update form data
- Form validation logic

### Inventory Management (`components/InventoryManagement.tsx`)
**Purpose**: Stock entry system for incoming potatoes

**Key Features**:
- Farmer selection from registered list
- Three potato quality categories (मोटा/गुल्ला/किरी)
- 5-bag weight sampling system
- Automatic lot number assignment
- Real-time weight calculations
- Summary statistics

**Data Structure**:
```typescript
interface QualityData {
  bagCount: number
  sampleBags: number[]
  averageWeight: number
  totalWeight: number
}

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

**Key Functions**:
- `updateCategory()`: Update quality category data
- `calculateAverageWeight()`: Process 5-bag sampling
- `handleInventorySubmit()`: Save inventory entry
- `getTotalBags()`: Calculate total bags
- `getTotalWeight()`: Calculate total weight

**Business Logic**:
- 5-bag weight sampling for accuracy
- Automatic average weight calculation
- Lot number auto-assignment
- Real-time totals update

### Inventory Withdrawal (`components/InventoryWithdrawal.tsx`)
**Purpose**: Stock withdrawal system for outgoing potatoes

**Key Features**:
- Farmer selection for withdrawal
- Manual lot number entry
- Quality-wise bag count entry
- Simplified interface (no weight calculations)
- Withdrawal history tracking

**Data Structure**:
```typescript
interface QualityData {
  bagCount: number
}

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
    mota: QualityData
    gulla: QualityData
    kirri: QualityData
  }
  totalBags: number
  date: string
}
```

**Key Functions**:
- `updateCategoryBagCount()`: Update bag counts
- `handleWithdrawal()`: Process withdrawal entry
- `getTotalBags()`: Calculate total bags
- Form validation and reset

**Simplified Design**:
- Only tracks bag counts (no weights)
- Single column layout per quality
- Streamlined form validation

### Lot Management (`components/LotManagement.tsx`)
**Purpose**: Lot monitoring and search functionality

**Key Features**:
- Lot search by number or farmer
- Comprehensive lots monitoring table
- Status indicators for lots
- Streamlined interface (no redundant assignment)

**Data Structure**:
```typescript
interface LotData {
  lotNumber: string
  farmerName: string
  totalBags: number
  status: string
  date: string
}
```

**Key Functions**:
- `handleSearch()`: Search lots by criteria
- Lot filtering and display logic
- Status tracking and updates

**Design Philosophy**:
- Focus on monitoring rather than data entry
- Lot assignment handled in inventory component
- Clean search and display interface

### Warehouse Configuration (`components/WarehouseConfig.tsx`)
**Purpose**: System configuration and settings
**Status**: ⚠️ **PLACEHOLDER ONLY - NOT IMPLEMENTED**

**Current State**:
- Basic component structure exists
- No actual configuration functionality
- Placeholder content only
- Needs complete implementation

**Planned Features**:
- Warehouse parameter configuration
- System settings management
- Configuration persistence (requires database)

## State Management Strategy

### Current Implementation: Local Component State ✅ **Implemented**
Each component manages its own state using React hooks:
- `useState` for form data and UI state ✅ **Working**
- `useEffect` for side effects and data loading ✅ **Working**

### Data Persistence: ❌ **NOT IMPLEMENTED**
- **Current**: Data lost on page refresh
- **Storage**: Browser memory only during session
- **Backup**: No data backup capabilities

### Data Flow ✅ **Implemented**
```
User Input → Component State → Validation → Data Processing → UI Update
```

### Inter-Component Communication ⚠️ **Limited**
- Parent-child props passing ✅ **Working**
- Shared data through main dashboard state ⚠️ **Basic Implementation**
- Future: Context API for global state ❌ **Not Implemented**

## Styling Architecture

### Tailwind CSS Classes
Custom utility classes defined in `styles/globals.css`:

```css
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.card {
  @apply bg-white p-6 rounded-xl border border-gray-200 shadow-sm;
}
```

### Color Scheme
- **Primary**: Blue tones (#3B82F6)
- **Quality Categories**:
  - मोटा: Blue backgrounds (#EFF6FF)
  - गुल्ला: Green backgrounds (#F0FDF4)
  - किरी: Orange backgrounds (#FFF7ED)

### Responsive Design
- Mobile-first approach
- Grid layouts with responsive breakpoints
- Flexible typography scaling

## Error Handling

### Form Validation
- Required field validation
- Data type validation
- Business logic validation

### Error Display
- Inline error messages
- Toast notifications for success/error
- Form field highlighting

### Error Recovery
- Form state preservation
- Graceful degradation
- User-friendly error messages

## Performance Considerations

### Component Optimization
- Functional components with hooks
- Memoization where appropriate
- Efficient re-rendering strategies

### Data Handling
- Local state for form data
- Optimistic UI updates
- Lazy loading for large datasets

### Bundle Optimization
- Tree shaking with ES6 modules
- Code splitting at route level
- Optimized asset loading

## Future Architecture Plans

### Database Integration ❌ **NOT IMPLEMENTED**
- SQLite integration for data persistence
- Database schema design
- Migration strategies

### State Management ⚠️ **BASIC IMPLEMENTATION**
- Context API for global state (needs implementation)
- Redux Toolkit for complex state (future consideration)
- Data caching strategies (requires backend)

### Component Libraries ❌ **NOT IMPLEMENTED**
- Custom component library
- Shared component documentation
- Design system implementation

### Testing Strategy ❌ **NOT IMPLEMENTED**
- Unit tests for components
- Integration tests for workflows
- End-to-end testing with Playwright

## Development Guidelines

### Component Structure
```typescript
// Component imports
import React, { useState } from 'react'

// Type definitions
interface ComponentProps {
  // props definition
}

// Component implementation
export default function ComponentName({ prop }: ComponentProps) {
  // State management
  const [state, setState] = useState(initialState)
  
  // Event handlers
  const handleEvent = () => {
    // event logic
  }
  
  // Render
  return (
    // JSX structure
  )
}
```

### Naming Conventions
- **Components**: PascalCase (e.g., `FarmerManagement`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Variables**: camelCase (e.g., `farmerData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_VALUES`)

### File Organization
- One component per file
- Co-locate related utilities
- Clear import/export structure
- Consistent file naming
