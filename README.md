# graphql-node-server
trying out graphql with node


```gqlschema
type Query {
  getDatasheet(componentId:String!):DatasheetPayload
}

type DatasheetPayload {
  componentId:ID!
  sections: [Section]
}

type Section {
  name: String!
  fields: [FieldDef]
}

type FieldDef {
  name:String!
  value:JSON
  type:FIELD_TYPE
}

enum FIELD_TYPE {
  URL_FIELD

}

scalar JSON
```

```gql
query User($id1: String){
  component(id: $id1){
    id
    sections {
      name
      bgcolor
      icon
      fields {
        name
        value
        type
      }
    }
  }
}
```

URL, IMG, Liste von Text
vlaue ) array oder obj
