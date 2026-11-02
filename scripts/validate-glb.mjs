import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const inputs=process.argv.slice(2);
if(!inputs.length){console.error('Usage: npm run verify:glb -- path/to/file.glb [...]');process.exit(2)}
let failure=false;
for(const path of inputs){
 try{
  const b=await readFile(resolve(path));
  if(b.length<20||b.toString('utf8',0,4)!=='glTF'||b.readUInt32LE(4)!==2||b.readUInt32LE(8)!==b.length)throw Error('Invalid GLB header or declared size');
  let p=12,gltf=null,binSize=0;
  while(p+8<=b.length){const len=b.readUInt32LE(p),type=b.readUInt32LE(p+4);p+=8;if(p+len>b.length)throw Error('Chunk overruns file');if(type===0x4e4f534a)gltf=JSON.parse(b.toString('utf8',p,p+len));if(type===0x004e4942)binSize+=len;p+=len}
  if(!gltf||p!==b.length)throw Error('Invalid GLB chunk structure');
  const nodes=gltf.nodes||[],meshes=gltf.meshes||[],skins=gltf.skins||[],anims=gltf.animations||[];
  for(const s of skins)for(const j of (s.joints||[]))if(!Number.isInteger(j)||j<0||j>=nodes.length)throw Error('Out-of-range joint index');
  for(const a of anims){for(const ch of (a.channels||[])){if(ch.target?.node!==undefined&&(ch.target.node<0||ch.target.node>=nodes.length))throw Error('Invalid animation node target');if(!(a.samplers||[])[ch.sampler])throw Error('Invalid sampler reference')}}
  let rigid=0,skinned=0;for(const m of meshes)for(const prim of (m.primitives||[])){if('JOINTS_0' in (prim.attributes||{})){skinned++;if(!('WEIGHTS_0' in prim.attributes))throw Error('Skinned primitive lacks WEIGHTS_0')}else rigid++}
  console.log(`PASS ${path}: ${nodes.length} nodes, ${meshes.length} meshes, ${skins.length} skins, ${anims.length} clips, ${skinned} skinned primitives, ${rigid} unskinned primitives, ${binSize} binary bytes`);
 }catch(e){failure=true;console.error(`FAIL ${path}: ${e.message}`)}
}
if(failure)process.exit(1);
