const db = require('../../db');
const util = require('util');
db.query = util.promisify(db.query);

// ---------------------------------------------------------------------------------------------------------------------

exports.showBoard = function (req, res){
    user = req.session.user;
    res.render('board', { user: user });
}

// exports.showRandomPage = function (req, res){
//     num = req.body.num;
//     undeferror = new ReferenceError('num is not defined');
//     if (!num) throw undeferror;
//     const square = new Promise((resolve, reject) => {
//         err = new TypeError(`Expected a number, received a ${typeof(num)}`);
//         if (typeof(num) != 'number') reject(err);
//         var result = num * num;
//         resolve(result); 
//     });
//     square.then((result) => {
//         console.log(result);
//         res.render('index');
//     }).catch(err => {
//         console.log(err);
//         res.render('index');
//     })
// }












// ---------------------------------------------------------------------------------------------------------------------
// Async/Await/Promise tutorial Codes
// ---------------------------------------------------------------------------------------------------------------------



// Promise/Async/Await
// function square(num) {
//     return new Promise((resolve, reject) => {
//         if (!num) {
//             reject(new ReferenceError('num is not defined'));
//         }
//         if (typeof(num) != 'number'){
//             reject(new TypeError('Expected a number, received a ' + typeof(num)));
//         }
//         const result = num * num;
//         resolve(result);
//     });
// }

// exports.showRandomPage = async function (req, res){
//     num = req.body.num;
//     if (!num) {
//         throw new ReferenceError('num is not defined');
//     }
//     try {
//         result = await square(num);
//         console.log(result);
//         res.render('index');
//     } catch (err) {
//         console.log(err);
//     }
// }





// Async function
exports.showRandomPage = async function (req, res){
        setTimeout(() => {
        num = req.body.num;
        if (!num) throw new ReferenceError('num is not defined');
        if (typeof(num) != 'number') throw new TypeError(`Expected a number, received a ${typeof(num)}`);  
        result = num * num;
        console.log(result);
        res.render('index');
    } , 1000);
}














// 
// Custom Error Classes
// 
// class OddError extends Error {
//     constructor(varName = '') {
//       super(varName + ' must be even');
//     }
//     get name() {
//       return 'OddError';
//     }
//   }
  
class KrazyError extends Error {
    constructor(message){
        super(message);
        this.message = 'KrazyError: this is a krazyass error';
        this.name = 'KrazyError';
        this.code = 'VERY_KRAZY_ERROR';
    }
}
