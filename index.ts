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

  async create_entity(name: string): Promise<number> {
    try {
      const form_data = new FormData()
      form_data.append('name', name)
      const response = await fetch(
        "http://localhost:5000/v1/entities",
        {
          headers: {
            Authorization: this.api_key
          },
          method: "POST",
          body: form_data
        }
      )
      if (response.status !== 201) {
        if (response.status === 500) throw Error("ERR_INTERNAL_SERVER")
        const error = await response.text()
        throw Error(error)
      }
      return 201
    } catch (err) {
      throw err
    }
  }

  async update_entity(name: string, new_name:string) : Promise<number> {
    try {
      const form_data = new FormData()
      form_data.append('name', new_name)
      const response = await fetch(
        `http://localhost:5000/v1/entities/${name}`,
        {
          headers:{
            Authorization: this.api_key
          },
          method:"PUT",
          body: form_data
        }
      )
      if (response.status !== 200) {
        if (response.status === 500) throw Error("ERR_INTERNAL_SERVER")
        const error = await response.text()
        throw Error(error)
      }
      return 200
    } catch (err) {
      throw err
    }
  }

  async delete_entity(name:string) : Promise<number> {
    try {
      const form_data = new FormData()
      form_data.append('name', name)
      const response = await fetch(
        `http://localhost:5000/v1/entities/${name}`,
        {
          headers:{
            Authorization: this.api_key
          },
          method:"DELETE",
          body: form_data
        }
      )
      if (response.status !== 200) {
        if (response.status === 500) throw Error("ERR_INTERNAL_SERVER")
        const error = await response.text()
        throw Error(error)
      }
      return 200
    } catch (err) {
      throw err
    }
  }
}
