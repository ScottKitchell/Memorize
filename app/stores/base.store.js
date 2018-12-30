import { Platform, AsyncStorage } from 'react-native';
import _ from 'lodash';
import moment from 'moment';


export default class AbstractStore {
  static _config = {
    timestamps: true,
    logging: false,
    ...this.config
  };
  static config = { };

  static async all() {
    try {
      const data = await AsyncStorage.getItem(this.name);
      return data? JSON.parse(data) : [];
    } catch(error) {
      console.error(`While getting all ${this.name} items: ${error}`);
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
      console.error(`While getting ${this.name} item: ${error}`);
      throw error;
    }
  }

  static async save(dataItem) {
    try {
      this.log(`Save ${this.name} item.`,dataItem);
      let dataArray = await this.all();
      this._insert(dataItem, dataArray);
      await this.dangerouslyOverrideAll(dataArray);
      return dataItem;
    } catch(error) {
      console.error(`While saving ${this.name} item: ${error}`);
      throw error;
    }
  }

  static _insert(dataItem, existingDataArray) {
    const index = dataItem.id? _.findIndex(existingDataArray, {id: dataItem.id}) : -1;
    if (index !== -1) { // Update
      if(this._config.timestamps)
        dataItem.updatedAt = moment().unix();
      existingDataArray[index] = {...existingDataArray[index], ...dataItem};
    } else { // Create
      if (!dataItem.id)
        dataItem.id = this.getUniqueId(existingDataArray);
      if(this._config.timestamps)
        dataItem.createdAt = dataItem.updatedAt = moment().unix();
      existingDataArray.unshift(dataItem);
    }
  }

  static async bulkSave(dataArray) {
    try {
      this.log(`Bulk save ${this.name} items.`, dataArray);
      if(!Array.isArray(dataArray))
        throw `The argument provided is not an array.`;
      const currentDataArray = await this.all();
      _.forEach(dataArray, (dataItem) => {
        this._insert(dataItem, currentDataArray);
      });
      await this.dangerouslyOverrideAll(dataArray);
      return dataArray;
    } catch(error) {
      console.error(`While bulk saving ${this.name} items: ${error}`);
      throw error;
    }
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
      console.error(`While deleting ${this.name} item: ${error}`);
      throw error;
    }
  }

  static async destroy() {
    try {
      this.log(`destroy ${this.name}.`);
      await AsyncStorage.removeItem(this.name);
      return;
    } catch(error) {
      console.error(`While destroying ${this.name}: ${error}`);
      throw error;
    }
  }

  static async dangerouslyOverrideAll(dataArray) {
    return AsyncStorage.setItem(this.name, JSON.stringify(dataArray));
  }

  static getUniqueId(existingDataArray) {
    const latest = _.maxBy(existingDataArray, this._config.idExtractor);
    return latest? latest.id+1 : 1;
  }

  static log(message, item) {
    if(this._config.logging)
      if(item) console.log(message, item);
      else console.log(message);
  }

}
