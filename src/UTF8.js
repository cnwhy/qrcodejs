var BOM = [0xEF,0xBB,0xBF];
function str2Byte(str) {
	var parsedData = [];
	// Added to support UTF-8 Characters
	for (var i = 0, l = str.length; i < l; i++) {
		var byteArray = [];
		var code = str.charCodeAt(i);
		if (code > 0x10000) {
			byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
			byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
			byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
			byteArray[3] = 0x80 | (code & 0x3F);
		} else if (code > 0x800) {
			byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
			byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
			byteArray[2] = 0x80 | (code & 0x3F);
		} else if (code > 0x80) {
			byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
			byteArray[1] = 0x80 | (code & 0x3F);
		} else {
			byteArray[0] = code;
		}
		parsedData.push(byteArray);
	}

	// 添加BOM
	if (parsedData.length != str.length) { //判断是否可以不加BOM
		parsedData = Array.prototype.concat.apply(BOM, parsedData);
	}
	return parsedData;
}

module.exports = str2Byte;