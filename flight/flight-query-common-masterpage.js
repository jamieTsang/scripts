(function($) { $.toJSON = function(o) { if (typeof (JSON) == "object" && JSON.stringify) { return JSON.stringify(o) } var type = typeof (o); if (o === null) { return "null" } if (type == "undefined") { return undefined } if (type == "number" || type == "boolean") { return o + "" } if (type == "string") { return $.quoteString(o) } if (type == "object") { if (typeof o.toJSON == "function") { return $.toJSON(o.toJSON()) } if (o.constructor === Date) { var month = o.getUTCMonth() + 1; if (month < 10) { month = "0" + month } var day = o.getUTCDate(); if (day < 10) { day = "0" + day } var year = o.getUTCFullYear(); var hours = o.getUTCHours(); if (hours < 10) { hours = "0" + hours } var minutes = o.getUTCMinutes(); if (minutes < 10) { minutes = "0" + minutes } var seconds = o.getUTCSeconds(); if (seconds < 10) { seconds = "0" + seconds } var milli = o.getUTCMilliseconds(); if (milli < 100) { milli = "0" + milli } if (milli < 10) { milli = "0" + milli } return '"' + year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + "." + milli + 'Z"' } if (o.constructor === Array) { var ret = []; for (var i = 0; i < o.length; i++) { ret.push($.toJSON(o[i]) || "null") } return "[" + ret.join(",") + "]" } var pairs = []; for (var k in o) { var name; var type = typeof k; if (type == "number") { name = '"' + k + '"' } else { if (type == "string") { name = $.quoteString(k) } else { continue } } if (typeof o[k] == "function") { continue } var val = $.toJSON(o[k]); pairs.push(name + ":" + val) } return "{" + pairs.join(", ") + "}" } }; $.evalJSON = function(src) { if (typeof (JSON) == "object" && JSON.parse) { return JSON.parse(src) } return eval("(" + src + ")") }; $.secureEvalJSON = function(src) { if (typeof (JSON) == "object" && JSON.parse) { return JSON.parse(src) } var filtered = src; filtered = filtered.replace(/\\["\\\/bfnrtu]/g, "@"); filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]"); filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, ""); if (/^[\],:{}\s]*$/.test(filtered)) { return eval("(" + src + ")") } else { throw new SyntaxError("Error parsing JSON, source is not valid.") } }; $.quoteString = function(string) { if (string.match(_escapeable)) { return '"' + string.replace(_escapeable, function(a) { var c = _meta[a]; if (typeof c === "string") { return c } c = a.charCodeAt(); return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16) }) + '"' } return '"' + string + '"' }; var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g; var _meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"} })(jQuery);

$(function() {

addOptions("search_aircompany", AirLineJson);
    setTimeout(function() {
        if (typeof queryPara != "undefined" && null != queryPara) {
            if (typeof queryPara.airways != "undefined") {
                $("#search_aircompany").val(queryPara.airways)
            }
        }

    }, 1);
    $("#search_departdate").val(DateAdd("d", 1, new Date(), "1"));
    $("#search_departdate").click(function(c) {
        showSearchCalendarn(this, 0, new Date(), AddDay("y", 1, new Date()),
				undefined, 0, undefined, c, compareDate_start_back);
        return false
    }).blur(function() {
        showSearchCalendarn(this, 1);
        return false
    });
    $("#search_arrivedate").click(function(e) {
        if ("undefined" != typeof (closeHistorylist)) {
            closeHistorylist()
        }
        var d = $("#search_departdate").val();
        var c;
        if (null == d || "" == d || "yyyy-mm-dd" == d) {
            c = new Date()
        } else {
            c = getDateFromString(d)
        }
        showSearchCalendarn(this, 0, AddDay("d", 0, c), AddDay("y", 1,
						new Date()), undefined, 0, undefined, e);
        return false
    }).blur(function() {
        showSearchCalendarn(this, 1);
        return false
    });
    $("#search_begincity,#search_endcity").click(function(d) {
        var c = $(this).next().attr("id");
        suggest.displayClick(this, c, d)
    }).keyup(function(c) {
        showCitySuggest(this, c)
    }).blur(function() {
        showSearch(this, 1);
        suggest.hidden_suggest()
    }).focus(function(c) {
        $(this).click();
        showSearch(this)
    }).attr("maxlength", 12);
    var a = $("#search_begincity").val();
    if (a == undefined || a == null || a == "") {
        $("#search_begincity").val("中文/拼音").css("color", "#C1C1C1")
    }
    var b = $("#search_endcity").val();
    if (b == undefined || b == null || b == "") {
        $("#search_endcity").val("中文/拼音").css("color", "#C1C1C1")
    }
    $("#id_lineType1").click(function(c) {
        $("#id_backDateLi,#id_backTimeLi").hide();
        $("#id_startTimeLi").addClass("xia");
        $("#id_backDate").val("")
    });
    $("#id_lineType2").click(function(e) {
        $("#id_backDateLi,#id_backTimeLi").show();
        var c;
        var d = $("#id_startDate").val();
        if (null == d || "" == d || "yyyy-mm-dd" == d) {
            c = "yyyy-mm-dd"
        } else {
            c = formatDate(AddDay("d", 1, getDateFromString($("#id_startDate")
									.val())), 1)
        }
        $("#id_backDate").val(c);
        $("#id_startTimeLi").removeClass("xia")
    });
    $("#id_research").click(function() {
        var c = flightsQueryCheck();
        var d = c.split("&");
        if (d[0] == "success") {
            if ("undefined" != typeof (saveHistory)) {
                saveHistory()
            }

            $("#id_dpt").val(getThreeWordByCity($("#search_begincity").val()));
            $("#id_arr").val(getThreeWordByCity($("#search_endcity").val()));

            if (1 == $("#id_queryFlag").size()) {
                $("#id_queryFlag").val("")
            }
            genQueryJsonString();
            $("#id_queryForm").attr("action", "ProcRequest/air_search.aspx");

            $(this).attr("disabled", true);

            $("#id_queryForm")[0].submit()
        } else {
            alert(d[1] + "!");
            window.setTimeout(function() {
                $("#" + d[0]).focus()
            }, 10)
        }
    });
    getQuertVal();
    $(document).click(function(c) {
        if ($(c.target).attr("id") != "id_searchHistory") {
            closeHistorylist()
        }
    });
    setTimeout(function() {
        $("input").focus(function(c) {
            if ($(c.target).attr("id") != "id_startDate"
							&& $(c.target).attr("id") != "id_backDate") {
                MangoCalendar.closeCalendar()
            } else {
                $("#" + $(c.target).attr("id")).click();
                return false
            }
        });
        $("input").click(function(c) {
            if ($(c.target).attr("id") != "id_searchHistory") {
                closeHistorylist()
            }
        })
    }, 1);
    $("#id_searchHistory").click(function() {
        if (!show) {
            var c = initHistorylist("no");
            $("#id_historyList").removeClass("lishi").empty().addClass("lishi");
            $("#id_historyList").append(c).bgiframe();
            show = true
        } else {
            closeHistorylist()
        }
    })
});

