

const searchTerm = "li";


const result = users.filter(user =>
    user.name.includes(searchTerm)
);

console.log(result);
// [
//   { name: "Alice", age: 25 },
//   { name: "Charlie", age: 35 }
// ]