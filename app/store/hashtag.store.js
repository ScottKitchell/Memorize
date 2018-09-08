import {Platform, AsyncStorage} from 'react-native';
import _ from 'lodash';

const HASHTAGS = 'hashtagArray';

export function getHashtags(resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(HASHTAGS, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else {
        const hashtags = data? JSON.parse(data) : {};
        if(resCB) resCB(hashtags, null);
        resProm(hashtags);
      }
    });
  });
}

export function addHashtags(tags, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(HASHTAGS, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else {
        let hashtags = data? JSON.parse(data) : {};
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
      } else {
        let hashtags = data? JSON.parse(data) : {};
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
  get: getHashtags,
  add: addHashtags,
  subtract: subtractHashtags,
  nuke: nukeHashtags
};
