import AbstractStore from './base.store'
import HashtagStore from './hashtag.store'
import _ from 'lodash'


export default class MemoryStore extends AbstractStore {
  static config = {
    timestamps: true,
    sortBy: (dataItem) => (-1 * dataItem.id),
    logging: false,
  }

  static async search(phrase) {
    const regex = RegExp(phrase.split(" ").join('|'), 'gi')
    const predicate = (memory) => {
      // memory.matches is the negative of how many times the substring is found
      // which is used for the sortBy below. Negative is used to sort desc.
      memory.matches = (memory.text.match(regex) || []).length
      return (memory.matches > 0)
    }
    const memories = await this.filter(predicate)
    return _.sortBy(memories, (memory) => (-1 * memory.matches))
  }

  static async save(memory) {
    const prevMemory = memory.id ? _.first(this.filter({ id: memory.id })) : undefined
    return super.save(memory).then((memory) => {
      if(prevMemory)
        HashtagStore.bulkSubtract(prevMemory.tags)
      HashtagStore.bulkAdd(memory.tags)
    })
  }

  static async delete(id) {
    const memory = await this.get(id)
    return super.delete(id).then(() => {
      HashtagStore.bulkSubtract(memory.tags)
    })
  }

  static async destroy() {
    return super.destroy().then(() => {
      HashtagStore.destroy()
    })
  }
}
