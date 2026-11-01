import {readFileSync,existsSync} from 'node:fs';
const path='dist/index.html';if(!existsSync(path))throw Error('Build first: npm run build');
const html=readFileSync(path,'utf8');
const tests={
 'No import maps':!/<script\s+type=["']importmap/i.test(html),
 'No application ES module tags':!/<script\s+type=["']module/i.test(html),
 'No Three.js CDN references':!/https?:\/\/(?:unpkg\.com|cdn\.jsdelivr\.net|esm\.sh|cdnjs\.cloudflare\.com)/i.test(html),
 'No remote JS sources':!/<script[^>]+src\s*=\s*["']https?:/i.test(html),
 'Bundled Three.js marker':html.includes('WebGLRenderer')&&html.includes('GLTFLoader'),
 'Embedded reference preserved':html.includes('profile-humanoid-reference'),
 'Operator manual exists':existsSync('dist/operator-manual.html'),
 'GitHub Pages nojekyll exists':existsSync('dist/.nojekyll'),
};for(const [name,ok] of Object.entries(tests))console.log((ok?'PASS':'FAIL')+' '+name);
if(Object.values(tests).some(v=>!v))process.exitCode=1;
console.log('NOTE: Static checks cannot certify offline network behavior or graphics/GLB correctness.');
