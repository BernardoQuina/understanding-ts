const person: {
  name: string,
  age: number,
  hobbies: string[],
  role: [number, string]
} = {
  name: 'Bernardo',
  age: 24,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author']
}

// person.role.push('admin') Allowed even though its a tuple
// person.role[1] = 10 Source has 3 element(s) but target allows only 2

// person.role = [0, 'admin', 'user'] Source has 3 element(s) but target allows only 2

let favoriteActivities: string[]

favoriteActivities = ['Sports', 'Programming']

console.log(person.name)

for (const hobby of person.hobbies) {
   // allows to use this function because it inferred it would be a string
  console.log(hobby.toUpperCase())
  // console.log(hobby.map()) throws: Property 'map' does not exist on type 'string'
}


enum Role { ADMIN, READ_ONLY, AUTHOR }

const person2 = {
  name: 'Bernardo',
  age: 24,
  hobbies: ['Sports', 'Cooking'],
  role: Role.AUTHOR
}

if (person2.role === Role.AUTHOR) {
  console.log('is author')
}