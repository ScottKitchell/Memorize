import _ from 'lodash';

export function hashtagsIn(text) {
  if (typeof text != "string") throw "The input is not a string.";

  const regex = /#(\w+)/g;
  const hashtags = _.map(text.match(regex), (tag) => _.toLower(tag));
  return _.uniq(hashtags);
}

export function hashtagsInAll(array, selector) {
  if (typeof array != "object") throw "The input is not an array.";
  if (typeof array != "string") throw "The selector is not valid.";

  let hashtagCount = {};
  // _.forEach(array, (item) => {
  //   hashtags =
  // });

}
