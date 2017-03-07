/* tslint:disable:no-console */

export default {
  methods:{
    select(value) {
      const children: any = this.list
      for (let i = 0, len = children.length; i < len; i++) {
        if (children[i] && children[i].value === value) {
          this.selectByIndex(i);
          return;
        }
      }
      this.selectByIndex(0);
    },

    selectByIndex(index) {
      if (index < 0 || index >= this.list.length || !this.itemHeight) {
        return;
      }
      this.scrollTo(index * this.itemHeight);
    },

    doScrollingComplete(top) {
      let index = top / this.itemHeight;
      const floor = Math.floor(index);
      if (index - floor > 0.5) {
        index = floor + 1;
      } else {
        index = floor;
      }
      const children = this.list;
      index = Math.min(index, children.length - 1);
      const child: any = children[index];
      if (child) {
        this.emit("updateValue",child.value)
      } else if (console.warn) {
        console.warn('child not found', children, index);
      }
    },
  }
};