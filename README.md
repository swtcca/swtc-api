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

### transaction operations

```typescript
import DATA from "./config"
import { Remote } from "swtc-api"
const remote = new Remote({ server: DATA.server })
const sleep = (time) => new Promise((res) => setTimeout(() => res(), time))

async function main() {
  let tx: any, result: any, sequence: number
  try {
    console.log(
      `// secure transactions working with swtc-api and swtc-transaction`
    )
    result = await remote.getAccountBalances(DATA.address, { currency: "SWT" })
    sequence = result.sequence
    console.log(result.balances)
    console.log(`// demo payment transactions`)
    tx = remote.buildPaymentTx({
      source: DATA.address,
      to: DATA.address2,
      amount: { value: 0.1, currency: "SWT", issuer: "" }
    })
    tx.setSequence(sequence)
    tx.setSecret(DATA.secret)
    tx.sign((error, blob) => {
      if (error) {
        throw error
      } else {
        console.log(`signed blob: ${blob}`)
        remote
          .postBlob({ blob })
          .then(console.log)
          .catch(console.log)
      }
    })
    await sleep(20000)
    result = await remote.getAccountBalances(DATA.address, { currency: "SWT" })
    console.log(result.balances)
    console.log(`\n// demo offer create transactions`)
    console.log(await remote.getAccountOrders(DATA.address))
    tx = remote.buildOfferCreateTx({
      type: "Sell",
      account: DATA.address,
      taker_gets: { value: 1, currency: "SWT", issuer: "" },
      taker_pays: { value: 0.6, currency: "CNY", issuer: DATA.issuer }
    })
    tx.setSecret(DATA.secret)
    tx.sign((error, blob) => {
      if (error) {
        throw error
      } else {
        console.log(`signed blob: ${blob}`)
        tx.submitApi()
          .then(console.log)
          .catch(console.log)
      }
    })
    await sleep(20000)
    result = await remote.getAccountOrders(DATA.address)
    let order: any = result.orders.sort((x, y) => y.sequence - x.sequence)[0]
    console.log(order)
    console.log(result.orders)
    console.log(`\n// demo offer cancel transactions`)
    tx = remote.buildOfferCancelTx({
      account: DATA.address,
      sequence: order.sequence
    })
    tx.setSecret(DATA.secret)
    tx.sign((error, blob) => {
      if (error) {
        throw error
      } else {
        console.log(`signed blob: ${blob}`)
        tx.submitApi()
          .then(console.log)
          .catch(console.log)
      }
    })
    await sleep(20000)
    result = await remote.getAccountOrders(DATA.address)
    console.log(result.orders)
    console.log(`\n// demo relation transactions`)
    console.log(
      await remote.getAccountBalances(DATA.address, { currency: "CNY" })
    )
    tx = remote.buildRelationTx({
      type: "freeze", // or authorize
      target: DATA.address2,
      account: DATA.address,
      limit: {
        value: Math.floor(Math.random() * 10),
        currency: "CNY",
        issuer: DATA.issuer
      }
    })
    // tx.setSequence(sequence)
    tx.setSecret(DATA.secret)
    tx.sign((error, blob) => {
      if (error) {
        throw error
      } else {
        console.log(`signed blob: ${blob}`)
        // remote.postBlob({blob}).then(console.log).catch(console.log)
        // tx.submitApi().then(console.log).catch(console.log)
      }
    })
    await sleep(20000)
    console.log(
      await remote.getAccountBalances(DATA.address, { currency: "CNY" })
    )
  } catch (error) {
    console.log(error)
  }
}
main()
```

- output

```javascript
> ts-node src/index.ts

// secure transactions working with swtc-api and swtc-transaction
[ { value: '11040.16', currency: 'SWT', issuer: '', freezed: '15' } ]
// demo payment transactions
{ success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120000220000000024000000556140000000000186A06840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100A683042FFA7C9436DC523491709AEB64B1A28A721FA50A1F9E5BDA2626A5E3230220152ECB711B40DDD7164F87B1BDF5EE7955B31C9F223F11E6DE67300DFC5EB90B81141359AA928F4D98FDB3D93E8B690C80D37DED11C38314054FADDC8595E2950FA43F673F65C2009F58C7F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Amount: '100000',
     Destination: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
     Fee: '10000',
     Flags: 0,
     Sequence: 85,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'Payment',
     TxnSignature:
      '3045022100A683042FFA7C9436DC523491709AEB64B1A28A721FA50A1F9E5BDA2626A5E3230220152ECB711B40DDD7164F87B1BDF5EE7955B31C9F223F11E6DE67300DFC5EB90B',
     hash:
      '39339DD2A1C8C02632011D07F9D5F45C94EB4BF6545E0E5DE9D38F258221049A' } }
[ { value: '11040.05', currency: 'SWT', issuer: '', freezed: '15' } ]

