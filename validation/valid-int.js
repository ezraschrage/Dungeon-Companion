const validInt= int => {
    return typeof int === 'number' && int >= 0;
  }
  
  module.exports = validInt;