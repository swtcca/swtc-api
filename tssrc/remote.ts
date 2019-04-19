import axios from "axios"
import qs from "qs"
import { Wallet } from "swtc-factory"

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
  public display() {
    return { server: this._server, _token: this._token }
  }
  public getRequest(url: string, params: object = {}) {
    return params
      ? this._axios.get(url, qs.stringify(params))
      : this._axios.get(url)
  }
  public postRequest(url: string, params: object = {}) {
    return this._axios.post(url, params)
  }
  public deleteRequest(url: string, params: object = {}) {
    return this._axios.delete(url, params)
  }

  public getAccountBalances(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/balances`
    return this.getRequest(url, params)
  }

  public getAccountPayments(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/payments`
    return this.getRequest(url, params)
  }
  public postAccountPayments(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/payments`
    return this.postRequest(url, params)
  }
  public deleteAccountPayments(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/payments`
    return this.deleteRequest(url, params)
  }

  public getAccountOrders(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/orders`
    return this.getRequest(url, params)
  }
  public postAccountOrders(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/orders`
    return this.postRequest(url, params)
  }
  public deleteAccountOrders(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/orders`
    return this.deleteRequest(url, params)
  }

  public getOrderBooks(base: string, counter: string, params: object = {}) {
    base = base.trim()
    counter = counter.trim()
    const url = `order_book/${base}/${counter}`
    return this.getRequest(url, params)
  }
  public getOrderBooksBids(base: string, counter: string, params: object = {}) {
    base = base.trim()
    counter = counter.trim()
    const url = `order_book/bids/${base}/${counter}`
    return this.getRequest(url, params)
  }
  public getOrderBooksAsks(base: string, counter: string, params: object = {}) {
    base = base.trim()
    counter = counter.trim()
    const url = `order_book/asks/${base}/${counter}`
    return this.getRequest(url, params)
  }

  public getAccountTransactions(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `/accounts/${address}/transactions`
    return this.getRequest(url, params)
  }
  public getAccountTransaction(
    address: string,
    id_or_hash: number | string,
    params: object = {}
  ) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    let url = `/accounts/${address}/transactions`
    url = `${url}/${id_or_hash}`
    return this.getRequest(url, params)
  }
  public getTransaction(id_or_hash: number | string, params: object = {}) {
    let url = `transactions`
    url = `${url}/${id_or_hash}`
    return this.getRequest(url, params)
  }

  public postAccountContractDeploy(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/contract/deploy`
    return this.postRequest(url, params)
  }
  public postAccountContractCall(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/contract/call`
    return this.postRequest(url, params)
  }
}

export { Remote }
