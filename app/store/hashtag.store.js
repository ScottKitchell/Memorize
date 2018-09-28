import LocalStorage from './local-storage';
import { partial, forEach } from 'lodash';

const HASHTAGS = 'hashtagArray';

export default class HashtagStore {

  static get = partial(LocalStorage.get, HASHTAGS);

  static add = (hashtags, resCB) => {
    LocalStorage.get(HASHTAGS).then((tags) => {
      forEach(hashtags, (tag) => {
        const lowTag = tag.replace(/^#/, '').toLowerCase();
        tags[lowTag] = tags[lowTag]? tags[lowTag]+1 : 1;
      });
      return LocalStorage.dangerouslyUpdateAll(HASHTAGS, tags, resCB)
    });
  }

  static subtract = (hashtags, resCB) => {
    LocalStorage.get(HASHTAGS).then((tags) => {
      forEach(hashtags, (tag) => {
        const lowTag = tag.replace(/^#/, '').toLowerCase();
        if(hashtags[lowTag]) hashtags[lowTag]--;
      });
      return LocalStorage.dangerouslyUpdateAll(HASHTAGS, tags, resCB)
    });
  }

  static nuke = partial(LocalStorage.nuke, HASHTAGS);

}
