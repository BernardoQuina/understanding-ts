var person = {
    name: 'Bernardo',
    age: 24,
    hobbies: ['Sports', 'Cooking']
};
var favoriteActivities;
favoriteActivities = ['Sports', 'Programming'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    // allows to use this function because it inferred it would be a string
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()) throws: Property 'map' does not exist on type 'string'
}
