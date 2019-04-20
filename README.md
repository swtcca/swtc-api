# The SWTC API JavaScript Library

## [Offical Doc](http://developer.jingtum.com/api2_doc.html)

## Compare with swtc-lib

1. use rest **api** instead of web socket
2. masked unsafe operations (never send out **secret**)
3. work together with **swtc-transaction** for **local sign**
4. promise based **axios** operation
5. **typescript** friend

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
    let result: any = await remote.getAccountBalances(DATA.address, {
      currency: "CNY"
    })
    console.log(result)
    result = await remote.getAccountPayments(DATA.address, {
      results_per_page: 4
    })
    console.log(result)
    result = await remote.getAccountOrders(DATA.address, {
      results_per_page: 10
    })
    console.log(result)
    result = await remote.getAccountTransactions(DATA.address, {
      results_per_page: 4
    })
    console.log(result)
    result = await remote.getLedger()
    const ledger_index = result.ledger_index
    const ledger_hash = result.ledger_hash
    console.log(result)
    result = await remote.getLedger(ledger_index)
    result = await remote.getLedger(parseInt(ledger_index))
    result = await remote.getLedger(ledger_hash)
    result = await remote.getOrderBooks("SWT", `CNY+${DATA.issuer}`, {
      results_per_page: 4
    })
    result = await remote.getOrderBooksBids("SWT", `CNY+${DATA.issuer}`, {
      results_per_page: 4
    })
    result = await remote.getOrderBooksAsks("SWT", `CNY+${DATA.issuer}`, {
      results_per_page: 4
    })
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
   [ { value: '0.99335',
       currency: 'CNY',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' } ],
  sequence: 563 }
{ success: true,
  status_code: '0',
  marker: { ledger: 12592850, seq: 2 },
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
  marker: { ledger: 12592850, seq: 2 },
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
       effects: [] } ] }
{ success: true,
  status_code: '0',
  ledger_hash:
   'FC5C73CD21CC8BC39E261076675A1C52EE44F42FAAE1783F4BC2ACB1AE7E1812',
  ledger_index: 12595267 }
{ success: true,
  status_code: '0',
  pair: 'SWT/CNY+jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
  asks:
   [ { price: 0.00658,
       order_maker: 'jMZQiH1s9fnmuMu79q5w5oD7GqzMJobA8o',
       sequence: 4789,
       passive: false,
       sell: true,
       funded: 199684 },
     { price: 0.00658,
       order_maker: 'jUFJKyFS8xW3sWD5dbp8WKy1N3B6PeQ9VB',
       sequence: 130,
       passive: false,
       sell: true,
       funded: 257984 },
     { price: 0.00659,
       order_maker: 'jn88gyE9wRrsXTszA8KhfmiwZgU22yZENN',
       sequence: 6181,
       passive: false,
       sell: true,
       funded: 726897.52 },
     { price: 0.00659,
       order_maker: 'jnXnJzg6dDEUogbTP52hkgxgeeUGdVHa2i',
       sequence: 152,
       passive: false,
       sell: true,
       funded: 152208 } ] }
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
