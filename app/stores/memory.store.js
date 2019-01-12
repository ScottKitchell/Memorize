import AbstractStore from './base.store';
import HashtagStore from './hashtag.store';
import _ from 'lodash';
import { Platform, AsyncStorage } from 'react-native';

export default class MemoryStore extends AbstractStore {
  static config = {
    timestamps: true,
    sortBy: (dataItem) => (-1 * dataItem.id),
  }

  // static async sort() {
  //   const unsorted = await this.all();
  //   const sorted = _.sortBy(unsorted, (item)=>-1*item.createdAt);
  //   console.warn('length',sorted.length);
  //   newSorted = sorted.map((item,i)=>{
  //     item.id = i;
  //     return item;
  //   });
  //   AsyncStorage.setItem('MemoryStoreIdCounter', "12");
  //   if(newSorted.length===12)
  //     this.dangerouslyOverrideAll(newSorted);
  // }

  static async search(phrase) {
    const regex = RegExp(phrase.split(" ").join('|'),'gi');
    const predicate = (memory) => {
      // memory.matches is the negative of how many times the substring is found
      // which is used for the sortBy below. Negative is used to sort desc.
      memory.matches = (memory.text.match(regex) || []).length;
      return (memory.matches > 0);
    }
    const memories = await this.filter(predicate);
    console.log(memories);
    return _.sortBy(memories, (memory) => (-1 * memory.matches));
  };

  static async save(memory) {
    const prevMemory = memory.id? _.first(this.filter({id: memory.id})) : undefined;
    return super.save(memory).then((memory) => {
      if(prevMemory)
        HashtagStore.bulkSubtract(prevMemory.tags);
      HashtagStore.bulkAdd(memory.tags);
    });
  }

  static async delete(id) {
    const memory = await this.get(id);
    return super.delete(id).then(() => {
      HashtagStore.bulkSubtract(memory.tags);
    });
  }

  static async destroy() {
    return super.destroy().then(() => {
      HashtagStore.destroy();
    });
  }

}
