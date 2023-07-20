const g = (n) => {
    let count = 0;
    for (let i = 0; i <= n; i++){
        if (/7/.test(i.toString())){
            count++
        }
    }
    return count;
}
test('g', () => {
 expect(g(7)).toBe(1)
 expect(g(20)).toBe(2)
 expect(g(70)).toBe(8)
 expect(g(100)).toBe(19)
 setTimeout(() => {
    throw 'Timeout';
 }, 5000);
 console.log(g(100_000_000));
})

// g(7) = 1
// g(20) = 2
// g(70) = 8
// g(100) = 19
