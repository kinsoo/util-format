'use strict';

var moment = require('moment');

/**
 * 格式化日期
 * @param  {Number|String} _date 如果为整数，就是在在当前日期加减N天，如果是字符串就是该日期
 * @param  {String} format     原来格式定义
 * @param  {String} new_format 新格式定义
 * @return {String}            新格式的日期
 */
function date(_date, format, new_format) { //日期格式化
	format = format || 'YYYY-MM-DD'; //解决没传的兼容性
	if ((typeof _date) === 'number') {
		return moment().add(_date, 'days').format(format);
	} else {
		return moment(_date, format).format(new_format || 'MM-DD HH:mm');
	}
}

/**
 * 格式化货币
 * @param  {String|Number} num 原有数值
 * @param  {Number} dot 小数点位数(默认2位)
 * @return {String}     格式化后的数值
 */
function currency(num, dot) { //格式化货币 000,000,000方式显示
	if (dot === 0) {
		num = Number(num).toFixed(0);
	} else {
		dot = dot || 2;
		num = Number(num).toFixed(dot);
	}
	var n = '' + num;
	var r = n.replace(/(^|-|\s)\d+(?=\.?\d*($|\s))/g, function(m) {
		return m.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
	});
	if (dot === 0) {
		return r;
	} else {
		var i = r.indexOf('.');
		if (i >= 0) {
			return r.substring(0, i + 1 + dot);
		} else {
			r += '.';
			for (i = dot; i > 0; dot--) {
				r += '0';
			}
			return r;
		}
	}
}

/**
 * 填补较长的字符串
 * @param  {String} str    原字符串
 * @param  {Number} length 最大长度
 * @return {String}        新字符串
 */
function string_max(str, length, str_ext) {
	str_ext = str_ext || '...';
	return str.length > length ? (str.substring(0, length) + str_ext) : str;
}

/**
 * 遮蔽敏感字符串
 * @param  {String} text   原字符串
 * @param  {Number} start  开始遮蔽的地方
 * @param  {String} length 遮蔽字符的长度
 * @return {String}        新字符串
 */
function mask(text, start, length) {
	if (text) {
		var m = '';
		for (var i = 0; i < length; i++) {
			m += '*';
		}
		return text.substr(0, start) + m + text.substr(start + length);
	}
	return '';
}

/**
 * 遮蔽手机号
 */
function mask_mobile(text) {
	return mask(text, 2, 5);
}

/**
 * 遮蔽姓名
 */
function mask_name(text) {
	return mask(text, 1, text.length - 1);
}

/**
 * 遮蔽银行卡
 */
function mask_bankcard(text) {
	return mask(text, 4, text.length - 8);
}

module.exports = {
	"date": date,
	"currency": currency,
	"string_max": string_max,
	"mask": mask,
	"mask_mobile": mask_mobile,
	"mask_name": mask_name,
	"mask_bankcard": mask_bankcard
};