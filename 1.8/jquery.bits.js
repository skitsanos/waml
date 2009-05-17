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
    //:got
    $.extend($.expr[':'], {
        got: function(el, i, m) {
            return ($(el).html() == m[3]);
        }
    });
    /*
    Calendar view
    */
    jQuery.fn.calendarView = function(options) {
        var self = this;

        var defaults = {
            daysLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            monthsLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            busyDays: []
        };

        var options = $.extend(defaults, options);

        $.fn.extend({
            update: function(dates) {
                options.busyDays = dates;
                render();
            }

        });

        function daysInMonth(year, month) {
            return 32 - new Date(year, month, 32).getDate();
        }

        function render() {
            var firstDay = new Date(options.year, options.month, 1);
            var startingDay = firstDay.getDay();

            var monthLength = daysInMonth(options.year, options.month);

            var monthName = options.monthsLabels[options.month];

            var $table = $('<table class="calendarview" month="' + options.month + '" monthName="' + monthName + '"><thead><tr><th colspan="7" class="calendarview-title">' + monthName + "&nbsp;" + options.year + '</th></tr></thead></table>');

            var $weekDays = $('<tr class="calendarview-header"></tr>');
            for (var i = 0; i <= 6; i++) {
                var $td = $('<td class="calendarview-header-day"></td>');
                $td.html(options.daysLabels[i]);
                $weekDays.append($td);
            }
            $table.append($weekDays);

            var day = 1;
            for (var row = 0; row <= (Math.floor(monthLength / 7) + 1); row++) {
                var $tr = $('<tr></tr>');

                for (var col = 0; col <= 6; col++) {
                    var $td = $('<td></td>');
                    var weekDayNumber = new Date(options.year, options.month, day).getDay();

                    if (day <= monthLength && (row > 0 || col >= startingDay)) {
                        $td.html(day);

                        $td.addClass('calendarview-day');
                        $td.attr({
                            date: new Date(options.year, options.month, day).format('mm/dd/yyyy')
                        });

                        if (options.busyDays.exists(new Date(options.year, options.month, day).format('mm/dd/yyyy'))) {
                            $td.addClass('caledarview-busy');
                        }
                        day++;
                    }

                    $tr.append($td);
                }
                $table.append($tr);
            }

            $(self).html('');
            $(self).append($table);            
        }
        
        render();
    };
})(jQuery);
