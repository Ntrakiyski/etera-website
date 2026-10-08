import assert from 'node:assert/strict';
import { test } from 'node:test';
import { deliverInquiry } from '../lib/inquiry-delivery.ts';

const data = { name:'Website test',email:'visitor@example.com',brand:'ETERA',budget:'1000',project:'A new brand',additional:'Details',services:['Brand Strategy'],website:'',submissionId:'b1a3e07d-8901-459a-a5a4-a0f93f88a111',turnstileToken:'valid' };
const config = { apiKey:'unit-only',turnstileSecret:'unit-only',serviceOptions:['Brand Strategy'],limiter:{limit:async()=>({success:true})} };
const request = (body:unknown=data, origin='https://etera.trakiyski.work') => new Request('https://etera.trakiyski.work/api/inquiry',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});

test('valid inquiry fixes recipients, protects BCC, and reuses idempotency key', async()=>{
 const original=globalThis.fetch;let calls=0;const keys:string[]=[];
 globalThis.fetch=async(input,init)=>{calls++;if(String(input).includes('siteverify'))return Response.json({success:true,hostname:'etera.trakiyski.work',action:'inquiry'});
  const body=JSON.parse(String(init?.body));assert.deepEqual(body.to,['hello@eteracreative.com']);assert.deepEqual(body.cc,['visitor@example.com']);assert.deepEqual(body.bcc,['ystoyanova@eteracreative.com','adjurdjevic@eteracreative.com']);assert.equal(body.from,'ETÉRA <hello@eteracreative.com>');assert.equal(body.reply_to,'visitor@example.com');assert(!body.html.includes('ystoyanova@'));assert(body.text.includes('A new brand'));keys.push(new Headers(init?.headers).get('Idempotency-Key')!);return Response.json({id:'accepted'});
 };
 try{assert.equal((await deliverInquiry(request({...data,to:['attacker@example.com']}),config)).status,200);assert.equal((await deliverInquiry(request(),config)).status,200);assert.equal(calls,4);assert.equal(keys[0],keys[1]);}finally{globalThis.fetch=original;}
});
test('invalid input and origin never call email API',async()=>{
 const original=globalThis.fetch;globalThis.fetch=async()=>{throw Error('Must not send')};
 try{
  for(const body of [null,[],{...data,email:'victim@example.com,other@example.com'},{...data,project:''},{...data,services:['unknown']},{...data,website:'bot'},{...data,submissionId:'bad'},{...data,name:'a'.repeat(121)}])assert.equal((await deliverInquiry(request(body),config)).status,400);
  assert.equal((await deliverInquiry(request(data,'https://attacker.example'),config)).status,403);
  assert.equal((await deliverInquiry(request({...data,project:'a'.repeat(17000)}),config)).status,413);
  assert.equal((await deliverInquiry(request(),{...config,apiKey:''})).status,503);
 }finally{globalThis.fetch=original;}
});
test('rate limits, wrong verification hostname/action and provider failures never report success',async()=>{
 const original=globalThis.fetch;
 try{
  const limited=await deliverInquiry(request(),{...config,limiter:{limit:async()=>({success:false})}});assert.equal(limited.status,429);assert.equal(limited.headers.get('retry-after'),'60');
  for(const verified of [{success:false},{success:true,hostname:'wrong.example',action:'inquiry'},{success:true,hostname:'etera.trakiyski.work',action:'login'}]){globalThis.fetch=async()=>Response.json(verified);const response=await deliverInquiry(request(),config);assert.equal(response.status,400);assert.equal(((await response.json()) as { code: string }).code,'verification');}
  globalThis.fetch=async(input)=>String(input).includes('siteverify')?Response.json({success:true,hostname:'etera.trakiyski.work',action:'inquiry'}):Response.json({message:'rejected'},{status:422});assert.equal((await deliverInquiry(request(),config)).status,502);
  globalThis.fetch=async()=>{throw Error('network unavailable')};assert.equal((await deliverInquiry(request(),config)).status,503);
 }finally{globalThis.fetch=original;}
});
