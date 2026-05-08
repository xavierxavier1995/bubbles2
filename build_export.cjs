const fs = require('fs');
const path = require('path');

const componentPath = path.resolve('src/pages/DistribuidorGabriel.tsx');
let componentCode = fs.readFileSync(componentPath, 'utf-8');

const masksPath = path.resolve('src/utils/masks.ts');
let masksCode = fs.readFileSync(masksPath, 'utf-8');
masksCode = masksCode.replace(/export\s+/g, ''); // Remove export keywords

// Remove the import for masks
componentCode = componentCode.replace(/import\s+.*?from\s+['"\.\/]+utils\/masks['"];?/g, '');

// Prepend the masksCode
componentCode = masksCode + '\n\n' + componentCode;

// Add rendering code
componentCode += `\n
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<DistribuidorGabriel />);
`;

// Define the full HTML template
const htmlTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bubbles Pet Cosmetics | Seja um Distribuidor</title>
    
    <link rel="icon" type="image/svg+xml" href="https://bubbles.gabrielxavier.online/PATINHA%20BUBBLES.svg" />
    
    <!-- ES Module Shims for cross browser import map support -->
    <script async src="https://ga.jspm.io/npm:es-module-shims@1.10.0/dist/es-module-shims.js"></script>
    
    <!-- Import Map -->
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18",
        "react-dom/client": "https://esm.sh/react-dom@18/client",
        "lucide-react": "https://esm.sh/lucide-react@0.469.0",
        "motion/react": "https://esm.sh/motion@12.38.0/react"
      }
    }
    </script>
    
    <!-- Babel & TypeScript Preset -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
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

    <!-- The application logic -->
    <script type="text/babel" data-type="module" data-presets="react,typescript">
${componentCode}
    </script>
</body>
</html>
`;

fs.writeFileSync(path.resolve('public/distribuidor-export.html'), htmlTemplate);
console.log('Exporter gerado com sucesso em public/distribuidor-export.html');
