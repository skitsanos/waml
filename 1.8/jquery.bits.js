(function($) {
/*
    $.distill("keyup,select,click", {
        myobj: {
            select: function() {
                alert("textarea 1 select");
            },
            keyup: function() {
                alert("textarea 1 keyup");
            }
        },
        myobj2: {
            click: function() {
                alert("textarea 2 click");
            },
            keyup: function() {
                alert("textarea 2 keyup");
            }

        }
    });
*/
    $.distill = function(evType, obj) {

        var dispatcher = function(ev, et, handler) {
            try {
                var classes = [];
                var clsStr = $(ev.target || ev.srcElement).attr("class");
                if (clsStr.indexOf(" ") > -1) {
                    classes = clsStr.split(" ")
                } else {
                    classes = [clsStr];
                }

                for (var j in classes) {
                    var hname = classes[j].replace(/com_/, '');

                    if (handler[hname]) {
                        if (handler[hname][et]) {
                            handler[hname][et](ev, et);
                        }
                    }
                }
            } catch (e) { }
        }

        var evTypes;

        if (evType.indexOf(",") > -1) {
            evTypes = evType.split(",");
        }
        else {
            evTypes = [evType];
        }

        for (var j in evTypes) {

            $("body")[evTypes[j]]((function(evt) {
                return function(e) {
                    dispatcher(e, evt, obj);
                }
            })(evTypes[j]));
        }
    };

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
    iframe
    *
 *  Usage:
 *      $('a.iframe').iframe();
 *
 *
 *
 *  Notes:
 *  -----
 *
 *  Options are passed to the 'flash' function using a single Object.  The options
 *  Object is a hash of key/value pairs.  The following option keys are supported:
 *
 *  Options:
 *  -------
 *  width:      	width of iframe (default: 640)			w:640
 *  height:      	height of iframe (default: 480)			h:480		
 *  scrolling:   	auto									sc:auto
 *  frameborder:	height of iframe (default: 0)			fb:0	
 *  marginwidth:	margin of iframe (default: 0)			wm:0		
 *  marginheight:	margin of iframe (default: 0)			hm:0	
 *
 *  * height, width, version and background values can be embedded in the classname using the following syntax:
 *    <a class="iframe w:450 h:450 scr:no"></a>
 */
 
 jQuery.fn.iframe = function(options) {
    return this.each(function() {
        var $this = jQuery(this);
        var cls = this.className;
        
        var opts = jQuery.extend({
            frameborder:  ((cls.match(/fb:(\d+)/)||[])[1]) || 0,
            marginwidth:  ((cls.match(/wm:(\d+)/)||[])[1]) || 0,
            marginheight: ((cls.match(/hm:(\d+)/)||[])[1]) || 0,
            width:        ((cls.match(/w:(\d+)/)||[])[1]) || 640,
            height:       ((cls.match(/h:(\d+)/)||[])[1]) || 480,
            scrolling:    ((cls.match(/sc:(\w+)/)||[])[1]) || "auto",
            version:     '1,0,0,0',
            cls:          cls,
            src:          $this.attr('href') || $this.attr('src'),
			id:			  $this.attr('id'),
            caption:      $this.text(),
            attrs:        {},
            elementType:  'div',
            xhtml:        true
        }, options || {});
        
        var endTag = opts.xhtml ? ' />' : '>';

        var a = ['<iframe src="' + opts.src + '"'];
		if(opts.id){
			a.push(' id="' + opts.id + '"');
		}else{
			a.push(' id="content_iframe"');
		}
		a.push(' frameborder="' + opts.frameborder + '"');
		a.push(' marginwidth="' + opts.marginwidth + '"');
		a.push(' marginheight="' + opts.marginheight + '"');
		a.push(' width="' + opts.width + '"');
		a.push(' height="' + opts.height + '"');
		a.push(' scrolling="' + opts.scrolling + '"');
		a.push(endTag);
        
        // convert anchor to span/div/whatever...
        var $el = jQuery('<' + opts.elementType + ' class="' + opts.cls + '"></' + opts.elementType + '>');
        $el.html(a.join(''));
        $this.after($el).remove();
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
                            $td.addClass('calendarview-busy');
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
