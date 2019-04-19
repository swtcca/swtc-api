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
          return Promise.reject(response.data.message || "something wrong")
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
  public accountBalances(address: string, params: object = {}) {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/balances`
    return this.getRequest(url, params)
  }
  public accountPayments(address: string, params: object = {}, method = "GET") {
    address = address.trim()
    if (!Wallet.isValidAddress(address)) {
      return Promise.reject("invalid address provided")
    }
    const url = `accounts/${address}/payments`
    if (method === "GET") {
      return this.getRequest(url, params)
    }
    return this.postRequest(url, params)
  }
}

export { Remote }
