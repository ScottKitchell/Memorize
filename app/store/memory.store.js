import {Platform, AsyncStorage} from 'react-native';
import HashtagStore from './hashtag.store';
import _ from 'lodash';

const MEMORIES = 'memoryArray';

function uniqueId(memories) {
  const latest = _.maxBy(memories, 'id');
  return latest? latest.id+1 : 0;
}

export function getMemories(resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else {
        const memories = data? JSON.parse(data) : [];
        if(resCB) resCB(memories, null);
        resProm(memories);
      }
    });
  });
}

export function getMemory(id, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        const memory = data? _.find(JSON.parse(data),{id}) : null;
        if(resCB) resCB(memory, null);
        resProm(memory)
      }
    });
  });
}

export function createMemory(memory, resCB) {

  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else {
        let memories = data? JSON.parse(data) : [];
        memory.id = uniqueId(memories);
        memories.unshift(memory);
        HashtagStore.add(memory.tags);
        AsyncStorage.setItem(MEMORIES, JSON.stringify(memories), (error) => {
          if(error) {
            if(resCB) resCB(memories, error);
            errProm(error);
          } else {
            if(resCB) resCB(memories, null);
            resProm(memories);
          }
        });
      }
    });
  });
}

// export function updateMemories(memories, resCB) {
//   return new Promise((resProm, errProm) => {
//     AsyncStorage.getItem(MEMORIES, (error, data) => {
//       if(error) {
//         if(resCB) resCB(null, error);
//         errProm(error);
//       } else {
//         let storedMemories = data? JSON.parse(data) : [];
//         if(memories.length < (storedMemories.length-10)) {
//           const errorMsg = "Too many deleting changes made to memories. Limit the number of memories removed to 10 or less.";
//           if(resCB) resCB(null, errorMsg);
//           errProm(errorMsg);
//           return;
//         }
//         AsyncStorage.setItem(MEMORIES, JSON.stringify(memories), (error) => {
//           if(error) {
//             if(resCB) resCB(memories, error);
//             errProm(error);
//           } else {
//             if(resCB) resCB(memories, null);
//             resProm(memories);
//           }
//         });
//       }
//     });
//   });
// }

export function updateMemory(id, memory, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let memories = JSON.parse(data);
        const index = _.findIndex(memories,{id});
        HashtagStore.subtract(memories[index].tags);
        memories[index] = memory;
        HashtagStore.add(memory.tags);
        AsyncStorage.setItem(MEMORIES, JSON.stringify(memories), (error) => {
          if(error) {
            if(resCB) resCB(memories, error);
            errProm(error);
          } else {
            if(resCB) resCB(memories, null);
            resProm(memories);
          }
        });
      } else {
        error = 'UPDATE ERROR: No memory found with id='+id+'.';
        if(resCB) resCB(null, error);
        errProm(error);
      }
    });
  });
}

export function deleteMemory(id, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let memories = JSON.parse(data);
        const index = _.findIndex(memories,{id});
        HashtagStore.subtract(memories[index].tags);
        memories.splice(index, 1);
        AsyncStorage.setItem(MEMORIES, JSON.stringify(memories), (error) => {
          if(error) {
            if(resCB) resCB(memories, error);
            errProm(error);
          } else {
            if(resCB) resCB(memories, null);
            resProm(memories);
          }
        });
      } else {
        error = 'DELETE ERROR: No memory found with id='+id+'.';
        if(resCB) resCB(null, error);
        errProm(error);
      }
    });
  });
}

export function nukeMemories(resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.removeItem(MEMORIES, (error) => {
      if(error) {
        if(resCB) resCB({}, error);
        errProm(error);
      } else {
        if(resCB) resCB({}, null);
        resProm({});
      }
    });
  });
}

export default {
  get: getMemories,
  getOne: getMemory,
  create: createMemory,
  //update: updateMemories,
  update: updateMemory,
  delete: deleteMemory,
  nuke: nukeMemories,
};
