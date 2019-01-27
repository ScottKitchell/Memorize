import AbstractStore from './base.store';
import _ from 'lodash';


export default class SearchHistoryStore extends AbstractStore {
  static config = {
    timestamps: true,
    sortBy: (item) => (-1 * item.count),
    logging: true,
  }

  static async getRecient(limit=8) {
    const searches = await this.all();
    return searches.slice(0, limit);
  }

  static async add(phrase, existingHistoryArray=undefined) {
    this.log(`Add search phrase.`, phrase);
    const historyArray = existingHistoryArray || await this.all();
    const searches = _.keyBy(historyArray, 'phrase');
    const key = phrase.replace(/^#/, '').toLowerCase();
    return this.save({
      id: searches[key]? searches[key].id : undefined,
      phrase: key,
      count: searches[key]? searches[key].count+1 : 1,
    });
  }
}
