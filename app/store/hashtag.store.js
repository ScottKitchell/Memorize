import LocalStorage from './local-storage';
import _ from 'lodash';

const HASHTAGS = 'hashtagStore';

export default class HashtagStore {

  static get = _.partial(LocalStorage.get, HASHTAGS);

  static getTop = (number, resCB) => {
    return new Promise((resProm, errProm) => {
      DB.get().then((tags) => {
        const index = (_.size(tags) <= number)? 0 : -1*number;
        tags = _.reverse(_.slice(_.sortBy(tags,'count')),index);
        resProm(tags);
        if(resCB) resCB(tags);
      });
    });
  }

  static add = (tags, resCB) => {
    LocalStorage.get(HASHTAGS).then((tagCounts) => {
      tagCounts = tagCounts || {};
      _.forEach(tags, (tag) => {
        tag = tag.replace(/^#/, '').toLowerCase();

        if (tagCounts[tag]) tagCounts[tag].count++;
        else tagCounts[tag] = {id:tag, count: 1};
      });
      return LocalStorage.dangerouslyUpdateAll(HASHTAGS, tags, resCB)
    });
  }

  static subtract = (hashtags, resCB) => {
    LocalStorage.get(HASHTAGS).then((tags) => {
      tags = tags || {};
      _.forEach(hashtags, (tag) => {
        const lowTag = tag.replace(/^#/, '').toLowerCase();
        if (tags[lowTag] && tags[lowTag].count > 0) tags[lowTag].count--;
      });
      return LocalStorage.dangerouslyUpdateAll(HASHTAGS, tags, resCB)
    });
  }

  static nuke = _.partial(LocalStorage.nuke, HASHTAGS);

}
