import axios from "axios"
// import qs from "qs"
import { Wallet } from "swtc-factory"
import { Transaction } from "swtc-transaction"

class Remote {
  public _server: string
  public _token: string
  public _axios: any
  constructor(options: any = {}) {
    this._server = options.server || "https://api.jingtum.com"
    this._token = options.token || "SWT"
    this._axios = axios.create({ baseURL: this._server + "/v2/" })
    this._axios.interceptors.response.use(
      (response) => {
        // Do something with response data
        if (response.data.success === false) {
          // console.log(response.data)
          return Promise.reject(
            response.data.message || response.data.result || "something wrong"
          )
        }
        return response
      },
      (error) => {
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }

  // show instacnce basic configuration
  public display() {
    return { server: this._server, token: this._token }
  }

  // wrap axios promise to resolve only interested response data instead
  public getRequest(url: string, config: object = {}) {
    return new Promise((resolve, reject) => {
      this._axios
        .get(url, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  // guard unsafe operation and wrap axios promise to resolve only interested response data instead
  public postRequest(
    url: string,
    data: object = {},
    config: object = {},
    safe = false
  ) {
    if (!safe) {
      return Promise.reject("unsafe operation disabled")
    }
    return new Promise((resolve, reject) => {
      this._axios
        .post(url, data, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  // guard unsafe operation and wrap axios promise to resolve only interested response data instead
  public deleteRequest(
    url: string,
    data: object = {},
    config: object = {},
    safe = false
  ) {
    if (!safe) {
      return Promise.reject("unsafe operation disabled")
    }
    return new Promise((resolve, reject) => {
      this._axios
        .delete(url, data, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  // submit locally signed transactions, this is the only permitted post and delete operation
  public postBlob(data: object = {}) {
    const url = `blob`
    return this.postRequest(url, data, {}, true)
  }

  public getLedger(param: string | number = "") {
    let url = `ledger`
    if (!param) {
      url = `${url}/index`
    } else if (typeof param === "number") {
      url = `${url}/index/${param}`
    } else if (typeof param === "string") {
      if (/^[0-9]{1,20}$/.test(param)) {
        url = `${url}/index/${param}`
      } else {
        url = `${url}/hash/${param}`
      }
    } else {
      url = `${url}/index`
    }
    return this.getRequest(url)
  }

  public getAccountBalances(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/balances`
    return this.getRequest(url, { params })
  }

  public getAccountPayment(address: string, hash: string) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/payments/${hash}`
    return this.getRequest(url)
  }
  public getAccountPayments(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/payments`
    return this.getRequest(url, { params })
  }
  public postAccountPayments(address: string, data: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/payments`
    return this.postRequest(url, data)
  }
  public deleteAccountPayments(address: string, data: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/payments`
    return this.deleteRequest(url, data)
  }

  public getAccountOrder(address: string, hash: string) {
    address = address.trim()
    hash = hash.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/orders/${hash}`
    return this.getRequest(url)
  }
  public getAccountOrders(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/orders`
    return this.getRequest(url, { params })
  }
  public postAccountOrders(address: string, data: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/orders`
    return this.postRequest(url, data)
  }
  public deleteAccountOrders(address: string, data: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/orders`
    return this.deleteRequest(url, data)
  }

  public getOrderBooks(base: string, counter: string, params: object = {}) {
    base = base.trim()
    counter = counter.trim()
    const url = `order_book/${base}/${counter}`
    return this.getRequest(url, { params })
  }
  public getOrderBooksBids(base: string, counter: string, params: object = {}) {
    base = base.trim()
    counter = counter.trim()
    const url = `order_book/bids/${base}/${counter}`
    return this.getRequest(url, { params })
  }
  public getOrderBooksAsks(base: string, counter: string, params: object = {}) {
    base = base.trim()
    counter = counter.trim()
    const url = `order_book/asks/${base}/${counter}`
    return this.getRequest(url, { params })
  }

  public getAccountTransactions(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `/accounts/${address}/transactions`
    return this.getRequest(url, { params })
  }
  public getAccountTransaction(address: string, id_or_hash: number | string) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    let url = `/accounts/${address}/transactions`
    url = `${url}/${id_or_hash}`
    return this.getRequest(url)
  }
  public getTransaction(id_or_hash: number | string) {
    let url = `transactions`
    url = `${url}/${id_or_hash}`
    return this.getRequest(url)
  }

  public postAccountContractDeploy(address: string, data: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/contract/deploy`
    return this.postRequest(url, data)
  }
  public postAccountContractCall(address: string, data: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/contract/call`
    return this.postRequest(url, data)
  }

  // here we extend beyond api calls to interact with swtc-transactions
  // we try to use the same as that has been in swtc-lib
  public buildPaymentTx(options) {
    return Transaction.buildPaymentTx(options, this)
  }
  public buildOfferCreateTx(options) {
    return Transaction.buildOfferCreateTx(options, this)
  }
  public buildOfferCancelTx(options) {
    return Transaction.buildOfferCancelTx(options, this)
  }
  public buildRelationTx(options) {
    return Transaction.buildRelationTx(options, this)
  }
  public buildAccountSetTx(options) {
    return Transaction.buildAccountSetTx(options, this)
  }
  public buildContractDeployTx(options) {
    return Transaction.deployContractTx(options, this)
  }
  public deployContractTx(options) {
    return Transaction.deployContractTx(options, this)
  }
  public buildContractCallTx(options) {
    return Transaction.callContractTx(options, this)
  }
  public callContractTx(options) {
    return Transaction.callContractTx(options, this)
  }
  public buildBrokerageTx(options) {
    return Transaction.callContractTx(options, this)
  }
}

export { Remote }
