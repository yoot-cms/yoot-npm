type Entity = {
  name: string,
  project: string,
  schema: Record<string, string>,
  trashed: boolean
}

type Entry = {
  id: string,
  entity: string,
  value: Record<string, string | number | boolean>
}

export class Yoot {
  api_key: string

  constructor(api_key: string) {
    this.api_key = api_key
  }

  async get_entities(): Promise<Entity[]> {
    const response = await fetch(
      "http://localhost:5000/entities",
      {
        headers: {
          Authorization: this.api_key
        }
      }
    )
    if (response.status !== 200) {
      if (response.status === 500) throw Error("ERR_INTERNAL_SERVER")
      const error = await response.text()
      throw Error(error)
    }
    const entities = await response.json()
    return entities as Entity[]
  }
}
