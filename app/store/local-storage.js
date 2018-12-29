import { Platform, AsyncStorage } from 'react-native';
import { find, findIndex, maxBy } from 'lodash';

export default class LocalStorage {

  static _uniqueId = (dataArray) => {
    const latest = maxBy(dataArray, 'id');
    return latest? latest.id+1 : 0;
  }

  static get = (key, resCB) => {
    return new Promise((resProm, errProm) => {
      AsyncStorage.getItem(key, (error, data) => {
        if(error) {
          console.error(`GET ERROR: ${error}`);
          if(resCB) resCB(null, error);
          errProm(error);
        } else {
          const dataArray = data? JSON.parse(data) : [];
          if(resCB) resCB(dataArray, null);
          resProm(dataArray);
        }
      });
    });
  }

  static getOne = (key, id, resCB) => {
    return new Promise((resProm, errProm) => {
      AsyncStorage.getItem(key, (error, data) => {
        if(error) {
          console.error(`GET ONE ERROR: ${error}`);
          if(resCB) resCB(null, error);
          errProm(error);
        } else if(data) {
          const dataItem = data? find(JSON.parse(data),{id}) : null;
          if(resCB) resCB(dataItem, null);
          resProm(dataItem)
        }
      });
    });
  }

  static create = (key, dataItem, resCB) => {
    return new Promise((resProm, errProm) => {
      AsyncStorage.getItem(key, (error, data) => {
        if(error) {
          console.error(`CREATE ERROR: ${error}`);
          if(resCB) resCB(null, error);
          errProm(error);
        } else {
          let dataArray = data? JSON.parse(data) : [];
          dataItem.id = LocalStorage._uniqueId(dataArray);
          dataArray.unshift(dataItem);
          AsyncStorage.setItem(key, JSON.stringify(dataArray), (error) => {
            if(error) {
              console.error(`CREATE ERROR: ${error}`);
              if(resCB) resCB(dataArray, error);
              errProm(error);
            } else {
              if(resCB) resCB(dataArray, null);
              resProm(dataArray);
            }
          });
        }
      });
    });
  }

  // static updateAll(key, dataArray, resCB) {
  //   return new Promise((resProm, errProm) => {
  //     AsyncStorage.getItem(key, (error, data) => {
  //       if(error) {
  //         if(resCB) resCB(null, error);
  //         errProm(error);
  //       } else {
  //         let storedMemories = data? JSON.parse(data) : [];
  //         if(dataArray.length < (storedMemories.length-10)) {
  //           const errorMsg = "Too many deleting changes made to dataArray. Limit the number of dataArray removed to 10 or less.";
  //           if(resCB) resCB(null, errorMsg);
  //           errProm(errorMsg);
  //           return;
  //         }
  //         AsyncStorage.setItem(key, JSON.stringify(dataArray), (error) => {
  //           if(error) {
  //             if(resCB) resCB(dataArray, error);
  //             errProm(error);
  //           } else {
  //             if(resCB) resCB(dataArray, null);
  //             resProm(dataArray);
  //           }
  //         });
  //       }
  //     });
  //   });
  // }

  static update = (key, id, dataItem, resCB) => {
    return new Promise((resProm, errProm) => {
      AsyncStorage.getItem(key, (error, data) => {
        if(error) {
          console.error(`UPDATE ERROR: ${error}`);
          if(resCB) resCB(null, error);
          errProm(error);
        } else if(data) {
          let dataArray = JSON.parse(data);
          const index = findIndex(dataArray,{id});
          dataArray[index] = dataItem;
          AsyncStorage.setItem(key, JSON.stringify(dataArray), (error) => {
            if(error) {
              if(resCB) resCB(dataArray, error);
              errProm(error);
            } else {
              if(resCB) resCB(dataArray, null);
              resProm(dataArray);
            }
          });
        } else {
          error = `UPDATE ERROR: No ${key} item found with id=${id}.`;
          console.error(error);
          if(resCB) resCB(null, error);
          errProm(error);
        }
      });
    });
  }

  static dangerouslyUpdateAll = (key, dataArray, resCB) => {
    return new Promise((resProm, errProm) => {
      AsyncStorage.getItem(key, (error, data) => {
        if(error) {
          console.error(`UPDATE ALL ERROR: ${error}`);
          if(resCB) resCB(null, error);
          errProm(error);
        } else {
          if(dataArray.length < (JSON.parse(data) || []).length) {
            error = `UPDATE ALL ERROR: There are less ${key} items provided than stored items.`;
            console.error(error);
            if(resCB) resCB(null, error);
            errProm(error);
          } else {
            AsyncStorage.setItem(key, JSON.stringify(dataArray), (error) => {
              if(error) {
                if(resCB) resCB(dataArray, error);
                errProm(error);
              } else {
                if(resCB) resCB(dataArray, null);
                resProm(dataArray);
              }
            });
          }
        }
      });
    });
  }

  static delete = (key, id, resCB) => {
    return new Promise((resProm, errProm) => {
      AsyncStorage.getItem(key, (error, data) => {
        if(error) {
          console.error(`DELETE ERROR: ${error}`);
          if(resCB) resCB(null, error);
          errProm(error);
        } else if(data) {
          let dataArray = JSON.parse(data);
          const index = findIndex(dataArray,{id});
          dataArray.splice(index, 1);
          AsyncStorage.setItem(key, JSON.stringify(dataArray), (error) => {
            if(error) {
              console.error(`DELETE ERROR: ${error}`);
              if(resCB) resCB(dataArray, error);
              errProm(error);
            } else {
              if(resCB) resCB(dataArray, null);
              resProm(dataArray);
            }
          });
        } else {
          error = `DELETE ERROR: No ${key} item found with id=${id}.`;
          console.error(error);
          if(resCB) resCB(null, error);
          errProm(error);
        }
      });
    });
  }

  static nuke = (key, resCB) => {
    return new Promise((resProm, errProm) => {
      AsyncStorage.removeItem(key, (error) => {
        if(error) {
          console.error(`NUKE ERROR: ${error}`);
          if(resCB) resCB({}, error);
          errProm(error);
        } else {
          if(resCB) resCB({}, null);
          resProm({});
        }
      });
    });
  }
}
