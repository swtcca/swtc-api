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
    console.log(result)
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
   '06825F37BE02488CF368F6E860F4E261C6C88115A26B087F233783A2B670AF8D',
  ledger_index: 12595314 }
{ success: true,
  status_code: '0',
  accepted: true,
  account_hash:
   'A214F62BFCA29DC6BC1E28FFB877A9B0DE0D169359C25462197A0646AA26D8A1',
  close_time: 609112930,
  close_time_human: '2019-Apr-20 22:02:10',
  close_time_resolution: 10,
  closed: true,
  hash:
   '06825F37BE02488CF368F6E860F4E261C6C88115A26B087F233783A2B670AF8D',
  ledger_hash:
   '06825F37BE02488CF368F6E860F4E261C6C88115A26B087F233783A2B670AF8D',
  ledger_index: '12595314',
  parent_hash:
   '0D6DB50110030647C35B0B4D47A701EB89D850D7FDA201E52BAF8E52F01CD34A',
  seqNum: '12595314',
  totalCoins: '599999999999460713',
  total_coins: '599999999999460713',
  transaction_hash:
   '58FF9C89302A85356F5CCFDCA7799186E6FDF4A3916FAA01377430E0E6162F4D',
  transactions:
   [ '0103CB4D0891CEAA6F94CAF1FF66618C4A45989A9FB765C83A117F7B4A33FDF3',
     '07B71706738EE52088311A10D3CD2A3EC99ED435DE0B81E52F375AD817D7CC15',
     '0DF195A2892E6B3720087FB1CFF315BDD5BBADDC8335493A44AE8806ACFF0EB9',
     '20CAFCF0E2F541DFCA2886DB134C5A2A9F4C9DD77F4F22A0A3ADF3F1AA92788F',
     '23BBA4EE31BCAAB2001E8CDCA2AA3E36F8DE84FA31ACD0C3EA1EB6CD5F7FE1AE',
     '2EE7B8E797B6660D2D059F9393A68A2890C4FA7BDD8109FD4FD379F25ADE60CF',
     '36977E78078EF86D405B80F6975FD37DD125092CF635FA0ADF4F410F32A6BFEF',
     '38167BA675583E98C88181005A0EE0E9B096EDBB990FCCDDB54E8E2DC03214A2',
     '41A26C402329B77788689648B02CB47F34B5BF3EFAEC5BE5B01D0867FF3FE5CC',
     '5655DE23EF72F74588E649B2874FC8AB471CE03A6A24E96727450C0D4936E7AF',
     '5AA1F222DCC284D6D4A11EDDB1A9F07D49C82073D179C0A7B4E7A2A3129D4428',
     '6B9F8638C5C64A0FEEA40392728373D757DEC26571ECF6FA14B46C6C666611E4',
     '735993BFA858FE02EC8977E79E4AF2A3D863BF6C04CC838C37D932E84048E5DB',
     '7B35B85FA0733A5FE9729A4F635BB9F97AD0EDB67378FA079390CEAB2460F127',
     '7C5DBEB4881A309B41A0DAE436B47B9AC111C94D573A57D5FE161EAF1C0DA284',
     '93BA0931A5E9CFB91140158E52CE827A6DF482F90BF6298129F0AAAA1C877C23',
     '9E4669465C9A2B791B964250A8B96BCA4A4EDE30AFF7810AF5401D29D59D2990',
     'A1229411FF70A6F042D640EBF11ACFCBD500AB2C6CCC372B3FF7811DB974655D',
     'B4E33BF77EFD8C797250A6BA21F764255DD3B08B0830F37D9176468BDB6BE22E',
     'BFEA5F331316B09291386D341D8C66CAE875D267173D76B5E53B4E99EDA1DEF1',
     'CA8C7E8400F63EA0A0856A8010B33D5778640266DE995764F9CCB58FA97F52E6',
     'CC2CB463791A4F1D9C8C1726C4E3339F079D60CD9320BE2EDCB22F3AEBC036E9',
     'CCDDA503163AF0CD082B1734B0BE3564CC13658BDDB584823BB950BBFACF5491',
     'D4178F179EAF25478BC1C2AAA25A247F0C3BCAC561A4F2737E522D27AD6FAD20',
     'D6C8D73DC76C8C00B2E20FFE822D176069C1CEC61960126C67695BCE04BABE24',
     'E23217D1AAD79BB29722803EFD1C42E266091C42579AD58F82D100DE321937C2',
     'E43979BD2FC6A5BF8899CC286E02A5BDF07B104FC23C551F97010FF1300F352E',
     'EA9258A0CC8E8C944C083F5D1E139E7547BC8D606AF8294A8DB46D3B2381F1C0' ] }
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
