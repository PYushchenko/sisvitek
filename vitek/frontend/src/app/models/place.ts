export interface Place {
  id: number
  name: string
  balance: {
    [index: string]: string
  }
}
