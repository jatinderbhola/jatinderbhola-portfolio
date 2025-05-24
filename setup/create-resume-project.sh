#!/bin/bash
# create-resume-project.sh

echo "🚀 Creating Interactive Resume Project..."

# Create directory structure
cd ../
mkdir -p interactive-resume/{css,js/{utils,components},data/profiles}
cd interactive-resume

echo "📁 Directory structure created!"
echo "📝 Please copy the file contents from Claude's artifacts into:"
echo "   - index.html"
echo "   - css/main.css" 
echo "   - css/components.css"
echo "   - css/animations.css"
echo "   - js/main.js"
echo "   - js/utils/dataLoader.js"
echo "   - js/utils/threeBackground.js"
echo "   - js/components/hero.js"
echo "   - js/components/aiShowcase.js" 
echo "   - js/components/skills.js"
echo "   - js/components/experience.js"
echo "   - js/components/contact.js"
echo "   - data/resume.json"

echo "✅ Ready for development!"