export const cards = [
 {id:'8134',name:'Основная',balance:25576.72,currency:'с',color:'gold'},
 {id:'8921',name:'Visa Virtual',balance:22.32,currency:'$',color:'purple'},
 {id:'1365',name:'Visa Virtual',balance:167.40,currency:'с',color:'purple'},
 {id:'9017',name:'Элкарт',balance:0,currency:'с',color:'teal'},
 {id:'4278',name:'Visa Virtual',balance:1250,currency:'с',color:'purple'}
];
export const money = n => Number(n).toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2});
export function parseQR(raw){
 if(typeof raw!=='string'||!raw.trim()||raw.length>8192) throw new Error('QR-код пуст или слишком большой');
 let data={};
 try { const v=JSON.parse(raw); if(v&&typeof v==='object') data=v; } catch {try {const u=new URL(raw);data=Object.fromEntries(u.searchParams);}catch{}}
 const amount=Number(data.amount);
 return {raw,recipient:String(data.recipient||data.name||data.merchant||'Получатель по QR').slice(0,120),amount:Number.isFinite(amount)&&amount>0?String(amount):'',reference:String(data.account||data.reference||raw).slice(0,200)};
}
export function validAmount(value,card){const n=Number(String(value).replace(',','.'));return Number.isFinite(n)&&n>0&&n<=card.balance&&/^\d+(?:[.,]\d{1,2})?$/.test(String(value));}
