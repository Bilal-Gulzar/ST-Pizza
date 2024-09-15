import {writeFile} from 'fs/promises'
export const  POST = async(req)=>{

const data = await req.formData();
// 
const file = data.get('file');
if(!file){

return Response.json({success:false,Message:"Image couldn't change"})

}
const byteData = await file.arrayBuffer()
const buffer = Buffer.from(byteData);
const path = `./public/${file.name}`
await writeFile(path,buffer);

return Response.json({success:true ,img:file,buffer })

}