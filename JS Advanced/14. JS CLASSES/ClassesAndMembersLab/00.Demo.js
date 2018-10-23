class Cat {
    constructor(name, age){
        this.name = name;
        this.age = age;
        Object.seal(this);
    }
}

let cat = new Cat('Garfield', 5);
cat.age = 7;
cat.sex = 'male';
console.log(cat);