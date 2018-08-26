import _ from 'lodash';

export function hashtagsIn(text) {
  if (typeof text != "string") throw "The input is not a string.";

  const regex = /#([a-zA-Z\d]+)/gm;
  const hashtags = text.match(regex);
  return _.uniqWith(hashtags, (tag1, tag2) => (
    tag1.toLowerCase() === tag2.toLowerCase())
  );
}

export function hashtagsInAll(array, selector) {
  if (typeof array != "object") throw "The input is not an array.";
  if (typeof array != "string") throw "The selector is not valid.";

  let hashtagCount = {};
  // _.forEach(array, (item) => {
  //   hashtags =
  // });

}
