const fs = require('fs');
const path = require('path');

const componentPath = path.resolve('src/pages/DistribuidorGabriel.tsx');
let componentCode = fs.readFileSync(componentPath, 'utf-8');

const masksPath = path.resolve('src/utils/masks.ts');
let masksCode = fs.readFileSync(masksPath, 'utf-8');
masksCode = masksCode.replace(/export\s+/g, ''); // Remove export keywords

// Extract Lucide Icons
const iconRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/;
const iconMatch = componentCode.match(iconRegex);
let iconDeclarations = '';
if (iconMatch) {
  const icons = iconMatch[1].split(',').map(i => i.trim()).filter(Boolean);
  const toKebab = (str) => {
    // Handling acronyms and numbers correctly isn't perfect, but a basic regex:
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  };

  iconDeclarations = `
    // Lucide Icon Mock
    const Icon = ({ name, size = 24, color = "currentColor", strokeWidth = 2, className = "", ...props }) => {
        const [svg, setSvg] = React.useState("");
        React.useEffect(() => {
            if (window.lucide && window.lucide.icons[name]) {
                const icon = window.lucide.icons[name];
                const svgString = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${color}" stroke-width="\${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="\${className}">\${icon.map(i => \`<\${i[0]} \${Object.entries(i[1]).map(([k,v]) => \`\${k}="\${v}"\`).join(' ')} />\`).join('')}</svg>\`;
                setSvg(svgString);
            }
        }, [name, size, color, strokeWidth, className]);
        return <div style={{display:'contents'}} dangerouslySetInnerHTML={{ __html: svg }} {...props} />;
    };
  \n` + icons.map(icon => `    const ${icon} = (props) => <Icon name="${toKebab(icon)}" {...props} />;`).join('\n');
}

// Remove all top-level imports
componentCode = componentCode.replace(/^import\s+.*?['"].*?['"];?\s*$/gm, '');

// Rename 'export default function DistribuidorGabriel' to 'function DistribuidorGabriel'
componentCode = componentCode.replace(/export\s+default\s+function\s+DistribuidorGabriel/g, 'function DistribuidorGabriel');

// Define the full HTML template
const htmlTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bubbles Pet Cosmetics | Seja um Distribuidor</title>
    
    <link rel="icon" type="image/svg+xml" href="https://bubbles.gabrielxavier.online/PATINHA%20BUBBLES.svg" />
    
    <!-- React & ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- Framer Motion -->
    <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
    
    <!-- Babel & TypeScript Preset -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Microsoft Clarity -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "wbnansxpk1");
    </script>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap');

        body { 
            font-family: 'Poppins', sans-serif; 
            background-color: #080808; 
            color: #ffffff; 
            margin: 0;
        }

        .font-figtree { font-family: 'Figtree', sans-serif; }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Poppins', 'sans-serif'],
                    },
                    colors: {
                        'brand-pink': '#F4CDD4',
                        'brand-super-pink': '#E8649A',
                        'brand-dark': '#0D0C0D',
                        'action-green': '#3DB85C',
                        'promo-red': '#E03E3E',
                    }
                }
            }
        }
    </script>
</head>
<body>
    <div id="root">
        <div style="height: 100vh; display: flex; justify-content: center; align-items: center;">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F4CDD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
            <style>
                @keyframes spin { 100% { transform: rotate(360deg); } }
            </style>
        </div>
    </div>

    <!-- Typescript is stripped mostly by babel standalone if we specify data-presets -->
    <script type="text/babel" data-presets="react,typescript">
        const { useState, useEffect, useRef, useCallback, useMemo } = React;
        const { motion, AnimatePresence, useScroll, useTransform, useInView } = window.Motion;

${iconDeclarations}

${masksCode}

${componentCode}

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<DistribuidorGabriel />);
    </script>
</body>
</html>
`;

fs.writeFileSync(path.resolve('public/distribuidor-export.html'), htmlTemplate);
console.log('Exporter gerado com sucesso em public/distribuidor-export.html');