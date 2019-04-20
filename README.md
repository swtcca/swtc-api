# The SWTC API JavaScript Library

## [Offical Doc](http://developer.jingtum.com/api2_doc.html)

## Compare with swtc-lib

1. use rest **api** instead of web socket
2. masked unsafe operations (never send out **secret**)
3. work together with **swtc-transaction** for **local sign**
4. promise based **axios** operation
5. **typescript** friend

- additional parameters like marker not tested yet

## usages

### import

```javascript
const API = require("swtc-api")
const Remote = API.Remote
// or
import { Remote } from "swtc-api"
```

### code

```typescript
async function main() {
  try {
    let result: any = await remote.getAccountBalances(DATA.address)
    console.log(result)
    result = await remote.getAccountPayments(DATA.address)
    console.log(result)
    result = await remote.getAccountOrders(DATA.address)
    console.log(result)
    result = await remote.getAccountTransactions(DATA.address)
    console.log(result)
    result = await remote.getLedger()
    const ledger_index = result.ledger_index
    const ledger_hash = result.ledger_hash
    console.log(result)
    result = await remote.getLedger(ledger_index)
    result = await remote.getLedger(parseInt(ledger_index))
    result = await remote.getLedger(ledger_hash)
    result = await remote.getOrderBooks("SWT", `CNY+${DATA.issuer}`)
    result = await remote.getOrderBooksBids("SWT", `CNY+${DATA.issuer}`)
    result = await remote.getOrderBooksAsks("SWT", `CNY+${DATA.issuer}`)
    console.log(result)
    result = await remote.postBlob({
      blob:
        "120000220000000024000002326140000000000186A0684000000000002710732102197F1426BCA2F59B6B910F0391E55888B4FE80AF962478493104A33274B1B03A74473045022100F0175B4AFF5B1E348FC46A8C0021FF22B16CF87113C0B6E042174374416B071102203CB8A47A82576B69DB50051DF943C87872BB8F065A2D12B01ACA03890FAC8E548114AF09183A11AA70DA06E115E03B0E5478232740B58314DA976A4DE4827163F062B09050832D8D78025D5A"
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
main()
```

### output

