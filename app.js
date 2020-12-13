var person = {
    name: 'Bernardo',
    age: 24,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};
// person.role.push('admin') Allowed even though its a tuple
// person.role[1] = 10 Source has 3 element(s) but target allows only 2
// person.role = [0, 'admin', 'user'] Source has 3 element(s) but target allows only 2
var favoriteActivities;
favoriteActivities = ['Sports', 'Programming'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    // allows to use this function because it inferred it would be a string
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()) throws: Property 'map' does not exist on type 'string'
}
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var person2 = {
    name: 'Bernardo',
    age: 24,
    hobbies: ['Sports', 'Cooking'],
    role: Role.AUTHOR
};
if (person2.role === Role.AUTHOR) {
    console.log('is author');
}
