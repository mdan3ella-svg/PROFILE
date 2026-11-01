import {build} from 'esbuild';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=process.cwd(), html=readFileSync(join(root,'source','index.html'),'utf8');
const match=html.match(/<script\s+type="module">([\s\S]*?)<\/script>/);
if(!match)throw Error('Expected exactly one application module');
const app=match[1];
const dir=resolve(root,'dist');mkdirSync(dir,{recursive:true});
const entry=join(dir,'_profile_entry.mjs'), out=join(dir,'_profile_bundle.js');
writeFileSync(entry,app);
await build({entryPoints:[entry],outfile:out,bundle:true,minify:true,format:'iife',platform:'browser',target:'es2020',legalComments:'none',logLevel:'info',absWorkingDir:root});
let bundle=readFileSync(out,'utf8').replace(/<\/script/gi,'<\\/script');
let result=html.replace(/<script\s+type="importmap">[\s\S]*?<\/script>/,'')
 .replace(match[0],`<script>\n${bundle}\n</script>`);
if(/<script\s+type="module">|<script\s+type="importmap">/.test(result)) throw Error('Unbundled module remains');
const remote=/<script[^>]+src\s*=\s*["']https?:|<link[^>]+href\s*=\s*["']https?:|\bimport\s*\(\s*["']https?:|\bimport\s+[^;\n]*from\s*["']https?:|https?:\/\/(?:unpkg\.com|cdn\.jsdelivr\.net|esm\.sh|cdnjs\.cloudflare\.com)/i;
if(remote.test(result))throw Error('Network dependency remains in compiled HTML');
const output=join(dir,'index.html');writeFileSync(output,result);
for(const name of ['operator-manual.html','.nojekyll']){
 const filename=join(root,'source',name);
 try {writeFileSync(join(dir,name),readFileSync(filename));}catch(err){if(name!=='.nojekyll')throw err;writeFileSync(join(dir,name),'');}
}
console.log('COMPILED:',output, (Buffer.byteLength(result)/1048576).toFixed(2)+' MiB');
console.log('Offline dependency scan: PASS. No imports, import maps or CDN module references.');
