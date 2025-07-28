# API Documentation (Future Implementation)

## Current Status: ⚠️ NOT IMPLEMENTED
**This document outlines the PLANNED API structure for future database integration. Currently, the application uses in-memory state management only.**

## Current Implementation Status
- ❌ **Database**: No database integration (uses React state)
- ❌ **API Endpoints**: No API endpoints exist
- ❌ **Data Persistence**: Data is lost on page refresh
- ❌ **Backend**: No backend server implemented
- ✅ **Frontend**: Complete UI with state management working

## Overview
This document outlines the planned API structure for the Potato Warehouse Management System when database integration is implemented in future versions.

## Database Schema (PLANNED - NOT IMPLEMENTED)

### Current Data Storage
**Status**: Uses React `useState` hooks for temporary data storage
- Data persists only during browser session
- No database tables exist
- No data persistence between sessions

### Tables (FUTURE IMPLEMENTATION)

#### farmers
```sql
CREATE TABLE farmers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  village TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name, father_name, village)
);
```

#### inventory_entries
```sql
CREATE TABLE inventory_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farmer_id INTEGER NOT NULL,
  lot_room_number TEXT NOT NULL,
  lot_floor_number TEXT NOT NULL,
  lot_block_number TEXT NOT NULL,
  
  -- Mota category
  mota_bag_count INTEGER DEFAULT 0,
  mota_sample_weights TEXT, -- JSON array of 5 weights
  mota_average_weight REAL DEFAULT 0,
  mota_total_weight REAL DEFAULT 0,
  
  -- Gulla category  
  gulla_bag_count INTEGER DEFAULT 0,
  gulla_sample_weights TEXT, -- JSON array of 5 weights
  gulla_average_weight REAL DEFAULT 0,
  gulla_total_weight REAL DEFAULT 0,
  
  -- Kirri category
  kirri_bag_count INTEGER DEFAULT 0,
  kirri_sample_weights TEXT, -- JSON array of 5 weights
  kirri_average_weight REAL DEFAULT 0,
  kirri_total_weight REAL DEFAULT 0,
  
  total_bags INTEGER NOT NULL,
  total_weight REAL NOT NULL,
  entry_date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (farmer_id) REFERENCES farmers (id)
);
```

#### withdrawal_entries
```sql
CREATE TABLE withdrawal_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farmer_id INTEGER NOT NULL,
  lot_room_number TEXT NOT NULL,
  lot_floor_number TEXT NOT NULL,
  lot_block_number TEXT NOT NULL,
  
  mota_bag_count INTEGER DEFAULT 0,
  gulla_bag_count INTEGER DEFAULT 0,
  kirri_bag_count INTEGER DEFAULT 0,
  
  total_bags INTEGER NOT NULL,
  withdrawal_date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (farmer_id) REFERENCES farmers (id)
);
```

#### lots
```sql
CREATE TABLE lots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_number TEXT NOT NULL,
  floor_number TEXT NOT NULL,
  block_number TEXT NOT NULL,
  farmer_id INTEGER NOT NULL,
  status TEXT DEFAULT 'active', -- active, empty, partial
  
  current_mota_bags INTEGER DEFAULT 0,
  current_gulla_bags INTEGER DEFAULT 0,
  current_kirri_bags INTEGER DEFAULT 0,
  current_total_bags INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (farmer_id) REFERENCES farmers (id),
  UNIQUE(room_number, floor_number, block_number)
);
```

## API Endpoints (PLANNED - NOT IMPLEMENTED)

### Current Data Access
**Status**: Direct component state management
- No HTTP endpoints exist
- Data accessed through React state
- No server-side processing
- All logic runs in browser

### Farmers API (FUTURE)

#### GET /api/farmers
Get all farmers
```typescript
Response: {
  success: boolean
  data: Farmer[]
}

interface Farmer {
  id: number
  name: string
  fatherName: string
  village: string
  createdAt: string
  updatedAt: string
}
```

#### POST /api/farmers
Create new farmer
```typescript
Request: {
  name: string
  fatherName: string
  village: string
}

Response: {
  success: boolean
  data: Farmer
  message: string
}
```

#### GET /api/farmers/search
Search farmers
```typescript
Query Parameters:
- name?: string
- village?: string
- limit?: number

Response: {
  success: boolean
  data: Farmer[]
}
```

### Inventory API

#### GET /api/inventory
Get all inventory entries
```typescript
Query Parameters:
- farmer_id?: number
- date_from?: string (YYYY-MM-DD)
- date_to?: string (YYYY-MM-DD)
- limit?: number
- offset?: number

Response: {
  success: boolean
  data: InventoryEntry[]
  pagination: {
    total: number
    limit: number
    offset: number
  }
}
```

#### POST /api/inventory
Create inventory entry
```typescript
Request: {
  farmerId: number
  lotNumber: {
    roomNumber: string
    floorNumber: string
    blockNumber: string
  }
  categories: {
    mota: {
      bagCount: number
      sampleWeights: number[]
    }
    gulla: {
      bagCount: number
      sampleWeights: number[]
    }
    kirri: {
      bagCount: number
      sampleWeights: number[]
    }
  }
  entryDate: string
}

Response: {
  success: boolean
  data: InventoryEntry
  message: string
}
```

#### GET /api/inventory/:id
Get specific inventory entry
```typescript
Response: {
  success: boolean
  data: InventoryEntry
}
```

