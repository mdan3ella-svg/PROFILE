import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {resolve,dirname} from 'node:path';
const base=dirname(new URL(import.meta.url).pathname);
const html=await readFile(resolve(base,'index.html'),'utf8');
const match=html.match(/<script type="module">([\s\S]*?)<\/script>/);
if(!match)throw Error('Engine module missing');
const bundled=await build({stdin:{contents:match[1],resolveDir:base,sourcefile:'profile-engine.js',loader:'js'},bundle:true,format:'iife',platform:'browser',target:'es2020',write:false, minify:true,logLevel:'warning'});
const script=bundled.outputFiles[0].text;
const models={};for(const name of ['humanoid','scorpion'])models[name]=(await readFile(resolve(base,'assets',name+'.glb'))).toString('base64');
const manual=await readFile(resolve(base,'operator-manual.html'),'utf8');
// Blob-backed manual works with file:// and has no network dependency.
const safeManual=JSON.stringify(manual).replace(/<\/script/gi,'<\\/script');
const embedded=`<script>globalThis.__PROFILE_EMBEDDED_ASSETS__=${JSON.stringify(models)};globalThis.__PROFILE_MANUAL__=${safeManual};</script>`;
let output=html.replace(/<script type="importmap">[\s\S]*?<\/script>/,'').replace(match[0],`<script>${script.replaceAll('</script','<\\/script')}</script>`);
output=output.replace('</head>',embedded+'\n</head>');
output=output.replaceAll("'./operator-manual.html'",'URL.createObjectURL(new Blob([globalThis.__PROFILE_MANUAL__],{type:"text/html"}))');
// also make the separate manual hyperlink offline by replacing its href with an immediate click action
output=output.replace('href="./operator-manual.html"','href="#" onclick="event.preventDefault();window.open(URL.createObjectURL(new Blob([globalThis.__PROFILE_MANUAL__],{type:\'text/html\'})),\'_blank\')"');
output=output.replace('source-aligned training','source-aligned training');
await mkdir(resolve(base,'offline'),{recursive:true});await writeFile(resolve(base,'offline','PROFILE_MOTION_ENGINE_OFFLINE.html'),output);
console.log('Created offline/PROFILE_MOTION_ENGINE_OFFLINE.html ('+(Buffer.byteLength(output)/1048576).toFixed(1)+' MiB)');
