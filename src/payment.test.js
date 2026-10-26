import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseQR,validAmount,cards} from './payment.js';
test('QR JSON and URL retain payload without following links',()=>{assert.equal(parseQR('{"recipient":"Кофейня","amount":125}').amount,'125');assert.equal(parseQR('https://example.org/?name=Shop&amount=25').recipient,'Shop');assert.equal(parseQR('arbitrary text').raw,'arbitrary text');assert.equal(parseQR('{"amount":-5}').amount,'');assert.throws(()=>parseQR(''));});
test('amount rejects overspend, zero and excessive precision',()=>{for(const v of ['0','-1','999999','1.234','NaN','1e2'])assert.equal(validAmount(v,cards[0]),false);assert.equal(validAmount('125,50',cards[0]),true);assert.equal(validAmount('1',cards[3]),false);});
