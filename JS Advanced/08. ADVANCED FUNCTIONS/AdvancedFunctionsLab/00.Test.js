let maria = {
    name: 'Maria',
    age: 24,
    hello: function (thing) {
        console.log(this.name + ' say hello ' + thing);
    }
};

let ivan = {
    name: 'Ivan'
};

maria.hello('world');
let helloIvan = maria.hello.bind(ivan);
helloIvan('param');