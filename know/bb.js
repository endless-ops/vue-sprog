var origin = {
    greeeting : 'welcome'
}

var copy = origin;
origin.farewell = 'byebye'
console.log(copy.greeeting,copy.farewell)


var origin = {
    greeeting : 'welcome'
}

var copy = origin;
origin = {
    farewell:'byebye'  // 深度拷贝
}
console.log(copy.greeeting,copy.farewell)



var origin = {
    greeting:'welcome'
}

var copy = JSON.parse(JSON.stringify(origin));  // 深度拷贝
origin.farewell = 'byebye'
console.log(copy.greeeting,copy.farewell)