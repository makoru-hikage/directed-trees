/**
 * One of the bread and butters of functional programming
 * A technique that makes partial application possible.
 *
 * @param callback the function to be curried
 * @returns callback
 */
const curry = (f) => {
  return (x) => {
    return (y) => {
      return f(x,y);
    };
  };
};

/**
 * Swap the parameters of any function
 * that requires two arguments
 * 
 * @param callback func 
 * @returns callback
 */
const swapArgs = (func) => (b, a) => func (a, b);

module.exports = {
  curry: curry,
  swapArgs: swapArgs
}