import { Platform, AsyncStorage } from 'react-native';
import _ from 'lodash';
import moment from 'moment';


export default class AbstractStore {
  // static config = {
  //   timestamps: true,
  //   logging: true,
  //   sortBy: (dataItem) => (dataItem.id),
  // };

  static async all() {
    try {
      const data = await AsyncStorage.getItem(this.name);
      return data? JSON.parse(data) : [];
    } catch(error) {
      console.error(`Error while getting all ${this.name} items: ${error}`, error);
      throw error;
    }
  }

  static async filter(predicate, existingDataArray=undefined) {
    const dataArray = existingDataArray || await this.all();
    return _.filter(dataArray, predicate);
  }

  static async get(id, existingDataArray=undefined) {
    try {
      this.log(`Get ${this.name} item with id of ${id}.`);
      const dataArray = (existingDataArray && !this.name) || await this.all();
      dataItem = _.find(dataArray, {id});
      if(!dataItem)
        throw `No item found with id of ${id}.`;
      return dataItem;
    } catch(error) {
      console.error(`Error while getting ${this.name} item: ${error}`, error);
      throw error;
    }
  }

  static async save(dataItem) {
    try {
      this.log(`Save ${this.name} item.`,dataItem);
      const dataArray = await this.all();
      const res = await this._insert(dataItem, dataArray);
      if(res.dataArray.length < dataArray.length)
        throw "Corruption of data was detected after an insert.";
      await this.dangerouslyOverrideAll(res.dataArray);
      return res.dataItem;
    } catch(error) {
      console.error(`Error while saving ${this.name} item: ${error}`, error);
      throw error;
    }
  }

  static async bulkSave(dataItems) {
    try {
      this.log(`Bulk save ${this.name} items.`, dataItems);
      if(!Array.isArray(dataItems))
        throw `The argument provided is not an array.`;
      let dataArray = await this.all();
      for (let i=0; i<dataItems.length; i++) {
        const res = await this._insert(dataItems[i], dataArray);
        if(res.dataArray.length < dataArray.length)
          throw "Corruption of data was detected after an insert.";
        dataArray = res.dataArray;
      }
      await this.dangerouslyOverrideAll(dataArray);
      return dataArray;
    } catch(error) {
      console.error(`Error while bulk saving ${this.name} items:`,error);
      throw error;
    }
  }

  static async _insert(dataItem, existingDataArray) {
    let created = false;
    if (!dataItem.id) { // Create
      created = true;
      dataItem.id = await this.popNextId();
      if (this.config.timestamps)
        dataItem.createdAt = dataItem.updatedAt = moment().unix();
    } else { // Update
      if(this.config.timestamps)
        dataItem.updatedAt = moment().unix();
      const prevIndex = _.findIndex(existingDataArray, {id: dataItem.id});
      dataItem = {...existingDataArray[prevIndex], ...dataItem};
      if(prevIndex >= 0)
        existingDataArray.splice(prevIndex, 1);
    }
    const index = _.sortedIndexBy(existingDataArray, dataItem, this.config.sortBy);
    existingDataArray.splice(index, 0, dataItem);
    return {created, dataItem, dataArray: existingDataArray};
  }

  static async delete(id) {
    try {
      this.log(`Bulk save ${this.name} items.`, dataArray);
      let dataArray = await this.all();
      const index = _.findIndex(dataArray, {id});
      if(index === -1)
        throw `No item found with id of ${id}.`;
      dataArray.splice(index, 1);
      await this.dangerouslyOverrideAll(dataArray);
      return dataArray;
    } catch(error) {
      console.error(`Error while deleting ${this.name} item: ${error}`);
      throw error;
    }
  }

  static async destroy() {
    try {
      this.log(`destroy ${this.name}.`);
      AsyncStorage.removeItem(this.name);
      AsyncStorage.removeItem(this.idStoreName);
      return;
    } catch(error) {
      console.error(`Error while destroying ${this.name}: ${error}`, error);
      throw error;
    }
  }

  static async dangerouslyOverrideAll(dataArray) {
    return AsyncStorage.setItem(this.name, JSON.stringify(dataArray));
  }

  static async peekNextId() {
    try {
      const id = await AsyncStorage.getItem(this.idStoreName);
      return id? parseInt(id) : 1;
    } catch (error) {
      console.error(`Error while peeking at ${this.name} next id: ${error}`, error);
      throw error;
    }
  }

  static async popNextId() {
    try {
      const id = await this.peekNextId();
      AsyncStorage.setItem(this.idStoreName, ""+(id+1));
      return id;
    } catch (error) {
      console.error(`Error while peeking at ${this.name} next id: ${error}`, error);
      throw error;
    }
  }

  static get idStoreName() { return this.name+'IdCounter'; }

  static log(message, item) {
    if(this.config.logging)
      if(item) console.log(message, item);
      else console.log(message);
  }

}
