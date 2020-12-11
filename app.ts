const person = {
  name: 'Bernardo',
  age: 24,
  hobbies: ['Sports', 'Cooking']
}

let favoriteActivities: string[]

favoriteActivities = ['Sports', 'Programming']

console.log(person.name)

for (const hobby of person.hobbies) {
   // allows to use this function because it inferred it would be a string
  console.log(hobby.toUpperCase())
  // console.log(hobby.map()) throws: Property 'map' does not exist on type 'string'
}