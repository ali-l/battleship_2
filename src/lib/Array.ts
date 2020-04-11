export {}

// Inspired by https://kotlinlang.org/docs/reference/scope-functions.html
declare global {
  interface Array<T> {
    run<T, R>(this: Array<T>, block: (arg: Array<T>) => R): R

    also<T>(this: Array<T>, block: (arg: Array<T>) => void): Array<T>
  }
}

Array.prototype.run = function run<T, R>(this: Array<T>, block: (arg: Array<T>) => R): R {
  return block(this)
}

Array.prototype.also = function also<T>(this: Array<T>, block: (arg: Array<T>) => void): Array<T> {
  block(this)
  return this
}
