import { flatten } from "./flatten";

export const formatTranslationMessages = (locale: string, messages: any) => {
  const flattenedMessages = flatten(messages);
  const flattenFormattedMessages = (formattedMessages: any, key: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const formattedMessage = flattenedMessages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(flattenedMessages).reduce(flattenFormattedMessages, {});
};
