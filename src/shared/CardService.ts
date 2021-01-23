import { onBeforeMount, reactive } from '@vue/composition-api'
import { Card } from 'types/models'
import Axios, { AxiosStatic } from 'axios'

export class CardService {
  http: Http
  records: Card[]
  record: Card
  mode: 'create' | 'edit'

  private constructor () {
    this.http = new Http()
    this.records = []
    this.record = new Card()
    this.mode = 'create'

    onBeforeMount(() => {
      this.fetchRecords()
    })
  }

  static useCardService () {
    return reactive(new CardService())
  }

  async fetchRecords () {
    this.records = await this.http.get<Card[]>('/cards')
      .then(records => {
        return records.map(record => this._createRecord(record))
      })
  }

  async writeRecord () {
    if (this.mode === 'create') {
      const createdCard = await this.http.post<Card, Card>('/cards', this.record)
      this.records = this.records.concat(this._createRecord(createdCard))
      this.record = this._createRecord(createdCard)
      this.mode = 'edit'
    } else {
      const updatedCard = await this.http.put<Card, Card>(`/cards/${this.record._id}`, this.record)
      this.records = this.records.map(r => r._id === updatedCard._id ? this._createRecord(updatedCard) : r)
      this.record = this._createRecord(updatedCard)
    }
  }

  async removeRecord () {
    if (this.mode === 'create') {
      throw new Error('Record not saved before remove')
    }
    const removedCard = await this.http.delete<Card>(`/cards/${this.record._id}`)
    this.records = this.records.filter(r => r._id !== removedCard._id)
    this.record = this._createRecord()
    this.mode = 'create'
  }

  createRecord () {
    this.record = this._createRecord()
    this.mode = 'create'
  }

  selectById (id: string) {
    const foundRecord = this.records.find(r => r._id === id)
    if (!foundRecord) {
      throw new Error('Record not found')
    }
    this.record = this._createRecord(foundRecord)
    this.mode = 'edit'
  }

  private _createRecord (data: Partial<Card> = {}) {
    return new Card(data)
  }
}

class Http {
  private axios: AxiosStatic

  constructor () {
    this.axios = Axios
  }

  get<R> (path: string) {
    return this.axios.get<R>('http://localhost:3000' + path).then(res => res.data)
  }

  post<T, R> (path: string, data: T) {
    return this.axios.post<R>('http://localhost:3000' + path, data).then(res => res.data)
  }

  put<T, R> (path: string, data: T) {
    return this.axios.put<R>('http://localhost:3000' + path, data).then(res => res.data)
  }

  delete<R> (path: string) {
    return this.axios.delete<R>('http://localhost:3000' + path).then(res => res.data)
  }
}
