# SmartScribe

SmartScribe is a full-stack AI-powered application that converts raw content from PDFs and web pages into concise summaries, structured notes, and multiple-choice questions for efficient learning and revision.

---

# Features

- Multi-source input
- Upload PDF documents
- Extract content from web links
- AI-powered processing
- Generate concise summaries
- Create structured notes with headings and bullet points
- Automatically generate multiple-choice questions with answers
- Smart content handling
- Handles large inputs with trimming for optimal AI performance
- Graceful error handling for empty or unsupported content
- Clean UI/UX
- Minimal, distraction-free interface
- Loading states for smooth user experience
- Structured output display (summary, notes, MCQs)

---

# Tech Stack

- Frontend
- React.js
- Axios
- Custom CSS
- Backend
- Node.js
- Express.js
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- Cheerio + Axios (web scraping)
- AI Integration
- Puter AI (for generating summaries, notes, and MCQs)

---

# Deployment

- Frontend: Vercel
- Backend: Render

---

# How It Works

- User provides either a PDF file (or PPT in .pdf format) or website link (blogs/articles)

### Backend processing:

- Extracts text from PDF or scrapes content from the website
- Cleans and trims the text

### AI processing:

- Sends extracted text to AI
- Generates: Summary, Structured notes, MCQs

---

# Installation and Setup

1. Clone the repository

`git clone https://github.com/your-username/smartscribe.git`
`cd smartscribe`


2. Backend setup

`cd server`
`npm install`
`npm start`

3. Frontend setup

`cd client`
`npm install`
`npm run dev`

---

# License

This project is licensed under the MIT License.