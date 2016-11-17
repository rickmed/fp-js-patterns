Eff language

// Declare a new effect type "choice":
type choice = effect

// An operation "decide" to handle that effect type.
decide :: (args) => boolean

// Create an instance of choice
	var insC = new choice

// Write a computation using operators (e#op) applied to the operator arguments.
// () after decide can accept arguments
	let x = if insC#decide () then 10 else 20
	let y = if insC#decide () then 0 else 5
	x - y

// Now you give meaning to insC#decide with handlers
handle
  let x = if insC#decide () then 10 else 20
	let y = if insC#decide () then 0 else 5
	x - y
// call the continuation k with the value true.
with
  c#decide () => k -> true

/* How it is evaluated
1) start with let x
2) searches for nearest handler of insC#decide
3) Replaces insC#decide with true
4) now the expression is "let x = if true then 10 else 20"
5) evaluates to 10
6) the same with let y
7) x - y = 10 - 0 = 10.
*/

/* Define handler separate from use site*/
let h = handler
  c#decide () k -> k true
// use it
handle
  ...
with
  h

/* Instead of returning true, accumulate all possible effects*/

// write programs with abstract algebraic symbols and later decide what
// they mean in handlers