import {Platform, AsyncStorage} from 'react-native';

const HASHTAGS = 'hashtagArray';

export function getHashtags(resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(HASHTAGS, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        const hashtags = JSON.parse(data);
        if(resCB) resCB(hashtags, null);
        resProm(hashtags);
      } else {
        if(resCB) resCB({}, null);
        resProm({});
      }
    });
  });
}

export function addHashtag(tag, resCB) {
  return incrementHashtags([tag], (tags, error) => {
    if(resCB) resCB(tags, error);
  });
}

export function addHashtags(tags, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(HASHTAGS, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let hashtags = JSON.parse(data);
        _.forEach(tags, (tag) => {
          const lowTag = tag.toLowerCase();
          hashtags[lowTag] = hashtags[lowTag]? hashtags[lowTag]+1 : 1;
        });
        AsyncStorage.setItem(HASHTAGS, JSON.stringify(hashtags), (error) => {
          if(error) {
            if(resCB) resCB(hashtags, error);
            errProm(error);
          } else {
            if(resCB) resCB(hashtags, null);
            resProm(hashtags);
          }
        });
      }
    });
  });
}

export function subtractHashtags(tags, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(HASHTAGS, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let hashtags = JSON.parse(data);
        _.forEach(tags, (tag) => {
          const lowTag = tag.toLowerCase();
          if(hashtags[lowTag]) hashtags[lowTag]--;
        });
        AsyncStorage.setItem(HASHTAGS, JSON.stringify(hashtags), (error) => {
          if(error) {
            if(resCB) resCB(hashtags, error);
            errProm(error);
          } else {
            if(resCB) resCB(hashtags, null);
            resProm(hashtags);
          }
        });
      }
    });
  });
}

export function nukeHashtags(resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.removeItem(HASHTAGS, (error) => {
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
  getAll: getHashtags,
  add: addHashtags,
  addOne: addHashtag,
  subtract: subtractHashtags,
  nuke: nukeHashtags
};
