type Entity = {
    name: string,
    project: string,
    schema: Record<string, string>,
    trashed: boolean
}

export class Yoot {
    api_key: string

    constructor(api_key: string) {
        this.api_key = api_key
    }

    async get_entities(): Promise<Entity[]> {
        try {
            const response = await fetch(
                "http://localhost:5000/entities",
                {
                    headers: {
                        Authorization: this.api_key
                    }
                }
            )
            if(response.status===401) throw Error("Invalid api key")
            const entities = await response.json()
            return entities as Entity[]
        } catch (err) {
            throw err
        }
    }
}
