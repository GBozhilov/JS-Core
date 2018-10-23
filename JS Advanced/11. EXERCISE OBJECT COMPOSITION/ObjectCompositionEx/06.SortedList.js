function sortedList() {
    return {
        list: [],
        add: function (element) {
            this.list.push(element);
            this.list.sort((a, b) => a - b);
            this.size++;
        },
        remove: function (index) {
            if (index >= 0 && index < this.list.length) {
                this.list.splice(index, 1);
                this.size--;
            }
        },
        get: function (index) {
            if (index >= 0 && index < this.list.length) {
                return this.list[index];
            }
        },
        size: 0
    };
}