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
    it("request account balances with incorrect address", async function() {
      try {
        await remote.accountBalances(DATA.address.slice(1))
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("request account balances with correct address", async function() {
      let response = await remote.accountBalances(DATA.address)
      expect(response).to.have.property("data")
      expect(response.data).to.have.property("success")
      expect(response.data.success).to.be.true
      expect(response.data).to.have.property("balances")
      expect(response.data.balances[0]).to.be.an("object")
    })
  })
  describe("accountPayments", function() {
    this.timeout(10000)
    it("request account payments with incorrect address", async function() {
      try {
        await remote.accountPayments(DATA.address.slice(1))
      } catch (error) {
        expect(error).to.equal("invalid address provided")
      }
    })
    it("request account payments with correct address but no secret", async function() {
      try {
        let response = await remote.accountPayments(DATA.address, {}, "POST")
      } catch (error) {
        expect(error).to.equal("Missing parameter secret.")
      }
    })
    it("request account payments with correct address and secret", async function() {
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
        let response = await remote.accountPayments(
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
