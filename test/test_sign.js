const expect = require("chai").expect
//import Remote from '../src/index'
const Remote = require("../").Remote
const DATA = require("./config")
const remote = new Remote({ server: DATA.server })

let payid = "should be updated during payments query"
let txid = "should be updated during transactions query"
let ledger_index = 100
let ledger_hash = "should be updated during ledger query"

describe("Remote", function() {
  describe("Operating Transactions", function() {
    this.timeout(10000)
    it("remote.txSign() throws error", async function() {
      let tx = remote.buildPaymentTx({
        source: DATA.address,
        to: DATA.address2,
        amount: {
          value: 1,
          currency: "SWT",
          issuer: ""
        }
      })
      try {
        await remote.txSign(tx)
      } catch (error) {
        expect(error).to.equal("a valid secret is needed to sign with")
      }
    })
    xit("remote.txSign() with secret and sequence", async function() {
      let tx = remote.buildPaymentTx({
        source: DATA.address,
        to: DATA.address2,
        amount: {
          value: 1,
          currency: "SWT",
          issuer: ""
        }
      })
      try {
        await remote.txSign(tx, DATA.secret, 102)
        expect(tx.tx_json).to.have.property("Sequence")
        expect(tx.tx_json.Sequence).to.equal(102)
        expect(tx.tx_json).to.have.property("blob")
      } catch (error) {
        expect(error).to.equal("should not throw")
      }
    })
    xit("remote.txSign with secret", async function() {
      let tx = remote.buildPaymentTx({
        source: DATA.address,
        to: DATA.address2,
        amount: {
          value: 1,
          currency: "SWT",
          issuer: ""
        }
      })
      try {
        tx = await remote.txSign(tx, DATA.secret)
        expect(tx.tx_json).to.have.property("Sequence")
        expect(tx.tx_json.Sequence).to.be.a("number")
        expect(tx.tx_json).to.have.property("blob")
      } catch (error) {
        expect(error).to.equal("should not throw")
      }
    })
    it("remote.txSign with txSetSecret", async function() {
      let tx = remote.buildPaymentTx({
        source: DATA.address,
        to: DATA.address2,
        amount: {
          value: 1,
          currency: "SWT",
          issuer: ""
        }
      })
      remote.txSetSecret(tx, DATA.secret)
      try {
        tx = await remote.txSign(tx)
        expect(tx.tx_json).to.have.property("Sequence")
        expect(tx.tx_json.Sequence).to.be.a("number")
        expect(tx.tx_json).to.have.property("blob")
      } catch (error) {
        expect(error).to.equal("should not throw")
      }
    })
    it("remote.txSign with txSetSecret and txSetSequence", async function() {
      let tx = remote.buildPaymentTx({
        source: DATA.address,
        to: DATA.address2,
        amount: {
          value: 1,
          currency: "SWT",
          issuer: ""
        }
      })
      remote.txSetSecret(tx, DATA.secret)
      remote.txSetSequence(tx, 102)
      try {
        tx = await remote.txSign(tx)
        expect(tx.tx_json).to.have.property("Sequence")
        expect(tx.tx_json.Sequence).to.be.equal(102)
        expect(tx.tx_json).to.have.property("blob")
      } catch (error) {
        expect(error).to.equal("should not throw")
      }
    })
  })
})
