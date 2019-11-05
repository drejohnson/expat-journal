export const ADD_USER =  `mutation($id: String, $email: String, $name: String) {
  insert_users(objects: [{
      id: $id,
      email: $email,
      name: $name
    }]) {
      affected_rows
    }
  }`

export const DELETE_USER = `mutation($id: String!) {
  delete_users(where: {id: {_eq: $id}}) {
    affected_rows
  }
}`