foldMap(T, f) {
  return this.foldr((x, acc) => f(x).concat(acc), T.empty());
}

// EG:
foldMap(Array, Array.of)(Compose([Just(10), Just(20), Nothing()]))
// => [10,20]

// for Monads

const foldrM = T => (f, z, xs) => {
    const f_ = (k, x) => z => chain(k)(f(x, z));
    return foldl(f_)(T.of)(xs)(z)
};

const foldlM = T => (f, z, xs) => {
    const f_ = (x, k) => z => chain(k)(f(z, x));
    return foldr(f_)(T.of)(xs)(z)
};

const foldM = foldlM;