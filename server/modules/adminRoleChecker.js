// function checkPermission(userTokenData) {
//     return new Promise((resolve, reject) => {
//       if (userTokenData.access === 'admin') {
//         resolve('Permission granted');
//       } else {
//         reject('Insufficient permission');
//       }
//     });
//   }

export default function adminRoleChecker(userTokenData){
    if (userTokenData !== 'admin') {
        throw new Error('InsufficientPermission');
    }
}