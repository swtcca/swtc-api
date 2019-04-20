const expect = require("chai").expect
//import Remote from '../src/index'
const Remote = require("../").Remote
const DATA = require("./config")
const remote = new Remote({ server: DATA.server })

let txid = 'should be updated during transactions query'
let ledger_index = 100
let ledger_hash = 'should be updated during ledger query'

describe("Remote", function() {
  describe("constructor", function() {
    it("instantiate a Remote successfully", function() {
      let remote = new Remote({})
      expect(remote._token).to.be.equal("SWT")
    })
  })
  describe("local sign", function() {
    this.timeout(10000)
    it("post invalid blob", async function() {
      try {
        await remote.postBlob({blob: '0123456789'})
        expect(10).to.equal(100)
      } catch (error) {
        expect(error).to.equal("Transaction length invalid")
      }
    })
    xit("post correct blob", async function() {
      try {
        let response = await remote.postBlob({blob: ''})
      } catch (error) {
        expect(error).to.equal("Missing parameters")
      }
    })
  })
  describe("getLedger", function() {
    this.timeout(10000)
    it("get latest ledger without parameter", async function() {
      let response = await remote.getLedger()
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("ledger_hash")
      expect(response.data).to.have.property("ledger_index")
      ledger_hash = response.data.ledger_hash
      ledger_index = response.data.ledger_index
    })
    it("get ledger with hash", async function() {
      let response = await remote.getLedger(ledger_hash)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("ledger_hash")
      expect(response.data.ledger_hash).to.equal(ledger_hash)
    })
    it("get ledger with index", async function() {
      let response = await remote.getLedger(ledger_index)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("ledger_index")
      expect(parseInt(response.data.ledger_index)).to.equal(ledger_index)
    })
  })
  describe("accountBalances", function() {
    this.timeout(10000)
    it("get account balances with incorrect address", async function() {
      try {
        await remote.getAccountBalances(DATA.address.slice(1))
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("get account balances with correct address", async function() {
      let response = await remote.getAccountBalances(DATA.address)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("balances")
      expect(response.data.balances[0]).to.be.an("object")
    })
  })
  describe("accountPayments", function() {
    this.timeout(10000)
    it("get account payments with incorrect address", async function() {
      try {
        await remote.getAccountPayments(DATA.address.slice(1))
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("get account payments with correct address", async function() {
      let response = await remote.getAccountPayments(DATA.address)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("payments")
      expect(response.data.payments[0]).to.be.an("object")
    })
    it("post account payments with correct address but no secret", async function() {
      try {
        let response = await remote.postAccountPayments(DATA.address, {})
      } catch (error) {
        expect(error).to.equal("Missing parameter secret.")
      }
    })
    xit("post account payments with correct address and secret", async function() {
      try {
        let params = {
          secret: DATA.secret,
          client_id: `api${new Date().getTime()}`,
          payment: {
            source: DATA.address,
            destination: DATA.address2,
            amount: {
              value: "1",
              currency: "SWT",
              issuer: ""
            },
            memos: ["hello world", "hello payment"]
          }
        }
        let response = await remote.postAccountPayments(
          DATA.address,
          params,
          "POST"
        )
        expect(response).to.have.property("data")
        expect(response.data).to.have.property("success")
        expect(response.data.success).to.be.true
        expect(response.data).to.have.property("result")
        expect(response.data.result).to.equal("tesSUCCESS")
      } catch (error) {
        console.log(error)
        expect(error).to.equal("should not throw")
      }
    })
  })
  describe("accountOrders", function() {
    this.timeout(10000)
    it("get account orders with incorrect address", async function() {
      try {
        await remote.getAccountOrders(DATA.address.slice(1))
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("get account orders with correct address", async function() {
      let response = await remote.getAccountOrders(DATA.address)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("orders")
      expect(response.data.orders[0]).to.be.an("object")
    })
    it("post account orders with correct address but no secret", async function() {
      try {
        await remote.postAccountOrders(DATA.address, {})
      } catch (error) {
        expect(error).to.equal("Invalid parameter: secret.")
      }
    })
    xit("post account orders with correct address and secret", async function() {
      try {
        let params = {
          secret: DATA.secret,
          order: {
            type: "sell",
            pair: `SWT/CNY:${DATA.issuer}`,
            amount: 1,
            price: 0.007
          }
        }
        let response = await remote.postAccountOrders(
          DATA.address,
          params,
          "POST"
        )
        expect(response).to.have.property("data")
        expect(response.data).to.have.property("success")
        expect(response.data.success).to.be.true
        expect(response.data).to.have.property("result")
        expect(response.data.result).to.equal("tesSUCCESS")
      } catch (error) {
        console.log(error)
        expect(error).to.equal("should not throw")
      }
    })
  })
  describe("orderBooks", function() {
    this.timeout(10000)
    it("get orderbooks with incorrect pairs", async function() {
      try {
        await remote.getOrderBooks('SWT', `CNT+${DATA.issuer}`)
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("get orderBooks with correct pairs", async function() {
      let response = await remote.getOrderBooks('SWT', `CNY+${DATA.issuer}`)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("bids")
      expect(response.data).to.have.property("asks")
    })
    it("get orderBooks Asks with correct pairs", async function() {
      let response = await remote.getOrderBooksAsks('SWT', `CNY+${DATA.issuer}`)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("asks")
    })
    it("get orderBooks Bids with correct pairs", async function() {
      let response = await remote.getOrderBooksBids('SWT', `CNY+${DATA.issuer}`)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("bids")
    })
  })
  describe("Transactions", function() {
    this.timeout(10000)
    it("get account transactions with incorrect address", async function() {
      try {
        await remote.getAccountTransactions(DATA.address.slice(1))
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("get account transactions with correct address", async function() {
      let response = await remote.getAccountTransactions(DATA.address)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("transactions")
      expect(response.data.transactions[0]).to.be.an("object")
      txid = response.data.transactions[0].hash
    })
    it("get account transaction with correct address", async function() {
      let response = await remote.getAccountTransaction(DATA.address, txid)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("transaction")
      expect(response.data.transaction.hash).to.equal(txid)
    })
    it("get transaction", async function() {
      let response = await remote.getTransaction(txid)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("transaction")
      expect(response.data.transaction.hash).to.equal(txid)
    })
  })
  describe("accountContracts", function() {
    this.timeout(10000)
    it("post account contract deploy with incorrect address", async function() {
      try {
        await remote.postAccountContractDeploy(DATA.address.slice(1))
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("post account contract deploy with correct address but no secret", async function() {
      try {
        let response = await remote.postAccountContractDeploy(DATA.address, {})
      } catch (error) {
        expect(error).to.equal("Missing parameters")
      }
    })
    xit("post account contract deploy with correct address and secret", async function() {
      try {
        let params = {
          secret: DATA.secret,
        }
        let response = await remote.postAccountContractDeploy(
          DATA.address,
          params,
          "POST"
        )
        expect(response).to.have.property("data")
        expect(response.data).to.have.property("success")
        expect(response.data.success).to.be.true
        expect(response.data).to.have.property("result")
        expect(response.data.result).to.equal("tesSUCCESS")
      } catch (error) {
        console.log(error)
        expect(error).to.equal("should not throw")
      }
    })
    it("post account contract call with incorrect address", async function() {
      try {
        await remote.postAccountContractCall(DATA.address.slice(1))
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("post account contract call with correct address but no secret", async function() {
      try {
        let response = await remote.postAccountContractCall(DATA.address, {})
      } catch (error) {
        expect(error).to.equal("Missing parameters")
      }
    })
    xit("post account contract call with correct address and secret", async function() {
      try {
        let params = {
          secret: DATA.secret,
        }
        let response = await remote.postAccountContractCall(
          DATA.address,
          params,
          "POST"
        )
        expect(response).to.have.property("data")
        expect(response.data).to.have.property("success")
        expect(response.data.success).to.be.true
        expect(response.data).to.have.property("result")
        expect(response.data.result).to.equal("tesSUCCESS")
      } catch (error) {
        console.log(error)
        expect(error).to.equal("should not throw")
      }
    })
  })
})
