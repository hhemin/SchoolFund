function b() {
  let num = 1;
  function c() {
    return  ++num
  }
  return c
}
let n = b()()
console.log(n)