type Argument = string | null | undefined;

const addClassName = (prev: string, next: string) => {
  if (!next) {
    return prev;
  }

  return prev ? `${prev} ${next}` : next;
};

export const cn = (...args: Argument[]) => {
  let classNames = "";

  args.forEach((arg) => {
    if (arg) {
      classNames = addClassName(classNames, arg);
    }
  });

  return classNames;
};