// demo offer create transactions
{ success: true, status_code: '0', marker: '', orders: [] }
signed blob: 1200072200080000240000005664D45550F7DCA70000000000000000000000000000434E5900000000007478E561645059399B334448F7544F2EF308ED326540000000000F42406840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E157446304402204642E5E2A158A1C76075EF600B7C31EC0A3F0D4A7C88D881266C17CA76EEC80102203BD1FA5731F6B76D4CAA6F899DABB1993C84E6835B36F1FDADC0CC8B2205355081141359AA928F4D98FDB3D93E8B690C80D37DED11C3
{ success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '1200072200080000240000005664D45550F7DCA70000000000000000000000000000434E5900000000007478E561645059399B334448F7544F2EF308ED326540000000000F42406840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E157446304402204642E5E2A158A1C76075EF600B7C31EC0A3F0D4A7C88D881266C17CA76EEC80102203BD1FA5731F6B76D4CAA6F899DABB1993C84E6835B36F1FDADC0CC8B2205355081141359AA928F4D98FDB3D93E8B690C80D37DED11C3',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 524288,
     Sequence: 86,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TakerGets: '1000000',
     TakerPays:
      { currency: 'CNY',
        issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
        value: '0.6' },
     TransactionType: 'OfferCreate',
     TxnSignature:
      '304402204642E5E2A158A1C76075EF600B7C31EC0A3F0D4A7C88D881266C17CA76EEC80102203BD1FA5731F6B76D4CAA6F899DABB1993C84E6835B36F1FDADC0CC8B22053550',
     hash:
      '1DFBD2E1B14451CF3EBE529B32E0164E236B4204BBFF1A89C68C2D62737DF48E' } }
{ type: 'sell',
  pair: 'SWT/CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
  amount: '1.000000',
  price: '0.6',
  sequence: 86 }
[ { type: 'sell',
    pair: 'SWT/CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
    amount: '1.000000',
    price: '0.6',
    sequence: 86 } ]

// demo offer cancel transactions
{ success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120008220000000024000000572019000000566840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100AE59ADD8B61777A7CFE60FDFBF903E5C2FA93E4711ACF2F99AACCAD10E3B8C9B022014369C4E8776539E73FE55567A22BBABBA776FC6DD028B07252B57E41585A56081141359AA928F4D98FDB3D93E8B690C80D37DED11C3',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 0,
     OfferSequence: 86,
     Sequence: 87,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'OfferCancel',
     TxnSignature:
      '3045022100AE59ADD8B61777A7CFE60FDFBF903E5C2FA93E4711ACF2F99AACCAD10E3B8C9B022014369C4E8776539E73FE55567A22BBABBA776FC6DD028B07252B57E41585A560',
     hash:
      '92AA97F76175F84CFA34C43DB191D918E167198F36786618F42B7C0A99B4D175' } }
[]

// demo relation transactions
{ success: true,
  status_code: '0',
  balances:
   [ { value: '99.973',
       currency: 'CNY',
       issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       freezed: '13.000000' } ],
  sequence: 87 }
signed blob: 1200152200000000240000005B20230000000363D49FF973CAFA8000000000000000000000000000434E5900000000007478E561645059399B334448F7544F2EF308ED326840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100D4F6D9F6488817CAB76B00A62A80990E8611A77DBE180A2C2196F52E80DDC4CE02200CE7ACC0930EFDD6C88E18E5D28F798327B477F8C338AAB6173894685661279881141359AA928F4D98FDB3D93E8B690C80D37DED11C38714054FADDC8595E2950FA43F673F65C2009F58C7F1
{ success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '1200152200000000240000005B20230000000363D49FF973CAFA8000000000000000000000000000434E5900000000007478E561645059399B334448F7544F2EF308ED326840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100D4F6D9F6488817CAB76B00A62A80990E8611A77DBE180A2C2196F52E80DDC4CE02200CE7ACC0930EFDD6C88E18E5D28F798327B477F8C338AAB6173894685661279881141359AA928F4D98FDB3D93E8B690C80D37DED11C38714054FADDC8595E2950FA43F673F65C2009F58C7F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 0,
     LimitAmount:
      { currency: 'CNY',
        issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
        value: '9' },
     RelationType: 3,
     Sequence: 91,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     Target: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
     TransactionType: 'RelationSet',
     TxnSignature:
      '3045022100D4F6D9F6488817CAB76B00A62A80990E8611A77DBE180A2C2196F52E80DDC4CE02200CE7ACC0930EFDD6C88E18E5D28F798327B477F8C338AAB61738946856612798',
     hash:
      'A32E97613AF5F54E84DC7BD457AE7FF37F8F1FC7B642B5457D3DE8B3665F9B66' } }
{ success: true,
  status_code: '0',
  balances:
   [ { value: '99.973',
       currency: 'CNY',
       issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       freezed: '9.000000' } ],
  sequence: 88 }
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
