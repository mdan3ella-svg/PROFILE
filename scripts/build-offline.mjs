import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {build} from 'esbuild';
const base=path.resolve(import.meta.dirname,'..');
let html=await readFile(path.join(base,'index.html'),'utf8');
const start=html.indexOf('<script type="module">'),end=html.indexOf('</script>',start);
if(start<0||end<0)throw Error('Module script not found');
const source=html.slice(start+'<script type="module">'.length,end);
const built=await build({stdin:{contents:source,resolveDir:base,sourcefile:'profile-engine.js',loader:'js'},bundle:true,format:'iife',write:false,target:['chrome110','firefox115','safari16'],minify:true,logLevel:'warning'});
let code=built.outputFiles[0].text;
const assets={};
for(const [key,file] of [['humanoid','assets/humanoid.glb'],['scorpion','assets/scorpion.glb']]){
 try{const buf=await readFile(path.join(base,file));assets[key]=`data:model/gltf-binary;base64,${buf.toString('base64')}`}
 catch{console.warn(`Optional GLB missing: ${file} — demo must be imported manually`)}
}
// The hosted application requests ./assets/*.glb; intercept only these exact paths.
const loader=`<script>window.__PROFILE_EMBEDDED_ASSETS__=${JSON.stringify(assets)};if(Object.keys(window.__PROFILE_EMBEDDED_ASSETS__).length){const original=window.fetch.bind(window);window.fetch=(input,options)=>{const url=typeof input==='string'?input:input instanceof URL?input.href:input?.url||'';const match=String(url).match(/(?:^|\\/)assets\\/(humanoid|scorpion)\\.glb(?:[?#]|$)/);if(match&&window.__PROFILE_EMBEDDED_ASSETS__[match[1]])return original(window.__PROFILE_EMBEDDED_ASSETS__[match[1]],options);return original(input,options)}}<\/script>`;
html=html.slice(0,start)+loader+'<script>'+code+'</script>'+html.slice(end+'</script>'.length);
html=html.replace(/<script type="importmap">[\s\S]*?<\/script>/,'');
// inline operator manual when it exists; no iframe network calls required
try {const manual=await readFile(path.join(base,'operator-manual.html'),'utf8');const m64=Buffer.from(manual).toString('base64');html=html.replace("src='./operator-manual.html'",`src='data:text/html;base64,${m64}'`);html=html.replace("src='./operator-manual.html'",`src='data:text/html;base64,${m64}'`);html=html.replace(".src='./operator-manual.html'",`.src='data:text/html;base64,${m64}'`)}catch{}
await mkdir(path.join(base,'offline'),{recursive:true});const out=path.join(base,'offline','PROFILE_MOTION_ENGINE_OFFLINE.html');await writeFile(out,html);
console.log('Built',out,'bytes',Buffer.byteLength(html));