```javascript
> main()
{ success: true,
  status_code: '0',
  balances:
   [ { value: '85.008279', currency: 'SWT', issuer: '', freezed: '79' },
     { value: '0.99335',
       currency: 'CNY',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' },
     { value: '0',
       currency: 'VCC',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '1.000000' },
     { value: '0',
       currency: 'SPC',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '1.000000' },
     { value: '10',
       currency: '800000000000000000000000416FE9044CDAA1A2',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' },
     { value: '0',
       currency: 'JJCC',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' },
     { value: '0',
       currency: 'JEKT',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' },
     { value: '0',
       currency: 'JCALL',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' },
     { value: '300',
       currency: 'HJT',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' },
     { value: '1088',
       currency: 'JSLASH',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' } ],
  sequence: 563 }
{ success: true,
  status_code: '0',
  marker: { ledger: 12578882, seq: 3 },
  payments:
   [ { date: 1555784710,
       hash:
        '48D94F52CD0D9FD60634DEB5886D27149551235BD6CDA1C752F817C3290C327B',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555773700,
       hash:
        'AF71AEB70B889895A331A8560922124A19AC7FFA74DDC39D895562C83C317EC9',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555773460,
       hash:
        '05485B5C21E011A12B1968AB6E49655FD5C0613AF0874E42550522B8EF270D38',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555773180,
       hash:
        'EFC0DC091780807A782951789EAF510B655590CF967CEC9951F269520D39148E',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555773090,
       hash:
        '13C0A18AF8C99B0A6AE4D257A79A3A6C99611970F71487EC5582EB0A9B332E3F',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555772660,
       hash:
        'DA3604968AC2C245673B95ED58650CA0A17603BE27E141FE193414C0E4BBFCB7',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555710400,
       hash:
        'D1400CDB7AD093985B84B84FEE4FD4D41C5CB2E3B82ED33FB806AAA31A5E40AC',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [Array],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] } ] }
{ success: true,
  status_code: '0',
  orders:
   [ { type: 'sell',
       pair: 'SWT/CNY:jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       amount: '1.000000',
       price: '0.007',
       sequence: 554 } ] }
{ success: true,
  status_code: '0',
  marker: { ledger: 12578882, seq: 3 },
  transactions:
   [ { date: 1555784710,
       hash:
        '48D94F52CD0D9FD60634DEB5886D27149551235BD6CDA1C752F817C3290C327B',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555773700,
       hash:
        'AF71AEB70B889895A331A8560922124A19AC7FFA74DDC39D895562C83C317EC9',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555773460,
       hash:
        '05485B5C21E011A12B1968AB6E49655FD5C0613AF0874E42550522B8EF270D38',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555773180,
       hash:
        'EFC0DC091780807A782951789EAF510B655590CF967CEC9951F269520D39148E',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555773090,
       hash:
        '13C0A18AF8C99B0A6AE4D257A79A3A6C99611970F71487EC5582EB0A9B332E3F',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555772660,
       hash:
        'DA3604968AC2C245673B95ED58650CA0A17603BE27E141FE193414C0E4BBFCB7',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] },
     { date: 1555742630,
       hash:
        'E7C54515890BCF90C439E948622B7830AAF01D1BF67F555FA00DE0A17CFCA9F4',
       type: 'offercancel',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       offerseq: 556,
       effects: [Array] },
     { date: 1555742310,
       hash:
        '227A80998704955AE23DC062EA98C0A586292359605E72983275A5605F2CE627',
       type: 'offernew',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       offertype: 'sell',
       seq: 555,
       effects: [Array],
       pair: 'SWT/CNY:jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       amount: '1',
       price: '0.01' },
     { date: 1555710400,
       hash:
        'F430476E86EE4E325EB5C604A9E295D3E34D0D012E0B20A9715535906FBC8DE1',
       type: 'offernew',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       offertype: 'sell',
       seq: 554,
       effects: [Array],
       pair: 'SWT/CNY:jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       amount: '1',
       price: '0.007' },
     { date: 1555710400,
       hash:
        'D1400CDB7AD093985B84B84FEE4FD4D41C5CB2E3B82ED33FB806AAA31A5E40AC',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [Array],
       counterparty: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
       amount: [Object],
       effects: [] } ] }
{ success: true,
  status_code: '0',
  ledger_hash:
   '19C33520D7B747D4ADD8CF93284DAD8D93B41A33DC773D499D3E413AEFDAAAD5',
  ledger_index: 12594839 }
{ success: true,
  status_code: '0',
  pair: 'SWT/CNY+jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
  asks:
   [ { price: 0.00659,
       order_maker: 'jn88gyE9wRrsXTszA8KhfmiwZgU22yZENN',
       sequence: 6181,
       passive: false,
       sell: true,
       funded: 961503.22 },
     { price: 0.0066,
       order_maker: 'j3Jwpaj1XXvgK1oVowWuFEawUcCfesCx8N',
       sequence: 1980,
       passive: false,
       sell: true,
       funded: 1762250.690001 },
     { price: 0.00661,
       order_maker: 'j34XSCAMEXqGa1wN3k6ubPXfgp9MWmgnjR',
       sequence: 9009,
       passive: false,
       sell: true,
       funded: 202193 },
     { price: 0.00661,
       order_maker: 'jwD5SNcnGbrmWcoLoonfgNVFPuuFn9iRbo',
       sequence: 46834,
       passive: false,
       sell: true,
       funded: 3758000 },
     { price: 0.00662,
       order_maker: 'jE6rzt1ykhwZeQAEHPtjenKvrrWtZDXzc4',
       sequence: 3640,
       passive: false,
       sell: true,
       funded: 998190.56 },
     { price: 0.00662,
       order_maker: 'js4ckWFYPTXs5LxwC9vGumvDamemc1xezE',
       sequence: 462,
       passive: false,
       sell: true,
       funded: 279861 },
     { price: 0.00663,
       order_maker: 'jMYbCHqzXLpRoJjaiVNExe6yX63mCodmR4',
       sequence: 20975,
       passive: false,
       sell: true,
       funded: 716187.37 },
     { price: 0.00663,
       order_maker: 'jGrGArKXqcAhSdfmphwEpWhpRFsS4UGEd8',
       sequence: 1164,
       passive: false,
       sell: true,
       funded: 1241757 },
     { price: 0.00664,
       order_maker: 'jGH263GYdDsuP18zKU2Wuj3yy9gGZzdGQW',
       sequence: 715,
       passive: false,
       sell: true,
       funded: 1349789.47 },
     { price: 0.00664,
       order_maker: 'jPizZJYDqneS3NVKUhftS79p3YbqhC87UQ',
       sequence: 2,
       passive: false,
       sell: true,
       funded: 400 } ] }
{ success: true,
  status_code: '0',
  engine_result: 'tefPAST_SEQ',
  engine_result_code: -190,
  engine_result_message: 'This sequence number has already past.',
  tx_blob:
   '120000220000000024000002326140000000000186A0684000000000002710732102197F1426BCA2F59B6B910F0391E55888B4FE80AF962478493104A33274B1B03A74473045022100F0175B4AFF5B1E348FC46A8C0021FF22B16CF87113C0B6E042174374416B071102203CB8A47A82576B69DB50051DF943C87872BB8F065A2D12B01ACA03890FAC8E548114AF09183A11AA70DA06E115E03B0E5478232740B58314DA976A4DE4827163F062B09050832D8D78025D5A',
  tx_json:
   { Account: 'jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG',
     Amount: '100000',
     Destination: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW',
     Fee: '10000',
     Flags: 0,
     Sequence: 562,
     SigningPubKey:
      '02197F1426BCA2F59B6B910F0391E55888B4FE80AF962478493104A33274B1B03A',
     TransactionType: 'Payment',
     TxnSignature:
      '3045022100F0175B4AFF5B1E348FC46A8C0021FF22B16CF87113C0B6E042174374416B071102203CB8A47A82576B69DB50051DF943C87872BB8F065A2D12B01ACA03890FAC8E54',
     hash:
      '48D94F52CD0D9FD60634DEB5886D27149551235BD6CDA1C752F817C3290C327B' } }
```
