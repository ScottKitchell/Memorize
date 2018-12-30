import AbstractStore from './base.store';
import _ from 'lodash';


export default class HashtagStore extends AbstractStore {

  static async getTop(number, existingDataArray=undefined) {
    const hashtags = existingDataArray || await this.all();
    const sorted = _.sortByOrder(hashtags,['count'], ['desc']);
    return sorted.slice(0, number);
  }

  static async bulkAdd(tags, existingDataArray=undefined) {
    const hashtagArray = existingDataArray || await this.all();
    const hashtags = _.keyBy(hashtagArray, 'tag');
    let updatedHashtags = [];
    _.forEach(tags, (tag) => {
      const key = tag.replace(/^#/, '').toLowerCase();
      if (hashtags[key])
        hashtags[key].count++;
      else
        hashtags[key] = {id:key, count: 1};
      updatedHashtags.push(hashtags[key]);
    });
    return this.bulkSave(updatedHashtags);
  }

  static async bulkSubtract(tags, existingDataArray=undefined) {
    const hashtagArray = existingDataArray || await this.all();
    const hashtags = _.keyBy(hashtagArray, 'tag');
    let updatedHashtags = [];
    _.forEach(tags, (tag) => {
      const key = tag.replace(/^#/, '').toLowerCase();
      if (hashtags[key]) {
        hashtags[key].count--;
        updatedHashtags.push(hashtags[key]);
      }
    });
    return this.bulkSave(updatedHashtags);
  }

}
