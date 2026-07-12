# 🚀 GrowEasy AI CSV Importer

An AI-powered CSV Importer built using **Next.js**, **Node.js**, **Express**, and **Google Gemini AI** that intelligently extracts CRM lead information from CSV files with different formats and converts them into a standardized GrowEasy CRM structure.

---

## 📌 Features

### 📂 CSV Upload
- Drag & Drop CSV Upload
- File Picker Support
- CSV Validation

### 👀 CSV Preview
- Responsive Preview Table
- Sticky Headers
- Horizontal & Vertical Scrolling
- Pagination
- Search & Filtering
- Sorting by Columns
- Export Preview as CSV

### 🤖 AI-Powered CRM Extraction
- Uses Google Gemini AI
- Intelligent Field Mapping
- Supports Different CSV Formats
- Batch Processing
- Retry Mechanism for Failed Requests
- Skips Invalid Records Automatically

### 📊 Dashboard
- Imported Records Count
- Skipped Records Count
- Success Statistics
- Loading Overlay During Processing

### 🎨 UI Features
- Responsive Design
- Dark / Light Mode
- Modern User Interface
- Toast Notifications

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios
- PapaParse
- Lucide React
- Sonner

---

## Backend

- Node.js
- Express
- TypeScript
- Multer
- CSV Parser
- Google Gemini AI SDK
- Dotenv

---

# 📁 Project Structure

```
groweasy-ai-importer
│
├── backend
│   ├── src
│   │   ├── ai
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   ├── public
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/groweasy-ai-importer.git

cd groweasy-ai-importer
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

GEMINI_MODEL=gemini-3.1-flash-lite
```

Run Backend

```bash
npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

Create

```
.env.local
```

Add

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# AI Extraction Workflow

```
CSV Upload
        │
        ▼
CSV Parsing
        │
        ▼
Preview Records
        │
        ▼
Confirm Import
        │
        ▼
Backend API
        │
        ▼
Batch Processing
        │
        ▼
Gemini AI Extraction
        │
        ▼
CRM JSON Records
        │
        ▼
Display Results
```

---

# CRM Fields Extracted

- created_at
- name
- email
- country_code
- mobile_without_country_code
- company
- city
- state
- country
- lead_owner
- crm_status
- crm_note
- data_source
- possession_time
- description

---

# API Endpoints

## Health Check

```
GET /
```

Response

```json
{
  "message": "GrowEasy Backend Running"
}
```

---

## Import CSV

```
POST /api/import
```

Form Data

```
file : CSV File
```

Response

```json
{
  "imported": [],
  "skipped": [],
  "totalImported": 0,
  "totalSkipped": 0
}
```

---

# Bonus Features Implemented

- AI Prompt Engineering
- Batch Processing
- Retry Mechanism
- Responsive UI
- Search
- Sorting
- Pagination
- CSV Export
- Sticky Table Header
- Dark Mode
- Loading Indicator
- Error Handling
- Toast Notifications

---

# Future Improvements

- Database Integration
- Authentication
- User Accounts
- Import History
- AI Confidence Score
- Streaming CSV Processing
- Background Job Queue
- Unit Tests
- Deployment Automation

---

# Author

**Sharad Pareek**

GitHub

https://github.com/YOUR_USERNAME

LinkedIn

https://linkedin.com/in/YOUR_LINKEDIN

---

# License

This project is created as part of the **GrowEasy Software Developer Assignment** and is intended for educational and evaluation purposes.
