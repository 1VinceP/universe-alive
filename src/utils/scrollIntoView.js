import kebabCase from 'lodash/kebabCase';

export default hash => {
   const kebabHash = `#${kebabCase(hash)}`;
   if (hash) {
      const element = document.getElementsByName(kebabHash).item(0);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   }
};
