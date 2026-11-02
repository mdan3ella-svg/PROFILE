import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {writeFile,unlink} from 'node:fs/promises';
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const match=html.match(/<script type="module">([\s\S]*?)<\/script>/);
if(!match)throw Error('Missing module');
const tmp=new URL('./.syntax-check.mjs',import.meta.url);await writeFile(tmp,match[1]);const p=spawnSync(process.execPath,['--check',tmp.pathname],{encoding:'utf8'});await unlink(tmp);if(p.status)throw Error(p.stderr);
const required=['msMultiGLB','msLayerBake','msLayerInterp','msFootLock','msCameraKey','msCameraPlay','msRecord','msJointLimit'];for(const id of required)if(!html.includes(`id="${id}"`))throw Error('Missing control '+id);
console.log('PASS: module JavaScript syntax, eight advanced controls');
