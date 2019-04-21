# The SWTC API JavaScript Library

## [Offical Doc 官方](http://developer.jingtum.com/api2_doc.html)

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
import DATA from "./config"
import { Remote } from "swtc-api"
const remote = new Remote()

async function main() {
  try {
    console.log(`// query balances and demo param`)
    let result: any = await remote.getAccountBalances(DATA.address)
    result.balances.forEach((balance) =>
      console.log(`${balance.value.padEnd(16)}${balance.currency}`)
    )
    result = await remote.getAccountBalances(DATA.address, { currency: "CNY" })
    console.log(result)

    console.log(`\n// query transactions and demo paging`)
    for (let page = 1; page < 4; page++) {
      console.log(`page # ${page}`)
      result = await remote.getAccountTransactions(DATA.address, {
        results_per_page: 2,
        page
      })
      if ("marker" in result) {
        console.log(result.marker)
      }
      result.transactions.forEach((tx) => console.log(tx.hash))
    }
    console.log(result)
    console.log(`\n// query payments history`)
    result = await remote.getAccountPayments(DATA.address, {
      results_per_page: 4
    })
    console.log(result)
    console.log(`\n// query active orders`)
    result = await remote.getAccountOrders(DATA.address, {
      results_per_page: 10
    })
    console.log(result)
    console.log(`\n// query ledger`)
    result = await remote.getLedger()
    const ledger_index = result.ledger_index
    const ledger_hash = result.ledger_hash
    console.log(result)
    result = await remote.getLedger(ledger_index)
    result = await remote.getLedger(parseInt(ledger_index))
    result = await remote.getLedger(ledger_hash)
    console.log(result)
    console.log(`\n// query orderbook`)
    result = await remote.getOrderBooks("SWT", `CNY+${DATA.issuer}`, {
      results_per_page: 4
    })
    result = await remote.getOrderBooksBids("SWT", `CNY+${DATA.issuer}`, {
      results_per_page: 4
    })
    result = await remote.getOrderBooksAsks("SWT", `CNY+${DATA.issuer}`, {
      results_per_page: 2
    })
    console.log(result)
    console.log(`\n// submit locally signed transactions`)
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
> ts-node src/index.ts

// query balances and demo param
85.008279       SWT
0.99335         CNY
0               VCC
0               SPC
10              800000000000000000000000416FE9044CDAA1A2
0               JJCC
0               JEKT
0               JCALL
300             HJT
1088            JSLASH
{ success: true,
  status_code: '0',
  balances:
   [ { value: '0.99335',
       currency: 'CNY',
       issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       freezed: '0.000000' } ],
  sequence: 563 }

// query transactions and demo paging
page # 1
{ ledger: 12592887, seq: 0 }
48D94F52CD0D9FD60634DEB5886D27149551235BD6CDA1C752F817C3290C327B
AF71AEB70B889895A331A8560922124A19AC7FFA74DDC39D895562C83C317EC9
page # 2
{ ledger: 12592850, seq: 2 }
05485B5C21E011A12B1968AB6E49655FD5C0613AF0874E42550522B8EF270D38
EFC0DC091780807A782951789EAF510B655590CF967CEC9951F269520D39148E
page # 3
{ ledger: 12589804, seq: 0 }
13C0A18AF8C99B0A6AE4D257A79A3A6C99611970F71487EC5582EB0A9B332E3F
DA3604968AC2C245673B95ED58650CA0A17603BE27E141FE193414C0E4BBFCB7
{ success: true,
  status_code: '0',
  marker: { ledger: 12589804, seq: 0 },
  transactions:
   [ { date: 1555773090,
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
       effects: [] } ] }

// query payments history
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

// query active orders
{ success: true,
  status_code: '0',
  orders:
   [ { type: 'sell',
       pair: 'SWT/CNY:jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
       amount: '1.000000',
       price: '0.007',
       sequence: 554 } ] }

// query ledger
{ success: true,
  status_code: '0',
  ledger_hash:
   '7DDDFDE9187F1B1A768AF74255BC53F07959FA83063956888BC1AC9B9D8A1B70',
  ledger_index: 12601698 }
{ success: true,
  status_code: '0',
  accepted: true,
  account_hash:
   'EAF09CF17268F4E1DB2B68001AD30C96D6C3E8F394F85051143765DBE9328DC4',
  close_time: 609176770,
  close_time_human: '2019-Apr-21 15:46:10',
  close_time_resolution: 10,
  closed: true,
  hash:
   '7DDDFDE9187F1B1A768AF74255BC53F07959FA83063956888BC1AC9B9D8A1B70',
  ledger_hash:
   '7DDDFDE9187F1B1A768AF74255BC53F07959FA83063956888BC1AC9B9D8A1B70',
  ledger_index: '12601698',
  parent_hash:
   '363E579CBF4C53D115B58E5A92C97A32721CEFC575D5C78AB7388D2D4E2AB845',
  seqNum: '12601698',
  totalCoins: '599999999999460713',
  total_coins: '599999999999460713',
  transaction_hash:
   'ECCEDBED75DD4D54EE0238804703BFD8B34DB54AC2CF58565115E36E4347C5FD',
  transactions:
   [ '0D321A5B8F8F75B3C46C0409B979066C80FB1C2F4A3F5F511CA261390F33BDED',
     '4CD6DF2A8E97CAC4E2384DF17B4CAD12B0DE195E13358EB67496C5120C328DBA',
     '52A50DC99C2F7ACAA0351F2192C1DECFDF8DE194979BA340EBE90EE1619BA7CB',
     'A3903012C40ABF58152FA1DFB0797D0BDCE004DEA975A91FB817939A9A5667E0',
     'BE04AE60AEC1DAC2882B621F5C0A80BD6540DB8051E28A5A82039152591AF2B7',
     'FBE76B100D39AF7659DE3DD9D629207EC3548FC128CD8BF64FE81C749910BBB5' ] }

// query orderbook
{ success: true,
  status_code: '0',
  pair: 'SWT/CNY+jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
  asks:
   [ { price: 0.00657,
       order_maker: 'j9irCqYkPgsQhNSeBpuyjsQTsqSdkVn1Az',
       sequence: 33394,
       passive: false,
       sell: true,
       funded: 1000000 },
     { price: 0.00659,
       order_maker: 'jKqy9WDQ4zEDwYe3P6W7BkbUsCqrhnkibw',
       sequence: 32319,
       passive: false,
       sell: true,
       funded: 200000 } ] }

// submit locally signed transactions
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
