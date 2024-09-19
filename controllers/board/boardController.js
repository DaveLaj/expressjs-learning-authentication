exports.showBoard = function (req, res){
    user = req.session.user;
    res.render('board', { user: user });
}

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
