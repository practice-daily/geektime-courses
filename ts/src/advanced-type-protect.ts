/**
 * 类型保护
 * TypeScript能够在特定的区块中保证变量属于某种确定的类型
 * 可以在此区块中放心地引用此类型的属性，或者调用此类型的方法
 */

enum Type { Strong, Week }

class Java {
  helloJava() {
    console.log('Hello Java')
  }
}
class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
}

function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  if ((lang as Java).helloJava) {
    (lang as Java).helloJava()
  } else {
    (lang as JavaScript).helloJavaScript()
  }

  return lang
}

// 第1种类型保护的方法：instanceof
function getLanguage1(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  if (lang instanceof Java) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  return lang
}

// 第2种类型保护的方法：in
function getLanguage2(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  if ('helloJava' in lang) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  return lang
}

// 第3种类型保护的方法：typeof(基本数据类型)
function getLanguage3(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  if (typeof x === 'string') {
    console.log(x.length)
  } else {
    console.log(x.toFixed(2))
  }

  return lang
}

// 第4种类型保护的方法：类型保护函数
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}
function getLanguage4(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  if (isJava(lang)) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  return lang
}