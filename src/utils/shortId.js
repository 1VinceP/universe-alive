import shuffle from 'lodash/shuffle';

const chars = {
   basic: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
   complex: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ',
};
const nums = {
   basic: '12345678901234567890123456789012345678901234567890',
   complex: '1234567890123456789012345678901234567890!@$&._!@$&._!@$&._!@$&._!@$&._',
};

// default length is 8 characters, 4 alphabetical and 4 numerical
export default (input = 8, type = 'basic') => {
   let isOdd = false;
   if (input % 2 !== 0) {
      isOdd = true;
   }

   let length = input / 2;

   if (length <= 0) {
      console.warn('Short id\'s must have more than 0 characters. The id has been lengthened for you.');
      length = 1;
   }

   if (length > 40) {
      console.warn('Short id\'s should have fewer than 80 characters. The id has been shortened for you.');
      length = 40;
   }

   const set1 = shuffle(chars[type].split('')).slice(0, isOdd ? Math.ceil(length) : length);
   const set2 = shuffle(nums[type].split('')).slice(0, isOdd ? Math.floor(length) : length);
   return shuffle([...set1, ...set2]).join('');
};
