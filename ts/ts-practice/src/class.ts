// 抽象类：只能被继承不能被实例化的类
abstract class Animal {
  eat() {
    console.log('animal eat')
  }
  abstract sleep(): void
}

/**
 * 两条原型链：
    1）构造函数的原型链：Dog -> Anima -> Function
    Dog.__proto__ === Animal // true
    Animal.__proto__ === Function.prototype // true
    Animal.isPrototypeOf(Dog) // true，表示 Dog 在 Animal 的原型链上

    2）原型的原型链：Dog.prototype -> Animal.prototype -> Object.prototype
    Dog.prototype.__proto__ === Animal.prototype // true
    Animal.prototype.__proto__ === Object.prototype // true
    Animal.prototype.isPrototypeOf(Dog.prototype) // true， 表示 Dog.prototype 在 Animal.prototype 的原型链上
 */

class Dog extends Animal {
  // private constructor: 类不能被实例化也不能被继承
  // protected constructor: 类只能被继承，不能被实例化，相当于基类
  public constructor(name: string) {
    super()
    this.name = name
  }

  // 实例属性（可选属性除外）必须具有初始值或者在构造函数中被初始化
  public name: string
  age?: number

  sleep() {
    console.log('dog sleep')
  }
  run() {}

  // 只读属性不能被修改，必须要初始化
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
 * 也就是说，类中的属性在实例对象上，类中的方法在原型对象上。
 */
console.log(Dog.prototype)
console.log('Dog.food:', Dog.food)
let dog = new Dog('dog')
console.log(dog)
// dog.pro()
// dog.pri()
dog.eat()

class Husky extends Dog {
  // constructor 的参数加上 public 修饰符的作用是将参数自动变成实例属性，这样可以省略在类中的定义和在构造函数中的初始化，代码更简洁
  constructor(name: string, public color: string) {
    // super 代表父类的实例
    super(name)
    // this.color = color
    this.pro()
    // this.pri()
  }
  // color: string

  /**
   * 传统 JavaScript 的继承：
      function Animal(name) {
        this.name = name;
      }
      function Dog(name) {
        Animal.call(this, name);
      }

      ES6的继承：
      class Animal {
        constructor(name) {
          this.name = name;
        }
      }
      class Dog extends Animal {
        constructor(name) {
          super(name);
        }
      }
      这里 super 的作用是调用父类 Animal 的构造函数来初始化子类 Dog，等价于 Animal.call(this, ...)。也就是说，只有相关的实例属性被绑定到 this 上后，才能调用 this.xxx。
   */
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
