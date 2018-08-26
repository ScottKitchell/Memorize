import {Platform, AsyncStorage} from 'react-native';

const MEMORIES = 'memoryArray';

export function getMemories(resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        const memories = JSON.parse(data);
        if(resCB) resCB(memories, null);
        resProm(memories);
      }
    });
  });
}

export function getMemory(index, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        const memory = (JSON.parse(data))[index];
        if(resCB) resCB(memory, null);
        resProm(memory)
      }
    });
  });
}

export function pushMemory(memory, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let memories = JSON.parse(data);
        memories.unshift(memory);
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

export function updateMemories(memories, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let storedMemories = JSON.parse(data);
        if(memories.length < (storedMemories.length-10)) {
          const errorMsg = "Too many deleting changes made to memories. Limit the number of memories removed to 10 or less.";
          if(resCB) resCB(null, errorMsg);
          errProm(errorMsg);
          return;
        }
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

export function updateMemory(index, memory, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let memories = JSON.parse(data);
        memories[index] = memory;
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

export function deleteMemory(index, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(MEMORIES, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let memories = JSON.parse(data);
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
      }
    });
  });
}

export default {
  getAll: getMemories,
  get: getMemory,
  push: pushMemory,
  updateAll: updateMemories,
  update: updateMemory,
  delete: deleteMemory
};
