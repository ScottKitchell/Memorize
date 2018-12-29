import LocalStorage from './local-storage';
import HashtagStore from './hashtag.store';
import { partial, words, filter, sortBy } from 'lodash';
import moment from 'moment';

const MEMORIES = 'memoryStore';

export default class MemoryStore {

  static get = partial(LocalStorage.get, MEMORIES);

  static getOne = partial(LocalStorage.getOne, MEMORIES);

  static search = (searchString, resCB) => {
    return new Promise((resProm, errProm) => {
      const regex = RegExp(words(searchString).join('|'),'g');
      LocalStorage.get(MEMORIES).then(memories => {
        memories = filter(memories, memory => {
          memory.matches = -1*(memory.text.match(regex) || []).length;
          return Boolean(memory.matches);
        });
        memories = sortBy(memories, 'matches');
        if(resCB) resCB(memories, null);
        resProm(memories);
      });
    });
  };

  static create = (memory, resCB) => {
    memory.createdAt = memory.updatedAt = moment().unix();
    return LocalStorage.create(MEMORIES, memory, resCB).then(() => {
      HashtagStore.add(memory.tags);
    });
  }

  static update = (id, memory, resCB) => {
    memory.updatedAt = moment().unix();
    LocalStorage.getOne(MEMORIES, id).then((prevMemory) => {
      HashtagStore.subtract(prevMemory.tags);
    });
    return LocalStorage.update(MEMORIES, id, memory, resCB).then(() => {
      HashtagStore.add(memory.tags);
    })
  }

  static delete = (id, resCB) => {
    return LocalStorage.delete(MEMORIES, id, resCB).then(() => {
      HashtagStore.subtract(memory.tags);
    })
  }

  static nuke = (memory, resCB) => {
    return LocalStorage.nuke(MEMORIES, memory, resCB).then(() => {
      HashtagStore.nuke();
    })
  }

}
