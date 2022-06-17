(function() {
    if (!window.Bravenet) {
        window.Bravenet = {}
    }
    var e = window.Bravenet;
    if (e.Core) {
        e.Core.launch()
    }
    var t = /\/\/apps\.bravenet\.com\/go(\.\w*)?\.js(\?.*)?$/;
    var n = "";
    var r = function() {
        var e = null,
            r = null;
        var i = document.getElementsByTagName("script");
        for (var s = 0; e = i[s]; s++) {
            r = e.src.match(t);
            if (r) {
                n = r[1] || "";
                return e.src.replace(/go(\.\w*)?\.js(\?.*)?$/, "")
            }
        }
    }();
    var s = function() {
        function r(e) {
            var t = e.split(".");
            return parseInt(t[0], 10) * 1e6 + parseInt(t[1], 10) * 1e3 + parseInt(t[2], 10)
        }

        function i(e) {
            return e && r(t) <= r(e.prototype.jquery)
        }
        var t = "1.9.0";
        var n = function() {
            var e = document.getElementsByTagName("HEAD");
            if (e.length == 0) {
                return false
            }
            return !!e[0]
        }();
        return function() {
            if (!n) {
                this.writeRawScript(this.getErrorUrl("dom"));
                return
            }
            var t = [],
                r = null;
            if (!i(e.jQuery)) {
                t = ["jquery-1.5.1", "jquery.cors.adapter", "jquery.bnet-adapter"]
            }
            for (var s = 0; r = t[s]; ++s) {
                this.writeRawScript(this.getLibraryUrl(r))
            }
            if (i(e.jQuery)) {
                this.launch()
            }
        }
    }();
    s.prototype = function() {
        function h() {
            return this.bn_processed || !!this.src.match(t)
        }

        function p() {
            var t = {};
            e.jQuery("script").filter(h).each(function() {
                var n = this.src.match(/\?(.*)$/);
                if (!n) {
                    return
                }
                n[1] = decodeURIComponent(n[1]);
                e.jQuery.each(n[1].split(";"), function() {
                    var e = this.split("=");
                    t[e[0]] = e[1]
                });
                this.bn_processed = true
            });
            return t
        }

        function d() {
            var t = true;
            for (var n in f) {
                if (!f[n]) {
                    t = false;
                    break
                }
            }
            var r = e.jQuery;
            if (t) {
                r(document).trigger(u)
            }
        }

        function v(e) {
            var t = {
                id: "1"
            };
            try {
                if (a[e.service]) {
                    t["service"] = e.service
                }
                var n = parseInt(e.usernum, 10);
                if (!isNaN(n)) {
                    t["usernum"] = n.toString()
                }
                var r = parseInt(e.id, 10);
                if (!isNaN(r)) {
                    t["id"] = r.toString()
                }
                var i = parseInt(e.editor, 10);
                if (!isNaN(i) && i == 1) {
                    t["editor"] = i.toString()
                }
            } catch (s) {}
            for (var o in e) {
                delete e[o]
            }
            for (var o in t) {
                e[o] = t[o]
            }
            return e.service && e.usernum
        }

        function m(e) {
            if (!arguments.callee.uid) {
                arguments.callee.uid = 0
            }
            var t = ["bn"];
            t.push(e.service);
            t.push(e.id);
            t.push(arguments.callee.uid += 1);
            t.push(e.usernum);
            return t.join("-")
        }

        function g(e) {
            return ["bn", e.service, e.id, e.usernum, "xd"].join("")
        }

        function y(e) {
            return "bravenet.com" != "" && !e.match(/\/\/(\w*\.)*bravenet\.com/)
        }
        var n = "8.0.0",
            i = "libraries/",
            s = "services/",
            o = "errors/",
            u = "bravenet.ready.event",
            a = function() {
                var e = {},
                    t = "guestbook,photocenter,forum".split(",");
                for (var n = 0; n < t.length; ++n) {
                    e[t[n]] = true
                }
                return e
            }();
        var f = {};
        var l = {};
        var c = {};
        return {
            version: "1.2.0",
            getPubNumber: function(e) {
                return Math.ceil(e / 85899346)
            },
            getUrl: function(e) {
                return r + e
            },
            getLibraryUrl: function(e) {
                var t = i;
                t += e;
                t += ".js";
                return this.getUrl(t)
            },
            getServiceUrl: function(e) {
                var t = s;
                t += e;
                t += ".js";
                return this.getUrl(t)
            },
            getErrorUrl: function(e) {
                var t = o;
                t += e;
                t += ".error.js";
                return this.getUrl(t)
            },
            writeRawScript: function(e) {
                if (y(e)) {
                    return
                }
                document.write('<script type="text/javascript" src="' + e + '"></script>')
            },
            prependStyleSheet: function(t, n) {
                if (y(t)) {
                    return
                }
                //if (document.createStyleSheet) {
                //    document.createStyleSheet(t, 0)
                //} else {
                    var r = e.jQuery;
                    r("head", 0).prepend(r("<link></link>").attr({
                        rel: "stylesheet",
                        type: "text/css",
                        href: t
                    }))
                //}
            },
            getScript: function(t, n) {
                if (y(t)) {
                    return
                }
                return e.jQuery.ajax({
                    dataType: "script",
                    type: "GET",
                    url: t,
                    data: null,
                    cache: true,
                    success: n
                })
            },
            launch: function(t) {
                var n = e.jQuery;
                t = n.extend({
                    id: "1"
                }, t || p());
                if (!v(t)) {
                    this.writeRawScript(this.getErrorUrl("options"));
                    return
                }
                var r = g(t);
                var i = m(t);
                var s = t.service;
                if (c[s]) {
                    this.writeRawScript(this.getErrorUrl("duplicate"));
                    return
                }
                c[s] = true;
                var o = '<div id="' + i + '-wrapper" style="position: relative;">';
                if (!e._xd_ajax) {
                    o += '<div id="' + r + '" style="position: relative; top: 0; left: 0;">&nbsp;</div>'
                }
                o += '<div id="' + i + '" class="bn-service-widget">&nbsp;</div>';
                o += "</div>";
                document.writeln(o);
                this.writeProMarketPixel();
                var a = this;
                (function() {
                    var e = arguments.callee;
                    if (!e.opera_synced) {
                        e.opera_synced = true;
                        setTimeout(e, 10);
                        return
                    }
                    if (!l[s]) {
                        a.getScript(a.getServiceUrl(s), e);
                        return
                    }
                    a.ready(function() {
                        n(document).unbind(u, arguments.callee);
                        t.container = n("#" + i);
                        new l[s](t)
                    })
                })()
            },
            writeProMarketPixel: function () {
                var f = '<scr' + 'ipt src="//assets.bnidx.com/pixel/proMarket"></scr' + 'ipt>';
                document.writeln(f);
            },
            ready: function(t) {
                e.jQuery(document).bind(u, t);
                d()
            },
            register: function(e, t) {
                l[e] = t
            },
            require: function(e) {
                if (f[e]) {
                    return true
                }
                f[e] = false;
                this.getScript(this.getLibraryUrl(e), function() {
                    f[e] = true;
                    d()
                })
            }
        }
    }();
    e.urlencode = function(e) {
        var t = e;
        t = t.toString();
        t = encodeURIComponent(t);
        t = t.replace(/%20/g, "+");
        return t
    };
    e.urldecode = function(e) {
        var t = e;
        t = t.replace(/\+/g, "%20");
        t = decodeURIComponent(t);
        t = t.toString();
        return t
    };
    e.encode = function(t) {
        var n = "";
        for (i = 0; i < t.length; i++) {
            if (t.charCodeAt(i) > 127) {
                n += "&#" + t.charCodeAt(i) + ";"
            } else {
                n += t.charAt(i)
            }
        }
        return e.urlencode(n)
    };
    e.require = function(t) {
        e.Core.require.apply(e.Core, arguments)
    };
    e.register = function(t, n) {
        e.Core.register.apply(e.Core, arguments)
    };
    e.ready = function(t) {
        e.Core.ready.apply(e.Core, arguments)
    };
    e.Core = new s;
    var o = e.Service = function(e) {
        this.options = e;
        this.initialize.apply(this)
    };
    o.prototype = {
        initialize: function() {},
        getPubNumber: function() {
            return e.Core.getPubNumber(this.options.usernum)
        },
        addCss: function(t) {
            e.Core.prependStyleSheet(t)
        }
    };
    o.extend = function(t) {
        function r(e) {
            this.options = e;
            this.initialize.apply(this)
        }
        var n = function() {};
        n.prototype = o.prototype;
        r.prototype = new n;
        r.prototype.constructor = r;
        e.jQuery.extend(r.prototype, t);
        return r
    }
})()