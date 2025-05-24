# Interactive Resume Website - Project Structure

## 📁 Project Structure
```
interactive-resume/
├── index.html
├── css/
│   ├── main.css
│   ├── components.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── components/
│   │   ├── hero.js
│   │   ├── aiShowcase.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   └── contact.js
│   ├── utils/
│   │   ├── dataLoader.js
│   │   ├── animations.js
│   │   └── threeBackground.js
│   └── config.js
├── data/
│   ├── resume.json (main profile)
│   ├── profiles/
│   │   ├── frontend-lead.json
│   │   ├── backend-architect.json
│   │   └── ai-engineer.json
│   └── themes/
│       ├── cosmos.json
│       └── neural.json
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## 🚀 Key Features
- **Dynamic JSON Loading**: Website reads from JSON files for content
- **Multiple Profiles**: Switch between different resume profiles
- **Cosmos/Neural Theme**: Brain wave patterns with space aesthetics
- **Modular Architecture**: Easy to maintain and extend
- **Cursor IDE Ready**: Proper project structure for development

## 🎨 New Color Scheme (Cosmos/Neural Theme)
- **Primary**: Deep space blue (#0B1426)
- **Secondary**: Neural pink (#FF6B9D) 
- **Accent**: Cosmic cyan (#00F5FF)
- **Neural**: Electric purple (#8B5FBF)
- **Cosmos**: Stellar gold (#FFD700)

## 📊 Dynamic Content Loading
- Profile switching via URL parameters
- Real-time JSON updates
- Theme customization
- Component-based rendering


## Switch between different resume profiles

```
profiles: {
  'resume': 'Main Profile',
  'frontend-lead': 'Frontend Leadership', 
  'backend-architect': 'Backend Architecture',
  'ai-engineer': 'AI Engineering'
}
```

## URL-Based Profile Switching:
yoursite.com - Main profile
yoursite.com?profile=ai-engineer - AI Engineer profile
yoursite.com?profile=frontend-lead - Frontend Lead profile