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
      }
    });
  });
}

export function increamentHashtag(tag, resCB) {
  return incrementHashtags([tag], (tags, error) => {
    if(resCB) resCB(tags, error);
  });
}

export function incrementHashtags(tags, resCB) {
  return new Promise((resProm, errProm) => {
    AsyncStorage.getItem(HASHTAGS, (error, data) => {
      if(error) {
        if(resCB) resCB(null, error);
        errProm(error);
      } else if(data) {
        let hashtags = JSON.parse(data);
        _.forEach(tags, (tag) => {
          hashtags[tag] = hashtags[tag]? hashtags[tag]+1 : 1;
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

export default {
  getAll: getHashtags,
  increament: incrementHashtags,
  increamentOne: incrementHashtag
};
