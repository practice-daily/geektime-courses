interface Human {
  // 接口不能约束类的构造函数
  // new (name: string): void;

  // 接口只能约束类的公有成员
  name: string;
  eat(): void;
}

class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }
  name: string;
  eat() {}
  sleep() {}
}

// 接口间的继承，可以多继承
interface Man extends Human {
  run(): void;
}
interface Child {
  cry(): void;
}
interface Boy extends Man, Child {}
let boy: Boy = {
  run() {},
  name: '',
  eat() {},
  cry() {}
}

// 接口继承类
// 注意：接口继承类时，不仅抽离了类中的公有成员，也抽离了受保护的和私有的成员
class Auto {
  state1 = 1;
  // private s = 3;
  // protected a = '1';
}
interface AutoInterface extends Auto {
  state2: number;
}
class C1 implements AutoInterface {
  state1 = 0;
  state2 = 2;
}
let c1 = new C1()
console.log(c1)

class C2 extends Auto implements AutoInterface {
  state2 = 22;
}
let c2 = new C2()
console.log(c2)
