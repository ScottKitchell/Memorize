import AbstractStore from './base.store';
import _ from 'lodash';

export default class HashtagStore extends AbstractStore {
  static config = {
    timestamps: true,
    sortBy: (item) => (-1 * item.count),
    logging: true,
    extra: true,
  }

  static async search(tag, limit=8) {
    const regex = RegExp(`^${tag}`,'i');
    const predicate = (hashtag) => hashtag.tag.match(regex);
    const hashtags = (tag !== "")? await this.filter(predicate) : await this.all();
    return hashtags.slice(0, limit);
  }

  static async bulkAdd(tags, existingHashtagArray=undefined) {
    this.log(`Bulk add tags.`,tags);
    if(!Array.isArray(tags)) return;
    const hashtagArray = existingHashtagArray || await this.all();
    const hashtags = _.keyBy(hashtagArray, 'tag');
    const updatedHashtags = tags.map((tag) => {
      const key = tag.replace(/^#/, '').toLowerCase();
      return {
        id: hashtags[key]? hashtags[key].id : undefined,
        tag: key,
        count: hashtags[key]? hashtags[key].count+1 : 1,
      };
    });
    return this.bulkSave(updatedHashtags);
  }

  static async bulkSubtract(tags, existingDataArray=undefined) {
    this.log(`Bulk subtract tags.`,tags);
    const hashtagArray = existingDataArray || await this.all();
    const hashtags = _.keyBy(hashtagArray, 'tag');
    const updatedHashtags = tags.map((tag) => {
      const key = tag.replace(/^#/, '').toLowerCase();
      return {
        id: hashtags[key]? hashtags[key].id : undefined,
        tag: key,
        count: hashtags[key]? hashtags[key].count-1 : 0,
      };
    });
    return this.bulkSave(updatedHashtags);
  }

}
