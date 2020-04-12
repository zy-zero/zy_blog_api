const parseHandler = function a(prefix, urls, handle) {
    if (!handle) return;
    handle.stack.forEach((layer) => {
        if (layer.name === "router") {
            let llPrefix = prefix;
            // let matches = layer.regexp.toString().match(/\\(\/[^\/]*)\\\//);
            let middleStr = layer.regexp.toString().split('?')[0].replace('^','').replace(/\\/g,'');
            let str = middleStr.substr(1,middleStr.length-2);
            if (str) {
                llPrefix += str;
            }
            a(llPrefix, urls, layer.handle);
        }
        if (layer.name === "bound dispatch") {
            urls.push(prefix + layer.route.path)
        }
    })
};
module.exports= parseHandler;
