(function($) {
    $.fn.truncate = function(options) {
        var defaults = {
            length: 300,
            minTrail: 20,
            moreText: "more",
            lessText: "less",
            ellipsisText: "..."
        };

        var options = $.extend(defaults, options);

        return this.each(function() {
            obj = $(this);
            var body = obj.html();

            if (body.length > options.length + options.minTrail) {
                var splitLocation = body.indexOf(' ', options.length);
                if (splitLocation != -1) {
                    // truncate tip
                    var splitLocation = body.indexOf(' ', options.length);
                    var str1 = body.substring(0, splitLocation);
                    var str2 = body.substring(splitLocation, body.length - 1);
                    obj.html(str1 + '<span class="truncate_ellipsis">' + options.ellipsisText + '</span>' + '<span  class="truncate_more">' + str2 + '</span>');
                    obj.find('.truncate_more').css("display", "none");

                    // insert more link
                    obj.append('<div class="clearboth">' + '<a href="#" class="truncate_more_link">' + options.moreText + '</a>' + '</div>');

                    // set onclick event for more/less link
                    var moreLink = $('.truncate_more_link', obj);
                    var moreContent = $('.truncate_more', obj);
                    var ellipsis = $('.truncate_ellipsis', obj);
                    moreLink.click(function() {
                        if (moreLink.text() == options.moreText) {
                            moreContent.show('normal');
                            moreLink.text(options.lessText);
                            ellipsis.css("display", "none");
                        } else {
                            moreContent.hide('normal');
                            moreLink.text(options.moreText);
                            ellipsis.css("display", "inline");
                        }
                        return false;
                    });
                }
            } // end if

        });
    };

    jQuery.fn.getRandomNumber = function() {
        return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
    };

    jQuery.fn.getRandomPassword = function(length) {
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        pass = "";
        for (x = 0; x < length; x++) {
            i = Math.floor(Math.random() * 62);
            pass += chars.charAt(i);
        }

        $(this).val(pass);
    };
    /*
    Calendar view
    */
    jQuery.fn.calendarView = function(options) {
        var defaults = {
            daysLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            monthsLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            busyDays: []
        };

        var options = $.extend(defaults, options);

        function daysInMonth(year, month) {
            var dd = new Date(year, month, 0);
            return dd.getDate();
        }

        var firstDay = new Date(options.year, options.month, 1);
        var startingDay = firstDay.getDay();

        var monthLength = daysInMonth(options.year, options.month);

        var monthName = options.monthsLabels[options.month];
        var html = '<table class="calendarview">';
        html += '<tr><th colspan="7" class="calendarview-title">';
        html += monthName + "&nbsp;" + options.year;
        html += '</th></tr>';
        html += '<tr class="calendarview-header">';
        for (var i = 0; i <= 6; i++) {
            html += '<td class="calendarview-header-day">';
            html += options.daysLabels[i];
            html += '</td>';
        }
        html += '</tr><tr>';

        // fill in the days
        var day = 1;
        // this loop is for is weeks (rows)
        for (var i = 0; i < 9; i++) {
            // this loop is for weekdays (cells)
            for (var j = 0; j <= 6; j++) {
                html += '<td class="calendar-day';
                if (options.busyDays.exists(new Date(options.year, options.month, day).format('mm/dd/yyyy'))) {
                    html += ' caledarview-busy';
                }
                html += '">';
                if (day <= monthLength && (i > 0 || j >= startingDay)) {
                    html += day;
                    day++;
                }
                html += '</td>';
            }
            // stop making rows if we've run out of days
            if (day > monthLength) {
                break;
            } else {
                html += '</tr><tr>';
            }
        }
        html += '</tr></table>';

        $(this).html(html);
    };
})(jQuery);
