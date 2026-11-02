import {readFile} from 'node:fs/promises';
const s=await readFile('index.html','utf8');
const assert=(v,msg)=>{if(!v)throw Error(msg);console.log('PASS',msg)};
assert(s.includes('profileDemoBuffer'), 'Demo source resolver');
for(const name of ['humanoid','scorpion']){const b=await readFile('assets/'+name+'.glb');assert(b.toString('ascii',0,4)==='glTF','Valid GLB header: '+name);const version=b.readUInt32LE(4),len=b.readUInt32LE(8);assert(version===2&&len===b.length,'GLB v2 length and header: '+name);}
assert(s.includes('serializeRigGLB')&&s.includes('validateExportRoundTrip'),'Export and round-trip validation implemented');
assert(s.includes('rigPreflight')&&s.includes('checkNeutralBind'),'Skin / neutral matrix checks present');
console.log('Static verification complete; real-time rig behaviour and 3D export need browser/target-engine tests.');
