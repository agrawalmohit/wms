# System Requirements and Features

## Implementation Status Overview

### ✅ Fully Implemented Requirements
- **Farmer Management** with unique identification (Name + Father's Name + Village)
- **Stock Entry (आमद)** with 3 potato categories and 5-bag weight sampling
- **Stock Withdrawal (निकासी)** with simplified bag count interface
- **Lot Management** with search and monitoring capabilities
- **Hindi Interface** throughout the application
- **Responsive Design** for mobile and desktop
- **Real-time Calculations** for weights and totals

### ⚠️ Partially Implemented
- **Dashboard Statistics** - UI implemented, shows static data only
- **Warehouse Configuration** - Navigation tab exists, component is placeholder

### ❌ Not Implemented (Planned for Future)
- **Database Integration** - Currently uses React state only
- **Data Persistence** - Data lost on page refresh
- **Print Functionality** - No print capabilities
- **User Authentication** - No login system
- **Backup/Restore** - No data backup features

## Business Requirements

### Core Business Logic

#### 1. Farmer Management (किसान प्रबंधन)
**Purpose**: Unique identification and registration of farmers

**Requirements**:
- **Unique Identification**: Each farmer must be uniquely identified by combination of:
  - Name (नाम)
  - Father's Name (पिता का नाम) 
  - Village (गांव)
- **Registration Process**: Simple form-based registration
- **Data Validation**: Prevent duplicate registrations
- **Search Functionality**: Quick farmer lookup

**User Story**: 
> "In order to uniquely identify farmer, we need to have Name, Father's Name, Village. Father's name is missing"

#### 2. Stock Entry - Amad (स्टॉक आमद)
**Purpose**: Record incoming potato stock from farmers

**Requirements**:
- **Farmer Selection**: Choose from registered farmers
- **Quality Categories**: Three types of potatoes
  - मोटा (Mota) - Large potatoes
  - गुल्ला (Gulla) - Medium potatoes  
  - किरी (Kirri) - Small potatoes
- **Weight Sampling System**: 5-bag weight sampling for accuracy
  - Take weight of 5 bags per quality
  - Calculate average weight per bag
  - Apply to total bag count
- **Automatic Lot Assignment**: System assigns incremental lot numbers during inventory entry
- **Remarks Field**: Optional field for special notes about the lot
- **Asterisk Indicator**: Lots with remarks get "*" in lot number for easy identification
- **Location Tracking**: Room/Floor/Block number format
- **Date Recording**: Automatic date entry with manual override option

**User Story**:
> "we need inventory where we can select a unique farmer and then we need to have 3 categories of potato (mota, gulla, kirri). For each category, we need to have number of bags and for weight calculation we will take weight of 5 bags and then calculate average and then total weight."

#### 3. Stock Withdrawal - Nikasi (स्टॉक निकासी) 
**Purpose**: Record outgoing potato stock from warehouse

**Requirements**:
- **Farmer Selection**: Choose farmer who owns the stock
- **Lot Number Reference**: Enter the lot number from stock entry (with asterisk support)
- **Quality-wise Withdrawal**: Specify bags per quality category
- **Date Recording**: Default to current date
- **Simplified Interface**: Only bag counts, no weight calculations
- **Form Validation**: Ensure all required fields are filled

**User Story**:
> "We need to have form for stock debit which we call in hindi as nikasi. Here we record, how many bags has specific farmer exited from the warehouse. This requires to fill quality, quantity against each quality, date(defaulted to present date) and lot number."

#### 4. Lot Management (लॉट प्रबंधन)
**Purpose**: Monitor and track warehouse lots

**Requirements**:
- **Lot Search**: Find lots by number or farmer
- **Lot Monitoring**: View all active lots with details
- **Status Tracking**: Monitor lot contents and assignments
- **Simplified Interface**: Removed redundant lot assignment (handled in inventory)

**User Story**:
> "lot assignment screen is not required as lot is assigned during inventory"

### Technical Requirements

#### 1. User Interface
- **Language**: Complete Hindi interface for local operators
- **Responsive Design**: Work on desktop and mobile devices
- **Accessibility**: High contrast, readable fonts
- **Color Coding**: Different colors for potato quality categories

#### 2. Data Management
- **In-Memory Storage**: Current implementation uses React state ✅ **Implemented**
- **Future Database**: Planned SQLite integration ⚠️ **Not Implemented**
- **Data Validation**: Form validation and error handling ✅ **Implemented**
- **Real-time Calculations**: Automatic totals and averages ✅ **Implemented**

#### 3. Location System
**Format**: Room/Floor/Block (e.g., "5/4/12")
- **Room Number**: Storage room identifier
- **Floor Number**: Floor level in warehouse  
- **Block Number**: Specific block within room

**User Story**:
> "place of stock (sthan) format can be roomnumber/floornumber/blocknumber which is understood"
> "instead of location, we can call it lot number"

### Functional Specifications

#### Workflow Process
1. **Farmer Registration** → **Stock Entry** → **Lot Assignment** → **Stock Withdrawal**
2. **Lot Assignment** happens automatically during **Stock Entry**
3. **Stock Withdrawal** references existing lot numbers
4. **Lot Management** provides monitoring and search capabilities

#### Data Flow
```
Farmer Registration → Farmer Database
↓
Stock Entry → Inventory Entry + Automatic Lot Assignment
↓
Lot Management ← Search and Monitor Lots
↓
Stock Withdrawal → Withdrawal Entry (references existing lots)
```

#### Validation Rules
- **Farmer**: Must be selected from registered farmers
- **Quantities**: Must be positive numbers
- **Lot Numbers**: Sequential incremental numbers with optional asterisk for remarks
- **Dates**: Must be valid dates, defaults to current date

### Business Logic Rules

#### Weight Calculations (Stock Entry Only)
- Sample 5 bags per quality category
- Calculate average weight per bag
- Multiply by total bag count for category total
- Sum all categories for grand total

#### Lot Number Generation
- **Format**: `sequenceNumber/numberOfBags` (e.g., `1/100`, `2/50`, `3/75`)
- **Unique Key**: Each आमद (stock entry) gets next sequential number with bag count
- **Remarks Support**: Optional remarks field for special notes
- **Asterisk Indicator**: Lot numbers with remarks get "*" appended (e.g., `1/100*`, `2/50*`)
- **Real-time Preview**: Tentative lot number shown at top of form, updates as data changes
- **Assignment**: Automatic during stock entry, cannot be modified after creation
- **Reference**: Used for tracking and withdrawal operations
- **Date Support**: Entry date field allows back-dated entries

**Updated User Story**: 
> "Lot number must be (sequenceNumber/NumberOfBagsInAmadEntry) To be appended with asterisk if there are any remarks. We must show the tentative lot number as non-editable field on top and update it as we add data to the form. Remarks field should be last in the form. We also need a date field as well if we are making back dated entry."

#### Quality Categories
- **मोटा (Mota)**: Premium large potatoes
- **गुल्ला (Gulla)**: Standard medium potatoes
- **किरी (Kirri)**: Small potatoes for different markets

### Performance Requirements
- **Response Time**: < 2 seconds for form submissions ✅ **Achieved**
- **Concurrent Users**: Support multiple operators ❌ **Not Applicable (No Backend)**
- **Data Volume**: Handle thousands of entries ⚠️ **Limited by Browser Memory**
- **Offline Capability**: Future Electron app for offline operation ❌ **Not Implemented**

### Security Requirements
- **Data Integrity**: Prevent data corruption ⚠️ **Basic Validation Only**
- **Input Validation**: Sanitize all user inputs ✅ **Form Validation Implemented**
- **Access Control**: Future user authentication system ❌ **Not Implemented**

### Deployment Requirements
- **Environment**: Rural warehouse settings ✅ **Web-based Solution**
- **Hardware**: Basic computers/tablets ✅ **Responsive Design**
- **Network**: Should work with limited internet connectivity ⚠️ **Requires Internet for Initial Load**
- **Backup**: Regular data backup procedures ❌ **Not Implemented**

## Success Criteria

### User Experience
- ✅ Hindi interface comfortable for local operators **ACHIEVED**
- ✅ Intuitive navigation between functions **ACHIEVED**
- ✅ Quick data entry with minimal clicks **ACHIEVED**
- ✅ Clear visual feedback for actions **ACHIEVED**

### Business Process
- ✅ Accurate farmer identification **ACHIEVED**
- ✅ Precise stock tracking by quality **ACHIEVED**
- ✅ Efficient lot management **ACHIEVED**
- ⚠️ Complete transaction history **LIMITED - No Persistence**

### Technical Performance
- ✅ Fast page loads and transitions **ACHIEVED**
- ✅ Responsive design across devices **ACHIEVED**
- ✅ Error-free calculations **ACHIEVED**
- ⚠️ Stable operation during heavy use **LIMITED - Browser Memory Only**

### Data Management (Future Requirements)
- ❌ Persistent data storage **NOT IMPLEMENTED**
- ❌ Multi-user concurrent access **NOT IMPLEMENTED**
- ❌ Data backup and recovery **NOT IMPLEMENTED**
- ❌ Historical reporting **NOT IMPLEMENTED**