function genQueryJsonString() {
    var $psgs = $('#tbSearch');
    var psgs = [];
    var fields = $('input,select', $psgs).serializeArray();
    var query = { 'queryFlag': 'dep' };
    $.each(fields, function(i, field) {
        query[field.name] = field.value;
    });
    $("#id_queryPara").val($.toJSON(query));
}


var show = false;
function saveHistory() {
    var f = ($("#id_lineType1").attr("checked") ? "ow" : "rt");
    if ($("#lineType").val() != "") {
        f = $("#lineType").val();
    }
    var e = $("#search_begincity").val();
    var d = $("#search_endcity").val();
    var c = $("#id_startDate").val();
    var a = (f == "rt") ? $("#id_backDate").val() : "nodata";
    var b = new Array();
    b.push(f);
    b.push(e);
    b.push(d);
    b.push(c);
    b.push(a);
    getCondition();
    if (!compareAready(b)) {
        saveCondition(b)
    }
}
function compareAready(g) {
    var b = false;
    var f = arrays.length;
    var c = g.length;
    for (var e = 0; e < f; e++) {
        var a = true;
        for (var d = 0; d < c; d++) {
            if (arrays[e][d] != g[d]) {
                a = false;
                break
            }
        }
        if (a) {
            b = true;
            break
        }
    }
    return b
}
function clickHistory(a) {
    show = false;
    $("#id_historyList").removeClass("lishi");
    $("#id_historyList").empty();
    $("#id_lineType1").trigger("click");
    var f = new Date();
    var b = arrays[Number(a)];
    if (b[0] == "ow") {
        $("#id_lineType1").attr("checked", true);
        $("#id_lineType1").trigger("click")
    } else {
        $("#id_lineType1").attr("checked", false);
        $("#id_lineType2").attr("checked", true);
        $("#id_lineType2").trigger("click");
        var d = format_Date_cookie(b[4]);
        f < d ? $("#id_backDate").val(b[4]) : $("#id_backDate").val(formatDate(
				getDateFromString((c.getFullYear() + "-" + (c.getMonth() + 1)
						+ "-" + c.getDate())), 1))
    }
    $("#search_begincity").val(b[1]);
    $("#search_endcity").val(b[2]);
    var e = format_Date_cookie(b[3]);
    var c = format_Date_cookie(getNextDay(1));
    if (f <= e) {
        $("#id_startDate").val(b[3])
    } else {
        $("#id_startDate").val(formatDate(getDateFromString((c.getFullYear()
						+ "-" + (c.getMonth() + 1) + "-" + c.getDate())), 1))
    }
}
function initHistorylist(k) {
    getCondition();
    var d = '<ul><div style="float:right;"><a href="javascript:void(0)">[关闭]</a></div>';
    var h = 30;
    var c = ".";
    if (arrays != null && arrays != undefined && arrays.length > 0) {
        for (var e = (arrays.length - 1); e >= 0; e--) {
            var b = arrays[e];
            var a = "";
            a += (b[0] == "ow" ? "单程" : "往返") + " ";
            a += b[1] + "-" + b[2];
            var g = (b[4] == "nodata") ? "" : (" " + b[4]);
            var f = (b[1].length + b[2].length) * 2;
            if (g == "") {
                a += " " + getSign(c, h - f) + " " + b[3]
            } else {
                a += " " + getSign(c, h - f - 11) + " " + b[3] + g
            }
            var j = "";
            d = d
					+ "<li onclick='clickHistory(\""
					+ e
					+ '")\'><a href="javascript:void(0);" onclick=\'clickHistory("'
					+ e + "\")'>" + a + "</a>" + j + "</li>"
        }
    } else {
        d = d + "<li>查询历史 </li><li>暂无</li>"
    }
    d = d + "</ul>";
    return d
}
function getSign(a, c) {
    var d = "";
    for (var b = 0; b < c; b++) {
        d += a
    }
    return d
}
function closeHistorylist() {
    $("#id_historyList").removeClass("lishi").empty();
    show = false
}
function showCitySuggest(b, c) {
    var a = $(b).next().attr("id");
    suggest.display(b, a, c)
}
function compareDate_start_back(c) {
    var b = getDateFromString(c);
    if ($("#id_backDate").val() != undefined && $("#id_backDate").val() != null
			&& $("#id_backDate").val() != "") {
        var a = getDateFromString($("#id_backDate").val());
        if (b >= a) {
            $("#id_backDate").val(formatDate(AddDay("d", 1, b), 1))
        }
    } else {
        $("#id_backDate").val(formatDate(AddDay("d", 1, b), 1))
    }
}
function getQuertVal() {
    if ("undefined" != typeof (queryPara) && null != queryPara) {
        var a = queryPara.lineType;

        if (a == "ow") {
            $("#id_lineType1").attr("checked", true).trigger("click")
        } else {
            $("#id_lineType2").attr("checked", true).trigger("click")
            $("#id_rtdate").show();
        }
        $("#lineType").val(queryPara.lineType);

        $("#search_begincity").val(queryPara.depCityCn);
        if (null != queryPara.depCityCn && "" != queryPara.depCityCn) {
            $("#search_begincity").css("color", "black")
        }
        $("#search_endcity").val(queryPara.arrCityCn);
        if (null != queryPara.arrCityCn && "" != queryPara.arrCityCn) {
            $("#search_endcity").css("color", "black")
        }
        $("#id_startDate").val(queryPara.depDate);
        $("#id_backDate").val(queryPara.arrDate);
        setTimeout(function() {
            $("#id_airlineCode").val(queryPara.airways);
            $("#id_seatCode").val(queryPara.classNo);
            $("#id_startTime").val(queryPara.depTime);
            $("#id_backTime").val(queryPara.arrTime)
        }, 1);
        if ("arr" == queryPara.queryFlag) {
            $("#id_queryFlag").val("dep")
        }
    }
    $("#id_dpt").val(getThreeWordByCity($("#search_begincity").val()));
    $("#id_arr").val(getThreeWordByCity($("#search_endcity").val()))
}
/*
*	输入信息验证
*/
function flightsQueryCheck() {
    var c = "success";

    var f;
    if ($("#id_lineType1").attr("checked") == undefined) {
        f = $("#lineType").val();
    } else {
        f = ($("#id_lineType1").attr("checked") ? "ow" : "rt");
    }
    var e = $("#search_begincity").val();
    var d = $("#search_endcity").val();
    var b = $("#id_startDate").val();
    var a = $("#id_backDate").val();
    if (getThreeWordByCity(e) == "") {
        return "id_startCity&请填写正确的出发城市"
    }
    if (getThreeWordByCity(d) == "") {
        return "search_endcity&请填写正确的到达城市"
    }
    if (!b.isDateString()) {
        return "id_startDate&请填写正确的出发日期"
    }
    if (getThreeWordByCity(e) == getThreeWordByCity(d)) {
        return "search_endcity&出发城市与到达城市不能同名"
    }
    if (f == "rt" && !a.isDateString()) {
        return "id_backDate&请填写正确的返程日期"
    }
    if (f == "rt" && getDateFromString(b) > getDateFromString(a)) {
        return "id_backDate&返程日期应晚于出发日期"
    }
    return c
}

function rtflightsQueryCheck() {
    var c = "success";
    var b = $("#id_startDate1").val();
    var a = $("#id_backDate1").val();
    if (!b.isDateString()) {
        return "id_startDate1&请填写正确的出发日期"
    }
    if (!a.isDateString()) {
        return "id_backDate1&请填写正确的返程日期"
    }
    if (getDateFromString(b) > getDateFromString(a)) {
        return "id_backDate1&返程日期应晚于出发日期"
    }
    return c
}

/*
*	日期比较
*/
function compareDate(d) {
    var a = new Date();
    var c = a.getHours();
    var f = a.getMinutes();
    var b = d.substring(0, 2);
    var e = d.substring(2, 4);
    return (b - c) * 60 + (e - f)
};