# DesignFlow - Creative Design Studio
## Overview
DesignFlow is a powerful web-based design studio that enables users to create stunning visuals for various platforms. With an intuitive interface, AI-powered features, and extensive customization options, it simplifies graphic design for both beginners and professionals.
## Key Features 
### Canvas Creation
- Custom canvas dimensions
- Predefined templates for:
  - Social media (Instagram, Facebook, Twitter, LinkedIn, Pinterest)
  - YouTube (thumbnail, banner, post)
  - Presentations (PowerPoint)
  - Print materials (A4 flyer)
### Design Elements
- **Shapes**: Circle, Square, Triangle, Line, Rectangle, Ellipse, Pentagon, Hexagon, Star, Arrow, Heart
- **Images**:
  - Upload from device
  - Search via Unsplash integration
  - Transformations via Streamlit app (background removal,5 filters)
- **Text**:
    - Multiple text types (heading, subheading, paragraph)
    - Rich formatting (bold, italic, underline)
    - Font selection
    - AI content generation (Gemini 2.0 Flash)
 - **Stickers**:
    - Extensive emoji library
 - **Drawing Tool**:
    - Freehand drawing with mouse using pencil tool
 - **Undo / Redo functionality for canvas** 
### Real-time collaboration
- Multiple users can work on the same canvas simultaneously

### Customization Options
- Color adjustment
- Border styling
- Opacity control
- Dynamic resizing
- Draggable & rotatable elements
- Background customization
### Workspace
- Recent designs section
- Projects organization
- Template library
- Design management (create/delete)
### Integration
- AI: Gemini 2.0 Flash for content generation
- Storage: Convex cloud database
- Media: ImageKit.io for image hosting
- Stock Images: Unsplash API
- Secure authentication and user management: Stack Auth
## Tech Stack
### Frontend
- Next.js (App Router)
- Tailwind CSS
- Fabric.js (Canvas manipulation)
- React Icons
### Backend Services
- Convex (Database & backend functions)
- Flask (AI content generation)
- Streamlit (Image transformations)
### APIs
- Google Gemini API
- ImageKit.io
- Unsplash
- Convex
- Stack Auth
## Installation & Setup 
### Prerequisites
- Node.js (v18+)
- Python (for Flask backend)
    - flask
    - flask_cors
    - google.generativeai
    - streamlit
    - decouple
    - numpy
    - PIL
    - rembg
- Convex account
- ImageKit.io account
- Google API key (for Gemini)
- Unsplash API key
- Stack Auth account
### Setup
```
git clone https://github.com/aditya95-pixel/design-flow.git
cd design-flow
npm i
```
Create `.env.local` file
```
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=

NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
```
Add the keys as applicable
#### Run the development server:
```
npm run dev
```
#### Flask backend setup
```
cd backend
python app.py
```
### Streamlit App setup
```
cd backend
streamlit run imagetransformer.py
```
### Deployment
The project has been successfully deployed (except for AI text generation, which is currently disabled due to API rate limits).All other features are live and functional.
