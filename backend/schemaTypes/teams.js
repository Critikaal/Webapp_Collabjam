export const teams = {
    title: "Teams",
    name: "teams",
    type: "document",
    fields: [
        {
            title: "Tittel",
            name: "title",
            type: "string"
        },
        {
            title: "Bilde",
            name: "picture",
            type: "image"
        },
        {
            title: "Slug",
            name: "slug",
            type: "string"
        },
        {
            title: "Pokemon",
            name: "pokemon",
            type: "array",
            of: [{type: "string"}]
        }
    ]
}