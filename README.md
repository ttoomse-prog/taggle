# iXBRL Tagging Decision Tree

An interactive React decision tree guide for tagging iXBRL financial statements. Helps taggers navigate through the decision points and generate a personalized tagging strategy.

## Features

- **Interactive Decision Flow**: Walk through iXBRL tagging decisions with context and guidance
- **Progress Tracking**: Visual display of decisions made
- **Smart Summaries**: Automatically generates tagging strategies based on your choices
- **Helpful Tips**: Domain-specific guidance at key decision points
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18
- Vite
- Lucide React (icons)
- CSS3

## Development

### Prerequisites

- Node.js 16+ and npm

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ixbrl-tagging-decision-tree.git
cd ixbrl-tagger
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

To create a production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deploy to Netlify

### Option 1: Deploy via Netlify UI (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [netlify.com](https://netlify.com) and sign in with your GitHub account

3. Click "Add new site" → "Import an existing project"

4. Select your GitHub repository

5. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

6. Click "Deploy site"

Netlify will automatically build and deploy whenever you push to main.

### Option 2: Deploy via CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

For production deployment:
```bash
netlify deploy --prod
```

### Option 3: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist/` folder onto [netlify.com](https://netlify.com)

## Environment & Configuration

No environment variables required. The app runs with static assets only.

## Usage

1. **Start**: Choose whether you're tagging a quantifiable fact or narrative text
2. **Navigate**: Follow the decision tree, answering questions about your content
3. **Review**: Check your tagging strategy in the summary screen
4. **Adjust**: Use Back button to revise earlier decisions
5. **Reset**: Start over anytime with the Reset button

## File Structure

```
ixbrl-tagger/
├── src/
│   ├── components/
│   │   ├── DecisionTree.jsx      # Main component
│   │   └── DecisionTree.css      # Component styles
│   ├── App.jsx                   # Root component
│   └── main.jsx                  # Entry point
├── index.html                    # HTML template
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

## Customization

### Adding New Decision Nodes

Edit `src/components/DecisionTree.jsx` and add entries to the `decisionTree` object:

```javascript
newNode: {
  question: "Your question?",
  context: "Explanation of this decision point",
  tip: "Optional helpful tip",
  options: [
    { label: "Option 1", nextId: "nextNodeId", icon: "📍" },
    { label: "Option 2", nextId: "anotherNodeId", icon: "📍" }
  ]
}
```

### Styling

Modify `src/components/DecisionTree.css` to customize colors, fonts, and layout.

## Browser Support

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions

## License

This project is open source. Please refer to LICENSE file if present.

## Contact

For questions or suggestions about the decision tree logic, contact the FRC Digital Reporting team.

---

**Built with ❤️ for better iXBRL tagging**
