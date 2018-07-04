function product(arr) {
    let ret = arr.reduce(function (x,y){
        console.log(`${x}, ${y}`);
        return x*y;
    });

    return ret;
}

var ret = product([1,2,3,4]);
console.log("result is: " + ret);

if (ret === 24) {
    console.log("Test Pass.");
} else {
    console.log("Test Fail");
}