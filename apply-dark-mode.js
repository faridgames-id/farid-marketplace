import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'src/pages');
const COMPONENTS_DIR = path.join(process.cwd(), 'src/components');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip files we already manually updated to prevent double dark classes
  if (filePath.includes('TopNav.tsx') || filePath.includes('BottomNav.tsx') || filePath.includes('AppLayout.tsx') || filePath.includes('Footer.tsx')) {
    return;
  }

  // Safe replacements using regex word boundaries or class attribute matching
  // bg-white -> bg-white dark:bg-slate-900
  content = content.replace(/(['"`\s])bg-white(['"`\s])/g, '$1bg-white dark:bg-slate-900$2');
  
  // text-slate-900 -> text-slate-900 dark:text-white
  content = content.replace(/(['"`\s])text-slate-900(['"`\s])/g, '$1text-slate-900 dark:text-white$2');
  
  // text-slate-800 -> text-slate-800 dark:text-slate-100
  content = content.replace(/(['"`\s])text-slate-800(['"`\s])/g, '$1text-slate-800 dark:text-slate-100$2');
  
  // bg-slate-50 -> bg-slate-50 dark:bg-slate-900/50
  content = content.replace(/(['"`\s])bg-slate-50(['"`\s])/g, '$1bg-slate-50 dark:bg-slate-900/50$2');
  
  // bg-slate-100 -> bg-slate-100 dark:bg-slate-800
  content = content.replace(/(['"`\s])bg-slate-100(['"`\s])/g, '$1bg-slate-100 dark:bg-slate-800$2');
  
  // border-slate-200 -> border-slate-200 dark:border-slate-700
  content = content.replace(/(['"`\s])border-slate-200(['"`\s])/g, '$1border-slate-200 dark:border-slate-700$2');
  
  // border-slate-100 -> border-slate-100 dark:border-slate-800
  content = content.replace(/(['"`\s])border-slate-100(['"`\s])/g, '$1border-slate-100 dark:border-slate-800$2');
  
  // text-slate-500 -> text-slate-500 dark:text-slate-400
  content = content.replace(/(['"`\s])text-slate-500(['"`\s])/g, '$1text-slate-500 dark:text-slate-400$2');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx')) {
      replaceInFile(filePath);
    }
  }
}

walkDir(PAGES_DIR);
walkDir(COMPONENTS_DIR);