### Withdrawal API

#### GET /api/withdrawals
Get all withdrawal entries
```typescript
Query Parameters:
- farmer_id?: number
- date_from?: string
- date_to?: string
- limit?: number
- offset?: number

Response: {
  success: boolean
  data: WithdrawalEntry[]
  pagination: PaginationInfo
}
```

#### POST /api/withdrawals
Create withdrawal entry
```typescript
Request: {
  farmerId: number
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
  withdrawalDate: string
}

Response: {
  success: boolean
  data: WithdrawalEntry
  message: string
}
```

### Lots API

#### GET /api/lots
Get all lots
```typescript
Query Parameters:
- status?: 'active' | 'empty' | 'partial'
- farmer_id?: number
- room_number?: string
- limit?: number

Response: {
  success: boolean
  data: Lot[]
}
```

#### GET /api/lots/search
Search lots
```typescript
Query Parameters:
- lot_number?: string (format: room/floor/block)
- farmer_name?: string

Response: {
  success: boolean
  data: LotWithFarmer[]
}

interface LotWithFarmer extends Lot {
  farmer: Farmer
}
```

#### GET /api/lots/:roomNumber/:floorNumber/:blockNumber
Get specific lot
```typescript
Response: {
  success: boolean
  data: LotWithDetails
}

interface LotWithDetails extends Lot {
  farmer: Farmer
  inventoryEntries: InventoryEntry[]
  withdrawalEntries: WithdrawalEntry[]
}
```

### Dashboard API

#### GET /api/dashboard/stats
Get dashboard statistics
```typescript
Response: {
  success: boolean
  data: {
    totalFarmers: number
    totalBagsToday: number
    totalStock: {
      bags: number
      weight: number
    }
    activeLots: number
    recentEntries: InventoryEntry[]
    recentWithdrawals: WithdrawalEntry[]
  }
}
```

## Data Types

### Core Interfaces
```typescript
interface Farmer {
  id: number
  name: string
  fatherName: string
  village: string
  createdAt: string
  updatedAt: string
}

interface QualityCategoryData {
  bagCount: number
  sampleWeights: number[]
  averageWeight: number
  totalWeight: number
}

interface InventoryEntry {
  id: number
  farmerId: number
  farmer?: Farmer
  lotNumber: {
    roomNumber: string
    floorNumber: string
    blockNumber: string
  }
  categories: {
    mota: QualityCategoryData
    gulla: QualityCategoryData
    kirri: QualityCategoryData
  }
  totalBags: number
  totalWeight: number
  entryDate: string
  createdAt: string
}

interface WithdrawalEntry {
  id: number
  farmerId: number
  farmer?: Farmer
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
  withdrawalDate: string
  createdAt: string
}

interface Lot {
  id: number
  roomNumber: string
  floorNumber: string
  blockNumber: string
  farmerId: number
  status: 'active' | 'empty' | 'partial'
  currentMotaBags: number
  currentGullaBags: number
  currentKirriBags: number
  currentTotalBags: number
  createdAt: string
  updatedAt: string
}
```

### API Response Types
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

interface PaginationInfo {
  total: number
  limit: number
  offset: number
  hasNext: boolean
  hasPrev: boolean
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo
}
```

## Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate farmer, etc.)
- `500` - Internal Server Error

### Error Response Format
```typescript
interface ErrorResponse {
  success: false
  error: string
  details?: {
    field: string
    message: string
  }[]
}
```

### Common Errors
```typescript
// Duplicate farmer
{
  success: false,
  error: "Farmer already exists",
  details: [{
    field: "farmer",
    message: "A farmer with this name, father's name, and village already exists"
  }]
}

// Invalid lot number
{
  success: false,
  error: "Invalid lot number format",
  details: [{
    field: "lotNumber",
    message: "Lot number must be in format: room/floor/block"
  }]
}

// Insufficient stock
{
  success: false,
  error: "Insufficient stock for withdrawal",
  details: [{
    field: "quantity",
    message: "Requested quantity exceeds available stock"
  }]
}
```

## Business Logic

### Lot Management
1. **Auto-assignment**: When creating inventory entry, system finds next available lot
2. **Stock tracking**: Lots track current stock levels
3. **Status updates**: Lot status changes based on stock levels
4. **Validation**: Withdrawal quantities validated against available stock

### Weight Calculations
1. **5-bag sampling**: Average calculated from 5 sample weights
2. **Total calculation**: Average × total bags = total weight
3. **Category totals**: Sum across all quality categories

### Data Integrity
1. **Foreign key constraints**: Ensure referential integrity
2. **Unique constraints**: Prevent duplicate farmers and lots
3. **Check constraints**: Ensure positive quantities and weights
4. **Transaction handling**: All related operations in single transaction

## Implementation Notes

### Database Choice
- **SQLite**: For local deployment, single-user scenarios
- **PostgreSQL**: For multi-user, production scenarios
- **Migration support**: Database schema versioning

### Performance Considerations
- **Indexing**: On frequently queried fields (farmer names, dates, lot numbers)
- **Pagination**: For large datasets
- **Caching**: Redis for frequently accessed data
- **Connection pooling**: For concurrent database access

### Security
- **Input validation**: All inputs sanitized and validated
- **SQL injection prevention**: Parameterized queries
- **Authentication**: JWT-based auth system (future)
- **Authorization**: Role-based access control (future)
