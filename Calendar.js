function DateLinkMapping(date, link, text) {
    this.Date = date;
    this.Link = link;
    this.Text = text;
}
var Calendar = {
    settings:
            {
                firstDayOfWeek: 7, //##设定星期天为第1天
                baseClass: "calendar",
                curDayClass: "curDay",
                prevMonthCellClass: "prevMonthDay",
                nextMonthCellClass: "nextMonthDay",
                curMonthNormalCellClass: "",
                prevNextMonthDaysVisible: true
            },
    containerId: "",
    weekDayNames: [],
    dateLinkMappings: [],
    Init: function (weekDayNames, dateLinkMappings, settings) {
        if (!weekDayNames || weekDayNames.length && weekDayNames.length != 7) {
            this.weekDayNames[1] = "星期一";
            this.weekDayNames[2] = "星期二";
            this.weekDayNames[3] = "星期三";
            this.weekDayNames[4] = "星期四";
            this.weekDayNames[5] = "星期五";
            this.weekDayNames[6] = "星期六";
            this.weekDayNames[7] = "星期日";
        }
        else {
            this.weekDayNames = weekDayNames;
        }
        if (dateLinkMappings) {
            this.dateLinkMappings = dateLinkMappings;
        }
    },
    RenderCalendar: function (divId, month, year) {
        this.containerId = divId;
        var ht = [];
		//ht.push("<span class='month'>"+month+"月</span>");
        ht.push("<table class='", this.settings.baseClass, "' cellspacing='0' cellpadding='0' border='0'>");
        ht.push(this._RenderTitle(month, year));
        ht.push(this._RenderBody(month, year));
        ht.push("</table>");

        document.getElementById(divId).innerHTML = ht.join("");
        this._InitEvent(divId, month, year);
        $("#" + divId + " td").has("a").removeClass("pqSelected").addClass(function () { if ($(this).attr("id") == $("#spdepartdate").val()) { return 'pqSelected pq'; } else { return "pq"; } });
    },
    _RenderTitle: function (month, year) {
        var ht = [];
        //日期
        ht.push("<tr class='monthRow'>");
        ht.push("<th colspan='7'><a id='", this.containerId, "_prevMonth' class='preMonth' title='上一月'>&lt;&nbsp;上一月</a><a id='", this.containerId, "_nextMonth' title='下一月' class='nextMonth'>下一月&nbsp;&gt;</a><div class='fulltime'>", year, "年", month, "月</div><a id='", this.containerId, "_thisMonth' class='thisMonth' title='本月'>本月</a></th>");
        ht.push("</tr>");
        //星期
        ht.push("<tr class='weekRow'>");
        for (var i = 0; i < 7; i++) {
            var day = (i + this.settings.firstDayOfWeek) == 7 ? 7 : (i + this.settings.firstDayOfWeek) % 7;
            ht.push("<th>", this.weekDayNames[day], "</th>")
        }
        ht.push("</tr>");
        return ht.join("");
    },
    _RenderBody: function (month, year) {

        var date = new Date(year, month - 1, 1);
        var day = date.getDay();
        var dayOfMonth = 1;
        var daysOfPrevMonth = (7 - this.settings.firstDayOfWeek + day) % 7;
        var totalDays = this._GetTotalDays(month, year);
        var totalDaysOfPrevMonth = this._GetToalDaysOfPrevMonth(month, year);
        var ht = [];
        var curDate;
        var themonth; //解决月id重复问题20130924
        var theyear; //解决跨年问题
        for (var i = 0; ; i++) {
            curDate = null;
            if (i % 7 == 0) {//新起一行
                ht.push("<tr>");
            }
            ht.push("<td");
            if (i >= daysOfPrevMonth && dayOfMonth <= totalDays) {//本月
                curDate = new Date(year, month - 1, dayOfMonth);
                if (Date.parse(new Date().toDateString()) - curDate == 0) {
                    ht.push(" class='", this.settings.curDayClass);
                }
                else {
                    ht.push(" class='", this.settings.curMonthNormalCellClass);
                }
                dayOfMonth++;
                themonth = month;
                theyear = year;
            }
            else if (i < daysOfPrevMonth) {//上月
                if (this.settings.prevNextMonthDaysVisible) {
                    var prevMonth = month;
                    var prevYear = year;
                    if (month == 1) {
                        prevMonth = 12;
                        prevYear = prevYear - 1;
                    }
                    else {
                        prevMonth = prevMonth - 1;
                    }
                    themonth = prevMonth;
                    theyear = prevYear;
                    curDate = new Date(prevYear, prevMonth - 1, totalDaysOfPrevMonth - (daysOfPrevMonth - i - 1));

                    ht.push(" class='", this.settings.prevMonthCellClass);
                }
            }
            else {//下月
                if (this.settings.prevNextMonthDaysVisible) {
                    var nextMonth = month;
                    var nextYear = year;
                    if (month == 12) {
                        nextMonth = 1;
                        nextYear = year + 1; //##修复
                    }
                    else {
                        nextMonth = nextMonth + 1;
                    }
                    themonth = nextMonth;
                    theyear = nextYear;
                    curDate = new Date(nextYear, nextMonth - 1, i - dayOfMonth - daysOfPrevMonth + 2);
                    ht.push(" class='", this.settings.nextMonthCellClass);
                }
            }
            if (i % 7 == 0 || i % 7 == 6) {//##判断星期六日
                ht.push(" weekend");
            }
            ht.push("'");
            ht.push("id=");
            ht.push(theyear);
            ht.push("-");
            ht.push(themonth);
            ht.push("-");
            ht.push(curDate.getDate());
            ht.push(" onclick=\"pqSelected(this,\'" + theyear + "-" + themonth + "-" + curDate.getDate() + "\')\"");
            ht.push(" >");
            ht.push(this._BuildCell(curDate))
            //ht.push(this._BuildCell(curDate,ht));
            ht.push("</td>");
            if (i % 7 == 6) {//结束一行
                ht.push("</tr>");
            }
            if (i % 7 == 6 && dayOfMonth - 1 >= totalDays) {
                break;
            }
        }
        return ht.join("");
    },
    _BuildCell: function (curDate, _ht) {
        var ht = [];
        if (curDate) {
            for (var j = 0; j < this.dateLinkMappings.length; j++) {
                if (this.dateLinkMappings[j].Date == curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate()) {
                    ht.push("<a href='", this.dateLinkMappings[j].Link, "'>", curDate.getDate(), this.dateLinkMappings[j].Text, "</a>");

                    break;
                }
            }
            if (Date.parse(new Date().toDateString()) - curDate == 0) {//##今天日期添加
                ht.push("<span class='tagToday'>今天</span>");
            }
            if (j == this.dateLinkMappings.length) {
                ht.push(curDate.getDate());
            }
        }
        else {
            ht.push("&nbsp;");
        }
        return ht.join("");
    },
    _InitEvent: function (divId, month, year) {
        var t = this;
        /* document.getElementById(this.containerId + "_prevMonth").style.cursor = "pointer";
        document.getElementById(this.containerId + "_nextMonth").style.cursor = "pointer"; */

        document.getElementById(this.containerId + "_prevMonth").onclick = function () {
            if (month == 1) {
                month = 12;
                year = year - 1;
            }
            else {
                month = month - 1;
            }

            t.RenderCalendar(divId, month, year);

        };
        document.getElementById(this.containerId + "_nextMonth").onclick = function () {
            if (month == 12) {
                month = 1;
                year = year + 1;
            }
            else {
                month = month + 1;
            }

            t.RenderCalendar(divId, month, year);
        };
        document.getElementById(this.containerId + "_thisMonth").onclick = function () {//##跳转到本月
            var today = new Date();
            t.RenderCalendar(divId, today.getMonth() + 1, today.getFullYear());

        }

    },
    //计算指定月的总天数
    _GetTotalDays: function (month, year) {
        if (month == 2) {
            if (this._IsLeapYear(year)) {
                return 29;
            }
            else {
                return 28;
            }
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        else {
            return 31;
        }
    },
    _GetToalDaysOfPrevMonth: function (month, year) {
        if (month == 1) {
            month = 12;
            year = year - 1;
        }
        else {
            month = month - 1;
        }
        return this._GetTotalDays(month, year);
    },
    //判断是否是闰年
    _IsLeapYear: function (year) {
        return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
    }
};