const world_world = 'world';

const obj = { foo: "bar" };

const hello = (who: string = world_world): string => `Hello ${who}!`;

console.log(hello());

export default hello;
