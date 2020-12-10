export const assertNever = (value: never): never => {
  throw new Error(
    `Not found case value on union member: ${JSON.stringify(value)}`
  );
};