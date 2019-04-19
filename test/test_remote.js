const expect = require("chai").expect
//import Remote from '../src/index'
const Remote = require("../").Remote
const DATA = require("./config")
const remote = new Remote({ server: DATA.server })

describe("Remote", function() {
  describe("constructor", function() {
    it("instantiate a Remote successfully", function() {
      let remote = new Remote({})
      expect(remote._token).to.be.equal("SWT")
    })
  })
  describe("accountBalances", function() {
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
})
