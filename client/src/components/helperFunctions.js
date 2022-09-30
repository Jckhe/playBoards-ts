export const START = 'START';
export const DONE = 'DONE';
export const DELETE = 'DELETE';
export const statusArr = ['todo', 'inprogress', 'done'];
export function removeItemWithSlice(arr, index) {
    const firstArr = arr.slice(0, index);
    const secondArr = arr.slice(index + 1);
    return [...firstArr , ...secondArr]
  }
export function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

