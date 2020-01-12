// 抽象类：只能被继承不能被实例化的类
abstract class Animal {
  eat() {
    console.log('animal eat')
  }
  abstract sleep(): void
}

class Dog extends Animal {
  // protected constructor 类只能被继承，不能被实例化，相当于基类
  // private 只能在本类调用，不能被实例或者子类调用
  constructor(name: string) {
    super()
    this.name = name
  }
  // 与es中不同的是：实例的属性必须具有初始值，或者在构造函数中被初始化。
  public name: string
  sleep() {
    console.log('dog sleep')
  }
  run() {}
  // 只读属性必须要初始化，不能被修改
  readonly version: string = '1.1.1'
  // 受保护的成员变量只能在本类和子类中访问，不能在实例对象中访问
  protected pro() {}
  // 私有的成员变量只能在本类中访问，不能在子类或实例对象中访问
  private pri() {}
  // 静态的成员变量只能通过类名直接调用访问，可以被继承
  static food: string = 'bones'
}
/**
 * 类的成员属性都是实例属性，而不是原型属性，类的成员方法都是原型方法。
 * 类中的属性在实例对象上，且必须有初始值；类中的方法在原型对象上。
 */
console.log(Dog.prototype)
console.log('Dog.food:', Dog.food)
let dog = new Dog('dog')
console.log(dog)
// dog.pro()
// dog.pri()
dog.eat()

class Husky extends Dog {
  // constructor 参数加上 public 就不需要再声明和赋值
  constructor(name: string, public color: string) {
    // super代表父类的实例
    super(name)
    // this.color = color
    this.pro()
    // this.pri()
  }
  // color: string
}
console.log('Husky.food:', Husky.food)

class Cat extends Animal {
  sleep() {
    console.log('cat sleep')
  }
}
let cat = new Cat()

// 利用抽象类实现多态
let animals: Animal[] = [dog, cat]
animals.forEach(i => {
  i.sleep()
})


// 类的方法返回this可以实现链式调用
class WorkFlow {
  step1() {
    console.log('step1')
    return this
  }
  step2() {
    console.log('step2')
    return this
  }
}
new WorkFlow().step1().step2()

// 在继承的时候 this 也会表现出多态
class MyFlow extends WorkFlow {
  next() {
    console.log('next')
    return this
  }
}
new MyFlow().next().step1().next().step2()
