# Taggle - iXBRL Tagging Decision Tree

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

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taggle.git
cd taggle
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

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deploy to Netlify

### Quick Deploy

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your GitHub repository
5. Netlify will auto-detect build settings
6. Click "Deploy site"

Netlify will automatically rebuild and deploy whenever you push to main.

## Usage

1. **Start**: Choose whether you're tagging a quantifiable fact or narrative text
2. **Navigate**: Follow the decision tree, answering questions about your content
3. **Review**: Check your tagging strategy in the summary screen
4. **Adjust**: Use Back button to revise earlier decisions
5. **Reset**: Start over anytime with the Reset button

## File Structure

```
taggle/
├── src/
│   ├── components/
│   │   ├── DecisionTree.jsx      # Main component
│   │   └── DecisionTree.css      # Component styles
│   ├── App.jsx                   # Root component
│   └── main.jsx                  # Entry point
├── index.html                    # HTML template
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies
├── netlify.toml                 # Netlify config
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

Open source. Built for better iXBRL tagging.

---

**Built with ❤️ for the FRC Digital Reporting team**
