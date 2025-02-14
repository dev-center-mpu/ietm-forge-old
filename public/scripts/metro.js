!(function(e) {
  "function" == typeof define && define.amd ? define("metro4", e) : e();
})(function() {
  "use strict";
  !(function(e, h) {
    var s = ["opacity", "zIndex"];
    function o(e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }
    function m(e) {
      return e === h || null === e;
    }
    function v(e) {
      return e.replace(/-([a-z])/g, function(e, t) {
        return t.toUpperCase();
      });
    }
    function g(e) {
      var t;
      return (
        !(!e || "[object Object]" !== Object.prototype.toString.call(e)) &&
        (!(t = e.prototype !== h) ||
          (t.constructor && "function" == typeof t.constructor))
      );
    }
    function a(e) {
      for (var t in e) if (e.hasOwnProperty(t)) return !1;
      return !0;
    }
    function r(e) {
      return e instanceof Object && "length" in e;
    }
    function i(e, t) {
      return (
        (t = t || " "),
        e
          .split(t)
          .map(function(e) {
            return ("" + e).trim();
          })
          .filter(function(e) {
            return "" !== e;
          })
      );
    }
    function f(e, t) {
      return (
        t || (t = [0, ""]),
        (e = String(e)),
        (t[0] = parseFloat(e)),
        (t[1] = e.match(/[\d.\-+]*\s*(.*)/)[1] || ""),
        t
      );
    }
    function l(e, t, n) {
      (t = v(t)),
        -1 < ["scrollLeft", "scrollTop"].indexOf(t)
          ? (e[t] = parseInt(n))
          : (e.style[t] = isNaN(n) || -1 < s.indexOf("" + t) ? n : n + "px");
    }
    function n(e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }
    function c(t) {
      try {
        return JSON.parse(t);
      } catch (e) {
        return t;
      }
    }
    function d(e, t, n) {
      var i;
      if (m(n) && 1 === e.nodeType)
        if (
          ((i = "data-" + t.replace(/[A-Z]/g, "-$&").toLowerCase()),
          "string" == typeof (n = e.getAttribute(i)))
        ) {
          try {
            n = c(n);
          } catch (e) {}
          y.set(e, t, n);
        } else n = h;
      return n;
    }
    !(function(t, i) {
      if (!t.setImmediate) {
        var s,
          n,
          a = 1,
          o = {},
          r = !1,
          e = Object.getPrototypeOf && Object.getPrototypeOf(t);
        (e = e && e.setTimeout ? e : t),
          (n = "setImmediate$" + Math.random() + "$"),
          t.addEventListener(
            "message",
            function(e) {
              e.source === t &&
                "string" == typeof e.data &&
                0 === e.data.indexOf(n) &&
                c(+e.data.slice(n.length));
            },
            !1
          ),
          (s = function(e) {
            t.postMessage(n + e, "*");
          }),
          (e.setImmediate = function(e) {
            "function" != typeof e && (e = new Function("" + e));
            for (
              var t = new Array(arguments.length - 1), n = 0;
              n < t.length;
              n++
            )
              t[n] = arguments[n + 1];
            return (o[a] = { callback: e, args: t }), s(a), a++;
          }),
          (e.clearImmediate = l);
      }
      function l(e) {
        delete o[e];
      }
      function c(e) {
        if (r) setTimeout(c, 0, e);
        else {
          var t = o[e];
          if (t) {
            r = !0;
            try {
              !(function(e) {
                var t = e.callback,
                  n = e.args;
                switch (n.length) {
                  case 0:
                    t();
                    break;
                  case 1:
                    t(n[0]);
                    break;
                  case 2:
                    t(n[0], n[1]);
                    break;
                  case 3:
                    t(n[0], n[1], n[2]);
                    break;
                  default:
                    t.apply(i, n);
                }
              })(t);
            } finally {
              l(e), (r = !1);
            }
          }
        }
      }
    })(window),
      (function(e, i) {
        if (!e.Promise) {
          var n,
            s = "pending",
            a = "sealed",
            o = "fulfilled",
            r = "rejected",
            l = function() {},
            c = "undefined" != typeof setImmediate ? setImmediate : setTimeout,
            d = [];
          (y.prototype = {
            constructor: y,
            state_: s,
            then_: null,
            data_: i,
            then: function(e, t) {
              var n = {
                owner: this,
                then: new this.constructor(l),
                fulfilled: e,
                rejected: t
              };
              return (
                this.state_ === o || this.state_ === r
                  ? u(p, n)
                  : this.then_.push(n),
                n.then
              );
            },
            catch: function(e) {
              return this.then(null, e);
            }
          }),
            (y.all = function(r) {
              if (!t(r))
                throw new TypeError("You must pass an array to Promise.all().");
              return new this(function(n, e) {
                var i = [],
                  s = 0;
                function t(t) {
                  return (
                    s++,
                    function(e) {
                      (i[t] = e), --s || n(i);
                    }
                  );
                }
                for (var a, o = 0; o < r.length; o++)
                  (a = r[o]) && "function" == typeof a.then
                    ? a.then(t(o), e)
                    : (i[o] = a);
                s || n(i);
              });
            }),
            (y.race = function(s) {
              if (!t(s))
                throw new TypeError(
                  "You must pass an array to Promise.race()."
                );
              return new this(function(e, t) {
                for (var n, i = 0; i < s.length; i++)
                  (n = s[i]) && "function" == typeof n.then
                    ? n.then(e, t)
                    : e(n);
              });
            }),
            (y.resolve = function(t) {
              return t && "object" == typeof t && t.constructor === this
                ? t
                : new this(function(e) {
                    e(t);
                  });
            }),
            (y.reject = function(n) {
              return new this(function(e, t) {
                t(n);
              });
            }),
            void 0 === e.Promise && (e.Promise = y);
        }
        function t(e) {
          return "[object Array]" === Object.prototype.toString.call(e);
        }
        function h() {
          for (var e = 0; e < d.length; e++) d[e][0](d[e][1]);
          n = !(d = []);
        }
        function u(e, t) {
          d.push([e, t]), n || ((n = !0), c(h, 0));
        }
        function p(e) {
          var t = e.owner,
            n = t.state_,
            i = t.data_,
            s = e[n],
            a = e.then;
          if ("function" == typeof s) {
            n = o;
            try {
              i = s(i);
            } catch (e) {
              g(a, e);
            }
          }
          f(a, i) || (n === o && m(a, i), n === r && g(a, i));
        }
        function f(t, n) {
          var i;
          try {
            if (t === n)
              throw new TypeError(
                "A promises callback cannot return that same promise."
              );
            if (n && ("function" == typeof n || "object" == typeof n)) {
              var e = n.then;
              if ("function" == typeof e)
                return (
                  e.call(
                    n,
                    function(e) {
                      i || ((i = !0), n !== e ? m(t, e) : v(t, e));
                    },
                    function(e) {
                      i || ((i = !0), g(t, e));
                    }
                  ),
                  !0
                );
            }
          } catch (e) {
            return i || g(t, e), !0;
          }
          return !1;
        }
        function m(e, t) {
          (e !== t && f(e, t)) || v(e, t);
        }
        function v(e, t) {
          e.state_ === s && ((e.state_ = a), (e.data_ = t), u(b, e));
        }
        function g(e, t) {
          e.state_ === s && ((e.state_ = a), (e.data_ = t), u(w, e));
        }
        function C(e) {
          var t = e.then_;
          e.then_ = i;
          for (var n = 0; n < t.length; n++) p(t[n]);
        }
        function b(e) {
          (e.state_ = o), C(e);
        }
        function w(e) {
          (e.state_ = r), C(e);
        }
        function y(e) {
          if ("function" != typeof e)
            throw new TypeError(
              "Promise constructor takes a function argument"
            );
          if (this instanceof y == !1)
            throw new TypeError(
              "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
            );
          (this.then_ = []),
            (function(e, t) {
              function n(e) {
                g(t, e);
              }
              try {
                e(function(e) {
                  m(t, e);
                }, n);
              } catch (e) {
                n(e);
              }
            })(e, this);
        }
      })(window);
    var t = "v1.0.1. Built at 24/09/2019 15:20:29",
      u = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
      p =
        Element.prototype.matches ||
        Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector,
      C = function(e, t) {
        return new C.init(e, t);
      };
    (C.version = t),
      (C.fn = C.prototype = {
        version: t,
        constructor: C,
        length: 0,
        uid: "",
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        indexOf: [].indexOf
      }),
      (C.extend = C.fn.extend = function() {
        var e,
          t,
          n = arguments[0] || {},
          i = 1,
          s = arguments.length;
        for (
          "object" != typeof n && "function" != typeof n && (n = {}),
            i === s && ((n = this), i--);
          i < s;
          i++
        )
          if (null != (e = arguments[i]))
            for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
        return n;
      });
    function b() {
      return Date.now();
    }
    C.extend({
      intervalId: -1,
      intervalQueue: [],
      intervalTicking: !1,
      intervalTickId: null,
      setInterval: function(e, t) {
        var n = this;
        if (
          (this.intervalId++,
          this.intervalQueue.push({
            id: this.intervalId,
            fn: e,
            interval: t,
            lastTime: b()
          }),
          !this.intervalTicking)
        ) {
          var i = function() {
            (n.intervalTickId = requestAnimationFrame(i)),
              C.each(n.intervalQueue, function() {
                var e = this;
                (e.interval < 17 || b() - e.lastTime >= e.interval) &&
                  (e.fn(), (e.lastTime = b()));
              });
          };
          (this.intervalTicking = !0), i();
        }
        return this.intervalId;
      },
      clearInterval: function(e) {
        for (var t = 0; t < this.intervalQueue.length; t++)
          if (e === this.intervalQueue[t].id) {
            this.intervalQueue.splice(t, 1);
            break;
          }
        0 === this.intervalQueue.length &&
          (k(this.intervalTickId), (this.intervalTicking = !1));
      },
      setTimeout: function(e, t) {
        var n = this,
          i = this.setInterval(function() {
            n.clearInterval(i), e();
          }, t);
        return i;
      },
      clearTimeout: function(e) {
        return this.clearInterval(e);
      }
    }),
      C.fn.extend({
        index: function(e) {
          var t,
            n = -1;
          return (
            0 === this.length ||
              m(
                (t = m(e)
                  ? this[0]
                  : e instanceof C && 0 < e.length
                  ? e[0]
                  : "string" == typeof e
                  ? C(e)[0]
                  : h)
              ) ||
              (t &&
                t.parentNode &&
                C.each(t.parentNode.children, function(e) {
                  this === t && (n = e);
                })),
            n
          );
        },
        get: function(e) {
          return e === h
            ? this.items()
            : e < 0
            ? this[e + this.length]
            : this[e];
        },
        eq: function(e) {
          return !m(e) && 0 < this.length
            ? C.extend(C(this.get(e)), { _prevObj: this })
            : this;
        },
        is: function(t) {
          var n = !1;
          return (
            0 !== this.length &&
            (t instanceof C
              ? this.same(t)
              : (":selected" === t
                  ? this.each(function() {
                      this.selected && (n = !0);
                    })
                  : ":checked" === t
                  ? this.each(function() {
                      this.checked && (n = !0);
                    })
                  : ":hidden" === t
                  ? this.each(function() {
                      var e = getComputedStyle(this);
                      ("hidden" !== this.getAttribute("type") &&
                        !this.hidden &&
                        "none" !== e.display &&
                        "hidden" !== e.visibility &&
                        0 !== parseInt(e.opacity)) ||
                        (n = !0);
                    })
                  : "string" == typeof t && -1 === [":selected"].indexOf(t)
                  ? this.each(function() {
                      p.call(this, t) && (n = !0);
                    })
                  : r(t)
                  ? this.each(function() {
                      var e = this;
                      C.each(t, function() {
                        e === this && (n = !0);
                      });
                    })
                  : "object" == typeof t &&
                    1 === t.nodeType &&
                    this.each(function() {
                      this === t && (n = !0);
                    }),
                n))
          );
        },
        same: function(e) {
          var t = !0;
          return (
            e instanceof C || (e = C(e)),
            this.length === e.length &&
              (this.each(function() {
                -1 === e.items().indexOf(this) && (t = !1);
              }),
              t)
          );
        },
        last: function() {
          return this.eq(this.length - 1);
        },
        first: function() {
          return this.eq(0);
        },
        odd: function() {
          var e = this.filter(function(e, t) {
            return t % 2 == 0;
          });
          return C.extend(e, { _prevObj: this });
        },
        even: function() {
          var e = this.filter(function(e, t) {
            return t % 2 != 0;
          });
          return C.extend(e, { _prevObj: this });
        },
        filter: function(e) {
          if ("string" == typeof e) {
            var t = e;
            e = function(e) {
              return p.call(e, t);
            };
          }
          return C.extend(C.merge(C(), [].filter.call(this, e)), {
            _prevObj: this
          });
        },
        find: function(e) {
          var t,
            n = [];
          return e instanceof C
            ? e
            : ((t =
                0 === this.length
                  ? this
                  : (this.each(function() {
                      void 0 !== this.querySelectorAll &&
                        (n = n.concat([].slice.call(this.querySelectorAll(e))));
                    }),
                    C.merge(C(), n))),
              C.extend(t, { _prevObj: this }));
        },
        contains: function(e) {
          return 0 < this.find(e).length;
        },
        children: function(t) {
          var e,
            n = [];
          return t instanceof C
            ? t
            : (this.each(function() {
                for (e = 0; e < this.children.length; e++)
                  1 === this.children[e].nodeType && n.push(this.children[e]);
              }),
              (n = t
                ? n.filter(function(e) {
                    return p.call(e, t);
                  })
                : n),
              C.extend(C.merge(C(), n), { _prevObj: this }));
        },
        parent: function(t) {
          var e = [];
          if (0 !== this.length)
            return t instanceof C
              ? t
              : (this.each(function() {
                  this.parentNode &&
                    -1 === e.indexOf(this.parentNode) &&
                    e.push(this.parentNode);
                }),
                (e = t
                  ? e.filter(function(e) {
                      return p.call(e, t);
                    })
                  : e),
                C.extend(C.merge(C(), e), { _prevObj: this }));
        },
        parents: function(t) {
          var n = [];
          if (0 !== this.length)
            return t instanceof C
              ? t
              : (this.each(function() {
                  for (var e = this.parentNode; e; )
                    1 === e.nodeType &&
                      -1 === n.indexOf(e) &&
                      (m(t) ? n.push(e) : p.call(e, t) && n.push(e)),
                      (e = e.parentNode);
                }),
                C.extend(C.merge(C(), n), { _prevObj: this }));
        },
        siblings: function(t) {
          var n = [];
          if (0 !== this.length)
            return t instanceof C
              ? t
              : (this.each(function() {
                  var e = this;
                  e.parentNode &&
                    C.each(e.parentNode.children, function() {
                      e !== this && n.push(this);
                    });
                }),
                t &&
                  (n = n.filter(function(e) {
                    return p.call(e, t);
                  })),
                C.extend(C.merge(C(), n), { _prevObj: this }));
        },
        _siblingAll: function(t, n) {
          var i = [];
          if (0 !== this.length)
            return n instanceof C
              ? n
              : (this.each(function() {
                  for (var e = this; e && (e = e[t]); ) i.push(e);
                }),
                n &&
                  (i = i.filter(function(e) {
                    return p.call(e, n);
                  })),
                C.extend(C.merge(C(), i), { _prevObj: this }));
        },
        _sibling: function(t, n) {
          var i = [];
          if (0 !== this.length)
            return n instanceof C
              ? n
              : (this.each(function() {
                  var e = this[t];
                  e && 1 === e.nodeType && i.push(e);
                }),
                n &&
                  (i = i.filter(function(e) {
                    return p.call(e, n);
                  })),
                C.extend(C.merge(C(), i), { _prevObj: this }));
        },
        prev: function(e) {
          return this._sibling("previousElementSibling", e);
        },
        next: function(e) {
          return this._sibling("nextElementSibling", e);
        },
        prevAll: function(e) {
          return this._siblingAll("previousElementSibling", e);
        },
        nextAll: function(e) {
          return this._siblingAll("nextElementSibling", e);
        },
        closest: function(t) {
          var n = [];
          if (0 !== this.length)
            return t instanceof C
              ? t
              : t
              ? (this.each(function() {
                  for (var e = this; e && e; ) {
                    if (p.call(e, t)) return void n.push(e);
                    e = e.parentElement;
                  }
                }),
                C.extend(C.merge(C(), n.reverse()), { _prevObj: this }))
              : this.parent(t);
        },
        has: function(e) {
          var t = [];
          if (0 !== this.length)
            return (
              this.each(function() {
                0 < C(this).children(e).length && t.push(this);
              }),
              C.extend(C.merge(C(), t), { _prevObj: this })
            );
        },
        back: function(e) {
          var t;
          if (!0 === e)
            for (t = this._prevObj; t && t._prevObj; ) t = t._prevObj;
          else t = this._prevObj ? this._prevObj : this;
          return t;
        }
      }),
      C.fn.extend({
        _prop: function(e, t) {
          return 1 === arguments.length
            ? 0 === this.length
              ? h
              : this[0][e]
            : (m(t) && (t = ""),
              this.each(function() {
                (this[e] = t),
                  "innerHTML" === e &&
                    C.each(C(this).find("script"), function() {
                      var e = this,
                        t = document.createElement("script");
                      (t.type = "text/javascript"),
                        e.src ? (t.src = e.src) : (t.textContent = e.innerText),
                        document.body.appendChild(t),
                        e.parentNode.removeChild(e);
                    });
              }));
        },
        prop: function(e, t) {
          return 1 === arguments.length
            ? this._prop(e)
            : this._prop(e, void 0 === t ? "" : t);
        },
        val: function(t) {
          return m(t)
            ? 0 === this.length
              ? h
              : this[0].value
            : this.each(function() {
                var e = C(this);
                void 0 !== this.value ? (this.value = t) : e.html(t);
              });
        },
        html: function(e) {
          var t = [];
          return 0 === arguments.length
            ? this._prop("innerHTML")
            : (e instanceof C
                ? e.each(function() {
                    t.push(C(this).outerHTML());
                  })
                : t.push(e),
              this._prop(
                "innerHTML",
                1 === t.length && m(t[0]) ? "" : t.join("\n")
              ),
              this);
        },
        outerHTML: function() {
          return this._prop("outerHTML");
        },
        text: function(e) {
          return 0 === arguments.length
            ? this._prop("textContent")
            : this._prop("textContent", void 0 === e ? "" : e);
        },
        innerText: function(e) {
          return 0 === arguments.length
            ? this._prop("innerText")
            : this._prop("innerText", void 0 === e ? "" : e);
        },
        empty: function() {
          return this.each(function() {
            void 0 !== this.innerHTML && (this.innerHTML = "");
          });
        }
      }),
      (C.each = function(e, n) {
        var t = 0;
        if (r(e))
          [].forEach.call(e, function(e, t) {
            n.apply(e, [t, e]);
          });
        else
          for (var i in e) e.hasOwnProperty(i) && n.apply(e[i], [i, e[i], t++]);
        return e;
      }),
      C.fn.extend({
        each: function(e) {
          return C.each(this, e);
        }
      });
    var w = function(e) {
      (this.expando = "DATASET:UID:" + e.toUpperCase()), w.uid++;
    };
    (w.uid = -1),
      (w.prototype = {
        cache: function(e) {
          var t = e[this.expando];
          return (
            t ||
              ((t = {}),
              n(e) &&
                (e.nodeType
                  ? (e[this.expando] = t)
                  : Object.defineProperty(e, this.expando, {
                      value: t,
                      configurable: !0
                    }))),
            t
          );
        },
        set: function(e, t, n) {
          var i,
            s = this.cache(e);
          if ("string" == typeof t) s[v(t)] = n;
          else for (i in t) t.hasOwnProperty(i) && (s[v(i)] = t[i]);
          return s;
        },
        get: function(e, t) {
          return t === h
            ? this.cache(e)
            : e[this.expando] && e[this.expando][v(t)];
        },
        access: function(e, t, n) {
          return t === h || (t && "string" == typeof t && n === h)
            ? this.get(e, t)
            : (this.set(e, t, n), n !== h ? n : t);
        },
        remove: function(e, t) {
          var n,
            i = e[this.expando];
          if (i !== h) {
            if (t !== h) {
              n = (t = Array.isArray(t)
                ? t.map(v)
                : (t = v(t)) in i
                ? [t]
                : t.match(/[^\x20\t\r\n\f]+/g) || []).length;
              for (; n--; ) delete i[t[n]];
            }
            return (
              (t !== h && !a(i)) ||
                (e.nodeType ? (e[this.expando] = h) : delete e[this.expando]),
              !0
            );
          }
        },
        hasData: function(e) {
          var t = e[this.expando];
          return t !== h && !a(t);
        }
      });
    var y = new w("m4q");
    C.extend({
      hasData: function(e) {
        return y.hasData(e);
      },
      data: function(e, t, n) {
        return y.access(e, t, n);
      },
      removeData: function(e, t) {
        return y.remove(e, t);
      },
      dataSet: function(e) {
        if (m(e)) return y;
        if (-1 < ["INTERNAL", "M4Q"].indexOf(e.toUpperCase()))
          throw Error("You can not use reserved name for your dataset");
        return new w(e);
      }
    }),
      C.fn.extend({
        data: function(e, t) {
          var n, i, s, a, o, r;
          if (0 !== this.length) {
            if (((i = this[0]), 0 !== arguments.length))
              return 1 === arguments.length
                ? ((n = y.get(i, e)) === h &&
                    1 === i.nodeType &&
                    i.hasAttribute("data-" + e) &&
                    (n = i.getAttribute("data-" + e)),
                  n)
                : this.each(function() {
                    y.set(this, e, t);
                  });
            if (this.length && ((s = y.get(i)), 1 === i.nodeType))
              for (r = (a = i.attributes).length; r--; )
                a[r] &&
                  0 === (o = a[r].name).indexOf("data-") &&
                  d(i, (o = v(o.slice(5))), s[o]);
            return s;
          }
        },
        removeData: function(e) {
          return this.each(function() {
            y.remove(this, e);
          });
        },
        origin: function(e, t, n) {
          if (0 === this.length) return this;
          if (m(e) && m(t)) return C.data(this[0]);
          if (m(t)) {
            var i = C.data(this[0], "origin-" + e);
            return m(i) ? n : i;
          }
          return this.data("origin-" + e, t), this;
        }
      }),
      C.extend({
        uniqueId: function() {
          var n = new Date().getTime();
          return "m4q-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
            e
          ) {
            var t = (n + 16 * Math.random()) % 16 | 0;
            return (
              (n = Math.floor(n / 16)),
              ("x" === e ? t : (3 & t) | 8).toString(16)
            );
          });
        },
        toArray: function(e) {
          var t,
            n = [];
          for (t = 0; t < e.length; t++) n.push(e[t]);
          return n;
        },
        import: function(e) {
          var t = [];
          return (
            this.each(e, function() {
              t.push(this);
            }),
            this.merge(C(), t)
          );
        },
        merge: function(e, t) {
          for (var n = +t.length, i = 0, s = e.length; i < n; i++)
            e[s++] = t[i];
          return (e.length = s), e;
        },
        type: function(e) {
          return Object.prototype.toString
            .call(e)
            .replace(/^\[object (.+)]$/, "$1")
            .toLowerCase();
        },
        sleep: function(e) {
          for (e += new Date().getTime(); new Date() < e; );
        },
        isSelector: function(e) {
          if ("string" != typeof e) return !1;
          if (-1 !== e.indexOf("<")) return !1;
          try {
            C(e);
          } catch (e) {
            return !1;
          }
          return !0;
        },
        remove: function(e) {
          return C(e).remove();
        },
        camelCase: function(e) {
          return v(e);
        },
        isPlainObject: function(e) {
          return g(e);
        },
        isEmptyObject: function(e) {
          return a(e);
        },
        isArrayLike: function(e) {
          return r(e);
        },
        acceptData: function(e) {
          return n(e);
        },
        not: function(e) {
          return m(e);
        },
        parseUnit: function(e, t) {
          return f(e, t);
        },
        unit: function(e, t) {
          return f(e, t);
        },
        isVisible: function(e) {
          return o(e);
        },
        isHidden: function(e) {
          return (function(e) {
            var t = getComputedStyle(e);
            return (
              !o(e) || 0 == +t.opacity || e.hidden || "hidden" === t.visibility
            );
          })(e);
        },
        iif: function(e, t, n) {
          return (function(e, t, n) {
            return e || t || n;
          })(e, t, n);
        }
      }),
      C.fn.extend({
        items: function() {
          return C.toArray(this);
        }
      }),
      (function() {
        if ("function" == typeof window.CustomEvent) return;
        function e(e, t) {
          t = t || { bubbles: !1, cancelable: !1, detail: null };
          var n = document.createEvent("CustomEvent");
          return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
        }
        (e.prototype = window.Event.prototype), (window.CustomEvent = e);
      })();
    var x = Event.prototype.stopPropagation,
      S = Event.prototype.preventDefault;
    (Event.prototype.stopPropagation = function() {
      (this.isPropagationStopped = !0), x.apply(this, arguments);
    }),
      (Event.prototype.preventDefault = function() {
        (this.isPreventedDefault = !0), S.apply(this, arguments);
      }),
      (Event.prototype.stop = function(e) {
        return e ? this.stopImmediatePropagation() : this.stopPropagation();
      }),
      C.extend({
        events: [],
        eventHooks: {},
        eventUID: -1,
        setEventHandler: function(e) {
          var t,
            n,
            i = -1;
          if (0 < this.events.length)
            for (t = 0; t < this.events.length; t++)
              if (null === this.events[t].handler) {
                i = t;
                break;
              }
          return (
            (n = {
              element: e.el,
              event: e.event,
              handler: e.handler,
              selector: e.selector,
              ns: e.ns,
              id: e.id
            }),
            -1 === i
              ? (this.events.push(n), this.events.length - 1)
              : ((this.events[i] = n), i)
          );
        },
        getEventHandler: function(e) {
          return this.events[e] !== h && null !== this.events[e]
            ? ((this.events[e] = null), this.events[e].handler)
            : h;
        },
        off: function() {
          return (
            C.each(this.events, function() {
              this.element.removeEventListener(this.event, this.handler);
            }),
            (this.events = []),
            this
          );
        },
        getEvents: function() {
          return this.events;
        },
        getEventHooks: function() {
          return this.eventHooks;
        },
        addEventHook: function(e, t, n) {
          return (
            m(n) && (n = "before"),
            C.each(i(e), function() {
              this.eventHooks[v(n + "-" + this)] = t;
            }),
            this
          );
        },
        removeEventHook: function(e, t) {
          return (
            m(t) && (t = "before"),
            C.each(i(e), function() {
              delete this.eventHooks[v(t + "-" + this)];
            }),
            this
          );
        },
        removeEventHooks: function(e) {
          var t = this;
          return (
            m(e)
              ? (this.eventHooks = {})
              : C.each(i(e), function() {
                  delete t.eventHooks[v(type + "-" + this)];
                }),
            this
          );
        }
      }),
      C.fn.extend({
        on: function(e, l, c, d) {
          if (0 !== this.length)
            return (
              "function" == typeof l && ((d = c), (c = l), (l = h)),
              g(d) || (d = {}),
              this.each(function() {
                var r = this;
                C.each(i(e), function() {
                  var e,
                    s,
                    t,
                    n = this.split("."),
                    a = n[0],
                    o = d.ns ? d.ns : n[1];
                  C.eventUID++,
                    (e = function(e) {
                      var t = e.target,
                        n = C.eventHooks[v("before-" + a)],
                        i = C.eventHooks[v("after-" + a)];
                      if (("function" == typeof n && n.call(t, e), l))
                        for (
                          ;
                          t &&
                          t !== r &&
                          (!p.call(t, l) ||
                            (c.call(t, e), !e.isPropagationStopped));

                        )
                          t = t.parentNode;
                      else c.call(t, e);
                      "function" == typeof i && i.call(t, e),
                        d.once &&
                          ((s = +C(r).origin(
                            "event-" +
                              e.type +
                              (l ? ":" + l : "") +
                              (o ? ":" + o : "")
                          )),
                          isNaN(s) || C.events.splice(s, 1));
                    }),
                    Object.defineProperty(e, "name", {
                      value:
                        "" !== c.name.trim()
                          ? c.name
                          : "func_event_" + a + "_" + C.eventUID
                    }),
                    (t = a + (l ? ":" + l : "") + (o ? ":" + o : "")),
                    d.capture === h && (d.capture = !1),
                    r.addEventListener(a, e, d),
                    (s = C.setEventHandler({
                      el: r,
                      event: a,
                      handler: e,
                      selector: l,
                      ns: o,
                      id: C.eventUID
                    })),
                    C(r).origin("event-" + t, s);
                });
              })
            );
        },
        one: function(e, t, n, i) {
          return (
            g(i) || (i = {}), (i.once = !0), this.on.apply(this, [e, t, n, i])
          );
        },
        off: function(e, o, r) {
          return (
            g(r) || (r = {}),
            g(o) && ((r = o), (o = null)),
            m(e) || "all" === e.toLowerCase()
              ? this.each(function() {
                  var t = this;
                  C.each(C.events, function() {
                    var e = this;
                    e.element === t &&
                      (t.removeEventListener(e.event, e.handler),
                      (e.handler = null),
                      C(t).origin(
                        "event-" +
                          name +
                          (e.selector ? ":" + e.selector : "") +
                          (e.ns ? ":" + e.ns : ""),
                        null
                      ));
                  });
                })
              : this.each(function() {
                  var a = this;
                  C.each(i(e), function() {
                    var e,
                      t,
                      n = this.split("."),
                      i = n[0],
                      s = r.ns ? r.ns : n[1];
                    (e =
                      "event-" + i + (o ? ":" + o : "") + (s ? ":" + s : "")),
                      (t = C(a).origin(e)) !== h &&
                        C.events[t].handler &&
                        (a.removeEventListener(i, C.events[t].handler),
                        (C.events[t].handler = null)),
                      C(a).origin(e, null);
                  });
                })
          );
        },
        trigger: function(e, t) {
          if (0 !== this.length) {
            if (-1 < ["focus", "blur"].indexOf(e)) return this[0][e](), this;
            var n = new CustomEvent(e, t || {});
            return this.each(function() {
              this.dispatchEvent(n);
            });
          }
        },
        fire: function(e, t) {
          if (0 !== this.length) {
            if (-1 < ["focus", "blur"].indexOf(e)) return this[0][e](), this;
            var n = document.createEvent("Events");
            return (
              (n.detail = t),
              n.initEvent(e, !0, !1),
              this.each(function() {
                this.dispatchEvent(n);
              })
            );
          }
        }
      }),
      "blur focus resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu touchstart touchend touchmove touchcancel"
        .split(" ")
        .forEach(function(i) {
          C.fn[i] = function(e, t, n) {
            return 0 < arguments.length ? this.on(i, e, t, n) : this.trigger(i);
          };
        }),
      C.fn.extend({
        hover: function(e, t) {
          return this.mouseenter(e).mouseleave(t || e);
        }
      }),
      (C.ready = function(e) {
        document.addEventListener("DOMContentLoaded", e);
      }),
      (C.load = function(e) {
        return C(window).on("load", e);
      }),
      (C.unload = function(e) {
        return C(window).on("unload", e);
      }),
      C.fn.extend({
        unload: function(e) {
          return 0 === this.length || this[0].self !== window ? h : C.unload(e);
        }
      }),
      (C.beforeunload = function(t) {
        return "string" == typeof t
          ? C(window).on("beforeunload", function(e) {
              return (e.returnValue = t);
            })
          : C(window).on("beforeunload", t);
      }),
      C.fn.extend({
        beforeunload: function(e) {
          return 0 === this.length || this[0].self !== window
            ? h
            : C.beforeunload(e);
        }
      }),
      (C.ajax = function(f) {
        return new Promise(function(n, i) {
          function s(e, t) {
            "function" == typeof e && e.apply(null, t);
          }
          var e,
            a = new XMLHttpRequest(),
            t = (f.method || "GET").toUpperCase(),
            o = [],
            r = !!m(f.async) || f.async,
            l = f.url;
          if (f.data instanceof HTMLFormElement) {
            var c = f.data.getAttribute("action"),
              d = f.data.getAttribute("method");
            m(l) && c && "" !== c.trim() && (l = c),
              d && "" !== d.trim() && (t = d.toUpperCase());
          }
          if (
            (a.open(t, l, r, f.user, f.password),
            f.timeout && (a.timeout = f.timeout),
            f.withCredentials && (a.withCredentials = f.withCredentials),
            f.headers &&
              C.each(function(e, t) {
                a.setRequestHeader(e, t), o.push(e);
              }),
            f.data instanceof HTMLFormElement)
          )
            e = new FormData(f.data);
          else if (
            f.data instanceof HTMLElement &&
            "file" === f.data.getAttribute("type").toLowerCase()
          ) {
            var h = f.data.getAttribute("name");
            e = new FormData();
            for (var u = 0; u < f.data.files.length; u++)
              e.append(h, f.data.files[u]);
          } else if (g(f.data)) {
            var p = [];
            C.each(f.data, function(e, t) {
              p.push(e + "=" + t);
            }),
              (e = p.join("&")),
              -1 === o.indexOf("Content-type") &&
                a.setRequestHeader(
                  "Content-type",
                  "application/x-www-form-urlencoded"
                );
          } else
            f.data instanceof FormData
              ? (e = f.data)
              : (e = new FormData()).append("_data", JSON.stringify(f.data));
          a.send(e),
            a.addEventListener("load", function(e) {
              if (4 === a.readyState && a.status < 300) {
                var t =
                  f.returnValue && "xhr" === f.returnValue
                    ? a
                    : f.parseJson
                    ? JSON.parse(a.response)
                    : a.response;
                s(n, [t]), s(f.onSuccess, [e, a]);
              } else s(i, [a]), s(f.onFail, [e, a]);
              s(f.onLoad, [e, a]);
            }),
            C.each(
              [
                "readystatechange",
                "error",
                "timeout",
                "progress",
                "loadstart",
                "loadend",
                "abort"
              ],
              function() {
                var t = v(
                  "on-" + ("readystatechange" === this ? "state" : this)
                );
                a.addEventListener(t, function(e) {
                  s(f[t], [e, a]);
                });
              }
            );
        });
      }),
      ["get", "post", "put", "patch", "delete", "json"].forEach(function(a) {
        C[a] = function(e, t, n) {
          var i = a.toUpperCase(),
            s = {
              method: "JSON" === i ? "GET" : i,
              url: e,
              data: t,
              parseJson: "JSON" === i
            };
          return C.ajax(C.extend({}, s, n));
        };
      }),
      C.fn.extend({
        load: function(e, t, n) {
          var i = this;
          return this[0].self === window
            ? C.load(e)
            : C.get(e, t, n).then(function(e) {
                i.each(function() {
                  this.innerHTML = e;
                });
              });
        }
      }),
      C.fn.extend({
        style: function(e, t) {
          var n;
          function i(e, t, n) {
            return -1 < ["scrollLeft", "scrollTop"].indexOf(t)
              ? C(e)[t]()
              : getComputedStyle(e, n)[t];
          }
          if ("string" == typeof e && 0 === this.length) return h;
          if (0 === this.length) return this;
          if (((n = this[0]), m(e) || "all" === e))
            return getComputedStyle(n, t);
          var s = {},
            a = e.split(", ").map(function(e) {
              return ("" + e).trim();
            });
          return 1 === a.length
            ? i(n, a[0], t)
            : (C.each(a, function() {
                s[this] = i(n, this, t);
              }),
              s);
        },
        removeStyleProperty: function(e) {
          if (m(e) || 0 === this.length) return this;
          var t = e.split(", ").map(function(e) {
            return ("" + e).trim();
          });
          return this.each(function() {
            var e = this;
            C.each(t, function() {
              e.style.removeProperty(this);
            });
          });
        },
        css: function(e, t) {
          return "string" == typeof (e = e || "all") && m(t)
            ? this.style(e)
            : this.each(function() {
                var n = this;
                "object" == typeof e
                  ? C.each(e, function(e, t) {
                      l(n, e, t);
                    })
                  : "string" == typeof e && l(n, e, t);
              });
        },
        scrollTop: function(e) {
          return m(e)
            ? 0 === this.length
              ? h
              : this[0] === window
              ? pageYOffset
              : this[0].scrollTop
            : this.each(function() {
                this.scrollTop = e;
              });
        },
        scrollLeft: function(e) {
          return m(e)
            ? 0 === this.length
              ? h
              : this[0] === window
              ? pageXOffset
              : this[0].scrollLeft
            : this.each(function() {
                this.scrollLeft = e;
              });
        }
      }),
      C.fn.extend({
        addClass: function() {},
        removeClass: function() {},
        toggleClass: function() {},
        containsClass: function(e) {
          return this.hasClass(e);
        },
        hasClass: function(e) {
          var t = !1,
            n = e.split(" ").filter(function(e) {
              return "" !== ("" + e).trim();
            });
          return (
            !m(e) &&
            (this.each(function() {
              var e = this;
              C.each(n, function() {
                !t && e.classList && e.classList.contains(this) && (t = !0);
              });
            }),
            t)
          );
        },
        clearClasses: function() {
          return this.each(function() {
            this.className = "";
          });
        },
        cls: function(e) {
          return 0 === this.length
            ? h
            : e
            ? this[0].className.split(" ")
            : this[0].className;
        }
      }),
      ["add", "remove", "toggle"].forEach(function(n) {
        C.fn[n + "Class"] = function(t) {
          return m(t) || "" === ("" + t).trim()
            ? this
            : this.each(function() {
                var e = this;
                C.each(
                  t.split(" ").filter(function(e) {
                    return "" !== ("" + e).trim();
                  }),
                  function() {
                    e.classList && e.classList[n](this);
                  }
                );
              });
        };
      }),
      (C.parseHTML = function(e, t) {
        var n,
          i,
          s,
          a,
          o = [];
        if ("string" != typeof e) return [];
        if (
          ((e = e.trim()),
          ((n = (s = document.implementation.createHTMLDocument(
            ""
          )).createElement("base")).href = document.location.href),
          s.head.appendChild(n),
          (a = s.body),
          (i = u.exec(e)))
        )
          o.push(document.createElement(i[1]));
        else {
          a.innerHTML = e;
          for (var r = 0; r < a.childNodes.length; r++) o.push(a.childNodes[r]);
        }
        return (
          !t ||
            t instanceof C ||
            !g(t) ||
            C.each(o, function() {
              for (var e in t)
                t.hasOwnProperty(e) && this.setAttribute(e, t[e]);
            }),
          o
        );
      }),
      C.fn.extend({
        _size: function(e, t) {
          if (0 !== this.length) {
            if (m(t)) {
              var n = this[0];
              if ("height" === e)
                return n === window
                  ? window.innerHeight
                  : n === document
                  ? n.body.clientHeight
                  : parseInt(getComputedStyle(n).height);
              if ("width" === e)
                return n === window
                  ? window.innerWidth
                  : n === document
                  ? n.body.clientWidth
                  : parseInt(getComputedStyle(n).width);
            }
            return this.each(function() {
              this !== window &&
                this !== document &&
                (this.style[e] = isNaN(t) ? t : t + "px");
            });
          }
        },
        height: function(e) {
          return this._size("height", e);
        },
        width: function(e) {
          return this._size("width", e);
        },
        _sizeOut: function(s, a) {
          var e, t, n, i;
          if (0 !== this.length)
            return m(a) || "boolean" == typeof a
              ? ((t = (e = this[0])[
                  "width" === s ? "offsetWidth" : "offsetHeight"
                ]),
                (n = getComputedStyle(e)),
                (i =
                  t +
                  parseInt(n["width" === s ? "margin-left" : "margin-top"]) +
                  parseInt(
                    n["width" === s ? "margin-right" : "margin-bottom"]
                  )),
                !0 === a ? i : t)
              : this.each(function() {
                  if (this !== window && this !== document) {
                    var e,
                      t = getComputedStyle(this),
                      n =
                        "width" === s
                          ? parseInt(t["border-left-width"]) +
                            parseInt(t["border-right-width"])
                          : parseInt(t["border-top-width"]) +
                            parseInt(t["border-bottom-width"]),
                      i =
                        "width" === s
                          ? parseInt(t["padding-left"]) +
                            parseInt(t["padding-right"])
                          : parseInt(t["padding-top"]) +
                            parseInt(t["padding-bottom"]);
                    (e =
                      C(this)
                        [s](a)
                        [s]() -
                      n -
                      i),
                      (this.style[s] = e + "px");
                  }
                });
        },
        outerWidth: function(e) {
          return this._sizeOut("width", e);
        },
        outerHeight: function(e) {
          return this._sizeOut("height", e);
        },
        padding: function(e) {
          if (0 !== this.length) {
            var t = getComputedStyle(this[0], e);
            return {
              top: parseInt(t["padding-top"]),
              right: parseInt(t["padding-right"]),
              bottom: parseInt(t["padding-bottom"]),
              left: parseInt(t["padding-left"])
            };
          }
        },
        margin: function(e) {
          if (0 !== this.length) {
            var t = getComputedStyle(this[0], e);
            return {
              top: parseInt(t["margin-top"]),
              right: parseInt(t["margin-right"]),
              bottom: parseInt(t["margin-bottom"]),
              left: parseInt(t["margin-left"])
            };
          }
        },
        border: function(e) {
          if (0 !== this.length) {
            var t = getComputedStyle(this[0], e);
            return {
              top: parseInt(t["border-top-width"]),
              right: parseInt(t["border-right-width"]),
              bottom: parseInt(t["border-bottom-width"]),
              left: parseInt(t["border-left-width"])
            };
          }
        }
      }),
      C.fn.extend({
        offset: function(a) {
          var e;
          return m(a)
            ? 0 === this.length
              ? h
              : {
                  top: (e = this[0].getBoundingClientRect()).top + pageYOffset,
                  left: e.left + pageXOffset
                }
            : this.each(function() {
                var e = C(this),
                  t = a.top,
                  n = a.left,
                  i = getComputedStyle(this).position,
                  s = e.offset();
                "static" === i && e.css("position", "relative"),
                  -1 === ["absolute", "fixed"].indexOf(i) &&
                    ((t -= s.top), (n -= s.left)),
                  e.css({ top: t, left: n });
              });
        },
        position: function(e) {
          var t,
            n,
            i = 0,
            s = 0;
          return (
            (e = !m(e) && c(e)),
            0 === this.length
              ? h
              : ((t = this[0]),
                (n = getComputedStyle(t)),
                e &&
                  ((i = parseInt(n["margin-left"])),
                  (s = parseInt(n["margin-top"]))),
                { left: t.offsetLeft - i, top: t.offsetTop - s })
          );
        },
        left: function(e, t) {
          if (0 !== this.length)
            return m(e)
              ? this.position(t).left
              : "boolean" == typeof e
              ? ((t = e), this.position(t).left)
              : this.each(function() {
                  C(this).css({ left: e });
                });
        },
        top: function(e, t) {
          if (0 !== this.length)
            return m(e)
              ? this.position(t).top
              : "boolean" == typeof e
              ? ((t = e), this.position(t).top)
              : this.each(function() {
                  C(this).css({ top: e });
                });
        },
        coord: function() {
          return 0 === this.length ? h : this[0].getBoundingClientRect();
        },
        pos: function() {
          if (0 !== this.length)
            return {
              top: parseInt(C(this[0]).style("top")),
              left: parseInt(C(this[0]).style("left"))
            };
        }
      }),
      C.fn.extend({
        attr: function(e, t) {
          var n = {};
          return 0 === this.length && 0 === arguments.length
            ? h
            : this.length && 0 === arguments.length
            ? (C.each(this[0].attributes, function() {
                n[this.nodeName] = this.nodeValue;
              }),
              n)
            : "string" == typeof e && t === h
            ? this.length && 1 === this[0].nodeType && this[0].hasAttribute(e)
              ? this[0].getAttribute(e)
              : h
            : this.each(function() {
                var n = this;
                g(e)
                  ? C.each(e, function(e, t) {
                      n.setAttribute(e, t);
                    })
                  : n.setAttribute(e, t);
              });
        },
        removeAttr: function(e) {
          var t;
          return m(e)
            ? this.each(function() {
                var e = this;
                C.each(this.attributes, function() {
                  e.removeAttribute(this);
                });
              })
            : ((t =
                "string" == typeof e
                  ? e.split(",").map(function(e) {
                      return e.trim();
                    })
                  : e),
              this.each(function() {
                var e = this;
                C.each(t, function() {
                  e.hasAttribute(this) && e.removeAttribute(this);
                });
              }));
        },
        toggleAttr: function(e, t) {
          return this.each(function() {
            m(t) ? this.removeAttribute(e) : this.setAttribute(e, t);
          });
        },
        id: function(e) {
          return this.length ? C(this[0]).attr("id", e) : h;
        }
      }),
      C.extend({
        meta: function(e) {
          return m(e) ? C("meta") : C("meta[name='$name']".replace("$name", e));
        },
        metaBy: function(e) {
          return m(e) ? C("meta") : C("meta[$name]".replace("$name", e));
        },
        doctype: function() {
          return C("doctype");
        },
        html: function() {
          return C("html");
        },
        charset: function(e) {
          var t = C("meta[charset]");
          return e && t.attr("charset", e), t.attr("charset");
        }
      }),
      C.extend({
        proxy: function(e, t) {
          return "function" != typeof e ? h : e.bind(t);
        },
        bind: function(e, t) {
          return this.proxy(e, t);
        }
      }),
      [
        Element.prototype,
        Document.prototype,
        DocumentFragment.prototype
      ].forEach(function(e) {
        e.hasOwnProperty("append") ||
          Object.defineProperty(e, "append", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function() {
              var e = Array.prototype.slice.call(arguments),
                n = document.createDocumentFragment();
              e.forEach(function(e) {
                var t = e instanceof Node;
                n.appendChild(t ? e : document.createTextNode(String(e)));
              }),
                this.appendChild(n);
            }
          });
      }),
      [
        Element.prototype,
        Document.prototype,
        DocumentFragment.prototype
      ].forEach(function(e) {
        e.hasOwnProperty("prepend") ||
          Object.defineProperty(e, "prepend", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function() {
              var e = Array.prototype.slice.call(arguments),
                n = document.createDocumentFragment();
              e.forEach(function(e) {
                var t = e instanceof Node;
                n.appendChild(t ? e : document.createTextNode(String(e)));
              }),
                this.insertBefore(n, this.firstChild);
            }
          });
      });
    function T(e) {
      var t = h;
      return (
        "string" == typeof e
          ? (t = C.isSelector(e) ? C(e) : C.parseHTML(e))
          : e instanceof HTMLElement
          ? (t = [e])
          : r(e) && (t = e),
        t
      );
    }
    C.fn.extend({
      append: function(e) {
        var n = T(e);
        return this.each(function(e, t) {
          C.each(n, function() {
            t !== this && t.append(0 === e ? this : this.cloneNode(!0));
          });
        });
      },
      appendTo: function(e) {
        var t = T(e);
        return this.each(function() {
          var n = this;
          C.each(t, function(e, t) {
            n !== this && t.append(0 === e ? n : n.cloneNode(!0));
          });
        });
      },
      prepend: function(e) {
        var n = T(e);
        return this.each(function(e, t) {
          C.each(n, function() {
            t !== this && t.prepend(0 === e ? this : this.cloneNode(!0));
          });
        });
      },
      prependTo: function(e) {
        var t = T(e);
        return this.each(function() {
          var n = this;
          C.each(t, function(e, t) {
            n !== this && C(t).prepend(0 === e ? n : n.cloneNode(!0));
          });
        });
      },
      insertBefore: function(e) {
        var t = T(e);
        return this.each(function() {
          var n = this;
          C.each(t, function(e, t) {
            n !== this &&
              t.parentNode.insertBefore(0 === e ? n : n.cloneNode(!0), t);
          });
        });
      },
      insertAfter: function(e) {
        var t = T(e);
        return this.each(function() {
          var n = this;
          C.each(t, function(e, t) {
            n !== this &&
              t.parentNode.insertBefore(
                0 === e ? n : n.cloneNode(!0),
                t.nextSibling
              );
          });
        });
      },
      after: function(e) {
        return this.each(function() {
          "string" == typeof e
            ? this.insertAdjacentHTML("afterend", e)
            : C(e).insertAfter(this);
        });
      },
      before: function(e) {
        return this.each(function() {
          "string" == typeof e
            ? this.insertAdjacentHTML("beforebegin", e)
            : C(e).insertBefore(this);
        });
      },
      clone: function(e) {
        var t = [];
        return (
          m(e) && (e = !1),
          this.each(function() {
            t.push(this.cloneNode(e));
          }),
          C.merge(C(), t)
        );
      },
      import: function(e) {
        var t = [];
        return (
          m(e) && (e = !1),
          this.each(function() {
            t.push(document.importNode(this, e));
          }),
          C.merge(C(), t)
        );
      },
      adopt: function() {
        var e = [];
        return (
          this.each(function() {
            e.push(document.adoptNode(this));
          }),
          C.merge(C(), e)
        );
      },
      remove: function(t) {
        var e,
          n,
          i = 0,
          s = [];
        if (0 !== this.length) {
          for (
            n = t
              ? this.filter(function(e) {
                  return p.call(e, t);
                })
              : this.items();
            null != (e = n[i]);
            i++
          )
            e.parentNode &&
              (s.push(e.parentNode.removeChild(e)), C.removeData(e));
          return C.merge(C(), s);
        }
      }
    });
    var k =
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame,
      _ = {
        def: "linear",
        linear: function(e) {
          return e;
        },
        easeInSine: function(e) {
          return -1 * Math.cos(e * (Math.PI / 2)) + 1;
        },
        easeOutSine: function(e) {
          return Math.sin(e * (Math.PI / 2));
        },
        easeInOutSine: function(e) {
          return -0.5 * (Math.cos(Math.PI * e) - 1);
        },
        easeInQuad: function(e) {
          return e * e;
        },
        easeOutQuad: function(e) {
          return e * (2 - e);
        },
        easeInOutQuad: function(e) {
          return e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1;
        },
        easeInCubic: function(e) {
          return e * e * e;
        },
        easeOutCubic: function(e) {
          var t = e - 1;
          return t * t * t + 1;
        },
        easeInOutCubic: function(e) {
          return e < 0.5
            ? 4 * e * e * e
            : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
        },
        easeInQuart: function(e) {
          return e * e * e * e;
        },
        easeOutQuart: function(e) {
          var t = e - 1;
          return 1 - t * t * t * t;
        },
        easeInOutQuart: function(e) {
          var t = e - 1;
          return e < 0.5 ? 8 * e * e * e * e : 1 - 8 * t * t * t * t;
        },
        easeInQuint: function(e) {
          return e * e * e * e * e;
        },
        easeOutQuint: function(e) {
          var t = e - 1;
          return 1 + t * t * t * t * t;
        },
        easeInOutQuint: function(e) {
          var t = e - 1;
          return e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * t * t * t * t * t;
        },
        easeInExpo: function(e) {
          return 0 === e ? 0 : Math.pow(2, 10 * (e - 1));
        },
        easeOutExpo: function(e) {
          return 1 === e ? 1 : 1 - Math.pow(2, -10 * e);
        },
        easeInOutExpo: function(e) {
          if (0 === e || 1 === e) return e;
          var t = 2 * e,
            n = t - 1;
          return t < 1
            ? 0.5 * Math.pow(2, 10 * n)
            : 0.5 * (2 - Math.pow(2, -10 * n));
        },
        easeInCirc: function(e) {
          var t = e / 1;
          return -1 * (Math.sqrt(1 - t * e) - 1);
        },
        easeOutCirc: function(e) {
          var t = e - 1;
          return Math.sqrt(1 - t * t);
        },
        easeInOutCirc: function(e) {
          var t = 2 * e,
            n = t - 2;
          return t < 1
            ? -0.5 * (Math.sqrt(1 - t * t) - 1)
            : 0.5 * (Math.sqrt(1 - n * n) + 1);
        },
        easeInBack: function(e, t) {
          return e * e * (((t = t || 1.70158) + 1) * e - t);
        },
        easeOutBack: function(e, t) {
          var n = e / 1 - 1;
          return n * n * (((t = t || 1.70158) + 1) * n + t) + 1;
        },
        easeInOutBack: function(e, t) {
          var n = 2 * e,
            i = n - 2,
            s = 1.525 * (t = t || 1.70158);
          return n < 1
            ? 0.5 * n * n * ((1 + s) * n - s)
            : 0.5 * (i * i * ((1 + s) * i + s) + 2);
        },
        easeInElastic: function(e, t) {
          if (0 === e || 1 === e) return e;
          var n = e / 1 - 1,
            i = 1 - (t = t || 0.7),
            s = (i / (2 * Math.PI)) * Math.asin(1);
          return -Math.pow(2, 10 * n) * Math.sin(((n - s) * (2 * Math.PI)) / i);
        },
        easeOutElastic: function(e, t) {
          var n = 1 - (t = t || 0.7),
            i = 2 * e;
          if (0 === e || 1 === e) return e;
          var s = (n / (2 * Math.PI)) * Math.asin(1);
          return (
            Math.pow(2, -10 * i) * Math.sin(((i - s) * (2 * Math.PI)) / n) + 1
          );
        },
        easeInOutElastic: function(e, t) {
          var n = 1 - (t = t || 0.65);
          if (0 === e || 1 === e) return e;
          var i = 2 * e,
            s = i - 1,
            a = (n / (2 * Math.PI)) * Math.asin(1);
          return i < 1
            ? Math.pow(2, 10 * s) *
                Math.sin(((s - a) * (2 * Math.PI)) / n) *
                -0.5
            : Math.pow(2, -10 * s) *
                Math.sin(((s - a) * (2 * Math.PI)) / n) *
                0.5 +
                1;
        },
        easeOutBounce: function(e) {
          var t,
            n = e / 1;
          return n < 1 / 2.75
            ? 7.5625 * n * n
            : n < 2 / 2.75
            ? 7.5625 * (t = n - 1.5 / 2.75) * t + 0.75
            : n < 2.5 / 2.75
            ? 7.5625 * (t = n - 2.25 / 2.75) * t + 0.9375
            : 7.5625 * (t = n - 2.625 / 2.75) * t + 0.984375;
        },
        easeInBounce: function(e) {
          return 1 - _.easeOutBounce(1 - e);
        },
        easeInOutBounce: function(e) {
          return e < 0.5
            ? 0.5 * _.easeInBounce(2 * e)
            : 0.5 * _.easeOutBounce(2 * e - 1) + 0.5;
        }
      };
    (C.easing = {}),
      C.extend(C.easing, _),
      C.extend({
        animate: function(a, o, r, l, c) {
          var d,
            e,
            t,
            n,
            i,
            h = C(a),
            u = performance.now(),
            p = {};
          if (
            ((0 !== r && !C.fx.off) || (r = 1),
            (r = r || 300),
            (l = l || this.easing.def),
            "function" == typeof r && ((c = r), (r = 300), (l = "linear")),
            "function" == typeof l && ((c = l), (l = this.easing.def)),
            h.origin("animation-stop", 0),
            g(o))
          )
            for (d in o)
              o.hasOwnProperty(d) &&
                ((i =
                  "" ===
                    (t = Array.isArray(o[d])
                      ? ((e = f(o[d][0])), f(o[d][1]))
                      : ((e = f(h.style(d))), f(o[d])))[1] &&
                  -1 === s.indexOf(d)
                    ? "px"
                    : t[1]),
                (n = t[0] - e[0]),
                (p[d] = [e[0], t[0], n, i]));
          return (
            h.origin(
              "animation",
              requestAnimationFrame(function e(t) {
                var n,
                  i,
                  s = h.origin("animation-stop");
                if (0 < s)
                  return (
                    2 === s &&
                      ("function" == typeof o
                        ? C.proxy(o, h[0])(1, 1)
                        : g(o) &&
                          (function(e, t) {
                            for (d in p)
                              p.hasOwnProperty(d) &&
                                h.css(d, p[d][0] + 1 * p[d][2] + p[d][3]);
                          })()),
                    k(C(a).origin("animation")),
                    void ("function" == typeof c && C.proxy(c, h[0])())
                  );
                if (
                  (1 < (i = (t - u) / r) && (i = 1),
                  i < 0 && (i = 0),
                  (n = ("string" == typeof l
                    ? C.easing[l]
                      ? C.easing[l]
                      : C.easing[C.easing.def]
                    : l)(i)),
                  "function" == typeof o)
                )
                  C.proxy(o, h[0])(i, n);
                else {
                  if (!g(o))
                    throw new Error(
                      "Unknown draw object. Must be a function or plain object"
                    );
                  !(function(e, t) {
                    for (d in p)
                      p.hasOwnProperty(d) &&
                        h.css(d, p[d][0] + p[d][2] * t + p[d][3]);
                  })(0, n);
                }
                1 === i && "function" == typeof c && C.proxy(c, h[0])(),
                  i < 1 && h.origin("animation", requestAnimationFrame(e));
              })
            ),
            this
          );
        },
        stop: function(e, t) {
          C(e).origin("animation-stop", !0 === t ? 2 : 1);
        }
      }),
      C.fn.extend({
        animate: function(e, t, n, i) {
          return this.each(function() {
            return C.animate(this, e, t, n, i);
          });
        },
        stop: function(e) {
          return this.each(function() {
            return C.stop(this, e);
          });
        }
      }),
      C.extend({
        hidden: function(e, t, n) {
          return (
            (e = C(e)[0]),
            "string" == typeof t && (t = "true" === t.toLowerCase()),
            "function" == typeof t && ((n = t), (t = !e.hidden)),
            (e.hidden = t),
            "function" == typeof n && (C.bind(n, e), n.call(e, arguments)),
            this
          );
        },
        hide: function(e, t) {
          var n = C(e);
          return (
            e.style.display &&
              n.origin(
                "display",
                e.style.display
                  ? e.style.display
                  : getComputedStyle(e, null).display
              ),
            (e.style.display = "none"),
            "function" == typeof t && (C.bind(t, e), t.call(e, arguments)),
            this
          );
        },
        show: function(e, t) {
          var n = C(e).origin("display", h, "block");
          return (
            (e.style.display = n ? ("none" === n ? "block" : n) : ""),
            0 === parseInt(e.style.opacity) && (e.style.opacity = "1"),
            "function" == typeof t && (C.bind(t, e), t.call(e, arguments)),
            this
          );
        },
        visible: function(e, t, n) {
          return (
            t === h && (t = !0),
            (e.style.visibility = t ? "visible" : "hidden"),
            "function" == typeof n && (C.bind(n, e), n.call(e, arguments)),
            this
          );
        },
        toggle: function(e, t) {
          var n;
          return (
            (n =
              "none" !== getComputedStyle(e, null).display ? "hide" : "show"),
            C[n](e, t)
          );
        }
      }),
      C.fn.extend({
        hide: function(e) {
          var t = h;
          return (
            C.each(arguments, function() {
              "function" == typeof this && (t = this);
            }),
            this.each(function() {
              C.hide(this, t);
            })
          );
        },
        show: function(e) {
          var t = h;
          return (
            C.each(arguments, function() {
              "function" == typeof this && (t = this);
            }),
            this.each(function() {
              C.show(this, t);
            })
          );
        },
        visible: function(e, t) {
          return this.each(function() {
            C.visible(this, e, t);
          });
        },
        toggle: function(e) {
          return this.each(function() {
            C.toggle(this, e);
          });
        },
        hidden: function(e, t) {
          return this.each(function() {
            C.hidden(this, e, t);
          });
        }
      }),
      C.extend({
        fx: { off: !1 },
        fadeIn: function(e, t, n, i) {
          var s = C(e);
          if (!o(s[0]) || (o(s[0]) && 0 === parseInt(s.style("opacity")))) {
            m(t) && m(n) && m(i)
              ? ((i = null), (t = 1e3))
              : "function" == typeof t && ((i = t), (t = 1e3)),
              "function" == typeof n && ((i = n), (n = "linear"));
            var a = C(e).origin("display", h, "block");
            return (
              (e.style.opacity = "0"),
              (e.style.display = a),
              this.animate(e, { opacity: 1 }, t, n, function() {
                this.style.removeProperty("opacity"),
                  "function" == typeof i && C.proxy(i, this)();
              })
            );
          }
          return this;
        },
        fadeOut: function(e, t, n, i) {
          var s = C(e);
          if (o(s[0]))
            return (
              m(t) && m(n) && m(i)
                ? ((i = null), (t = 1e3))
                : "function" == typeof t && ((i = t), (t = 1e3)),
              "function" == typeof n && ((i = n), (n = "linear")),
              s.origin("display", C(e).style("display")),
              this.animate(e, { opacity: 0 }, t, n, function() {
                (this.style.display = "none"),
                  this.style.removeProperty("opacity"),
                  "function" == typeof i && C.proxy(i, this)();
              })
            );
        },
        slideDown: function(n, e, t, i) {
          var s,
            a,
            o = C(n);
          if (isNaN(o.height()) || 0 === o.height())
            return (
              m(e) && m(t) && m(i)
                ? ((i = null), (e = 100))
                : "function" == typeof e && ((i = e), (e = 100)),
              "function" == typeof t && ((i = t), (t = "linear")),
              o.show().visible(!1),
              (s = o.origin("height", h, o.height())),
              (a = o.origin("display", C(n).style("display"), "block")),
              o.height(0).visible(!0),
              o.css({
                overflow: "hidden",
                display: "none" === a ? "block" : a
              }),
              this.animate(
                n,
                function(e, t) {
                  (n.style.height = s * t + "px"),
                    1 === e &&
                      C(n).removeStyleProperty("overflow, height, visibility");
                },
                e,
                t,
                i
              )
            );
        },
        slideUp: function(n, e, t, i) {
          var s,
            a = C(n);
          if (0 !== a.height())
            return (
              m(e) && m(t) && m(i)
                ? ((i = null), (e = 100))
                : "function" == typeof e && ((i = e), (e = 100)),
              "function" == typeof t && ((i = t), (t = "linear")),
              (s = a.height()),
              a.origin("height", s),
              a.origin("display", C(n).style("display")),
              a.css({ overflow: "hidden" }),
              this.animate(
                n,
                function(e, t) {
                  (n.style.height = (1 - t) * s + "px"),
                    1 === e && a.hide().removeStyleProperty("overflow, height");
                },
                e,
                t,
                i
              )
            );
        }
      }),
      C.fn.extend({
        fadeIn: function(e, t, n) {
          return this.each(function() {
            C.fadeIn(this, e, t, n);
          });
        },
        fadeOut: function(e, t, n) {
          return this.each(function() {
            C.fadeOut(this, e, t, n);
          });
        },
        slideUp: function(e, t, n) {
          return this.each(function() {
            C.slideUp(this, e, t, n);
          });
        },
        slideDown: function(e, t, n) {
          return this.each(function() {
            C.slideDown(this, e, t, n);
          });
        }
      }),
      (C.init = function(e, t) {
        var n;
        if (((this.uid = C.uniqueId()), !e)) return this;
        if ("function" == typeof e) return C.ready(e);
        if (
          "object" == typeof e &&
          "undefined" != typeof jQuery &&
          e instanceof jQuery
        )
          return C.import(e);
        if (
          ("string" == typeof e && "document" === e && (e = document),
          "string" == typeof e && "body" === e && (e = document.body),
          "string" == typeof e &&
            "html" === e &&
            (e = document.documentElement),
          "string" == typeof e && "doctype" === e && (e = document.doctype),
          e && (e.nodeType || e.self === window))
        )
          return (this[0] = e), (this.length = 1), this;
        if (e instanceof C) {
          var i = C();
          return (
            C.each(e, function() {
              i.push(this);
            }),
            i
          );
        }
        if ("object" == typeof e) return e;
        if ("string" == typeof e) {
          if ("#" === (e = e.trim()) || "." === e)
            throw new Error("sel can't be # or .");
          1 === (n = C.parseHTML(e, t)).length && 3 === n[0].nodeType
            ? [].push.apply(this, document.querySelectorAll(e))
            : C.merge(this, n);
        }
        return (
          t !== h &&
            (t instanceof C || t instanceof HTMLElement) &&
            this.each(function() {
              C(t).append(C(this));
            }),
          this
        );
      }),
      (C.init.prototype = C.fn);
    var O = e.$;
    e.m4q;
    (C.Promise = Promise),
      (e.m4q = C),
      void 0 === e.$ && (e.$ = C),
      (m4q.global = function() {
        (O = e.$), e.m4q, (e.$ = C);
      }),
      (m4q.noConflict = function() {
        return e.$ === C && (e.$ = O), C;
      });
  })(window);
  var k = m4q;
  if ("undefined" == typeof m4q)
    throw new Error("Metro 4 requires m4q helper!");
  if (!1 in window) throw new Error("Metro 4 requires MutationObserver!");
  var e = k.meta("metro4:init").attr("content"),
    t = k.meta("metro4:locale").attr("content"),
    n = k.meta("metro4:week_start").attr("content"),
    i = k.meta("metro4:date_format").attr("content"),
    s = k.meta("metro4:date_format_input").attr("content"),
    a = k.meta("metro4:animation_duration").attr("content"),
    r = k.meta("metro4:callback_timeout").attr("content"),
    l = k.meta("metro4:timeout").attr("content"),
    c = k.meta("metro4:scroll_multiple").attr("content"),
    d = k.meta("metro4:cloak").attr("content"),
    h = k.meta("metro4:cloak_duration").attr("content"),
    u = k.meta("metro4:jquery").attr("content");
  (window.jquery_present = "undefined" != typeof jQuery),
    void 0 === window.METRO_JQUERY &&
      (window.METRO_JQUERY = void 0 === u || JSON.parse(u));
  var p = k.meta("metro4:about").attr("content");
  void 0 === window.METRO_SHOW_ABOUT &&
    (window.METRO_SHOW_ABOUT = void 0 === p || JSON.parse(p));
  var f = k.meta("metro4:compile").attr("content");
  void 0 === window.METRO_SHOW_COMPILE_TIME &&
    (window.METRO_SHOW_COMPILE_TIME = void 0 === f || JSON.parse(f)),
    void 0 === window.METRO_INIT &&
      (window.METRO_INIT = void 0 === e || JSON.parse(e)),
    void 0 === window.METRO_DEBUG && (window.METRO_DEBUG = !0),
    void 0 === window.METRO_WEEK_START &&
      (window.METRO_WEEK_START = void 0 !== n ? parseInt(n) : 0),
    void 0 === window.METRO_DATE_FORMAT &&
      (window.METRO_DATE_FORMAT = void 0 !== i ? i : "%Y-%m-%d"),
    void 0 === window.METRO_DATE_FORMAT_INPUT &&
      (window.METRO_DATE_FORMAT_INPUT = void 0 !== s ? s : "%Y-%m-%d"),
    void 0 === window.METRO_LOCALE &&
      (window.METRO_LOCALE = void 0 !== t ? t : "en-US"),
    void 0 === window.METRO_ANIMATION_DURATION &&
      (window.METRO_ANIMATION_DURATION = void 0 !== a ? parseInt(a) : 100),
    void 0 === window.METRO_CALLBACK_TIMEOUT &&
      (window.METRO_CALLBACK_TIMEOUT = void 0 !== r ? parseInt(r) : 500),
    void 0 === window.METRO_TIMEOUT &&
      (window.METRO_TIMEOUT = void 0 !== l ? parseInt(l) : 2e3),
    void 0 === window.METRO_SCROLL_MULTIPLE &&
      (window.METRO_SCROLL_MULTIPLE = void 0 !== c ? parseInt(c) : 20),
    void 0 === window.METRO_CLOAK_REMOVE &&
      (window.METRO_CLOAK_REMOVE =
        void 0 !== d ? ("" + d).toLowerCase() : "fade"),
    void 0 === window.METRO_CLOAK_DURATION &&
      (window.METRO_CLOAK_DURATION = void 0 !== h ? parseInt(h) : 500),
    void 0 === window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE &&
      (window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE = !0),
    void 0 === window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS &&
      (window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS = !0),
    void 0 === window.METRO_HOTKEYS_FILTER_TEXT_INPUTS &&
      (window.METRO_HOTKEYS_FILTER_TEXT_INPUTS = !0),
    void 0 === window.METRO_HOTKEYS_BUBBLE_UP &&
      (window.METRO_HOTKEYS_BUBBLE_UP = !1),
    void 0 === window.METRO_THROWS && (window.METRO_THROWS = !0),
    (window.METRO_MEDIA = []),
    "function" != typeof Object.create &&
      (Object.create = function(e) {
        function t() {}
        return (t.prototype = e), new t();
      }),
    "function" != typeof Object.values &&
      (Object.values = function(t) {
        return Object.keys(t).map(function(e) {
          return t[e];
        });
      });
  var m =
      "ontouchstart" in window ||
      0 < navigator.MaxTouchPoints ||
      0 < navigator.msMaxTouchPoints,
    C = {
      version: "4.3.1",
      compileTime: "25/09/2019 23:11:38",
      buildNumber: "738",
      isTouchable: m,
      fullScreenEnabled: document.fullscreenEnabled,
      sheet: null,
      controlsPosition: { INSIDE: "inside", OUTSIDE: "outside" },
      groupMode: { ONE: "one", MULTI: "multi" },
      aspectRatio: { HD: "hd", SD: "sd", CINEMA: "cinema" },
      fullScreenMode: { WINDOW: "window", DESKTOP: "desktop" },
      position: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
        TOP_RIGHT: "top-right",
        TOP_LEFT: "top-left",
        BOTTOM_LEFT: "bottom-left",
        BOTTOM_RIGHT: "bottom-right",
        LEFT_BOTTOM: "left-bottom",
        LEFT_TOP: "left-top",
        RIGHT_TOP: "right-top",
        RIGHT_BOTTOM: "right-bottom"
      },
      popoverEvents: { CLICK: "click", HOVER: "hover", FOCUS: "focus" },
      stepperView: { SQUARE: "square", CYCLE: "cycle", DIAMOND: "diamond" },
      listView: {
        LIST: "list",
        CONTENT: "content",
        ICONS: "icons",
        ICONS_MEDIUM: "icons-medium",
        ICONS_LARGE: "icons-large",
        TILES: "tiles",
        TABLE: "table"
      },
      events: {
        click: "click",
        start: m ? "touchstart" : "mousedown",
        stop: m ? "touchend" : "mouseup",
        move: m ? "touchmove" : "mousemove",
        enter: m ? "touchstart" : "mouseenter",
        startAll: "mousedown touchstart",
        stopAll: "mouseup touchend",
        moveAll: "mousemove touchmove",
        leave: "mouseleave",
        focus: "focus",
        blur: "blur",
        resize: "resize",
        keyup: "keyup",
        keydown: "keydown",
        keypress: "keypress",
        dblclick: "dblclick",
        input: "input",
        change: "change",
        cut: "cut",
        paste: "paste",
        scroll: "scroll",
        mousewheel: "mousewheel",
        inputchange: "change input propertychange cut paste copy drop",
        dragstart: "dragstart",
        dragend: "dragend",
        dragenter: "dragenter",
        dragover: "dragover",
        dragleave: "dragleave",
        drop: "drop",
        drag: "drag"
      },
      keyCode: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        BREAK: 19,
        CAPS: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGEUP: 33,
        PAGEDOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        COMMA: 188
      },
      media_queries: {
        FS: "(min-width: 0px)",
        XS: "(min-width: 360px)",
        SM: "(min-width: 576px)",
        MD: "(min-width: 768px)",
        LG: "(min-width: 992px)",
        XL: "(min-width: 1200px)",
        XXL: "(min-width: 1452px)"
      },
      media_sizes: {
        FS: 0,
        XS: 360,
        SM: 576,
        LD: 640,
        MD: 768,
        LG: 992,
        XL: 1200,
        XXL: 1452
      },
      media_mode: {
        FS: "fs",
        XS: "xs",
        SM: "sm",
        MD: "md",
        LG: "lg",
        XL: "xl",
        XXL: "xxl"
      },
      media_modes: ["fs", "xs", "sm", "md", "lg", "xl", "xxl"],
      actions: { REMOVE: 1, HIDE: 2 },
      hotkeys: {},
      about: function() {
        console.log("Metro 4 - v" + C.version + ". " + C.showCompileTime()),
          console.log("m4q - " + m4q.version);
      },
      showCompileTime: function() {
        return "Built at: " + C.compileTime;
      },
      aboutDlg: function() {
        alert("Metro 4 - v" + C.version + ". " + C.showCompileTime());
      },
      ver: function() {
        return C.version;
      },
      build: function() {
        return C.build;
      },
      compile: function() {
        return C.compileTime;
      },
      observe: function() {
        new MutationObserver(function(e) {
          e.map(function(t) {
            if ("attributes" === t.type && "data-role" !== t.attributeName)
              if ("data-hotkey" === t.attributeName)
                C.initHotkeys([t.target], !0);
              else {
                var n = k(t.target),
                  e = n.data("metroComponent");
                void 0 !== e &&
                  k.each(e, function() {
                    var e = C.getPlugin(n, this);
                    e && e.changeAttribute(t.attributeName);
                  });
              }
            else if ("childList" === t.type && 0 < t.addedNodes.length) {
              var i,
                s,
                a,
                o = [],
                r = t.addedNodes;
              if (r.length) {
                for (i = 0; i < r.length; i++)
                  (a = r[i]),
                    void 0 !== (s = k(a)).attr("data-role") && o.push(a),
                    k.each(s.find("[data-role]"), function() {
                      -1 === o.indexOf(this) && o.push(this);
                    });
                o.length && C.initWidgets(o, "observe");
              }
            }
          });
        }).observe(k("html")[0], {
          childList: !0,
          attributes: !0,
          subtree: !0
        });
      },
      init: function() {
        var e = k("[data-role]"),
          t = k("[data-hotkey]"),
          n = k("html");
        return (
          !0 == m
            ? n.addClass("metro-touch-device")
            : n.addClass("metro-no-touch-device"),
          (C.sheet = H.newCssSheet()),
          (window.METRO_MEDIA = []),
          k.each(C.media_queries, function(e, t) {
            H.media(t) && METRO_MEDIA.push(C.media_mode[e]);
          }),
          C.observe(),
          C.initHotkeys(t),
          C.initWidgets(e, "init"),
          METRO_SHOW_ABOUT && C.about(!0),
          "fade" !== METRO_CLOAK_REMOVE
            ? k(".m4-cloak").removeClass("m4-cloak")
            : k(".m4-cloak").animate(
                { opacity: 1 },
                METRO_CLOAK_DURATION,
                function() {
                  k(".m4-cloak").removeClass("m4-cloak");
                }
              ),
          C
        );
      },
      initHotkeys: function(e, i) {
        k.each(e, function() {
          var e = k(this),
            t = !!e.attr("data-hotkey") && e.attr("data-hotkey").toLowerCase(),
            n = !!e.attr("data-hotkey-func") && e.attr("data-hotkey-func");
          !1 !== t &&
            ((!0 === e.data("hotKeyBonded") && !H.bool(i)) ||
              ((C.hotkeys[t] = [this, n]), e.data("hotKeyBonded", !0)));
        });
      },
      initWidgets: function(e) {
        k.each(e, function() {
          var i = k(this);
          i.data("role")
            .split(/\s*,\s*/)
            .map(function(e) {
              var t = H.$();
              if (void 0 !== t.fn[e] && void 0 === i.attr("data-role-" + e))
                try {
                  t.fn[e].call(i), i.attr("data-role-" + e, !0);
                  var n = i.data("metroComponent");
                  void 0 === n ? (n = [e]) : n.push(e),
                    i.data("metroComponent", n);
                } catch (e) {
                  throw (console.error(e.message + " in " + e.stack), e);
                }
            });
        });
      },
      plugin: function(t, n) {
        (k.fn[t] = function(e) {
          return this.each(function() {
            k.data(this, t, Object.create(n).init(e, this));
          });
        }),
          METRO_JQUERY &&
            "undefined" != typeof jQuery &&
            (jQuery.fn[t] = function(e) {
              return this.each(function() {
                jQuery.data(this, t, Object.create(n).init(e, this));
              });
            });
      },
      destroyPlugin: function(e, t) {
        var n,
          i,
          s = k(e);
        if (((n = s.data(t)), !H.isValue(n)))
          throw new Error(
            "Component can not be destroyed: the element is not a Metro 4 component."
          );
        if (!H.isFunc(n.destroy))
          throw new Error(
            "Component can not be destroyed: method destroy not found."
          );
        n.destroy(),
          (i = s.data("metroComponent")),
          H.arrayDelete(i, t),
          s.data("metroComponent", i),
          k.removeData(s[0], t),
          s.removeAttr("data-role-" + t);
      },
      destroyPluginAll: function(e) {
        var t = k(e),
          n = t.data("metroComponent");
        void 0 !== n &&
          0 < n.length &&
          k.each(n, function() {
            C.destroyPlugin(t[0], this);
          });
      },
      noop: function() {},
      noop_true: function() {
        return !0;
      },
      noop_false: function() {
        return !1;
      },
      stop: function(e) {
        e.stopPropagation(), e.preventDefault();
      },
      requestFullScreen: function(e) {
        e.mozRequestFullScreen
          ? e.mozRequestFullScreen()
          : e.webkitRequestFullScreen
          ? e.webkitRequestFullScreen()
          : e.msRequestFullscreen
          ? e.msRequestFullscreen()
          : e.requestFullscreen().catch(function(e) {
              console.log(
                "Error attempting to enable full-screen mode: " +
                  e.message +
                  " " +
                  e.name
              );
            });
      },
      exitFullScreen: function() {
        document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitCancelFullScreen
          ? document.webkitCancelFullScreen()
          : document.msExitFullscreen
          ? document.msExitFullscreen()
          : document.exitFullscreen().catch(function(e) {
              console.log(
                "Error attempting to disable full-screen mode: " +
                  e.message +
                  " " +
                  e.name
              );
            });
      },
      inFullScreen: function() {
        return (
          void 0 !==
          (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement)
        );
      },
      checkRuntime: function(e, t) {
        var n = k(e);
        n.attr("data-role-" + t) || C.makeRuntime(n, t);
      },
      makeRuntime: function(e, t) {
        var n = k(e);
        n.attr("data-role-" + t, !0), n.attr("data-role", t);
        var i = n.data("metroComponent");
        void 0 === i ? (i = [t]) : i.push(t), n.data("metroComponent", i);
      },
      getPlugin: function(e, t) {
        return H.$()(k(e)[0]).data(t);
      },
      makePlugin: function(e, t, n) {
        return H.$()(k(e)[0])[t](n);
      }
    };
  (window.Metro = C),
    k(window).on(C.events.resize, function() {
      (window.METRO_MEDIA = []),
        k.each(C.media_queries, function(e, t) {
          H.media(t) && METRO_MEDIA.push(C.media_mode[e]);
        });
    });
  var v = {
    duration: METRO_ANIMATION_DURATION,
    func: "linear",
    switch: function(e, t) {
      e.hide(), t.css({ top: 0, left: 0 }).show();
    },
    slideUp: function(e, t, n, i) {
      var s = e.parent().outerHeight(!0);
      void 0 === n && (n = this.duration),
        void 0 === i && (i = this.func),
        e.css("z-index", 1).animate({ top: -s, opacity: 0 }, n, i),
        t
          .css({ top: s, left: 0, zIndex: 2 })
          .animate({ top: 0, opacity: 1 }, n, i);
    },
    slideDown: function(e, t, n, i) {
      var s = e.parent().outerHeight(!0);
      void 0 === n && (n = this.duration),
        void 0 === i && (i = this.func),
        e.css("z-index", 1).animate({ top: s, opacity: 0 }, n, i),
        t
          .css({ left: 0, top: -s, zIndex: 2 })
          .animate({ top: 0, opacity: 1 }, n, i);
    },
    slideLeft: function(e, t, n, i) {
      var s = e.parent().outerWidth(!0);
      void 0 === n && (n = this.duration),
        void 0 === i && (i = this.func),
        e.css("z-index", 1).animate({ left: -s, opacity: 0 }, n, i),
        t.css({ left: s, zIndex: 2 }).animate({ left: 0, opacity: 1 }, n, i);
    },
    slideRight: function(e, t, n, i) {
      var s = e.parent().outerWidth(!0);
      void 0 === n && (n = this.duration),
        void 0 === i && (i = this.func),
        e.css("z-index", 1).animate({ left: s, opacity: 0 }, n, i),
        t.css({ left: -s, zIndex: 2 }).animate({ left: 0, opacity: 1 }, n, i);
    },
    fade: function(e, t, n) {
      void 0 === n && (n = this.duration),
        e.animate({ opacity: 0 }, n),
        t.css({ top: 0, left: 0, opacity: 0 }).animate({ opacity: 1 }, n);
    }
  };
  function g(e, t, n) {
    (this.r = e || 0), (this.g = t || 0), (this.g = n || 0);
  }
  function b(e, t, n) {
    (this.h = e || 0), (this.s = t || 0), (this.v = n || 0);
  }
  function w(e, t, n, i) {
    (this.c = e || 0), (this.m = t || 0), (this.y = n || 0), (this.k = i || 0);
  }
  (C.animation = v),
    "function" != typeof Array.shuffle &&
      (Array.prototype.shuffle = function() {
        for (var e, t, n = this.length; 0 !== n; )
          (t = Math.floor(Math.random() * n)),
            (e = this[(n -= 1)]),
            (this[n] = this[t]),
            (this[t] = e);
        return this;
      }),
    "function" != typeof Array.clone &&
      (Array.prototype.clone = function() {
        return this.slice(0);
      }),
    "function" != typeof Array.unique &&
      (Array.prototype.unique = function() {
        for (var e = this.concat(), t = 0; t < e.length; ++t)
          for (var n = t + 1; n < e.length; ++n)
            e[t] === e[n] && e.splice(n--, 1);
        return e;
      }),
    "function" != typeof Array.from &&
      (Array.from = function(e) {
        var t,
          n = [];
        if (void 0 === e.length && "object" == typeof e)
          return Object.values(e);
        if (void 0 === e.length)
          throw new Error("Value can not be converted to array");
        for (t = 0; t < e.length; t++) n.push(e[t]);
        return n;
      }),
    "function" != typeof Array.contains &&
      (Array.prototype.contains = function(e, t) {
        return -1 < this.indexOf(e, t);
      });
  var y = {
    TYPES: {
      HEX: "hex",
      RGB: "rgb",
      RGBA: "rgba",
      HSV: "hsv",
      HSL: "hsl",
      CMYK: "cmyk",
      UNKNOWN: "unknown"
    },
    PALETTES: {
      ALL: "colorList",
      METRO: "colorListMetro",
      STANDARD: "colorListStandard"
    },
    colorListMetro: {
      lime: "#a4c400",
      green: "#60a917",
      emerald: "#008a00",
      blue: "#00AFF0",
      teal: "#00aba9",
      cyan: "#1ba1e2",
      cobalt: "#0050ef",
      indigo: "#6a00ff",
      violet: "#aa00ff",
      pink: "#dc4fad",
      magenta: "#d80073",
      crimson: "#a20025",
      red: "#CE352C",
      orange: "#fa6800",
      amber: "#f0a30a",
      yellow: "#fff000",
      brown: "#825a2c",
      olive: "#6d8764",
      steel: "#647687",
      mauve: "#76608a",
      taupe: "#87794e"
    },
    colorListStandard: {
      aliceBlue: "#f0f8ff",
      antiqueWhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedAlmond: "#ffebcd",
      blue: "#0000ff",
      blueViolet: "#8a2be2",
      brown: "#a52a2a",
      burlyWood: "#deb887",
      cadetBlue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerBlue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkBlue: "#00008b",
      darkCyan: "#008b8b",
      darkGoldenRod: "#b8860b",
      darkGray: "#a9a9a9",
      darkGreen: "#006400",
      darkKhaki: "#bdb76b",
      darkMagenta: "#8b008b",
      darkOliveGreen: "#556b2f",
      darkOrange: "#ff8c00",
      darkOrchid: "#9932cc",
      darkRed: "#8b0000",
      darkSalmon: "#e9967a",
      darkSeaGreen: "#8fbc8f",
      darkSlateBlue: "#483d8b",
      darkSlateGray: "#2f4f4f",
      darkTurquoise: "#00ced1",
      darkViolet: "#9400d3",
      deepPink: "#ff1493",
      deepSkyBlue: "#00bfff",
      dimGray: "#696969",
      dodgerBlue: "#1e90ff",
      fireBrick: "#b22222",
      floralWhite: "#fffaf0",
      forestGreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#DCDCDC",
      ghostWhite: "#F8F8FF",
      gold: "#ffd700",
      goldenRod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenYellow: "#adff2f",
      honeyDew: "#f0fff0",
      hotPink: "#ff69b4",
      indianRed: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderBlush: "#fff0f5",
      lawnGreen: "#7cfc00",
      lemonChiffon: "#fffacd",
      lightBlue: "#add8e6",
      lightCoral: "#f08080",
      lightCyan: "#e0ffff",
      lightGoldenRodYellow: "#fafad2",
      lightGray: "#d3d3d3",
      lightGreen: "#90ee90",
      lightPink: "#ffb6c1",
      lightSalmon: "#ffa07a",
      lightSeaGreen: "#20b2aa",
      lightSkyBlue: "#87cefa",
      lightSlateGray: "#778899",
      lightSteelBlue: "#b0c4de",
      lightYellow: "#ffffe0",
      lime: "#00ff00",
      limeGreen: "#32dc32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumAquaMarine: "#66cdaa",
      mediumBlue: "#0000cd",
      mediumOrchid: "#ba55d3",
      mediumPurple: "#9370db",
      mediumSeaGreen: "#3cb371",
      mediumSlateBlue: "#7b68ee",
      mediumSpringGreen: "#00fa9a",
      mediumTurquoise: "#48d1cc",
      mediumVioletRed: "#c71585",
      midnightBlue: "#191970",
      mintCream: "#f5fffa",
      mistyRose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajoWhite: "#ffdead",
      navy: "#000080",
      oldLace: "#fdd5e6",
      olive: "#808000",
      oliveDrab: "#6b8e23",
      orange: "#ffa500",
      orangeRed: "#ff4500",
      orchid: "#da70d6",
      paleGoldenRod: "#eee8aa",
      paleGreen: "#98fb98",
      paleTurquoise: "#afeeee",
      paleVioletRed: "#db7093",
      papayaWhip: "#ffefd5",
      peachPuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderBlue: "#b0e0e6",
      purple: "#800080",
      rebeccaPurple: "#663399",
      red: "#ff0000",
      rosyBrown: "#bc8f8f",
      royalBlue: "#4169e1",
      saddleBrown: "#8b4513",
      salmon: "#fa8072",
      sandyBrown: "#f4a460",
      seaGreen: "#2e8b57",
      seaShell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      slyBlue: "#87ceeb",
      slateBlue: "#6a5acd",
      slateGray: "#708090",
      snow: "#fffafa",
      springGreen: "#00ff7f",
      steelBlue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whiteSmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowGreen: "#9acd32"
    },
    colorList: {},
    options: {
      angle: 30,
      algorithm: 1,
      step: 0.1,
      distance: 5,
      tint1: 0.8,
      tint2: 0.4,
      shade1: 0.6,
      shade2: 0.3,
      alpha: 1
    },
    init: function() {
      return (
        (this.colorList = k.extend(
          {},
          this.colorListStandard,
          this.colorListMetro
        )),
        this
      );
    },
    setup: function(e) {
      this.options = k.extend({}, this.options, e);
    },
    color: function(e, t) {
      return void 0 !== this[(t = t || this.PALETTES.ALL)][e] && this[t][e];
    },
    palette: function(e) {
      return (e = e || this.PALETTES.ALL), Object.keys(this[e]);
    },
    colors: function(e) {
      var t = [];
      return (
        (e = e || this.PALETTES.ALL),
        k.each(this[e], function() {
          t.push(this);
        }),
        t
      );
    },
    hex2rgb: function(e) {
      e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, n, i) {
        return t + t + n + n + i + i;
      });
      var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
      return t
        ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16)
          }
        : null;
    },
    rgb2hex: function(e) {
      return (
        "#" + ((1 << 24) + (e.r << 16) + (e.g << 8) + e.b).toString(16).slice(1)
      );
    },
    rgb2hsv: function(e) {
      var t,
        n,
        i,
        s = new b(),
        a = e.r / 255,
        o = e.g / 255,
        r = e.b / 255,
        l = Math.max(a, o, r),
        c = Math.min(a, o, r),
        d = l - c;
      return (
        (n = 0 === (i = l) ? 0 : 1 - c / l),
        (t =
          l === c
            ? 0
            : l === a && r <= o
            ? ((o - r) / d) * 60
            : l === a && o < r
            ? ((o - r) / d) * 60 + 360
            : l === o
            ? ((r - a) / d) * 60 + 120
            : l === r
            ? ((a - o) / d) * 60 + 240
            : 0),
        (s.h = t),
        (s.s = n),
        (s.v = i),
        s
      );
    },
    hsv2rgb: function(e) {
      var t,
        n,
        i,
        s = e.h,
        a = 100 * e.s,
        o = 100 * e.v,
        r = ((100 - a) * o) / 100,
        l = ((s % 60) / 60) * (o - r),
        c = r + l,
        d = o - l;
      switch (Math.floor(s / 60)) {
        case 0:
          (t = o), (n = c), (i = r);
          break;
        case 1:
          (t = d), (n = o), (i = r);
          break;
        case 2:
          (t = r), (n = o), (i = c);
          break;
        case 3:
          (t = r), (n = d), (i = o);
          break;
        case 4:
          (t = c), (n = r), (i = o);
          break;
        case 5:
          (t = o), (n = r), (i = d);
      }
      return {
        r: Math.round((255 * t) / 100),
        g: Math.round((255 * n) / 100),
        b: Math.round((255 * i) / 100)
      };
    },
    hsv2hex: function(e) {
      return this.rgb2hex(this.hsv2rgb(e));
    },
    hex2hsv: function(e) {
      return this.rgb2hsv(this.hex2rgb(e));
    },
    rgb2cmyk: function(e) {
      var t = new w(),
        n = e.r / 255,
        i = e.g / 255,
        s = e.b / 255;
      return (
        (t.k = Math.min(1 - n, 1 - i, 1 - s)),
        (t.c = (1 - n - t.k) / (1 - t.k)),
        (t.m = (1 - i - t.k) / (1 - t.k)),
        (t.y = (1 - s - t.k) / (1 - t.k)),
        (t.c = Math.round(100 * t.c)),
        (t.m = Math.round(100 * t.m)),
        (t.y = Math.round(100 * t.y)),
        (t.k = Math.round(100 * t.k)),
        t
      );
    },
    cmyk2rgb: function(e) {
      var t = new g(),
        n = e.c / 100,
        i = e.m / 100,
        s = e.y / 100,
        a = e.k / 100;
      return (
        (t.r = 1 - Math.min(1, n * (1 - a) + a)),
        (t.g = 1 - Math.min(1, i * (1 - a) + a)),
        (t.b = 1 - Math.min(1, s * (1 - a) + a)),
        (t.r = Math.round(255 * t.r)),
        (t.g = Math.round(255 * t.g)),
        (t.b = Math.round(255 * t.b)),
        t
      );
    },
    hsv2hsl: function(e) {
      var t, n, i;
      return (
        (t = e.h),
        (i = (2 - e.s) * e.v),
        (n = e.s * e.v),
        { h: t, s: (n /= i <= 1 ? i : 2 - i), l: (i /= 2) }
      );
    },
    hsl2hsv: function(e) {
      var t, n, i, s;
      return (
        (t = e.h),
        (i = ((s = 2 * e.l) + (n = e.s * (s <= 1 ? s : 2 - s))) / 2),
        { h: t, s: (n = (2 * n) / (s + n)), l: i }
      );
    },
    rgb2websafe: function(e) {
      return {
        r: 51 * Math.round(e.r / 51),
        g: 51 * Math.round(e.g / 51),
        b: 51 * Math.round(e.b / 51)
      };
    },
    rgba2websafe: function(e) {
      return {
        r: 51 * Math.round(e.r / 51),
        g: 51 * Math.round(e.g / 51),
        b: 51 * Math.round(e.b / 51),
        a: e.a
      };
    },
    hex2websafe: function(e) {
      return this.rgb2hex(this.rgb2websafe(this.toRGB(e)));
    },
    hsv2websafe: function(e) {
      return this.rgb2hsv(this.rgb2websafe(this.toRGB(e)));
    },
    hsl2websafe: function(e) {
      return this.hsv2hsl(this.rgb2hsv(this.rgb2websafe(this.toRGB(e))));
    },
    cmyk2websafe: function(e) {
      return this.rgb2cmyk(this.rgb2websafe(this.cmyk2rgb(e)));
    },
    websafe: function(e) {
      return this.isHEX(e)
        ? this.hex2websafe(e)
        : this.isRGB(e)
        ? this.rgb2websafe(e)
        : this.isRGBA(e)
        ? this.rgba2websafe(e)
        : this.isHSV(e)
        ? this.hsv2websafe(e)
        : this.isHSL(e)
        ? this.hsl2websafe(e)
        : this.isCMYK(e)
        ? this.cmyk2websafe(e)
        : e;
    },
    is: function(e) {
      return this.isHEX(e)
        ? this.TYPES.HEX
        : this.isRGB(e)
        ? this.TYPES.RGB
        : this.isRGBA(e)
        ? this.TYPES.RGBA
        : this.isHSV(e)
        ? this.TYPES.HSV
        : this.isHSL(e)
        ? this.TYPES.HSL
        : this.isCMYK(e)
        ? this.TYPES.CMYK
        : this.TYPES.UNKNOWN;
    },
    toRGB: function(e) {
      if (this.isHSV(e)) return this.hsv2rgb(e);
      if (this.isHSL(e)) return this.hsv2rgb(this.hsl2hsv(e));
      if (this.isRGB(e)) return e;
      if (this.isHEX(e)) return this.hex2rgb(e);
      if (this.isCMYK(e)) return this.cmyk2rgb(e);
      throw new Error("Unknown color format!");
    },
    toRGBA: function(e, t) {
      var n = this.toRGB(e);
      return (n.a = t || 1), n;
    },
    toHSV: function(e) {
      return this.rgb2hsv(this.toRGB(e));
    },
    toHSL: function(e) {
      return this.hsv2hsl(this.rgb2hsv(this.toRGB(e)));
    },
    toHSLA: function(e, t) {
      var n;
      return (
        ((n = this.hsv2hsl(this.rgb2hsv(this.toRGB(e)))).a =
          t || this.options.alpha),
        n
      );
    },
    toHEX: function(e) {
      return this.rgb2hex(this.toRGB(e));
    },
    toCMYK: function(e) {
      return this.rgb2cmyk(this.toRGB(e));
    },
    toHexString: function(e) {
      return this.toHEX(e);
    },
    toHsvString: function(e) {
      var t = this.toHSV(e);
      return "hsv(" + [t.h, t.s, t.v].join(",") + ")";
    },
    toHslString: function(e) {
      var t = this.toHSL(e);
      return (
        "hsl(" +
        [
          Math.round(t.h),
          Math.round(100 * t.s) + "%",
          Math.round(100 * t.l) + "%"
        ].join(",") +
        ")"
      );
    },
    toHslaString: function(e) {
      var t = this.toHSLA(e);
      return (
        "hsl(" +
        [
          Math.round(t.h),
          Math.round(100 * t.s) + "%",
          Math.round(100 * t.l) + "%",
          t.a
        ].join(",") +
        ")"
      );
    },
    toCmykString: function(e) {
      var t = this.toCMYK(e);
      return "cmyk(" + [t.c, t.m, t.y, t.k].join(",") + ")";
    },
    toRgbString: function(e) {
      var t = this.toRGB(e);
      return "rgb(" + [t.r, t.g, t.b].join(",") + ")";
    },
    toRgbaString: function(e) {
      var t = this.toRGBA(e);
      return "rgba(" + [t.r, t.g, t.b, t.a].join(",") + ")";
    },
    toString: function(e) {
      if (this.isHEX(e)) return this.toHexString(e);
      if (this.isRGB(e)) return this.toRgbString(e);
      if (this.isRGBA(e)) return this.toRgbaString(e);
      if (this.isHSV(e)) return this.toHsvString(e);
      if (this.isHSL(e)) return this.toHslString(e);
      if (this.isHSLA(e)) return this.toHslaString(e);
      if (this.isCMYK(e)) return this.toCmykString(e);
      throw new Error("Unknown color format!");
    },
    grayscale: function(e, t) {
      t = t || "hex";
      var n = this.toRGB(e),
        i = Math.round(0.2125 * n.r + 0.7154 * n.g + 0.0721 * n.b),
        s = { r: i, g: i, b: i };
      return this["rgb2" + t](s);
    },
    darken: function(e, t) {
      return void 0 === t && (t = 10), this.lighten(e, -1 * Math.abs(t));
    },
    lighten: function(e, t) {
      function n(e, t) {
        var n = e.slice(1),
          i = parseInt(n, 16),
          s = (i >> 16) + t;
        255 < s ? (s = 255) : s < 0 && (s = 0);
        var a = ((i >> 8) & 255) + t;
        255 < a ? (a = 255) : a < 0 && (a = 0);
        var o = (255 & i) + t;
        return (
          255 < o ? (o = 255) : o < 0 && (o = 0),
          (r = "#" + (o | (a << 8) | (s << 16)).toString(16))
        );
      }
      var i,
        r,
        s = 1,
        a = 0 < t;
      for (
        void 0 === t && (t = 10),
          (i = this.is(e)) === this.TYPES.RGBA && (s = e.a);
        (r = n(this.toHEX(e), t)), a ? t-- : t++, r.length < 7;

      );
      switch (i) {
        case "rgb":
          return this.toRGB(r);
        case "rgba":
          return this.toRGBA(r, s);
        case "hsv":
          return this.toHSV(r);
        case "hsl":
          return this.toHSL(r);
        case "cmyk":
          return this.toCMYK(r);
        default:
          return r;
      }
    },
    isDark: function(e) {
      var t = this.toRGB(e);
      return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3 < 128;
    },
    isLight: function(e) {
      return !this.isDark(e);
    },
    isHSV: function(e) {
      return H.isObject(e) && "h" in e && "s" in e && "v" in e;
    },
    isHSL: function(e) {
      return H.isObject(e) && "h" in e && "s" in e && "l" in e;
    },
    isHSLA: function(e) {
      return H.isObject(e) && "h" in e && "s" in e && "l" in e && "a" in e;
    },
    isRGB: function(e) {
      return H.isObject(e) && "r" in e && "g" in e && "b" in e;
    },
    isRGBA: function(e) {
      return H.isObject(e) && "r" in e && "g" in e && "b" in e && "a" in e;
    },
    isCMYK: function(e) {
      return H.isObject(e) && "c" in e && "m" in e && "y" in e && "k" in e;
    },
    isHEX: function(e) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
    },
    isColor: function(e) {
      return (
        this.isHEX(e) ||
        this.isRGB(e) ||
        this.isRGBA(e) ||
        this.isHSV(e) ||
        this.isHSL(e) ||
        this.isCMYK(e)
      );
    },
    hueShift: function(e, t) {
      for (e += t; 360 <= e; ) e -= 360;
      for (; e < 0; ) e += 360;
      return e;
    },
    getScheme: function(e, t, n, i) {
      var s;
      this.options = k.extend({}, this.options, i);
      var a,
        o = [],
        r = this;
      if (((a = this.toHSV(e)), !1 === this.isHSV(a)))
        return console.log("The value is a not supported color format!"), !1;
      function l(e, t, n) {
        return Math.max(t, Math.min(e, n));
      }
      function c(e, t, n) {
        return e < t ? t : n < e ? n : e;
      }
      var d,
        h = a.h,
        u = a.s,
        p = a.v,
        f = this.options;
      switch (t) {
        case "monochromatic":
        case "mono":
          if (1 === f.algorithm)
            ((d = this.hsv2rgb(a)).r = c(
              Math.round(d.r + (255 - d.r) * f.tint1),
              0,
              255
            )),
              (d.g = c(Math.round(d.g + (255 - d.g) * f.tint1), 0, 255)),
              (d.b = c(Math.round(d.b + (255 - d.b) * f.tint1), 0, 255)),
              o.push(this.rgb2hsv(d)),
              ((d = this.hsv2rgb(a)).r = c(
                Math.round(d.r + (255 - d.r) * f.tint2),
                0,
                255
              )),
              (d.g = c(Math.round(d.g + (255 - d.g) * f.tint2), 0, 255)),
              (d.b = c(Math.round(d.b + (255 - d.b) * f.tint2), 0, 255)),
              o.push(this.rgb2hsv(d)),
              o.push(a),
              ((d = this.hsv2rgb(a)).r = c(Math.round(d.r * f.shade1), 0, 255)),
              (d.g = c(Math.round(d.g * f.shade1), 0, 255)),
              (d.b = c(Math.round(d.b * f.shade1), 0, 255)),
              o.push(this.rgb2hsv(d)),
              ((d = this.hsv2rgb(a)).r = c(Math.round(d.r * f.shade2), 0, 255)),
              (d.g = c(Math.round(d.g * f.shade2), 0, 255)),
              (d.b = c(Math.round(d.b * f.shade2), 0, 255)),
              o.push(this.rgb2hsv(d));
          else if (2 === f.algorithm)
            for (o.push(a), s = 1; s <= f.distance; s++)
              (p = l(p - f.step, 0, 1)),
                (u = l(u - f.step, 0, 1)),
                o.push({ h: h, s: u, v: p });
          else if (3 === f.algorithm)
            for (o.push(a), s = 1; s <= f.distance; s++)
              (p = l(p - f.step, 0, 1)), o.push({ h: h, s: u, v: p });
          else
            (p = l(a.v + 2 * f.step, 0, 1)),
              o.push({ h: h, s: u, v: p }),
              (p = l(a.v + f.step, 0, 1)),
              o.push({ h: h, s: u, v: p }),
              o.push(a),
              (u = a.s),
              (p = a.v),
              (p = l(a.v - f.step, 0, 1)),
              o.push({ h: h, s: u, v: p }),
              (p = l(a.v - 2 * f.step, 0, 1)),
              o.push({ h: h, s: u, v: p });
          break;
        case "complementary":
        case "complement":
        case "comp":
          o.push(a),
            (h = this.hueShift(a.h, 180)),
            o.push({ h: h, s: u, v: p });
          break;
        case "double-complementary":
        case "double-complement":
        case "double":
          o.push(a),
            (h = this.hueShift(h, 180)),
            o.push({ h: h, s: u, v: p }),
            (h = this.hueShift(h, f.angle)),
            o.push({ h: h, s: u, v: p }),
            (h = this.hueShift(h, 180)),
            o.push({ h: h, s: u, v: p });
          break;
        case "analogous":
        case "analog":
          (h = this.hueShift(h, f.angle)),
            o.push({ h: h, s: u, v: p }),
            o.push(a),
            (h = this.hueShift(a.h, 0 - f.angle)),
            o.push({ h: h, s: u, v: p });
          break;
        case "triadic":
        case "triad":
          for (o.push(a), s = 1; s < 3; s++)
            (h = this.hueShift(h, 120)), o.push({ h: h, s: u, v: p });
          break;
        case "tetradic":
        case "tetra":
          o.push(a),
            (h = this.hueShift(a.h, 180)),
            o.push({ h: h, s: u, v: p }),
            (h = this.hueShift(a.h, -1 * f.angle)),
            o.push({ h: h, s: u, v: p }),
            (h = this.hueShift(h, 180)),
            o.push({ h: h, s: u, v: p });
          break;
        case "square":
          for (o.push(a), s = 1; s < 4; s++)
            (h = this.hueShift(h, 90)), o.push({ h: h, s: u, v: p });
          break;
        case "split-complementary":
        case "split-complement":
        case "split":
          (h = this.hueShift(h, 180 - f.angle)),
            o.push({ h: h, s: u, v: p }),
            o.push(a),
            (h = this.hueShift(a.h, 180 + f.angle)),
            o.push({ h: h, s: u, v: p });
          break;
        default:
          console.log("Unknown scheme name");
      }
      return (function(e, t) {
        var n = [],
          i = r.options;
        switch (t) {
          case "hex":
            n = e.map(function(e) {
              return y.toHEX(e);
            });
            break;
          case "rgb":
            n = e.map(function(e) {
              return y.toRGB(e);
            });
            break;
          case "rgba":
            n = e.map(function(e) {
              return y.toRGBA(e, i.alpha);
            });
            break;
          case "hsl":
            n = e.map(function(e) {
              return y.toHSL(e);
            });
            break;
          case "cmyk":
            n = e.map(function(e) {
              return y.toCMYK(e);
            });
            break;
          default:
            n = e;
        }
        return n;
      })(o, n);
    }
  };
  (C.colors = y.init()),
    (Date.prototype.getWeek = function(e) {
      var t, n, i, s, a;
      return (
        (e = H.isValue(e)
          ? "number" == typeof e
            ? parseInt(e)
            : 0
          : METRO_WEEK_START),
        (i =
          0 <= (i = (n = new Date(this.getFullYear(), 0, 1)).getDay() - e)
            ? i
            : i + 7),
        (s =
          Math.floor(
            (this.getTime() -
              n.getTime() -
              6e4 * (this.getTimezoneOffset() - n.getTimezoneOffset())) /
              864e5
          ) + 1),
        i < 4
          ? 52 < (a = Math.floor((s + i - 1) / 7) + 1) &&
            (a =
              (t =
                0 <= (t = new Date(this.getFullYear() + 1, 0, 1).getDay() - e)
                  ? t
                  : t + 7) < 4
                ? 1
                : 53)
          : (a = Math.floor((s + i - 1) / 7)),
        a
      );
    }),
    (Date.prototype.getYear = function() {
      return this.getFullYear()
        .toString()
        .substr(-2);
    }),
    (Date.prototype.format = function(e, t) {
      void 0 === t && (t = "en-US");
      function i() {
        var e = new Date(a);
        return e.setDate(r - ((o + 6) % 7) + 3), e;
      }
      function s(e, t) {
        return ("" + (Math.pow(10, t) + e)).slice(1);
      }
      var n = (void 0 !== C.locales && void 0 !== C.locales[t]
          ? C.locales[t]
          : C.locales["en-US"]
        ).calendar,
        a = this,
        o = a.getDay(),
        r = a.getDate(),
        l = a.getMonth(),
        c = a.getFullYear(),
        d = a.getHours(),
        h = n.days,
        u = n.months,
        p = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      return e.replace(/(%[a-z])/gi, function(e) {
        return (
          {
            "%a": h[o].slice(0, 3),
            "%A": h[o],
            "%b": u[l].slice(0, 3),
            "%B": u[l],
            "%c": a.toUTCString(),
            "%C": Math.floor(c / 100),
            "%d": s(r, 2),
            dd: s(r, 2),
            "%e": r,
            "%F": a.toISOString().slice(0, 10),
            "%G": i().getFullYear(),
            "%g": ("" + i().getFullYear()).slice(2),
            "%H": s(d, 2),
            "%I": s(((d + 11) % 12) + 1, 2),
            "%j": s(
              p[l] +
                r +
                (1 < l && ((c % 4 == 0 && c % 100 != 0) || c % 400 == 0)
                  ? 1
                  : 0),
              3
            ),
            "%k": "" + d,
            "%l": ((d + 11) % 12) + 1,
            "%m": s(l + 1, 2),
            "%M": s(a.getMinutes(), 2),
            "%p": d < 12 ? "AM" : "PM",
            "%P": d < 12 ? "am" : "pm",
            "%s": Math.round(a.getTime() / 1e3),
            "%S": s(a.getSeconds(), 2),
            "%u": o || 7,
            "%V": (function() {
              var e = i(),
                t = e.valueOf();
              e.setMonth(0, 1);
              var n = e.getDay();
              return (
                4 !== n && e.setMonth(0, 1 + ((4 - n + 7) % 7)),
                s(1 + Math.ceil((t - e) / 6048e5), 2)
              );
            })(),
            "%w": "" + o,
            "%x": a.toLocaleDateString(),
            "%X": a.toLocaleTimeString(),
            "%y": ("" + c).slice(2),
            "%Y": c,
            "%z": a.toTimeString().replace(/.+GMT([+-]\d+).+/, "$1"),
            "%Z": a.toTimeString().replace(/.+\((.+?)\)$/, "$1")
          }[e] || e
        );
      });
    }),
    (Date.prototype.addHours = function(e) {
      return this.setTime(this.getTime() + 60 * e * 60 * 1e3), this;
    }),
    (Date.prototype.addDays = function(e) {
      return this.setDate(this.getDate() + e), this;
    }),
    (Date.prototype.addMonths = function(e) {
      return this.setMonth(this.getMonth() + e), this;
    }),
    (Date.prototype.addYears = function(e) {
      return this.setFullYear(this.getFullYear() + e), this;
    });
  var x = {
    init: function() {
      return this;
    },
    options: { csvDelimiter: "\t", csvNewLine: "\r\n", includeHeader: !0 },
    setup: function(e) {
      return (this.options = k.extend({}, this.options, e)), this;
    },
    base64: function(e) {
      return window.btoa(unescape(encodeURIComponent(e)));
    },
    b64toBlob: function(e, t, n) {
      (t = t || ""), (n = n || 512);
      var i,
        s = window.atob(e),
        a = [];
      for (i = 0; i < s.length; i += n) {
        var o,
          r = s.slice(i, i + n),
          l = new Array(r.length);
        for (o = 0; o < r.length; o += 1) l[o] = r.charCodeAt(o);
        var c = new window.Uint8Array(l);
        a.push(c);
      }
      return new Blob(a, { type: t });
    },
    tableToCSV: function(e, t, n) {
      var i,
        s,
        a,
        o,
        r,
        l,
        c = this.options,
        d = "";
      if (((c = k.extend({}, c, n)), (e = k(e)[0]), H.bool(c.includeHeader)))
        for (
          s = e.querySelectorAll("thead")[0], a = 0;
          a < s.rows.length;
          a++
        ) {
          for (r = s.rows[a], o = 0; o < r.cells.length; o++)
            (l = r.cells[o]),
              (d += (o ? c.csvDelimiter : "") + l.textContent.trim());
          d += c.csvNewLine;
        }
      for (i = e.querySelectorAll("tbody")[0], a = 0; a < i.rows.length; a++) {
        for (r = i.rows[a], o = 0; o < r.cells.length; o++)
          (l = r.cells[o]),
            (d += (o ? c.csvDelimiter : "") + l.textContent.trim());
        d += c.csvNewLine;
      }
      return H.isValue(t)
        ? this.createDownload(this.base64("\ufeff" + d), "application/csv", t)
        : d;
    },
    createDownload: function(e, t, n) {
      var i, s, a;
      return (
        ((s = document.createElement("a")).style.display = "none"),
        document.body.appendChild(s),
        (i = this.b64toBlob(e, t)),
        (a = window.URL.createObjectURL(i)),
        (s.href = a),
        (s.download = n || H.elementId("download")),
        s.click(),
        window.URL.revokeObjectURL(a),
        document.body.removeChild(s),
        !0
      );
    }
  };
  C.export = x.init();
  var S = {
    "en-US": {
      calendar: {
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        days: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Su",
          "Mo",
          "Tu",
          "We",
          "Th",
          "Fr",
          "Sa",
          "Sun",
          "Mon",
          "Tus",
          "Wen",
          "Thu",
          "Fri",
          "Sat"
        ],
        time: {
          days: "DAYS",
          hours: "HOURS",
          minutes: "MINS",
          seconds: "SECS",
          month: "MON",
          day: "DAY",
          year: "YEAR"
        }
      },
      buttons: {
        ok: "OK",
        cancel: "Cancel",
        done: "Done",
        today: "Today",
        now: "Now",
        clear: "Clear",
        help: "Help",
        yes: "Yes",
        no: "No",
        random: "Random",
        save: "Save",
        reset: "Reset"
      }
    },
    "tw-ZH": {
      calendar: {
        months: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        days: [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "日",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "週日",
          "週一",
          "週二",
          "週三",
          "週四",
          "週五",
          "週六"
        ],
        time: {
          days: "天",
          hours: "時",
          minutes: "分",
          seconds: "秒",
          month: "月",
          day: "日",
          year: "年"
        }
      },
      buttons: {
        ok: "確認",
        cancel: "取消",
        done: "完成",
        today: "今天",
        now: "現在",
        clear: "清除",
        help: "幫助",
        yes: "是",
        no: "否",
        random: "隨機",
        save: "保存",
        reset: "重啟"
      }
    },
    "cn-ZH": {
      calendar: {
        months: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        days: [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "日",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "周日",
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六"
        ],
        time: {
          days: "天",
          hours: "时",
          minutes: "分",
          seconds: "秒",
          month: "月",
          day: "日",
          year: "年"
        }
      },
      buttons: {
        ok: "确认",
        cancel: "取消",
        done: "完成",
        today: "今天",
        now: "现在",
        clear: "清除",
        help: "帮助",
        yes: "是",
        no: "否",
        random: "随机",
        save: "保存",
        reset: "重啟"
      }
    },
    "de-DE": {
      calendar: {
        months: [
          "Januar",
          "Februar",
          "März",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
          "Jan",
          "Feb",
          "Mär",
          "Apr",
          "Mai",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Okt",
          "Nov",
          "Dez"
        ],
        days: [
          "Sonntag",
          "Montag",
          "Dienstag",
          "Mittwoch",
          "Donnerstag",
          "Freitag",
          "Samstag",
          "Sn",
          "Mn",
          "Di",
          "Mi",
          "Do",
          "Fr",
          "Sa",
          "Son",
          "Mon",
          "Die",
          "Mit",
          "Don",
          "Fre",
          "Sam"
        ],
        time: { days: "TAGE", hours: "UHR", minutes: "MIN", seconds: "SEK" }
      },
      buttons: {
        ok: "OK",
        cancel: "Abbrechen",
        done: "Fertig",
        today: "Heute",
        now: "Jetzt",
        clear: "Reinigen",
        help: "Hilfe",
        yes: "Ja",
        no: "Nein",
        random: "Zufällig",
        save: "Sparen",
        reset: "Zurücksetzen"
      }
    },
    "hu-HU": {
      calendar: {
        months: [
          "Január",
          "Február",
          "Március",
          "Április",
          "Május",
          "Június",
          "Július",
          "Augusztus",
          "Szeptember",
          "Október",
          "November",
          "December",
          "Jan",
          "Feb",
          "Már",
          "Ápr",
          "Máj",
          "Jún",
          "Júl",
          "Aug",
          "Szep",
          "Okt",
          "Nov",
          "Dec"
        ],
        days: [
          "Vasárnap",
          "Hétfő",
          "Kedd",
          "Szerda",
          "Csütörtök",
          "Péntek",
          "Szombat",
          "V",
          "H",
          "K",
          "Sz",
          "Cs",
          "P",
          "Sz",
          "Vas",
          "Hét",
          "Ke",
          "Sze",
          "Csü",
          "Pén",
          "Szom"
        ],
        time: { days: "NAP", hours: "ÓRA", minutes: "PERC", seconds: "MP" }
      },
      buttons: {
        ok: "OK",
        cancel: "Mégse",
        done: "Kész",
        today: "Ma",
        now: "Most",
        clear: "Törlés",
        help: "Segítség",
        yes: "Igen",
        no: "Nem",
        random: "Véletlen",
        save: "Mentés",
        reset: "Visszaállítás"
      }
    },
    "ru-RU": {
      calendar: {
        months: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
          "Янв",
          "Фев",
          "Мар",
          "Апр",
          "Май",
          "Июн",
          "Июл",
          "Авг",
          "Сен",
          "Окт",
          "Ноя",
          "Дек"
        ],
        days: [
          "Воскресенье",
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
          "Вс",
          "Пн",
          "Вт",
          "Ср",
          "Чт",
          "Пт",
          "Сб",
          "Вос",
          "Пон",
          "Вто",
          "Сре",
          "Чет",
          "Пят",
          "Суб"
        ],
        time: { days: "ДНИ", hours: "ЧАСЫ", minutes: "МИН", seconds: "СЕК" }
      },
      buttons: {
        ok: "ОК",
        cancel: "Отмена",
        done: "Готово",
        today: "Сегодня",
        now: "Сейчас",
        clear: "Очистить",
        help: "Помощь",
        yes: "Да",
        no: "Нет",
        random: "Случайно",
        save: "Сохранить",
        reset: "Сброс"
      }
    },
    "uk-UA": {
      calendar: {
        months: [
          "Січень",
          "Лютий",
          "Березень",
          "Квітень",
          "Травень",
          "Червень",
          "Липень",
          "Серпень",
          "Вересень",
          "Жовтень",
          "Листопад",
          "Грудень",
          "Січ",
          "Лют",
          "Бер",
          "Кві",
          "Тра",
          "Чер",
          "Лип",
          "Сер",
          "Вер",
          "Жов",
          "Лис",
          "Гру"
        ],
        days: [
          "Неділя",
          "Понеділок",
          "Вівторок",
          "Середа",
          "Четвер",
          "П’ятниця",
          "Субота",
          "Нд",
          "Пн",
          "Вт",
          "Ср",
          "Чт",
          "Пт",
          "Сб",
          "Нед",
          "Пон",
          "Вiв",
          "Сер",
          "Чет",
          "Пят",
          "Суб"
        ],
        time: { days: "ДНІ", hours: "ГОД", minutes: "ХВИЛ", seconds: "СЕК" }
      },
      buttons: {
        ok: "ОК",
        cancel: "Відміна",
        done: "Готово",
        today: "Сьогодні",
        now: "Зараз",
        clear: "Очистити",
        help: "Допомога",
        yes: "Так",
        no: "Ні",
        random: "Випадково",
        save: "Зберегти",
        reset: "Скинути"
      }
    },
    "es-MX": {
      calendar: {
        months: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic"
        ],
        days: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Do",
          "Lu",
          "Ma",
          "Mi",
          "Ju",
          "Vi",
          "Sa",
          "Dom",
          "Lun",
          "Mar",
          "Mié",
          "Jue",
          "Vie",
          "Sáb"
        ],
        time: {
          days: "DÍAS",
          hours: "HORAS",
          minutes: "MINS",
          seconds: "SEGS",
          month: "MES",
          day: "DÍA",
          year: "AÑO"
        }
      },
      buttons: {
        ok: "Aceptar",
        cancel: "Cancelar",
        done: "Hecho",
        today: "Hoy",
        now: "Ahora",
        clear: "Limpiar",
        help: "Ayuda",
        yes: "Si",
        no: "No",
        random: "Aleatorio",
        save: "Salvar",
        reset: "Reiniciar"
      }
    },
    "fr-FR": {
      calendar: {
        months: [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
          "Janv",
          "Févr",
          "Mars",
          "Avr",
          "Mai",
          "Juin",
          "Juil",
          "Août",
          "Sept",
          "Oct",
          "Nov",
          "Déc"
        ],
        days: [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "De",
          "Du",
          "Ma",
          "Me",
          "Je",
          "Ve",
          "Sa",
          "Dim",
          "Lun",
          "Mar",
          "Mer",
          "Jeu",
          "Ven",
          "Sam"
        ],
        time: {
          days: "JOURS",
          hours: "HEURES",
          minutes: "MINS",
          seconds: "SECS",
          month: "MOIS",
          day: "JOUR",
          year: "ANNEE"
        }
      },
      buttons: {
        ok: "OK",
        cancel: "Annulé",
        done: "Fait",
        today: "Aujourd'hui",
        now: "Maintenant",
        clear: "Effacé",
        help: "Aide",
        yes: "Oui",
        no: "Non",
        random: "Aléatoire",
        save: "Sauvegarder",
        reset: "Réinitialiser"
      }
    },
    "it-IT": {
      calendar: {
        months: [
          "Gennaio",
          "Febbraio",
          "Marzo",
          "Aprile",
          "Maggio",
          "Giugno",
          "Luglio",
          "Agosto",
          "Settembre",
          "Ottobre",
          "Novembre",
          "Dicembre",
          "Gen",
          "Feb",
          "Mar",
          "Apr",
          "Mag",
          "Giu",
          "Lug",
          "Ago",
          "Set",
          "Ott",
          "Nov",
          "Dic"
        ],
        days: [
          "Domenica",
          "Lunedì",
          "Martedì",
          "Mercoledì",
          "Giovedì",
          "Venerdì",
          "Sabato",
          "Do",
          "Lu",
          "Ma",
          "Me",
          "Gi",
          "Ve",
          "Sa",
          "Dom",
          "Lun",
          "Mar",
          "Mer",
          "Gio",
          "Ven",
          "Sab"
        ],
        time: {
          days: "GIORNI",
          hours: "ORE",
          minutes: "MIN",
          seconds: "SEC",
          month: "MESE",
          day: "GIORNO",
          year: "ANNO"
        }
      },
      buttons: {
        ok: "OK",
        cancel: "Annulla",
        done: "Fatto",
        today: "Oggi",
        now: "Adesso",
        clear: "Cancella",
        help: "Aiuto",
        yes: "Sì",
        no: "No",
        random: "Random",
        save: "Salvare",
        reset: "Reset"
      }
    }
  };
  C.locales = S;
  var T = 0;
  function _(e) {
    return M(A(D(e), 8 * e.length));
  }
  function O(e) {
    for (
      var t, n = T ? "0123456789ABCDEF" : "0123456789abcdef", i = "", s = 0;
      s < e.length;
      s++
    )
      (t = e.charCodeAt(s)), (i += n.charAt((t >>> 4) & 15) + n.charAt(15 & t));
    return i;
  }
  function I(e) {
    for (var t, n, i = "", s = -1; ++s < e.length; )
      (t = e.charCodeAt(s)),
        (n = s + 1 < e.length ? e.charCodeAt(s + 1) : 0),
        55296 <= t &&
          t <= 56319 &&
          56320 <= n &&
          n <= 57343 &&
          ((t = 65536 + ((1023 & t) << 10) + (1023 & n)), s++),
        t <= 127
          ? (i += String.fromCharCode(t))
          : t <= 2047
          ? (i += String.fromCharCode(192 | ((t >>> 6) & 31), 128 | (63 & t)))
          : t <= 65535
          ? (i += String.fromCharCode(
              224 | ((t >>> 12) & 15),
              128 | ((t >>> 6) & 63),
              128 | (63 & t)
            ))
          : t <= 2097151 &&
            (i += String.fromCharCode(
              240 | ((t >>> 18) & 7),
              128 | ((t >>> 12) & 63),
              128 | ((t >>> 6) & 63),
              128 | (63 & t)
            ));
    return i;
  }
  function D(e) {
    var t,
      n = new Array(e.length >> 2);
    for (t = 0; t < n.length; t++) n[t] = 0;
    for (t = 0; t < 8 * e.length; t += 8)
      n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
    return n;
  }
  function M(e) {
    for (var t = "", n = 0; n < 32 * e.length; n += 8)
      t += String.fromCharCode((e[n >> 5] >>> n % 32) & 255);
    return t;
  }
  function A(e, t) {
    (e[t >> 5] |= 128 << t % 32), (e[14 + (((t + 64) >>> 9) << 4)] = t);
    for (
      var n = 1732584193, i = -271733879, s = -1732584194, a = 271733878, o = 0;
      o < e.length;
      o += 16
    ) {
      var r = n,
        l = i,
        c = s,
        d = a;
      (i = F(
        (i = F(
          (i = F(
            (i = F(
              (i = R(
                (i = R(
                  (i = R(
                    (i = R(
                      (i = N(
                        (i = N(
                          (i = N(
                            (i = N(
                              (i = P(
                                (i = P(
                                  (i = P(
                                    (i = P(
                                      i,
                                      (s = P(
                                        s,
                                        (a = P(
                                          a,
                                          (n = P(
                                            n,
                                            i,
                                            s,
                                            a,
                                            e[o],
                                            7,
                                            -680876936
                                          )),
                                          i,
                                          s,
                                          e[o + 1],
                                          12,
                                          -389564586
                                        )),
                                        n,
                                        i,
                                        e[o + 2],
                                        17,
                                        606105819
                                      )),
                                      a,
                                      n,
                                      e[o + 3],
                                      22,
                                      -1044525330
                                    )),
                                    (s = P(
                                      s,
                                      (a = P(
                                        a,
                                        (n = P(
                                          n,
                                          i,
                                          s,
                                          a,
                                          e[o + 4],
                                          7,
                                          -176418897
                                        )),
                                        i,
                                        s,
                                        e[o + 5],
                                        12,
                                        1200080426
                                      )),
                                      n,
                                      i,
                                      e[o + 6],
                                      17,
                                      -1473231341
                                    )),
                                    a,
                                    n,
                                    e[o + 7],
                                    22,
                                    -45705983
                                  )),
                                  (s = P(
                                    s,
                                    (a = P(
                                      a,
                                      (n = P(
                                        n,
                                        i,
                                        s,
                                        a,
                                        e[o + 8],
                                        7,
                                        1770035416
                                      )),
                                      i,
                                      s,
                                      e[o + 9],
                                      12,
                                      -1958414417
                                    )),
                                    n,
                                    i,
                                    e[o + 10],
                                    17,
                                    -42063
                                  )),
                                  a,
                                  n,
                                  e[o + 11],
                                  22,
                                  -1990404162
                                )),
                                (s = P(
                                  s,
                                  (a = P(
                                    a,
                                    (n = P(
                                      n,
                                      i,
                                      s,
                                      a,
                                      e[o + 12],
                                      7,
                                      1804603682
                                    )),
                                    i,
                                    s,
                                    e[o + 13],
                                    12,
                                    -40341101
                                  )),
                                  n,
                                  i,
                                  e[o + 14],
                                  17,
                                  -1502002290
                                )),
                                a,
                                n,
                                e[o + 15],
                                22,
                                1236535329
                              )),
                              (s = N(
                                s,
                                (a = N(
                                  a,
                                  (n = N(n, i, s, a, e[o + 1], 5, -165796510)),
                                  i,
                                  s,
                                  e[o + 6],
                                  9,
                                  -1069501632
                                )),
                                n,
                                i,
                                e[o + 11],
                                14,
                                643717713
                              )),
                              a,
                              n,
                              e[o],
                              20,
                              -373897302
                            )),
                            (s = N(
                              s,
                              (a = N(
                                a,
                                (n = N(n, i, s, a, e[o + 5], 5, -701558691)),
                                i,
                                s,
                                e[o + 10],
                                9,
                                38016083
                              )),
                              n,
                              i,
                              e[o + 15],
                              14,
                              -660478335
                            )),
                            a,
                            n,
                            e[o + 4],
                            20,
                            -405537848
                          )),
                          (s = N(
                            s,
                            (a = N(
                              a,
                              (n = N(n, i, s, a, e[o + 9], 5, 568446438)),
                              i,
                              s,
                              e[o + 14],
                              9,
                              -1019803690
                            )),
                            n,
                            i,
                            e[o + 3],
                            14,
                            -187363961
                          )),
                          a,
                          n,
                          e[o + 8],
                          20,
                          1163531501
                        )),
                        (s = N(
                          s,
                          (a = N(
                            a,
                            (n = N(n, i, s, a, e[o + 13], 5, -1444681467)),
                            i,
                            s,
                            e[o + 2],
                            9,
                            -51403784
                          )),
                          n,
                          i,
                          e[o + 7],
                          14,
                          1735328473
                        )),
                        a,
                        n,
                        e[o + 12],
                        20,
                        -1926607734
                      )),
                      (s = R(
                        s,
                        (a = R(
                          a,
                          (n = R(n, i, s, a, e[o + 5], 4, -378558)),
                          i,
                          s,
                          e[o + 8],
                          11,
                          -2022574463
                        )),
                        n,
                        i,
                        e[o + 11],
                        16,
                        1839030562
                      )),
                      a,
                      n,
                      e[o + 14],
                      23,
                      -35309556
                    )),
                    (s = R(
                      s,
                      (a = R(
                        a,
                        (n = R(n, i, s, a, e[o + 1], 4, -1530992060)),
                        i,
                        s,
                        e[o + 4],
                        11,
                        1272893353
                      )),
                      n,
                      i,
                      e[o + 7],
                      16,
                      -155497632
                    )),
                    a,
                    n,
                    e[o + 10],
                    23,
                    -1094730640
                  )),
                  (s = R(
                    s,
                    (a = R(
                      a,
                      (n = R(n, i, s, a, e[o + 13], 4, 681279174)),
                      i,
                      s,
                      e[o],
                      11,
                      -358537222
                    )),
                    n,
                    i,
                    e[o + 3],
                    16,
                    -722521979
                  )),
                  a,
                  n,
                  e[o + 6],
                  23,
                  76029189
                )),
                (s = R(
                  s,
                  (a = R(
                    a,
                    (n = R(n, i, s, a, e[o + 9], 4, -640364487)),
                    i,
                    s,
                    e[o + 12],
                    11,
                    -421815835
                  )),
                  n,
                  i,
                  e[o + 15],
                  16,
                  530742520
                )),
                a,
                n,
                e[o + 2],
                23,
                -995338651
              )),
              (s = F(
                s,
                (a = F(
                  a,
                  (n = F(n, i, s, a, e[o], 6, -198630844)),
                  i,
                  s,
                  e[o + 7],
                  10,
                  1126891415
                )),
                n,
                i,
                e[o + 14],
                15,
                -1416354905
              )),
              a,
              n,
              e[o + 5],
              21,
              -57434055
            )),
            (s = F(
              s,
              (a = F(
                a,
                (n = F(n, i, s, a, e[o + 12], 6, 1700485571)),
                i,
                s,
                e[o + 3],
                10,
                -1894986606
              )),
              n,
              i,
              e[o + 10],
              15,
              -1051523
            )),
            a,
            n,
            e[o + 1],
            21,
            -2054922799
          )),
          (s = F(
            s,
            (a = F(
              a,
              (n = F(n, i, s, a, e[o + 8], 6, 1873313359)),
              i,
              s,
              e[o + 15],
              10,
              -30611744
            )),
            n,
            i,
            e[o + 6],
            15,
            -1560198380
          )),
          a,
          n,
          e[o + 13],
          21,
          1309151649
        )),
        (s = F(
          s,
          (a = F(
            a,
            (n = F(n, i, s, a, e[o + 4], 6, -145523070)),
            i,
            s,
            e[o + 11],
            10,
            -1120210379
          )),
          n,
          i,
          e[o + 2],
          15,
          718787259
        )),
        a,
        n,
        e[o + 9],
        21,
        -343485551
      )),
        (n = L(n, r)),
        (i = L(i, l)),
        (s = L(s, c)),
        (a = L(a, d));
    }
    return [n, i, s, a];
  }
  function E(e, t, n, i, s, a) {
    return L(
      (function(e, t) {
        return (e << t) | (e >>> (32 - t));
      })(L(L(t, e), L(i, a)), s),
      n
    );
  }
  function P(e, t, n, i, s, a, o) {
    return E((t & n) | (~t & i), e, t, s, a, o);
  }
  function N(e, t, n, i, s, a, o) {
    return E((t & i) | (n & ~i), e, t, s, a, o);
  }
  function R(e, t, n, i, s, a, o) {
    return E(t ^ n ^ i, e, t, s, a, o);
  }
  function F(e, t, n, i, s, a, o) {
    return E(n ^ (t | ~i), e, t, s, a, o);
  }
  function L(e, t) {
    var n = (65535 & e) + (65535 & t);
    return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
  }
  (Number.prototype.format = function(e, t, n, i) {
    var s = "\\d(?=(\\d{" + (t || 3) + "})+" + (0 < e ? "\\D" : "$") + ")",
      a = this.toFixed(Math.max(0, ~~e));
    return (i ? a.replace(".", i) : a).replace(
      new RegExp(s, "g"),
      "$&" + (n || ",")
    );
  }),
    (String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }),
    (String.prototype.contains = function() {
      return !!~String.prototype.indexOf.apply(this, arguments);
    }),
    (String.prototype.toDate = function(e, a) {
      var t, n, i, s, o, r, l, c, d, h, u, p, f, m, v, g;
      a = a || "en-US";
      if (null == e || "" === e) return new Date(this);
      if (
        ((t = this.replace(/[\/,.:\s]/g, "-")),
        (n = e
          .toLowerCase()
          .replace(/[^a-zA-Z0-9%]/g, "-")
          .split("-")),
        (i = t.split("-")),
        "" === t.replace(/\-/g, "").trim())
      )
        return "Invalid Date";
      if (
        ((s = -1 < n.indexOf("mm") ? n.indexOf("mm") : n.indexOf("%m")),
        (o = -1 < n.indexOf("dd") ? n.indexOf("dd") : n.indexOf("%d")),
        (r =
          -1 < n.indexOf("yyyy")
            ? n.indexOf("yyyy")
            : -1 < n.indexOf("yy")
            ? n.indexOf("yy")
            : n.indexOf("%y")),
        (l = -1 < n.indexOf("hh") ? n.indexOf("hh") : n.indexOf("%h")),
        (c =
          -1 < n.indexOf("ii")
            ? n.indexOf("ii")
            : -1 < n.indexOf("mi")
            ? n.indexOf("mi")
            : n.indexOf("%i")),
        (d = -1 < n.indexOf("ss") ? n.indexOf("ss") : n.indexOf("%s")),
        !(-1 < s && "" !== i[s]))
      )
        return "Invalid Date";
      if (isNaN(parseInt(i[s]))) {
        if (
          ((i[s] = (function(e) {
            var t, n, i, s;
            if (!H.isValue(e)) return -1;
            if (
              ((e = e.substr(0, 3)),
              void 0 !== a &&
                "en-US" !== a &&
                void 0 !== S[a] &&
                void 0 !== S[a].calendar &&
                void 0 !== S[a].calendar.months)
            ) {
              for (n = S[a].calendar.months, s = 12; s < n.length; s++)
                if (n[s].toLowerCase() === e.toLowerCase()) {
                  i = s - 12;
                  break;
                }
              e = S["en-US"].calendar.months[i];
            }
            return (
              (t = Date.parse(e + " 1, 1972")),
              isNaN(t) ? -1 : new Date(t).getMonth() + 1
            );
          })(i[s])),
          -1 === i[s])
        )
          return "Invalid Date";
      } else if ((g = parseInt(i[s])) < 1 || 12 < g) return "Invalid Date";
      return (
        (h = -1 < r && "" !== i[r] ? i[r] : null),
        (u = -1 < s && "" !== i[s] ? i[s] : null),
        (p = -1 < o && "" !== i[o] ? i[o] : null),
        (f = -1 < l && "" !== i[l] ? i[l] : null),
        (m = -1 < c && "" !== i[c] ? i[c] : null),
        (v = -1 < d && "" !== i[d] ? i[d] : null),
        new Date(h, u - 1, p, f, m, v)
      );
    }),
    (String.prototype.toArray = function(e, n, i) {
      return (
        (n = n || "string"),
        (i = null != i && i),
        ("" + this).split((e = e || ",")).map(function(e) {
          var t;
          switch (n) {
            case "int":
            case "integer":
              t = parseInt(e);
              break;
            case "number":
            case "float":
              t = parseFloat(e);
              break;
            case "date":
              t = i ? e.toDate(i) : new Date(e);
              break;
            default:
              t = e.trim();
          }
          return t;
        })
      );
    });
  function B(e, t, n) {
    var i,
      s,
      a,
      o = "<%(.+?)%>",
      r = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
      l = "with(obj) { var r=[];\n",
      c = 0,
      d = function(e, t) {
        return (
          (l += t
            ? e.match(r)
              ? e + "\n"
              : "r.push(" + e + ");\n"
            : "" !== e
            ? 'r.push("' + e.replace(/"/g, '\\"') + '");\n'
            : ""),
          d
        );
      };
    for (
      H.isValue(n) &&
        (n.hasOwnProperty("beginToken") && (o = o.replace("<%", n.beginToken)),
        n.hasOwnProperty("endToken") && (o = o.replace("%>", n.endToken))),
        a = (i = new RegExp(o, "g")).exec(e);
      a;

    )
      d(e.slice(c, a.index))(a[1], !0),
        (c = a.index + a[0].length),
        (a = i.exec(e));
    d(e.substr(c, e.length - c)),
      (l = (l + 'return r.join(""); }').replace(/[\r\t\n]/g, " "));
    try {
      s = new Function("obj", l).apply(t, [t]);
    } catch (e) {
      console.error("'" + e.message + "'", " in \n\nCode:\n", l, "\n");
    }
    return s;
  }
  C.template = B;
  var H = {
    isUrl: function(e) {
      return /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/.test(
        e
      );
    },
    isTag: function(e) {
      return /^<\/?[\w\s="/.':;#-\/\?]+>/gi.test(e);
    },
    isColor: function(e) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
    },
    isEmbedObject: function(e) {
      var t = !1;
      return (
        k.each(["iframe", "object", "embed", "video"], function() {
          "string" == typeof e && e.toLowerCase() === this
            ? (t = !0)
            : void 0 !== e.nodeType &&
              e.tagName.toLowerCase() === this &&
              (t = !0);
        }),
        t
      );
    },
    isVideoUrl: function(e) {
      return /youtu\.be|youtube|vimeo/gi.test(e);
    },
    isDate: function(e, t) {
      return (
        !("object" != typeof e || !H.isFunc(e.getMonth)) ||
        "Invalid Date" !==
          (H.isValue(t) ? String(e).toDate(t) : String(new Date(e)))
      );
    },
    isDateObject: function(e) {
      return "object" == typeof e && void 0 !== e.getMonth;
    },
    isInt: function(e) {
      return !isNaN(e) && +e % 1 == 0;
    },
    isFloat: function(e) {
      return !isNaN(e) && +e % 1 != 0;
    },
    isTouchDevice: function() {
      return (
        "ontouchstart" in window ||
        0 < navigator.MaxTouchPoints ||
        0 < navigator.msMaxTouchPoints
      );
    },
    isFunc: function(e) {
      return H.isType(e, "function");
    },
    isObject: function(e) {
      return H.isType(e, "object");
    },
    isArray: function(e) {
      return Array.isArray(e);
    },
    isType: function(e, t) {
      if (null == e) return !1;
      if (typeof e === t) return e;
      if (H.isTag(e) || H.isUrl(e)) return !1;
      if (typeof window[e] === t) return window[e];
      if ("string" == typeof e && -1 === e.indexOf(".")) return !1;
      if ("string" == typeof e && -1 !== e.indexOf(" ")) return !1;
      if ("string" == typeof e && -1 !== e.indexOf("(")) return !1;
      if ("string" == typeof e && -1 !== e.indexOf("[")) return !1;
      if ("number" == typeof e && "number" !== t.toLowerCase()) return !1;
      var n,
        i = e.split("."),
        s = window;
      for (n = 0; n < i.length; n++) s = s[i[n]];
      return typeof s === t && s;
    },
    $: function() {
      return METRO_JQUERY && jquery_present ? jQuery : m4q;
    },
    isMetroObject: function(e, t) {
      var n = k(e),
        i = C.getPlugin(e, t);
      return 0 === n.length
        ? (console.warn(t + " " + e + " not found!"), !1)
        : void 0 !== i ||
            (console.warn(
              "Element not contain role " +
                t +
                '! Please add attribute data-role="' +
                t +
                '" to element ' +
                e
            ),
            !1);
    },
    isJQuery: function(e) {
      return "undefined" != typeof jQuery && e instanceof jQuery;
    },
    isM4Q: function(e) {
      return "undefined" != typeof m4q && e instanceof m4q;
    },
    isQ: function(e) {
      return H.isJQuery(e) || H.isM4Q(e);
    },
    embedObject: function(e) {
      return "<div class='embed-container'>" + k(e)[0].outerHTML + "</div>";
    },
    embedUrl: function(e) {
      return (
        -1 !== e.indexOf("youtu.be") &&
          (e = "https://www.youtube.com/embed/" + e.split("/").pop()),
        "<div class='embed-container'><iframe src='" + e + "'></iframe></div>"
      );
    },
    secondsToTime: function(e) {
      var t = e % 3600,
        n = t % 60;
      return {
        h: Math.floor(e / 3600),
        m: Math.floor(t / 60),
        s: Math.ceil(n)
      };
    },
    hex2rgba: function(e, t) {
      var n;
      if (((t = isNaN(t) ? 1 : t), /^#([A-Fa-f0-9]{3}){1,2}$/.test(e)))
        return (
          3 === (n = e.substring(1).split("")).length &&
            (n = [n[0], n[0], n[1], n[1], n[2], n[2]]),
          "rgba(" +
            [
              ((n = "0x" + n.join("")) >> 16) & 255,
              (n >> 8) & 255,
              255 & n
            ].join(",") +
            "," +
            t +
            ")"
        );
      throw new Error("Hex2rgba error. Bad Hex value");
    },
    random: function(e, t) {
      return Math.floor(Math.random() * (t - e + 1) + e);
    },
    uniqueId: function() {
      var n = new Date().getTime();
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        e
      ) {
        var t = (n + 16 * Math.random()) % 16 | 0;
        return (
          (n = Math.floor(n / 16)), ("x" === e ? t : (3 & t) | 8).toString(16)
        );
      });
    },
    elementId: function(e) {
      return e + "-" + new Date().getTime() + H.random(1, 1e3);
    },
    secondsToFormattedString: function(e) {
      var t = parseInt(e, 10),
        n = Math.floor(t / 3600),
        i = Math.floor((t - 3600 * n) / 60),
        s = t - 3600 * n - 60 * i;
      return (
        n < 10 && (n = "0" + n),
        i < 10 && (i = "0" + i),
        s < 10 && (s = "0" + s),
        [n, i, s].join(":")
      );
    },
    callback: function(e, t, n) {
      return H.exec(e, t, n);
    },
    func: function(e) {
      return new Function("a", e);
    },
    exec: function(e, t, n) {
      var i;
      if (null == e) return !1;
      var s = H.isFunc(e);
      !1 === s && (s = H.func(e));
      try {
        i = s.apply(n, t);
      } catch (e) {
        if (!(i = null) === METRO_THROWS) throw e;
      }
      return i;
    },
    isOutsider: function(e) {
      var t,
        n = k(e),
        i = n.clone();
      return (
        i
          .removeAttr("data-role")
          .css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
          }),
        n.parent().append(i),
        (t = i[0].getBoundingClientRect()),
        i.remove(),
        0 <= t.top &&
          0 <= t.left &&
          t.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          t.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    inViewport: function(e) {
      var t = H.rect(e);
      return (
        0 <= t.top &&
        0 <= t.left &&
        t.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        t.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    rect: function(e) {
      return e.getBoundingClientRect();
    },
    getCursorPosition: function(e, t) {
      var n = H.rect(e);
      return {
        x: H.pageXY(t).x - n.left - window.pageXOffset,
        y: H.pageXY(t).y - n.top - window.pageYOffset
      };
    },
    getCursorPositionX: function(e, t) {
      return H.getCursorPosition(e, t).x;
    },
    getCursorPositionY: function(e, t) {
      return H.getCursorPosition(e, t).y;
    },
    objectLength: function(e) {
      return Object.keys(e).length;
    },
    percent: function(e, t, n) {
      if (0 === e) return 0;
      var i = (100 * t) / e;
      return !0 === n ? Math.round(i) : Math.round(100 * i) / 100;
    },
    camelCase: function(e) {
      return e.replace(/-([a-z])/g, function(e) {
        return e[1].toUpperCase();
      });
    },
    dashedName: function(e) {
      return e.replace(/([A-Z])/g, function(e) {
        return "-" + e.toLowerCase();
      });
    },
    objectShift: function(e) {
      var t = 0;
      return (
        k.each(e, function(e) {
          0 === t ? (t = e) : e < t && (t = e);
        }),
        delete e[t],
        e
      );
    },
    objectDelete: function(e, t) {
      void 0 !== e[t] && delete e[t];
    },
    arrayDeleteByMultipleKeys: function(t, e) {
      return (
        e.forEach(function(e) {
          delete t[e];
        }),
        t.filter(function(e) {
          return void 0 !== e;
        })
      );
    },
    arrayDelete: function(e, t) {
      -1 < e.indexOf(t) && e.splice(e.indexOf(t), 1);
    },
    arrayDeleteByKey: function(e, t) {
      e.splice(t, 1);
    },
    nvl: function(e, t) {
      return null == e ? t : e;
    },
    objectClone: function(e) {
      var t = {};
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      return t;
    },
    github: function(e, t) {
      k.json("https://api.github.com/repos/" + e).then(function(e) {
        H.exec(t, [e]);
      });
    },
    detectIE: function() {
      var e = window.navigator.userAgent,
        t = e.indexOf("MSIE ");
      if (0 < t) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
      if (0 < e.indexOf("Trident/")) {
        var n = e.indexOf("rv:");
        return parseInt(e.substring(n + 3, e.indexOf(".", n)), 10);
      }
      var i = e.indexOf("Edge/");
      return 0 < i && parseInt(e.substring(i + 5, e.indexOf(".", i)), 10);
    },
    detectChrome: function() {
      return (
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor)
      );
    },
    md5: function(e) {
      return (function(e) {
        return O(_(I(e)));
      })(e);
    },
    encodeURI: function(e) {
      return encodeURI(e)
        .replace(/%5B/g, "[")
        .replace(/%5D/g, "]");
    },
    pageHeight: function() {
      var e = document.body,
        t = document.documentElement;
      return Math.max(
        e.scrollHeight,
        e.offsetHeight,
        t.clientHeight,
        t.scrollHeight,
        t.offsetHeight
      );
    },
    cleanPreCode: function(e) {
      Array.prototype.slice
        .call(document.querySelectorAll(e), 0)
        .forEach(function(e) {
          var t = e.textContent.replace(/^[\r\n]+/, "").replace(/\s+$/g, "");
          if (/^\S/gm.test(t)) e.textContent = t;
          else {
            for (var n, i, s, a = /^[\t ]+/gm, o = 1e3; (n = a.exec(t)); )
              (s = n[0].length) < o && ((o = s), (i = n[0]));
            1e3 !== o &&
              (e.textContent = t.replace(new RegExp("^" + i, "gm"), "").trim());
          }
        });
    },
    coords: function(e) {
      var t = k(e)[0].getBoundingClientRect();
      return {
        top: t.top + window.pageYOffset,
        left: t.left + window.pageXOffset
      };
    },
    positionXY: function(e, t) {
      switch (t) {
        case "client":
          return H.clientXY(e);
        case "screen":
          return H.screenXY(e);
        case "page":
          return H.pageXY(e);
        default:
          return { x: 0, y: 0 };
      }
    },
    clientXY: function(e) {
      return {
        x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
        y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
      };
    },
    screenXY: function(e) {
      return {
        x: e.changedTouches ? e.changedTouches[0].screenX : e.screenX,
        y: e.changedTouches ? e.changedTouches[0].screenY : e.screenY
      };
    },
    pageXY: function(e) {
      return {
        x: e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
        y: e.changedTouches ? e.changedTouches[0].pageY : e.pageY
      };
    },
    isRightMouse: function(e) {
      return "which" in e
        ? 3 === e.which
        : "button" in e
        ? 2 === e.button
        : void 0;
    },
    hiddenElementSize: function(e, t) {
      var n,
        i,
        s = k(e).clone(!0);
      return (
        s
          .removeAttr("data-role")
          .css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
          }),
        k("body").append(s),
        H.isValue(t) || (t = !1),
        (n = s.outerWidth(t)),
        (i = s.outerHeight(t)),
        s.remove(),
        { width: n, height: i }
      );
    },
    getStyle: function(e, t) {
      var n = k(e)[0];
      return window.getComputedStyle(n, t);
    },
    getStyleOne: function(e, t) {
      return H.getStyle(e).getPropertyValue(t);
    },
    getTransformMatrix: function(e, t) {
      var n = H.getStyleOne(e, "transform")
        .replace("matrix(", "")
        .slice(0, -1)
        .split(",");
      return !0 !== t
        ? { a: n[0], b: n[1], c: n[2], d: n[3], tx: n[4], ty: n[5] }
        : n;
    },
    computedRgbToHex: function(e) {
      var t,
        n = e.replace(/[^\d,]/g, "").split(","),
        i = "#";
      for (t = 0; t < 3; t++) {
        var s = parseInt(n[t]).toString(16);
        i += 1 === s.length ? "0" + s : s;
      }
      return i;
    },
    computedRgbToRgba: function(e, t) {
      var n = e.replace(/[^\d,]/g, "").split(",");
      return void 0 === t && (t = 1), n.push(t), "rgba(" + n.join(",") + ")";
    },
    computedRgbToArray: function(e) {
      return e.replace(/[^\d,]/g, "").split(",");
    },
    hexColorToArray: function(e) {
      var t;
      return /^#([A-Fa-f0-9]{3}){1,2}$/.test(e)
        ? (3 === (t = e.substring(1).split("")).length &&
            (t = [t[0], t[0], t[1], t[1], t[2], t[2]]),
          [((t = "0x" + t.join("")) >> 16) & 255, (t >> 8) & 255, 255 & t])
        : [0, 0, 0];
    },
    hexColorToRgbA: function(e, t) {
      var n;
      return /^#([A-Fa-f0-9]{3}){1,2}$/.test(e)
        ? (3 === (n = e.substring(1).split("")).length &&
            (n = [n[0], n[0], n[1], n[1], n[2], n[2]]),
          "rgba(" +
            [
              ((n = "0x" + n.join("")) >> 16) & 255,
              (n >> 8) & 255,
              255 & n,
              t || 1
            ].join(",") +
            ")")
        : "rgba(0,0,0,1)";
    },
    getInlineStyles: function(e) {
      var t,
        n,
        i = {},
        s = k(e)[0];
      for (t = 0, n = s.style.length; t < n; t++) {
        var a = s.style[t];
        i[a] = s.style[a];
      }
      return i;
    },
    updateURIParameter: function(e, t, n) {
      var i = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
        s = -1 !== e.indexOf("?") ? "&" : "?";
      return e.match(i)
        ? e.replace(i, "$1" + t + "=" + n + "$2")
        : e + s + t + "=" + n;
    },
    getURIParameter: function(e, t) {
      e || (e = window.location.href), (t = t.replace(/[\[\]]/g, "\\$&"));
      var n = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
      return n
        ? n[2]
          ? decodeURIComponent(n[2].replace(/\+/g, " "))
          : ""
        : null;
    },
    getLocales: function() {
      return Object.keys(C.locales);
    },
    addLocale: function(e) {
      C.locales = k.extend({}, C.locales, e);
    },
    strToArray: function(e, t, n, i) {
      return (
        H.isValue(t) || (t = ","),
        H.isValue(n) || (n = "string"),
        ("" + e).split(t).map(function(e) {
          var t;
          switch (n) {
            case "int":
            case "integer":
              t = parseInt(e);
              break;
            case "number":
            case "float":
              t = parseFloat(e);
              break;
            case "date":
              t = H.isValue(i) ? e.toDate(i) : new Date(e);
              break;
            default:
              t = e.trim();
          }
          return t;
        })
      );
    },
    aspectRatioH: function(e, t) {
      return "16/9" === t
        ? (9 * e) / 16
        : "21/9" === t
        ? (9 * e) / 21
        : "4/3" === t
        ? (3 * e) / 4
        : void 0;
    },
    aspectRatioW: function(e, t) {
      return "16/9" === t
        ? (16 * e) / 9
        : "21/9" === t
        ? (21 * e) / 9
        : "4/3" === t
        ? (4 * e) / 3
        : void 0;
    },
    valueInObject: function(e, t) {
      return -1 < Object.values(e).indexOf(t);
    },
    keyInObject: function(e, t) {
      return -1 < Object.keys(e).indexOf(t);
    },
    inObject: function(e, t, n) {
      return void 0 !== e[t] && e[t] === n;
    },
    newCssSheet: function(e) {
      var t = document.createElement("style");
      return (
        void 0 !== e && t.setAttribute("media", e),
        t.appendChild(document.createTextNode("")),
        document.head.appendChild(t),
        t.sheet
      );
    },
    addCssRule: function(e, t, n, i) {
      "insertRule" in e
        ? e.insertRule(t + "{" + n + "}", i)
        : "addRule" in e && e.addRule(t, n, i);
    },
    media: function(e) {
      return window.matchMedia(e).matches;
    },
    mediaModes: function() {
      return METRO_MEDIA;
    },
    mediaExist: function(e) {
      return -1 < METRO_MEDIA.indexOf(e);
    },
    inMedia: function(e) {
      return (
        -1 < METRO_MEDIA.indexOf(e) &&
        METRO_MEDIA.indexOf(e) === METRO_MEDIA.length - 1
      );
    },
    isValue: function(e) {
      return null != e && "" !== e;
    },
    isNull: function(e) {
      return null == e;
    },
    isNegative: function(e) {
      return parseFloat(e) < 0;
    },
    isPositive: function(e) {
      return 0 < parseFloat(e);
    },
    isZero: function(e) {
      return 0 === parseFloat(e.toFixed(2));
    },
    between: function(e, t, n, i) {
      return !0 === i ? t <= e && e <= n : t < e && e < n;
    },
    parseMoney: function(e) {
      return Number(parseFloat(e.replace(/[^0-9-.]/g, "")));
    },
    parseCard: function(e) {
      return e.replace(/[^0-9]/g, "");
    },
    parsePhone: function(e) {
      return H.parseCard(e);
    },
    isVisible: function(e) {
      var t = k(e)[0];
      return (
        "none" !== H.getStyleOne(t, "display") &&
        "hidden" !== H.getStyleOne(t, "visibility") &&
        null !== t.offsetParent
      );
    },
    parseNumber: function(e, t, n) {
      return e
        .replace(new RegExp("\\" + t, "g"), "")
        .replace(new RegExp("\\" + n, "g"), ".");
    },
    nearest: function(e, t, n) {
      return (e /= t), (e = Math[!0 === n ? "floor" : "ceil"](e) * t);
    },
    bool: function(e) {
      switch (e) {
        case !0:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
          return !0;
        default:
          return !1;
      }
    },
    copy: function(e) {
      var t,
        n,
        i = document.body,
        s = k(e)[0];
      if (document.createRange && window.getSelection) {
        (t = document.createRange()),
          (n = window.getSelection()).removeAllRanges();
        try {
          t.selectNodeContents(s), n.addRange(t);
        } catch (e) {
          t.selectNode(s), n.addRange(t);
        }
      } else
        i.createTextRange &&
          ((t = i.createTextRange()).moveToElementText(s), t.select());
      document.execCommand("Copy"),
        window.getSelection
          ? window.getSelection().empty
            ? window.getSelection().empty()
            : window.getSelection().removeAllRanges &&
              window.getSelection().removeAllRanges()
          : document.selection && document.selection.empty();
    },
    isLocalhost: function(e) {
      return (
        (e = e || ".local"),
        "localhost" === location.hostname ||
          "127.0.0.1" === location.hostname ||
          "[::1]" === location.hostname ||
          "" === location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          ) ||
          -1 !== location.hostname.indexOf(e)
      );
    },
    formData: function(e) {
      var t,
        n,
        i = k(e)[0],
        s = {};
      if (i && "FORM" === i.nodeName) {
        for (t = i.elements.length - 1; 0 <= t; t -= 1)
          if ("" !== i.elements[t].name)
            switch (i.elements[t].nodeName) {
              case "INPUT":
                switch (i.elements[t].type) {
                  case "text":
                  case "hidden":
                  case "password":
                  case "button":
                  case "reset":
                  case "submit":
                    s[i.elements[t].name] = i.elements[t].value;
                    break;
                  case "checkbox":
                  case "radio":
                    i.elements[t].checked &&
                      (s[i.elements[t].name] = i.elements[t].value);
                }
                break;
              case "TEXTAREA":
                s[i.elements[t].name] = i.elements[t].value;
                break;
              case "SELECT":
                switch (i.elements[t].type) {
                  case "select-one":
                    s[i.elements[t].name] = i.elements[t].value;
                    break;
                  case "select-multiple":
                    for (
                      s[i.elements[t].name] = [],
                        n = i.elements[t].options.length - 1;
                      0 <= n;
                      n -= 1
                    )
                      i.elements[t].options[n].selected &&
                        s[i.elements[t].name].push(
                          i.elements[t].options[n].value
                        );
                }
                break;
              case "BUTTON":
                switch (i.elements[t].type) {
                  case "reset":
                  case "submit":
                  case "button":
                    s[i.elements[t].name] = i.elements[t].value;
                }
            }
        return s;
      }
    }
  };
  C.utils = H;
  var V = {
    showMarker: !0,
    material: !1,
    duration: METRO_ANIMATION_DURATION,
    oneFrame: !0,
    showActive: !0,
    activeFrameClass: "",
    activeHeadingClass: "",
    activeContentClass: "",
    onFrameOpen: C.noop,
    onFrameBeforeOpen: C.noop_true,
    onFrameClose: C.noop,
    onFrameBeforeClose: C.noop_true,
    onAccordionCreate: C.noop
  };
  (C.accordionSetup = function(e) {
    V = k.extend({}, V, e);
  }),
    window.metroAccordionSetup,
    C.accordionSetup(window.metroAccordionSetup);
  var z = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, V, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "accordion"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onAccordionCreate, [e]),
        e.fire("accordioncreate");
    },
    _createStructure: function() {
      var e,
        t = this,
        n = this.element,
        i = this.options,
        s = n.children(".frame"),
        a = n.children(".frame.active");
      n.addClass("accordion"),
        !0 === i.showMarker && n.addClass("marker-on"),
        !0 === i.material && n.addClass("material"),
        (e = 0 === a.length ? s[0] : a[0]),
        this._hideAll(),
        !0 === i.showActive &&
          (!0 === i.oneFrame
            ? this._openFrame(e)
            : k.each(a, function() {
                t._openFrame(this);
              }));
    },
    _createEvents: function() {
      var n = this,
        i = this.element,
        s = this.options,
        a = i.children(".frame.active");
      i.on(C.events.click, ".heading", function() {
        var e = k(this),
          t = e.parent();
        if (e.closest(".accordion")[0] !== i[0]) return !1;
        t.hasClass("active")
          ? (1 === a.length && s.oneFrame) || n._closeFrame(t)
          : n._openFrame(t);
      });
    },
    _openFrame: function(e) {
      var t = this.element,
        n = this.options,
        i = k(e);
      if (!1 === H.exec(n.onFrameBeforeOpen, [i[0]], t[0])) return !1;
      !0 === n.oneFrame && this._closeAll(i[0]),
        i.addClass("active " + n.activeFrameClass),
        i.children(".heading").addClass(n.activeHeadingClass),
        i
          .children(".content")
          .addClass(n.activeContentClass)
          .slideDown(n.duration),
        H.exec(n.onFrameOpen, [i[0]], t[0]),
        t.fire("frameopen", { frame: i[0] });
    },
    _closeFrame: function(e) {
      var t = this.element,
        n = this.options,
        i = k(e);
      i.hasClass("active") &&
        !1 !== H.exec(n.onFrameBeforeClose, [i[0]], t[0]) &&
        (i.removeClass("active " + n.activeFrameClass),
        i.children(".heading").removeClass(n.activeHeadingClass),
        i
          .children(".content")
          .removeClass(n.activeContentClass)
          .slideUp(n.duration),
        H.callback(n.onFrameClose, [i[0]], t[0]),
        t.fire("frameclose", { frame: i[0] }));
    },
    _closeAll: function(e) {
      var t = this,
        n = this.element.children(".frame");
      k.each(n, function() {
        e !== this && t._closeFrame(this);
      });
    },
    _hideAll: function() {
      var e = this.element.children(".frame");
      k.each(e, function() {
        k(this)
          .children(".content")
          .hide();
      });
    },
    _openAll: function() {
      var e = this,
        t = this.element.children(".frame");
      k.each(t, function() {
        e._openFrame(this);
      });
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return e.off(C.events.click, ".heading"), e;
    }
  };
  C.plugin("accordion", z);
  var j = {
    type: "ring",
    style: "light",
    size: 64,
    radius: 20,
    onActivityCreate: C.noop
  };
  (C.activitySetup = function(e) {
    j = k.extend({}, j, e);
  }),
    window.metroActivitySetup,
    C.activitySetup(window.metroActivitySetup);
  var U = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, j, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e,
        t,
        n = this.element,
        i = this.options;
      switch (
        (C.checkRuntime(n, "activity"),
        n
          .html("")
          .addClass(i.style + "-style")
          .addClass("activity-" + i.type),
        i.type)
      ) {
        case "metro":
          !(function() {
            for (e = 0; e < 5; e++)
              k("<div/>")
                .addClass("circle")
                .appendTo(n);
          })();
          break;
        case "square":
          !(function() {
            for (e = 0; e < 4; e++)
              k("<div/>")
                .addClass("square")
                .appendTo(n);
          })();
          break;
        case "cycle":
          k("<div/>")
            .addClass("cycle")
            .appendTo(n);
          break;
        case "simple":
          k(
            '<svg class="circular"><circle class="path" cx="' +
              i.size / 2 +
              '" cy="' +
              i.size / 2 +
              '" r="' +
              i.radius +
              '" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>'
          ).appendTo(n);
          break;
        default:
          !(function() {
            for (e = 0; e < 5; e++)
              (t = k("<div/>")
                .addClass("wrap")
                .appendTo(n)),
                k("<div/>")
                  .addClass("circle")
                  .appendTo(t);
          })();
      }
      H.exec(this.options.onActivityCreate, [this.element]),
        n.fire("activitycreate");
    },
    changeAttribute: function(e) {},
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("activity", U);
  var W = {
    expand: !(C.activity = {
      open: function(e) {
        var t =
            '<div data-role="activity" data-type="' +
            (e.type ? e.type : "cycle") +
            '" data-style="' +
            (e.style ? e.style : "color") +
            '"></div>',
          n = e.text ? '<div class="text-center">' + e.text + "</div>" : "";
        return C.dialog.create({
          content: t + n,
          defaultAction: !1,
          clsContent:
            "d-flex flex-column flex-justify-center flex-align-center bg-transparent no-shadow w-auto",
          clsDialog: "no-border no-shadow bg-transparent global-dialog",
          autoHide: e.autoHide ? e.autoHide : 0,
          overlayClickClose: !0 === e.overlayClickClose,
          overlayColor: e.overlayColor ? e.overlayColor : "#000000",
          overlayAlpha: e.overlayAlpha ? e.overlayAlpha : 0.5,
          clsOverlay: "global-overlay"
        });
      },
      close: function(e) {
        C.dialog.close(e);
      }
    }),
    expandPoint: null,
    duration: 100,
    onAppBarCreate: C.noop
  };
  (C.appBarSetup = function(e) {
    W = k.extend({}, W, e);
  }),
    window.metroAppBarSetup,
    C.appBarSetup(window.metroAppBarSetup);
  var Y = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, W, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "appbar"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onAppBarCreate, [e]),
        e.fire("appbarcreate");
    },
    _createStructure: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = H.elementId("app-bar");
      if ((n.addClass("app-bar"), 0 === (e = n.find(".hamburger")).length)) {
        e = k("<button>")
          .attr("type", "button")
          .addClass("hamburger menu-down");
        for (var a = 0; a < 3; a++)
          k("<span>")
            .addClass("line")
            .appendTo(e);
        !0 ===
          y.isLight(H.computedRgbToHex(H.getStyleOne(n, "background-color"))) &&
          e.addClass("dark");
      }
      n.prepend(e),
        0 === (t = n.find(".app-bar-menu")).length
          ? e.css("display", "none")
          : H.addCssRule(
              C.sheet,
              ".app-bar-menu li",
              "list-style: none!important;"
            ),
        !1 == !!n.attr("id") && n.attr("id", s),
        "block" === e.css("display")
          ? (t.hide().addClass("collapsed"), e.removeClass("hidden"))
          : e.addClass("hidden"),
        !0 === i.expand
          ? (n.addClass("app-bar-expand"), e.addClass("hidden"))
          : H.isValue(i.expandPoint) &&
            H.mediaExist(i.expandPoint) &&
            (n.addClass("app-bar-expand"), e.addClass("hidden"));
    },
    _createEvents: function() {
      var e = this,
        t = this.element,
        n = this.options,
        i = t.find(".app-bar-menu"),
        s = t.find(".hamburger");
      t.on(C.events.click, ".hamburger", function() {
        0 !== i.length && (i.hasClass("collapsed") ? e.open() : e.close());
      }),
        k(window).on(
          C.events.resize,
          function() {
            !0 !== n.expand &&
              (H.isValue(n.expandPoint) && H.mediaExist(n.expandPoint)
                ? t.addClass("app-bar-expand")
                : t.removeClass("app-bar-expand")),
              0 !== i.length &&
                ("block" !== s.css("display")
                  ? (i.show(), s.addClass("hidden"))
                  : (s.removeClass("hidden"),
                    s.hasClass("active")
                      ? i.show().removeClass("collapsed")
                      : i.hide().addClass("collapsed")));
          },
          { ns: t.attr("id") }
        );
    },
    close: function() {
      var e = this.element,
        t = this.options,
        n = e.find(".app-bar-menu"),
        i = e.find(".hamburger");
      n.slideUp(t.duration, function() {
        n.addClass("collapsed"), i.removeClass("active");
      });
    },
    open: function() {
      var e = this.element,
        t = this.options,
        n = e.find(".app-bar-menu"),
        i = e.find(".hamburger");
      n.slideDown(t.duration, function() {
        n.removeClass("collapsed"), i.addClass("active");
      });
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return (
        e.off(C.events.click, ".hamburger"),
        k(window).off(C.events.resize, { ns: e.attr("id") }),
        e
      );
    }
  };
  C.plugin("appbar", Y);
  var J = {
    playlist: null,
    src: null,
    volume: 0.5,
    loop: !1,
    autoplay: !1,
    showLoop: !0,
    showPlay: !0,
    showStop: !0,
    showMute: !0,
    showFull: !0,
    showStream: !0,
    showVolume: !0,
    showInfo: !0,
    showPlaylist: !0,
    showNext: !0,
    showPrev: !0,
    showFirst: !0,
    showLast: !0,
    showForward: !0,
    showBackward: !0,
    showShuffle: !0,
    showRandom: !0,
    loopIcon: "<span class='default-icon-loop'></span>",
    stopIcon: "<span class='default-icon-stop'></span>",
    playIcon: "<span class='default-icon-play'></span>",
    pauseIcon: "<span class='default-icon-pause'></span>",
    muteIcon: "<span class='default-icon-mute'></span>",
    volumeLowIcon: "<span class='default-icon-low-volume'></span>",
    volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
    volumeHighIcon: "<span class='default-icon-high-volume'></span>",
    playlistIcon: "<span class='default-icon-playlist'></span>",
    nextIcon: "<span class='default-icon-next'></span>",
    prevIcon: "<span class='default-icon-prev'></span>",
    firstIcon: "<span class='default-icon-first'></span>",
    lastIcon: "<span class='default-icon-last'></span>",
    forwardIcon: "<span class='default-icon-forward'></span>",
    backwardIcon: "<span class='default-icon-backward'></span>",
    shuffleIcon: "<span class='default-icon-shuffle'></span>",
    randomIcon: "<span class='default-icon-random'></span>",
    onPlay: C.noop,
    onPause: C.noop,
    onStop: C.noop,
    onEnd: C.noop,
    onMetadata: C.noop,
    onTime: C.noop,
    onAudioCreate: C.noop
  };
  (C.audioSetup = function(e) {
    J = k.extend({}, J, e);
  }),
    window.metroAudioSetup,
    C.audioSetup(window.metroAudioSetup);
  var G = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, J, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.preloader = null),
        (this.player = null),
        (this.audio = t),
        (this.stream = null),
        (this.volume = null),
        (this.volumeBackup = 0),
        (this.muted = !1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "audio"),
        this._createPlayer(),
        this._createControls(),
        this._createEvents(),
        !0 === t.autoplay && this.play(),
        H.exec(t.onAudioCreate, [e, this.player], e[0]),
        e.fire("audiocreate");
    },
    _createPlayer: function() {
      var e = this.element,
        t = this.options,
        n = this.audio,
        i = e.prev(),
        s = e.parent(),
        a = k("<div>").addClass("media-player audio-player " + e[0].className);
      0 === i.length ? s.prepend(a) : a.insertAfter(i),
        e.appendTo(a),
        k.each(
          [
            "muted",
            "autoplay",
            "controls",
            "height",
            "width",
            "loop",
            "poster",
            "preload"
          ],
          function() {
            e.removeAttr(this);
          }
        ),
        e.attr("preload", "auto"),
        (n.volume = t.volume),
        null !== t.src && this._setSource(t.src),
        (e[0].className = ""),
        (this.player = a);
    },
    _setSource: function(e) {
      var t = this.element;
      t.find("source").remove(),
        t.removeAttr("src"),
        Array.isArray(e)
          ? k.each(e, function() {
              void 0 !== this.src &&
                k("<source>")
                  .attr("src", this.src)
                  .attr("type", void 0 !== this.type ? this.type : "")
                  .appendTo(t);
            })
          : t.attr("src", e);
    },
    _createControls: function() {
      var e,
        t = this,
        n = this.element,
        i = this.options,
        s = this.elem,
        a = k("<div>")
          .addClass("controls")
          .addClass(i.clsControls)
          .insertAfter(n),
        o = k("<div>")
          .addClass("stream")
          .appendTo(a),
        r = k("<input>")
          .addClass("stream-slider ultra-thin cycle-marker")
          .appendTo(o),
        l = k("<div>")
          .addClass("load-audio")
          .appendTo(o),
        c = k("<div>")
          .addClass("volume")
          .appendTo(a),
        d = k("<input>")
          .addClass("volume-slider ultra-thin cycle-marker")
          .appendTo(c),
        h = k("<div>")
          .addClass("info-box")
          .appendTo(a);
      !0 !== i.showInfo && h.hide(),
        l.activity({ type: "metro", style: "color" }),
        l.hide(0),
        (this.preloader = l),
        C.makePlugin(r, "slider", {
          clsMarker: "bg-red",
          clsHint: "bg-cyan fg-white",
          clsComplete: "bg-cyan",
          hint: !0,
          onStart: function() {
            s.paused || s.pause();
          },
          onStop: function(e) {
            0 < s.seekable.length &&
              (s.currentTime = ((t.duration * e) / 100).toFixed(0)),
              s.paused && 0 < s.currentTime && s.play();
          }
        }),
        (this.stream = r),
        !0 !== i.showStream && o.hide(),
        C.makePlugin(d, "slider", {
          clsMarker: "bg-red",
          clsHint: "bg-cyan fg-white",
          hint: !0,
          value: 100 * i.volume,
          onChangeValue: function(e) {
            s.volume = e / 100;
          }
        }),
        (this.volume = d),
        !0 !== i.showVolume && c.hide(),
        !0 === i.showLoop &&
          (e = k("<button>")
            .attr("type", "button")
            .addClass("button square loop")
            .html(i.loopIcon)
            .appendTo(a)),
        !0 === i.showPlay &&
          k("<button>")
            .attr("type", "button")
            .addClass("button square play")
            .html(i.playIcon)
            .appendTo(a),
        !0 === i.showStop &&
          k("<button>")
            .attr("type", "button")
            .addClass("button square stop")
            .html(i.stopIcon)
            .appendTo(a),
        !0 === i.showMute &&
          k("<button>")
            .attr("type", "button")
            .addClass("button square mute")
            .html(i.muteIcon)
            .appendTo(a),
        !0 === i.loop && (e.addClass("active"), n.attr("loop", "loop")),
        this._setVolume(),
        i.muted &&
          ((t.volumeBackup = s.volume),
          C.getPlugin(t.volume, "slider").val(0),
          (s.volume = 0)),
        h.html("00:00 / 00:00");
    },
    _createEvents: function() {
      var t = this,
        n = this.element,
        i = this.options,
        s = this.elem,
        a = this.player;
      n.on("loadstart", function() {
        t.preloader.fadeIn();
      }),
        n.on("loadedmetadata", function() {
          (t.duration = s.duration.toFixed(0)),
            t._setInfo(0, t.duration),
            H.exec(i.onMetadata, [s, a], n[0]);
        }),
        n.on("canplay", function() {
          t._setBuffer(), t.preloader.fadeOut();
        }),
        n.on("progress", function() {
          t._setBuffer();
        }),
        n.on("timeupdate", function() {
          var e = Math.round((100 * s.currentTime) / t.duration);
          t._setInfo(s.currentTime, t.duration),
            C.getPlugin(t.stream, "slider").val(e),
            H.exec(i.onTime, [s.currentTime, t.duration, s, a], n[0]);
        }),
        n.on("waiting", function() {
          t.preloader.fadeIn();
        }),
        n.on("loadeddata", function() {}),
        n.on("play", function() {
          a.find(".play").html(i.pauseIcon), H.exec(i.onPlay, [s, a], n[0]);
        }),
        n.on("pause", function() {
          a.find(".play").html(i.playIcon), H.exec(i.onPause, [s, a], n[0]);
        }),
        n.on("stop", function() {
          C.getPlugin(t.stream, "slider").val(0),
            H.exec(i.onStop, [s, a], n[0]);
        }),
        n.on("ended", function() {
          C.getPlugin(t.stream, "slider").val(0), H.exec(i.onEnd, [s, a], n[0]);
        }),
        n.on("volumechange", function() {
          t._setVolume();
        }),
        a.on(C.events.click, ".play", function() {
          s.paused ? t.play() : t.pause();
        }),
        a.on(C.events.click, ".stop", function() {
          t.stop();
        }),
        a.on(C.events.click, ".mute", function() {
          t._toggleMute();
        }),
        a.on(C.events.click, ".loop", function() {
          t._toggleLoop();
        });
    },
    _toggleLoop: function() {
      var e = this.player.find(".loop");
      0 !== e.length &&
        (e.toggleClass("active"),
        e.hasClass("active")
          ? this.element.attr("loop", "loop")
          : this.element.removeAttr("loop"));
    },
    _toggleMute: function() {
      (this.muted = !this.muted),
        !1 === this.muted
          ? (this.audio.volume = this.volumeBackup)
          : ((this.volumeBackup = this.audio.volume), (this.audio.volume = 0)),
        C.getPlugin(this.volume, "slider").val(
          !1 === this.muted ? 100 * this.volumeBackup : 0
        );
    },
    _setInfo: function(e, t) {
      this.player
        .find(".info-box")
        .html(
          H.secondsToFormattedString(Math.round(e)) +
            " / " +
            H.secondsToFormattedString(Math.round(t))
        );
    },
    _setBuffer: function() {
      var e = this.audio.buffered.length
        ? Math.round(
            (Math.floor(this.audio.buffered.end(0)) /
              Math.floor(this.audio.duration)) *
              100
          )
        : 0;
      C.getPlugin(this.stream, "slider").buff(e);
    },
    _setVolume: function() {
      var e = this.audio,
        t = this.player,
        n = this.options,
        i = t.find(".mute"),
        s = 100 * e.volume;
      1 < s && s < 30
        ? i.html(n.volumeLowIcon)
        : 30 <= s && s < 60
        ? i.html(n.volumeMediumIcon)
        : 60 <= s && s <= 100
        ? i.html(n.volumeHighIcon)
        : i.html(n.muteIcon);
    },
    play: function(e) {
      void 0 !== e && this._setSource(e),
        (void 0 === this.element.attr("src") &&
          0 === this.element.find("source").length) ||
          this.audio.play();
    },
    pause: function() {
      this.audio.pause();
    },
    resume: function() {
      this.audio.paused && this.play();
    },
    stop: function() {
      this.audio.pause(),
        (this.audio.currentTime = 0),
        C.getPlugin(this.stream, "slider").val(0);
    },
    volume: function(e) {
      if (void 0 === e) return this.audio.volume;
      1 < e && (e /= 100),
        (this.audio.volume = e),
        C.getPlugin(this.volume, "slider").val(100 * e);
    },
    loop: function() {
      this._toggleLoop();
    },
    mute: function() {
      this._toggleMute();
    },
    changeSource: function() {
      var e = JSON.parse(this.element.attr("data-src"));
      this.play(e);
    },
    changeVolume: function() {
      var e = this.element.attr("data-volume");
      this.volume(e);
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-src":
          this.changeSource();
          break;
        case "data-volume":
          this.changeVolume();
      }
    },
    destroy: function() {
      var e = this.element,
        t = this.player;
      return (
        e.off("all"),
        t.off("all"),
        C.getPlugin(this.stream[0], "slider").destroy(),
        C.getPlugin(this.volume[0], "slider").destroy(),
        e
      );
    }
  };
  C.plugin("audio", G);
  var K = {
    mode: "list",
    toggle: null,
    onOpen: C.noop,
    onClose: C.noop,
    onBottomSheetCreate: C.noop
  };
  (C.bottomSheetSetup = function(e) {
    K = k.extend({}, K, e);
  }),
    window.metroBottomSheetSetup,
    C.bottomSheetSetup(window.metroBottomSheetSetup);
  var q = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, K, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.toggle = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "bottomsheet"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onBottomSheetCreate, [e], e[0]),
        e.fire("bottomsheetcreate");
    },
    _createStructure: function() {
      var e = this.element,
        t = this.options;
      e.addClass("bottom-sheet").addClass(t.mode + "-list"),
        H.isValue(t.toggle) &&
          0 < k(t.toggle).length &&
          (this.toggle = k(t.toggle));
    },
    _createEvents: function() {
      var e = this,
        t = this.element;
      H.isValue(this.toggle) &&
        this.toggle.on(C.events.click, function() {
          e.toggle();
        }),
        t.on(C.events.click, "li", function() {
          e.close();
        });
    },
    isOpen: function() {
      return this.element.hasClass("opened");
    },
    open: function(e) {
      var t = this.element,
        n = this.options;
      H.isValue(e) &&
        t.removeClass("list-style grid-style").addClass(e + "-style"),
        this.element.addClass("opened"),
        H.exec(n.onOpen, [t], t[0]),
        t.fire("open");
    },
    close: function() {
      var e = this.element,
        t = this.options;
      e.removeClass("opened"), H.exec(t.onClose, [e], e[0]), e.fire("close");
    },
    toggle: function(e) {
      this.isOpen() ? this.close() : this.open(e);
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return (
        H.isValue(this.toggle) && this.toggle.off(C.events.click),
        e.off(C.events.click, "li"),
        e
      );
    }
  };
  C.plugin("bottomsheet", q);
  var Q = {
    targets: "button",
    clsActive: "active",
    requiredButton: !(C.bottomsheet = {
      isBottomSheet: function(e) {
        return H.isMetroObject(e, "bottomsheet");
      },
      open: function(e, t) {
        if (!this.isBottomSheet(e)) return !1;
        C.getPlugin(k(e)[0], "bottomsheet").open(t);
      },
      close: function(e) {
        if (!this.isBottomSheet(e)) return !1;
        C.getPlugin(k(e)[0], "bottomsheet").close();
      },
      toggle: function(e, t) {
        if (!this.isBottomSheet(e)) return !1;
        this.isOpen(e) ? this.close(e) : this.open(e, t);
      },
      isOpen: function(e) {
        return (
          !!this.isBottomSheet(e) &&
          C.getPlugin(k(e)[0], "bottomsheet").isOpen()
        );
      }
    }),
    mode: C.groupMode.ONE,
    onButtonClick: C.noop,
    onButtonsGroupCreate: C.noop
  };
  (C.buttonGroupSetup = function(e) {
    Q = k.extend({}, Q, e);
  }),
    window.metroButtonGroupSetup,
    C.buttonGroupSetup(window.metroButtonGroupSetup);
  var X = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Q, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.active = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "buttongroup"),
        this._createGroup(),
        this._createEvents(),
        H.exec(t.onButtonsGroupCreate, [e]),
        e.fire("buttongroupcreate");
    },
    _createGroup: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = H.elementId("button-group");
      void 0 === n.attr("id") && n.attr("id", s),
        n.addClass("button-group"),
        (e = n.find(i.targets)),
        (t = n.find("." + i.clsActive)),
        i.mode === C.groupMode.ONE &&
          0 === t.length &&
          !0 === i.requiredButton &&
          k(e[0]).addClass(i.clsActive),
        i.mode === C.groupMode.ONE &&
          1 < t.length &&
          (e.removeClass(i.clsActive), k(e[0]).addClass(i.clsActive)),
        n.find("." + i.clsActive).addClass("js-active");
    },
    _createEvents: function() {
      var t = this.element,
        n = this.options;
      t.on(C.events.click, n.targets, function() {
        var e = k(this);
        H.exec(n.onButtonClick, [e], this),
          t.fire("buttonclick", { button: this }),
          (n.mode === C.groupMode.ONE && e.hasClass(n.clsActive)) ||
            (n.mode === C.groupMode.ONE
              ? (t
                  .find(n.targets)
                  .removeClass(n.clsActive)
                  .removeClass("js-active"),
                e.addClass(n.clsActive).addClass("js-active"))
              : e.toggleClass(n.clsActive).toggleClass("js-active"));
      });
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element,
        t = this.options;
      return e.off(C.events.click, t.targets), e;
    }
  };
  C.plugin("buttongroup", X);
  var $ = {
    dayBorder: !1,
    excludeDay: null,
    prevMonthIcon: "<span class='default-icon-chevron-left'></span>",
    nextMonthIcon: "<span class='default-icon-chevron-right'></span>",
    prevYearIcon: "<span class='default-icon-chevron-left'></span>",
    nextYearIcon: "<span class='default-icon-chevron-right'></span>",
    compact: !1,
    wide: !1,
    widePoint: null,
    pickerMode: !1,
    show: null,
    locale: METRO_LOCALE,
    weekStart: METRO_WEEK_START,
    outside: !0,
    buttons: "cancel, today, clear, done",
    yearsBefore: 100,
    yearsAfter: 100,
    headerFormat: "%A, %b %e",
    showHeader: !0,
    showFooter: !0,
    showTimeField: !0,
    showWeekNumber: !1,
    clsCalendar: "",
    clsCalendarHeader: "",
    clsCalendarContent: "",
    clsCalendarFooter: "",
    clsCalendarMonths: "",
    clsCalendarYears: "",
    clsToday: "",
    clsSelected: "",
    clsExcluded: "",
    clsCancelButton: "",
    clsTodayButton: "",
    clsClearButton: "",
    clsDoneButton: "",
    isDialog: !1,
    ripple: !1,
    rippleColor: "#cccccc",
    exclude: null,
    preset: null,
    minDate: null,
    maxDate: null,
    weekDayClick: !1,
    weekNumberClick: !1,
    multiSelect: !1,
    special: null,
    format: METRO_DATE_FORMAT,
    inputFormat: null,
    onCancel: C.noop,
    onToday: C.noop,
    onClear: C.noop,
    onDone: C.noop,
    onDayClick: C.noop,
    onDayDraw: C.noop,
    onWeekDayClick: C.noop,
    onWeekNumberClick: C.noop,
    onMonthChange: C.noop,
    onYearChange: C.noop,
    onCalendarCreate: C.noop
  };
  (C.calendarSetup = function(e) {
    $ = k.extend({}, $, e);
  }),
    window.metroCalendarSetup,
    C.calendarSetup(window.metroCalendarSetup);
  var Z = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, $, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.today = new Date()),
        this.today.setHours(0, 0, 0, 0),
        (this.show = new Date()),
        this.show.setHours(0, 0, 0, 0),
        (this.current = {
          year: this.show.getFullYear(),
          month: this.show.getMonth(),
          day: this.show.getDate()
        }),
        (this.preset = []),
        (this.selected = []),
        (this.exclude = []),
        (this.special = []),
        (this.excludeDay = []),
        (this.min = null),
        (this.max = null),
        (this.locale = null),
        (this.minYear = this.current.year - this.options.yearsBefore),
        (this.maxYear = this.current.year + this.options.yearsAfter),
        (this.offset = new Date().getTimezoneOffset() / 60 + 1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "calendar"),
        e.attr("id") || e.attr("id", H.elementId("calendar")),
        e
          .html("")
          .addClass("calendar " + (!0 === t.compact ? "compact" : ""))
          .addClass(t.clsCalendar),
        !0 === t.dayBorder && e.addClass("day-border"),
        H.isValue(t.excludeDay) &&
          (this.excludeDay = ("" + t.excludeDay).toArray(",", "int")),
        H.isValue(t.preset) && this._dates2array(t.preset, "selected"),
        H.isValue(t.exclude) && this._dates2array(t.exclude, "exclude"),
        H.isValue(t.special) && this._dates2array(t.special, "special"),
        !1 !== t.buttons &&
          !1 === Array.isArray(t.buttons) &&
          (t.buttons = t.buttons.split(",").map(function(e) {
            return e.trim();
          })),
        null !== t.minDate &&
          H.isDate(t.minDate, t.inputFormat) &&
          (this.min = H.isValue(t.inputFormat)
            ? t.minDate.toDate(t.inputFormat)
            : new Date(t.minDate)),
        null !== t.maxDate &&
          H.isDate(t.maxDate, t.inputFormat) &&
          (this.max = H.isValue(t.inputFormat)
            ? t.maxDate.toDate(t.inputFormat)
            : new Date(t.maxDate)),
        null !== t.show &&
          H.isDate(t.show, t.inputFormat) &&
          ((this.show = H.isValue(t.inputFormat)
            ? t.show.toDate(t.inputFormat)
            : new Date(t.show)),
          this.show.setHours(0, 0, 0, 0),
          (this.current = {
            year: this.show.getFullYear(),
            month: this.show.getMonth(),
            day: this.show.getDate()
          })),
        (this.locale =
          void 0 !== C.locales[t.locale]
            ? C.locales[t.locale]
            : C.locales["en-US"]),
        this._drawCalendar(),
        this._createEvents(),
        !0 === t.wide
          ? e.addClass("calendar-wide")
          : !H.isNull(t.widePoint) &&
            H.mediaExist(t.widePoint) &&
            e.addClass("calendar-wide"),
        !0 === t.ripple &&
          !1 !== H.isFunc(e.ripple) &&
          e.ripple({
            rippleTarget:
              ".button, .prev-month, .next-month, .prev-year, .next-year, .day",
            rippleColor: this.options.rippleColor
          }),
        H.exec(this.options.onCalendarCreate, [this.element]),
        e.fire("calendarcreate");
    },
    _dates2array: function(e, t) {
      var n,
        i = this,
        s = this.options;
      H.isNull(e) ||
        ((n = "string" == typeof e ? H.strToArray(e) : e),
        k.each(n, function() {
          var e;
          if (H.isDateObject(this)) e = this;
          else {
            if (
              ((e = H.isValue(s.inputFormat)
                ? this.toDate(s.inputFormat)
                : new Date(this)),
              !1 === H.isDate(e))
            )
              return;
            e.setHours(0, 0, 0, 0);
          }
          i[t].push(e.getTime());
        }));
    },
    _createEvents: function() {
      var s = this,
        a = this.element,
        o = this.options;
      k(window).on(
        C.events.resize,
        function() {
          !0 !== o.wide &&
            (!H.isNull(o.widePoint) && H.mediaExist(o.widePoint)
              ? a.addClass("calendar-wide")
              : a.removeClass("calendar-wide"));
        },
        { ns: a.attr("id") }
      ),
        a.on(C.events.click, function(e) {
          var t = a.find(".calendar-months"),
            n = a.find(".calendar-years");
          t.hasClass("open") && t.removeClass("open"),
            n.hasClass("open") && n.removeClass("open");
        }),
        a.on(
          C.events.click,
          ".prev-month, .next-month, .prev-year, .next-year",
          function(e) {
            var t,
              n = k(this);
            (n.hasClass("prev-month") &&
              (t = new Date(
                s.current.year,
                s.current.month - 1,
                1
              )).getFullYear() < s.minYear) ||
              (n.hasClass("next-month") &&
                (t = new Date(
                  s.current.year,
                  s.current.month + 1,
                  1
                )).getFullYear() > s.maxYear) ||
              (n.hasClass("prev-year") &&
                (t = new Date(
                  s.current.year - 1,
                  s.current.month,
                  1
                )).getFullYear() < s.minYear) ||
              (n.hasClass("next-year") &&
                (t = new Date(
                  s.current.year + 1,
                  s.current.month,
                  1
                )).getFullYear() > s.maxYear) ||
              ((s.current = {
                year: t.getFullYear(),
                month: t.getMonth(),
                day: t.getDate()
              }),
              setTimeout(
                function() {
                  s._drawContent(),
                    (n.hasClass("prev-month") || n.hasClass("next-month")) &&
                      (H.exec(o.onMonthChange, [s.current, a], a[0]),
                      a.fire("monthchange", { current: s.current })),
                    (n.hasClass("prev-year") || n.hasClass("next-year")) &&
                      (H.exec(o.onYearChange, [s.current, a], a[0]),
                      a.fire("yearchange", { current: s.current }));
                },
                o.ripple ? 300 : 1
              ));
          }
        ),
        a.on(C.events.click, ".button.today", function(e) {
          s.toDay(),
            H.exec(o.onToday, [s.today, a]),
            a.fire("today", { today: s.today });
        }),
        a.on(C.events.click, ".button.clear", function(e) {
          (s.selected = []),
            s._drawContent(),
            H.exec(o.onClear, [a]),
            a.fire("clear");
        }),
        a.on(C.events.click, ".button.cancel", function(e) {
          s._drawContent(), H.exec(o.onCancel, [a]), a.fire("cancel");
        }),
        a.on(C.events.click, ".button.done", function(e) {
          s._drawContent(), H.exec(o.onDone, [s.selected, a]), a.fire("done");
        }),
        !0 === o.weekDayClick &&
          a.on(C.events.click, ".week-days .day", function(e) {
            var t, n, i;
            (n = (t = k(this)).index()),
              !0 === o.multiSelect &&
                ((i =
                  !0 === o.outside
                    ? a.find(".days-row .day:nth-child(" + (n + 1) + ")")
                    : a.find(
                        ".days-row .day:not(.outside):nth-child(" +
                          (n + 1) +
                          ")"
                      )),
                k.each(i, function() {
                  var e = k(this),
                    t = e.data("day");
                  e.hasClass("disabled") ||
                    e.hasClass("excluded") ||
                    (s.selected.contains(t) || s.selected.push(t),
                    e.addClass("selected").addClass(o.clsSelected));
                })),
              H.exec(o.onWeekDayClick, [s.selected, t], a[0]),
              a.fire("weekdayclick", { day: t, selected: s.selected }),
              e.preventDefault(),
              e.stopPropagation();
          }),
        o.weekNumberClick &&
          a.on(C.events.click, ".days-row .week-number", function(e) {
            var t, n, i;
            (n = (t = k(this)).text()),
              !0 === o.multiSelect &&
                ((i = k(this).siblings(".day")),
                k.each(i, function() {
                  var e = k(this),
                    t = e.data("day");
                  e.hasClass("disabled") ||
                    e.hasClass("excluded") ||
                    (s.selected.contains(t) || s.selected.push(t),
                    e.addClass("selected").addClass(o.clsSelected));
                })),
              H.exec(o.onWeekNumberClick, [s.selected, n, t], a[0]),
              a.fire("weeknumberclick", {
                el: this,
                num: n,
                selected: s.selected
              }),
              e.preventDefault(),
              e.stopPropagation();
          }),
        a.on(C.events.click, ".days-row .day", function(e) {
          var t,
            n,
            i = k(this);
          if (
            ((n = i.data("day")),
            (t = s.selected.indexOf(n)),
            i.hasClass("outside"))
          )
            return (
              (n = new Date(n)),
              (s.current = {
                year: n.getFullYear(),
                month: n.getMonth(),
                day: n.getDate()
              }),
              void s._drawContent()
            );
          i.hasClass("disabled") ||
            (!0 === o.pickerMode
              ? ((s.selected = [n]),
                (s.today = new Date(n)),
                (s.current.year = s.today.getFullYear()),
                (s.current.month = s.today.getMonth()),
                (s.current.day = s.today.getDate()),
                s._drawHeader(),
                s._drawContent())
              : -1 === t
              ? (!1 === o.multiSelect &&
                  (a
                    .find(".days-row .day")
                    .removeClass("selected")
                    .removeClass(o.clsSelected),
                  (s.selected = [])),
                s.selected.push(n),
                i.addClass("selected").addClass(o.clsSelected))
              : (i.removeClass("selected").removeClass(o.clsSelected),
                H.arrayDelete(s.selected, n))),
            H.exec(o.onDayClick, [s.selected, i, a]),
            a.fire("dayclick", { day: i, selected: s.selected }),
            e.preventDefault(),
            e.stopPropagation();
        }),
        a.on(C.events.click, ".curr-month", function(e) {
          var t,
            n = a.find(".months-list");
          console.log("ku"),
            n.find(".active").removeClass("active"),
            n.scrollTop(0),
            a.find(".calendar-months").addClass("open"),
            (t = n.find(".js-month-" + s.current.month).addClass("active")),
            setTimeout(function() {
              n.animate(
                { scrollTop: t.position().top - (n.height() - t.height()) / 2 },
                200
              );
            }, 300),
            e.preventDefault(),
            e.stopPropagation();
        }),
        a.on(C.events.click, ".calendar-months li", function(e) {
          (s.current.month = k(this).index()),
            s._drawContent(),
            H.exec(o.onMonthChange, [s.current, a], a[0]),
            a.fire("monthchange", { current: s.current }),
            a.find(".calendar-months").removeClass("open"),
            e.preventDefault(),
            e.stopPropagation();
        }),
        a.on(C.events.click, ".curr-year", function(e) {
          var t,
            n = a.find(".years-list");
          n.find(".active").removeClass("active"),
            n.scrollTop(0),
            a.find(".calendar-years").addClass("open"),
            (t = n.find(".js-year-" + s.current.year).addClass("active")),
            setTimeout(function() {
              n.animate(
                { scrollTop: t.position().top - (n.height() - t.height()) / 2 },
                200
              );
            }, 300),
            e.preventDefault(),
            e.stopPropagation();
        }),
        a.on(C.events.click, ".calendar-years li", function(e) {
          (s.current.year = k(this).text()),
            s._drawContent(),
            H.exec(o.onYearChange, [s.current, a], a[0]),
            a.fire("yearchange", { current: s.current }),
            a.find(".calendar-years").removeClass("open"),
            e.preventDefault(),
            e.stopPropagation();
        });
    },
    _drawHeader: function() {
      var e = this.element,
        t = this.options,
        n = e.find(".calendar-header");
      0 === n.length &&
        (n = k("<div>")
          .addClass("calendar-header")
          .addClass(t.clsCalendarHeader)
          .appendTo(e)),
        n.html(""),
        k("<div>")
          .addClass("header-year")
          .html(this.today.getFullYear())
          .appendTo(n),
        k("<div>")
          .addClass("header-day")
          .html(this.today.format(t.headerFormat, t.locale))
          .appendTo(n),
        !1 === t.showHeader && n.hide();
    },
    _drawFooter: function() {
      var e = this.element,
        t = this.options,
        n = this.locale.buttons,
        i = e.find(".calendar-footer");
      !1 !== t.buttons &&
        (0 === i.length &&
          (i = k("<div>")
            .addClass("calendar-footer")
            .addClass(t.clsCalendarFooter)
            .appendTo(e)),
        i.html(""),
        k.each(t.buttons, function() {
          var e = k("<button>")
            .attr("type", "button")
            .addClass(
              "button " + this + " " + t["cls" + this.capitalize() + "Button"]
            )
            .html(n[this])
            .appendTo(i);
          ("cancel" !== this && "done" !== this) ||
            e.addClass("js-dialog-close");
        }),
        !1 === t.showFooter && i.hide());
    },
    _drawMonths: function() {
      var e,
        t = this.element,
        n = this.options,
        i = k("<div>")
          .addClass("calendar-months")
          .addClass(n.clsCalendarMonths)
          .appendTo(t),
        s = k("<ul>")
          .addClass("months-list")
          .appendTo(i),
        a = this.locale.calendar;
      for (e = 0; e < 12; e++)
        k("<li>")
          .addClass("js-month-" + e)
          .html(a.months[e])
          .appendTo(s);
    },
    _drawYears: function() {
      var e,
        t = this.element,
        n = this.options,
        i = k("<div>")
          .addClass("calendar-years")
          .addClass(n.clsCalendarYears)
          .appendTo(t),
        s = k("<ul>")
          .addClass("years-list")
          .appendTo(i);
      for (e = this.minYear; e <= this.maxYear; e++)
        k("<li>")
          .addClass("js-year-" + e)
          .html(e)
          .appendTo(s);
    },
    _drawContent: function() {
      var e,
        t,
        n,
        i,
        s,
        a,
        o,
        r,
        l = this.element,
        c = this.options,
        d = l.find(".calendar-content"),
        h = this.locale.calendar,
        u = 0,
        p = new Date(this.current.year, this.current.month, 1),
        f = new Date(this.current.year, this.current.month, 0).getDate();
      0 === d.length &&
        (d = k("<div>")
          .addClass("calendar-content")
          .addClass(c.clsCalendarContent)
          .appendTo(l)),
        d.html(""),
        (e = k("<div>")
          .addClass("calendar-toolbar")
          .appendTo(d)),
        k("<span>")
          .addClass("prev-month")
          .html(c.prevMonthIcon)
          .appendTo(e),
        k("<span>")
          .addClass("curr-month")
          .html(h.months[this.current.month])
          .appendTo(e),
        k("<span>")
          .addClass("next-month")
          .html(c.nextMonthIcon)
          .appendTo(e),
        k("<span>")
          .addClass("prev-year")
          .html(c.prevYearIcon)
          .appendTo(e),
        k("<span>")
          .addClass("curr-year")
          .html(this.current.year)
          .appendTo(e),
        k("<span>")
          .addClass("next-year")
          .html(c.nextYearIcon)
          .appendTo(e);
      var m = k("<div>")
          .addClass("week-days")
          .appendTo(d),
        v = "day";
      for (
        !0 === c.showWeekNumber &&
          (k("<span>")
            .addClass("week-number")
            .html("#")
            .appendTo(m),
          (v += " and-week-number")),
          t = 0;
        t < 7;
        t++
      )
        0 === c.weekStart ? (n = t) : 7 === (n = t + 1) && (n = 0),
          k("<span>")
            .addClass(v)
            .html(h.days[n + 7])
            .appendTo(m);
      var g = k("<div>")
          .addClass("days")
          .appendTo(d),
        C = k("<div>")
          .addClass("days-row")
          .appendTo(g);
      for (
        a =
          0 === c.weekStart
            ? p.getDay()
            : 0 === p.getDay()
            ? 6
            : p.getDay() - 1,
          o =
            this.current.month - 1 < 0
              ? ((r = 11), this.current.year - 1)
              : ((r = this.current.month - 1), this.current.year),
          !0 === c.showWeekNumber &&
            k("<div>")
              .addClass("week-number")
              .html(new Date(o, r, f - a + 1).getWeek(c.weekStart))
              .appendTo(C),
          t = 0;
        t < a;
        t++
      ) {
        var b = f - a + t + 1;
        (i = k("<div>")
          .addClass(v + " outside")
          .appendTo(C)),
          (s = new Date(o, r, b)).setHours(0, 0, 0, 0),
          i.data("day", s.getTime()),
          !0 === c.outside &&
            (i.html(b),
            0 < this.excludeDay.length &&
              -1 < this.excludeDay.indexOf(s.getDay()) &&
              i.addClass("disabled excluded").addClass(c.clsExcluded),
            H.exec(c.onDayDraw, [s], i[0]),
            l.fire("daydraw", { cell: i[0], date: s })),
          u++;
      }
      for (p.setHours(0, 0, 0, 0); p.getMonth() === this.current.month; )
        (i = k("<div>")
          .addClass(v)
          .html(p.getDate())
          .appendTo(C)).data("day", p.getTime()),
          this.show.getTime() === p.getTime() && i.addClass("showed"),
          this.today.getTime() === p.getTime() &&
            i.addClass("today").addClass(c.clsToday),
          0 === this.special.length
            ? (-1 !== this.selected.indexOf(p.getTime()) &&
                i.addClass("selected").addClass(c.clsSelected),
              -1 !== this.exclude.indexOf(p.getTime()) &&
                i.addClass("disabled excluded").addClass(c.clsExcluded),
              null !== this.min &&
                p.getTime() < this.min.getTime() &&
                i.addClass("disabled excluded").addClass(c.clsExcluded),
              null !== this.max &&
                p.getTime() > this.max.getTime() &&
                i.addClass("disabled excluded").addClass(c.clsExcluded),
              0 < this.excludeDay.length &&
                -1 < this.excludeDay.indexOf(p.getDay()) &&
                i.addClass("disabled excluded").addClass(c.clsExcluded))
            : -1 === this.special.indexOf(p.getTime()) &&
              i.addClass("disabled excluded").addClass(c.clsExcluded),
          H.exec(c.onDayDraw, [p], i[0]),
          l.fire("daydraw", { cell: i[0], date: p }),
          ++u % 7 == 0 &&
            ((C = k("<div>")
              .addClass("days-row")
              .appendTo(g)),
            !0 === c.showWeekNumber &&
              k("<div>")
                .addClass("week-number")
                .html(
                  new Date(
                    p.getFullYear(),
                    p.getMonth(),
                    p.getDate() + 1
                  ).getWeek(c.weekStart)
                )
                .appendTo(C)),
          p.setDate(p.getDate() + 1),
          p.setHours(0, 0, 0, 0);
      if (
        ((a =
          0 === c.weekStart
            ? p.getDay()
            : 0 === p.getDay()
            ? 6
            : p.getDay() - 1),
        (o =
          11 < this.current.month + 1
            ? ((r = 0), this.current.year + 1)
            : ((r = this.current.month + 1), this.current.year)),
        0 < a)
      )
        for (t = 0; t < 7 - a; t++)
          (i = k("<div>")
            .addClass(v + " outside")
            .appendTo(C)),
            (s = new Date(o, r, t + 1)).setHours(0, 0, 0, 0),
            i.data("day", s.getTime()),
            !0 === c.outside &&
              (i.html(t + 1),
              0 < this.excludeDay.length &&
                -1 < this.excludeDay.indexOf(s.getDay()) &&
                i.addClass("disabled excluded").addClass(c.clsExcluded),
              H.exec(c.onDayDraw, [s], i[0]),
              l.fire("daydraw", { cell: i[0], date: s }));
    },
    _drawCalendar: function() {
      var e = this;
      setTimeout(function() {
        e.element.html(""),
          e._drawHeader(),
          e._drawContent(),
          e._drawFooter(),
          e._drawMonths(),
          e._drawYears();
      }, 0);
    },
    getPreset: function() {
      return this.preset;
    },
    getSelected: function() {
      return this.selected;
    },
    getExcluded: function() {
      return this.exclude;
    },
    getToday: function() {
      return this.today;
    },
    getCurrent: function() {
      return this.current;
    },
    clearSelected: function() {
      (this.selected = []), this._drawContent();
    },
    toDay: function() {
      (this.today = new Date()),
        this.today.setHours(0, 0, 0, 0),
        (this.current = {
          year: this.today.getFullYear(),
          month: this.today.getMonth(),
          day: this.today.getDate()
        }),
        this._drawHeader(),
        this._drawContent();
    },
    setExclude: function(e) {
      var t = this.element,
        n = this.options;
      (H.isNull(e) && H.isNull(t.attr("data-exclude"))) ||
        ((n.exclude = H.isNull(e) ? t.attr("data-exclude") : e),
        this._dates2array(n.exclude, "exclude"),
        this._drawContent());
    },
    setPreset: function(e) {
      var t = this.element,
        n = this.options;
      (H.isNull(e) && H.isNull(t.attr("data-preset"))) ||
        ((n.preset = H.isNull(e) ? t.attr("data-preset") : e),
        this._dates2array(n.preset, "selected"),
        this._drawContent());
    },
    setSpecial: function(e) {
      var t = this.element,
        n = this.options;
      (H.isNull(e) && H.isNull(t.attr("data-special"))) ||
        ((n.special = H.isNull(e) ? t.attr("data-special") : e),
        this._dates2array(n.exclude, "special"),
        this._drawContent());
    },
    setShow: function(e) {
      var t = this.element,
        n = this.options;
      (H.isNull(e) && H.isNull(t.attr("data-show"))) ||
        ((n.show = H.isNull(e) ? t.attr("data-show") : e),
        (this.show = H.isDateObject(e)
          ? e
          : H.isValue(n.inputFormat)
          ? n.show.toDate(n.inputFormat)
          : new Date(n.show)),
        this.show.setHours(0, 0, 0, 0),
        (this.current = {
          year: this.show.getFullYear(),
          month: this.show.getMonth(),
          day: this.show.getDate()
        }),
        this._drawContent());
    },
    setMinDate: function(e) {
      var t = this.element,
        n = this.options;
      (n.minDate = H.isValue(e) ? e : t.attr("data-min-date")),
        H.isValue(n.minDate) &&
          H.isDate(n.minDate, n.inputFormat) &&
          (this.min = H.isValue(n.inputFormat)
            ? n.minDate.toDate(n.inputFormat)
            : new Date(n.minDate)),
        this._drawContent();
    },
    setMaxDate: function(e) {
      var t = this.element,
        n = this.options;
      (n.maxDate = H.isValue(e) ? e : t.attr("data-max-date")),
        H.isValue(n.maxDate) &&
          H.isDate(n.maxDate, n.inputFormat) &&
          (this.max = H.isValue(n.inputFormat)
            ? n.maxDate.toDate(n.inputFormat)
            : new Date(n.maxDate)),
        this._drawContent();
    },
    setToday: function(e) {
      var t = this.options;
      H.isValue(e) || (e = new Date()),
        (this.today = H.isDateObject(e)
          ? e
          : H.isValue(t.inputFormat)
          ? e.toDate(t.inputFormat)
          : new Date(e)),
        this.today.setHours(0, 0, 0, 0),
        this._drawHeader(),
        this._drawContent();
    },
    i18n: function(e) {
      var t = this.options;
      return void 0 === e
        ? t.locale
        : void 0 !== C.locales[e] &&
            ((t.locale = e),
            (this.locale = C.locales[t.locale]),
            void this._drawCalendar());
    },
    changeAttrLocale: function() {
      var e = this.element;
      this.options;
      this.i18n(e.attr("data-locale"));
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-exclude":
          this.setExclude();
          break;
        case "data-preset":
          this.setPreset();
          break;
        case "data-special":
          this.setSpecial();
          break;
        case "data-show":
          this.setShow();
          break;
        case "data-min-date":
          this.setMinDate();
          break;
        case "data-max-date":
          this.setMaxDate();
          break;
        case "data-locale":
          this.changeAttrLocale();
      }
    },
    destroy: function() {
      var e = this.element,
        t = this.options;
      return (
        e.off(
          C.events.click,
          ".prev-month, .next-month, .prev-year, .next-year"
        ),
        e.off(C.events.click, ".button.today"),
        e.off(C.events.click, ".button.clear"),
        e.off(C.events.click, ".button.cancel"),
        e.off(C.events.click, ".button.done"),
        e.off(C.events.click, ".week-days .day"),
        e.off(C.events.click, ".days-row .day"),
        e.off(C.events.click, ".curr-month"),
        e.off(C.events.click, ".calendar-months li"),
        e.off(C.events.click, ".curr-year"),
        e.off(C.events.click, ".calendar-years li"),
        e.off(C.events.click),
        !0 === t.ripple && e.data("ripple").destroy(),
        e
      );
    }
  };
  k(document).on(C.events.click, function(e) {
    k(".calendar .calendar-years").each(function() {
      k(this).removeClass("open");
    }),
      k(".calendar .calendar-months").each(function() {
        k(this).removeClass("open");
      });
  }),
    C.plugin("calendar", Z);
  var ee = {
    nullValue: !0,
    useNow: !1,
    prepend: "",
    calendarWide: !1,
    calendarWidePoint: null,
    dialogMode: !1,
    dialogPoint: 360,
    dialogOverlay: !0,
    overlayColor: "#000000",
    overlayAlpha: 0.5,
    locale: METRO_LOCALE,
    size: "100%",
    format: METRO_DATE_FORMAT,
    inputFormat: null,
    headerFormat: "%A, %b %e",
    clearButton: !1,
    calendarButtonIcon: "<span class='default-icon-calendar'></span>",
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    copyInlineStyles: !1,
    clsPicker: "",
    clsInput: "",
    yearsBefore: 100,
    yearsAfter: 100,
    weekStart: METRO_WEEK_START,
    outside: !0,
    ripple: !1,
    rippleColor: "#cccccc",
    exclude: null,
    minDate: null,
    maxDate: null,
    special: null,
    showHeader: !0,
    clsCalendar: "",
    clsCalendarHeader: "",
    clsCalendarContent: "",
    clsCalendarMonths: "",
    clsCalendarYears: "",
    clsToday: "",
    clsSelected: "",
    clsExcluded: "",
    onDayClick: C.noop,
    onCalendarPickerCreate: C.noop,
    onCalendarShow: C.noop,
    onCalendarHide: C.noop,
    onChange: C.noop,
    onMonthChange: C.noop,
    onYearChange: C.noop
  };
  (C.calendarPickerSetup = function(e) {
    ee = k.extend({}, ee, e);
  }),
    window.metroCalendarPickerSetup,
    C.calendarPickerSetup(window.metroCalendarPickerSetup);
  var te = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ee, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.value = null),
        (this.value_date = null),
        (this.calendar = null),
        (this.overlay = null),
        this._setOptionsFromDOM(),
        this._create(),
        H.exec(this.options.onCalendarPickerCreate, [this.element], this.elem),
        k(t).fire("calendarpickercreate"),
        this
      );
    },
    dependencies: ["calendar"],
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      C.checkRuntime(this.element, "calendarpicker"),
        this._createStructure(),
        this._createEvents();
    },
    _createStructure: function() {
      var s = this,
        a = this.element,
        o = this.options,
        n = k("<div>").addClass("input " + a[0].className + " calendar-picker"),
        e = k("<div>").addClass("button-group"),
        r = k("<div>").addClass("drop-shadow"),
        t = a.val().trim(),
        i = H.elementId("calendarpicker");
      n.attr("id", i),
        void 0 === a.attr("type") && a.attr("type", "text"),
        H.isValue(t)
          ? (this.value = H.isValue(o.inputFormat)
              ? t.toDate(o.inputFormat, o.locale)
              : new Date(t))
          : o.useNow && (this.value = new Date()),
        H.isValue(this.value) && this.value.setHours(0, 0, 0, 0),
        a.val(
          H.isValue(t) || !0 !== o.nullValue
            ? this.value.format(o.format, o.locale)
            : ""
        ),
        n.insertBefore(a),
        a.appendTo(n),
        e.appendTo(n),
        r.appendTo(n),
        C.makePlugin(r, "calendar", {
          wide: o.calendarWide,
          widePoint: o.calendarWidePoint,
          format: o.format,
          inputFormat: o.inputFormat,
          pickerMode: !0,
          show: o.value,
          locale: o.locale,
          weekStart: o.weekStart,
          outside: o.outside,
          buttons: !1,
          headerFormat: o.headerFormat,
          clsCalendar: o.clsCalendar,
          clsCalendarHeader: o.clsCalendarHeader,
          clsCalendarContent: o.clsCalendarContent,
          clsCalendarFooter: "d-none",
          clsCalendarMonths: o.clsCalendarMonths,
          clsCalendarYears: o.clsCalendarYears,
          clsToday: o.clsToday,
          clsSelected: o.clsSelected,
          clsExcluded: o.clsExcluded,
          ripple: o.ripple,
          rippleColor: o.rippleColor,
          exclude: o.exclude,
          minDate: o.minDate,
          maxDate: o.maxDate,
          yearsBefore: o.yearsBefore,
          yearsAfter: o.yearsAfter,
          special: o.special,
          showHeader: o.showHeader,
          showFooter: !1,
          onDayClick: function(e, t, n) {
            var i = new Date(e[0]);
            i.setHours(0, 0, 0, 0),
              s._removeOverlay(),
              (s.value = i),
              a.val(i.format(o.format, o.locale)),
              a.trigger("change"),
              r.removeClass("open open-up"),
              r.hide(),
              H.exec(o.onChange, [s.value], a[0]),
              a.fire("change", { val: s.value }),
              H.exec(o.onDayClick, [e, t, n], a[0]),
              a.fire("dayclick", { sel: e, day: t, el: n });
          },
          onMonthChange: o.onMonthChange,
          onYearChange: o.onYearChange
        }),
        (this.calendar = r),
        !0 === o.clearButton &&
          k("<button>")
            .addClass("button input-clear-button")
            .attr("tabindex", -1)
            .attr("type", "button")
            .html(o.clearButtonIcon)
            .appendTo(e),
        k("<button>")
          .addClass("button")
          .attr("tabindex", -1)
          .attr("type", "button")
          .html(o.calendarButtonIcon)
          .appendTo(e),
        "" !== o.prepend &&
          k("<div>")
            .html(o.prepend)
            .addClass("prepend")
            .addClass(o.clsPrepend)
            .appendTo(n);
      "rtl" === a.attr("dir") && n.addClass("rtl"),
        -1 < String(o.size).indexOf("%")
          ? n.css({ width: o.size })
          : n.css({ width: parseInt(o.size) + "px" }),
        (a[0].className = ""),
        a.attr("readonly", !0),
        !0 === o.copyInlineStyles &&
          k.each(H.getInlineStyles(a), function(e, t) {
            n.css(e, t);
          }),
        n.addClass(o.clsPicker),
        a.addClass(o.clsInput),
        !0 === o.dialogOverlay && (this.overlay = s._overlay()),
        !0 === o.dialogMode
          ? n.addClass("dialog-mode")
          : H.media("(max-width: " + o.dialogPoint + "px)") &&
            n.addClass("dialog-mode"),
        a.is(":disabled") ? this.disable() : this.enable();
    },
    _createEvents: function() {
      var n = this,
        i = this.element,
        s = this.options,
        a = i.parent(),
        e = a.find(".input-clear-button"),
        o = this.calendar,
        r = C.getPlugin(o[0], "calendar");
      k(window).on(
        C.events.resize,
        function() {
          !0 !== s.dialogMode &&
            (H.media("(max-width: " + s.dialogPoint + "px)")
              ? a.addClass("dialog-mode")
              : a.removeClass("dialog-mode"));
        },
        { ns: a.attr("id") }
      ),
        0 < e.length &&
          e.on(C.events.click, function(e) {
            i
              .val("")
              .trigger("change")
              .blur(),
              (n.value = null),
              e.preventDefault(),
              e.stopPropagation();
          }),
        a.on(C.events.click, "button, input", function(e) {
          var t = H.isValue(n.value) ? n.value : new Date();
          t.setHours(0, 0, 0, 0),
            !1 === o.hasClass("open") && !1 === o.hasClass("open-up")
              ? (k(".calendar-picker .calendar")
                  .removeClass("open open-up")
                  .hide(),
                r.setPreset([t]),
                r.setShow(t),
                r.setToday(t),
                a.hasClass("dialog-mode") && n.overlay.appendTo(k("body")),
                o.addClass("open"),
                !1 === H.isOutsider(o) && o.addClass("open-up"),
                H.exec(s.onCalendarShow, [i, o], o),
                i.fire("calendarshow", { calendar: o }))
              : (n._removeOverlay(),
                o.removeClass("open open-up"),
                H.exec(s.onCalendarHide, [i, o], o),
                i.fire("calendarhide", { calendar: o })),
            e.preventDefault(),
            e.stopPropagation();
        }),
        i.on(C.events.blur, function() {
          a.removeClass("focused");
        }),
        i.on(C.events.focus, function() {
          a.addClass("focused");
        }),
        i.on(C.events.change, function() {
          H.exec(s.onChange, [n.value], i[0]);
        }),
        a.on(C.events.click, function(e) {
          e.preventDefault(), e.stopPropagation();
        });
    },
    _overlay: function() {
      var e = this.options,
        t = k("<div>");
      return (
        t.addClass("overlay for-calendar-picker").addClass(e.clsOverlay),
        "transparent" === e.overlayColor
          ? t.addClass("transparent")
          : t.css({ background: H.hex2rgba(e.overlayColor, e.overlayAlpha) }),
        t
      );
    },
    _removeOverlay: function() {
      k("body")
        .find(".overlay.for-calendar-picker")
        .remove();
    },
    val: function(e) {
      var t = this.element,
        n = this.options;
      if (H.isNull(e)) return this.value;
      !0 === H.isDate(e, n.inputFormat) &&
        (C.getPlugin(this.calendar[0], "calendar").clearSelected(),
        (this.value =
          "string" == typeof e ? e.toDate(n.inputFormat, n.locale) : e),
        t.val(this.value.format(n.format)),
        t.trigger("change"));
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    i18n: function(e) {
      var t,
        n = this.options,
        i = this.calendar;
      return void 0 === e
        ? n.locale
        : void 0 !== C.locales[e] &&
            ((t = i[0].hidden) &&
              i.css({ visibility: "hidden", display: "block" }),
            C.getPlugin(i[0], "calendar").i18n(e),
            void (t && i.css({ visibility: "visible", display: "none" })));
    },
    changeAttribute: function(e) {
      var t = this,
        n = this.element,
        i = C.getPlugin(this.calendar[0], "calendar");
      switch (e) {
        case "value":
          t.val(n.attr("value"));
          break;
        case "disabled":
          this.toggleState();
          break;
        case "data-locale":
          t.i18n(n.attr("data-locale"));
          break;
        case "data-special":
          i.setSpecial(n.attr("data-special"));
          break;
        case "data-exclude":
          i.setExclude(n.attr("data-exclude"));
          break;
        case "data-min-date":
          i.setMinDate(n.attr("data-min-date"));
          break;
        case "data-max-date":
          i.setMaxDate(n.attr("data-max-date"));
      }
    },
    destroy: function() {
      var e = this.element,
        t = e.parent(),
        n = t.find(".input-clear-button");
      return (
        k(window).off(C.events.resize, { ns: t.attr("id") }),
        n.off(C.events.click),
        t.off(C.events.click, "button, input"),
        e.off(C.events.blur),
        e.off(C.events.focus),
        e.off(C.events.change),
        C.getPlugin(this.calendar[0], "calendar").destroy(),
        e
      );
    }
  };
  C.plugin("calendarpicker", te),
    k(document).on(C.events.click, ".overlay.for-calendar-picker", function() {
      k(this).remove();
    }),
    k(document).on(C.events.click, function() {
      k(".calendar-picker .calendar").removeClass("open open-up");
    });
  var ne = {
    autoStart: !1,
    width: "100%",
    height: "16/9",
    effect: "slide",
    effectFunc: "linear",
    direction: "left",
    duration: METRO_ANIMATION_DURATION,
    period: 5e3,
    stopOnMouse: !0,
    controls: !0,
    bullets: !0,
    bulletsStyle: "square",
    bulletsSize: "default",
    controlsOnMouse: !1,
    controlsOutside: !1,
    bulletsPosition: "default",
    controlPrev: "&#x23F4",
    controlNext: "&#x23F5",
    clsCarousel: "",
    clsSlides: "",
    clsSlide: "",
    clsControls: "",
    clsControlNext: "",
    clsControlPrev: "",
    clsBullets: "",
    clsBullet: "",
    clsBulletOn: "",
    clsThumbOn: "",
    onStop: C.noop,
    onStart: C.noop,
    onPlay: C.noop,
    onSlideClick: C.noop,
    onBulletClick: C.noop,
    onThumbClick: C.noop,
    onMouseEnter: C.noop,
    onMouseLeave: C.noop,
    onNextClick: C.noop,
    onPrevClick: C.noop,
    onSlideShow: C.noop,
    onSlideHide: C.noop,
    onCarouselCreate: C.noop
  };
  (C.carouselSetup = function(e) {
    ne = k.extend({}, ne, e);
  }),
    window.metroCarouselSetup,
    C.carouselSetup(window.metroCarouselSetup);
  var ie = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ne, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.height = 0),
        (this.width = 0),
        (this.slides = []),
        (this.current = null),
        (this.currentIndex = null),
        (this.dir = this.options.direction),
        (this.interval = null),
        (this.isAnimate = !1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options,
        n = e.find(".slide"),
        i = e.find(".slides"),
        s = H.elementId("carousel");
      C.checkRuntime(e, "carousel"),
        void 0 === e.attr("id") && e.attr("id", s),
        e.addClass("carousel").addClass(t.clsCarousel),
        !0 === t.controlsOutside && e.addClass("controls-outside"),
        0 === i.length &&
          ((i = k("<div>")
            .addClass("slides")
            .appendTo(e)),
          n.appendTo(i)),
        n.addClass(t.clsSlides),
        0 === n.length ||
          (this._createSlides(),
          this._createControls(),
          this._createBullets(),
          this._createEvents(),
          this._resize(),
          !0 === t.controlsOnMouse &&
            (e.find("[class*=carousel-switch]").fadeOut(0),
            e.find(".carousel-bullets").fadeOut(0)),
          !0 === t.autoStart
            ? this._start()
            : (H.exec(
                t.onSlideShow,
                [this.slides[this.currentIndex][0], void 0],
                this.slides[this.currentIndex][0]
              ),
              e.fire("slideshow", {
                current: this.slides[this.currentIndex][0],
                prev: void 0
              }))),
        H.exec(t.onCarouselCreate, [e]),
        e.fire("carouselcreate");
    },
    _start: function() {
      var t = this,
        e = this.element,
        n = this.options,
        i = n.period,
        s = this.slides[this.currentIndex];
      void 0 !== s.data("period") && (i = s.data("period")),
        this.slides.length <= 1 ||
          ((this.interval = setTimeout(function() {
            var e = "left" === n.direction ? "next" : "prior";
            t._slideTo(e, !0);
          }, i)),
          H.exec(n.onStart, [e], e[0]),
          e.fire("start"));
    },
    _stop: function() {
      clearInterval(this.interval), (this.interval = !1);
    },
    _resize: function() {
      var t,
        e = this.element,
        n = this.options,
        i = e.outerWidth(),
        s = [];
      -1 < ["16/9", "21/9", "4/3"].indexOf(n.height)
        ? (t = H.aspectRatioH(i, n.height))
        : -1 < String(n.height).indexOf("@")
        ? ((s = H.strToArray(n.height.substr(1), "|")),
          k.each(s, function() {
            var e = H.strToArray(this, ",");
            window.matchMedia(e[0]).matches &&
              (t =
                -1 < ["16/9", "21/9", "4/3"].indexOf(e[1])
                  ? H.aspectRatioH(i, e[1])
                  : parseInt(e[1]));
          }))
        : (t = parseInt(n.height)),
        e.css({ height: t });
    },
    _createSlides: function() {
      var n = this,
        e = this.element,
        i = this.options,
        t = e.find(".slide");
      k.each(t, function(e) {
        var t = k(this);
        if (
          (void 0 !== t.data("cover") &&
            t.css({ backgroundImage: "url(" + t.data("cover") + ")" }),
          0 !== e)
        )
          switch (i.effect) {
            case "switch":
            case "slide":
              t.css("left", "100%");
              break;
            case "slide-v":
              t.css("top", "100%");
              break;
            case "fade":
              t.css("opacity", "0");
          }
        t.addClass(i.clsSlide), n.slides.push(t);
      }),
        (this.currentIndex = 0),
        (this.current = this.slides[this.currentIndex]);
    },
    _createControls: function() {
      var e,
        t,
        n = this.element,
        i = this.options;
      !1 !== i.controls &&
        ((e = k("<span/>")
          .addClass("carousel-switch-next")
          .addClass(i.clsControls)
          .addClass(i.clsControlNext)
          .html(">")),
        (t = k("<span/>")
          .addClass("carousel-switch-prev")
          .addClass(i.clsControls)
          .addClass(i.clsControlPrev)
          .html("<")),
        i.controlNext && e.html(i.controlNext),
        i.controlPrev && t.html(i.controlPrev),
        e.appendTo(n),
        t.appendTo(n));
    },
    _createBullets: function() {
      var e,
        t,
        n = this.element,
        i = this.options;
      if (!1 !== i.bullets) {
        for (
          e = k("<div>")
            .addClass("carousel-bullets")
            .addClass(i.bulletsSize + "-size")
            .addClass("bullet-style-" + i.bulletsStyle)
            .addClass(i.clsBullets),
            "default" === i.bulletsPosition || "center" === i.bulletsPosition
              ? e.addClass("flex-justify-center")
              : "left" === i.bulletsPosition
              ? e.addClass("flex-justify-start")
              : e.addClass("flex-justify-end"),
            t = 0;
          t < this.slides.length;
          t++
        ) {
          var s = k("<span>")
            .addClass("carousel-bullet")
            .addClass(i.clsBullet)
            .data("slide", t);
          0 === t && s.addClass("bullet-on").addClass(i.clsBulletOn),
            s.appendTo(e);
        }
        e.appendTo(n);
      }
    },
    _createEvents: function() {
      var n = this,
        i = this.element,
        s = this.options;
      i.on(C.events.click, ".carousel-bullet", function(e) {
        var t = k(this);
        !1 === n.isAnimate &&
          (n._slideToSlide(t.data("slide")),
          H.exec(s.onBulletClick, [t, i, e]),
          i.fire("bulletclick", { bullet: t }));
      }),
        i.on(C.events.click, ".carousel-switch-next", function(e) {
          !1 === n.isAnimate &&
            (n._slideTo("next", !1),
            H.exec(s.onNextClick, [i, e]),
            i.fire("nextclick", { button: this }));
        }),
        i.on(C.events.click, ".carousel-switch-prev", function(e) {
          !1 === n.isAnimate &&
            (n._slideTo("prev", !1),
            H.exec(s.onPrevClick, [i, e]),
            i.fire("prevclick", { button: this }));
        }),
        !0 === s.stopOnMouse &&
          !0 === s.autoStart &&
          (i.on(C.events.enter, function(e) {
            n._stop(), H.exec(s.onMouseEnter, [i, e]);
          }),
          i.on(C.events.leave, function(e) {
            n._start(), H.exec(s.onMouseLeave, [i, e]);
          })),
        !0 === s.controlsOnMouse &&
          (i.on(C.events.enter, function() {
            i.find("[class*=carousel-switch]").fadeIn(),
              i.find(".carousel-bullets").fadeIn();
          }),
          i.on(C.events.leave, function() {
            i.find("[class*=carousel-switch]").fadeOut(),
              i.find(".carousel-bullets").fadeOut();
          })),
        i.on(C.events.click, ".slide", function(e) {
          var t = k(this);
          H.exec(s.onSlideClick, [t, i, e]), i.fire("slideclick", { slide: t });
        }),
        k(window).on(
          C.events.resize,
          function() {
            n._resize();
          },
          { ns: i.attr("id") }
        );
    },
    _slideToSlide: function(e) {
      var t,
        n,
        i,
        s = this.element,
        a = this.options;
      void 0 !== this.slides[e] &&
        this.currentIndex !== e &&
        ((i = e > this.currentIndex ? "next" : "prev"),
        (t = this.slides[this.currentIndex]),
        (n = this.slides[e]),
        (this.currentIndex = e),
        this._effect(t, n, a.effect, i),
        s
          .find(".carousel-bullet")
          .removeClass("bullet-on")
          .removeClass(a.clsBulletOn),
        s
          .find(".carousel-bullet:nth-child(" + (this.currentIndex + 1) + ")")
          .addClass("bullet-on")
          .addClass(a.clsBulletOn));
    },
    _slideTo: function(e, t) {
      var n,
        i,
        s = this.element,
        a = this.options;
      void 0 === e && (e = "next"),
        (n = this.slides[this.currentIndex]),
        "next" === e
          ? (this.currentIndex++,
            this.currentIndex >= this.slides.length && (this.currentIndex = 0))
          : (this.currentIndex--,
            this.currentIndex < 0 &&
              (this.currentIndex = this.slides.length - 1)),
        (i = this.slides[this.currentIndex]),
        this._effect(n, i, a.effect, e, t),
        s
          .find(".carousel-bullet")
          .removeClass("bullet-on")
          .removeClass(a.clsBulletOn),
        s
          .find(".carousel-bullet:nth-child(" + (this.currentIndex + 1) + ")")
          .addClass("bullet-on")
          .addClass(a.clsBulletOn);
    },
    _effect: function(e, t, n, i, s) {
      var a,
        o = this,
        r = this.element,
        l = this.options,
        c = l.duration,
        d = l.effectFunc,
        h = l.period;
      switch (
        (void 0 !== t.data("duration") && (c = t.data("duration")),
        void 0 !== t.data("effectFunc") && (d = t.data("effectFunc")),
        "switch" === n && (c = 0),
        e.stop(!0, !0),
        t.stop(!0, !0),
        (this.isAnimate = !0),
        setTimeout(function() {
          o.isAnimate = !1;
        }, c),
        "slide" === n && (a = "next" === i ? "slideLeft" : "slideRight"),
        "slide-v" === n && (a = "next" === i ? "slideUp" : "slideDown"),
        n)
      ) {
        case "slide":
        case "slide-v":
          v[a](e, t, c, d);
          break;
        case "fade":
          v.fade(e, t, c, d);
          break;
        default:
          v.switch(e, t);
      }
      setTimeout(function() {
        H.exec(l.onSlideShow, [t[0], e[0]], t[0]),
          r.fire("slideshow", { current: t[0], prev: e[0] });
      }, c),
        setTimeout(function() {
          H.exec(l.onSlideHide, [e[0], t[0]], e[0]),
            r.fire("slidehide", { current: e[0], next: t[0] });
        }, c),
        !0 === s &&
          (void 0 !== t.data("period") && (h = t.data("period")),
          (this.interval = setTimeout(function() {
            var e = "left" === l.direction ? "next" : "prior";
            o._slideTo(e, !0);
          }, h)));
    },
    toSlide: function(e) {
      this._slideToSlide(e);
    },
    next: function() {
      this._slideTo("next");
    },
    prev: function() {
      this._slideTo("prev");
    },
    stop: function() {
      clearInterval(this.interval),
        H.exec(this.options.onStop, [this.element]),
        this.element.fire("stop");
    },
    play: function() {
      this._start(),
        H.exec(this.options.onPlay, [this.element]),
        this.element.fire("play");
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element,
        t = this.options;
      return (
        e.off(C.events.click, ".carousel-bullet"),
        e.off(C.events.click, ".carousel-switch-next"),
        e.off(C.events.click, ".carousel-switch-prev"),
        !0 === t.stopOnMouse &&
          !0 === t.autoStart &&
          (e.off(C.events.enter), e.off(C.events.leave)),
        !0 === t.controlsOnMouse &&
          (e.off(C.events.enter), e.off(C.events.leave)),
        e.off(C.events.click, ".slide"),
        k(window).off(C.events.resize + "-" + e.attr("id")),
        e
      );
    }
  };
  C.plugin("carousel", ie);
  var se = {
    position: "right",
    opacity: 1,
    clsCharms: "",
    onCharmCreate: C.noop,
    onOpen: C.noop,
    onClose: C.noop,
    onToggle: C.noop
  };
  (C.charmsSetup = function(e) {
    se = k.extend({}, se, e);
  }),
    window.metroCharmsSetup,
    C.charmsSetup(window.metroCharmsSetup);
  var ae = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, se, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.origin = { background: "" }),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "charms"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onCharmCreate, [e]),
        e.fire("charmcreate");
    },
    _createStructure: function() {
      var e = this.element,
        t = this.options;
      e
        .addClass("charms")
        .addClass(t.position + "-side")
        .addClass(t.clsCharms),
        (this.origin.background = e.css("background-color")),
        e.css({
          backgroundColor: H.computedRgbToRgba(
            H.getStyleOne(e, "background-color"),
            t.opacity
          )
        });
    },
    _createEvents: function() {},
    open: function() {
      var e = this.element,
        t = this.options;
      e.addClass("open"), H.exec(t.onOpen, null, e[0]), e.fire("open");
    },
    close: function() {
      var e = this.element,
        t = this.options;
      e.removeClass("open"), H.exec(t.onClose, null, e[0]), e.fire("close");
    },
    toggle: function() {
      var e = this.element,
        t = this.options;
      !0 === e.hasClass("open") ? this.close() : this.open(),
        H.exec(t.onToggle, null, e[0]),
        e.fire("toggle");
    },
    opacity: function(e) {
      var t = this.element,
        n = this.options;
      if (void 0 === e) return n.opacity;
      var i = Math.abs(parseFloat(e));
      i < 0 ||
        1 < i ||
        ((n.opacity = i),
        t.css({
          backgroundColor: H.computedRgbToRgba(
            H.getStyleOne(t, "background-color"),
            i
          )
        }));
    },
    changeOpacity: function() {
      var e = this.element;
      this.opacity(e.attr("data-opacity"));
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-opacity":
          this.changeOpacity();
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("charms", ae),
    (C.charms = {
      check: function(e) {
        return (
          !1 !== H.isMetroObject(e, "charms") ||
          (console.warn("Element is not a charms component"), !1)
        );
      },
      isOpen: function(e) {
        if (!1 !== this.check(e)) return k(e).hasClass("open");
      },
      open: function(e) {
        !1 !== this.check(e) && C.getPlugin(k(e)[0], "charms").open();
      },
      close: function(e) {
        !1 !== this.check(e) && C.getPlugin(k(e)[0], "charms").close();
      },
      toggle: function(e) {
        !1 !== this.check(e) && C.getPlugin(k(e)[0], "charms").toggle();
      },
      closeAll: function() {
        k("[data-role*=charms]").each(function() {
          C.getPlugin(this, "charms").close();
        });
      },
      opacity: function(e, t) {
        !1 !== this.check(e) && C.getPlugin(k(e)[0], "charms").opacity(t);
      }
    });
  var oe =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAUABQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t+KKPxo/GgA70Yo/Gj8aADFH4VesdC1HUl3WtjcXCf344yV/PGKW+0HUtNXddWNzbp/fkjIX88YoAofhR+FH40fjQAfhR+FH40fjQAUUUUAFepeAPh5D9li1LVYhK8g3Q27j5VXszDuT6f5HA+FtOXVvEWn2rjMcko3j1UckfkDX0MBgYHAoARVCKFUBVHAA6ClZQwKkZBGCDS0UAec+Pvh3BJay6lpUQimjBeW3QYVx3Kjsfbv/PyqvpuvnvxfpqaT4l1C1QbY0lJUDsrfMB+RoAyKKKKACiiigDa8GXq6f4p02eQgIJQpJ7Bvlz+tfQP4V8yDg17P4A8cw65ZxWV5IE1KMbfmP+uA7j39R+NAHaUfhSUUAL+FeA+OL1NQ8WalNGQU83YCO+0Bf6V6b498cQ6BZyWlrIJNSkXaApz5QP8AEff0FeKk5OTyTQAUUUUAH40fjRU1naTX93DbQIXmlYIijuTQBc0Dw/eeI74W1mm49XkbhUHqTXsHhz4eaXoCpI8YvbscmaYZAP8Asr0H8/etHwv4cg8M6XHaxANIfmllxy7dz9PStigA/Gk/GlooA5bxJ8PdL19XkWMWd43PnwjGT/tL0P8AP3rx/X/D954cvjbXibT1SReVceoNfRFZHijw5B4m0uS1lAWQfNFLjlG7H6etAHz5+NH41NeWk1hdzW06FJonKMp7EGoaACvQfhBowudTudRkXK2y7I8j+Nup/Afzrz6vafhRaCDwmkgHM8zufwO3/wBloA7Kiij8KACkpaSgBaSj8KKAPJvi/owttTttRjXC3K7JMf3l6H8R/KvPq9p+K1qJ/CbyEcwTI4P1O3/2avFqAP/Z",
    re = {
      inputTimeFormat: "%m-%d-%y",
      timeFormat: "%d %b %l:%M %p",
      name: "John Doe",
      avatar: oe,
      welcome: null,
      title: null,
      width: "100%",
      height: "auto",
      randomColor: !1,
      messages: null,
      sendButtonTitle: "Send",
      readonly: !1,
      clsChat: "",
      clsName: "",
      clsTime: "",
      clsInput: "",
      clsSendButton: "",
      clsMessageLeft: "default",
      clsMessageRight: "default",
      onMessage: C.noop,
      onSend: C.noop,
      onSendButtonClick: C.noop,
      onChatCreate: C.noop
    };
  (C.chatSetup = function(e) {
    re = k.extend({}, re, e);
  }),
    window.metroChatSetup,
    C.chatSetup(window.metroChatSetup);
  var le = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, re, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.input = null),
        (this.classes = "primary secondary success alert warning yellow info dark light".split(
          " "
        )),
        (this.lastMessage = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "chat"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onChatCreate, [e]),
        e.fire("chatcreate");
    },
    _createStructure: function() {
      var e,
        t,
        n = this,
        i = this.element,
        s = this.options,
        a = [
          {
            html: s.sendButtonTitle,
            cls: s.clsSendButton + " js-chat-send-button",
            onclick: s.onSendButtonClick
          }
        ];
      i.addClass("chat").addClass(s.clsChat),
        i.css({ width: s.width, height: s.height }),
        H.isValue(s.title) &&
          k("<div>")
            .addClass("title")
            .html(s.title)
            .appendTo(i),
        k("<div>")
          .addClass("messages")
          .appendTo(i),
        (e = k("<div>")
          .addClass("message-input")
          .appendTo(i)),
        (t = k("<input type='text'>")).appendTo(e),
        t.input({ customButtons: a, clsInput: s.clsInput }),
        s.welcome &&
          this.add({
            text: s.welcome,
            time: new Date(),
            position: "left",
            name: "Welcome",
            avatar: oe
          }),
        H.isValue(s.messages) &&
          "string" == typeof s.messages &&
          (s.messages = H.isObject(s.messages)),
        !H.isNull(s.messages) &&
          "object" == typeof s.messages &&
          0 < H.objectLength(s.messages) &&
          k.each(s.messages, function() {
            n.add(this);
          }),
        i
          .find(".message-input")
          [s.readonly ? "addClass" : "removeClass"]("disabled");
    },
    _createEvents: function() {
      function t() {
        var e,
          t = "" + a.val();
        if ("" === t.trim()) return !1;
        (e = {
          id: H.elementId(""),
          name: s.name,
          avatar: s.avatar,
          text: t,
          position: "right",
          time: new Date()
        }),
          n.add(e),
          H.exec(s.onSend, [e], i[0]),
          i.fire("send", { msg: e }),
          a.val("");
      }
      var n = this,
        i = this.element,
        s = this.options,
        e = i.find(".js-chat-send-button"),
        a = i.find("input[type=text]");
      e.on(C.events.click, function() {
        t();
      }),
        a.on(C.events.keyup, function(e) {
          e.keyCode === C.keyCode.ENTER && t();
        });
    },
    add: function(e) {
      var t,
        n,
        i,
        s,
        a,
        o,
        r,
        l,
        c = this.element,
        d = this.options,
        h = c.find(".messages");
      return (
        (l =
          "string" == typeof e.time
            ? e.time.toDate(d.inputTimeFormat)
            : e.time),
        (n = k("<div>")
          .addClass("message")
          .addClass(e.position)
          .appendTo(h)),
        (i = k("<div>")
          .addClass("message-sender")
          .addClass(d.clsName)
          .html(e.name)
          .appendTo(n)),
        (s = k("<div>")
          .addClass("message-time")
          .addClass(d.clsTime)
          .html(l.format(d.timeFormat))
          .appendTo(n)),
        (a = k("<div>")
          .addClass("message-item")
          .appendTo(n)),
        (o = k("<img>")
          .attr("src", e.avatar)
          .addClass("message-avatar")
          .appendTo(a)),
        (r = k("<div>")
          .addClass("message-text")
          .html(e.text)
          .appendTo(a)),
        H.isValue(e.id) && n.attr("id", e.id),
        !0 === d.randomColor
          ? ((t = H.random(0, this.classes.length - 1)),
            r.addClass(this.classes[t]))
          : ("left" === e.position &&
              H.isValue(d.clsMessageLeft) &&
              r.addClass(d.clsMessageLeft),
            "right" === e.position &&
              H.isValue(d.clsMessageRight) &&
              r.addClass(d.clsMessageRight)),
        H.exec(
          d.onMessage,
          [e, { message: n, sender: i, time: s, item: a, avatar: o, text: r }],
          n[0]
        ),
        c.fire("message", {
          msg: e,
          el: { message: n, sender: i, time: s, item: a, avatar: o, text: r }
        }),
        setImmediate(function() {
          c.fire("onmessage", { message: e, element: n[0] });
        }),
        h.animate({ scrollTop: h[0].scrollHeight }, 1e3),
        (this.lastMessage = e),
        this
      );
    },
    addMessages: function(e) {
      var t = this;
      return (
        H.isValue(e) && "string" == typeof e && (e = H.isObject(e)),
        "object" == typeof e &&
          0 < H.objectLength(e) &&
          k.each(e, function() {
            t.add(this);
          }),
        this
      );
    },
    delMessage: function(e) {
      return (
        this.element
          .find(".messages")
          .find("#" + e)
          .remove(),
        this
      );
    },
    updMessage: function(e) {
      var t = this.element.find(".messages").find("#" + e.id);
      return (
        0 === t.length ||
          (t.find(".message-text").html(e.text),
          t.find(".message-time").html(e.time)),
        this
      );
    },
    clear: function() {
      this.element.find(".messages").html(""), (this.lastMessage = null);
    },
    toggleReadonly: function(e) {
      var t = this.element,
        n = this.options;
      (n.readonly = void 0 === e ? !n.readonly : e),
        t
          .find(".message-input")
          [n.readonly ? "addClass" : "removeClass"]("disabled");
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-readonly":
          this.toggleReadonly();
      }
    },
    destroy: function() {
      var e = this.element,
        t = e.find(".js-chat-send-button"),
        n = e.find("input[type=text]");
      return t.off(C.events.click), n.off(C.events.keyup), e;
    }
  };
  C.plugin("chat", le);
  var ce = {
    transition: !0,
    style: 1,
    caption: "",
    captionPosition: "right",
    indeterminate: !1,
    clsCheckbox: "",
    clsCheck: "",
    clsCaption: "",
    onCheckboxCreate: C.noop
  };
  (C.checkboxSetup = function(e) {
    ce = k.extend({}, ce, e);
  }),
    window.metroCheckboxSetup,
    C.checkboxSetup(window.metroCheckboxSetup);
  var de = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ce, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.origin = { className: "" }),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options,
        n = k("<label>")
          .addClass("checkbox " + e[0].className)
          .addClass(2 === t.style ? "style2" : ""),
        i = k("<span>").addClass("check"),
        s = k("<span>")
          .addClass("caption")
          .html(t.caption);
      C.checkRuntime(e, "checkbox"),
        void 0 === e.attr("id") && e.attr("id", H.elementId("checkbox")),
        n.attr("for", e.attr("id")),
        e.attr("type", "checkbox"),
        n.insertBefore(e),
        e.appendTo(n),
        i.appendTo(n),
        s.appendTo(n),
        !0 === t.transition && n.addClass("transition-on"),
        "left" === t.captionPosition && n.addClass("caption-left"),
        (this.origin.className = e[0].className),
        (e[0].className = ""),
        n.addClass(t.clsCheckbox),
        s.addClass(t.clsCaption),
        i.addClass(t.clsCheck),
        t.indeterminate && (e[0].indeterminate = !0),
        e.is(":disabled") ? this.disable() : this.enable(),
        H.exec(t.onCheckboxCreate, [e]),
        e.fire("checkboxcreate");
    },
    indeterminate: function(e) {
      H.isNull(e) && (e = !0), (this.element[0].indeterminate = e);
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      var t,
        n = this.element,
        i = this.options,
        s = n.parent();
      switch (e) {
        case "disabled":
          this.toggleState();
          break;
        case "data-indeterminate":
          n[0].indeterminate = !0 === JSON.parse(n.attr("data-indeterminate"));
          break;
        case "data-style":
          (t = parseInt(n.attr("data-style"))),
            H.isInt(t) &&
              ((i.style = t),
              s.removeClass("style1 style2").addClass("style" + t));
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("checkbox", de);
  var he = {
    showTime: !0,
    showDate: !0,
    timeFormat: "24",
    dateFormat: "american",
    divider: "&nbsp;&nbsp;",
    leadingZero: !0,
    dateDivider: "-",
    timeDivider: ":",
    onClockCreate: C.noop
  };
  (C.clockSetup = function(e) {
    he = k.extend({}, he, e);
  }),
    window.metroClockSetup,
    C.clockSetup(window.metroClockSetup);
  var ue = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, he, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this._clockInterval = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this,
        t = this.element;
      C.checkRuntime(t, "clock"),
        this._tick(),
        H.exec(this.options.onClockCreate, [this.element]),
        t.fire("clockcreate"),
        (this._clockInterval = setInterval(function() {
          e._tick();
        }, 500));
    },
    _addLeadingZero: function(e) {
      return e < 10 && (e = "0" + e), e;
    },
    _tick: function() {
      var e = this.element,
        t = this.options,
        n = new Date(),
        i = "",
        s = n.getHours(),
        a = n.getMinutes(),
        o = n.getSeconds(),
        r = n.getDate(),
        l = n.getMonth() + 1,
        c = n.getFullYear(),
        d = "";
      12 === parseInt(t.timeFormat) &&
        ((d = " AM"),
        11 < s && (d = " PM"),
        12 < s && (s -= 12),
        0 === s && (s = 12)),
        (a = this._addLeadingZero(a)),
        (o = this._addLeadingZero(o)),
        t.leadingZero &&
          ((s = this._addLeadingZero(s)),
          (l = this._addLeadingZero(l)),
          (r = this._addLeadingZero(r))),
        t.showDate &&
          ("american" === t.dateFormat
            ? ((i += "<span class='date-month'>" + l + "</span>"),
              (i += "<span class='date-divider'>" + t.dateDivider + "</span>"),
              (i += "<span class='date-day'>" + r + "</span>"))
            : ((i += "<span class='date-day'>" + r + "</span>"),
              (i += "<span class='date-divider'>" + t.dateDivider + "</span>"),
              (i += "<span class='date-month'>" + l + "</span>")),
          (i += "<span class='date-divider'>" + t.dateDivider + "</span>"),
          (i += "<span class='date-year'>" + c + "</span>"),
          (i += t.divider)),
        t.showTime &&
          ((i += "<span class='clock-hour'>" + s + "</span>"),
          (i += "<span class='clock-divider'>" + t.timeDivider + "</span>"),
          (i += "<span class='clock-minute'>" + a + "</span>"),
          (i += "<span class='clock-divider'>" + t.timeDivider + "</span>"),
          (i += "<span class='clock-second'>" + o + "</span>"),
          (i += "<span class='clock-suffix'>" + d + "</span>")),
        e.html(i);
    },
    changeAttribute: function(e) {},
    destroy: function() {
      return (
        clearInterval(this._clockInterval),
        (this._clockInterval = null),
        this.element
      );
    }
  };
  C.plugin("clock", ue);
  var pe = {
    collapsed: !1,
    toggleElement: !1,
    duration: 100,
    onExpand: C.noop,
    onCollapse: C.noop,
    onCollapseCreate: C.noop
  };
  (C.collapseSetup = function(e) {
    pe = k.extend({}, pe, e);
  }),
    window.metroCollapseSetup,
    C.collapseSetup(window.metroCollapseSetup);
  var fe = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, pe, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.toggle = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e,
        t = this,
        n = this.element,
        i = this.options;
      C.checkRuntime(n, "collapse"),
        (e =
          !1 !== i.toggleElement
            ? k(i.toggleElement)
            : 0 < n.siblings(".collapse-toggle").length
            ? n.siblings(".collapse-toggle")
            : n.siblings("a:nth-child(1)")),
        (!0 !== i.collapsed && !0 !== n.attr("collapsed")) || n.hide(0),
        e.on(C.events.click, function(e) {
          "block" !== n.css("display") || n.hasClass("keep-open")
            ? t._open(n)
            : t._close(n),
            -1 === ["INPUT"].indexOf(e.target.tagName) && e.preventDefault(),
            e.stopPropagation();
        }),
        (this.toggle = e),
        H.exec(this.options.onCollapseCreate, [this.element]),
        n.fire("collapsecreate");
    },
    _close: function(e, t) {
      var n = k(e),
        i = C.getPlugin(n[0], "collapse").options,
        s = t ? "show" : "slideUp",
        a = t ? 0 : i.duration;
      this.toggle.removeClass("active-toggle"),
        n[s](a, function() {
          e.trigger("onCollapse", null, e),
            e.data("collapsed", !0),
            e.addClass("collapsed"),
            H.exec(i.onCollapse, null, n[0]),
            n.fire("collapse");
        });
    },
    _open: function(e, t) {
      var n = k(e),
        i = C.getPlugin(n[0], "collapse").options,
        s = t ? "show" : "slideDown",
        a = t ? 0 : i.duration;
      this.toggle.addClass("active-toggle"),
        n[s](a, function() {
          e.trigger("onExpand", null, e),
            e.data("collapsed", !1),
            e.removeClass("collapsed"),
            H.exec(i.onExpand, null, n[0]),
            n.fire("expand");
        });
    },
    collapse: function(e) {
      this._close(this.element, e);
    },
    expand: function(e) {
      this._open(this.element, e);
    },
    close: function(e) {
      this._close(this.element, e);
    },
    open: function(e) {
      this._open(this.element, e);
    },
    isCollapsed: function() {
      return this.element.data("collapsed");
    },
    toggleState: function() {
      var e = this.element;
      !0 === e.attr("collapsed") || !0 === e.data("collapsed")
        ? this.collapse()
        : this.expand();
    },
    changeAttribute: function(e) {
      switch (e) {
        case "collapsed":
        case "data-collapsed":
          this.toggleState();
      }
    },
    destroy: function() {
      return this.toggle.off(C.events.click), this.element;
    }
  };
  C.plugin("collapse", fe);
  var me = {
    stopOnBlur: !0,
    animate: "none",
    animationFunc: "line",
    inputFormat: null,
    locale: METRO_LOCALE,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: null,
    start: !0,
    clsCountdown: "",
    clsPart: "",
    clsZero: "",
    clsAlarm: "",
    clsDays: "",
    clsHours: "",
    clsMinutes: "",
    clsSeconds: "",
    onAlarm: C.noop,
    onTick: C.noop,
    onZero: C.noop,
    onBlink: C.noop,
    onCountdownCreate: C.noop
  };
  (C.countdownSetup = function(e) {
    me = k.extend({}, me, e);
  }),
    window.metroCountdownSetup,
    C.countdownSetup(window.metroCountdownSetup);
  var ve = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, me, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.breakpoint = new Date().getTime()),
        (this.blinkInterval = null),
        (this.tickInterval = null),
        (this.zeroDaysFired = !1),
        (this.zeroHoursFired = !1),
        (this.zeroMinutesFired = !1),
        (this.zeroSecondsFired = !1),
        (this.fontSize = parseInt(H.getStyleOne(t, "font-size"))),
        (this.current = { d: 0, h: 0, m: 0, s: 0 }),
        (this.locale = null),
        (this.inactiveTab = !1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      (this.locale =
        void 0 !== C.locales[t.locale]
          ? C.locales[t.locale]
          : C.locales["en-US"]),
        C.checkRuntime(e, "countdown"),
        this._build(),
        this._createEvents();
    },
    _setBreakpoint: function() {
      var e = this.options;
      (this.breakpoint = new Date().getTime()),
        H.isValue(e.date) &&
          H.isDate(e.date, e.inputFormat) &&
          (this.breakpoint = H.isValue(e.inputFormat)
            ? e.date.toDate(e.inputFormat).getTime()
            : new Date(e.date).getTime()),
        0 < parseInt(e.days) && (this.breakpoint += 864e5 * parseInt(e.days)),
        0 < parseInt(e.hours) && (this.breakpoint += 36e5 * parseInt(e.hours)),
        0 < parseInt(e.minutes) &&
          (this.breakpoint += 6e4 * parseInt(e.minutes)),
        0 < parseInt(e.seconds) &&
          (this.breakpoint += 1e3 * parseInt(e.seconds));
    },
    _build: function() {
      var n,
        e,
        i = this,
        s = this.element,
        a = this.options,
        t = new Date().getTime();
      s.attr("id") || s.attr("id", H.elementId("countdown")),
        H.isValue(s.attr("id")) || s.attr("id", H.elementId("countdown")),
        s.addClass("countdown").addClass(a.clsCountdown),
        this._setBreakpoint(),
        (n = Math.round((i.breakpoint - t) / 864e5)),
        k.each(["days", "hours", "minutes", "seconds"], function() {
          var e = k("<div>")
            .addClass("part " + this)
            .addClass(a.clsPart)
            .attr("data-label", i.locale.calendar.time[this])
            .appendTo(s);
          if (
            ("days" === this && e.addClass(a.clsDays),
            "hours" === this && e.addClass(a.clsHours),
            "minutes" === this && e.addClass(a.clsMinutes),
            "seconds" === this && e.addClass(a.clsSeconds),
            k("<div>")
              .addClass("digit")
              .appendTo(e),
            k("<div>")
              .addClass("digit")
              .appendTo(e),
            "days" === this && 100 <= n)
          )
            for (var t = 0; t < String(Math.round(n / 100)).length; t++)
              k("<div>")
                .addClass("digit")
                .appendTo(e);
        }),
        (e = s.find(".digit")).append(
          k("<span class='digit-placeholder'>").html("0")
        ),
        e.append(k("<span class='digit-value'>").html("0")),
        H.exec(a.onCountdownCreate, [s], s[0]),
        s.fire("countdowncreate"),
        !0 === a.start ? this.start() : this.tick();
    },
    _createEvents: function() {
      var e = this,
        t = this.element;
      this.options;
      k(document).on(
        "visibilitychange",
        function() {
          document.hidden ? e.pause() : e.resume();
        },
        { ns: t.attr("id") }
      );
    },
    blink: function() {
      var e = this.element,
        t = this.options;
      e.toggleClass("blink"),
        H.exec(t.onBlink, [this.current], e[0]),
        e.fire("blink", { time: this.current });
    },
    tick: function() {
      var e,
        t,
        n,
        i,
        s,
        a = this.element,
        o = this.options,
        r = new Date().getTime(),
        l = a.find(".days"),
        c = a.find(".hours"),
        d = a.find(".minutes"),
        h = a.find(".seconds");
      if ((e = Math.floor((this.breakpoint - r) / 1e3)) <= -1)
        return (
          this.stop(),
          a.addClass(o.clsAlarm),
          H.exec(o.onAlarm, [r], a[0]),
          void a.fire("alarm", { time: r })
        );
      (e -= 86400 * (t = Math.floor(e / 86400))),
        this.current.d !== t && ((this.current.d = t), this.draw("days", t)),
        0 === t &&
          !1 === this.zeroDaysFired &&
          ((this.zeroDaysFired = !0),
          l.addClass(o.clsZero),
          H.exec(o.onZero, ["days", l], a[0]),
          a.fire("zero", { parts: ["days", l] })),
        (e -= 3600 * (n = Math.floor(e / 3600))),
        this.current.h !== n && ((this.current.h = n), this.draw("hours", n)),
        0 === t &&
          0 === n &&
          !1 === this.zeroHoursFired &&
          ((this.zeroHoursFired = !0),
          c.addClass(o.clsZero),
          H.exec(o.onZero, ["hours", c], a[0]),
          a.fire("zero", { parts: ["hours", c] })),
        (e -= 60 * (i = Math.floor(e / 60))),
        this.current.m !== i && ((this.current.m = i), this.draw("minutes", i)),
        0 === t &&
          0 === n &&
          0 === i &&
          !1 === this.zeroMinutesFired &&
          ((this.zeroMinutesFired = !0),
          d.addClass(o.clsZero),
          H.exec(o.onZero, ["minutes", d], a[0]),
          a.fire("zero", { parts: ["minutes", d] })),
        (s = Math.floor(e / 1)),
        this.current.s !== s && ((this.current.s = s), this.draw("seconds", s)),
        0 === t &&
          0 === n &&
          0 === i &&
          0 === s &&
          !1 === this.zeroSecondsFired &&
          ((this.zeroSecondsFired = !0),
          h.addClass(o.clsZero),
          H.exec(o.onZero, ["seconds", h], a[0]),
          a.fire("zero", { parts: ["seconds", h] })),
        H.exec(o.onTick, [{ days: t, hours: n, minutes: i, seconds: s }], a[0]),
        a.fire("tick", { days: t, hours: n, minutes: i, seconds: s });
    },
    draw: function(e, t) {
      function n(e) {
        var t,
          n = e.height();
        e.siblings(".-old-digit").remove(),
          (t = e.clone().appendTo(e.parent())).css({ top: -1 * n + "px" }),
          e.addClass("-old-digit").animate(
            function(e, t) {
              k(this).css({ top: n * t + "px", opacity: 1 - t });
            },
            900,
            p.animationFunc,
            function() {
              k(this).remove();
            }
          ),
          t.html(o).animate(
            function(e, t) {
              k(this).css({ top: n * t - n + "px", opacity: t });
            },
            900,
            p.animationFunc
          );
      }
      function i(e) {
        var t,
          n = e.height(),
          i = parseInt(e.style("font-size"));
        e.siblings(".-old-digit").remove(),
          (t = e.clone().appendTo(e.parent())).css({ top: 0, left: 0 }),
          e.addClass("-old-digit").animate(
            function(e, t) {
              k(this).css({
                top: n * t + "px",
                opacity: 1 - t,
                fontSize: i * (1 - t) + "px"
              });
            },
            900,
            p.animationFunc,
            function() {
              k(this).remove();
            }
          ),
          t.html(o).animate(
            function(e, t) {
              k(this).css({
                top: n * t - n + "px",
                opacity: t,
                fontSize: i * t + "px"
              });
            },
            900,
            p.animationFunc
          );
      }
      var s,
        a,
        o,
        r,
        l,
        c,
        d,
        h,
        u = this.element,
        p = this.options;
      for (
        1 === (t = "" + t).length && (t = "0" + t),
          l = t.length,
          a = (s = u.find("." + e + " .digit:not(-old-digit)")).length,
          c = 0;
        c < l;
        c++
      )
        if (
          ((r = s.eq(a - 1).find(".digit-value")),
          (o = Math.floor(parseInt(t) / Math.pow(10, c)) % 10),
          parseInt(r.text()) !== o)
        ) {
          switch (("" + p.animate).toLowerCase()) {
            case "slide":
              n(r);
              break;
            case "fade":
              (h = void 0),
                (d = r).siblings(".-old-digit").remove(),
                (h = d.clone().appendTo(d.parent())).css({ opacity: 0 }),
                d.addClass("-old-digit").animate(
                  function(e, t) {
                    k(this).css({ opacity: 1 - t });
                  },
                  450,
                  p.animationFunc,
                  function() {
                    k(this).remove();
                  }
                ),
                h.html(o).animate(
                  function(e, t) {
                    k(this).css({ opacity: t });
                  },
                  900,
                  p.animationFunc
                );
              break;
            case "zoom":
              i(r);
              break;
            default:
              r.html(o);
          }
          a--;
        }
    },
    start: function() {
      var e = this,
        t = this.element;
      !1 !== t.data("paused") &&
        (clearInterval(this.blinkInterval),
        clearInterval(this.tickInterval),
        t.data("paused", !1),
        this._setBreakpoint(),
        this.tick(),
        (this.blinkInterval = setInterval(function() {
          e.blink();
        }, 500)),
        (this.tickInterval = setInterval(function() {
          e.tick();
        }, 1e3)));
    },
    stop: function() {
      var e = this.element;
      clearInterval(this.blinkInterval),
        clearInterval(this.tickInterval),
        e.data("paused", !0),
        e.find(".digit").html("0"),
        (this.current = { d: 0, h: 0, m: 0, s: 0 });
    },
    pause: function() {
      clearInterval(this.blinkInterval),
        clearInterval(this.tickInterval),
        this.element.data("paused", !0);
    },
    resume: function() {
      var e = this;
      this.element.data("paused", !1),
        (this.blinkInterval = setInterval(function() {
          e.blink();
        }, 500)),
        (this.tickInterval = setInterval(function() {
          e.tick();
        }, 1e3));
    },
    reset: function() {
      var e = this,
        t = this.element,
        n = this.options;
      clearInterval(this.blinkInterval),
        clearInterval(this.tickInterval),
        t.find(".part").removeClass(n.clsZero),
        t.find(".digit").html("0"),
        this._setBreakpoint(),
        t.data("paused", !1),
        this.tick(),
        (this.blinkInterval = setInterval(function() {
          e.blink();
        }, 500)),
        (this.tickInterval = setInterval(function() {
          e.tick();
        }, 1e3));
    },
    togglePlay: function() {
      !0 === this.element.attr("data-pause") ? this.pause() : this.start();
    },
    isPaused: function() {
      return this.element.data("paused");
    },
    getBreakpoint: function(e) {
      return !0 === e ? new Date(this.breakpoint) : this.breakpoint;
    },
    getLeft: function() {
      var e = new Date().getTime(),
        t = Math.floor(this.breakpoint - e);
      return {
        days: Math.round(t / 864e5),
        hours: Math.round(t / 36e5),
        minutes: Math.round(t / 6e4),
        seconds: Math.round(t / 1e3)
      };
    },
    i18n: function(e) {
      var t = this,
        n = this.element,
        i = this.options;
      return void 0 === e
        ? i.locale
        : void 0 !== C.locales[e] &&
            ((i.locale = e),
            (this.locale = C.locales[i.locale]),
            void k.each(["days", "hours", "minutes", "seconds"], function() {
              var e = ".part." + this;
              n.find(e).attr("data-label", t.locale.calendar.time[this]);
            }));
    },
    changeAttrLocale: function() {
      var e = this.element.attr("data-locale");
      this.i18n(e);
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-pause":
          this.togglePlay();
          break;
        case "data-locale":
          this.changeAttrLocale();
      }
    },
    destroy: function() {
      return (
        clearInterval(this.blinkInterval),
        clearInterval(this.tickInterval),
        k(document).off("visibilitychange", { ns: element.attr("id") }),
        this.element
      );
    }
  };
  C.plugin("countdown", ve);
  var ge = {
    delay: 10,
    step: 1,
    value: 0,
    timeout: null,
    delimiter: ",",
    onStart: C.noop,
    onStop: C.noop,
    onTick: C.noop,
    onCounterCreate: C.noop
  };
  (C.counterSetup = function(e) {
    ge = k.extend({}, ge, e);
  }),
    window.metroCounterSetup,
    C.counterSetup(window.metroCounterSetup);
  var Ce = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ge, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.numbers = []),
        (this.html = this.element.html()),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this,
        t = this.element,
        n = this.options;
      C.checkRuntime(t, "counter"),
        this._calcArray(),
        H.exec(n.onCounterCreate, [t], this.elem),
        t.fire("countercreate"),
        null !== n.timeout &&
          H.isInt(n.timeout) &&
          setTimeout(function() {
            e.start();
          }, n.timeout);
    },
    _calcArray: function() {
      var e,
        t = this.options;
      for (this.numbers = [], e = 0; e <= t.value; e += t.step)
        this.numbers.push(e);
      this.numbers[this.numbers.length - 1] !== t.value &&
        this.numbers.push(t.value);
    },
    start: function() {
      var t = this,
        n = this.element,
        i = this.options,
        s = function() {
          if (0 === t.numbers.length)
            return H.exec(i.onStop, [n], n[0]), void n.fire("stop");
          var e = t.numbers.shift();
          H.exec(i.onTick, [e, n], n[0]),
            n.fire("tick"),
            n.html(Number(e).format(0, 0, i.delimiter)),
            0 < t.numbers.length
              ? setTimeout(s, i.delay)
              : (H.exec(i.onStop, [n], n[0]), n.fire("stop"));
        };
      H.exec(i.onStart, [n], n[0]), n.fire("start"), setTimeout(s, i.delay);
    },
    reset: function() {
      this._calcArray(), this.element.html(this.html);
    },
    setValueAttribute: function() {
      (this.options.value = this.element.attr("data-value")), this._calcArray();
    },
    changeAttribute: function(e) {
      "data-value" === e && this.setValueAttribute();
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("counter", Ce);
  var be = {
    rules: null,
    color: null,
    flashColor: null,
    flashInterval: 1e3,
    numbers: !1,
    offBefore: !0,
    attenuation: 0.3,
    stopOnBlur: !1,
    cells: 4,
    margin: 8,
    showAxis: !1,
    axisStyle: "arrow",
    cellClick: !1,
    autoRestart: 5e3,
    clsCube: "",
    clsCell: "",
    clsSide: "",
    clsSideLeft: "",
    clsSideRight: "",
    clsSideTop: "",
    clsSideLeftCell: "",
    clsSideRightCell: "",
    clsSideTopCell: "",
    clsAxis: "",
    clsAxisX: "",
    clsAxisY: "",
    clsAxisZ: "",
    custom: C.noop,
    onTick: C.noop,
    onCubeCreate: C.noop
  };
  (C.cubeSetup = function(e) {
    be = k.extend({}, be, e);
  }),
    window.metroCubeSetup,
    C.cubeSetup(window.metroCubeSetup);
  var we = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, be, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.id = null),
        (this.rules = null),
        (this.interval = !1),
        (this.ruleInterval = !1),
        (this.running = !1),
        (this.intervals = []),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    default_rules: [
      {
        on: { top: [16], left: [4], right: [1] },
        off: { top: [13, 4], left: [1, 16], right: [13, 4] }
      },
      {
        on: { top: [12, 15], left: [3, 8], right: [2, 5] },
        off: { top: [9, 6, 3], left: [5, 10, 15], right: [14, 11, 8] }
      },
      {
        on: { top: [11], left: [7], right: [6] },
        off: { top: [1, 2, 5], left: [9, 13, 14], right: [15, 12, 16] }
      },
      {
        on: { top: [8, 14], left: [2, 12], right: [9, 3] },
        off: { top: [16], left: [4], right: [1] }
      },
      {
        on: { top: [10, 7], left: [6, 11], right: [10, 7] },
        off: { top: [12, 15], left: [3, 8], right: [2, 5] }
      },
      {
        on: { top: [13, 4], left: [1, 16], right: [13, 4] },
        off: { top: [11], left: [7], right: [6] }
      },
      {
        on: { top: [9, 6, 3], left: [5, 10, 15], right: [14, 11, 8] },
        off: { top: [8, 14], left: [2, 12], right: [9, 3] }
      },
      {
        on: { top: [1, 2, 5], left: [9, 13, 14], right: [15, 12, 16] },
        off: { top: [10, 7], left: [6, 11], right: [10, 7] }
      }
    ],
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "cube"),
        null === t.rules
          ? (this.rules = this.default_rules)
          : this._parseRules(t.rules),
        this._createCube(),
        this._createEvents(),
        H.exec(t.onCubeCreate, [e]),
        e.fire("cubecreate");
    },
    _parseRules: function(e) {
      if (null == e) return !1;
      if (H.isObject(e)) return (this.rules = H.isObject(e)), !0;
      try {
        return (this.rules = JSON.parse(e)), !0;
      } catch (e) {
        return console.log("Unknown or empty rules for cell flashing!"), !1;
      }
    },
    _createCube: function() {
      var i = this.element,
        s = this.options,
        e = H.elementId("cube"),
        a = Math.pow(s.cells, 2);
      i.addClass("cube").addClass(s.clsCube),
        i.attr("id") || i.attr("id", e),
        (this.id = i.attr("id")),
        this._createCssForFlashColor(),
        this._createCssForCellSize(),
        k.each(["left", "right", "top"], function() {
          var e, t, n;
          for (
            e = k("<div>")
              .addClass("side " + this + "-side")
              .addClass(s.clsSide)
              .appendTo(i),
              "left" === this && e.addClass(s.clsSideLeft),
              "right" === this && e.addClass(s.clsSideRight),
              "top" === this && e.addClass(s.clsSideTop),
              n = 0;
            n < a;
            n++
          )
            (t = k("<div>")
              .addClass("cube-cell")
              .addClass("cell-id-" + (n + 1))
              .addClass(s.clsCell))
              .data("id", n + 1)
              .data("side", this),
              t.appendTo(e),
              !0 === s.numbers && t.html(n + 1);
        });
      var t = i.find(".cube-cell");
      null !== s.color &&
        (H.isColor(s.color)
          ? t.css({ backgroundColor: s.color, borderColor: s.color })
          : t.addClass(s.color));
      k.each(["x", "y", "z"], function() {
        var e = k("<div>")
          .addClass("axis " + s.axisStyle)
          .addClass("axis-" + this)
          .addClass(s.clsAxis);
        "x" === this && e.addClass(s.clsAxisX),
          "y" === this && e.addClass(s.clsAxisY),
          "z" === this && e.addClass(s.clsAxisZ),
          e.appendTo(i);
      }),
        !1 === s.showAxis && i.find(".axis").hide(),
        this._run();
    },
    _run: function() {
      var e = this,
        t = this.element,
        n = this.options,
        i = 0;
      clearInterval(this.interval),
        t.find(".cube-cell").removeClass("light"),
        n.custom !== C.noop
          ? H.exec(n.custom, [t])
          : (t.find(".cube-cell").removeClass("light"),
            e._start(),
            (i = H.isObject(this.rules) ? H.objectLength(this.rules) : 0),
            (this.interval = setInterval(function() {
              e._start();
            }, i * n.flashInterval)));
    },
    _createCssForCellSize: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = C.sheet;
      (8 === i.margin && 4 === i.cells) ||
        ((e = parseInt(H.getStyleOne(n, "width"))),
        (t = Math.ceil((e / 2 - i.margin * i.cells * 2) / i.cells)),
        H.addCssRule(
          s,
          "#" + n.attr("id") + " .side .cube-cell",
          "width: " +
            t +
            "px!important; height: " +
            t +
            "px!important; margin: " +
            i.margin +
            "px!important;"
        ));
    },
    _createCssForFlashColor: function() {
      var e,
        t,
        n,
        i = this.element,
        s = this.options,
        a = C.sheet,
        o = [],
        r = [];
      if (null !== s.flashColor) {
        for (
          e = "0 0 10px " + H.hexColorToRgbA(s.flashColor, 1),
            t = "0 0 10px " + H.hexColorToRgbA(s.flashColor, s.attenuation),
            n = 0;
          n < 3;
          n++
        )
          o.push(e), r.push(t);
        H.addCssRule(
          a,
          "@keyframes pulsar-cell-" + i.attr("id"),
          "0%, 100% { box-shadow: " +
            o.join(",") +
            "} 50% { box-shadow: " +
            r.join(",") +
            " }"
        ),
          H.addCssRule(
            a,
            "#" + i.attr("id") + " .side .cube-cell.light",
            "animation: pulsar-cell-" +
              i.attr("id") +
              " 2.5s 0s ease-out infinite; background-color: " +
              s.flashColor +
              "!important; border-color: " +
              s.flashColor +
              "!important;"
          );
      }
    },
    _createEvents: function() {
      var e = this,
        t = this.element,
        n = this.options;
      k(window).on(
        C.events.blur,
        function() {
          !0 === n.stopOnBlur && !0 === e.running && e._stop();
        },
        { ns: t.attr("id") }
      ),
        k(window).on(
          C.events.focus,
          function() {
            !0 === n.stopOnBlur && !1 === e.running && e._start();
          },
          { ns: t.attr("id") }
        ),
        t.on(C.events.click, ".cube-cell", function() {
          !0 === n.cellClick && k(this).toggleClass("light");
        });
    },
    _start: function() {
      var n = this;
      this.element.find(".cube-cell").removeClass("light"),
        (this.running = !0),
        k.each(this.rules, function(e, t) {
          n._execRule(e, t);
        });
    },
    _stop: function() {
      (this.running = !1),
        clearInterval(this.interval),
        k.each(this.intervals, function() {
          clearInterval(this);
        });
    },
    _tick: function(e, t) {
      var n = this,
        i = this.element,
        s = this.options;
      void 0 === t && (t = s.flashInterval * e);
      var a = setTimeout(function() {
        H.exec(s.onTick, [e], i[0]),
          i.fire("tick", { index: e }),
          clearInterval(a),
          H.arrayDelete(n.intervals, a);
      }, t);
      this.intervals.push(a);
    },
    _toggle: function(e, t, n, i) {
      var s = this;
      void 0 === i && (i = this.options.flashInterval * n);
      var a = setTimeout(function() {
        e["on" === t ? "addClass" : "removeClass"]("light"),
          clearInterval(a),
          H.arrayDelete(s.intervals, a);
      }, i);
      this.intervals.push(a);
    },
    start: function() {
      this._start();
    },
    stop: function() {
      this._stop();
    },
    toRule: function(e, t) {
      var n = this,
        i = this.element,
        s = this.options,
        a = this.rules;
      if (null != a && void 0 !== a[e]) {
        clearInterval(this.ruleInterval),
          (this.ruleInterval = !1),
          this.stop(),
          i.find(".cube-cell").removeClass("light");
        for (var o = 0; o <= e; o++) this._execRule(o, a[o], t);
        H.isInt(s.autoRestart) &&
          0 < s.autoRestart &&
          (this.ruleInterval = setTimeout(function() {
            n._run();
          }, s.autoRestart));
      }
    },
    _execRule: function(i, s, a) {
      var o = this,
        r = this.element;
      this._tick(i, a),
        k.each(["left", "right", "top"], function() {
          var t = "." + this + "-side",
            e = void 0 !== s.on && void 0 !== s.on[this] && s.on[this],
            n = void 0 !== s.off && void 0 !== s.off[this] && s.off[this];
          !1 !== e &&
            k.each(e, function() {
              var e = r.find(t + " .cell-id-" + this);
              o._toggle(e, "on", i, a);
            }),
            !1 !== n &&
              k.each(n, function() {
                var e = r.find(t + " .cell-id-" + this);
                o._toggle(e, "off", i, a);
              });
        });
    },
    rule: function(e) {
      if (void 0 === e) return this.rules;
      !0 === this._parseRules(e) &&
        ((this.options.rules = e),
        this.stop(),
        this.element.find(".cube-cell").removeClass("light"),
        this._run());
    },
    axis: function(e) {
      var t = !0 === e ? "show" : "hide";
      this.element.find(".axis")[t]();
    },
    changeRules: function() {
      var e = this.element,
        t = this.options,
        n = e.attr("data-rules");
      !0 === this._parseRules(n) &&
        (this.stop(),
        e.find(".cube-cell").removeClass("light"),
        (t.rules = n),
        this._run());
    },
    changeAxisVisibility: function() {
      var e = this.element,
        t = !0 === JSON.parse(e.attr("data-show-axis")) ? "show" : "hide";
      e.find(".axis")[t]();
    },
    changeAxisStyle: function() {
      var e = this.element,
        t = e.attr("data-axis-style");
      e.find(".axis")
        .removeClass("arrow line no-style")
        .addClass(t);
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-rules":
          this.changeRules();
          break;
        case "data-show-axis":
          this.changeAxisVisibility();
          break;
        case "data-axis-style":
          this.changeAxisStyle();
      }
    },
    destroy: function() {
      var e = this.element;
      return (
        clearInterval(this.interval),
        (this.interval = null),
        k(window).off(C.events.blur, { ns: e.attr("id") }),
        k(window).off(C.events.focus, { ns: e.attr("id") }),
        e.off(C.events.click, ".cube-cell"),
        e
      );
    }
  };
  C.plugin("cube", we);
  var ye = {
    gmt: 0,
    format: "%Y-%m-%d",
    inputFormat: null,
    locale: METRO_LOCALE,
    value: null,
    distance: 3,
    month: !0,
    day: !0,
    year: !0,
    minYear: null,
    maxYear: null,
    scrollSpeed: 4,
    copyInlineStyles: !0,
    clsPicker: "",
    clsPart: "",
    clsMonth: "",
    clsDay: "",
    clsYear: "",
    okButtonIcon: "<span class='default-icon-check'></span>",
    cancelButtonIcon: "<span class='default-icon-cross'></span>",
    onSet: C.noop,
    onOpen: C.noop,
    onClose: C.noop,
    onScroll: C.noop,
    onDatePickerCreate: C.noop
  };
  (C.datePickerSetup = function(e) {
    ye = k.extend({}, ye, e);
  }),
    window.metroDatePickerSetup,
    C.datePickerSetup(window.metroDatePickerSetup);
  var xe = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ye, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.picker = null),
        (this.isOpen = !1),
        (this.value = new Date()),
        (this.locale = C.locales[this.options.locale].calendar),
        (this.offset = new Date().getTimezoneOffset() / 60 + 1),
        (this.listTimer = { day: null, month: null, year: null }),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "datepicker"),
        t.distance < 1 && (t.distance = 1),
        H.isValue(e.val()) && (t.value = e.val()),
        H.isValue(t.value) &&
          (H.isValue(t.inputFormat)
            ? (this.value = ("" + t.value).toDate(t.inputFormat))
            : H.isDate(t.value) && (this.value = new Date(t.value))),
        void 0 === C.locales[t.locale] && (t.locale = METRO_LOCALE),
        (this.locale = C.locales[t.locale].calendar),
        null === t.minYear && (t.minYear = new Date().getFullYear() - 100),
        null === t.maxYear && (t.maxYear = new Date().getFullYear() + 100),
        this._createStructure(),
        this._createEvents(),
        this._set(),
        H.exec(t.onDatePickerCreate, [e]),
        e.fire("datepickercreate");
    },
    _createStructure: function() {
      var e,
        t,
        n,
        i,
        s,
        a,
        o,
        r,
        l,
        c,
        d = this.element,
        h = this.options,
        u = d.prev(),
        p = d.parent(),
        f = H.elementId("datepicker");
      if (
        ((e = k("<div>")
          .attr("id", f)
          .addClass("wheel-picker date-picker " + d[0].className)
          .addClass(h.clsPicker)),
        0 === u.length ? p.prepend(e) : e.insertAfter(u),
        d.appendTo(e),
        (o = k("<div>")
          .addClass("date-wrapper")
          .appendTo(e)),
        !0 === h.month &&
          (t = k("<div>")
            .addClass("month")
            .addClass(h.clsPart)
            .addClass(h.clsMonth)
            .appendTo(o)),
        !0 === h.day &&
          (n = k("<div>")
            .addClass("day")
            .addClass(h.clsPart)
            .addClass(h.clsDay)
            .appendTo(o)),
        !0 === h.year &&
          (i = k("<div>")
            .addClass("year")
            .addClass(h.clsPart)
            .addClass(h.clsYear)
            .appendTo(o)),
        (r = k("<div>")
          .addClass("select-wrapper")
          .appendTo(e)),
        (l = k("<div>")
          .addClass("select-block")
          .appendTo(r)),
        !0 === h.month)
      ) {
        for (
          t = k("<ul>")
            .addClass("sel-month")
            .appendTo(l),
            s = 0;
          s < h.distance;
          s++
        )
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(t);
        for (s = 0; s < 12; s++)
          k("<li>")
            .addClass(
              "js-month-" +
                s +
                " js-month-real-" +
                this.locale.months[s].toLowerCase()
            )
            .html(this.locale.months[s])
            .data("value", s)
            .appendTo(t);
        for (s = 0; s < h.distance; s++)
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(t);
      }
      if (!0 === h.day) {
        for (
          n = k("<ul>")
            .addClass("sel-day")
            .appendTo(l),
            s = 0;
          s < h.distance;
          s++
        )
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(n);
        for (s = 0; s < 31; s++)
          k("<li>")
            .addClass("js-day-" + s + " js-day-real-" + (s + 1))
            .html(s + 1)
            .data("value", s + 1)
            .appendTo(n);
        for (s = 0; s < h.distance; s++)
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(n);
      }
      if (!0 === h.year) {
        for (
          i = k("<ul>")
            .addClass("sel-year")
            .appendTo(l),
            s = 0;
          s < h.distance;
          s++
        )
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(i);
        for (s = h.minYear, a = 0; s <= h.maxYear; s++, a++)
          k("<li>")
            .addClass("js-year-" + a + " js-year-real-" + s)
            .html(s)
            .data("value", s)
            .appendTo(i);
        for (s = 0; s < h.distance; s++)
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(i);
      }
      if (
        (l.height(40 * (2 * h.distance + 1)),
        (c = k("<div>")
          .addClass("action-block")
          .appendTo(r)),
        k("<button>")
          .attr("type", "button")
          .addClass("button action-ok")
          .html(h.okButtonIcon)
          .appendTo(c),
        k("<button>")
          .attr("type", "button")
          .addClass("button action-cancel")
          .html(h.cancelButtonIcon)
          .appendTo(c),
        !(d[0].className = "") === h.copyInlineStyles)
      )
        for (s = 0; s < d[0].style.length; s++)
          e.css(d[0].style[s], d.css(d[0].style[s]));
      this.picker = e;
    },
    _createEvents: function() {
      var r = this,
        a = this.options,
        l = this.picker;
      l.on(C.events.start, ".select-block ul", function(e) {
        if (!e.changedTouches) {
          var t = this,
            n = H.pageXY(e).y;
          k(document).on(
            C.events.move,
            function(e) {
              (t.scrollTop -= a.scrollSpeed * (n > H.pageXY(e).y ? -1 : 1)),
                (n = H.pageXY(e).y);
            },
            { ns: l.attr("id") }
          ),
            k(document).on(
              C.events.stop,
              function() {
                k(document).off(C.events.move, { ns: l.attr("id") }),
                  k(document).off(C.events.stop, { ns: l.attr("id") });
              },
              { ns: l.attr("id") }
            );
        }
      }),
        l.on(C.events.click, function(e) {
          !1 === r.isOpen && r.open(), e.stopPropagation();
        }),
        l.on(C.events.click, ".action-ok", function(e) {
          var t,
            n,
            i,
            s = l.find(".sel-month li.active"),
            a = l.find(".sel-day li.active"),
            o = l.find(".sel-year li.active");
          (t = 0 === s.length ? r.value.getMonth() : s.data("value")),
            (n = 0 === a.length ? r.value.getDate() : a.data("value")),
            (i = 0 === o.length ? r.value.getFullYear() : o.data("value")),
            (r.value = new Date(i, t, n)),
            r._correct(),
            r._set(),
            r.close(),
            e.stopPropagation();
        }),
        l.on(C.events.click, ".action-cancel", function(e) {
          r.close(), e.stopPropagation();
        });
      k.each(["month", "day", "year"], function() {
        var i = this,
          s = l.find(".sel-" + i);
        s.on("scroll", function() {
          r.isOpen &&
            (r.listTimer[i] &&
              (clearTimeout(r.listTimer[i]), (r.listTimer[i] = null)),
            r.listTimer[i] ||
              (r.listTimer[i] = setTimeout(function() {
                var e, t, n;
                (r.listTimer[i] = null),
                  (e = Math.round(Math.ceil(s.scrollTop()) / 40)),
                  (n =
                    (t = s.find(".js-" + i + "-" + e)).position().top -
                    40 * a.distance),
                  s.find(".active").removeClass("active"),
                  (s[0].scrollTop = n),
                  t.addClass("active"),
                  H.exec(a.onScroll, [t, s, l], s[0]);
              }, 150)));
        });
      });
    },
    _correct: function() {
      var e = this.value.getMonth(),
        t = this.value.getDate(),
        n = this.value.getFullYear();
      this.value = new Date(n, e, t);
    },
    _set: function() {
      var e = this.element,
        t = this.options,
        n = this.picker,
        i = this.locale.months[this.value.getMonth()],
        s = this.value.getDate(),
        a = this.value.getFullYear();
      !0 === t.month && n.find(".month").html(i),
        !0 === t.day && n.find(".day").html(s),
        !0 === t.year && n.find(".year").html(a),
        e.val(this.value.format(t.format, t.locale)).trigger("change"),
        H.exec(t.onSet, [this.value, e.val(), e, n], e[0]),
        e.fire("set", { value: this.value });
    },
    open: function() {
      var e,
        t,
        n,
        i,
        s,
        a = this.element,
        o = this.options,
        r = this.picker,
        l = this.value.getMonth(),
        c = this.value.getDate() - 1,
        d = this.value.getFullYear(),
        h = r.find(".select-wrapper");
      h.parent().removeClass("for-top for-bottom"),
        h.show(0),
        r.find("li").removeClass("active"),
        (i = H.inViewport(h[0])),
        (s = H.rect(h[0])),
        !i && 0 < s.top && h.parent().addClass("for-bottom"),
        !i && s.top < 0 && h.parent().addClass("for-top"),
        !0 === o.month &&
          (e = r.find(".sel-month")).scrollTop(0).animate(
            {
              scrollTop:
                e
                  .find("li.js-month-" + l)
                  .addClass("active")
                  .position().top -
                40 * o.distance
            },
            100
          ),
        !0 === o.day &&
          (t = r.find(".sel-day")).scrollTop(0).animate(
            {
              scrollTop:
                t
                  .find("li.js-day-" + c)
                  .addClass("active")
                  .position().top -
                40 * o.distance
            },
            100
          ),
        !0 === o.year &&
          (n = r.find(".sel-year")).scrollTop(0).animate(
            {
              scrollTop:
                n
                  .find("li.js-year-real-" + d)
                  .addClass("active")
                  .position().top -
                40 * o.distance
            },
            100
          ),
        (this.isOpen = !0),
        H.exec(o.onOpen, [this.value, a, r], a[0]),
        a.fire("open", { value: this.value });
    },
    close: function() {
      var e = this.picker,
        t = this.options,
        n = this.element;
      e.find(".select-wrapper").hide(0),
        (this.isOpen = !1),
        H.exec(t.onClose, [this.value, n, e], n[0]),
        n.fire("close", { value: this.value });
    },
    val: function(e) {
      var t = this.options;
      if (!H.isValue(e)) return this.element.val();
      H.isValue(t.inputFormat)
        ? (this.value = ("" + e).toDate(t.inputFormat))
        : (this.value = new Date(e)),
        this._set();
    },
    date: function(e) {
      if (void 0 === e) return this.value;
      try {
        (this.value = new Date(e.format("%Y-%m-%d"))), this._set();
      } catch (e) {
        return !1;
      }
    },
    i18n: function(e) {
      var t,
        n,
        i = this.element,
        s = this.options;
      if (
        ((s.locale = e || i.attr("data-locale")),
        (this.locale = C.locales[s.locale].calendar),
        !0 === s.month)
      ) {
        for (
          t = i
            .closest(".date-picker")
            .find(".sel-month")
            .html(""),
            n = 0;
          n < s.distance;
          n++
        )
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(t);
        for (n = 0; n < 12; n++)
          k("<li>")
            .addClass(
              "js-month-" +
                n +
                " js-month-real-" +
                this.locale.months[n].toLowerCase()
            )
            .html(this.locale.months[n])
            .data("value", n)
            .appendTo(t);
        for (n = 0; n < s.distance; n++)
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(t);
      }
      this._set();
    },
    changeAttribute: function(e) {
      var t = this;
      switch (e) {
        case "data-value":
          t.val(t.element.attr("data-value"));
          break;
        case "data-locale":
          t.i18n(t.element.attr("data-locale"));
          break;
        case "data-format":
          (t.options.format = t.element.attr("data-format")), t._set();
      }
    },
    destroy: function() {
      var e = this.element,
        t = this.picker;
      return (
        k.each(["moth", "day", "year"], function() {
          t.find(".sel-" + this).off("scroll");
        }),
        t.off(C.events.start, ".select-block ul"),
        t.off(C.events.click),
        t.off(C.events.click, ".action-ok"),
        t.off(C.events.click, ".action-cancel"),
        e
      );
    }
  };
  C.plugin("datepicker", xe),
    k(document).on(C.events.click, function() {
      k.each(k(".date-picker"), function() {
        k(this)
          .find("input")
          .each(function() {
            C.getPlugin(this, "datepicker").close();
          });
      });
    });
  var Se = {
    closeButton: !1,
    leaveOverlayOnClose: !1,
    toTop: !1,
    toBottom: !1,
    locale: METRO_LOCALE,
    title: "",
    content: "",
    actions: {},
    actionsAlign: "right",
    defaultAction: !0,
    overlay: !0,
    overlayColor: "#000000",
    overlayAlpha: 0.5,
    overlayClickClose: !1,
    width: "480",
    height: "auto",
    shadow: !0,
    closeAction: !0,
    clsDialog: "",
    clsTitle: "",
    clsContent: "",
    clsAction: "",
    clsDefaultAction: "",
    clsOverlay: "",
    autoHide: 0,
    removeOnClose: !1,
    show: !1,
    _runtime: !1,
    onShow: C.noop,
    onHide: C.noop,
    onOpen: C.noop,
    onClose: C.noop,
    onDialogCreate: C.noop
  };
  (C.dialogSetup = function(e) {
    Se = k.extend({}, Se, e);
  }),
    window.metroDialogSetup,
    C.dialogSetup(window.metroDialogSetup);
  var Te = {
    _counter: 0,
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Se, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.interval = null),
        (this.overlay = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      (this.locale =
        void 0 !== C.locales[t.locale]
          ? C.locales[t.locale]
          : C.locales["en-US"]),
        C.checkRuntime(e, "dialog"),
        this._build();
    },
    _build: function() {
      var e,
        t = this,
        n = this.element,
        i = this.options,
        s = k("body");
      if (
        (n.addClass("dialog"),
        !0 === i.shadow && n.addClass("shadow-on"),
        void 0 === n.attr("id") && n.attr("id", H.elementId("dialog")),
        "" !== i.title && this.setTitle(i.title),
        "" !== i.content && this.setContent(i.content),
        !0 === i.defaultAction ||
          (!1 !== i.actions &&
            "object" == typeof i.actions &&
            0 < H.objectLength(i.actions)))
      ) {
        var a,
          o = n.find(".dialog-actions");
        0 === o.length &&
          (o = k("<div>")
            .addClass("dialog-actions")
            .addClass("text-" + i.actionsAlign)
            .appendTo(n)),
          !0 === i.defaultAction &&
            0 === H.objectLength(i.actions) &&
            0 === n.find(".dialog-actions > *").length &&
            (a = k("<button>")
              .addClass("button js-dialog-close")
              .addClass(i.clsDefaultAction)
              .html(this.locale.buttons.ok)).appendTo(o),
          H.isObject(i.actions) &&
            k.each(H.isObject(i.actions), function() {
              var e = this;
              (a = k("<button>")
                .addClass("button")
                .addClass(e.cls)
                .html(e.caption)),
                void 0 !== e.onclick &&
                  a.on(C.events.click, function() {
                    H.exec(e.onclick, [n]);
                  }),
                a.appendTo(o);
            });
      }
      !0 === i.overlay && ((e = this._overlay()), (this.overlay = e)),
        !0 === i.closeAction &&
          n.on(C.events.click, ".js-dialog-close", function() {
            t.close();
          });
      var r = n.find("closer");
      0 === r.length &&
        (r = k("<span>").addClass(
          "button square closer js-dialog-close"
        )).appendTo(n),
        !0 !== i.closeButton && r.hide(),
        n.css({
          width: i.width,
          height: i.height,
          visibility: "hidden",
          top: "100%",
          left: (k(window).width() - n.outerWidth()) / 2
        }),
        n.addClass(i.clsDialog),
        n.find(".dialog-title").addClass(i.clsTitle),
        n.find(".dialog-content").addClass(i.clsContent),
        n.find(".dialog-actions").addClass(i.clsAction),
        n.appendTo(s),
        i.show && this.open(),
        k(window).on(
          C.events.resize,
          function() {
            t.setPosition();
          },
          { ns: n.attr("id") }
        ),
        H.exec(this.options.onDialogCreate, [this.element]),
        n.fire("dialogcreate");
    },
    _overlay: function() {
      var e = this.options,
        t = k("<div>");
      return (
        t.addClass("overlay").addClass(e.clsOverlay),
        "transparent" === e.overlayColor
          ? t.addClass("transparent")
          : t.css({ background: H.hex2rgba(e.overlayColor, e.overlayAlpha) }),
        t
      );
    },
    hide: function(e) {
      var t = this.element,
        n = this.options,
        i = 0;
      n.onHide !== C.noop &&
        ((i = 500), H.exec(n.onHide, null, t[0]), t.fire("hide")),
        setTimeout(function() {
          H.callback(e), t.css({ visibility: "hidden", top: "100%" });
        }, i);
    },
    show: function(e) {
      var t = this.element,
        n = this.options;
      this.setPosition(),
        t.css({ visibility: "visible" }),
        H.exec(n.onShow, [this], t[0]),
        t.fire("show"),
        H.callback(e);
    },
    setPosition: function() {
      var e,
        t,
        n = this.element,
        i = this.options;
      !0 !== i.toTop && !0 !== i.toBottom
        ? ((e = (k(window).height() - n.outerHeight()) / 2) < 0 && (e = 0),
          (t = "auto"))
        : (!0 === i.toTop && ((e = 0), (t = "auto")),
          !0 !== i.toTop && !0 === i.toBottom && ((t = 0), (e = "auto"))),
        n.css({
          top: e,
          bottom: t,
          left: (k(window).width() - n.outerWidth()) / 2
        });
    },
    setContent: function(e) {
      var t = this.element,
        n = t.find(".dialog-content");
      0 === n.length && (n = k("<div>").addClass("dialog-content")).appendTo(t),
        !H.isQ(e) && H.isFunc(e) && (e = H.exec(e)),
        H.isQ(e) ? e.appendTo(n) : n.html(e);
    },
    setTitle: function(e) {
      var t = this.element,
        n = t.find(".dialog-title");
      0 === n.length && (n = k("<div>").addClass("dialog-title")).appendTo(t),
        n.html(e);
    },
    close: function() {
      var e = this.element,
        t = this.options;
      H.bool(t.leaveOverlayOnClose) ||
        k("body")
          .find(".overlay")
          .remove(),
        this.hide(function() {
          e.data("open", !1),
            H.exec(t.onClose, [e], e[0]),
            e.fire("close"),
            !0 === t.removeOnClose && e.remove();
        });
    },
    open: function() {
      var e = this,
        t = this.element,
        n = this.options;
      !0 === n.overlay &&
        0 === k(".overlay").length &&
        (this.overlay.appendTo(k("body")),
        !0 === n.overlayClickClose &&
          this.overlay.on(C.events.click, function() {
            e.close();
          })),
        this.show(function() {
          H.exec(n.onOpen, [t], t[0]),
            t.fire("open"),
            t.data("open", !0),
            0 < parseInt(n.autoHide) &&
              setTimeout(function() {
                e.close();
              }, parseInt(n.autoHide));
        });
    },
    toggle: function() {
      this.element.data("open") ? this.close() : this.open();
    },
    isOpen: function() {
      return !0 === this.element.data("open");
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      this.options;
      return (
        e.off(C.events.click, ".js-dialog-close"),
        e.find(".button").off(C.events.click),
        k(window).off(C.events.resize, { ns: e.attr("id") }),
        e
      );
    }
  };
  C.plugin("dialog", Te);
  var ke = {
    size: 100,
    radius: 50,
    hole: 0.8,
    value: 0,
    background: "#ffffff",
    color: "",
    stroke: "#d1d8e7",
    fill: "#49649f",
    fontSize: 24,
    total: 100,
    cap: "%",
    showText: !0,
    showValue: !(C.dialog = {
      isDialog: function(e) {
        return H.isMetroObject(e, "dialog");
      },
      open: function(e, t, n) {
        if (!this.isDialog(e)) return !1;
        var i = C.getPlugin(e, "dialog");
        void 0 !== n && i.setTitle(n),
          void 0 !== t && i.setContent(t),
          i.open();
      },
      close: function(e) {
        if (!this.isDialog(e)) return !1;
        C.getPlugin(k(e)[0], "dialog").close();
      },
      toggle: function(e) {
        if (!this.isDialog(e)) return !1;
        C.getPlugin(k(e)[0], "dialog").toggle();
      },
      isOpen: function(e) {
        if (!this.isDialog(e)) return !1;
        C.getPlugin(k(e)[0], "dialog").isOpen();
      },
      remove: function(e) {
        if (!this.isDialog(e)) return !1;
        var t = C.getPlugin(k(e)[0], "dialog");
        (t.options.removeOnClose = !0), t.close();
      },
      create: function(e) {
        var t;
        t = k("<div>").appendTo(k("body"));
        var n = k.extend(
          {},
          { show: !0, closeAction: !0, removeOnClose: !0 },
          void 0 !== e ? e : {}
        );
        return (n._runtime = !0), t.dialog(n);
      }
    }),
    animate: 0,
    onChange: C.noop,
    onDonutCreate: C.noop
  };
  (C.donutSetup = function(e) {
    ke = k.extend({}, ke, e);
  }),
    window.metroDonutSetup,
    C.donutSetup(window.metroDonutSetup);
  var _e = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ke, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.value = 0),
        (this.animation_change_interval = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options,
        n = "",
        i = t.radius * (1 - (1 - t.hole) / 2),
        s = t.radius * (1 - t.hole),
        a = 2 * Math.PI * i,
        o = (t.value, t.total, "rotate(-90 " + t.radius + "," + t.radius + ")"),
        r = i * t.hole * 0.6;
      C.checkRuntime(e, "donut"),
        e.addClass("donut"),
        e.css({ width: t.size, height: t.size, background: t.background }),
        (n += "<svg>"),
        (n +=
          "   <circle class='donut-back' r='" +
          i +
          "px' cx='" +
          t.radius +
          "px' cy='" +
          t.radius +
          "px' transform='" +
          o +
          "' fill='none' stroke='" +
          t.stroke +
          "' stroke-width='" +
          s +
          "'/>"),
        (n +=
          "   <circle class='donut-fill' r='" +
          i +
          "px' cx='" +
          t.radius +
          "px' cy='" +
          t.radius +
          "px' transform='" +
          o +
          "' fill='none' stroke='" +
          t.fill +
          "' stroke-width='" +
          s +
          "'/>"),
        !0 === t.showText &&
          (n +=
            "   <text   class='donut-title' x='" +
            t.radius +
            "px' y='" +
            t.radius +
            "px' dy='" +
            r / 3 +
            "px' text-anchor='middle' fill='" +
            ("" !== t.color ? t.color : t.fill) +
            "' font-size='" +
            r +
            "px'>0" +
            t.cap +
            "</text>"),
        (n += "</svg>"),
        e.html(n),
        this.val(t.value),
        H.exec(t.onDonutCreate, null, e[0]),
        e.fire("donutcreate");
    },
    _setValue: function(e) {
      var t = this.element,
        n = this.options,
        i = t.find(".donut-fill"),
        s = t.find(".donut-title"),
        a = n.radius * (1 - (1 - n.hole) / 2),
        o = 2 * Math.PI * a,
        r = (n.showValue ? e : H.percent(n.total, e, !0)) + n.cap,
        l = (e * o) / n.total + " " + o;
      i.attr("stroke-dasharray", l), s.html(r);
    },
    val: function(e) {
      var t = this,
        n = this.element,
        i = this.options;
      if (void 0 === e) return this.value;
      if (parseInt(e) < 0 || parseInt(e) > i.total) return !1;
      if (0 < i.animate && !document.hidden) {
        var s = e > t.value,
          a = t.value + (s ? -1 : 1);
        clearInterval(t.animation_change_interval),
          (this.animation_change_interval = setInterval(function() {
            s
              ? (t._setValue(++a),
                e <= a && clearInterval(t.animation_change_interval))
              : (t._setValue(--a),
                a <= e && clearInterval(t.animation_change_interval));
          }, i.animate));
      } else clearInterval(t.animation_change_interval), this._setValue(e);
      (this.value = e),
        H.exec(i.onChange, [this.value], n[0]),
        n.fire("change", { value: this.value });
    },
    changeValue: function() {
      this.val(this.element.attr("data-value"));
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-value":
          this.changeValue();
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("donut", _e);
  var Oe = {
    dragElement: "self",
    dragArea: "parent",
    onCanDrag: C.noop_true,
    onDragStart: C.noop,
    onDragStop: C.noop,
    onDragMove: C.noop,
    onDraggableCreate: C.noop
  };
  (C.draggableSetup = function(e) {
    Oe = k.extend({}, Oe, e);
  }),
    window.metroDraggableSetup,
    C.draggableSetup(window.metroDraggableSetup);
  var Ie = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Oe, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.drag = !1),
        (this.move = !1),
        (this.backup = { cursor: "default", zIndex: "0" }),
        (this.dragArea = null),
        (this.dragElement = null),
        (this.id = H.elementId("draggable")),
        this._setOptionsFromDOM(),
        this._create(),
        H.exec(this.options.onDraggableCreate, [this.element]),
        this.element.fire("draggablecreate"),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      this._createStructure(), this._createEvents();
    },
    _createStructure: function() {
      var e = this,
        t = this.element,
        n = (this.elem, this.options),
        i = t.offset(),
        s = "self" !== n.dragElement ? t.find(n.dragElement) : t;
      C.checkRuntime(t, "draggable"),
        t.data("canDrag", !0),
        ((this.dragElement = s)[0].ondragstart = function() {
          return !1;
        }),
        t.css("position", "absolute"),
        ("document" !== n.dragArea && "window" !== n.dragArea) ||
          (n.dragArea = "body"),
        setImmediate(function() {
          (e.dragArea = "parent" === n.dragArea ? t.parent() : k(n.dragArea)),
            "parent" !== n.dragArea &&
              (t.appendTo(e.dragArea), t.css({ top: i.top, left: i.left }));
        }),
        t.attr("id") || t.attr("id", H.elementId("draggable"));
    },
    _createEvents: function() {
      var a = this,
        o = this.element,
        r = this.elem,
        l = this.options,
        c = { x: 0, y: 0 };
      this.dragElement.on(C.events.startAll, function(e) {
        function t(e) {
          var t = H.pageXY(e).y - s,
            n = H.pageXY(e).x - i;
          t < 0 && (t = 0),
            n < 0 && (n = 0),
            t > a.dragArea.outerHeight() - o.outerHeight() &&
              (t = a.dragArea.outerHeight() - o.outerHeight()),
            n > a.dragArea.outerWidth() - o.outerWidth() &&
              (n = a.dragArea.outerWidth() - o.outerWidth()),
            (c.y = t),
            (c.x = n),
            o.css({ left: n, top: t });
        }
        var n = "parent" !== l.dragArea ? o.offset() : o.position(),
          i = H.pageXY(e).x - n.left,
          s = H.pageXY(e).y - n.top;
        !1 !== o.data("canDrag") &&
          !0 === H.exec(l.onCanDrag, [o]) &&
          ((!1 == m && 1 !== e.which) ||
            ((a.drag = !0),
            (a.backup.cursor = o.css("cursor")),
            (a.backup.zIndex = o.css("z-index")),
            o.addClass("draggable"),
            t(e),
            H.exec(l.onDragStart, [c], o[0]),
            o.fire("dragstart", { position: c }),
            k(document).on(
              C.events.moveAll,
              function(e) {
                e.preventDefault(),
                  t(e),
                  H.exec(l.onDragMove, [c], r),
                  o.fire("dragmove", { position: c });
              },
              { ns: a.id }
            ),
            k(document).on(
              C.events.stopAll,
              function() {
                o
                  .css({ cursor: a.backup.cursor, zIndex: a.backup.zIndex })
                  .removeClass("draggable"),
                  a.drag &&
                    (k(document).off(C.events.moveAll, { ns: a.id }),
                    k(document).off(C.events.stopAll, { ns: a.id })),
                  (a.drag = !1),
                  (a.move = !1),
                  H.exec(l.onDragStop, [c], r),
                  o.fire("dragstop", { position: c });
              },
              { ns: a.id }
            )));
      });
    },
    off: function() {
      this.element.data("canDrag", !1);
    },
    on: function() {
      this.element.data("canDrag", !0);
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      this.options;
      return this.dragElement.off(C.events.startAll), e;
    }
  };
  C.plugin("draggable", Ie);
  var De = {
    dropFilter: null,
    toggleElement: null,
    noClose: !1,
    duration: 100,
    onDrop: C.noop,
    onUp: C.noop,
    onDropdownCreate: C.noop
  };
  (C.dropdownSetup = function(e) {
    De = k.extend({}, De, e);
  }),
    window.metroDropdownSetup,
    C.dropdownSetup(window.metroDropdownSetup);
  var Me = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, De, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this._toggle = null),
        (this.displayOrigin = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this,
        t = this.element,
        n = this.options;
      C.checkRuntime(t, "dropdown"),
        this._createStructure(),
        this._createEvents(),
        H.exec(n.onDropdownCreate, null, t),
        t.fire("dropdowncreate"),
        t.hasClass("open") &&
          (t.removeClass("open"),
          setImmediate(function() {
            e.open(!0);
          }));
    },
    _createStructure: function() {
      var e,
        t = this.element,
        n = this.options;
      (e =
        null !== n.toggleElement
          ? k(n.toggleElement)
          : 0 < t.siblings(".dropdown-toggle").length
          ? t.siblings(".dropdown-toggle")
          : t.prev()),
        (this.displayOrigin = H.getStyleOne(t, "display")),
        t.hasClass("v-menu") && t.addClass("for-dropdown"),
        t.css("display", "none"),
        (this._toggle = e);
    },
    _createEvents: function() {
      var n = this,
        i = this.element,
        s = this.options,
        e = this._toggle,
        a = i.parent();
      e.on(C.events.click, function(e) {
        if (
          (a.siblings(a[0].tagName).removeClass("active-container"),
          k(".active-container").removeClass("active-container"),
          "none" === i.css("display") || i.hasClass("keep-open"))
        ) {
          if (
            (k("[data-role=dropdown]").each(function(e, t) {
              i.parents("[data-role=dropdown]").is(t) ||
                k(t).hasClass("keep-open") ||
                "none" === k(t).css("display") ||
                (H.isValue(s.dropFilter)
                  ? 0 < k(t).closest(s.dropFilter).length && n._close(t)
                  : n._close(t));
            }),
            i.hasClass("horizontal"))
          ) {
            i.css({ visibility: "hidden", display: "block" });
            var t = 0;
            k.each(i.children("li"), function() {
              t += k(this).outerWidth(!0);
            }),
              i.css({ visibility: "visible", display: "none" }),
              i.css("width", t);
          }
          n._open(i), a.addClass("active-container");
        } else n._close(i);
        e.preventDefault(), e.stopPropagation();
      }),
        !0 === s.noClose &&
          i.addClass("keep-open").on(C.events.click, function(e) {
            e.stopPropagation();
          }),
        k(i)
          .find("li.disabled a")
          .on(C.events.click, function(e) {
            e.preventDefault();
          });
    },
    _close: function(e, t) {
      e = k(e);
      var n = C.getPlugin(e, "dropdown"),
        i = n._toggle,
        s = n.options,
        a = "slideUp";
      i.removeClass("active-toggle").removeClass("active-control"),
        n.element.parent().removeClass("active-container"),
        t && (a = "hide"),
        e[a](t ? 0 : s.duration, function() {
          e.trigger("onClose", null, e);
        }),
        H.exec(s.onUp, null, e[0]),
        e.fire("up");
    },
    _open: function(e, t) {
      e = k(e);
      var n = C.getPlugin(e, "dropdown"),
        i = n._toggle,
        s = n.options,
        a = "slideDown";
      i.addClass("active-toggle").addClass("active-control"),
        t && (a = "show"),
        e[a](t ? 0 : s.duration, function() {
          e.fire("onopen");
        }),
        H.exec(s.onDrop, null, e[0]),
        e.fire("drop");
    },
    close: function(e) {
      this._close(this.element, e);
    },
    open: function(e) {
      this._open(this.element, e);
    },
    changeAttribute: function(e) {},
    destroy: function() {
      this._toggle.off(C.events.click);
    }
  };
  k(document).on(C.events.click, function() {
    k("[data-role*=dropdown]").each(function() {
      var e = k(this);
      "none" === e.css("display") ||
        e.hasClass("keep-open") ||
        e.hasClass("stay-open") ||
        e.hasClass("ignore-document-click") ||
        C.getPlugin(e, "dropdown").close();
    });
  }),
    C.plugin("dropdown", Me);
  var Ae = {
    mode: "input",
    buttonTitle: "Choose file(s)",
    filesTitle: "file(s) selected",
    dropTitle: "<strong>Choose a file(s)</strong> or drop it here",
    dropIcon: "<span class='default-icon-upload'></span>",
    prepend: "",
    clsComponent: "",
    clsPrepend: "",
    clsButton: "",
    clsCaption: "",
    copyInlineStyles: !0,
    onSelect: C.noop,
    onFileCreate: C.noop
  };
  (C.fileSetup = function(e) {
    Ae = k.extend({}, Ae, e);
  }),
    window.metroFileSetup,
    C.fileSetup(window.metroFileSetup);
  var Ee = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Ae, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element;
      C.checkRuntime(e, "file"), this._createStructure(), this._createEvents();
    },
    _createStructure: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = k("<label>")
          .addClass(
            ("input" === i.mode ? " file " : " drop-zone ") + n[0].className
          )
          .addClass(i.clsComponent),
        a = k("<span>")
          .addClass("caption")
          .addClass(i.clsCaption),
        o = k("<span>")
          .addClass("files")
          .addClass(i.clsCaption);
      (s.insertBefore(n), n.appendTo(s), "input" === i.mode)
        ? (a.insertBefore(n),
          (t = k("<span>")
            .addClass("button")
            .attr("tabindex", -1)
            .html(i.buttonTitle)).appendTo(s),
          t.addClass(i.clsButton),
          "rtl" === n.attr("dir") && s.addClass("rtl"),
          "" !== i.prepend &&
            k("<div>")
              .html(i.prepend)
              .addClass("prepend")
              .addClass(i.clsPrepend)
              .appendTo(s))
        : ((e = k(i.dropIcon)
            .addClass("icon")
            .appendTo(s)),
          a.html(i.dropTitle).insertAfter(e),
          o.html("0 " + i.filesTitle).insertAfter(a));
      if (!(n[0].className = "") === i.copyInlineStyles)
        for (var r = 0, l = n[0].style.length; r < l; r++)
          s.css(n[0].style[r], n.css(n[0].style[r]));
      n.is(":disabled") ? this.disable() : this.enable(),
        H.exec(i.onFileCreate, null, n[0]),
        n.fire("filecreate");
    },
    _createEvents: function() {
      var n = this.element,
        i = this.options,
        t = n.closest("label"),
        s = t.find(".caption"),
        a = t.find(".files");
      t.on(C.events.click, "button", function() {
        n[0].click();
      }),
        n.on(C.events.change, function() {
          var e,
            t = [];
          0 !== this.files.length &&
            (Array.from(this.files).forEach(function(e) {
              t.push(e.name);
            }),
            "input" === i.mode
              ? ((e = t.join(", ")), s.html(e), s.attr("title", e))
              : a.html(n[0].files.length + " " + i.filesTitle),
            H.exec(i.onSelect, [this.files], n[0]),
            n.fire("select", { files: this.files }));
        }),
        n.on(C.events.focus, function() {
          t.addClass("focused");
        }),
        n.on(C.events.blur, function() {
          t.removeClass("focused");
        }),
        "input" !== i.mode &&
          (t.on(
            "drag dragstart dragend dragover dragenter dragleave drop",
            function(e) {
              e.preventDefault();
            }
          ),
          t.on("dragenter dragover", function() {
            t.addClass("drop-on");
          }),
          t.on("dragleave", function() {
            t.removeClass("drop-on");
          }),
          t.on("drop", function(e) {
            (n[0].files = e.dataTransfer.files),
              a.html(n[0].files.length + " " + i.filesTitle),
              t.removeClass("drop-on"),
              n.trigger("change");
          }));
    },
    clear: function() {
      var e = this.element;
      e.siblings(".caption").html(""), e.val("");
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    toggleDir: function() {
      "rtl" === this.element.attr("dir")
        ? this.element.parent().addClass("rtl")
        : this.element.parent().removeClass("rtl");
    },
    changeAttribute: function(e) {
      switch (e) {
        case "disabled":
          this.toggleState();
          break;
        case "dir":
          this.toggleDir();
      }
    },
    destroy: function() {
      var e = this.element,
        t = e.parent();
      return e.off(C.events.change), t.off(C.events.click, "button"), e;
    }
  };
  C.plugin("file", Ee);
  var Pe = { email: "", size: 80, default: "mp", onGravatarCreate: C.noop };
  (C.gravatarSetup = function(e) {
    Pe = k.extend({}, Pe, e);
  }),
    window.metroGravatarSetup,
    C.bottomSheetSetup(window.metroGravatarSetup);
  var Ne = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Pe, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      C.checkRuntime(this.element, "gravatar"), this.get();
    },
    getImage: function(e, t, n, i) {
      var s = k("<img>");
      return s.attr("src", this.getImageSrc(e, t)), !0 === i ? s : s[0];
    },
    getImageSrc: function(e, t, n) {
      return void 0 === e || "" === e.trim()
        ? ""
        : ((t = t || 80),
          (n = H.encodeURI(n) || "404"),
          "//www.gravatar.com/avatar/" +
            H.md5(e.toLowerCase().trim()) +
            "?size=" +
            t +
            "&d=" +
            n);
    },
    get: function() {
      var e = this.element,
        t = this.options,
        n = "IMG" === e[0].tagName ? e : e.find("img");
      if (0 !== n.length)
        return (
          n.attr("src", this.getImageSrc(t.email, t.size, t.default)),
          H.exec(t.onGravatarCreate, null, e[0]),
          e.fire("gravatarcreate"),
          this
        );
    },
    resize: function(e) {
      (this.options.size = void 0 !== e ? e : this.element.attr("data-size")),
        this.get();
    },
    email: function(e) {
      (this.options.email = void 0 !== e ? e : this.element.attr("data-email")),
        this.get();
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-size":
          this.resize();
          break;
        case "data-email":
          this.email();
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("gravatar", Ne);
  var Re = {
    hintHide: 5e3,
    clsHint: "",
    hintText: "",
    hintPosition: C.position.TOP,
    hintOffset: 4,
    onHintShow: C.noop,
    onHintHide: C.noop,
    onHintCreate: C.noop
  };
  (C.hintSetup = function(e) {
    Re = k.extend({}, Re, e);
  }),
    window.metroHintSetup,
    C.hintSetup(window.metroHintSetup);
  var Fe = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Re, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.hint = null),
        (this.hint_size = { width: 0, height: 0 }),
        (this.id = H.elementId("hint")),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this,
        t = this.element,
        n = this.options;
      C.checkRuntime(t, "hint"),
        t.on(C.events.enter, function() {
          e.createHint(),
            0 < +n.hintHide &&
              setTimeout(function() {
                e.removeHint();
              }, n.hintHide);
        }),
        t.on(C.events.leave, function() {
          e.removeHint();
        }),
        k(window).on(
          C.events.scroll + " " + C.events.resize,
          function() {
            null !== e.hint && e.setPosition();
          },
          { ns: this.id }
        ),
        H.exec(n.onHintCreate, null, t[0]),
        t.fire("hintcreate");
    },
    createHint: function() {
      var e = this.elem,
        t = this.element,
        n = this.options,
        i = k("<div>")
          .addClass("hint")
          .addClass(n.clsHint)
          .html(n.hintText);
      if (
        ((this.hint = i),
        (this.hint_size = H.hiddenElementSize(i)),
        k(".hint:not(.permanent-hint)").remove(),
        "TD" === e.tagName || "TH" === e.tagName)
      ) {
        var s = k("<div/>")
          .css("display", "inline-block")
          .html(t.html());
        t.html(s), (t = s);
      }
      this.setPosition(),
        i.appendTo(k("body")),
        H.exec(n.onHintShow, [i[0]], t[0]),
        t.fire("hintshow", { hint: i[0] });
    },
    setPosition: function() {
      var e = this.hint,
        t = this.hint_size,
        n = this.options,
        i = this.element;
      n.hintPosition === C.position.BOTTOM
        ? (e.addClass("bottom"),
          e.css({
            top:
              i.offset().top -
              k(window).scrollTop() +
              i.outerHeight() +
              n.hintOffset,
            left:
              i.offset().left +
              i.outerWidth() / 2 -
              t.width / 2 -
              k(window).scrollLeft()
          }))
        : n.hintPosition === C.position.RIGHT
        ? (e.addClass("right"),
          e.css({
            top:
              i.offset().top +
              i.outerHeight() / 2 -
              t.height / 2 -
              k(window).scrollTop(),
            left:
              i.offset().left +
              i.outerWidth() -
              k(window).scrollLeft() +
              n.hintOffset
          }))
        : n.hintPosition === C.position.LEFT
        ? (e.addClass("left"),
          e.css({
            top:
              i.offset().top +
              i.outerHeight() / 2 -
              t.height / 2 -
              k(window).scrollTop(),
            left:
              i.offset().left - t.width - k(window).scrollLeft() - n.hintOffset
          }))
        : (e.addClass("top"),
          e.css({
            top:
              i.offset().top - k(window).scrollTop() - t.height - n.hintOffset,
            left:
              i.offset().left -
              k(window).scrollLeft() +
              i.outerWidth() / 2 -
              t.width / 2
          }));
    },
    removeHint: function() {
      var e = this,
        t = this.hint,
        n = this.element,
        i = this.options,
        s = i.onHintHide === C.noop ? 0 : 300;
      null !== t &&
        (H.exec(i.onHintHide, [t[0]], n[0]),
        n.fire("hinthide", { hint: t[0] }),
        setTimeout(function() {
          t.hide(0, function() {
            t.remove(), (e.hint = null);
          });
        }, s));
    },
    changeText: function() {
      this.options.hintText = this.element.attr("data-hint-text");
    },
    changeAttribute: function(e) {
      "data-hint-text" === e && this.changeText();
    },
    destroy: function() {
      var e = this.element;
      this.removeHint(),
        e.off(C.events.enter + "-hint"),
        e.off(C.events.leave + "-hint"),
        k(window).off(C.events.scroll + "-hint");
    }
  };
  C.plugin("hint", Fe);
  var Le = {
    specialKeys: {
      8: "backspace",
      9: "tab",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      188: ",",
      190: ".",
      191: "/",
      224: "meta"
    },
    shiftNums: {
      "~": "`",
      "!": "1",
      "@": "2",
      "#": "3",
      $: "4",
      "%": "5",
      "^": "6",
      "&": "7",
      "*": "8",
      "(": "9",
      ")": "0",
      _: "-",
      "+": "=",
      ":": ";",
      '"': "'",
      "<": ",",
      ">": ".",
      "?": "/",
      "|": "\\"
    },
    shiftNumsInverse: {
      "`": "~",
      1: "!",
      2: "@",
      3: "#",
      4: "$",
      5: "%",
      6: "^",
      7: "&",
      8: "*",
      9: "(",
      0: ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": '"',
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    },
    textAcceptingInputTypes: [
      "text",
      "password",
      "number",
      "email",
      "url",
      "range",
      "date",
      "month",
      "week",
      "time",
      "datetime",
      "datetime-local",
      "search",
      "color",
      "tel"
    ],
    getKey: function(e) {
      var t,
        n = e.keyCode,
        i = String.fromCharCode(n).toLowerCase();
      return (
        (t = e.shiftKey
          ? Le.shiftNums[i]
            ? Le.shiftNums[i]
            : i
          : void 0 === Le.specialKeys[n]
          ? i
          : Le.specialKeys[n]),
        Le.getModifier(e).length ? Le.getModifier(e).join("+") + "+" + t : t
      );
    },
    getModifier: function(e) {
      var t = [];
      return (
        e.altKey && t.push("alt"),
        e.ctrlKey && t.push("ctrl"),
        e.shiftKey && t.push("shift"),
        t
      );
    }
  };
  (k.fn.hotkey = function(n, i) {
    return this.each(function() {
      k(this).on(C.events.keyup + ".hotkey-method-" + n, function(e) {
        var t = Le.getKey(e);
        n === t && H.exec(i, [e, t, n], this);
      });
    });
  }),
    METRO_JQUERY &&
      jquery_present &&
      (jQuery.fn.hotkey = function(n, i) {
        return this.each(function() {
          k(this).on(C.events.keyup + ".hotkey-method-" + n, function(e) {
            var t = Le.getKey(e);
            n === t && H.exec(i, [e, t, n], this);
          });
        });
      }),
    k(document).on(C.events.keyup + ".hotkey-data", function(e) {
      var t, n, i;
      (METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS &&
        /textarea|input|select/i.test(e.target.nodeName)) ||
        (METRO_HOTKEYS_FILTER_CONTENT_EDITABLE &&
          k(e.target).attr("contenteditable")) ||
        (METRO_HOTKEYS_FILTER_TEXT_INPUTS &&
          -1 < Le.textAcceptingInputTypes.indexOf(e.target.type)) ||
        ((i = Le.getKey(e)),
        H.keyInObject(C.hotkeys, i) &&
          ((t = C.hotkeys[i][0]),
          !1 === (n = C.hotkeys[i][1]) ? k(t).click() : H.exec(n)));
    });
  var Be = {
    method: "get",
    htmlSource: null,
    requestData: null,
    requestOptions: null,
    insertMode: "replace",
    onHtmlLoad: C.noop,
    onHtmlLoadFail: C.noop,
    onHtmlLoadDone: C.noop,
    onHtmlContainerCreate: C.noop
  };
  (C.htmlContainerSetup = function(e) {
    Be = k.extend({}, Be, e);
  }),
    window.metroHtmlContainerSetup,
    C.htmlContainerSetup(window.metroHtmlContainerSetup);
  var He = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Be, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.data = {}),
        (this.opt = {}),
        (this.htmlSource = ""),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "htmlcontainer"),
        "string" == typeof t.requestData &&
          (t.requestData = JSON.parse(t.requestData)),
        H.isObject(t.requestData) && (this.data = H.isObject(t.requestData)),
        "string" == typeof t.requestOptions &&
          (t.requestOptions = JSON.parse(t.requestOptions)),
        H.isObject(t.requestOptions) &&
          (this.opt = H.isObject(t.requestOptions)),
        (t.method = t.method.toLowerCase()),
        H.isValue(t.htmlSource) &&
          ((this.htmlSource = t.htmlSource), this._load()),
        H.exec(t.onHtmlContainerCreate, null, e[0]),
        e.fire("htmlcontainercreate");
    },
    _load: function() {
      var t = this,
        n = this.element,
        i = this.options;
      k[i.method](this.htmlSource, this.data, this.opt).then(
        function(e) {
          switch (i.insertMode.toLowerCase()) {
            case "prepend":
              n.prepend(e);
              break;
            case "append":
              n.append(e);
              break;
            default:
              n.html(e);
          }
          H.exec(i.onHtmlLoad, [e, i.htmlSource, t.data, t.opt], n[0]),
            n.fire("htmlload", {
              data: e,
              source: i.htmlSource,
              requestData: t.data,
              requestOptions: t.opt
            });
        },
        function(e) {
          H.exec(i.onHtmlLoadFail, [e], n[0]),
            n.fire("htmlloadfail", { xhr: e });
        }
      );
    },
    load: function(e, t, n) {
      this.options;
      e && (this.htmlSource = e),
        t && (this.data = H.isObject(t)),
        n && (this.opt = H.isObject(n)),
        this._load();
    },
    changeAttribute: function(e) {
      var t,
        n,
        i,
        s = this,
        a = this.element,
        o = this.options;
      switch (e) {
        case "data-html-source":
          (i = a.attr("data-html-source")),
            H.isNull(i) ||
              ("" === i.trim() && a.html(""), (o.htmlSource = i), s._load());
          break;
        case "data-insert-mode":
          (n = a.attr("data-insert-mode")), H.isValue(n) && (o.insertMode = n);
          break;
        case "data-request-data":
          (t = a.attr("data-request-data")), s.load(o.htmlSource, t);
      }
    },
    destroy: function() {}
  };
  C.plugin("htmlcontainer", He);
  var Ve = {
    width: "100%",
    height: "auto",
    onResize: C.noop,
    onSliderMove: C.noop,
    onImageCompareCreate: C.noop
  };
  (C.imageCompareSetup = function(e) {
    Ve = k.extend({}, Ve, e);
  }),
    window.metroImageCompareSetup,
    C.imageCompareSetup(window.metroImageCompareSetup);
  var ze = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Ve, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "imagecompare"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onImageCompareCreate, null, e[0]),
        e.fire("imagecomparecreate");
    },
    _createStructure: function() {
      var i,
        s,
        e,
        t,
        a,
        o,
        n = this.element,
        r = this.options;
      switch (
        (H.isValue(n.attr("id")) || n.attr("id", H.elementId("image-compare")),
        n.addClass("image-compare").css({ width: r.width }),
        (a = n.width()),
        r.height)
      ) {
        case "16/9":
        case "21/9":
        case "4/3":
          o = H.aspectRatioH(a, r.height);
          break;
        case "auto":
          o = H.aspectRatioH(a, "16/9");
          break;
        default:
          o = r.height;
      }
      n.css({ height: o }),
        (i = k("<div>")
          .addClass("image-container")
          .appendTo(n)),
        (s = k("<div>")
          .addClass("image-container-overlay")
          .appendTo(n)
          .css({ width: a / 2 })),
        (e = k("<div>")
          .addClass("image-slider")
          .appendTo(n)).css({
          top: o / 2 - e.height() / 2,
          left: a / 2 - e.width() / 2
        }),
        (t = n.find("img")),
        k.each(t, function(e, t) {
          var n = k("<div>").addClass("image-wrapper");
          n.css({
            width: a,
            height: o,
            backgroundImage: "url(" + this.src + ")"
          }),
            n.appendTo(0 === e ? i : s);
        });
    },
    _createEvents: function() {
      var s = this.element,
        a = this.options,
        o = s.find(".image-container-overlay"),
        r = s.find(".image-slider");
      r.on(C.events.startAll, function(e) {
        var i = s.width();
        k(document).on(C.events.moveAll, function(e) {
          var t,
            n = H.getCursorPositionX(s[0], e);
          n < 0 && (n = 0),
            i < n && (n = i),
            o.css({ width: n }),
            (t = n - r.width() / 2),
            r.css({ left: t }),
            H.exec(a.onSliderMove, [n, t], r[0]),
            s.fire("slidermove", { x: n, l: t });
        }),
          k(document).on(C.events.stopAll, function() {
            k(document).off(C.events.moveAll),
              k(document).off(C.events.stopAll);
          });
      }),
        k(window).on(
          C.events.resize,
          function() {
            var e,
              t = s.width();
            if ("100%" === a.width) {
              switch (a.height) {
                case "16/9":
                case "21/9":
                case "4/3":
                  e = H.aspectRatioH(t, a.height);
                  break;
                case "auto":
                  e = H.aspectRatioH(t, "16/9");
                  break;
                default:
                  e = a.height;
              }
              s.css({ height: e }),
                k.each(s.find(".image-wrapper"), function() {
                  k(this).css({ width: t, height: e });
                }),
                s.find(".image-container-overlay").css({ width: t / 2 }),
                r.css({
                  top: e / 2 - r.height() / 2,
                  left: t / 2 - r.width() / 2
                }),
                H.exec(a.onResize, [t, e], s[0]),
                s.fire("comparerresize", { width: t, height: e });
            }
          },
          { ns: s.attr("id") }
        );
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return (
        e.off(C.events.start),
        k(window).off(C.events.resize, { ns: e.attr("id") }),
        e
      );
    }
  };
  C.plugin("imagecompare", ze);
  var je = {
    width: "100%",
    height: "auto",
    lensSize: 100,
    lensType: "square",
    magnifierZoom: 2,
    magnifierMode: "glass",
    magnifierZoomElement: null,
    clsMagnifier: "",
    clsLens: "",
    clsZoom: "",
    onMagnifierMove: C.noop,
    onImageMagnifierCreate: C.noop
  };
  (C.imageMagnifierSetup = function(e) {
    je = k.extend({}, je, e);
  }),
    window.metroImageMagnifierSetup,
    C.imageMagnifierSetup(window.metroImageMagnifierSetup);
  var Ue = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, je, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.zoomElement = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "imagemagnifier"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onImageMagnifierCreate, null, e[0]),
        e.fire("imagemagnifiercreate");
    },
    _createStructure: function() {
      var e,
        t,
        n,
        i = this.element,
        s = this.options,
        a = i.find("img");
      if (0 === a.length) throw new Error("Image not defined");
      switch (
        (H.isValue(i.attr("id")) ||
          i.attr("id", H.elementId("image-magnifier")),
        i
          .addClass("image-magnifier")
          .css({ width: s.width })
          .addClass(s.clsMagnifier),
        (t = i.width()),
        s.height)
      ) {
        case "16/9":
        case "21/9":
        case "4/3":
          n = H.aspectRatioH(t, s.height);
          break;
        case "auto":
          n = H.aspectRatioH(t, "16/9");
          break;
        default:
          n = s.height;
      }
      i.css({ height: n });
      var o = t / 2 - s.lensSize / 2,
        r = n / 2 - s.lensSize / 2;
      if ("glass" === s.magnifierMode)
        (e = k("<div>")
          .addClass("image-magnifier-glass")
          .appendTo(i))
          .css({
            width: s.lensSize,
            height: s.lensSize,
            borderRadius: "circle" !== s.lensType ? 0 : "50%",
            top: r,
            left: o,
            backgroundImage: "url(" + a[0].src + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition:
              "-" +
              (o * s.magnifierZoom - s.lensSize / 4 + 4) +
              "px -" +
              (r * s.magnifierZoom - s.lensSize / 4 + 4) +
              "px",
            backgroundSize:
              a[0].width * s.magnifierZoom +
              "px " +
              a[0].height * s.magnifierZoom +
              "px"
          })
          .addClass(s.clsLens);
      else {
        (e = k("<div>")
          .addClass("image-magnifier-glass")
          .appendTo(i))
          .css({
            width: s.lensSize,
            height: s.lensSize,
            borderRadius: 0,
            borderWidth: 1,
            top: r,
            left: o
          })
          .addClass(s.clsLens),
          H.isValue(s.magnifierZoomElement) &&
          0 !== k(s.magnifierZoomElement).length
            ? (this.zoomElement = k(s.magnifierZoomElement))
            : (this.zoomElement = k("<div>").insertAfter(i));
        var l = e[0].offsetWidth * s.magnifierZoom,
          c = e[0].offsetHeight * s.magnifierZoom,
          d = l / s.lensSize,
          h = c / s.lensSize;
        this.zoomElement
          .css({
            width: l,
            height: c,
            backgroundImage: "url(" + a[0].src + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-" + o * d + "px -" + r * h + "px",
            backgroundSize: a[0].width * d + "px " + a[0].height * h + "px"
          })
          .addClass(s.clsZoom);
      }
    },
    _createEvents: function() {
      var s,
        a,
        n = this.element,
        o = this.options,
        r = n.find(".image-magnifier-glass"),
        l = r[0].offsetWidth / 2,
        c = n.find("img")[0],
        d = this.zoomElement;
      "glass" !== o.magnifierMode &&
        ((s = d[0].offsetWidth / l / 2),
        (a = d[0].offsetHeight / l / 2),
        d.css({ backgroundSize: c.width * s + "px " + c.height * a + "px" }));
      function i(e) {
        var t,
          n,
          i = parseInt(o.magnifierZoom);
        "glass" === o.magnifierMode
          ? ((t = e.x),
            (n = e.y),
            t > c.width - l / i && (t = c.width - l / i),
            t < l / i && (t = l / i),
            n > c.height - l / i && (n = c.height - l / i),
            n < l / i && (n = l / i),
            r.css({
              top: n - l,
              left: t - l,
              backgroundPosition:
                "-" + (t * i - l + 4) + "px -" + (n * i - l + 4) + "px"
            }))
          : ((t = e.x - l),
            (n = e.y - l),
            t > c.width - 2 * l && (t = c.width - 2 * l),
            t < 0 && (t = 0),
            n > c.height - 2 * l && (n = c.height - 2 * l),
            n < 0 && (n = 0),
            r.css({ top: n, left: t }),
            d.css({ backgroundPosition: "-" + t * s + "px -" + n * a + "px" }));
      }
      n.on(C.events.move, function(e) {
        var t = H.getCursorPosition(c, e);
        i(t),
          H.exec(o.onMagnifierMove, [t, r[0], d ? d[0] : void 0], n[0]),
          n.fire("magnifiermove", {
            pos: t,
            glass: r[0],
            zoomElement: d ? d[0] : void 0
          }),
          e.preventDefault();
      }),
        n.on(C.events.leave, function() {
          var e = n.width() / 2 - o.lensSize / 2,
            t = n.height() / 2 - o.lensSize / 2;
          r.animate({ top: t, left: e }),
            i({ x: e + o.lensSize / 2, y: t + o.lensSize / 2 });
        });
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return e.off(C.events.move), e.off(C.events.leave), e;
    }
  };
  C.plugin("imagemagnifier", Ue);
  var We = {
    type: "",
    width: 480,
    height: "auto",
    overlay: !0,
    overlayColor: "#000000",
    overlayAlpha: 0.5,
    autoHide: 0,
    removeOnClose: !1,
    closeButton: !0,
    clsBox: "",
    clsBoxContent: "",
    clsOverlay: "",
    onOpen: C.noop,
    onClose: C.noop,
    onInfoBoxCreate: C.noop
  };
  (C.infoBoxSetup = function(e) {
    We = k.extend({}, We, e);
  }),
    window.metroInfoBoxSetup,
    C.infoBoxSetup(window.metroInfoBoxSetup);
  var Ye = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, We, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.overlay = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "infobox"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onInfoBoxCreate, null, e[0]),
        e.fire("infoboxcreate");
    },
    _overlay: function() {
      this.element;
      var e = this.options,
        t = k("<div>");
      return (
        t.addClass("overlay").addClass(e.clsOverlay),
        "transparent" === e.overlayColor
          ? t.addClass("transparent")
          : t.css({ background: H.hex2rgba(e.overlayColor, e.overlayAlpha) }),
        t
      );
    },
    _createStructure: function() {
      var e,
        t,
        n = this.element,
        i = this.options;
      !0 === i.overlay && (this.overlay = this._overlay()),
        void 0 === n.attr("id") && n.attr("id", H.elementId("infobox")),
        n
          .addClass("info-box")
          .addClass(i.type)
          .addClass(i.clsBox),
        0 === (e = n.find("closer")).length &&
          (e = k("<span>").addClass("button square closer")).appendTo(n),
        !0 !== i.closeButton && e.hide(),
        0 < (t = n.find(".info-box-content")).length &&
          t.addClass(i.clsBoxContent),
        n.css({
          width: i.width,
          height: i.height,
          visibility: "hidden",
          top: "100%",
          left: (k(window).width() - n.outerWidth()) / 2
        }),
        n.appendTo(k("body"));
    },
    _createEvents: function() {
      var e = this,
        t = this.element;
      this.options;
      t.on(C.events.click, ".closer", function() {
        e.close();
      }),
        t.on(C.events.click, ".js-dialog-close", function() {
          e.close();
        }),
        k(window).on(
          C.events.resize,
          function() {
            e.reposition();
          },
          { ns: t.attr("id") }
        );
    },
    _setPosition: function() {
      var e = this.element;
      e.css({
        top: (k(window).height() - e.outerHeight()) / 2,
        left: (k(window).width() - e.outerWidth()) / 2
      });
    },
    reposition: function() {
      this._setPosition();
    },
    setContent: function(e) {
      var t = this.element.find(".info-box-content");
      0 !== t.length && (t.html(e), this.reposition());
    },
    setType: function(e) {
      this.element.removeClass("success info alert warning").addClass(e);
    },
    open: function() {
      var e = this,
        t = this.element,
        n = this.options;
      !0 === n.overlay && this.overlay.appendTo(k("body")),
        this._setPosition(),
        t.css({ visibility: "visible" }),
        H.exec(n.onOpen, null, t[0]),
        t.fire("open"),
        t.data("open", !0),
        0 < parseInt(n.autoHide) &&
          setTimeout(function() {
            e.close();
          }, parseInt(n.autoHide));
    },
    close: function() {
      var e = this.element,
        t = this.options;
      !0 === t.overlay &&
        k("body")
          .find(".overlay")
          .remove(),
        e.css({ visibility: "hidden", top: "100%" }),
        H.exec(t.onClose, null, e[0]),
        e.fire("close"),
        e.data("open", !1),
        !0 === t.removeOnClose && (this.destroy(), e.remove());
    },
    isOpen: function() {
      return !0 === this.element.data("open");
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return (
        e.off("all"), k(window).off(C.events.resize, { ns: e.attr("id") }), e
      );
    }
  };
  C.plugin("infobox", Ye);
  var Je = {
    label: "",
    informer: "",
    icon: "",
    permanentLabel: !(C.infobox = {
      isInfoBox: function(e) {
        return H.isMetroObject(e, "infobox");
      },
      open: function(e, t, n) {
        var i = H.$();
        if (!this.isInfoBox(e)) return !1;
        var s = i(e).data("infobox");
        void 0 !== t && s.setContent(t), void 0 !== n && s.setType(n), s.open();
      },
      close: function(e) {
        var t = H.$();
        if (!this.isInfoBox(e)) return !1;
        t(e)
          .data("infobox")
          .close();
      },
      setContent: function(e, t) {
        var n = H.$();
        if (!this.isInfoBox(e)) return !1;
        void 0 === t && (t = "");
        var i = n(e).data("infobox");
        i.setContent(t), i.reposition();
      },
      setType: function(e, t) {
        var n = H.$();
        if (!this.isInfoBox(e)) return !1;
        var i = n(e).data("infobox");
        i.setType(t), i.reposition();
      },
      isOpen: function(e) {
        var t = H.$();
        return (
          !!this.isInfoBox(e) &&
          t(e)
            .data("infobox")
            .isOpen()
        );
      },
      create: function(e, t, n, i) {
        var s, a, o;
        (o = void 0 !== t ? t : ""),
          (s = k("<div>").appendTo(k("body"))),
          k("<div>")
            .addClass("info-box-content")
            .appendTo(s);
        var r = k.extend(
          {},
          { removeOnClose: !0, type: o },
          void 0 !== n ? n : {}
        );
        return (
          (r._runtime = !0),
          s.infobox(r),
          (a = s.data("infobox")).setContent(e),
          !1 !== i && a.open(),
          s
        );
      }
    }),
    clsComponent: "",
    clsInput: "",
    clsLabel: "",
    clsInformer: "",
    clsIcon: "",
    clsLine: "",
    onInputCreate: C.noop
  };
  (C.materialInputSetup = function(e) {
    Je = k.extend({}, Je, e);
  }),
    window.metroMaterialInputSetup,
    C.materialInputSetup(window.metroMaterialInputSetup);
  var Ge = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Je, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.history = []),
        (this.historyIndex = -1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "materialinput"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onInputCreate, null, e[0]),
        e.fire("inputcreate");
    },
    _createStructure: function() {
      var e = this.element,
        t = this.options,
        n = k("<div>").addClass("input-material " + e[0].className);
      (e[0].className = ""),
        e.attr("autocomplete", "nope"),
        void 0 === e.attr("type") && e.attr("type", "text"),
        n.insertBefore(e),
        e.appendTo(n),
        H.isValue(t.label) &&
          k("<span>")
            .html(t.label)
            .addClass("label")
            .addClass(t.clsLabel)
            .insertAfter(e),
        H.isValue(t.informer) &&
          k("<span>")
            .html(t.informer)
            .addClass("informer")
            .addClass(t.clsInformer)
            .insertAfter(e),
        H.isValue(t.icon) &&
          (n.addClass("with-icon"),
          k("<span>")
            .html(t.icon)
            .addClass("icon")
            .addClass(t.clsIcon)
            .insertAfter(e)),
        n.append(k("<hr>").addClass(t.clsLine)),
        !0 === t.permanentLabel && n.addClass("permanent-label"),
        n.addClass(t.clsComponent),
        e.addClass(t.clsInput),
        e.is(":disabled") ? this.disable() : this.enable();
    },
    _createEvents: function() {},
    clear: function() {
      this.element.val("");
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      "disabled" === e && this.toggleState();
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("materialinput", Ge);
  var Ke = {
    autocomplete: null,
    autocompleteDivider: ",",
    autocompleteListHeight: 200,
    history: !1,
    historyPreset: "",
    historyDivider: "|",
    preventSubmit: !1,
    defaultValue: "",
    size: "default",
    prepend: "",
    append: "",
    copyInlineStyles: !0,
    searchButton: !1,
    clearButton: !0,
    revealButton: !0,
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    revealButtonIcon: "<span class='default-icon-eye'></span>",
    searchButtonIcon: "<span class='default-icon-search'></span>",
    customButtons: [],
    searchButtonClick: "submit",
    clsComponent: "",
    clsInput: "",
    clsPrepend: "",
    clsAppend: "",
    clsClearButton: "",
    clsRevealButton: "",
    clsCustomButton: "",
    clsSearchButton: "",
    onHistoryChange: C.noop,
    onHistoryUp: C.noop,
    onHistoryDown: C.noop,
    onClearClick: C.noop,
    onRevealClick: C.noop,
    onSearchButtonClick: C.noop,
    onEnterClick: C.noop,
    onInputCreate: C.noop
  };
  (C.inputSetup = function(e) {
    Ke = k.extend({}, Ke, e);
  }),
    window.metroInputSetup,
    C.inputSetup(window.metroInputSetup);
  var qe = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Ke, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.history = []),
        (this.historyIndex = -1),
        (this.autocomplete = []),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "input"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onInputCreate, null, e[0]),
        e.fire("inputcreate");
    },
    _createStructure: function() {
      var e = this,
        t = this.element,
        n = this.options,
        i = t.prev(),
        s = t.parent(),
        a = k("<div>").addClass("input " + t[0].className),
        o = k("<div>").addClass("button-group");
      H.isValue(n.historyPreset) &&
        (k.each(H.strToArray(n.historyPreset, n.historyDivider), function() {
          e.history.push(this);
        }),
        (e.historyIndex = e.history.length - 1)),
        void 0 === t.attr("type") && t.attr("type", "text"),
        0 === i.length ? s.prepend(a) : a.insertAfter(i),
        t.appendTo(a),
        o.appendTo(a),
        H.isValue(t.val().trim()) || t.val(n.defaultValue),
        !0 !== n.clearButton ||
          t[0].readOnly ||
          k("<button>")
            .addClass("button input-clear-button")
            .addClass(n.clsClearButton)
            .attr("tabindex", -1)
            .attr("type", "button")
            .html(n.clearButtonIcon)
            .appendTo(o),
        "password" === t.attr("type") &&
          !0 === n.revealButton &&
          k("<button>")
            .addClass("button input-reveal-button")
            .addClass(n.clsRevealButton)
            .attr("tabindex", -1)
            .attr("type", "button")
            .html(n.revealButtonIcon)
            .appendTo(o),
        !0 === n.searchButton &&
          k("<button>")
            .addClass("button input-search-button")
            .addClass(n.clsSearchButton)
            .attr("tabindex", -1)
            .attr(
              "type",
              "submit" === n.searchButtonClick ? "submit" : "button"
            )
            .html(n.searchButtonIcon)
            .appendTo(o),
        H.isValue(n.prepend) &&
          k("<div>")
            .html(n.prepend)
            .addClass("prepend")
            .addClass(n.clsPrepend)
            .appendTo(a);
      H.isValue(n.append) &&
        k("<div>")
          .html(n.append)
          .addClass("append")
          .addClass(n.clsAppend)
          .appendTo(a);
      if (
        ("string" == typeof n.customButtons &&
          (n.customButtons = H.isObject(n.customButtons)),
        "object" == typeof n.customButtons &&
          0 < H.objectLength(n.customButtons) &&
          k.each(n.customButtons, function() {
            var e = k("<button>");
            e
              .addClass("button input-custom-button")
              .addClass(n.clsCustomButton)
              .addClass(this.cls)
              .attr("tabindex", -1)
              .attr("type", "button")
              .html(this.html),
              e.data("action", this.onclick),
              e.appendTo(o);
          }),
        H.isValue(t.attr("data-exclaim")) &&
          a.attr("data-exclaim", t.attr("data-exclaim")),
        "rtl" === t.attr("dir") && a.addClass("rtl").attr("dir", "rtl"),
        !(t[0].className = "") === n.copyInlineStyles)
      )
        for (var r = 0, l = t[0].style.length; r < l; r++)
          a.css(t[0].style[r], t.css(t[0].style[r]));
      if (
        (a.addClass(n.clsComponent),
        t.addClass(n.clsInput),
        "default" !== n.size && a.css({ width: n.size }),
        !H.isNull(n.autocomplete))
      ) {
        var c = H.isObject(n.autocomplete);
        !1 !== c
          ? (e.autocomplete = c)
          : (this.autocomplete = H.strToArray(
              n.autocomplete,
              n.autocompleteDivider
            )),
          k("<div>")
            .addClass("autocomplete-list")
            .css({ maxHeight: n.autocompleteListHeight, display: "none" })
            .appendTo(a);
      }
      t.is(":disabled") ? this.disable() : this.enable();
    },
    _createEvents: function() {
      var n = this,
        i = this.element,
        s = this.options,
        e = i.closest(".input"),
        o = e.find(".autocomplete-list");
      e.on(C.events.click, ".input-clear-button", function() {
        var e = i.val();
        i
          .val(H.isValue(s.defaultValue) ? s.defaultValue : "")
          .fire("clear")
          .fire("change")
          .fire("keyup")
          .focus(),
          0 < o.length && o.css({ display: "none" }),
          H.exec(s.onClearClick, [e, i.val()], i[0]),
          i.fire("clearclick", { prev: e, val: i.val() });
      }),
        e.on(C.events.click, ".input-reveal-button", function() {
          "password" === i.attr("type")
            ? i.attr("type", "text")
            : i.attr("type", "password"),
            H.exec(s.onRevealClick, [i.val()], i[0]),
            i.fire("revealclick", { val: i.val() });
        }),
        e.on(C.events.click, ".input-search-button", function() {
          "submit" !== s.searchButtonClick
            ? (H.exec(s.onSearchButtonClick, [i.val()], this),
              i.fire("searchbuttonclick", { val: i.val(), button: this }))
            : this.form.submit();
        }),
        e.on(C.events.click, ".input-custom-button", function() {
          var e = k(this),
            t = e.data("action");
          H.exec(t, [i.val(), e], this);
        }),
        i.on(C.events.keyup, function(e) {
          var t = i.val().trim();
          s.history &&
            e.keyCode === C.keyCode.ENTER &&
            "" !== t &&
            (i.val(""),
            n.history.push(t),
            (n.historyIndex = n.history.length - 1),
            H.exec(s.onHistoryChange, [t, n.history, n.historyIndex], i[0]),
            i.fire("historychange", {
              val: t,
              history: n.history,
              historyIndex: n.historyIndex
            }),
            !0 === s.preventSubmit && e.preventDefault()),
            s.history &&
              e.keyCode === C.keyCode.UP_ARROW &&
              (n.historyIndex--,
              0 <= n.historyIndex
                ? (i.val(""),
                  i.val(n.history[n.historyIndex]),
                  H.exec(
                    s.onHistoryDown,
                    [i.val(), n.history, n.historyIndex],
                    i[0]
                  ),
                  i.fire("historydown", {
                    val: i.val(),
                    history: n.history,
                    historyIndex: n.historyIndex
                  }))
                : (n.historyIndex = 0),
              e.preventDefault()),
            s.history &&
              e.keyCode === C.keyCode.DOWN_ARROW &&
              (n.historyIndex++,
              n.historyIndex < n.history.length
                ? (i.val(""),
                  i.val(n.history[n.historyIndex]),
                  H.exec(
                    s.onHistoryUp,
                    [i.val(), n.history, n.historyIndex],
                    i[0]
                  ),
                  i.fire("historyup", {
                    val: i.val(),
                    history: n.history,
                    historyIndex: n.historyIndex
                  }))
                : (n.historyIndex = n.history.length - 1),
              e.preventDefault());
        }),
        i.on(C.events.keydown, function(e) {
          e.keyCode === C.keyCode.ENTER &&
            (H.exec(s.onEnterClick, [i.val()], i[0]),
            i.fire("enterclick", { val: i.val() }));
        }),
        i.on(C.events.blur, function() {
          e.removeClass("focused");
        }),
        i.on(C.events.focus, function() {
          e.addClass("focused");
        }),
        i.on(C.events.input, function() {
          var e,
            a = this.value.toLowerCase();
          0 !== o.length &&
            (o.html(""),
            (e = n.autocomplete.filter(function(e) {
              return -1 < e.toLowerCase().indexOf(a);
            })),
            o.css({ display: 0 < e.length ? "block" : "none" }),
            k.each(e, function(e, t) {
              var n,
                i = t.toLowerCase().indexOf(a),
                s = k("<div>")
                  .addClass("item")
                  .attr("data-autocomplete-value", t);
              (n =
                0 === i
                  ? "<strong>" +
                    t.substr(0, a.length) +
                    "</strong>" +
                    t.substr(a.length)
                  : t.substr(0, i) +
                    "<strong>" +
                    t.substr(i, a.length) +
                    "</strong>" +
                    t.substr(i + a.length)),
                s.html(n).appendTo(o);
            }));
        }),
        e.on(C.events.click, ".autocomplete-list .item", function() {
          i.val(k(this).attr("data-autocomplete-value")),
            o.css({ display: "none" }),
            i.trigger("change");
        });
    },
    getHistory: function() {
      return this.history;
    },
    getHistoryIndex: function() {
      return this.historyIndex;
    },
    setHistoryIndex: function(e) {
      this.historyIndex =
        e >= this.history.length ? this.history.length - 1 : e;
    },
    setHistory: function(e, t) {
      var n = this,
        i = this.options;
      H.isNull(e) ||
        (Array.isArray(e) || (e = H.strToArray(e, i.historyDivider)),
        !0 === t
          ? k.each(e, function() {
              n.history.push(this);
            })
          : (this.history = e),
        (this.historyIndex = this.history.length - 1));
    },
    clear: function() {
      this.element.val("");
    },
    toDefault: function() {
      this.element.val(
        H.isValue(this.options.defaultValue) ? this.options.defaultValue : ""
      );
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      switch (e) {
        case "disabled":
          this.toggleState();
      }
    },
    destroy: function() {
      var e = this.element,
        t = e.parent(),
        n = t.find(".input-clear-button"),
        i = t.find(".input-reveal-button"),
        s = t.find(".input-custom-button");
      return (
        0 < n.length && n.off(C.events.click),
        0 < i.length && (i.off(C.events.start), i.off(C.events.stop)),
        0 < s.length && n.off(C.events.click),
        e.off(C.events.blur),
        e.off(C.events.focus),
        e
      );
    }
  };
  C.plugin("input", qe),
    k(document).on(C.events.click, function() {
      k(".input .autocomplete-list").hide();
    });
  var Qe = {
    keySize: 48,
    keys: "1, 2, 3, 4, 5, 6, 7, 8, 9, 0",
    copyInlineStyles: !1,
    target: null,
    keyLength: 0,
    shuffle: !1,
    shuffleCount: 3,
    position: C.position.BOTTOM_LEFT,
    dynamicPosition: !1,
    serviceButtons: !0,
    showValue: !0,
    open: !1,
    sizeAsKeys: !1,
    clsKeypad: "",
    clsInput: "",
    clsKeys: "",
    clsKey: "",
    clsServiceKey: "",
    clsBackspace: "",
    clsClear: "",
    onChange: C.noop,
    onClear: C.noop,
    onBackspace: C.noop,
    onShuffle: C.noop,
    onKey: C.noop,
    onKeypadCreate: C.noop
  };
  (C.keypadSetup = function(e) {
    Qe = k.extend({}, Qe, e);
  }),
    window.metroKeypadSetup,
    C.keypadSetup(window.metroKeypadSetup);
  var Xe = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Qe, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.value = ""),
        (this.positions = [
          "top-left",
          "top",
          "top-right",
          "right",
          "bottom-right",
          "bottom",
          "bottom-left",
          "left"
        ]),
        (this.keypad = null),
        this._setOptionsFromDOM(),
        (this.keys = H.strToArray(this.options.keys, ",")),
        (this.keys_to_work = this.keys),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "keypad"),
        this._createKeypad(),
        !0 === t.shuffle && this.shuffle(),
        this._createKeys(),
        this._createEvents(),
        H.exec(t.onKeypadCreate, null, e[0]),
        e.fire("keypadcreate");
    },
    _createKeypad: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = n.parent();
      if (
        ((e = s.hasClass("input")
          ? s
          : k("<div>")
              .addClass("input")
              .addClass(n[0].className)).addClass("keypad"),
        ("static" !== e.css("position") && "" !== e.css("position")) ||
          e.css({ position: "relative" }),
        void 0 === n.attr("type") && n.attr("type", "text"),
        e.insertBefore(n),
        n.attr("readonly", !0),
        n.appendTo(e),
        (t = k("<div>")
          .addClass("keys")
          .addClass(i.clsKeys)).appendTo(e),
        this._setKeysPosition(),
        !0 === i.open && t.addClass("open keep-open"),
        !(n[0].className = "") === i.copyInlineStyles)
      )
        for (var a = 0, o = n[0].style.length; a < o; a++)
          e.css(n[0].style[a], n.css(n[0].style[a]));
      n.addClass(i.clsInput),
        e.addClass(i.clsKeypad),
        n.on(C.events.blur, function() {
          e.removeClass("focused");
        }),
        n.on(C.events.focus, function() {
          e.addClass("focused");
        }),
        !0 === i.disabled || n.is(":disabled") ? this.disable() : this.enable(),
        (this.keypad = e);
    },
    _setKeysPosition: function() {
      var e = this.element,
        t = this.options;
      e.parent()
        .find(".keys")
        .removeClass(this.positions.join(" "))
        .addClass(t.position);
    },
    _createKeys: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = n.parent(),
        a = s.find(".keys"),
        o = Math.round(Math.sqrt(this.keys.length + 2)),
        r = i.keySize;
      if (
        (a.html(""),
        k.each(this.keys_to_work, function() {
          (e = k("<span>")
            .addClass("key")
            .addClass(i.clsKey)
            .html(this)).data("key", this),
            e
              .css({
                width: i.keySize,
                height: i.keySize,
                lineHeight: i.keySize - 4
              })
              .appendTo(a);
        }),
        !0 === i.serviceButtons)
      ) {
        k.each(["&larr;", "&times;"], function() {
          (e = k("<span>")
            .addClass("key service-key")
            .addClass(i.clsKey)
            .addClass(i.clsServiceKey)
            .html(this)),
            "&larr;" === this && e.addClass(i.clsBackspace),
            "&times;" === this && e.addClass(i.clsClear),
            e.data("key", this),
            e
              .css({
                width: i.keySize,
                height: i.keySize,
                lineHeight: i.keySize - 4
              })
              .appendTo(a);
        });
      }
      (t = o * (r + 2) - 6),
        a.outerWidth(t),
        !0 === i.sizeAsKeys &&
          -1 !==
            [
              "top-left",
              "top",
              "top-right",
              "bottom-left",
              "bottom",
              "bottom-right"
            ].indexOf(i.position) &&
          s.outerWidth(a.outerWidth());
    },
    _createEvents: function() {
      var n = this,
        i = this.element,
        s = this.options,
        e = i.parent(),
        t = e.find(".keys");
      t.on(C.events.click, ".key", function(e) {
        var t = k(this);
        if ("&larr;" !== t.data("key") && "&times;" !== t.data("key")) {
          if (0 < s.keyLength && String(n.value).length === s.keyLength)
            return !1;
          (n.value = n.value + "" + t.data("key")),
            !0 === s.shuffle && (n.shuffle(), n._createKeys()),
            !0 === s.dynamicPosition &&
              ((s.position = n.positions[H.random(0, n.positions.length - 1)]),
              n._setKeysPosition()),
            H.exec(s.onKey, [t.data("key"), n.value], i[0]),
            i.fire("key", { key: t.data("key"), val: n.value });
        } else "&times;" === t.data("key") && ((n.value = ""), H.exec(s.onClear, null, i[0]), i.fire("clear")), "&larr;" === t.data("key") && ((n.value = n.value.substring(0, n.value.length - 1)), H.exec(s.onBackspace, [n.value], i[0]), i.fire("backspace"));
        !0 === s.showValue &&
          ("INPUT" === i[0].tagName ? i.val(n.value) : i.text(n.value)),
          i.trigger("change"),
          H.exec(s.onChange, [n.value], i[0]),
          e.preventDefault(),
          e.stopPropagation();
      }),
        e.on(C.events.click, function(e) {
          !0 !== s.open &&
            (!0 === t.hasClass("open")
              ? t.removeClass("open")
              : t.addClass("open"),
            e.preventDefault(),
            e.stopPropagation());
        }),
        null !== s.target &&
          i.on(C.events.change, function() {
            var e = k(s.target);
            0 !== e.length &&
              ("INPUT" === e[0].tagName ? e.val(n.value) : e.text(n.value));
          });
    },
    shuffle: function() {
      for (
        var e = this.element, t = this.options, n = 0;
        n < t.shuffleCount;
        n++
      )
        this.keys_to_work = this.keys_to_work.shuffle();
      H.exec(t.onShuffle, [this.keys_to_work, this.keys], e[0]),
        e.fire("shuffle", { keys: this.keys, keysToWork: this.keys_to_work });
    },
    shuffleKeys: function(e) {
      void 0 === e && (e = this.options.shuffleCount);
      for (var t = 0; t < e; t++)
        this.keys_to_work = this.keys_to_work.shuffle();
      this._createKeys();
    },
    val: function(e) {
      if (void 0 === e) return this.value;
      (this.value = e),
        "INPUT" === this.element[0].tagName
          ? this.element.val(e)
          : this.element.text(e);
    },
    open: function() {
      this.element
        .parent()
        .find(".keys")
        .addClass("open");
    },
    close: function() {
      this.element
        .parent()
        .find(".keys")
        .removeClass("open");
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    setPosition: function(e) {
      var t = void 0 !== e ? e : this.element.attr("data-position");
      -1 !== this.positions.indexOf(t) &&
        ((this.options.position = t), this._setKeysPosition());
    },
    changeAttribute: function(e) {
      switch (e) {
        case "disabled":
          this.toggleState();
          break;
        case "data-position":
          this.setPosition();
      }
    },
    destroy: function() {
      var e = this.element,
        t = this.keypad,
        n = t.find(".keys");
      return (
        t.off(C.events.click),
        n.off(C.events.click, ".key"),
        e.off(C.events.change),
        e
      );
    }
  };
  C.plugin("keypad", Xe),
    k(document).on(C.events.click, function() {
      var e = k(".keypad .keys");
      k.each(e, function() {
        k(this).hasClass("keep-open") || k(this).removeClass("open");
      });
    });
  var $e = {
    templateBeginToken: "<%",
    templateEndToken: "%>",
    paginationDistance: 5,
    paginationShortMode: !0,
    thousandSeparator: ",",
    decimalSeparator: ",",
    sortTarget: "li",
    sortClass: null,
    sortDir: "asc",
    sortInitial: !1,
    filterClass: null,
    filter: null,
    filterString: "",
    filters: null,
    source: null,
    showItemsSteps: !1,
    showSearch: !1,
    showListInfo: !1,
    showPagination: !1,
    showActivity: !0,
    muteList: !0,
    items: -1,
    itemsSteps: "all, 10,25,50,100",
    itemsAllTitle: "Show all",
    listItemsCountTitle: "Show entries:",
    listSearchTitle: "Search:",
    listInfoTitle: "Showing $1 to $2 of $3 entries",
    paginationPrevTitle: "Prev",
    paginationNextTitle: "Next",
    activityType: "cycle",
    activityStyle: "color",
    activityTimeout: 100,
    searchWrapper: null,
    rowsWrapper: null,
    infoWrapper: null,
    paginationWrapper: null,
    clsComponent: "",
    clsList: "",
    clsListItem: "",
    clsListTop: "",
    clsItemsCount: "",
    clsSearch: "",
    clsListBottom: "",
    clsListInfo: "",
    clsListPagination: "",
    clsPagination: "",
    onDraw: C.noop,
    onDrawItem: C.noop,
    onSortStart: C.noop,
    onSortStop: C.noop,
    onSortItemSwitch: C.noop,
    onSearch: C.noop,
    onRowsCountChange: C.noop,
    onDataLoad: C.noop,
    onDataLoaded: C.noop,
    onDataLoadError: C.noop,
    onFilterItemAccepted: C.noop,
    onFilterItemDeclined: C.noop,
    onListCreate: C.noop
  };
  (C.listSetup = function(e) {
    $e = k.extend({}, $e, e);
  }),
    window.metroListSetup,
    C.listSetup(window.metroListSetup);
  var Ze = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, $e, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.currentPage = 1),
        (this.pagesCount = 1),
        (this.filterString = ""),
        (this.data = null),
        (this.activity = null),
        (this.busy = !1),
        (this.filters = []),
        (this.wrapperInfo = null),
        (this.wrapperSearch = null),
        (this.wrapperRows = null),
        (this.wrapperPagination = null),
        (this.filterIndex = null),
        (this.filtersIndexes = []),
        (this.itemTemplate = null),
        (this.sort = { dir: "asc", colIndex: 0 }),
        (this.header = null),
        (this.items = []),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var t = this,
        n = this.element,
        i = this.options;
      C.checkRuntime(n, "list"),
        null !== i.source
          ? (H.exec(i.onDataLoad, [i.source], n[0]),
            n.fire("dataload", { source: i.source }),
            k.json(i.source).then(
              function(e) {
                H.exec(i.onDataLoaded, [i.source, e], n[0]),
                  n.fire("dataloaded", { source: i.source, data: e }),
                  t._build(e);
              },
              function(e) {
                H.exec(i.onDataLoadError, [i.source, e], n[0]),
                  n.fire("dataloaderror", { source: i.source, xhr: e });
              }
            ))
          : t._build();
    },
    _build: function(e) {
      var t = this.element,
        n = this.options;
      H.isValue(e) ? this._createItemsFromJSON(e) : this._createItemsFromHTML(),
        this._createStructure(),
        this._createEvents(),
        H.exec(n.onListCreate, null, t[0]),
        t.fire("listcreate");
    },
    _createItemsFromHTML: function() {
      var e = this,
        t = this.element,
        n = this.options;
      (this.items = []),
        k.each(t.children(n.sortTarget), function() {
          e.items.push(this);
        });
    },
    _createItemsFromJSON: function(e) {
      var n = this,
        i = this.options;
      (this.items = []),
        H.isValue(e.template) && (this.itemTemplate = e.template),
        H.isValue(e.header) && (this.header = e.header),
        H.isValue(e.data) &&
          k.each(e.data, function() {
            var e,
              t = document.createElement("li");
            H.isValue(n.itemTemplate) &&
              ((e = C.template(n.itemTemplate, this, {
                beginToken: i.templateBeginToken,
                endToken: i.templateEndToken
              })),
              (t.innerHTML = e),
              n.items.push(t));
          });
    },
    _createTopBlock: function() {
      var e,
        t,
        n,
        i = this,
        s = this.element,
        a = this.options,
        o = k("<div>")
          .addClass("list-top")
          .addClass(a.clsListTop)
          .insertBefore(s);
      return (
        (e = H.isValue(this.wrapperSearch)
          ? this.wrapperSearch
          : k("<div>")
              .addClass("list-search-block")
              .addClass(a.clsSearch)
              .appendTo(o)),
        k("<input>")
          .attr("type", "text")
          .appendTo(e)
          .input({ prepend: a.listSearchTitle }),
        !0 !== a.showSearch && e.hide(),
        (t = H.isValue(this.wrapperRows)
          ? this.wrapperRows
          : k("<div>")
              .addClass("list-rows-block")
              .addClass(a.clsItemsCount)
              .appendTo(o)),
        (n = k("<select>").appendTo(t)),
        k.each(H.strToArray(a.itemsSteps), function() {
          var e = k("<option>")
            .attr("value", "all" === this ? -1 : this)
            .text("all" === this ? a.itemsAllTitle : this)
            .appendTo(n);
          parseInt(this) === parseInt(a.items) &&
            e.attr("selected", "selected");
        }),
        n.select({
          filter: !1,
          prepend: a.listItemsCountTitle,
          onChange: function(e) {
            parseInt(e) !== parseInt(a.items) &&
              ((a.items = parseInt(e)),
              (i.currentPage = 1),
              i._draw(),
              H.exec(a.onRowsCountChange, [e], s[0]),
              s.fire("rowscountchange", { val: e }));
          }
        }),
        !0 !== a.showItemsSteps && t.hide(),
        o
      );
    },
    _createBottomBlock: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = k("<div>")
          .addClass("list-bottom")
          .addClass(i.clsListBottom)
          .insertAfter(n);
      return (
        (e = k("<div>")
          .addClass("list-info")
          .addClass(i.clsListInfo)
          .appendTo(s)),
        !0 !== i.showListInfo && e.hide(),
        (t = k("<div>")
          .addClass("list-pagination")
          .addClass(i.clsListPagination)
          .appendTo(s)),
        !0 !== i.showPagination && t.hide(),
        s
      );
    },
    _createStructure: function() {
      var e,
        t,
        n = this,
        i = this.element,
        s = this.options,
        a = k(s.searchWrapper),
        o = k(s.infoWrapper),
        r = k(s.rowsWrapper),
        l = k(s.paginationWrapper);
      0 < a.length && (this.wrapperSearch = a),
        0 < o.length && (this.wrapperInfo = o),
        0 < r.length && (this.wrapperRows = r),
        0 < l.length && (this.wrapperPagination = l),
        i.parent().hasClass("list-component")
          ? (e = i.parent())
          : ((e = k("<div>")
              .addClass("list-component")
              .insertBefore(i)),
            i.appendTo(e)),
        e.addClass(s.clsComponent),
        (this.activity = k("<div>")
          .addClass("list-progress")
          .appendTo(e)),
        k("<div>")
          .activity({ type: s.activityType, style: s.activityStyle })
          .appendTo(this.activity),
        !0 !== s.showActivity && this.activity.css({ visibility: "hidden" }),
        i.addClass(s.clsList),
        this._createTopBlock(),
        this._createBottomBlock(),
        H.isValue(s.filterString) && (this.filterString = s.filterString),
        H.isValue(s.filter) &&
          (!1 === (t = H.isFunc(s.filter)) && (t = H.func(s.filter)),
          (n.filterIndex = n.addFilter(t))),
        H.isValue(s.filters) &&
          k.each(H.strToArray(s.filters), function() {
            !1 !== (t = H.isFunc(this)) &&
              n.filtersIndexes.push(n.addFilter(t));
          }),
        (this.currentPage = 1),
        this.sorting(s.sortClass, s.sortDir, !0);
    },
    _createEvents: function() {
      var e,
        i = this,
        t = this.element.parent();
      function n(e) {
        var t = k(e),
          n = t.parent();
        n.hasClass("active") ||
          (n.hasClass("service")
            ? "prev" === t.data("page")
              ? (i.currentPage--, 0 === i.currentPage && (i.currentPage = 1))
              : (i.currentPage++,
                i.currentPage > i.pagesCount && (i.currentPage = i.pagesCount))
            : (i.currentPage = t.data("page")),
          i._draw());
      }
      t.find(".list-search-block input").on(C.events.inputchange, function() {
        (i.filterString = this.value.trim().toLowerCase()),
          ":" !== i.filterString[i.filterString.length - 1] &&
            ((i.currentPage = 1), i._draw());
      }),
        H.isValue(this.wrapperSearch) &&
          0 < (e = this.wrapperSearch.find("input")).length &&
          e.on(C.events.inputchange, function() {
            (i.filterString = this.value.trim().toLowerCase()),
              ":" !== i.filterString[i.filterString.length - 1] &&
                ((i.currentPage = 1), i._draw());
          }),
        t.on(C.events.click, ".pagination .page-link", function() {
          n(this);
        }),
        H.isValue(this.wrapperPagination) &&
          this.wrapperPagination.on(
            C.events.click,
            ".pagination .page-link",
            function() {
              n(this);
            }
          );
    },
    _info: function(e, t, n) {
      var i,
        s = this.element,
        a = this.options,
        o = s.parent(),
        r = H.isValue(this.wrapperInfo)
          ? this.wrapperInfo
          : o.find(".list-info");
      0 !== r.length &&
        (n < t && (t = n),
        0 === this.items.length && (e = t = n = 0),
        (i = (i = (i = (i = a.listInfoTitle).replace("$1", e)).replace(
          "$2",
          t
        )).replace("$3", n)),
        r.html(i));
    },
    _paging: function(e) {
      var t = this.element,
        n = this.options,
        i = t.parent();
      (this.pagesCount = Math.ceil(e / n.items)),
        lt({
          length: e,
          rows: n.items,
          current: this.currentPage,
          target: H.isValue(this.wrapperPagination)
            ? this.wrapperPagination
            : i.find(".list-pagination"),
          claPagination: n.clsPagination,
          prevTitle: n.paginationPrevTitle,
          nextTitle: n.paginationNextTitle,
          distance: !0 === n.paginationShortMode ? n.paginationDistance : 0
        });
    },
    _filter: function() {
      var e,
        t,
        n,
        i,
        s,
        a,
        o = this,
        r = this.element,
        l = this.options;
      return (
        H.isValue(this.filterString) || 0 < this.filters.length
          ? ((e = this.items.filter(function(e) {
              if (((n = ""), H.isValue(l.filterClass))) {
                if (0 < (i = e.getElementsByClassName(l.filterClass)).length)
                  for (t = 0; t < i.length; t++) n += i[t].textContent;
              } else n = e.textContent;
              if (
                ((s = n
                  .replace(/[\n\r]+|[\s]{2,}/g, " ")
                  .trim()
                  .toLowerCase()),
                !0 ===
                  (a =
                    !H.isValue(o.filterString) ||
                    -1 < s.indexOf(o.filterString)) && 0 < o.filters.length)
              )
                for (t = 0; t < o.filters.length; t++)
                  if (!0 !== H.exec(o.filters[t], [e])) {
                    a = !1;
                    break;
                  }
              return (
                a
                  ? (H.exec(l.onFilterItemAccepted, [e], r[0]),
                    r.fire("filteritemaccepted", { item: e }))
                  : (H.exec(l.onFilterItemDeclined, [e], r[0]),
                    r.fire("filteritemdeclined", { item: e })),
                a
              );
            })),
            H.exec(l.onSearch, [o.filterString, e], r[0]),
            r.fire("search", { search: o.filterString, items: e }))
          : (e = this.items),
        e
      );
    },
    _draw: function(e) {
      var t,
        n,
        i = this.element,
        s = this.options,
        a = -1 === s.items ? 0 : s.items * (this.currentPage - 1),
        o = -1 === s.items ? this.items.length - 1 : a + s.items - 1;
      for (
        n = this._filter(), i.children(s.sortTarget).remove(), t = a;
        t <= o;
        t++
      )
        H.isValue(n[t]) &&
          k(n[t])
            .addClass(s.clsListItem)
            .appendTo(i),
          H.exec(s.onDrawItem, [n[t]], i[0]),
          i.fire("drawitem", { item: n[t] });
      this._info(1 + a, 1 + o, n.length),
        this._paging(n.length),
        this.activity.hide(),
        H.exec(s.onDraw, null, i[0]),
        i.fire("draw"),
        void 0 !== e && H.exec(e, [i], i[0]);
    },
    _getItemContent: function(e) {
      var t,
        n,
        i,
        s,
        a = this.options,
        o = k(e),
        r = H.isValue(o.data("formatMask")) ? o.data("formatMask") : null;
      if (H.isValue(a.sortClass)) {
        if (((i = ""), 0 < (n = k(e).find("." + a.sortClass)).length))
          for (t = 0; t < n.length; t++) i += n[t].textContent;
        s = 0 < n.length ? n[0].getAttribute("data-format") : "";
      } else (i = e.textContent), (s = e.getAttribute("data-format"));
      if (
        ((i = ("" + i)
          .toLowerCase()
          .replace(/[\n\r]+|[\s]{2,}/g, " ")
          .trim()),
        H.isValue(s))
      )
        switch (
          (-1 === ["number", "int", "integer", "float", "money"].indexOf(s) ||
            ("," === a.thousandSeparator && "." === a.decimalSeparator) ||
            (i = H.parseNumber(i, a.thousandSeparator, a.decimalSeparator)),
          s)
        ) {
          case "date":
            i = H.isValue(r) ? i.toDate(r) : new Date(i);
            break;
          case "number":
            i = Number(i);
            break;
          case "int":
          case "integer":
            i = parseInt(i);
            break;
          case "float":
            i = parseFloat(i);
            break;
          case "money":
            i = H.parseMoney(i);
            break;
          case "card":
            i = H.parseCard(i);
            break;
          case "phone":
            i = H.parsePhone(i);
        }
      return i;
    },
    deleteItem: function(e) {
      var t,
        n,
        i = [],
        s = H.isFunc(e);
      for (t = 0; t < this.items.length; t++)
        (n = this.items[t]),
          s
            ? H.exec(e, [n]) && i.push(t)
            : n.textContent.contains(e) && i.push(t);
      return (this.items = H.arrayDeleteByMultipleKeys(this.items, i)), this;
    },
    draw: function() {
      return this._draw();
    },
    sorting: function(e, t, n) {
      var a = this,
        o = this.element,
        r = this.options;
      return (
        H.isValue(e) && (r.sortClass = e),
        H.isValue(t) && -1 < ["asc", "desc"].indexOf(t) && (r.sortDir = t),
        H.exec(r.onSortStart, [this.items], o[0]),
        o.fire("sortstart", { items: this.items }),
        this.items.sort(function(e, t) {
          var n = a._getItemContent(e),
            i = a._getItemContent(t),
            s = 0;
          return (
            n < i && (s = "asc" === r.sortDir ? -1 : 1),
            i < n && (s = "asc" === r.sortDir ? 1 : -1),
            0 !== s &&
              (H.exec(r.onSortItemSwitch, [e, t, s], o[0]),
              o.fire("sortitemswitch", { a: e, b: t, result: s })),
            s
          );
        }),
        H.exec(r.onSortStop, [this.items], o[0]),
        o.fire("sortstop", { items: this.items }),
        !0 === n && this._draw(),
        this
      );
    },
    filter: function(e) {
      (this.filterString = e.trim().toLowerCase()),
        (this.currentPage = 1),
        this._draw();
    },
    loadData: function(e) {
      var n = this,
        i = this.element,
        s = this.options;
      !0 === H.isValue(e) &&
        ((s.source = e),
        H.exec(s.onDataLoad, [s.source], i[0]),
        i.fire("dataload", { source: s.source }),
        k.json(s.source).then(
          function(e) {
            var t;
            H.exec(s.onDataLoaded, [s.source, e], i[0]),
              i.fire("dataloaded", { source: s.source, data: e }),
              n._createItemsFromJSON(e),
              i.html(""),
              H.isValue(s.filterString) && (n.filterString = s.filterString),
              H.isValue(s.filter) &&
                (!1 === (t = H.isFunc(s.filter)) && (t = H.func(s.filter)),
                (n.filterIndex = n.addFilter(t))),
              H.isValue(s.filters) &&
                k.each(H.strToArray(s.filters), function() {
                  !1 !== (t = H.isFunc(this)) &&
                    n.filtersIndexes.push(n.addFilter(t));
                }),
              (n.currentPage = 1),
              n.sorting(s.sortClass, s.sortDir, !0);
          },
          function(e) {
            H.exec(s.onDataLoadError, [s.source, e], i[0]),
              i.fire("dataloaderror", { source: s.source, xhr: e });
          }
        ));
    },
    next: function() {
      0 !== this.items.length &&
        (this.currentPage++,
        this.currentPage > this.pagesCount
          ? (this.currentPage = this.pagesCount)
          : this._draw());
    },
    prev: function() {
      0 !== this.items.length &&
        (this.currentPage--,
        0 !== this.currentPage ? this._draw() : (this.currentPage = 1));
    },
    first: function() {
      0 !== this.items.length && ((this.currentPage = 1), this._draw());
    },
    last: function() {
      0 !== this.items.length &&
        ((this.currentPage = this.pagesCount), this._draw());
    },
    page: function(e) {
      e <= 0 && (e = 1),
        e > this.pagesCount && (e = this.pagesCount),
        (this.currentPage = e),
        this._draw();
    },
    addFilter: function(e, t) {
      var n = H.isFunc(e);
      if (!1 !== n)
        return (
          this.filters.push(n),
          !0 === t && ((this.currentPage = 1), this.draw()),
          this.filters.length - 1
        );
    },
    removeFilter: function(e, t) {
      return (
        H.arrayDeleteByKey(this.filters, e),
        !0 === t && ((this.currentPage = 1), this.draw()),
        this
      );
    },
    removeFilters: function(e) {
      (this.filters = []), !0 === e && ((this.currentPage = 1), this.draw());
    },
    getFilters: function() {
      return this.filters;
    },
    getFilterIndex: function() {
      return this.filterIndex;
    },
    getFiltersIndexes: function() {
      return this.filtersIndexes;
    },
    changeAttribute: function(e) {
      var t,
        n,
        i,
        s = this,
        a = this.element,
        o = this.options;
      switch (e) {
        case "data-sort-dir":
          (i = a.attr("data-sort-dir")),
            H.isValue(i) &&
              ((o.sortDir = i), s.sorting(o.sortClass, o.sortDir, !0));
          break;
        case "data-sort-source":
          (n = a.attr("data-sort-source")),
            H.isValue(n) &&
              ((o.sortClass = n), s.sorting(o.sortClass, o.sortDir, !0));
          break;
        case "data-filter-string":
          (t = a.attr("data-filter-string")),
            H.isValue(target) &&
              ((o.filterString = t), s.filter(o.filterString));
      }
    },
    destroy: function() {
      var e,
        t = this.element,
        n = t.parent();
      return (
        n.find(".list-search-block input").off(C.events.inputchange),
        H.isValue(this.wrapperSearch) &&
          0 < (e = this.wrapperSearch.find("input")).length &&
          e.off(C.events.inputchange),
        n.off(C.events.click, ".pagination .page-link"),
        H.isValue(this.wrapperPagination) &&
          this.wrapperPagination.off(C.events.click, ".pagination .page-link"),
        t
      );
    }
  };
  C.plugin("list", Ze);
  var et = {
    selectable: !1,
    checkStyle: 1,
    duration: 100,
    view: C.listView.LIST,
    selectCurrent: !0,
    structure: {},
    onNodeInsert: C.noop,
    onNodeDelete: C.noop,
    onNodeClean: C.noop,
    onCollapseNode: C.noop,
    onExpandNode: C.noop,
    onGroupNodeClick: C.noop,
    onNodeClick: C.noop,
    onListViewCreate: C.noop
  };
  (C.listViewSetup = function(e) {
    et = k.extend({}, et, e);
  }),
    window.metroListViewSetup,
    C.listViewSetup(window.metroListViewSetup);
  var tt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, et, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "listview"),
        this._createView(),
        this._createEvents(),
        H.exec(t.onListViewCreate, null, e[0]),
        e.fire("listviewcreate");
    },
    _createIcon: function(e) {
      var t, n;
      return (
        (n = H.isTag(e) ? k(e) : k("<img>").attr("src", e)),
        (t = k("<span>").addClass("icon")).html(n.outerHTML()),
        t
      );
    },
    _createCaption: function(e) {
      return k("<div>")
        .addClass("caption")
        .html(e);
    },
    _createContent: function(e) {
      return k("<div>")
        .addClass("content")
        .html(e);
    },
    _createToggle: function() {
      return k("<span>").addClass("node-toggle");
    },
    _createNode: function(n) {
      var i,
        e = this.options;
      if (((i = k("<li>")), void 0 !== n.caption || void 0 !== n.content)) {
        var t = k("<div>").addClass("data");
        i.prepend(t),
          void 0 !== n.caption && t.append(this._createCaption(n.caption)),
          void 0 !== n.content && t.append(this._createContent(n.content));
      }
      return (
        void 0 !== n.icon && i.prepend(this._createIcon(n.icon)),
        0 < H.objectLength(e.structure) &&
          k.each(e.structure, function(e, t) {
            void 0 !== n[e] &&
              k("<div>")
                .addClass("node-data item-data-" + e)
                .addClass(n[t])
                .html(n[e])
                .appendTo(i);
          }),
        i
      );
    },
    _createView: function() {
      var i = this,
        e = this.element,
        s = this.options,
        t = e.find("li"),
        a = H.objectLength(s.structure);
      e.addClass("listview"),
        e.find("ul").addClass("listview"),
        k.each(t, function() {
          var t = k(this);
          if (void 0 !== t.data("caption") || void 0 !== t.data("content")) {
            var e = k("<div>").addClass("data");
            t.prepend(e),
              void 0 !== t.data("caption") &&
                e.append(i._createCaption(t.data("caption"))),
              void 0 !== t.data("content") &&
                e.append(i._createContent(t.data("content")));
          }
          if (
            (void 0 !== t.data("icon") &&
              t.prepend(i._createIcon(t.data("icon"))),
            0 < t.children("ul").length
              ? (t.addClass("node-group"),
                t.append(i._createToggle()),
                !0 !== t.data("collapsed") && t.addClass("expanded"))
              : t.addClass("node"),
            t.hasClass("node"))
          ) {
            var n = k(
              "<input type='checkbox' data-role='checkbox' data-style='" +
                s.checkStyle +
                "'>"
            );
            n.data("node", t), t.prepend(n);
          }
          0 < a &&
            k.each(s.structure, function(e) {
              void 0 !== t.data(e) &&
                k("<div>")
                  .addClass("node-data item-data-" + e)
                  .addClass(t.data(e))
                  .html(t.data(e))
                  .appendTo(t);
            });
        }),
        this.toggleSelectable(),
        this.view(s.view);
    },
    _createEvents: function() {
      var t = this,
        n = this.element,
        i = this.options;
      n.on(C.events.click, ".node", function() {
        var e = k(this);
        n.find(".node").removeClass("current"),
          e.toggleClass("current"),
          !0 === i.selectCurrent &&
            (n.find(".node").removeClass("current-select"),
            e.toggleClass("current-select")),
          H.exec(i.onNodeClick, [e], n[0]),
          n.fire("nodeclick", { node: e });
      }),
        n.on(C.events.click, ".node-toggle", function() {
          var e = k(this).closest("li");
          t.toggleNode(e);
        }),
        n.on(C.events.click, ".node-group > .data > .caption", function() {
          var e = k(this).closest("li");
          n.find(".node-group").removeClass("current-group"),
            e.addClass("current-group"),
            H.exec(i.onGroupNodeClick, [e], n[0]),
            n.fire("groupnodeclick", { node: e });
        }),
        n.on(C.events.dblclick, ".node-group > .data > .caption", function() {
          var e = k(this).closest("li");
          t.toggleNode(e);
        });
    },
    view: function(e) {
      var n = this.element,
        t = this.options;
      if (void 0 === e) return t.view;
      (t.view = e),
        k.each(C.listView, function(e, t) {
          n.removeClass("view-" + t), n.find("ul").removeClass("view-" + t);
        }),
        n.addClass("view-" + t.view),
        n.find("ul").addClass("view-" + t.view);
    },
    toggleNode: function(e) {
      var t,
        n = this.element,
        i = this.options;
      (e = k(e)).hasClass("node-group") &&
        (e.toggleClass("expanded"),
        (t = !0 !== e.hasClass("expanded") ? "slideUp" : "slideDown"),
        H.exec(i.onCollapseNode, [e], n[0]),
        n.fire("collapsenode", { node: e }),
        e.children("ul")[t](i.duration));
    },
    toggleSelectable: function() {
      var e = this.element,
        t = !0 === this.options.selectable ? "addClass" : "removeClass";
      e[t]("selectable"), e.find("ul")[t]("selectable");
    },
    add: function(e, t) {
      var n,
        i,
        s = this.element,
        a = this.options;
      if (null === e) n = s;
      else {
        if (!(e = k(e)).hasClass("node-group")) return;
        0 === (n = e.children("ul")).length &&
          ((n = k("<ul>")
            .addClass("listview")
            .addClass("view-" + a.view)
            .appendTo(e)),
          this._createToggle().appendTo(e),
          e.addClass("expanded"));
      }
      (i = this._createNode(t)).addClass("node").appendTo(n);
      var o = k("<input type='checkbox'>");
      return (
        o.data("node", i),
        i.prepend(o),
        C.makePlugin(o, "checkbox", {}),
        H.exec(a.onNodeInsert, [i, e, n], s[0]),
        s.fire("nodeinsert", { newNode: i, parentNode: e, list: n }),
        i
      );
    },
    addGroup: function(e) {
      var t,
        n = this.element,
        i = this.options;
      return (
        delete e.icon,
        (t = this._createNode(e)).addClass("node-group").appendTo(n),
        t.append(this._createToggle()),
        t.addClass("expanded"),
        t.append(
          k("<ul>")
            .addClass("listview")
            .addClass("view-" + i.view)
        ),
        H.exec(i.onNodeInsert, [t, null, n], n[0]),
        n.fire("nodeinsert", { newNode: t, parentNode: null, list: n }),
        t
      );
    },
    insertBefore: function(e, t) {
      var n,
        i,
        s,
        a = this.element,
        o = this.options;
      if ((e = k(e)).length)
        return (
          (n = this._createNode(t)).addClass("node").insertBefore(e),
          (i = n.closest(".node")),
          (s = n.closest("ul")),
          H.exec(o.onNodeInsert, [n, i, s], a[0]),
          a.fire("nodeinsert", { newNode: n, parentNode: i, list: s }),
          n
        );
    },
    insertAfter: function(e, t) {
      var n,
        i,
        s,
        a = this.element,
        o = this.options;
      if ((e = k(e)).length)
        return (
          (n = this._createNode(t)).addClass("node").insertAfter(e),
          (i = n.closest(".node")),
          (s = n.closest("ul")),
          H.exec(o.onNodeInsert, [n, i, s], a[0]),
          a.fire("nodeinsert", { newNode: n, parentNode: i, list: s }),
          n
        );
    },
    del: function(e) {
      var t = this.element,
        n = this.options;
      if ((e = k(e)).length) {
        var i = e.closest("ul"),
          s = i.closest("li");
        e.remove(),
          0 !== i.children().length ||
            i.is(t) ||
            (i.remove(),
            s.removeClass("expanded"),
            s.children(".node-toggle").remove()),
          H.exec(n.onNodeDelete, [e], t[0]),
          t.fire("nodedelete", { node: e });
      }
    },
    clean: function(e) {
      var t = this.element,
        n = this.options;
      (e = k(e)).length &&
        (e.children("ul").remove(),
        e.removeClass("expanded"),
        e.children(".node-toggle").remove(),
        H.exec(n.onNodeClean, [e], t[0]),
        t.fire("nodeclean", { node: e }));
    },
    getSelected: function() {
      var e = this.element,
        t = [];
      return (
        k.each(e.find(":checked"), function() {
          var e = k(this);
          t.push(e.closest(".node")[0]);
        }),
        t
      );
    },
    clearSelected: function() {
      this.element.find(":checked").prop("checked", !1),
        this.element.trigger("change");
    },
    selectAll: function(e) {
      this.element.find(".node > .checkbox input").prop("checked", !1 !== e),
        this.element.trigger("change");
    },
    changeAttribute: function(e) {
      var t,
        n = this,
        i = this.element,
        s = this.options;
      switch (e) {
        case "data-view":
          (t = "view-" + i.attr("data-view")), n.view(t);
          break;
        case "data-selectable":
          (s.selectable = !0 === JSON.parse(i.attr("data-selectable"))),
            n.toggleSelectable();
      }
    },
    destroy: function() {
      var e = this.element;
      return (
        e.off(C.events.click, ".node"),
        e.off(C.events.click, ".node-toggle"),
        e.off(C.events.click, ".node-group > .data > .caption"),
        e.off(C.events.dblclick, ".node-group > .data > .caption"),
        e
      );
    }
  };
  C.plugin("listview", tt);
  var nt = {
    effect: "slide",
    effectFunc: "linear",
    duration: METRO_ANIMATION_DURATION,
    controlPrev: "<span class='default-icon-left-arrow'></span>",
    controlNext: "<span class='default-icon-right-arrow'></span>",
    controlTitle: "Master, page $1 of $2",
    backgroundImage: "",
    clsMaster: "",
    clsControls: "",
    clsControlPrev: "",
    clsControlNext: "",
    clsControlTitle: "",
    clsPages: "",
    clsPage: "",
    onBeforePage: C.noop_true,
    onBeforeNext: C.noop_true,
    onBeforePrev: C.noop_true,
    onNextPage: C.noop,
    onPrevPage: C.noop,
    onMasterCreate: C.noop
  };
  (C.masterSetup = function(e) {
    nt = k.extend({}, nt, e);
  }),
    window.metroMasterSetup,
    C.masterSetup(window.metroMasterSetup);
  var it = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, nt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.pages = []),
        (this.currentIndex = 0),
        (this.isAnimate = !1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "master"),
        e.addClass("master").addClass(t.clsMaster),
        e.css({ backgroundImage: "url(" + t.backgroundImage + ")" }),
        this._createControls(),
        this._createPages(),
        this._createEvents(),
        H.exec(t.onMasterCreate, null, e[0]),
        e.fire("mastercreate");
    },
    _createControls: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = n.find(".page");
      (t = String(i.controlTitle).replace("$1", "1")),
        (t = String(t).replace("$2", s.length)),
        k.each(["top", "bottom"], function() {
          (e = k("<div>")
            .addClass("controls controls-" + this)
            .addClass(i.clsControls)
            .appendTo(n)),
            k("<span>")
              .addClass("prev")
              .addClass(i.clsControlPrev)
              .html(i.controlPrev)
              .appendTo(e),
            k("<span>")
              .addClass("next")
              .addClass(i.clsControlNext)
              .html(i.controlNext)
              .appendTo(e),
            k("<span>")
              .addClass("title")
              .addClass(i.clsControlTitle)
              .html(t)
              .appendTo(e);
        }),
        this._enableControl("prev", !1);
    },
    _enableControl: function(e, t) {
      var n = this.element.find(".controls ." + e);
      !0 === t ? n.removeClass("disabled") : n.addClass("disabled");
    },
    _setTitle: function() {
      var e = this.element.find(".controls .title"),
        t = this.options.controlTitle.replace("$1", this.currentIndex + 1);
      (t = t.replace("$2", String(this.pages.length))), e.html(t);
    },
    _createPages: function() {
      var t = this,
        n = this.element,
        i = this.options,
        e = n.find(".pages"),
        s = n.find(".page");
      0 === e.length &&
        (e = k("<div>")
          .addClass("pages")
          .appendTo(n)),
        e.addClass(i.clsPages),
        k.each(s, function() {
          var e = k(this);
          void 0 !== e.data("cover")
            ? n.css({ backgroundImage: "url(" + e.data("cover") + ")" })
            : n.css({ backgroundImage: "url(" + i.backgroundImage + ")" }),
            e.css({ left: "100%" }),
            e.addClass(i.clsPage).hide(0),
            t.pages.push(e);
        }),
        s.appendTo(e),
        void (this.currentIndex = 0) !== this.pages[this.currentIndex] &&
          (void 0 !== this.pages[this.currentIndex].data("cover") &&
            n.css({
              backgroundImage:
                "url(" + this.pages[this.currentIndex].data("cover") + ")"
            }),
          this.pages[this.currentIndex].css("left", "0").show(0),
          setTimeout(function() {
            e.css({ height: t.pages[0].outerHeight(!0) + 2 });
          }, 0));
    },
    _createEvents: function() {
      var e = this,
        t = this.element,
        n = this.options;
      t.on(C.events.click, ".controls .prev", function() {
        !0 !== e.isAnimate &&
          !0 ===
            H.exec(n.onBeforePrev, [
              e.currentIndex,
              e.pages[e.currentIndex],
              t
            ]) &&
          !0 ===
            H.exec(n.onBeforePage, [
              "prev",
              e.currentIndex,
              e.pages[e.currentIndex],
              t
            ]) &&
          e.prev();
      }),
        t.on(C.events.click, ".controls .next", function() {
          !0 !== e.isAnimate &&
            !0 ===
              H.exec(n.onBeforeNext, [
                e.currentIndex,
                e.pages[e.currentIndex],
                t
              ]) &&
            !0 ===
              H.exec(n.onBeforePage, [
                "next",
                e.currentIndex,
                e.pages[e.currentIndex],
                t
              ]) &&
            e.next();
        }),
        k(window).on(
          C.events.resize,
          function() {
            t.find(".pages").height(
              e.pages[e.currentIndex].outerHeight(!0) + 2
            );
          },
          { ns: t.attr("id") }
        );
    },
    _slideToPage: function(e) {
      var t, n, i;
      void 0 !== this.pages[e] &&
        this.currentIndex !== e &&
        ((i = e > this.currentIndex ? "next" : "prev"),
        (t = this.pages[this.currentIndex]),
        (n = this.pages[e]),
        (this.currentIndex = e),
        this._effect(t, n, i));
    },
    _slideTo: function(e) {
      var t,
        n,
        i = this.element,
        s = this.options,
        a = "next" === e.toLowerCase();
      if (((t = this.pages[this.currentIndex]), a)) {
        if (this.currentIndex + 1 >= this.pages.length) return;
        this.currentIndex++;
      } else {
        if (this.currentIndex - 1 < 0) return;
        this.currentIndex--;
      }
      (n = this.pages[this.currentIndex]),
        H.exec(a ? s.onNextPage : s.onPrevPage, [t, n], i[0]),
        i.fire(a ? "nextpage" : "prevpage", {
          current: t,
          next: n,
          forward: a
        }),
        this._effect(t, n, e);
    },
    _effect: function(e, t, n) {
      var i = this,
        s = this.element,
        a = this.options,
        o = s.width(),
        r = s.find(".pages");
      function l() {
        void 0 !== t.data("cover")
          ? s.css({ backgroundImage: "url(" + t.data("cover") + ")" })
          : s.css({ backgroundImage: "url(" + a.backgroundImage + ")" }),
          r.css("overflow", "initial"),
          (i.isAnimate = !1);
      }
      switch (
        (this._setTitle(),
        this.currentIndex === this.pages.length - 1
          ? this._enableControl("next", !1)
          : this._enableControl("next", !0),
        0 === this.currentIndex
          ? this._enableControl("prev", !1)
          : this._enableControl("prev", !0),
        (this.isAnimate = !0),
        setTimeout(function() {
          r.animate({ height: t.outerHeight(!0) + 2 });
        }, 0),
        r.css("overflow", "hidden"),
        a.effect)
      ) {
        case "fade":
          e.fadeOut(a.duration),
            t
              .css({ top: 0, left: 0, opacity: 0 })
              .fadeIn(a.duration, "linear", function() {
                l();
              });
          break;
        case "switch":
          e.hide(),
            t.css({ top: 0, left: 0, opacity: 0 }).show(function() {
              l();
            });
          break;
        default:
          e
            .stop(!0)
            .animate(
              { left: "next" === n ? -o : o },
              a.duration,
              a.effectFunc,
              function() {
                e.hide(0);
              }
            ),
            t
              .stop(!0)
              .css({ left: "next" === n ? o : -o })
              .show(0)
              .animate({ left: 0 }, a.duration, a.effectFunc, function() {
                l();
              });
      }
    },
    toPage: function(e) {
      this._slideToPage(e);
    },
    next: function() {
      this._slideTo("next");
    },
    prev: function() {
      this._slideTo("prev");
    },
    changeEffect: function() {
      this.options.effect = this.element.attr("data-effect");
    },
    changeEffectFunc: function() {
      this.options.effectFunc = this.element.attr("data-effect-func");
    },
    changeEffectDuration: function() {
      this.options.duration = this.element.attr("data-duration");
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-effect":
          this.changeEffect();
          break;
        case "data-effect-func":
          this.changeEffectFunc();
          break;
        case "data-duration":
          this.changeEffectDuration();
      }
    },
    destroy: function() {
      var e = this.element;
      return (
        e.off(C.events.click, ".controls .prev"),
        e.off(C.events.click, ".controls .next"),
        k(window).off(C.events.resize, { ns: e.attr("id") }),
        e
      );
    }
  };
  C.plugin("master", it);
  var st = {
    compact: "md",
    expand: "lg",
    toggle: null,
    activeState: !1,
    onMenuItemClick: C.noop,
    onNavViewCreate: C.noop
  };
  (C.navigationViewSetup = function(e) {
    st = k.extend({}, st, e);
  }),
    window.metroNavigationViewSetup,
    C.navigationViewSetup(window.metroNavigationSetup);
  var at = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, st, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.pane = null),
        (this.content = null),
        (this.paneToggle = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "navview"),
        this._createView(),
        this._createEvents(),
        H.exec(t.onNavViewCreate, null, e[0]),
        e.fire("navviewcreate");
    },
    _calcMenuHeight: function() {
      var e,
        t,
        n = this.element,
        i = 0;
      0 !== (e = n.children(".navview-pane")).length &&
        0 !== (t = e.children(".navview-menu")).length &&
        (k.each(t.prevAll(), function() {
          i += k(this).outerHeight(!0);
        }),
        k.each(t.nextAll(), function() {
          i += k(this).outerHeight(!0);
        }),
        t.css({ height: "calc(100% - " + (i + 20) + "px)" }));
    },
    _createView: function() {
      var e,
        t,
        n,
        i = this,
        s = this.element,
        a = this.options;
      s.attr("id") || s.attr("id", H.elementId("navview")),
        s
          .addClass("navview")
          .addClass(!1 !== a.compact ? "navview-compact-" + a.compact : "")
          .addClass(!1 !== a.expand ? "navview-expand-" + a.expand : ""),
        (e = s.children(".navview-pane")),
        (t = s.children(".navview-content")),
        (n = k(a.toggle)),
        this._calcMenuHeight(),
        (this.pane = 0 < e.length ? e : null),
        (this.content = 0 < t.length ? t : null),
        (this.paneToggle = 0 < n.length ? n : null),
        setTimeout(function() {
          48 === i.pane.width()
            ? s.addClass("js-compact")
            : s.removeClass("js-compact");
        }, 200);
    },
    _createEvents: function() {
      var e = this,
        t = this.element,
        n = this.options;
      t.on(C.events.click, ".pull-button, .holder", function() {
        e.pullClick(this);
      }),
        t.on(C.events.click, ".navview-menu li", function() {
          !0 === n.activeState &&
            (t.find(".navview-menu li").removeClass("active"),
            k(this).toggleClass("active"));
        }),
        t.on(C.events.click, ".navview-menu li > a", function() {
          H.exec(n.onMenuItemClick, null, this),
            t.fire("menuitemclick", { item: this });
        }),
        null !== this.paneToggle &&
          this.paneToggle.on(C.events.click, function() {
            e.pane.toggleClass("open");
          }),
        k(window).on(
          C.events.resize,
          function() {
            t.removeClass("expanded"),
              e.pane.removeClass("open"),
              k(this).width() <=
                C.media_sizes[String(n.compact).toUpperCase()] &&
                t.removeClass("compacted"),
              e._calcMenuHeight(),
              t.removeClass("js-compact"),
              setTimeout(function() {
                48 === e.pane.width() && t.addClass("js-compact");
              }, 200);
          },
          { ns: t.attr("id") }
        );
    },
    pullClick: function(e) {
      var t,
        n = this,
        i = this.element,
        s = this.pane.width() < 280,
        a = k(e);
      return (
        a &&
          a.hasClass("holder") &&
          ((t = a.parent().find("input")),
          setTimeout(function() {
            t.focus();
          }, 200)),
        n.pane.hasClass("open")
          ? n.close()
          : (!s && !i.hasClass("expanded")) || i.hasClass("compacted")
          ? (!i.hasClass("compacted") && s) || i.toggleClass("compacted")
          : i.toggleClass("expanded"),
        setTimeout(function() {
          48 === n.pane.width()
            ? i.addClass("js-compact")
            : i.removeClass("js-compact");
        }, 200),
        !0
      );
    },
    open: function() {
      this.pane.addClass("open");
    },
    close: function() {
      this.pane.removeClass("open");
    },
    toggle: function() {
      var e = this.pane;
      e.hasClass("open") ? e.removeClass("open") : e.addClass("open");
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      this.options;
      return (
        e.off(C.events.click, ".pull-button, .holder"),
        e.off(C.events.click, ".navview-menu li"),
        e.off(C.events.click, ".navview-menu li > a"),
        null !== this.paneToggle && this.paneToggle.off(C.events.click),
        k(window).off(C.events.resize, { ns: e.attr("id") }),
        e
      );
    }
  };
  C.plugin("navview", at);
  var ot = {
    container: null,
    width: 220,
    timeout: METRO_TIMEOUT,
    duration: METRO_ANIMATION_DURATION,
    distance: "100vh",
    animation: "linear",
    onClick: C.noop,
    onClose: C.noop,
    onShow: C.noop,
    onAppend: C.noop,
    onNotifyCreate: C.noop
  };
  (C.notifySetup = function(e) {
    ot = k.extend({}, ot, e);
  }),
    window.metroNotifySetup,
    C.notifySetup(window.metroNotifySetup);
  var rt = {
    container: null,
    options: {},
    notifies: [],
    setup: function(e) {
      return (
        (this.options = k.extend({}, ot, e)),
        null === rt.container && (rt.container = rt._createContainer()),
        this
      );
    },
    reset: function() {
      var e = {
        width: 220,
        timeout: METRO_TIMEOUT,
        duration: METRO_ANIMATION_DURATION,
        distance: "100vh",
        animation: "linear"
      };
      this.options = k.extend({}, ot, e);
    },
    _createContainer: function() {
      var e = k("<div>").addClass("notify-container");
      return k("body").prepend(e), e;
    },
    create: function(e, t, n) {
      var i,
        s,
        a = this,
        o = this.options,
        r = H.elementId("notify");
      if ((H.isNull(n) && (n = {}), !H.isValue(e))) return !1;
      (i = k("<div>")
        .addClass("notify")
        .attr("id", r)).css({ width: o.width }),
        t &&
          ((s = k("<div>")
            .addClass("notify-title")
            .html(t)),
          i.prepend(s)),
        k("<div>")
          .addClass("notify-message")
          .html(e)
          .appendTo(i),
        void 0 !== n &&
          (void 0 !== n.cls && i.addClass(n.cls),
          void 0 !== n.width && i.css({ width: n.width })),
        i.on(C.events.click, function() {
          H.exec(H.isValue(n.onClick) ? n.onClick : o.onClick, null, this),
            a.kill(
              k(this).closest(".notify"),
              H.isValue(n.onClose) ? n.onClose : o.onClose
            );
        }),
        null === rt.container && (rt.container = rt._createContainer()),
        i.appendTo(rt.container),
        i.hide(function() {
          H.exec(H.isValue(n.onAppend) ? n.onAppend : o.onAppend, null, i[0]),
            i
              .css({
                marginTop: H.isValue(n.distance) ? n.distance : o.distance
              })
              .fadeIn(100, function() {
                var e = H.isValue(n.duration) ? n.duration : o.duration,
                  t = H.isValue(n.animation) ? n.animation : o.animation;
                i.animate({ marginTop: 4 }, e, t, function() {
                  H.exec(o.onNotifyCreate, null, this),
                    (void 0 !== n && !0 === n.keepOpen) ||
                      setTimeout(function() {
                        a.kill(i, H.isValue(n.onClose) ? n.onClose : o.onClose);
                      }, o.timeout),
                    H.exec(
                      H.isValue(n.onShow) ? n.onShow : o.onShow,
                      null,
                      i[0]
                    );
                });
              });
        });
    },
    kill: function(e, t) {
      var n = this,
        i = this.options;
      e.off(C.events.click),
        e.fadeOut(i.duration, "linear", function() {
          H.exec(H.isValue(t) ? t : n.options.onClose, null, e[0]), e.remove();
        });
    },
    killAll: function() {
      var e = this,
        t = k(".notify");
      k.each(t, function() {
        e.kill(k(this));
      });
    }
  };
  C.notify = rt.setup();
  var lt = function(e) {
    var t, n, i, s, a, o, r;
    if (
      ((t = k.extend(
        {},
        {
          length: 0,
          rows: 0,
          current: 0,
          target: "body",
          clsPagination: "",
          prevTitle: "Prev",
          nextTitle: "Next",
          distance: 5
        },
        e
      )),
      (r = parseInt(t.distance)),
      (i = k(t.target)).html(""),
      (n = k("<ul>")
        .addClass("pagination")
        .addClass(t.clsPagination)
        .appendTo(i)),
      0 !== t.length && -1 !== t.rows)
    ) {
      t.pages = Math.ceil(t.length / t.rows);
      var l = function(e, t, n) {
        var i, s;
        return (
          (i = k("<li>")
            .addClass("page-item")
            .addClass(t)),
          (s = k("<a>")
            .addClass("page-link")
            .html(e)).data("page", n),
          s.appendTo(i),
          i
        );
      };
      if (
        ((a = l(t.prevTitle, "service prev-page", "prev")),
        n.append(a),
        n.append(l(1, 1 === t.current ? "active" : "", 1)),
        0 === r || t.pages <= 7)
      )
        for (s = 2; s < t.pages; s++)
          n.append(l(s, s === t.current ? "active" : "", s));
      else if (t.current < r) {
        for (s = 2; s <= r; s++)
          n.append(l(s, s === t.current ? "active" : "", s));
        t.pages > r && n.append(l("...", "no-link", null));
      } else if (t.current <= t.pages && t.current > t.pages - r + 1)
        for (
          t.pages > r && n.append(l("...", "no-link", null)),
            s = t.pages - r + 1;
          s < t.pages;
          s++
        )
          n.append(l(s, s === t.current ? "active" : "", s));
      else
        n.append(l("...", "no-link", null)),
          n.append(l(t.current - 1, "", t.current - 1)),
          n.append(l(t.current, "active", t.current)),
          n.append(l(t.current + 1, "", t.current + 1)),
          n.append(l("...", "no-link", null));
      return (
        (1 < t.pages || t.current < t.pages) &&
          n.append(l(t.pages, t.current === t.pages ? "active" : "", t.pages)),
        (o = l(t.nextTitle, "service next-page", "next")),
        n.append(o),
        1 === t.current && a.addClass("disabled"),
        t.current === t.pages && o.addClass("disabled"),
        0 === t.length &&
          (n.addClass("disabled"), n.children().addClass("disabled")),
        n
      );
    }
  };
  C.pagination = lt;
  var ct = {
    id: null,
    titleCaption: "",
    titleIcon: "",
    collapsible: !1,
    collapsed: !1,
    collapseDuration: METRO_ANIMATION_DURATION,
    width: "auto",
    height: "auto",
    draggable: !1,
    customButtons: null,
    clsCustomButton: "",
    clsPanel: "",
    clsTitle: "",
    clsTitleCaption: "",
    clsTitleIcon: "",
    clsContent: "",
    clsCollapseToggle: "",
    onCollapse: C.noop,
    onExpand: C.noop,
    onDragStart: C.noop,
    onDragStop: C.noop,
    onDragMove: C.noop,
    onPanelCreate: C.noop
  };
  (C.panelSetup = function(e) {
    ct = k.extend({}, ct, e);
  }),
    window.metroPanelSetup,
    C.panelSetup(window.metroPanelSetup);
  var dt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ct, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    dependencies: ["draggable", "collapse"],
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _addCustomButtons: function(e) {
      var t,
        n = this.element,
        i = this.options,
        s = n.closest(".panel").find(".panel-title"),
        a = [];
      if ("string" == typeof e && -1 < e.indexOf("{")) a = JSON.parse(e);
      else if ("string" == typeof e && H.isObject(e)) a = H.isObject(e);
      else {
        if (!("object" == typeof e && 0 < H.objectLength(e)))
          return void console.warn("Unknown format for custom buttons", e);
        a = e;
      }
      if (0 !== s.length)
        return (
          0 === (t = s.find(".custom-buttons")).length
            ? (t = k("<div>")
                .addClass("custom-buttons")
                .appendTo(s))
            : (t.find(".btn-custom").off(C.events.click), t.html("")),
          k.each(a, function() {
            var e = k("<span>");
            e
              .addClass("button btn-custom")
              .addClass(i.clsCustomButton)
              .addClass(this.cls)
              .attr("tabindex", -1)
              .html(this.html),
              e.data("action", this.onclick),
              t.prepend(e);
          }),
          s.on(C.events.click, ".btn-custom", function(e) {
            if (!H.isRightMouse(e)) {
              var t = k(this),
                n = t.data("action");
              H.exec(n, [t], this);
            }
          }),
          this
        );
      console.log("No place for custom buttons");
    },
    _create: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = k("<div>")
          .addClass("panel")
          .addClass(i.clsPanel),
        a = i.id ? i.id : H.elementId("panel"),
        o = n[0].className;
      if (
        (C.checkRuntime(n, "panel"),
        s.attr("id", a).addClass(o),
        s.insertBefore(n),
        n.appendTo(s),
        (n[0].className = ""),
        n
          .addClass("panel-content")
          .addClass(i.clsContent)
          .appendTo(s),
        "" !== i.titleCaption || "" !== i.titleIcon || !0 === i.collapsible)
      ) {
        if (
          ((e = k("<div>")
            .addClass("panel-title")
            .addClass(i.clsTitle)),
          "" !== i.titleCaption &&
            k("<span>")
              .addClass("caption")
              .addClass(i.clsTitleCaption)
              .html(i.titleCaption)
              .appendTo(e),
          "" !== i.titleIcon &&
            k(i.titleIcon)
              .addClass("icon")
              .addClass(i.clsTitleIcon)
              .appendTo(e),
          !0 === i.collapsible)
        ) {
          var r = k("<span>")
            .addClass("dropdown-toggle marker-center active-toggle")
            .addClass(i.clsCollapseToggle)
            .appendTo(e);
          C.makePlugin(n, "collapse", {
            toggleElement: r,
            duration: i.collapseDuration,
            onCollapse: i.onCollapse,
            onExpand: i.onExpand
          }),
            !0 === i.collapsed && this.collapse();
        }
        e.appendTo(s);
      }
      e &&
        H.isValue(i.customButtons) &&
        this._addCustomButtons(i.customButtons),
        !0 === i.draggable &&
          ((t = e ? e.find(".caption, .icon") : s),
          C.makePlugin(s, "draggable", {
            dragElement: t,
            onDragStart: i.onDragStart,
            onDragStop: i.onDragStop,
            onDragMove: i.onDragMove
          }));
      "auto" !== i.width &&
        0 <= parseInt(i.width) &&
        s.outerWidth(parseInt(i.width)),
        "auto" !== i.height &&
          0 <= parseInt(i.height) &&
          (s.outerHeight(parseInt(i.height)), n.css({ overflow: "auto" })),
        (this.panel = s),
        H.exec(i.onPanelCreate, null, n[0]),
        n.fire("panelcreate");
    },
    customButtons: function(e) {
      return this._addCustomButtons(e);
    },
    collapse: function() {
      var e = this.element;
      !1 !== H.isMetroObject(e, "collapse") &&
        C.getPlugin(e, "collapse").collapse();
    },
    expand: function() {
      var e = this.element;
      !1 !== H.isMetroObject(e, "collapse") &&
        C.getPlugin(e, "collapse").expand();
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return (
        !0 === o.collapsible && C.getPlugin(e, "collapse").destroy(),
        !0 === o.draggable && C.getPlugin(e, "draggable").destroy(),
        e
      );
    }
  };
  C.plugin("panel", dt);
  var ht = {
    popoverText: "",
    popoverHide: 3e3,
    popoverTimeout: 10,
    popoverOffset: 10,
    popoverTrigger: C.popoverEvents.HOVER,
    popoverPosition: C.position.TOP,
    hideOnLeave: !1,
    closeButton: !0,
    clsPopover: "",
    clsPopoverContent: "",
    onPopoverShow: C.noop,
    onPopoverHide: C.noop,
    onPopoverCreate: C.noop
  };
  (C.popoverSetup = function(e) {
    ht = k.extend({}, ht, e);
  }),
    window.metroPopoverSetup,
    C.popoverSetup(window.metroPopoverSetup);
  var ut = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ht, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.popover = null),
        (this.popovered = !1),
        (this.size = { width: 0, height: 0 }),
        (this.id = H.elementId("popover")),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      this._createEvents();
    },
    _createEvents: function() {
      var e,
        t = this,
        n = this.element,
        i = this.options;
      switch (i.popoverTrigger) {
        case C.popoverEvents.CLICK:
          e = C.events.click;
          break;
        case C.popoverEvents.FOCUS:
          e = C.events.focus;
          break;
        default:
          e = C.events.enter;
      }
      n.on(e, function() {
        null === t.popover &&
          !0 !== t.popovered &&
          setTimeout(function() {
            t.createPopover(),
              H.exec(i.onPopoverShow, [t.popover], n[0]),
              n.fire("popovershow", { popover: t.popover }),
              0 < i.popoverHide &&
                setTimeout(function() {
                  t.removePopover();
                }, i.popoverHide);
          }, i.popoverTimeout);
      }),
        !0 === i.hideOnLeave &&
          n.on(C.events.leave, function() {
            t.removePopover();
          }),
        k(window).on(
          C.events.scroll,
          function() {
            null !== t.popover && t.setPosition();
          },
          { ns: this.id }
        );
    },
    setPosition: function() {
      var e = this.popover,
        t = this.size,
        n = this.options,
        i = this.element;
      n.popoverPosition === C.position.BOTTOM
        ? (e.addClass("bottom"),
          e.css({
            top:
              i.offset().top -
              k(window).scrollTop() +
              i.outerHeight() +
              n.popoverOffset,
            left:
              i.offset().left +
              i.outerWidth() / 2 -
              t.width / 2 -
              k(window).scrollLeft()
          }))
        : n.popoverPosition === C.position.RIGHT
        ? (e.addClass("right"),
          e.css({
            top:
              i.offset().top +
              i.outerHeight() / 2 -
              t.height / 2 -
              k(window).scrollTop(),
            left:
              i.offset().left +
              i.outerWidth() -
              k(window).scrollLeft() +
              n.popoverOffset
          }))
        : n.popoverPosition === C.position.LEFT
        ? (e.addClass("left"),
          e.css({
            top:
              i.offset().top +
              i.outerHeight() / 2 -
              t.height / 2 -
              k(window).scrollTop(),
            left:
              i.offset().left -
              t.width -
              k(window).scrollLeft() -
              n.popoverOffset
          }))
        : (e.addClass("top"),
          e.css({
            top:
              i.offset().top -
              k(window).scrollTop() -
              t.height -
              n.popoverOffset,
            left:
              i.offset().left +
              i.outerWidth() / 2 -
              t.width / 2 -
              k(window).scrollLeft()
          }));
    },
    createPopover: function() {
      var e,
        t,
        n = this,
        i = this.elem,
        s = this.element,
        a = this.options,
        o = H.elementId("popover");
      if (!this.popovered) {
        switch (
          ((e = k("<div>")
            .addClass("popover neb")
            .addClass(a.clsPopover)).attr("id", o),
          k("<div>")
            .addClass("popover-content")
            .addClass(a.clsPopoverContent)
            .html(a.popoverText)
            .appendTo(e),
          0 === a.popoverHide &&
            !0 === a.closeButton &&
            k("<button>")
              .addClass("button square small popover-close-button bg-white")
              .html("&times;")
              .appendTo(e)
              .on(C.events.click, function() {
                n.removePopover();
              }),
          a.popoverPosition)
        ) {
          case C.position.TOP:
            t = "neb-s";
            break;
          case C.position.BOTTOM:
            t = "neb-n";
            break;
          case C.position.RIGHT:
            t = "neb-w";
            break;
          case C.position.LEFT:
            t = "neb-e";
        }
        if (
          (e.addClass(t),
          !0 !== a.closeButton &&
            e.on(C.events.click, function() {
              n.removePopover();
            }),
          (this.popover = e),
          (this.size = H.hiddenElementSize(e)),
          "TD" === i.tagName || "TH" === i.tagName)
        ) {
          var r = k("<div/>")
            .css("display", "inline-block")
            .html(s.html());
          s.html(r), (s = r);
        }
        this.setPosition(),
          e.appendTo(k("body")),
          (this.popovered = !0),
          H.exec(a.onPopoverCreate, [e], s[0]),
          s.fire("popovercreate", { popover: e });
      }
    },
    removePopover: function() {
      var e = this,
        t = this.element,
        n = this.options.onPopoverHide === C.noop ? 0 : 300,
        i = this.popover;
      this.popovered &&
        (H.exec(this.options.onPopoverHide, [i], this.elem),
        t.fire("popoverhide", { popover: i }),
        setTimeout(function() {
          i.hide(0, function() {
            i.remove(), (e.popover = null), (e.popovered = !1);
          });
        }, n));
    },
    show: function() {
      var e = this,
        t = this.element,
        n = this.options;
      !0 !== this.popovered &&
        setTimeout(function() {
          e.createPopover(),
            H.exec(n.onPopoverShow, [e.popover], t[0]),
            t.fire("popovershow", { popover: e.popover }),
            0 < n.popoverHide &&
              setTimeout(function() {
                e.removePopover();
              }, n.popoverHide);
        }, n.popoverTimeout);
    },
    hide: function() {
      this.removePopover();
    },
    changeAttribute: function(e) {
      var t = this,
        n = this.element,
        i = this.options;
      switch (e) {
        case "data-popover-text":
          (i.popoverText = n.attr("data-popover-text")),
            t.popover &&
              (t.popover.find(".popover-content").html(i.popoverText),
              t.setPosition());
          break;
        case "data-popover-position":
          (i.popoverPosition = n.attr("data-popover-position")),
            t.setPosition();
      }
    },
    destroy: function() {
      var e,
        t = this.element,
        n = this.options;
      switch (n.popoverTrigger) {
        case C.popoverEvents.CLICK:
          e = C.events.click;
          break;
        case C.popoverEvents.FOCUS:
          e = C.events.focus;
          break;
        default:
          e = C.events.enter;
      }
      return (
        t.off(e),
        !0 === n.hideOnLeave && t.off(C.events.leave),
        k(window).off(C.events.scroll, { ns: this.id }),
        t
      );
    }
  };
  C.plugin("popover", ut);
  var pt = {
    value: 0,
    buffer: 0,
    type: "bar",
    small: !1,
    clsBack: "",
    clsBar: "",
    clsBuffer: "",
    onValueChange: C.noop,
    onBufferChange: C.noop,
    onComplete: C.noop,
    onBuffered: C.noop,
    onProgressCreate: C.noop
  };
  (C.progressSetup = function(e) {
    pt = k.extend({}, pt, e);
  }),
    window.metroProgressSetup,
    C.bottomSheetSetup(window.metroProgressSetup);
  var ft = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, pt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.value = 0),
        (this.buffer = 0),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      switch (
        (C.checkRuntime(e, "progress"), e.html("").addClass("progress"), t.type)
      ) {
        case "buffer":
          k("<div>")
            .addClass("bar")
            .appendTo(e),
            k("<div>")
              .addClass("buffer")
              .appendTo(e);
          break;
        case "load":
          e.addClass("with-load"),
            k("<div>")
              .addClass("bar")
              .appendTo(e),
            k("<div>")
              .addClass("buffer")
              .appendTo(e),
            k("<div>")
              .addClass("load")
              .appendTo(e);
          break;
        case "line":
          e.addClass("line");
          break;
        default:
          k("<div>")
            .addClass("bar")
            .appendTo(e);
      }
      !0 === t.small && e.addClass("small"),
        e.addClass(t.clsBack),
        e.find(".bar").addClass(t.clsBar),
        e.find(".buffer").addClass(t.clsBuffer),
        this.val(t.value),
        this.buff(t.buffer),
        H.exec(t.onProgressCreate, null, e[0]),
        e.fire("progresscreate");
    },
    val: function(e) {
      var t = this.element,
        n = this.options;
      if (void 0 === e) return this.value;
      var i = t.find(".bar");
      if (0 === i.length) return !1;
      (this.value = parseInt(e, 10)),
        i.css("width", this.value + "%"),
        H.exec(n.onValueChange, [this.value], t[0]),
        t.fire("valuechange", { vsl: this.value }),
        100 === this.value &&
          (H.exec(n.onComplete, [this.value], t[0]),
          t.fire("complete", { val: this.value }));
    },
    buff: function(e) {
      var t = this.element,
        n = this.options;
      if (void 0 === e) return this.buffer;
      var i = t.find(".buffer");
      if (0 === i.length) return !1;
      (this.buffer = parseInt(e, 10)),
        i.css("width", this.buffer + "%"),
        H.exec(n.onBufferChange, [this.buffer], t[0]),
        t.fire("bufferchange", { val: this.buffer }),
        100 === this.buffer &&
          (H.exec(n.onBuffered, [this.buffer], t[0]),
          t.fire("buffered", { val: this.buffer }));
    },
    changeValue: function() {
      this.val(this.element.attr("data-value"));
    },
    changeBuffer: function() {
      this.buff(this.element.attr("data-buffer"));
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-value":
          this.changeValue();
          break;
        case "data-buffer":
          this.changeBuffer();
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("progress", ft);
  var mt = {
    transition: !0,
    style: 1,
    caption: "",
    captionPosition: "right",
    clsRadio: "",
    clsCheck: "",
    clsCaption: "",
    onRadioCreate: C.noop
  };
  (C.radioSetup = function(e) {
    mt = k.extend({}, mt, e);
  }),
    window.metroRadioSetup,
    C.radioSetup(window.metroRadioSetup);
  var vt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, mt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.origin = { className: "" }),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options,
        n = k("<label>")
          .addClass("radio " + e[0].className)
          .addClass(2 === t.style ? "style2" : ""),
        i = k("<span>").addClass("check"),
        s = k("<span>")
          .addClass("caption")
          .html(t.caption);
      C.checkRuntime(e, "radio"),
        e.attr("type", "radio"),
        n.insertBefore(e),
        e.appendTo(n),
        i.appendTo(n),
        s.appendTo(n),
        !0 === t.transition && n.addClass("transition-on"),
        "left" === t.captionPosition && n.addClass("caption-left"),
        (this.origin.className = e[0].className),
        (e[0].className = ""),
        n.addClass(t.clsRadio),
        s.addClass(t.clsCaption),
        i.addClass(t.clsCheck),
        e.is(":disabled") ? this.disable() : this.enable(),
        H.exec(t.onRadioCreate, null, e[0]),
        e.fire("radiocreate");
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      var t,
        n = this.element,
        i = this.options,
        s = n.parent();
      switch (e) {
        case "disabled":
          this.toggleState();
          break;
        case "data-style":
          (t = parseInt(n.attr("data-style"))),
            H.isInt(t) &&
              ((i.style = t),
              s.removeClass("style1 style2").addClass("style" + t));
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("radio", vt);
  var gt = {
    static: !1,
    title: null,
    value: 0,
    values: null,
    message: "",
    stars: 5,
    starColor: null,
    staredColor: null,
    roundFunc: "round",
    half: !0,
    clsRating: "",
    clsTitle: "",
    clsStars: "",
    clsResult: "",
    onStarClick: C.noop,
    onRatingCreate: C.noop
  };
  (C.ratingSetup = function(e) {
    gt = k.extend({}, gt, e);
  }),
    window.metroRatingSetup,
    C.ratingSetup(window.metroRatingSetup);
  var Ct = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, gt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.value = 0),
        (this.originValue = 0),
        (this.values = []),
        (this.rate = 0),
        (this.rating = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e,
        t = this.element,
        n = this.options;
      if (
        (C.checkRuntime(t, "rating"),
        isNaN(n.value)
          ? (n.value = 0)
          : (n.value = parseFloat(n.value).toFixed(1)),
        null !== n.values)
      )
        Array.isArray(n.values)
          ? (this.values = n.values)
          : "string" == typeof n.values &&
            (this.values = H.strToArray(n.values));
      else for (e = 1; e <= n.stars; e++) this.values.push(e);
      (this.originValue = n.value),
        (this.value = 0 < n.value ? Math[n.roundFunc](n.value) : 0),
        null !== n.starColor &&
          (H.isColor(n.starColor) || (n.starColor = y.color(n.starColor))),
        null !== n.staredColor &&
          (H.isColor(n.staredColor) ||
            (n.staredColor = y.color(n.staredColor))),
        this._createRating(),
        this._createEvents(),
        H.exec(n.onRatingCreate, null, t[0]),
        t.fire("ratingcreate");
    },
    _createRating: function() {
      var e,
        t,
        n,
        i = this.element,
        s = this.options,
        a = H.elementId("rating"),
        o = k("<div>")
          .addClass(
            "rating " + String(i[0].className).replace("d-block", "d-flex")
          )
          .addClass(s.clsRating),
        r = C.sheet,
        l = s.static ? Math.floor(this.originValue) : this.value;
      for (
        i.val(this.value),
          o.attr("id", a),
          o.insertBefore(i),
          i.appendTo(o),
          t = k("<ul>")
            .addClass("stars")
            .addClass(s.clsStars)
            .appendTo(o),
          e = 1;
        e <= s.stars;
        e++
      )
        (n = k("<li>")
          .data("value", this.values[e - 1])
          .appendTo(t)),
          e <= l && n.addClass("on");
      if (
        (k("<span>")
          .addClass("result")
          .addClass(s.clsResult)
          .appendTo(o)
          .html(s.message),
        null !== s.starColor &&
          H.addCssRule(
            r,
            "#" + a + " .stars:hover li",
            "color: " + s.starColor + ";"
          ),
        null !== s.staredColor &&
          (H.addCssRule(
            r,
            "#" + a + " .stars li.on",
            "color: " + s.staredColor + ";"
          ),
          H.addCssRule(
            r,
            "#" + a + " .stars li.half::after",
            "color: " + s.staredColor + ";"
          )),
        null !== s.title)
      ) {
        var c = k("<span>")
          .addClass("title")
          .addClass(s.clsTitle)
          .html(s.title);
        o.prepend(c);
      }
      if (!0 === s.static && (o.addClass("static"), !0 === s.half)) {
        var d = Math.round((this.originValue % 1) * 10);
        0 < d &&
          d <= 9 &&
          o
            .find(".stars li.on")
            .last()
            .next("li")
            .addClass("half half-" + 10 * d);
      }
      if (!(i[0].className = "") === s.copyInlineStyles)
        for (e = 0; e < i[0].style.length; e++)
          o.css(i[0].style[e], i.css(i[0].style[e]));
      i.is(":disabled") ? this.disable() : this.enable(), (this.rating = o);
    },
    _createEvents: function() {
      var n = this.element,
        i = this.options;
      this.rating.on(C.events.click, ".stars li", function() {
        if (!0 !== i.static) {
          var e = k(this),
            t = e.data("value");
          e.addClass("scale"),
            setTimeout(function() {
              e.removeClass("scale");
            }, 300),
            n.val(t).trigger("change"),
            e.addClass("on"),
            e.prevAll().addClass("on"),
            e.nextAll().removeClass("on"),
            H.exec(i.onStarClick, [t, e[0]], n[0]),
            n.fire("starclick", { value: t, star: e[0] });
        }
      });
    },
    val: function(e) {
      var t = this,
        n = this.element,
        i = this.options,
        s = this.rating;
      if (void 0 === e) return this.value;
      (this.value = 0 < e ? Math[i.roundFunc](e) : 0),
        n.val(this.value).trigger("change");
      var a = s.find(".stars li").removeClass("on");
      return (
        k.each(a, function() {
          var e = k(this);
          e.data("value") <= t.value && e.addClass("on");
        }),
        this
      );
    },
    msg: function(e) {
      var t = this.rating;
      if (void 0 !== e) return t.find(".result").html(e), this;
    },
    static: function(e) {
      var t = this.options,
        n = this.rating;
      !0 === (t.static = e) ? n.addClass("static") : n.removeClass("static");
    },
    changeAttributeValue: function(e) {
      var t = this.element,
        n = "value" === e ? t.val() : t.attr("data-value");
      this.val(n);
    },
    changeAttributeMessage: function() {
      var e = this.element.attr("data-message");
      this.msg(e);
    },
    changeAttributeStatic: function() {
      var e = this.element,
        t = !0 === JSON.parse(e.attr("data-static"));
      this.static(t);
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      switch (e) {
        case "value":
        case "data-value":
          this.changeAttributeValue(e);
          break;
        case "disabled":
          this.toggleState();
          break;
        case "data-message":
          this.changeAttributeMessage();
          break;
        case "data-static":
          this.changeAttributeStatic();
      }
    },
    destroy: function() {
      var e = this.element;
      return this.rating.off(C.events.click, ".stars li"), e;
    }
  };
  C.plugin("rating", Ct);
  var bt = {
    canResize: !0,
    resizeElement: ".resize-element",
    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
    preserveRatio: !1,
    onResizeStart: C.noop,
    onResizeStop: C.noop,
    onResize: C.noop,
    onResizableCreate: C.noop
  };
  (C.resizeableSetup = function(e) {
    bt = k.extend({}, bt, e);
  }),
    window.metroResizeableSetup,
    C.resizeableSetup(window.metroResizeableSetup);
  var wt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, bt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.resizer = null),
        (this.id = H.elementId("resizeable")),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "resizeable"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onResizableCreate, null, e[0]),
        e.fire("resizeablecreate");
    },
    _createStructure: function() {
      var e = this.element,
        t = this.options;
      e.data("canResize", !0),
        e.addClass("resizeable-element"),
        H.isValue(t.resizeElement) && 0 < e.find(t.resizeElement).length
          ? (this.resizer = e.find(t.resizeElement))
          : (this.resizer = k("<span>")
              .addClass("resize-element")
              .appendTo(e)),
        e.data("canResize", t.canResize);
    },
    _createEvents: function() {
      var n = this,
        o = this.element,
        r = this.options;
      this.resizer.on(C.events.start, function(e) {
        if (!1 !== o.data("canResize")) {
          var i = H.pageXY(e),
            s = parseInt(o.outerWidth()),
            a = parseInt(o.outerHeight()),
            t = { width: s, height: a };
          o.addClass("stop-select stop-pointer"),
            H.exec(r.onResizeStart, [t], o[0]),
            o.fire("resizestart", { size: t }),
            k(document).on(
              C.events.move,
              function(e) {
                var t = H.pageXY(e),
                  n = { width: s + t.x - i.x, height: a + t.y - i.y };
                return (
                  (0 < r.maxWidth && n.width > r.maxWidth) ||
                  ((0 < r.minWidth && n.width < r.minWidth) ||
                    ((0 < r.maxHeight && n.height > r.maxHeight) ||
                      ((0 < r.minHeight && n.height < r.minHeight) ||
                        (o.css(n),
                        H.exec(r.onResize, [n], o[0]),
                        void o.fire("resize", { size: n })))))
                );
              },
              { ns: n.id }
            ),
            k(document).on(
              C.events.stop,
              function() {
                o.removeClass("stop-select stop-pointer"),
                  k(document).off(C.events.move, { ns: n.id }),
                  k(document).off(C.events.stop, { ns: n.id });
                var e = {
                  width: parseInt(o.outerWidth()),
                  height: parseInt(o.outerHeight())
                };
                H.exec(r.onResizeStop, [e], o[0]),
                  o.fire("resizestop", { size: e });
              },
              { ns: n.id }
            ),
            e.preventDefault(),
            e.stopPropagation();
        }
      });
    },
    off: function() {
      this.element.data("canResize", !1);
    },
    on: function() {
      this.element.data("canResize", !0);
    },
    changeAttribute: function(e) {
      var t = this.element,
        n = this.options;
      switch (e) {
        case "data-can-resize":
          n.canResize = !0 === JSON.parse(t.attr("data-can-resize"));
      }
    },
    destroy: function() {
      return this.resizer.off(C.events.start), this.element;
    }
  };
  C.plugin("resizable", wt);
  var yt = {
    onStatic: C.noop,
    onBeforeTab: C.noop_true,
    onTab: C.noop,
    onRibbonMenuCreate: C.noop
  };
  (C.ribbonMenuSetup = function(e) {
    yt = k.extend({}, yt, e);
  }),
    window.metroRibbonMenuSetup,
    C.ribbonMenuSetup(window.metroRibbonMenuSetup);
  var xt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, yt, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    dependencies: ["buttongroup"],
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "ribbonmenu"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onRibbonMenuCreate, null, e[0]),
        e.fire("ribbonmenucreate");
    },
    _createStructure: function() {
      var e = this.element;
      e.addClass("ribbon-menu");
      var t = e.find(".tabs-holder li:not(.static)"),
        n = e.find(".tabs-holder li.active");
      0 < n.length ? this.open(k(n[0])) : 0 < t.length && this.open(k(t[0]));
      var i = e.find(".ribbon-toggle-group");
      k.each(i, function() {
        var e = k(this);
        e.buttongroup({ clsActive: "active" });
        var t = 0,
          n = e.find(".ribbon-icon-button");
        k.each(n, function() {
          var e = k(this).outerWidth(!0);
          t < e && (t = e);
        }),
          e.css("width", t * Math.ceil(n.length / 3) + 4);
      });
    },
    _createEvents: function() {
      var i = this,
        s = this.element,
        a = this.options;
      s.on(C.events.click, ".tabs-holder li a", function(e) {
        var t = k(this),
          n = k(this).parent("li");
        n.hasClass("static")
          ? a.onStatic === C.noop && void 0 !== t.attr("href")
            ? (document.location.href = t.attr("href"))
            : (H.exec(a.onStatic, [n[0]], s[0]),
              s.fire("static", { tab: n[0] }))
          : !0 === H.exec(a.onBeforeTab, [n[0]], s[0]) && i.open(n[0]),
          e.preventDefault();
      });
    },
    open: function(e) {
      var t = this.element,
        n = this.options,
        i = k(e),
        s = t.find(".tabs-holder li"),
        a = t.find(".content-holder .section"),
        o = i.children("a").attr("href"),
        r = "#" !== o ? t.find(o) : null;
      s.removeClass("active"),
        i.addClass("active"),
        a.removeClass("active"),
        r && r.addClass("active"),
        H.exec(n.onTab, [i[0]], t[0]),
        t.fire("tab", { tab: i[0] });
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return e.off(C.events.click, ".tabs-holder li a"), e;
    }
  };
  C.plugin("ribbonmenu", xt);
  var St = {
    rippleColor: "#fff",
    rippleAlpha: 0.4,
    rippleTarget: "default",
    onRippleCreate: C.noop
  };
  (C.rippleSetup = function(e) {
    St = k.extend({}, St, e);
  }),
    window.metroRippleSetup,
    C.rippleSetup(window.metroRippleSetup);
  var Tt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, St, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        o = this.options,
        t = "default" === o.rippleTarget ? null : o.rippleTarget;
      C.checkRuntime(e, "ripple"),
        e.on(C.events.click, t, function(e) {
          var t = k(this);
          "static" === t.css("position") && t.css("position", "relative"),
            t.css({ overflow: "hidden" }),
            k(".ripple").remove();
          var n = Math.max(t.outerWidth(), t.outerHeight()),
            i = k("<span class='ripple'></span>").css({ width: n, height: n });
          t.prepend(i);
          var s = e.pageX - t.offset().left - i.width() / 2,
            a = e.pageY - t.offset().top - i.height() / 2;
          i
            .css({
              background: H.hex2rgba(o.rippleColor, o.rippleAlpha),
              width: n,
              height: n,
              top: a + "px",
              left: s + "px"
            })
            .addClass("rippleEffect"),
            setTimeout(function() {
              null, k(".ripple").remove();
            }, 400);
        }),
        H.exec(o.onRippleCreate, null, e[0]),
        e.fire("ripplecreate");
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element,
        t = this.options,
        n = "default" === t.rippleTarget ? null : t.rippleTarget;
      e.off(C.events.click, n);
    }
  };
  C.plugin("ripple", Tt);
  var kt = {
    clearButton: !1,
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    placeholder: "",
    addEmptyValue: !1,
    emptyValue: "",
    duration: 100,
    prepend: "",
    append: "",
    filterPlaceholder: "",
    filter: !0,
    copyInlineStyles: !0,
    dropHeight: 200,
    clsSelect: "",
    clsSelectInput: "",
    clsPrepend: "",
    clsAppend: "",
    clsOption: "",
    clsOptionActive: "",
    clsOptionGroup: "",
    clsDropList: "",
    clsSelectedItem: "",
    clsSelectedItemRemover: "",
    onChange: C.noop,
    onUp: C.noop,
    onDrop: C.noop,
    onItemSelect: C.noop,
    onItemDeselect: C.noop,
    onSelectCreate: C.noop
  };
  (C.selectSetup = function(e) {
    kt = k.extend({}, kt, e);
  }),
    window.metroSelectSetup,
    C.selectSetup(window.metroSelectSetup);
  var _t = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, kt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.list = null),
        (this.placeholder = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "select"),
        this._createSelect(),
        this._createEvents(),
        H.exec(t.onSelectCreate, null, e[0]),
        e.fire("selectcreate");
    },
    _setPlaceholder: function() {
      var e = this.element,
        t = this.options,
        n = e.siblings(".select-input");
      (H.isValue(e.val()) && e.val() != t.emptyValue) ||
        n.html(this.placeholder);
    },
    _addOption: function(e, t) {
      var n,
        i,
        s,
        a = k(e),
        o = this.element,
        r = this.options,
        l = o[0].multiple,
        c = o.siblings(".select-input"),
        d = H.isValue(a.attr("data-template"))
          ? a.attr("data-template").replace("$1", e.text)
          : e.text;
      (n = k("<li>")
        .addClass(r.clsOption)
        .data("option", e)
        .attr("data-text", e.text)
        .attr("data-value", H.isValue(e.value) ? e.value : "")
        .appendTo(t)),
        (i = k("<a>")
          .html(d)
          .appendTo(n)),
        n.addClass(e.className),
        a.is(":disabled") && n.addClass("disabled"),
        a.is(":selected") &&
          (l
            ? (n.addClass("d-none"),
              (s = k("<div>")
                .addClass("selected-item")
                .addClass(r.clsSelectedItem)
                .html("<span class='title'>" + d + "</span>")
                .appendTo(c)).data("option", n),
              k("<span>")
                .addClass("remover")
                .addClass(r.clsSelectedItemRemover)
                .html("&times;")
                .appendTo(s))
            : (o.val(e.value),
              c.html(d),
              o.fire("change", { val: e.value }),
              n.addClass("active"))),
        i.appendTo(n),
        n.appendTo(t);
    },
    _addOptionGroup: function(e, t) {
      var n = this,
        i = k(e);
      k("<li>")
        .html(e.label)
        .addClass("group-title")
        .appendTo(t),
        k.each(i.children(), function() {
          n._addOption(this, t);
        });
    },
    _createOptions: function() {
      var e = this,
        t = this.element,
        n = this.options,
        i = t
          .parent()
          .find("ul")
          .html(""),
        s = 0 < t.find("option[selected]").length;
      !0 === n.addEmptyValue &&
        t.prepend(
          k(
            "<option " +
              (s ? "" : "selected") +
              " value='" +
              n.emptyValue +
              "' class='d-none'></option>"
          )
        ),
        k.each(t.children(), function() {
          "OPTION" === this.tagName
            ? e._addOption(this, i)
            : "OPTGROUP" === this.tagName && e._addOptionGroup(this, i);
        });
    },
    _createSelect: function() {
      var e,
        n,
        i,
        s,
        a,
        o = this.element,
        r = this.options,
        t = k("<label>")
          .addClass("select " + o[0].className)
          .addClass(r.clsSelect),
        l = o[0].multiple,
        c = H.elementId("select"),
        d = k("<div>").addClass("button-group");
      ((this.placeholder = k("<span>")
        .addClass("placeholder")
        .html(r.placeholder)),
      t.attr("id", c),
      (a = k("<span>").addClass("dropdown-toggle")).appendTo(t),
      l && t.addClass("multiple"),
      t.insertBefore(o),
      o.appendTo(t),
      d.appendTo(t),
      (e = k("<div>")
        .addClass("select-input")
        .addClass(r.clsSelectInput)
        .attr("name", "__" + c + "__")),
      (n = k("<div>").addClass("drop-container")),
      (i = k("<ul>")
        .addClass("d-menu")
        .addClass(r.clsDropList)
        .css({ "max-height": r.dropHeight })),
      (s = k("<input type='text' data-role='input'>").attr(
        "placeholder",
        r.filterPlaceholder
      )),
      t.append(e),
      t.append(n),
      n.append(s),
      !0 !== r.filter && s.hide(),
      n.append(i),
      this._createOptions(),
      this._setPlaceholder(),
      C.makePlugin(n, "dropdown", {
        dropFilter: ".select",
        duration: r.duration,
        toggleElement: "#" + c,
        onDrop: function() {
          var e, t;
          a.addClass("active-toggle"),
            (e = k(".select .drop-container")),
            k.each(e, function() {
              var e = k(this);
              if (!e.is(n)) {
                var t = e.data("dropdown");
                t && t.close && t.close();
              }
            }),
            s
              .val("")
              .trigger(C.events.keyup)
              .focus(),
            void 0 !==
              (t =
                0 < i.find("li.active").length
                  ? k(i.find("li.active")[0])
                  : void 0) &&
              (i[0].scrollTop =
                t.position().top - (i.height() - t.height()) / 2),
            H.exec(r.onDrop, [i[0]], o[0]),
            o.fire("drop", { list: i[0] });
        },
        onUp: function() {
          a.removeClass("active-toggle"),
            H.exec(r.onUp, [i[0]], o[0]),
            o.fire("up", { list: i[0] });
        }
      }),
      (this.list = i),
      !0 !== r.clearButton || o[0].readOnly)
        ? d.addClass("d-none")
        : k("<button>")
            .addClass("button input-clear-button")
            .addClass(r.clsClearButton)
            .attr("tabindex", -1)
            .attr("type", "button")
            .html(r.clearButtonIcon)
            .appendTo(d);
      "" !== r.prepend &&
        k("<div>")
          .html(r.prepend)
          .addClass("prepend")
          .addClass(r.clsPrepend)
          .appendTo(t);
      "" !== r.append &&
        k("<div>")
          .html(r.append)
          .addClass("append")
          .addClass(r.clsAppend)
          .appendTo(t);
      if (!0 === r.copyInlineStyles)
        for (var h = 0, u = o[0].style.length; h < u; h++)
          t.css(o[0].style[h], o.css(o[0].style[h]));
      "rtl" === o.attr("dir") && t.addClass("rtl").attr("dir", "rtl"),
        o.is(":disabled") ? this.disable() : this.enable();
    },
    _createEvents: function() {
      var l = this,
        c = this.element,
        d = this.options,
        t = c.closest(".select"),
        h = t.find(".drop-container"),
        u = c.siblings(".select-input"),
        e = h.find("input"),
        p = h.find("ul");
      t.find(".input-clear-button").on(C.events.click, function(e) {
        c.val(d.emptyValue),
          l._setPlaceholder(),
          e.preventDefault(),
          e.stopPropagation();
      }),
        c.on(C.events.change, function() {
          l._setPlaceholder();
        }),
        t.on(C.events.click, function(e) {
          k(".focused").removeClass("focused"),
            t.addClass("focused"),
            e.preventDefault(),
            e.stopPropagation();
        }),
        u.on(C.events.click, function() {
          k(".focused").removeClass("focused"), t.addClass("focused");
        }),
        p.on(C.events.click, "li", function(e) {
          if (k(this).hasClass("group-title"))
            return e.preventDefault(), void e.stopPropagation();
          var t,
            n,
            i = k(this),
            s = i.data("value"),
            a = i.children("a").html(),
            o = i.data("option"),
            r = c.find("option");
          c[0].multiple
            ? (i.addClass("d-none"),
              (t = k("<div>")
                .addClass("selected-item")
                .addClass(d.clsSelectedItem)
                .html("<span class='title'>" + a + "</span>")
                .appendTo(u)).data("option", i),
              k("<span>")
                .addClass("remover")
                .addClass(d.clsSelectedItemRemover)
                .html("&times;")
                .appendTo(t))
            : (p
                .find("li.active")
                .removeClass("active")
                .removeClass(d.clsOptionActive),
              i.addClass("active").addClass(d.clsOptionActive),
              u.html(a),
              C.getPlugin(h[0], "dropdown").close()),
            k.each(r, function() {
              this === o && (this.selected = !0);
            }),
            H.exec(d.onItemSelect, [s, o, i[0]], c[0]),
            c.fire("itemselect", { val: s, option: o, leaf: i[0] }),
            (n = l.getSelected()),
            H.exec(d.onChange, [n], c[0]),
            c.fire("change", { selected: n });
        }),
        u.on("click", ".selected-item .remover", function(e) {
          var t,
            n = k(this).closest(".selected-item"),
            i = n.data("option"),
            s = i.data("option");
          i.removeClass("d-none"),
            k.each(c.find("option"), function() {
              this === s && (this.selected = !1);
            }),
            n.remove(),
            H.exec(d.onItemDeselect, [s], c[0]),
            c.fire("itemdeselect", { option: s }),
            (t = l.getSelected()),
            H.exec(d.onChange, [t], c[0]),
            c.fire("change", { selected: t }),
            e.preventDefault(),
            e.stopPropagation();
        }),
        e.on(C.events.keyup, function() {
          var e,
            t = this.value.toUpperCase(),
            n = p.find("li");
          for (e = 0; e < n.length; e++)
            k(n[e]).hasClass("group-title") ||
              (-1 <
              n[e]
                .getElementsByTagName("a")[0]
                .innerHTML.toUpperCase()
                .indexOf(t)
                ? (n[e].style.display = "")
                : (n[e].style.display = "none"));
        }),
        h.on(C.events.click, function(e) {
          e.preventDefault(), e.stopPropagation();
        });
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.closest(".select").addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.closest(".select").removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    reset: function(e) {
      var t,
        n = this.element,
        i = this.options,
        s = n.find("option"),
        a = n.closest(".select");
      k.each(s, function() {
        this.selected = !H.isNull(e) && this.defaultSelected;
      }),
        this.list.find("li").remove(),
        a.find(".select-input").html(""),
        this._createOptions(),
        (t = this.getSelected()),
        H.exec(i.onChange, [t], n[0]),
        n.fire("change", { selected: t });
    },
    getSelected: function() {
      var e = this.element,
        t = [];
      return (
        e.find("option").each(function() {
          this.selected && t.push(this.value);
        }),
        t
      );
    },
    val: function(e) {
      var t,
        n,
        i,
        s,
        a,
        o,
        r = this.element,
        l = this.options,
        c = r.siblings(".select-input"),
        d = r.find("option"),
        h = this.list.find("li"),
        u = [],
        p = void 0 !== r.attr("multiple");
      if (H.isNull(e))
        return (
          k.each(d, function() {
            this.selected && u.push(this.value);
          }),
          p ? u : u[0]
        );
      k.each(d, function() {
        this.selected = !1;
      }),
        h.removeClass("active"),
        c.html(""),
        !1 === Array.isArray(e) && (e = [e]),
        k.each(e, function() {
          for (n = 0; n < d.length; n++)
            if (
              ((t = d[n]),
              (i = H.isValue(t.getAttribute("data-template"))
                ? t.getAttribute("data-template").replace("$1", t.text)
                : t.text),
              "" + t.value == "" + this)
            ) {
              t.selected = !0;
              break;
            }
          for (n = 0; n < h.length; n++)
            if (((s = k(h[n])), "" + s.attr("data-value") == "" + this)) {
              p
                ? (s.addClass("d-none"),
                  (a = k("<div>")
                    .addClass("selected-item")
                    .addClass(l.clsSelectedItem)
                    .html("<span class='title'>" + i + "</span>")
                    .appendTo(c)).data("option", s),
                  k("<span>")
                    .addClass("remover")
                    .addClass(l.clsSelectedItemRemover)
                    .html("&times;")
                    .appendTo(a))
                : (s.addClass("active"), c.html(i));
              break;
            }
        }),
        (o = this.getSelected()),
        H.exec(l.onChange, [o], r[0]),
        r.fire("change", { selected: o });
    },
    data: function(e) {
      var n,
        i = this.element;
      i.html(""),
        "string" == typeof e
          ? i.html(e)
          : H.isObject(e) &&
            k.each(e, function(e, t) {
              H.isObject(t)
                ? ((n = k("<optgroup label=''>")
                    .attr("label", e)
                    .appendTo(i)),
                  k.each(t, function(e, t) {
                    k("<option>")
                      .attr("value", e)
                      .text(t)
                      .appendTo(n);
                  }))
                : k("<option>")
                    .attr("value", e)
                    .text(t)
                    .appendTo(i);
            }),
        this._createOptions();
    },
    changeAttribute: function(e) {
      "disabled" === e && this.toggleState();
    },
    destroy: function() {
      var e = this.element,
        t = e.closest(".select"),
        n = t.find(".drop-container"),
        i = e.siblings(".select-input"),
        s = n.find("input"),
        a = n.find("ul"),
        o = t.find(".input-clear-button");
      return (
        t.off(C.events.click),
        t.off(C.events.click, ".input-clear-button"),
        i.off(C.events.click),
        s.off(C.events.blur),
        s.off(C.events.focus),
        a.off(C.events.click, "li"),
        s.off(C.events.keyup),
        n.off(C.events.click),
        o.off(C.events.click),
        n.data("dropdown").destroy(),
        e
      );
    }
  };
  k(document).on(
    C.events.click,
    function() {
      var t = H.$(),
        e = k(".select .drop-container");
      k.each(e, function() {
        var e = t(this).data("dropdown");
        e && e.close && e.close();
      }),
        k(".select").removeClass("focused");
    },
    { ns: "close-select-elements" }
  ),
    C.plugin("select", _t);
  var Ot = {
    shadow: !0,
    position: "left",
    size: 290,
    shift: null,
    staticShift: null,
    toggle: null,
    duration: METRO_ANIMATION_DURATION,
    static: null,
    menuItemClick: !0,
    onOpen: C.noop,
    onClose: C.noop,
    onToggle: C.noop,
    onStaticSet: C.noop,
    onStaticLoss: C.noop,
    onSidebarCreate: C.noop
  };
  (C.sidebarSetup = function(e) {
    Ot = k.extend({}, Ot, e);
  }),
    window.metroSidebarSetup,
    C.sidebarSetup(window.metroSidebarSetup);
  var It = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Ot, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.toggle_element = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "sidebar"),
        this._createStructure(),
        this._createEvents(),
        k(window).resize(),
        this._checkStatic(),
        H.exec(t.onSidebarCreate, null, e[0]),
        e.fire("sidebarcreate");
    },
    _createStructure: function() {
      var e = this.element,
        t = this.options,
        n = e.find(".sidebar-header"),
        i = C.sheet;
      e.addClass("sidebar").addClass("on-" + t.position),
        290 !== t.size &&
          (H.addCssRule(i, ".sidebar", "width: " + t.size + "px;"),
          "left" === t.position
            ? H.addCssRule(i, ".sidebar.on-left", "left: " + -t.size + "px;")
            : H.addCssRule(
                i,
                ".sidebar.on-right",
                "right: " + -t.size + "px;"
              )),
        !0 === t.shadow && e.addClass("sidebar-shadow"),
        void 0 === e.attr("id") && e.attr("id", H.elementId("sidebar")),
        null !== t.toggle &&
          0 < k(t.toggle).length &&
          (this.toggle_element = k(t.toggle)),
        0 < n.length &&
          void 0 !== n.data("image") &&
          n.css({ backgroundImage: "url(" + n.data("image") + ")" }),
        null !== t.static &&
          null !== t.staticShift &&
          ("left" === t.position
            ? H.addCssRule(
                i,
                "@media screen and " + C.media_queries[t.static.toUpperCase()],
                t.staticShift +
                  "{margin-left: " +
                  t.size +
                  "px; width: calc(100% - " +
                  t.size +
                  "px);}"
              )
            : H.addCssRule(
                i,
                "@media screen and " + C.media_queries[t.static.toUpperCase()],
                t.staticShift +
                  "{margin-right: " +
                  t.size +
                  "px; width: calc(100% - " +
                  t.size +
                  "px);}"
              ));
    },
    _createEvents: function() {
      var e = this,
        t = this.element,
        n = this.options,
        i = this.toggle_element;
      null !== i &&
        i.on(C.events.click, function() {
          e.toggle();
        }),
        null !== n.static &&
          -1 < ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(n.static) &&
          k(window).on(
            C.events.resize,
            function() {
              e._checkStatic();
            },
            { ns: t.attr("id") }
          ),
        !0 === n.menuItemClick &&
          t.on(C.events.click, ".sidebar-menu li > a", function() {
            e.close();
          }),
        t.on(C.events.click, ".sidebar-menu .js-sidebar-close", function() {
          e.close();
        });
    },
    _checkStatic: function() {
      var e = this.element,
        t = this.options;
      H.mediaExist(t.static) &&
        !e.hasClass("static") &&
        (e.addClass("static"),
        e.data("opened", !1).removeClass("open"),
        null !== t.shift &&
          k.each(t.shift.split(","), function() {
            k("" + this).animate({ left: 0 }, t.duration);
          }),
        H.exec(t.onStaticSet, null, e[0]),
        e.fire("staticset")),
        H.mediaExist(t.static) ||
          (e.removeClass("static"),
          H.exec(t.onStaticLoss, null, e[0]),
          e.fire("staticloss"));
    },
    isOpen: function() {
      return !0 === this.element.data("opened");
    },
    open: function() {
      var e = this.element,
        t = this.options;
      e.hasClass("static") ||
        (e.data("opened", !0).addClass("open"),
        null !== t.shift &&
          k(t.shift).animate({ left: e.outerWidth() }, t.duration),
        H.exec(t.onOpen, null, e[0]),
        e.fire("open"));
    },
    close: function() {
      var e = this.element,
        t = this.options;
      e.hasClass("static") ||
        (e.data("opened", !1).removeClass("open"),
        null !== t.shift && k(t.shift).animate({ left: 0 }, t.duration),
        H.exec(t.onClose, null, e[0]),
        e.fire("close"));
    },
    toggle: function() {
      this.isOpen() ? this.close() : this.open(),
        H.exec(this.options.onToggle, null, this.element[0]),
        this.element.fire("toggle");
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element,
        t = this.options,
        n = this.toggle_element;
      return (
        null !== n && n.off(C.events.click),
        null !== t.static &&
          -1 < ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(t.static) &&
          k(window).off(C.events.resize, { ns: e.attr("id") }),
        !0 === t.menuItemClick && e.off(C.events.click, ".sidebar-menu li > a"),
        e.off(C.events.click, ".sidebar-menu .js-sidebar-close"),
        e
      );
    }
  };
  C.plugin("sidebar", It);
  var Dt = {
    min: 0,
    max: 100,
    accuracy: 0,
    showMinMax: !(C.sidebar = {
      isSidebar: function(e) {
        return H.isMetroObject(e, "sidebar");
      },
      open: function(e) {
        this.isSidebar(e) && C.getPlugin(k(e)[0], "sidebar").open();
      },
      close: function(e) {
        this.isSidebar(e) && C.getPlugin(k(e)[0], "sidebar").close();
      },
      toggle: function(e) {
        this.isSidebar(e) && C.getPlugin(k(e)[0], "sidebar").toggle();
      },
      isOpen: function(e) {
        if (this.isSidebar(e)) return C.getPlugin(k(e)[0], "sidebar").isOpen();
      }
    }),
    minMaxPosition: C.position.TOP,
    value: 0,
    buffer: 0,
    hint: !1,
    hintAlways: !1,
    hintPosition: C.position.TOP,
    hintMask: "$1",
    vertical: !1,
    target: null,
    returnType: "value",
    size: 0,
    clsSlider: "",
    clsBackside: "",
    clsComplete: "",
    clsBuffer: "",
    clsMarker: "",
    clsHint: "",
    clsMinMax: "",
    clsMin: "",
    clsMax: "",
    onStart: C.noop,
    onStop: C.noop,
    onMove: C.noop,
    onSliderClick: C.noop,
    onChange: C.noop,
    onChangeValue: C.noop,
    onChangeBuffer: C.noop,
    onFocus: C.noop,
    onBlur: C.noop,
    onSliderCreate: C.noop
  };
  (C.sliderSetup = function(e) {
    Dt = k.extend({}, Dt, e);
  }),
    window.metroSliderSetup,
    C.sliderSetup(window.metroSliderSetup);
  var Mt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Dt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.slider = null),
        (this.value = 0),
        (this.percent = 0),
        (this.pixel = 0),
        (this.buffer = 0),
        (this.keyInterval = !1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "slider"),
        this._createSlider(),
        this._createEvents(),
        this.buff(t.buffer),
        this.val(t.value),
        H.exec(t.onSliderCreate, null, e[0]),
        e.fire("slidercreate");
    },
    _createSlider: function() {
      var e,
        t = this.element,
        n = this.options,
        i = t.prev(),
        s = t.parent(),
        a = k("<div>")
          .addClass("slider " + t[0].className)
          .addClass(n.clsSlider),
        o = k("<div>")
          .addClass("backside")
          .addClass(n.clsBackside),
        r = k("<div>")
          .addClass("complete")
          .addClass(n.clsComplete),
        l = k("<div>")
          .addClass("buffer")
          .addClass(n.clsBuffer),
        c = k("<button>")
          .attr("type", "button")
          .addClass("marker")
          .addClass(n.clsMarker),
        d = k("<div>")
          .addClass("hint")
          .addClass(n.hintPosition + "-side")
          .addClass(n.clsHint),
        h = H.elementId("slider");
      if (
        (t.attr("data-role-slider") ||
          t.attr("data-role-slider", !0).attr("data-role", "slide"),
        a.attr("id", h),
        0 < n.size &&
          (!0 === n.vertical ? a.outerHeight(n.size) : a.outerWidth(n.size)),
        !0 === n.vertical && a.addClass("vertical-slider"),
        0 === i.length ? s.prepend(a) : a.insertAfter(i),
        !0 === n.hintAlways &&
          d.css({ display: "block" }).addClass("permanent-hint"),
        t.appendTo(a),
        o.appendTo(a),
        r.appendTo(a),
        l.appendTo(a),
        c.appendTo(a),
        d.appendTo(c),
        !0 === n.showMinMax)
      ) {
        var u = k("<div>")
          .addClass("slider-min-max clear")
          .addClass(n.clsMinMax);
        k("<span>")
          .addClass("place-left")
          .addClass(n.clsMin)
          .html(n.min)
          .appendTo(u),
          k("<span>")
            .addClass("place-right")
            .addClass(n.clsMax)
            .html(n.max)
            .appendTo(u),
          n.minMaxPosition === C.position.TOP
            ? u.insertBefore(a)
            : u.insertAfter(a);
      }
      if (!(t[0].className = "") === n.copyInlineStyles)
        for (e = 0; e < t[0].style.length; e++)
          a.css(t[0].style[e], t.css(t[0].style[e]));
      t.is(":disabled") ? this.disable() : this.enable(), (this.slider = a);
    },
    _createEvents: function() {
      var i = this,
        t = this.element,
        e = this.slider,
        s = this.options,
        n = e.find(".marker"),
        a = e.find(".hint");
      n.on(C.events.startAll, function() {
        !0 === s.hint && !0 !== s.hintAlways && a.fadeIn(300),
          k(document).on(C.events.moveAll, function(e) {
            i._move(e),
              H.exec(s.onMove, [i.value, i.percent], t[0]),
              t.fire("move", { val: i.value, percent: i.percent });
          }),
          k(document).on(C.events.stopAll, function() {
            k(document).off(C.events.moveAll),
              k(document).off(C.events.stopAll),
              !0 !== s.hintAlways && a.fadeOut(300),
              H.exec(s.onStop, [i.value, i.percent], t[0]),
              t.fire("stop", { val: i.value, percent: i.percent });
          }),
          H.exec(s.onStart, [i.value, i.percent], t[0]),
          t.fire("start", { val: i.value, percent: i.percent });
      }),
        n.on(C.events.focus, function() {
          H.exec(s.onFocus, [i.value, i.percent], t[0]),
            t.fire("focus", { val: i.value, percent: i.percent });
        }),
        n.on(C.events.blur, function() {
          H.exec(s.onBlur, [i.value, i.percent], t[0]),
            t.fire("blur", { val: i.value, percent: i.percent });
        }),
        n.on(C.events.keydown, function(t) {
          var e = t.keyCode ? t.keyCode : t.which;
          if (-1 !== [37, 38, 39, 40].indexOf(e)) {
            var n = 0 === s.accuracy ? 1 : s.accuracy;
            i.keyInterval ||
              ((i.keyInterval = setInterval(function() {
                var e = i.value;
                (37 !== t.keyCode && 40 !== t.keyCode) ||
                  (e - n < s.min ? (e = s.min) : (e -= n)),
                  (38 !== t.keyCode && 39 !== t.keyCode) ||
                    (e + n > s.max ? (e = s.max) : (e += n)),
                  (i.value = i._correct(e)),
                  (i.percent = i._convert(i.value, "val2prc")),
                  (i.pixel = i._convert(i.percent, "prc2pix")),
                  i._redraw();
              }, 100)),
              t.preventDefault());
          }
        }),
        n.on(C.events.keyup, function() {
          clearInterval(i.keyInterval), (i.keyInterval = !1);
        }),
        e.on(C.events.click, function(e) {
          i._move(e),
            H.exec(s.onSliderClick, [i.value, i.percent], t[0]),
            t.fire("sliderclick", { val: i.value, percent: i.percent }),
            H.exec(s.onStop, [i.value, i.percent], t[0]),
            t.fire("stop", { val: i.value, percent: i.percent });
        }),
        k(window).on(
          C.events.resize,
          function() {
            i.val(i.value), i.buff(i.buffer);
          },
          { ns: e.attr("id") }
        );
    },
    _convert: function(e, t) {
      var n = this.slider,
        i = this.options,
        s =
          (!0 === i.vertical ? n.outerHeight() : n.outerWidth()) -
          n.find(".marker").outerWidth();
      switch (t) {
        case "pix2prc":
          return Math.round((100 * e) / s);
        case "pix2val":
          return Math.round(
            this._convert(e, "pix2prc") * ((i.max - i.min) / 100) + i.min
          );
        case "val2prc":
          return Math.round((e - i.min) / ((i.max - i.min) / 100));
        case "prc2pix":
          return Math.round(e / (100 / s));
        case "val2pix":
          return Math.round(
            this._convert(this._convert(e, "val2prc"), "prc2pix")
          );
      }
      return 0;
    },
    _correct: function(e) {
      var t = this.options.accuracy,
        n = this.options.min,
        i = this.options.max;
      return (
        0 === t ||
          isNaN(t) ||
          ((e = Math.floor(e / t) * t + Math.round((e % t) / t) * t) < n &&
            (e = n),
          i < e && (e = i)),
        e
      );
    },
    _move: function(e) {
      var t,
        n,
        i = this.slider,
        s = this.options,
        a = i.offset(),
        o = i.find(".marker").outerWidth(),
        r = !0 === s.vertical ? i.outerHeight() : i.outerWidth(),
        l = r - o;
      (t = !0 === s.vertical ? H.pageXY(e).y - a.top : H.pageXY(e).x - a.left),
        (n = !0 === s.vertical ? r - t - o / 2 : t - o / 2) < 0 ||
          l < n ||
          ((this.value = this._correct(this._convert(n, "pix2val"))),
          (this.percent = this._convert(this.value, "val2prc")),
          (this.pixel = this._convert(this.percent, "prc2pix")),
          this._redraw());
    },
    _hint: function() {
      var e,
        t = this.options,
        n = this.slider.find(".hint");
      (e = t.hintMask.replace("$1", this.value).replace("$2", this.percent)),
        n.text(e);
    },
    _value: function() {
      var e = this.element,
        t = this.options,
        n = (this.slider, "value" === t.returnType ? this.value : this.percent);
      if (("INPUT" === e[0].tagName && e.val(n), null !== t.target)) {
        var i = k(t.target);
        0 !== i.length &&
          k.each(i, function() {
            var e = k(this);
            "INPUT" === this.tagName ? e.val(n) : e.text(n);
          });
      }
      H.exec(t.onChangeValue, [n, this.percent], e[0]),
        e.fire("changevalue", { val: n, percent: this.percent }),
        H.exec(t.onChange, [n, this.percent, this.buffer], e[0]),
        e.fire("change", {
          val: n,
          percent: this.percent,
          buffer: this.buffer
        });
    },
    _marker: function() {
      var e = this.slider,
        t = this.options,
        n = e.find(".marker"),
        i = e.find(".complete"),
        s = !0 === t.vertical ? e.outerHeight() : e.outerWidth(),
        a = parseInt(H.getStyleOne(n, "width")),
        o = H.isVisible(e);
      o && n.css({ "margin-top": 0, "margin-left": 0 }),
        !0 === t.vertical
          ? (o
              ? n.css("top", s - this.pixel)
              : (n.css("top", this.percent + "%"),
                n.css("margin-top", 0 === this.percent ? 0 : (-1 * a) / 2)),
            i.css("height", this.percent + "%"))
          : (o
              ? n.css("left", this.pixel)
              : (n.css("left", this.percent + "%"),
                n.css("margin-left", 0 === this.percent ? 0 : (-1 * a) / 2)),
            i.css("width", this.percent + "%"));
    },
    _redraw: function() {
      this._marker(), this._value(), this._hint();
    },
    _buffer: function() {
      var e = this.element,
        t = this.options,
        n = this.slider.find(".buffer");
      !0 === t.vertical
        ? n.css("height", this.buffer + "%")
        : n.css("width", this.buffer + "%"),
        H.exec(t.onChangeBuffer, [this.buffer], e[0]),
        e.fire("changebuffer", { val: this.buffer }),
        H.exec(t.onChange, [e.val(), this.percent, this.buffer], e[0]),
        e.fire("change", {
          val: e.val(),
          percent: this.percent,
          buffer: this.buffer
        });
    },
    val: function(e) {
      var t = this.options;
      if (void 0 === e || isNaN(e)) return this.value;
      e < t.min && (e = t.min),
        e > t.max && (e = t.max),
        (this.value = this._correct(e)),
        (this.percent = this._convert(this.value, "val2prc")),
        (this.pixel = this._convert(this.percent, "prc2pix")),
        this._redraw();
    },
    buff: function(e) {
      var t = this.slider.find(".buffer");
      return void 0 === e || isNaN(e)
        ? this.buffer
        : 0 !== t.length &&
            (100 < (e = parseInt(e)) && (e = 100),
            e < 0 && (e = 0),
            (this.buffer = e),
            void this._buffer());
    },
    changeValue: function() {
      var e = this.element,
        t = this.options,
        n = e.attr("data-value");
      n < t.min && (n = t.min), n > t.max && (n = t.max), this.val(n);
    },
    changeBuffer: function() {
      var e = this.element,
        t = parseInt(e.attr("data-buffer"));
      t < 0 && (t = 0), 100 < t && (t = 100), this.buff(t);
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-value":
          this.changeValue();
          break;
        case "data-buffer":
          this.changeBuffer();
          break;
        case "disabled":
          this.toggleState();
      }
    },
    destroy: function() {
      var e = this.element,
        t = this.slider,
        n = t.find(".marker");
      return (
        n.off(C.events.startAll),
        n.off(C.events.focus),
        n.off(C.events.blur),
        n.off(C.events.keydown),
        n.off(C.events.keyup),
        t.off(C.events.click),
        k(window).off(C.events.resize, { ns: t.attr("id") }),
        e
      );
    }
  };
  C.plugin("slider", Mt);
  var At = {
    thousandSeparator: ",",
    decimalSeparator: ",",
    sortTarget: null,
    sortSource: null,
    sortDir: "asc",
    sortStart: !0,
    saveInitial: !0,
    onSortStart: C.noop,
    onSortStop: C.noop,
    onSortItemSwitch: C.noop,
    onSorterCreate: C.noop
  };
  (C.sorterSetup = function(e) {
    At = k.extend({}, At, e);
  }),
    window.metroSorterSetup,
    C.sorterSetup(window.metroSorterSetup);
  var Et = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, At, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.initial = []),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "sorter"),
        this._createStructure(),
        H.exec(t.onSorterCreate, null, e[0]),
        e.fire("sortercreate");
    },
    _createStructure: function() {
      var e = this.element,
        t = this.options;
      null === t.sortTarget && (t.sortTarget = e.children()[0].tagName),
        (this.initial = e.find(t.sortTarget).get()),
        !0 === t.sortStart && this.sort(t.sortDir);
    },
    _getItemContent: function(e) {
      var t,
        n,
        i,
        s,
        a = this.options;
      if (H.isValue(a.sortSource)) {
        if (((t = ""), 0 < (n = e.getElementsByClassName(a.sortSource)).length))
          for (i = 0; i < n.length; i++) t += n[i].textContent;
        s = n[0].dataset.format;
      } else (t = e.textContent), (s = e.dataset.format);
      if (
        ((t = ("" + t)
          .toLowerCase()
          .replace(/[\n\r]+|[\s]{2,}/g, " ")
          .trim()),
        H.isValue(s))
      )
        switch (
          (-1 === ["number", "int", "float", "money"].indexOf(s) ||
            ("," === a.thousandSeparator && "." === a.decimalSeparator) ||
            (t = H.parseNumber(t, a.thousandSeparator, a.decimalSeparator)),
          s)
        ) {
          case "date":
            t = H.isDate(t) ? new Date(t) : "";
            break;
          case "number":
            t = Number(t);
            break;
          case "int":
            t = parseInt(t);
            break;
          case "float":
            t = parseFloat(t);
            break;
          case "money":
            t = H.parseMoney(t);
            break;
          case "card":
            t = H.parseCard(t);
            break;
          case "phone":
            t = H.parsePhone(t);
        }
      return t;
    },
    sort: function(e) {
      var t,
        n,
        a = this,
        o = this.element,
        r = this.options,
        i = H.elementId("temp");
      void 0 !== e && (r.sortDir = e),
        0 !== (t = o.find(r.sortTarget).get()).length &&
          ((n = k("<div>")
            .attr("id", i)
            .insertBefore(k(o.find(r.sortTarget)[0]))),
          H.exec(r.onSortStart, [t], o[0]),
          o.fire("sortstart", { items: t }),
          t.sort(function(e, t) {
            var n = a._getItemContent(e),
              i = a._getItemContent(t),
              s = 0;
            return n < i
              ? -1
              : i < n
              ? 1
              : (0 !== s &&
                  (H.exec(r.onSortItemSwitch, [e, t, s], o[0]),
                  o.fire("sortitemswitch", { a: e, b: t, result: s })),
                s);
          }),
          "desc" === r.sortDir && t.reverse(),
          o.find(r.sortTarget).remove(),
          k.each(t, function() {
            var e = k(this);
            e.insertAfter(n), (n = e);
          }),
          k("#" + i).remove(),
          H.exec(r.onSortStop, [t], o[0]),
          o.fire("sortstop"));
    },
    reset: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = H.uniqueId();
      0 !== (e = this.initial).length &&
        ((t = k("<div>")
          .attr("id", s)
          .insertBefore(k(n.find(i.sortTarget)[0]))),
        n.find(i.sortTarget).remove(),
        k.each(e, function() {
          var e = k(this);
          e.insertAfter(t), (t = e);
        }),
        k("#" + s).remove());
    },
    changeAttribute: function(e) {
      var t,
        n,
        i = this,
        s = this.element,
        a = this.options;
      switch (e) {
        case "data-sort-dir":
          "" !== (n = s.attr("data-sort-dir").trim()) &&
            ((a.sortDir = n), i.sort());
          break;
        case "data-sort-content":
          "" !== (t = s.attr("data-sort-content").trim()) &&
            ((a.sortContent = t), i.sort());
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("sorter", Et);
  var Pt = {
    step: 1,
    plusIcon: "<span class='default-icon-plus'></span>",
    minusIcon: "<span class='default-icon-minus'></span>",
    buttonsPosition: "default",
    defaultValue: 0,
    minValue: null,
    maxValue: null,
    fixed: 0,
    repeatThreshold: 1e3,
    hideCursor: !(C.sorter = {
      create: function(e, t) {
        return H.$()(e).sorter(t);
      },
      isSorter: function(e) {
        return H.isMetroObject(e, "sorter");
      },
      sort: function(e, t) {
        if (!this.isSorter(e)) return !1;
        void 0 === t && (t = "asc"), C.getPlugin(k(e)[0], "sorter").sort(t);
      },
      reset: function(e) {
        if (!this.isSorter(e)) return !1;
        C.getPlugin(k(e)[0], "sorter").reset();
      }
    }),
    clsSpinner: "",
    clsSpinnerInput: "",
    clsSpinnerButton: "",
    clsSpinnerButtonPlus: "",
    clsSpinnerButtonMinus: "",
    onBeforeChange: C.noop_true,
    onChange: C.noop,
    onPlusClick: C.noop,
    onMinusClick: C.noop,
    onArrowUp: C.noop,
    onArrowDown: C.noop,
    onButtonClick: C.noop,
    onArrowClick: C.noop,
    onSpinnerCreate: C.noop
  };
  (C.spinnerSetup = function(e) {
    Pt = k.extend({}, Pt, e);
  }),
    window.metroSpinnerSetup,
    C.spinnerSetup(window.metroSpinnerSetup);
  var Nt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Pt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.repeat_timer = !1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "spinner"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onSpinnerCreate, null, e[0]),
        e.fire("spinnercreate");
    },
    _createStructure: function() {
      var e = this.element,
        t = this.options,
        n = k("<div>")
          .addClass("spinner")
          .addClass("buttons-" + t.buttonsPosition)
          .addClass(e[0].className)
          .addClass(t.clsSpinner),
        i = k("<button>")
          .attr("type", "button")
          .addClass("button spinner-button spinner-button-plus")
          .addClass(t.clsSpinnerButton + " " + t.clsSpinnerButtonPlus)
          .html(t.plusIcon),
        s = k("<button>")
          .attr("type", "button")
          .addClass("button spinner-button spinner-button-minus")
          .addClass(t.clsSpinnerButton + " " + t.clsSpinnerButtonMinus)
          .html(t.minusIcon),
        a = e.val().trim();
      H.isValue(a) || e.val(0),
        (e[0].className = ""),
        n.insertBefore(e),
        e.appendTo(n).addClass(t.clsSpinnerInput),
        e.addClass("original-input"),
        i.appendTo(n),
        s.appendTo(n),
        !0 === t.hideCursor && n.addClass("hide-cursor"),
        !0 === t.disabled || e.is(":disabled") ? this.disable() : this.enable();
    },
    _createEvents: function() {
      var a = this,
        o = this.element,
        r = this.options,
        t = o.closest(".spinner"),
        e = t.find(".spinner-button"),
        l = function(e, t) {
          var n = o.val(),
            i = Number(o.val()),
            s = Number(r.step);
          e ? (i += s) : (i -= s),
            a._setValue(i.toFixed(r.fixed), !0),
            H.exec(e ? r.onPlusClick : r.onMinusClick, [n, i, o.val()], o[0]),
            o.fire(e ? "plusclick" : "minusclick", {
              curr: n,
              val: i,
              elementVal: o.val()
            }),
            H.exec(e ? r.onArrowUp : r.onArrowDown, [n, i, o.val()], o[0]),
            o.fire(e ? "arrowup" : "arrowdown", {
              curr: n,
              val: i,
              elementVal: o.val()
            }),
            H.exec(
              r.onButtonClick,
              [n, i, o.val(), e ? "plus" : "minus"],
              o[0]
            ),
            o.fire("buttonclick", {
              button: e ? "plus" : "minus",
              curr: n,
              val: i,
              elementVal: o.val()
            }),
            H.exec(r.onArrowClick, [n, i, o.val(), e ? "plus" : "minus"], o[0]),
            o.fire("arrowclick", {
              button: e ? "plus" : "minus",
              curr: n,
              val: i,
              elementVal: o.val()
            }),
            setTimeout(function() {
              a.repeat_timer && l(e, 100);
            }, t);
        };
      t.on(C.events.click, function(e) {
        k(".focused").removeClass("focused"),
          t.addClass("focused"),
          e.preventDefault(),
          e.stopPropagation();
      }),
        e.on(C.events.start, function(e) {
          var t = k(this)
            .closest(".spinner-button")
            .hasClass("spinner-button-plus");
          e.preventDefault(), (a.repeat_timer = !0), l(t, r.repeatThreshold);
        }),
        e.on(C.events.stop, function() {
          a.repeat_timer = !1;
        }),
        o.on(C.events.keydown, function(e) {
          (e.keyCode !== C.keyCode.UP_ARROW &&
            e.keyCode !== C.keyCode.DOWN_ARROW) ||
            ((a.repeat_timer = !0),
            l(e.keyCode === C.keyCode.UP_ARROW, r.repeatThreshold));
        }),
        t.on(C.events.keyup, function() {
          a.repeat_timer = !1;
        });
    },
    _setValue: function(e, t) {
      var n = this.element,
        i = this.options;
      !0 === H.exec(i.onBeforeChange, [e], n[0]) &&
        (H.isValue(i.maxValue) &&
          e > Number(i.maxValue) &&
          (e = Number(i.maxValue)),
        H.isValue(i.minValue) &&
          e < Number(i.minValue) &&
          (e = Number(i.minValue)),
        n.val(e),
        H.exec(i.onChange, [e], n[0]),
        !0 === t && n.fire("change", { val: e }));
    },
    val: function(e) {
      var t = this.element,
        n = this.options;
      if (!H.isValue(e)) return t.val();
      this._setValue(e.toFixed(n.fixed), !0);
    },
    toDefault: function() {
      var e = this.element,
        t = this.options,
        n = H.isValue(t.defaultValue) ? Number(t.defaultValue) : 0;
      this._setValue(n.toFixed(t.fixed), !0),
        H.exec(t.onChange, [n], e[0]),
        e.fire("change", { val: n });
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      var t,
        n = this,
        i = this.element;
      switch (e) {
        case "disabled":
          this.toggleState();
          break;
        case "value":
          (t = i.attr("value").trim()),
            H.isValue(t) && n._setValue(Number(t), !1);
      }
    },
    destroy: function() {
      var e = this.element,
        t = e.closest(".spinner"),
        n = t.find(".spinner-button");
      return (
        t.off(C.events.click),
        n.off(C.events.start),
        n.off(C.events.stop),
        e.off(C.events.keydown),
        t.off(C.events.keyup),
        e
      );
    }
  };
  C.plugin("spinner", Nt),
    k(document).on(C.events.click, function() {
      k(".spinner").removeClass("focused");
    });
  var Rt = {
    splitMode: "horizontal",
    splitSizes: null,
    gutterSize: 4,
    minSizes: null,
    children: "*",
    gutterClick: "expand",
    saveState: !1,
    onResizeStart: C.noop,
    onResizeStop: C.noop,
    onResizeSplit: C.noop,
    onSplitterCreate: C.noop
  };
  (C.splitterSetup = function(e) {
    Rt = k.extend({}, Rt, e);
  }),
    window.metroSplitterSetup,
    C.splitterSetup(window.metroSplitterSetup);
  var Ft = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Rt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.storage = H.isValue(C.storage) ? C.storage : null),
        (this.storageKey = "SPLITTER:"),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "splitter"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onSplitterCreate, null, e[0]),
        e.fire("splittercreate");
    },
    _createStructure: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = n.children(i.children).addClass("split-block"),
        a = [],
        o = "horizontal" === i.splitMode ? "width" : "height";
      for (
        H.isValue(n.attr("id")) || n.attr("id", H.elementId("splitter")),
          n.addClass("splitter"),
          "vertical" === i.splitMode.toLowerCase() && n.addClass("vertical"),
          e = 0;
        e < s.length - 1;
        e++
      )
        k("<div>")
          .addClass("gutter")
          .css(o, i.gutterSize)
          .insertAfter(k(s[e]));
      if (((t = n.children(".gutter")), H.isValue(i.splitSizes)))
        for (a = H.strToArray(i.splitSizes), e = 0; e < a.length; e++)
          k(s[e]).css({
            flexBasis: "calc(" + a[e] + "% - " + t.length * i.gutterSize + "px)"
          });
      else
        s.css({
          flexBasis:
            "calc(" + 100 / s.length + "% - " + t.length * i.gutterSize + "px)"
        });
      if (H.isValue(i.minSizes))
        if (String(i.minSizes).contains(","))
          for (a = H.strToArray(i.minSizes), e = 0; e < a.length; e++)
            k(s[e]).data("min-size", a[e]),
              s[e].style.setProperty(
                "min-" + o,
                String(a[e]).contains("%")
                  ? a[e]
                  : String(a[e]).replace("px", "") + "px",
                "important"
              );
        else
          k.each(s, function() {
            this.style.setProperty(
              "min-" + o,
              String(i.minSizes).contains("%")
                ? i.minSizes
                : String(i.minSizes).replace("px", "") + "px",
              "important"
            );
          });
      i.saveState && null !== this.storage && this._getSize();
    },
    _createEvents: function() {
      var n = this,
        d = this.element,
        h = this.options,
        u = d.children(".gutter");
      u.on(C.events.start, function(e) {
        var i = "horizontal" === h.splitMode ? d.width() : d.height(),
          s = k(this),
          a = s.prev(".split-block"),
          o = s.next(".split-block"),
          r =
            (100 *
              ("horizontal" === h.splitMode
                ? a.outerWidth(!0)
                : a.outerHeight(!0))) /
            i,
          l =
            (100 *
              ("horizontal" === h.splitMode
                ? o.outerWidth(!0)
                : o.outerHeight(!0))) /
            i,
          c = H.getCursorPosition(d[0], e);
        s.addClass("active"),
          a.addClass("stop-select stop-pointer"),
          o.addClass("stop-select stop-pointer"),
          H.exec(h.onResizeStart, [c, s[0], a[0], o[0]], d[0]),
          d.fire("resizestart", {
            pos: c,
            gutter: s[0],
            prevBlock: a[0],
            nextBlock: o[0]
          }),
          k(window).on(
            C.events.move,
            function(e) {
              var t,
                n = H.getCursorPosition(d[0], e);
              (t =
                "horizontal" === h.splitMode
                  ? (100 * n.x) / i - (100 * c.x) / i
                  : (100 * n.y) / i - (100 * c.y) / i),
                a.css(
                  "flex-basis",
                  "calc(" + (r + t) + "% - " + u.length * h.gutterSize + "px)"
                ),
                o.css(
                  "flex-basis",
                  "calc(" + (l - t) + "% - " + u.length * h.gutterSize + "px)"
                ),
                H.exec(h.onResizeSplit, [n, s[0], a[0], o[0]], d[0]),
                d.fire("resizesplit", {
                  pos: n,
                  gutter: s[0],
                  prevBlock: a[0],
                  nextBlock: o[0]
                });
            },
            { ns: d.attr("id") }
          ),
          k(window).on(
            C.events.stop,
            function(e) {
              var t;
              a.removeClass("stop-select stop-pointer"),
                o.removeClass("stop-select stop-pointer"),
                n._saveSize(),
                s.removeClass("active"),
                k(window).off(C.events.move, { ns: d.attr("id") }),
                k(window).off(C.events.stop, { ns: d.attr("id") }),
                (t = H.getCursorPosition(d[0], e)),
                H.exec(h.onResizeStop, [t, s[0], a[0], o[0]], d[0]),
                d.fire("resizestop", {
                  pos: t,
                  gutter: s[0],
                  prevBlock: a[0],
                  nextBlock: o[0]
                });
            },
            { ns: d.attr("id") }
          );
      });
    },
    _saveSize: function() {
      var e = this.element,
        t = this.options,
        n = this.storage,
        i = [];
      !0 === t.saveState &&
        null !== n &&
        (k.each(e.children(".split-block"), function() {
          var e = k(this);
          i.push(e.css("flex-basis"));
        }),
        n.setItem(this.storageKey + e.attr("id"), i));
    },
    _getSize: function() {
      var e = this.element,
        t = this.options,
        n = this.storage,
        i = [];
      !0 === t.saveState &&
        null !== n &&
        ((i = n.getItem(this.storageKey + e.attr("id"))),
        k.each(e.children(".split-block"), function(e, t) {
          var n = k(t);
          H.isValue(i) && H.isValue(i[e]) && n.css("flex-basis", i[e]);
        }));
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return e.children(".gutter").off(C.events.start), e;
    }
  };
  C.plugin("splitter", Ft);
  var Lt = {
    view: C.stepperView.SQUARE,
    steps: 3,
    step: 1,
    stepClick: !1,
    clsStepper: "",
    clsStep: "",
    clsComplete: "",
    clsCurrent: "",
    onStep: C.noop,
    onStepClick: C.noop,
    onStepperCreate: C.noop
  };
  (C.stepperSetup = function(e) {
    Lt = k.extend({}, Lt, e);
  }),
    window.metroStepperSetup,
    C.stepperSetup(window.metroStepperSetup);
  var Bt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Lt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.current = 0),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "stepper"),
        t.step <= 0 && (t.step = 1),
        this._createStepper(),
        this._createEvents(),
        H.exec(t.onStepperCreate, null, e[0]),
        e.fire("steppercreate");
    },
    _createStepper: function() {
      var e,
        t = this.element,
        n = this.options;
      for (
        t
          .addClass("stepper")
          .addClass(n.view)
          .addClass(n.clsStepper),
          e = 1;
        e <= n.steps;
        e++
      )
        k("<span>")
          .addClass("step")
          .addClass(n.clsStep)
          .data("step", e)
          .html("<span>" + e + "</span>")
          .appendTo(t);
      (this.current = 1), this.toStep(n.step);
    },
    _createEvents: function() {
      var t = this,
        n = this.element,
        i = this.options;
      n.on(C.events.click, ".step", function() {
        var e = k(this).data("step");
        !0 === i.stepClick &&
          (t.toStep(e),
          H.exec(i.onStepClick, [e], n[0]),
          n.fire("stepclick", { step: e }));
      });
    },
    next: function() {
      var e = this.element,
        t = (this.options, e.find(".step"));
      this.current + 1 > t.length ||
        (this.current++, this.toStep(this.current));
    },
    prev: function() {
      this.element, this.options;
      this.current - 1 != 0 && (this.current--, this.toStep(this.current));
    },
    last: function() {
      var e = this.element;
      this.options;
      this.toStep(e.find(".step").length);
    },
    first: function() {
      this.toStep(1);
    },
    toStep: function(e) {
      var t = this.element,
        n = this.options,
        i = k(t.find(".step").get(e - 1));
      0 !== i.length &&
        ((this.current = e),
        t
          .find(".step")
          .removeClass("complete current")
          .removeClass(n.clsCurrent)
          .removeClass(n.clsComplete),
        i.addClass("current").addClass(n.clsCurrent),
        i
          .prevAll()
          .addClass("complete")
          .addClass(n.clsComplete),
        H.exec(n.onStep, [this.current], t[0]),
        t.fire("step", { step: this.current }));
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return e.off(C.events.click, ".step"), e;
    }
  };
  C.plugin("stepper", Bt);
  var Ht = function(e) {
    return new Ht.init(e);
  };
  (Ht.prototype = {
    setKey: function(e) {
      this.key = e;
    },
    getKey: function() {
      return this.key;
    },
    setItem: function(e, t) {
      this.storage.setItem(this.key + ":" + e, JSON.stringify(t));
    },
    getItem: function(e, t, n) {
      var i, s;
      s = this.storage.getItem(this.key + ":" + e);
      try {
        i = JSON.parse(s, n);
      } catch (e) {
        i = null;
      }
      return H.nvl(i, t);
    },
    getItemPart: function(e, t, n, i) {
      var s,
        a = this.getItem(e, n, i);
      for (t = t.split("->"), s = 0; s < t.length; s++) a = a[t[s]];
      return a;
    },
    delItem: function(e) {
      this.storage.removeItem(this.key + ":" + e);
    },
    size: function(e) {
      var t;
      switch (e) {
        case "m":
        case "M":
          t = 1048576;
          break;
        case "k":
        case "K":
          t = 1024;
          break;
        default:
          t = 1;
      }
      return JSON.stringify(this.storage).length / t;
    }
  }),
    (Ht.init = function(e) {
      return (this.key = ""), (this.storage = e || window.localStorage), this;
    }),
    (Ht.init.prototype = Ht.prototype),
    (C.storage = Ht(window.localStorage)),
    (C.session = Ht(window.sessionStorage));
  var Vt = {
    wheel: !1,
    duration: METRO_ANIMATION_DURATION,
    defaultClosedIcon: "",
    defaultOpenIcon: "",
    changeUri: !0,
    encodeLink: !0,
    closed: !1,
    chromeNotice: !1,
    startFrom: null,
    slideToStart: !0,
    startSlideSleep: 1e3,
    source: null,
    data: null,
    eventClick: "select",
    selectGlobal: !0,
    streamSelect: !1,
    excludeSelectElement: null,
    excludeClickElement: null,
    excludeElement: null,
    excludeSelectClass: "",
    excludeClickClass: "",
    excludeClass: "",
    onDataLoad: C.noop,
    onDataLoaded: C.noop,
    onDataLoadError: C.noop,
    onStreamClick: C.noop,
    onStreamSelect: C.noop,
    onEventClick: C.noop,
    onEventSelect: C.noop,
    onEventsScroll: C.noop,
    onStreamerCreate: C.noop
  };
  (C.streamerSetup = function(e) {
    Vt = k.extend({}, Vt, e);
  }),
    window.metroStreamerSetup,
    C.streamerSetup(window.metroStreamerSetup);
  var zt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Vt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.data = null),
        (this.scroll = 0),
        (this.scrollDir = "left"),
        (this.events = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var t = this,
        n = this.element,
        i = this.options;
      if (
        (C.checkRuntime(n, "streamer"),
        n.addClass("streamer"),
        void 0 === n.attr("id") && n.attr("id", H.elementId("streamer")),
        null === i.source && null === i.data)
      )
        return !1;
      k("<div>")
        .addClass("streams")
        .appendTo(n),
        k("<div>")
          .addClass("events-area")
          .appendTo(n),
        null !== i.source
          ? (H.exec(i.onDataLoad, [i.source], n[0]),
            n.fire("dataload", { source: i.source }),
            k.json(i.source).then(
              function(e) {
                H.exec(i.onDataLoaded, [i.source, e], n[0]),
                  n.fire("dataloaded", { source: i.source, data: e }),
                  (t.data = e),
                  t.build();
              },
              function(e) {
                H.exec(i.onDataLoadError, [i.source, e], n[0]),
                  n.fire("dataloaderror", { source: i.source, xhr: e });
              }
            ))
          : ((this.data = i.data), this.build()),
        !0 === i.chromeNotice &&
          !0 === H.detectChrome() &&
          !1 === H.isTouchDevice() &&
          k("<p>")
            .addClass("text-small text-muted")
            .html(
              "*) In Chrome browser please press and hold Shift and turn the mouse wheel."
            )
            .insertAfter(n);
    },
    build: function() {
      var e = this,
        w = this.element,
        y = this.options,
        t = this.data,
        a = w.find(".streams").html(""),
        n = w.find(".events-area").html(""),
        x = k("<ul>")
          .addClass("streamer-timeline")
          .html("")
          .appendTo(n),
        o = k("<div>")
          .addClass("streamer-events")
          .appendTo(n),
        i = k("<div>")
          .addClass("event-group")
          .appendTo(o),
        s = H.getURIParameter(null, "StreamerIDS");
      null !== s && !0 === y.encodeLink && (s = atob(s));
      var S = s ? s.split("|")[0] : null,
        T = s ? s.split("|")[1].split(",") : [];
      if (void 0 !== t.actions) {
        var r = k("<div>")
          .addClass("streamer-actions")
          .appendTo(a);
        k.each(t.actions, function() {
          var e = this,
            t = k("<button>")
              .addClass("streamer-action")
              .addClass(e.cls)
              .html(e.html);
          void 0 !== e.onclick &&
            t.on(C.events.click, function() {
              H.exec(e.onclick, [w]);
            }),
            t.appendTo(r);
        });
      }
      x.html(""),
        void 0 === t.timeline &&
          (t.timeline = { start: "09:00", stop: "18:00", step: 20 });
      var l = new Date(),
        c = new Date(),
        d = t.timeline.start ? t.timeline.start.split(":") : [9, 0],
        h = t.timeline.stop ? t.timeline.stop.split(":") : [18, 0],
        u = t.timeline.step ? 60 * parseInt(t.timeline.step) : 1200;
      l.setHours(d[0]),
        l.setMinutes(d[1]),
        l.setSeconds(0),
        c.setHours(h[0]),
        c.setMinutes(h[1]),
        c.setSeconds(0);
      for (var p = l.getTime() / 1e3; p <= c.getTime() / 1e3; p += u) {
        var f = new Date(1e3 * p),
          m = f.getHours(),
          v = f.getMinutes(),
          g = (m < 10 ? "0" + m : m) + ":" + (v < 10 ? "0" + v : v);
        k("<li>")
          .data("time", g)
          .addClass("js-time-point-" + g.replace(":", "-"))
          .html("<em>" + g + "</em>")
          .appendTo(x);
      }
      void 0 !== t.streams &&
        k.each(t.streams, function(f) {
          var m = 0,
            v = k("<div>")
              .addClass("stream")
              .addClass(this.cls)
              .appendTo(a);
          v
            .addClass(this.cls)
            .data("one", !1)
            .data("data", this.data),
            k("<div>")
              .addClass("stream-title")
              .html(this.title)
              .appendTo(v),
            k("<div>")
              .addClass("stream-secondary")
              .html(this.secondary)
              .appendTo(v),
            k(this.icon)
              .addClass("stream-icon")
              .appendTo(v);
          var g = H.computedRgbToHex(H.getStyleOne(v, "background-color")),
            C = H.computedRgbToHex(H.getStyleOne(v, "color")),
            b = k("<div>")
              .addClass("stream-events")
              .data("background-color", g)
              .data("text-color", C)
              .appendTo(i);
          if (void 0 !== this.events) {
            k.each(this.events, function(e) {
              var t,
                n,
                i = this,
                s = void 0 === i.row ? 1 : parseInt(i.row),
                a = f + ":" + e,
                o = void 0 !== i.custom ? i.custom : "",
                r = void 0 !== i.custom_open ? i.custom_open : "",
                l = void 0 !== i.custom_close ? i.custom_close : "";
              if (void 0 === i.skip || !H.bool(i.skip)) {
                n = k("<div>")
                  .data("origin", i)
                  .data("sid", a)
                  .data("data", i.data)
                  .data("time", i.time)
                  .data("target", i.target)
                  .addClass("stream-event")
                  .addClass("size-" + i.size + "x")
                  .addClass(i.cls)
                  .appendTo(b);
                var c =
                    x.find(".js-time-point-" + this.time.replace(":", "-"))[0]
                      .offsetLeft - v.outerWidth(),
                  d = 75 * (s - 1);
                if (
                  (m < s && (m = s),
                  n.css({ position: "absolute", left: c, top: d }),
                  H.isNull(i.html))
                ) {
                  var h = k("<div>")
                      .addClass("stream-event-slide")
                      .appendTo(n),
                    u = k("<div>")
                      .addClass("slide-logo")
                      .appendTo(h),
                    p = k("<div>")
                      .addClass("slide-data")
                      .appendTo(h);
                  void 0 !== i.icon &&
                    (H.isTag(i.icon)
                      ? k(i.icon)
                          .addClass("icon")
                          .appendTo(u)
                      : k("<img>")
                          .addClass("icon")
                          .attr("src", i.icon)
                          .appendTo(u)),
                    k("<span>")
                      .addClass("time")
                      .css({ backgroundColor: g, color: C })
                      .html(i.time)
                      .appendTo(u),
                    k("<div>")
                      .addClass("title")
                      .html(i.title)
                      .appendTo(p),
                    k("<div>")
                      .addClass("subtitle")
                      .html(i.subtitle)
                      .appendTo(p),
                    k("<div>")
                      .addClass("desc")
                      .html(i.desc)
                      .appendTo(p),
                    ((!1 === y.closed &&
                      w.attr("id") === S &&
                      -1 !== T.indexOf(a)) ||
                      !0 === i.selected ||
                      1 === parseInt(i.selected)) &&
                      n.addClass("selected"),
                    !0 === y.closed ||
                    !0 === i.closed ||
                    1 === parseInt(i.closed)
                      ? ((t =
                          void 0 !== i.closedIcon
                            ? H.isTag(i.closedIcon)
                              ? i.closedIcon
                              : "<span>" + i.closedIcon + "</span>"
                            : H.isTag(y.defaultClosedIcon)
                            ? y.defaultClosedIcon
                            : "<span>" + y.defaultClosedIcon + "</span>"),
                        k(t)
                          .addClass("state-icon")
                          .addClass(i.clsClosedIcon)
                          .appendTo(h),
                        n.data("closed", !0).data("target", i.target),
                        n.append(r))
                      : ((t =
                          void 0 !== i.openIcon
                            ? H.isTag(i.openIcon)
                              ? i.openIcon
                              : "<span>" + i.openIcon + "</span>"
                            : H.isTag(y.defaultOpenIcon)
                            ? y.defaultOpenIcon
                            : "<span>" + y.defaultOpenIcon + "</span>"),
                        k(t)
                          .addClass("state-icon")
                          .addClass(i.clsOpenIcon)
                          .appendTo(h),
                        n.data("closed", !1),
                        n.append(l)),
                    n.append(o);
                } else n.html(i.html);
              }
            });
            var e = b.find(".stream-event").last();
            0 < e.length && b.outerWidth(e[0].offsetLeft + e.outerWidth());
          }
          b.css({ height: 75 * m }),
            w
              .find(".stream")
              .eq(b.index())
              .css({ height: 75 * m });
        }),
        void 0 !== t.global &&
          k.each(["before", "after"], function() {
            void 0 !== t.global[this] &&
              k.each(t.global[this], function() {
                var e = k("<div>")
                    .addClass("event-group")
                    .addClass("size-" + this.size + "x"),
                  t = k("<div>")
                    .addClass("stream-events global-stream")
                    .appendTo(e),
                  n = k("<div>")
                    .addClass("stream-event")
                    .appendTo(t);
                n
                  .addClass("global-event")
                  .addClass(this.cls)
                  .data("time", this.time)
                  .data("origin", this)
                  .data("data", this.data),
                  k("<div>")
                    .addClass("event-title")
                    .html(this.title)
                    .appendTo(n),
                  k("<div>")
                    .addClass("event-subtitle")
                    .html(this.subtitle)
                    .appendTo(n),
                  k("<div>")
                    .addClass("event-html")
                    .html(this.html)
                    .appendTo(n);
                var i,
                  s = x.find(".js-time-point-" + this.time.replace(":", "-"));
                0 < s.length &&
                  (i = s[0].offsetLeft - a.find(".stream").outerWidth()),
                  e
                    .css({ position: "absolute", left: i, height: "100%" })
                    .appendTo(o);
              });
          }),
        w.data("stream", -1),
        w.find(".events-area").scrollLeft(0),
        (this.events = w.find(".stream-event")),
        this._createEvents(),
        null !== y.startFrom &&
          !0 === y.slideToStart &&
          setTimeout(function() {
            e.slideTo(y.startFrom);
          }, y.startSlideSleep),
        H.exec(y.onStreamerCreate, null, w[0]),
        w.fire("streamercreate"),
        this._fireScroll();
    },
    _fireScroll: function() {
      var e = this.element,
        t = this.options,
        n = e.find(".events-area"),
        i = this.scroll;
      0 !== n.length &&
        ((this.scrollDir = this.scroll < n[0].scrollLeft ? "left" : "right"),
        (this.scroll = n[0].scrollLeft),
        H.exec(
          t.onEventsScroll,
          [n[0].scrollLeft, i, this.scrollDir, k.toArray(this.events)],
          e[0]
        ),
        e.fire("eventsscroll", {
          scrollLeft: n[0].scrollLeft,
          oldScroll: i,
          scrollDir: this.scrollDir,
          events: k.toArray(this.events)
        }));
    },
    _createEvents: function() {
      var i = this,
        s = this.element,
        a = this.options;
      s
        .off(C.events.click, ".stream-event")
        .on(C.events.click, ".stream-event", function(e) {
          var t = k(this);
          if (
            !(
              ("" !== a.excludeClass && t.hasClass(a.excludeClass)) ||
              (null !== a.excludeElement && k(e.target).is(a.excludeElement))
            )
          )
            if (
              !1 === a.closed &&
              !0 !== t.data("closed") &&
              "select" === a.eventClick
            )
              ("" !== a.excludeSelectClass &&
                t.hasClass(a.excludeSelectClass)) ||
                (null !== a.excludeSelectElement &&
                  k(e.target).is(a.excludeSelectElement)) ||
                (t.hasClass("global-event")
                  ? !0 === a.selectGlobal && t.toggleClass("selected")
                  : t.toggleClass("selected"),
                !0 === a.changeUri && i._changeURI(),
                H.exec(a.onEventSelect, [t[0], t.hasClass("selected")], s[0]),
                s.fire("eventselect", {
                  event: t[0],
                  selected: t.hasClass("selected")
                }));
            else if (
              "" !== a.excludeClickClass &&
              t.hasClass(a.excludeClickClass)
            );
            else if (
              null !== a.excludeClickElement &&
              k(e.target).is(a.excludeClickElement)
            );
            else if (
              (H.exec(a.onEventClick, [t[0]], s[0]),
              s.fire("eventclick", { event: t[0] }),
              !0 === a.closed || !0 === t.data("closed"))
            ) {
              var n = t.data("target");
              n && (window.location.href = n);
            }
        }),
        s
          .off(C.events.click, ".stream")
          .on(C.events.click, ".stream", function(e) {
            var t = k(this),
              n = t.index();
            !1 !== a.streamSelect &&
              (s.data("stream") === n
                ? (s.find(".stream-event").removeClass("disabled"),
                  s.data("stream", -1))
                : (s.data("stream", n),
                  s.find(".stream-event").addClass("disabled"),
                  i.enableStream(t),
                  H.exec(a.onStreamSelect, [t], s[0]),
                  s.fire("streamselect", { stream: t })),
              H.exec(a.onStreamClick, [t], s[0]),
              s.fire("streamclick", { stream: t }));
          }),
        !0 === a.wheel &&
          (s.find(".events-area").off(C.events.mousewheel),
          s.find(".events-area").on(C.events.mousewheel, function(e) {
            var t,
              n = k(this),
              i = e.originalEvent,
              s = i.deltaY < 0 ? -1 : 1;
            void 0 !== i.deltaY &&
              ((t = n.scrollLeft() - 100 * s),
              n.scrollLeft(t),
              i.preventDefault());
          })),
        s
          .find(".events-area")
          .last()
          .off("scroll"),
        s
          .find(".events-area")
          .last()
          .on("scroll", function(e) {
            i._fireScroll();
          }),
        !0 === H.isTouchDevice() &&
          s
            .off(C.events.click, ".stream")
            .on(C.events.click, ".stream", function() {
              var e = k(this);
              e.toggleClass("focused"),
                k.each(s.find(".stream"), function() {
                  k(this).is(e) || k(this).removeClass("focused");
                });
            });
    },
    _changeURI: function() {
      this.element, this.options, this.data;
      var e = this.getLink();
      history.pushState({}, document.title, e);
    },
    slideTo: function(e) {
      var t,
        n = this.element,
        i = this.options;
      this.data;
      (t = k(
        void 0 === e
          ? n.find(".streamer-timeline li")[0]
          : n.find(
              ".streamer-timeline .js-time-point-" + e.replace(":", "-")
            )[0]
      )),
        n
          .find(".events-area")
          .animate(
            {
              scrollLeft:
                t[0].offsetLeft - n.find(".streams .stream").outerWidth()
            },
            i.duration
          );
    },
    enableStream: function(e) {
      var t = this.element,
        n = (this.options, this.data, e.index() - 1);
      e.removeClass("disabled").data("streamDisabled", !1),
        t
          .find(".stream-events")
          .eq(n)
          .find(".stream-event")
          .removeClass("disabled");
    },
    disableStream: function(e) {
      var t = this.element,
        n = (this.options, this.data, e.index() - 1);
      e.addClass("disabled").data("streamDisabled", !0),
        t
          .find(".stream-events")
          .eq(n)
          .find(".stream-event")
          .addClass("disabled");
    },
    toggleStream: function(e) {
      !0 === e.data("streamDisabled")
        ? this.enableStream(e)
        : this.disableStream(e);
    },
    getLink: function() {
      var e,
        t = this.element,
        n = this.options,
        i = (this.data, t.find(".stream-event")),
        s = [],
        a = window.location.href;
      return (
        k.each(i, function() {
          var e = k(this);
          void 0 !== e.data("sid") &&
            e.hasClass("selected") &&
            s.push(e.data("sid"));
        }),
        (e = t.attr("id") + "|" + s.join(",")),
        !0 === n.encodeLink && (e = btoa(e)),
        H.updateURIParameter(a, "StreamerIDS", e)
      );
    },
    getTimes: function() {
      var e = this.element,
        t = (this.options, this.data, e.find(".streamer-timeline > li")),
        n = [];
      return (
        k.each(t, function() {
          n.push(k(this).data("time"));
        }),
        n
      );
    },
    getEvents: function(e, n) {
      var t,
        i = this.element,
        s = (this.options, this.data, []);
      switch (e) {
        case "selected":
          t = i.find(".stream-event.selected");
          break;
        case "non-selected":
          t = i.find(".stream-event:not(.selected)");
          break;
        default:
          t = i.find(".stream-event");
      }
      return (
        k.each(t, function() {
          var e,
            t = k(this);
          (!0 !== n && t.parent().hasClass("global-stream")) ||
            ((e = t.data("origin")), s.push(e));
        }),
        s
      );
    },
    source: function(e) {
      var t = this.element;
      this.options;
      if (void 0 === e) return this.options.source;
      t.attr("data-source", e), (this.options.source = e), this.changeSource();
    },
    dataSet: function(e) {
      if (void 0 === e) return this.options.data;
      (this.options.data = e), this.changeData(e);
    },
    getStreamerData: function() {
      return this.data;
    },
    toggleEvent: function(e) {
      this.element;
      var t = this.options;
      this.data;
      ((e = k(e)).hasClass("global-event") && !0 !== t.selectGlobal) ||
        (e.hasClass("selected")
          ? this.selectEvent(e, !1)
          : this.selectEvent(e, !0));
    },
    selectEvent: function(e, t) {
      var n = this.element,
        i = this.options;
      this.data;
      void 0 === t && (t = !0),
        ((e = k(e)).hasClass("global-event") && !0 !== i.selectGlobal) ||
          (!0 === t ? e.addClass("selected") : e.removeClass("selected"),
          !0 === i.changeUri && this._changeURI(),
          H.exec(i.onEventSelect, [e[0], t], n[0]),
          n.fire("eventselect", { event: e[0], selected: t }));
    },
    changeSource: function() {
      var t = this,
        n = this.element,
        i = this.options,
        e = (this.data, n.attr("data-source"));
      "" !== String(e).trim() &&
        ((i.source = e),
        H.exec(i.onDataLoad, [i.source], n[0]),
        n.fire("dataload", { source: i.source }),
        k.json(i.source).then(
          function(e) {
            H.exec(i.onDataLoaded, [i.source, e], n[0]),
              n.fire("dataloaded", { source: i.source, data: e }),
              (t.data = e),
              t.build();
          },
          function(e) {
            H.exec(i.onDataLoadError, [i.source, e], n[0]),
              n.fire("dataloaderror", { source: i.source, xhr: e });
          }
        ),
        n.fire("sourcechange"));
    },
    changeData: function(e) {
      var t = this.element,
        n = this.options,
        i = this.data;
      (n.data = "object" == typeof e ? e : JSON.parse(t.attr("data-data"))),
        (this.data = n.data),
        this.build(),
        t.fire("datachange", { oldData: i, newData: n.data });
    },
    changeStreamSelectOption: function() {
      var e = this.element,
        t = this.options;
      this.data;
      t.streamSelect = "true" === e.attr("data-stream-select").toLowerCase();
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-source":
          this.changeSource();
          break;
        case "data-data":
          this.changeData();
          break;
        case "data-stream-select":
          this.changeStreamSelectOption();
      }
    },
    destroy: function() {
      var e = this.element;
      return (
        e.off(C.events.click, ".stream-event"),
        e.off(C.events.click, ".stream"),
        e.find(".events-area").off(C.events.mousewheel),
        e
          .find(".events-area")
          .last()
          .off("scroll"),
        e
      );
    }
  };
  C.plugin("streamer", zt);
  var jt = {
    material: !1,
    transition: !0,
    caption: "",
    captionPosition: "right",
    clsSwitch: "",
    clsCheck: "",
    clsCaption: "",
    onSwitchCreate: C.noop
  };
  (C.switchSetup = function(e) {
    jt = k.extend({}, jt, e);
  }),
    window.metroSwitchSetup,
    C.switchSetup(window.metroSwitchSetup);
  var Ut = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, jt, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options,
        n = k("<label>").addClass(
          (!0 === t.material ? " switch-material " : " switch ") +
            e[0].className
        ),
        i = k("<span>").addClass("check"),
        s = k("<span>")
          .addClass("caption")
          .html(t.caption);
      C.checkRuntime(e, "switch"),
        e.attr("type", "checkbox"),
        n.insertBefore(e),
        e.appendTo(n),
        i.appendTo(n),
        s.appendTo(n),
        !0 === t.transition && n.addClass("transition-on"),
        "left" === t.captionPosition && n.addClass("caption-left"),
        (e[0].className = ""),
        n.addClass(t.clsSwitch),
        s.addClass(t.clsCaption),
        i.addClass(t.clsCheck),
        e.is(":disabled") ? this.disable() : this.enable(),
        H.exec(t.onSwitchCreate, null, e[0]),
        e.fire("switchcreate");
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      switch (e) {
        case "disabled":
          this.toggleState();
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("switch", Ut);
  var Wt = {
    emptyTableTitle: "Nothing to show",
    templateBeginToken: "<%",
    templateEndToken: "%>",
    paginationDistance: 5,
    locale: METRO_LOCALE,
    horizontalScroll: !1,
    horizontalScrollStop: null,
    check: !1,
    checkType: "checkbox",
    checkStyle: 1,
    checkColIndex: 0,
    checkName: null,
    checkStoreKey: "TABLE:$1:KEYS",
    rownum: !1,
    rownumTitle: "#",
    filters: null,
    filtersOperator: "and",
    source: null,
    searchMinLength: 1,
    searchThreshold: 500,
    searchFields: null,
    showRowsSteps: !0,
    showSearch: !0,
    showTableInfo: !0,
    showPagination: !0,
    paginationShortMode: !0,
    showActivity: !0,
    muteTable: !0,
    rows: 10,
    rowsSteps: "10,25,50,100",
    staticView: !1,
    viewSaveMode: "client",
    viewSavePath: "TABLE:$1:OPTIONS",
    sortDir: "asc",
    decimalSeparator: ".",
    thousandSeparator: ",",
    tableRowsCountTitle: "Show entries:",
    tableSearchTitle: "Search:",
    tableInfoTitle: "Showing $1 to $2 of $3 entries",
    paginationPrevTitle: "Prev",
    paginationNextTitle: "Next",
    allRecordsTitle: "All",
    inspectorTitle: "Inspector",
    activityType: "cycle",
    activityStyle: "color",
    activityTimeout: 100,
    searchWrapper: null,
    rowsWrapper: null,
    infoWrapper: null,
    paginationWrapper: null,
    cellWrapper: !0,
    clsComponent: "",
    clsTableContainer: "",
    clsTable: "",
    clsHead: "",
    clsHeadRow: "",
    clsHeadCell: "",
    clsBody: "",
    clsBodyRow: "",
    clsBodyCell: "",
    clsCellWrapper: "",
    clsFooter: "",
    clsFooterRow: "",
    clsFooterCell: "",
    clsTableTop: "",
    clsRowsCount: "",
    clsSearch: "",
    clsTableBottom: "",
    clsTableInfo: "",
    clsTablePagination: "",
    clsPagination: "",
    clsEvenRow: "",
    clsOddRow: "",
    clsRow: "",
    clsEmptyTableTitle: "",
    onDraw: C.noop,
    onDrawRow: C.noop,
    onDrawCell: C.noop,
    onAppendRow: C.noop,
    onAppendCell: C.noop,
    onSortStart: C.noop,
    onSortStop: C.noop,
    onSortItemSwitch: C.noop,
    onSearch: C.noop,
    onRowsCountChange: C.noop,
    onDataLoad: C.noop,
    onDataLoadError: C.noop,
    onDataLoaded: C.noop,
    onFilterRowAccepted: C.noop,
    onFilterRowDeclined: C.noop,
    onCheckClick: C.noop,
    onCheckClickAll: C.noop,
    onCheckDraw: C.noop,
    onViewSave: C.noop,
    onViewGet: C.noop,
    onViewCreated: C.noop,
    onTableCreate: C.noop
  };
  (C.tableSetup = function(e) {
    Wt = k.extend({}, Wt, e);
  }),
    window.metroTableSetup,
    C.tableSetup(window.metroTableSetup);
  var Yt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Wt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.currentPage = 1),
        (this.pagesCount = 1),
        (this.searchString = ""),
        (this.data = null),
        (this.activity = null),
        (this.busy = !1),
        (this.filters = []),
        (this.wrapperInfo = null),
        (this.wrapperSearch = null),
        (this.wrapperRows = null),
        (this.wrapperPagination = null),
        (this.filterIndex = null),
        (this.filtersIndexes = []),
        (this.component = null),
        (this.inspector = null),
        (this.view = {}),
        (this.viewDefault = {}),
        (this.locale = C.locales["en-US"]),
        (this.input_interval = null),
        (this.searchFields = []),
        (this.sort = { dir: "asc", colIndex: 0 }),
        (this.service = []),
        (this.heads = []),
        (this.items = []),
        (this.foots = []),
        (this.filteredItems = []),
        (this.index = {}),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var t = this,
        n = this.element,
        i = this.options,
        e = H.elementId("table");
      C.checkRuntime(n, "table"),
        H.isValue(n.attr("id")) || n.attr("id", e),
        H.isValue(C.locales[i.locale]) && (this.locale = C.locales[i.locale]),
        H.isValue(i.searchFields) &&
          (this.searchFields = H.strToArray(i.searchFields)),
        null !== i.source
          ? (H.exec(i.onDataLoad, [i.source], n[0]),
            n.fire("dataload", { source: i.source }),
            k.json(i.source).then(
              function(e) {
                if ("object" != typeof e)
                  throw new Error("Data for table is not a object");
                H.exec(i.onDataLoaded, [i.source, e], n[0]),
                  n.fire("dataloaded", { source: i.source, data: e }),
                  t._build(e);
              },
              function(e) {
                H.exec(i.onDataLoadError, [i.source, e], n[0]),
                  n.fire("dataloaderror", { source: i.source, xhr: e });
              }
            ))
          : t._build();
    },
    _createIndex: function() {
      var n = this,
        i = this.options.checkColIndex;
      setImmediate(function() {
        n.items.forEach(function(e, t) {
          n.index[e[i]] = t;
        });
      });
    },
    _build: function(e) {
      var t,
        n = this,
        i = this.element,
        s = this.options,
        a = i.attr("id");
      (s.rows = parseInt(s.rows)),
        (this.items = []),
        (this.heads = []),
        (this.foots = []),
        H.isValue(e)
          ? this._createItemsFromJSON(e)
          : this._createItemsFromHTML(),
        this._createIndex(),
        (this.view = this._createView()),
        (this.viewDefault = H.objectClone(this.view)),
        "client" === s.viewSaveMode.toLowerCase()
          ? ((t = C.storage.getItem(s.viewSavePath.replace("$1", a))),
            H.isValue(t) &&
              H.objectLength(t) === H.objectLength(this.view) &&
              ((this.view = t),
              H.exec(s.onViewGet, [t], i[0]),
              i.fire("viewget", { source: "client", view: t })),
            this._final())
          : k.json(s.viewSavePath, { id: a }).then(
              function(e) {
                H.isValue(e) &&
                  H.objectLength(e) === H.objectLength(n.view) &&
                  ((n.view = e),
                  H.exec(s.onViewGet, [e], i[0]),
                  i.fire("viewget", { source: "server", view: e })),
                  n._final();
              },
              function() {
                n._final(),
                  console.log(
                    "Warning! Error loading view for table " +
                      i.attr("id") +
                      " "
                  );
              }
            );
    },
    _final: function() {
      var e = this.element,
        t = this.options,
        n = e.attr("id");
      C.storage.delItem(t.checkStoreKey.replace("$1", n)),
        this._service(),
        this._createStructure(),
        this._createInspector(),
        this._createEvents(),
        H.exec(t.onTableCreate, [e], e[0]),
        e.fire("tablecreate");
    },
    _service: function() {
      var e = this.options;
      this.service = [
        {
          title: e.rownumTitle,
          format: void 0,
          name: void 0,
          sortable: !1,
          sortDir: void 0,
          clsColumn: "rownum-cell " + (!0 !== e.rownum ? "d-none" : ""),
          cls: "rownum-cell " + (!0 !== e.rownum ? "d-none" : ""),
          colspan: void 0,
          type: "rownum"
        },
        {
          title:
            "checkbox" === e.checkType
              ? "<input type='checkbox' data-role='checkbox' class='table-service-check-all' data-style='" +
                e.checkStyle +
                "'>"
              : "",
          format: void 0,
          name: void 0,
          sortable: !1,
          sortDir: void 0,
          clsColumn: "check-cell " + (!0 !== e.check ? "d-none" : ""),
          cls: "check-cell " + (!0 !== e.check ? "d-none" : ""),
          colspan: void 0,
          type: "rowcheck"
        }
      ];
    },
    _createView: function() {
      var t,
        e = this.element,
        n = this.options;
      return (
        (t = {}),
        k.each(this.heads, function(e) {
          H.isValue(this.cls) && (this.cls = this.cls.replace("hidden", "")),
            H.isValue(this.clsColumn) &&
              (this.clsColumn = this.clsColumn.replace("hidden", "")),
            (t[e] = {
              index: e,
              "index-view": e,
              show: !H.isValue(this.show) || this.show,
              size: H.isValue(this.size) ? this.size : ""
            });
        }),
        H.exec(n.onViewCreated, [t], t),
        e.fire("viewcreated", { view: t }),
        t
      );
    },
    _createInspectorItems: function(e) {
      var t,
        n,
        i = this,
        s = this.options,
        a = [],
        o = this.heads;
      for (e.html(""), t = 0; t < o.length; t++) a[t] = null;
      for (
        k.each(o, function(e) {
          (n = k("<tr>")).data("index", e),
            n.data("index-view", e),
            k("<td>")
              .html(
                "<input type='checkbox' data-style='" +
                  s.checkStyle +
                  "' data-role='checkbox' name='column_show_check[]' value='" +
                  e +
                  "' " +
                  (H.bool(i.view[e].show) ? "checked" : "") +
                  ">"
              )
              .appendTo(n),
            k("<td>")
              .html(this.title)
              .appendTo(n),
            k("<td>")
              .html(
                "<input type='number' data-role='spinner' name='column_size' value='" +
                  i.view[e].size +
                  "' data-index='" +
                  e +
                  "'>"
              )
              .appendTo(n),
            k("<td>")
              .html(
                "<button class='button square js-table-inspector-field-up' type='button'><span class='mif-arrow-up'></span></button><button class='button square js-table-inspector-field-down' type='button'><span class='mif-arrow-down'></span></button>"
              )
              .appendTo(n),
            (a[i.view[e]["index-view"]] = n);
        }),
          t = 0;
        t < o.length;
        t++
      )
        a[t].appendTo(e);
    },
    _createInspector: function() {
      var e,
        t,
        n,
        i,
        s,
        a = this.options;
      (e = k(
        "<div data-role='draggable' data-drag-element='.table-inspector-header' data-drag-area='body'>"
      ).addClass("table-inspector")).attr("for", this.element.attr("id")),
        k(
          "<div class='table-inspector-header'>" + a.inspectorTitle + "</div>"
        ).appendTo(e),
        (t = k("<div>")
          .addClass("table-wrap")
          .appendTo(e)),
        (n = k("<table>").addClass("table subcompact")),
        (i = k("<tbody>").appendTo(n)),
        n.appendTo(t),
        this._createInspectorItems(i),
        (s = k("<div class='table-inspector-actions'>").appendTo(e)),
        k(
          "<button class='button primary js-table-inspector-save' type='button'>"
        )
          .html(this.locale.buttons.save)
          .appendTo(s),
        k(
          "<button class='button secondary js-table-inspector-reset ml-2 mr-2' type='button'>"
        )
          .html(this.locale.buttons.reset)
          .appendTo(s),
        k(
          "<button class='button link js-table-inspector-cancel place-right' type='button'>"
        )
          .html(this.locale.buttons.cancel)
          .appendTo(s),
        e.data("open", !1),
        (this.inspector = e),
        k("body").append(e),
        this._createInspectorEvents();
    },
    _resetInspector: function() {
      var e = this.inspector.find("table tbody");
      this._createInspectorItems(e), this._createInspectorEvents();
    },
    _createHeadsFormHTML: function() {
      var s = this,
        e = this.element.find("thead");
      0 < e.length &&
        k.each(e.find("tr > *"), function() {
          var e,
            t,
            n,
            i = k(this);
          (e = H.isValue(i.data("sort-dir"))
            ? i.data("sort-dir")
            : i.hasClass("sort-asc")
            ? "asc"
            : i.hasClass("sort-desc")
            ? "desc"
            : void 0),
            (n = (n = (n = (n = i[0].className.replace(
              "sortable-column",
              ""
            )).replace("sort-asc", "")).replace("sort-desc", "")).replace(
              "hidden",
              ""
            )),
            (t = {
              type: "data",
              title: i.html(),
              name: H.isValue(i.data("name"))
                ? i.data("name")
                : i.text().replace(" ", "_"),
              sortable:
                i.hasClass("sortable-column") ||
                (H.isValue(i.data("sortable")) &&
                  JSON.parse(!0 === i.data("sortable"))),
              sortDir: e,
              format: H.isValue(i.data("format")) ? i.data("format") : "string",
              clsColumn: H.isValue(i.data("cls-column"))
                ? i.data("cls-column")
                : "",
              cls: n,
              colspan: i.attr("colspan"),
              size: H.isValue(i.data("size")) ? i.data("size") : "",
              show: !(
                i.hasClass("hidden") ||
                (H.isValue(i.data("show")) && !1 === JSON.parse(i.data("show")))
              ),
              required:
                !!H.isValue(i.data("required")) &&
                !0 === JSON.parse(i.data("required")),
              field: H.isValue(i.data("field")) ? i.data("field") : "input",
              fieldType: H.isValue(i.data("field-type"))
                ? i.data("field-type")
                : "text",
              validator: H.isValue(i.data("validator"))
                ? i.data("validator")
                : null,
              template: H.isValue(i.data("template"))
                ? i.data("template")
                : null
            }),
            s.heads.push(t);
        });
    },
    _createFootsFromHTML: function() {
      var n = this,
        e = this.element.find("tfoot");
      0 < e.length &&
        k.each(e.find("tr > *"), function() {
          var e,
            t = k(this);
          (e = {
            title: t.html(),
            name: !!H.isValue(t.data("name")) && t.data("name"),
            cls: t[0].className,
            colspan: t.attr("colspan")
          }),
            n.foots.push(e);
        });
    },
    _createItemsFromHTML: function() {
      var n = this,
        e = this.element.find("tbody");
      0 < e.length &&
        k.each(e.find("tr"), function() {
          var e = k(this),
            t = [];
          k.each(e.children("td"), function() {
            var e = k(this);
            t.push(e.html());
          }),
            n.items.push(t);
        }),
        this._createHeadsFormHTML(),
        this._createFootsFromHTML();
    },
    _createItemsFromJSON: function(e) {
      var t = this;
      "string" == typeof e && (e = JSON.parse(e)),
        void 0 !== e.header
          ? (t.heads = e.header)
          : this._createHeadsFormHTML(),
        void 0 !== e.data &&
          k.each(e.data, function() {
            var e = [];
            k.each(this, function() {
              e.push(this);
            }),
              t.items.push(e);
          }),
        void 0 !== e.footer
          ? (this.foots = e.footer)
          : this._createFootsFromHTML();
    },
    _createTableHeader: function() {
      var t,
        i,
        e,
        n,
        s = this.element,
        a = this.options,
        o = k("<thead>").html(""),
        r = [],
        l = a.staticView ? this._createView() : this.view;
      if (
        (s.find("thead").remove(),
        o.addClass(a.clsHead),
        0 === this.heads.length)
      )
        return o;
      for (
        t = k("<tr>")
          .addClass(a.clsHeadRow)
          .appendTo(o),
          k.each(this.service, function() {
            var e = [];
            (i = k("<th>").appendTo(t)),
              H.isValue(this.title) && i.html(this.title),
              H.isValue(this.size) && i.css({ width: this.size }),
              H.isValue(this.cls) && e.push(this.cls),
              e.push(a.clsHeadCell),
              i.addClass(e.join(" "));
          }),
          n = this.heads,
          e = 0;
        e < n.length;
        e++
      )
        r[e] = null;
      for (
        k.each(n, function(e) {
          var t = this,
            n = [];
          (i = k("<th>")).data("index", e),
            H.isValue(t.title) && i.html(t.title),
            H.isValue(t.format) && i.attr("data-format", t.format),
            H.isValue(t.name) && i.attr("data-name", t.name),
            H.isValue(t.colspan) && i.attr("colspan", t.colspan),
            H.isValue(l[e].size) && i.css({ width: l[e].size }),
            !0 === t.sortable &&
              (n.push("sortable-column"),
              H.isValue(t.sortDir) && n.push("sort-" + t.sortDir)),
            H.isValue(t.cls) &&
              k.each(t.cls.toArray(), function() {
                n.push(this);
              }),
            !1 === H.bool(l[e].show) &&
              -1 === n.indexOf("hidden") &&
              n.push("hidden"),
            n.push(a.clsHeadCell),
            H.bool(l[e].show) && H.arrayDelete(n, "hidden"),
            i.addClass(n.join(" ")),
            (r[l[e]["index-view"]] = i);
        }),
          e = 0;
        e < n.length;
        e++
      )
        r[e].appendTo(t);
      s.prepend(o);
    },
    _createTableBody: function() {
      var e,
        t = this.element;
      (e = t.find("thead")),
        t.find("tbody").remove(),
        k("<tbody>")
          .addClass(this.options.clsBody)
          .insertAfter(e);
    },
    _createTableFooter: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = k("<tfoot>").addClass(i.clsFooter);
      n.find("tfoot").remove(),
        0 !== this.foots.length &&
          ((e = k("<tr>")
            .addClass(i.clsHeadRow)
            .appendTo(s)),
          k.each(this.foots, function() {
            (t = k("<th>").appendTo(e)),
              void 0 !== this.title && t.html(this.title),
              void 0 !== this.name &&
                t.addClass("foot-column-name-" + this.name),
              void 0 !== this.cls && t.addClass(this.cls),
              H.isValue(this.colspan) && t.attr("colspan", this.colspan),
              t.appendTo(e);
          })),
        n.append(s);
    },
    _createTopBlock: function() {
      var e,
        t,
        n,
        i = this,
        s = this.element,
        a = this.options,
        o = k("<div>")
          .addClass("table-top")
          .addClass(a.clsTableTop)
          .insertBefore(s.parent());
      return (
        (e = H.isValue(this.wrapperSearch)
          ? this.wrapperSearch
          : k("<div>")
              .addClass("table-search-block")
              .addClass(a.clsSearch)
              .appendTo(o)).addClass(a.clsSearch),
        k("<input>")
          .attr("type", "text")
          .appendTo(e)
          .input({ prepend: a.tableSearchTitle }),
        !0 !== a.showSearch && e.hide(),
        (t = H.isValue(this.wrapperRows)
          ? this.wrapperRows
          : k("<div>")
              .addClass("table-rows-block")
              .appendTo(o)).addClass(a.clsRowsCount),
        (n = k("<select>").appendTo(t)),
        k.each(H.strToArray(a.rowsSteps), function() {
          var e = parseInt(this),
            t = k("<option>")
              .attr("value", e)
              .text(-1 === e ? a.allRecordsTitle : e)
              .appendTo(n);
          e === parseInt(a.rows) && t.attr("selected", "selected");
        }),
        n.select({
          filter: !1,
          prepend: a.tableRowsCountTitle,
          onChange: function(e) {
            (e = parseInt(e)) !== parseInt(a.rows) &&
              ((a.rows = e),
              (i.currentPage = 1),
              i._draw(),
              H.exec(a.onRowsCountChange, [e], s[0]),
              s.fire("rowscountchange", { val: e }));
          }
        }),
        !0 !== a.showRowsSteps && t.hide(),
        o
      );
    },
    _createBottomBlock: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = k("<div>")
          .addClass("table-bottom")
          .addClass(i.clsTableBottom)
          .insertAfter(n.parent());
      return (
        (e = H.isValue(this.wrapperInfo)
          ? this.wrapperInfo
          : k("<div>")
              .addClass("table-info")
              .appendTo(s)).addClass(i.clsTableInfo),
        !0 !== i.showTableInfo && e.hide(),
        (t = H.isValue(this.wrapperPagination)
          ? this.wrapperPagination
          : k("<div>")
              .addClass("table-pagination")
              .appendTo(s)).addClass(i.clsTablePagination),
        !0 !== i.showPagination && t.hide(),
        s
      );
    },
    _createStructure: function() {
      var e,
        t,
        n,
        i = this,
        s = this.element,
        a = this.options,
        o = k(a.searchWrapper),
        r = k(a.infoWrapper),
        l = k(a.rowsWrapper),
        c = k(a.paginationWrapper);
      0 < o.length && (this.wrapperSearch = o),
        0 < r.length && (this.wrapperInfo = r),
        0 < l.length && (this.wrapperRows = l),
        0 < c.length && (this.wrapperPagination = c),
        (t = k("<div>").addClass("table-component")).attr(
          "id",
          H.elementId("table")
        ),
        t.insertBefore(s),
        (e = k("<div>")
          .addClass("table-container")
          .addClass(a.clsTableContainer)
          .appendTo(t)),
        s.appendTo(e),
        !0 === a.horizontalScroll && e.addClass("horizontal-scroll"),
        !H.isNull(a.horizontalScrollStop) &&
          H.mediaExist(a.horizontalScrollStop) &&
          e.removeClass("horizontal-scroll"),
        t.addClass(a.clsComponent),
        (this.activity = k("<div>")
          .addClass("table-progress")
          .appendTo(t)),
        k("<div>")
          .activity({ type: a.activityType, style: a.activityStyle })
          .appendTo(this.activity),
        !0 !== a.showActivity && this.activity.css({ visibility: "hidden" }),
        s.html("").addClass(a.clsTable),
        this._createTableHeader(),
        this._createTableBody(),
        this._createTableFooter(),
        this._createTopBlock(),
        this._createBottomBlock();
      var d,
        h = !1;
      0 < this.heads.length &&
        k.each(this.heads, function(e) {
          !h &&
            -1 < ["asc", "desc"].indexOf(this.sortDir) &&
            ((h = !0), (i.sort.colIndex = e), (i.sort.dir = this.sortDir));
        }),
        h &&
          ((n = s.find("thead th")),
          this._resetSortClass(n),
          k(n.get(this.sort.colIndex + i.service.length)).addClass(
            "sort-" + this.sort.dir
          ),
          this.sorting()),
        H.isValue(a.filters) &&
          k.each(H.strToArray(a.filters), function() {
            !1 !== (d = H.isFunc(this)) &&
              i.filtersIndexes.push(i.addFilter(d));
          }),
        (this.currentPage = 1),
        (this.component = t),
        this._draw();
    },
    _resetSortClass: function(e) {
      k(e).removeClass("sort-asc sort-desc");
    },
    _createEvents: function() {
      var e,
        i = this,
        o = this.element,
        r = this.options,
        t = o.closest(".table-component"),
        n = t.find(".table-container"),
        s = t.find(".table-search-block input"),
        l = o.attr("id");
      k(window).on(
        C.events.resize,
        function() {
          !0 === r.horizontalScroll &&
            (!H.isNull(r.horizontalScrollStop) &&
            H.mediaExist(r.horizontalScrollStop)
              ? n.removeClass("horizontal-scroll")
              : n.addClass("horizontal-scroll"));
        },
        { ns: t.attr("id") }
      ),
        o.on(C.events.click, ".sortable-column", function() {
          if ((!0 === r.muteTable && o.addClass("disabled"), i.busy)) return !1;
          i.busy = !0;
          var e = k(this);
          i.activity.show(function() {
            setImmediate(function() {
              (i.currentPage = 1),
                (i.sort.colIndex = e.data("index")),
                e.hasClass("sort-asc") || e.hasClass("sort-desc")
                  ? e.hasClass("sort-asc")
                    ? (i.sort.dir = "desc")
                    : (i.sort.dir = "asc")
                  : (i.sort.dir = r.sortDir),
                i._resetSortClass(o.find(".sortable-column")),
                e.addClass("sort-" + i.sort.dir),
                i.sorting(),
                i._draw(function() {
                  !(i.busy = !1) === r.muteTable && o.removeClass("disabled");
                });
            });
          });
        }),
        o.on(C.events.click, ".table-service-check input", function() {
          var e = k(this),
            t = e.is(":checked"),
            n = "" + e.val(),
            i = r.checkStoreKey.replace("$1", l),
            s = C.storage,
            a = s.getItem(i);
          "radio" === e.attr("type") && (a = []),
            t
              ? H.isValue(a)
                ? -1 === Array(a).indexOf(n) && a.push(n)
                : (a = [n])
              : H.isValue(a)
              ? H.arrayDelete(a, n)
              : (a = []),
            s.setItem(i, a),
            H.exec(r.onCheckClick, [t], this),
            o.fire("checkclick", { check: this, status: t });
        }),
        o.on(C.events.click, ".table-service-check-all input", function() {
          var e = k(this).is(":checked"),
            t = r.checkStoreKey.replace("$1", l),
            n = [];
          e
            ? k.each(i.filteredItems, function() {
                -1 === n.indexOf(this[r.checkColIndex]) &&
                  n.push("" + this[r.checkColIndex]);
              })
            : (n = []),
            C.storage.setItem(t, n),
            i._draw(),
            H.exec(r.onCheckClickAll, [e], this),
            o.fire("checkclickall", { check: this, status: e });
        });
      function a() {
        (i.searchString = this.value.trim().toLowerCase()),
          clearInterval(i.input_interval),
          (i.input_interval = !1),
          i.input_interval ||
            (i.input_interval = setTimeout(function() {
              (i.currentPage = 1),
                i._draw(),
                clearInterval(i.input_interval),
                (i.input_interval = !1);
            }, r.searchThreshold));
      }
      function c(e) {
        var t = k(e),
          n = t.parent();
        0 !== i.filteredItems.length &&
          (n.hasClass("active") ||
            (n.hasClass("service")
              ? "prev" === t.data("page")
                ? (i.currentPage--, 0 === i.currentPage && (i.currentPage = 1))
                : (i.currentPage++,
                  i.currentPage > i.pagesCount &&
                    (i.currentPage = i.pagesCount))
              : (i.currentPage = t.data("page")),
            i._draw()));
      }
      s.on(C.events.inputchange, a),
        H.isValue(this.wrapperSearch) &&
          0 < (e = this.wrapperSearch.find("input")).length &&
          e.on(C.events.inputchange, a),
        t.on(C.events.click, ".pagination .page-link", function() {
          c(this);
        }),
        H.isValue(this.wrapperPagination) &&
          this.wrapperPagination.on(
            C.events.click,
            ".pagination .page-link",
            function() {
              c(this);
            }
          ),
        this._createInspectorEvents(),
        o.on(C.events.click, ".js-table-crud-button", function() {});
    },
    _createInspectorEvents: function() {
      var s = this,
        e = this.inspector;
      this._removeInspectorEvents(),
        e.on(C.events.click, ".js-table-inspector-field-up", function() {
          var t,
            e = k(this).closest("tr"),
            n = e.prev("tr"),
            i = e.data("index");
          0 !== n.length &&
            (e.insertBefore(n),
            e.addClass("flash"),
            setTimeout(function() {
              e.removeClass("flash");
            }, 1e3),
            (t = e.index()),
            e.data("index-view", t),
            (s.view[i]["index-view"] = t),
            k.each(e.nextAll(), function() {
              var e = k(this);
              t++,
                e.data("index-view", t),
                (s.view[e.data("index")]["index-view"] = t);
            }),
            s._createTableHeader(),
            s._draw());
        }),
        e.on(C.events.click, ".js-table-inspector-field-down", function() {
          var t,
            e = k(this).closest("tr"),
            n = e.next("tr"),
            i = e.data("index");
          0 !== n.length &&
            (e.insertAfter(n),
            e.addClass("flash"),
            setTimeout(function() {
              e.removeClass("flash");
            }, 1e3),
            (t = e.index()),
            e.data("index-view", t),
            (s.view[i]["index-view"] = t),
            k.each(e.prevAll(), function() {
              var e = k(this);
              t--,
                e.data("index-view", t),
                (s.view[e.data("index")]["index-view"] = t);
            }),
            s._createTableHeader(),
            s._draw());
        }),
        e.on(C.events.click, "input[type=checkbox]", function() {
          var e = k(this),
            t = e.is(":checked"),
            n = e.val(),
            i = ["cls", "clsColumn"];
          t
            ? k.each(i, function() {
                var e;
                (e = H.isValue(s.heads[n][this])
                  ? H.strToArray(s.heads[n][this], " ")
                  : []),
                  H.arrayDelete(e, "hidden"),
                  (s.heads[n][this] = e.join(" ")),
                  (s.view[n].show = !0);
              })
            : k.each(i, function() {
                var e;
                -1 ===
                  (e = H.isValue(s.heads[n][this])
                    ? H.strToArray(s.heads[n][this], " ")
                    : []).indexOf("hidden") && e.push("hidden"),
                  (s.heads[n][this] = e.join(" ")),
                  (s.view[n].show = !1);
              }),
            s._createTableHeader(),
            s._draw();
        }),
        e.find("input[type=number]").on(C.events.inputchange, function() {
          var e = k(this),
            t = e.attr("data-index"),
            n = parseInt(e.val());
          (s.view[t].size = 0 === n ? "" : n), s._createTableHeader();
        }),
        e.on(C.events.click, ".js-table-inspector-save", function() {
          s._saveTableView(), s.openInspector(!1);
        }),
        e.on(C.events.click, ".js-table-inspector-cancel", function() {
          s.openInspector(!1);
        }),
        e.on(C.events.click, ".js-table-inspector-reset", function() {
          s.resetView();
        });
    },
    _removeInspectorEvents: function() {
      var e = this.inspector;
      e.off(C.events.click, ".js-table-inspector-field-up"),
        e.off(C.events.click, ".js-table-inspector-field-down"),
        e.off(C.events.click, "input[type=checkbox]"),
        e.off(C.events.click, ".js-table-inspector-save"),
        e.off(C.events.click, ".js-table-inspector-cancel"),
        e.off(C.events.click, ".js-table-inspector-reset"),
        e.find("input[type=number]").off(C.events.inputchange);
    },
    _saveTableView: function() {
      var i = this.element,
        s = this.options,
        a = this.view,
        e = i.attr("id");
      "client" === s.viewSaveMode.toLowerCase()
        ? (C.storage.setItem(s.viewSavePath.replace("$1", e), a),
          H.exec(s.onViewSave, [s.viewSavePath, a], i[0]),
          i.fire("viewsave", {
            target: "client",
            path: s.viewSavePath,
            view: a
          }))
        : k.post(s.viewSavePath, { id: i.attr("id"), view: a }, function(
            e,
            t,
            n
          ) {
            H.exec(s.onViewSave, [s.viewSavePath, a, e, t, n], i[0]),
              i.fire("viewsave", {
                target: "server",
                path: s.viewSavePath,
                view: a
              });
          });
    },
    _info: function(e, t, n) {
      var i,
        s = this.element,
        a = this.options,
        o = s.closest(".table-component"),
        r = H.isValue(this.wrapperInfo)
          ? this.wrapperInfo
          : o.find(".table-info");
      0 !== r.length &&
        (n < t && (t = n),
        0 === this.items.length && (e = t = n = 0),
        (i = (i = (i = (i = a.tableInfoTitle).replace("$1", e)).replace(
          "$2",
          t
        )).replace("$3", n)),
        r.html(i));
    },
    _paging: function(e) {
      var t = this.element,
        n = this.options,
        i = t.closest(".table-component");
      (this.pagesCount = Math.ceil(e / n.rows)),
        lt({
          length: e,
          rows: n.rows,
          current: this.currentPage,
          target: H.isValue(this.wrapperPagination)
            ? this.wrapperPagination
            : i.find(".table-pagination"),
          claPagination: n.clsPagination,
          prevTitle: n.paginationPrevTitle,
          nextTitle: n.paginationNextTitle,
          distance: !0 === n.paginationShortMode ? n.paginationDistance : 0
        });
    },
    _filter: function() {
      var e,
        o = this,
        r = this.options,
        l = this.element;
      return (
        (e =
          (H.isValue(this.searchString) &&
            o.searchString.length >= r.searchMinLength) ||
          0 < this.filters.length
            ? this.items.filter(function(n) {
                var e,
                  t,
                  i,
                  s = "",
                  a = 0;
                if (0 < o.filters.length) {
                  for (
                    e = "and" === r.filtersOperator.toLowerCase(), i = 0;
                    i < o.filters.length;
                    i++
                  )
                    H.isNull(o.filters[i]) ||
                      (a++,
                      (e =
                        "and" === r.filtersOperator.toLowerCase()
                          ? e && H.exec(o.filters[i], [n, o.heads])
                          : e || H.exec(o.filters[i], [n, o.heads])));
                  0 === a && (e = !0);
                } else e = !0;
                return (
                  0 < o.searchFields.length
                    ? k.each(o.heads, function(e, t) {
                        -1 < o.searchFields.indexOf(t.name) &&
                          (s += "•" + n[e]);
                      })
                    : (s = n.join("•")),
                  (s = s
                    .replace(/[\n\r]+|[\s]{2,}/g, " ")
                    .trim()
                    .toLowerCase()),
                  (t =
                    !(
                      H.isValue(o.searchString) &&
                      o.searchString.length >= r.searchMinLength
                    ) || ~s.indexOf(o.searchString)),
                  (e = e && t)
                    ? (H.exec(r.onFilterRowAccepted, [n], l[0]),
                      l.fire("filterrowaccepted", { row: n }))
                    : (H.exec(r.onFilterRowDeclined, [n], l[0]),
                      l.fire("filterrowdeclined", { row: n })),
                  e
                );
              })
            : this.items),
        H.exec(r.onSearch, [o.searchString, e], l[0]),
        l.fire("search", { search: o.searchString, items: e }),
        (this.filteredItems = e)
      );
    },
    _draw: function(e) {
      var t,
        n,
        i,
        s,
        a,
        o,
        r,
        l,
        c,
        d = this,
        h = this.element,
        u = this.options,
        p = h.find("tbody"),
        f = -1 === parseInt(u.rows) ? 0 : u.rows * (this.currentPage - 1),
        m = -1 === parseInt(u.rows) ? this.items.length - 1 : f + u.rows - 1,
        v = C.storage.getItem(u.checkStoreKey.replace("$1", h.attr("id"))),
        g = u.staticView ? this.viewDefault : this.view;
      if ((p.html(""), 0 < (c = this._filter()).length)) {
        for (t = f; t <= m; t++)
          if (((o = c[t]), (r = []), H.isValue(o))) {
            for (
              (i = k("<tr>").addClass(u.clsBodyRow)).data("original", o),
                l = t % 2 == 0,
                s = k("<td>").html(t + 1),
                void 0 !== d.service[0].clsColumn &&
                  s.addClass(d.service[0].clsColumn),
                s.appendTo(i),
                s = k("<td>"),
                a =
                  "checkbox" === u.checkType
                    ? k(
                        "<input type='checkbox' data-style='" +
                          u.checkStyle +
                          "' data-role='checkbox' name='" +
                          (H.isValue(u.checkName)
                            ? u.checkName
                            : "table_row_check") +
                          "[]' value='" +
                          c[t][u.checkColIndex] +
                          "'>"
                      )
                    : k(
                        "<input type='radio' data-style='" +
                          u.checkStyle +
                          "' data-role='radio' name='" +
                          (H.isValue(u.checkName)
                            ? u.checkName
                            : "table_row_check") +
                          "' value='" +
                          c[t][u.checkColIndex] +
                          "'>"
                      ),
                H.isValue(v) &&
                  Array.isArray(v) &&
                  -1 < v.indexOf("" + c[t][u.checkColIndex]) &&
                  a.prop("checked", !0),
                a.addClass("table-service-check"),
                H.exec(u.onCheckDraw, [a], a[0]),
                h.fire("checkdraw", { check: a }),
                a.appendTo(s),
                void 0 !== d.service[1].clsColumn &&
                  s.addClass(d.service[1].clsColumn),
                s.appendTo(i),
                n = 0;
              n < o.length;
              n++
            )
              r[n] = null;
            for (
              k.each(o, function(e) {
                var t = this,
                  n = k("<td>");
                H.isValue(d.heads[e].template) &&
                  (t = B(
                    d.heads[e].template,
                    { value: t },
                    {
                      beginToken: u.templateBeginToken,
                      endToken: u.templateEndToken
                    }
                  )),
                  !0 === u.cellWrapper &&
                    (t = k("<div>")
                      .addClass("data-wrapper")
                      .addClass(u.clsCellWrapper)
                      .html(t)),
                  n.html(t),
                  n.addClass(u.clsBodyCell),
                  H.isValue(d.heads[e].clsColumn) &&
                    n.addClass(d.heads[e].clsColumn),
                  !1 === H.bool(g[e].show) && n.addClass("hidden"),
                  H.bool(g[e].show) && n.removeClass("hidden"),
                  n.data("original", this),
                  (r[g[e]["index-view"]] = n),
                  H.exec(u.onDrawCell, [n, t, e, d.heads[e], o], n[0]),
                  h.fire("drawcell", {
                    td: n,
                    val: t,
                    cellIndex: e,
                    head: d.heads[e],
                    items: o
                  });
              }),
                n = 0;
              n < o.length;
              n++
            )
              r[n].appendTo(i),
                H.exec(u.onAppendCell, [r[n], i, n, h], r[n][0]),
                h.fire("appendcell", { td: r[n], tr: i, index: n });
            H.exec(u.onDrawRow, [i, d.view, d.heads, o], i[0]),
              h.fire("drawrow", {
                tr: i,
                view: d.view,
                heads: d.heads,
                items: o
              }),
              i
                .addClass(u.clsRow)
                .addClass(l ? u.clsEvenRow : u.clsOddRow)
                .appendTo(p),
              H.exec(u.onAppendRow, [i, h], i[0]),
              h.fire("appendrow", { tr: i });
          }
      } else
        (n = 0),
          k.each(g, function() {
            this.show && n++;
          }),
          (i = k("<tr>")
            .addClass(u.clsBodyRow)
            .appendTo(p)),
          (s = k("<td>")
            .attr("colspan", n)
            .addClass("text-center")
            .html(
              k("<span>")
                .addClass(u.clsEmptyTableTitle)
                .html(u.emptyTableTitle)
            )).appendTo(i);
      this._info(1 + f, 1 + m, c.length),
        this._paging(c.length),
        this.activity && this.activity.hide(),
        H.exec(u.onDraw, [h], h[0]),
        h.fire("draw", h[0]),
        void 0 !== e && H.exec(e, [h], h[0]);
    },
    _getItemContent: function(e) {
      var t,
        n = this.options,
        i = e[this.sort.colIndex],
        s = this.heads[this.sort.colIndex].format,
        a =
          H.isNull(this.heads) ||
          H.isNull(this.heads[this.sort.colIndex]) ||
          !H.isValue(this.heads[this.sort.colIndex].formatMask)
            ? "%Y-%m-%d"
            : this.heads[this.sort.colIndex].formatMask,
        o = k.iif(
          this.heads && this.heads[this.sort.colIndex],
          this.heads[this.sort.colIndex].thousandSeparator,
          n.thousandSeparator
        ),
        r = k.iif(
          this.heads && this.heads[this.sort.colIndex],
          this.heads[this.sort.colIndex].decimalSeparator,
          n.decimalSeparator
        );
      if (
        ((t = ("" + i)
          .toLowerCase()
          .replace(/[\n\r]+|[\s]{2,}/g, " ")
          .trim()),
        H.isValue(t) && H.isValue(s))
      )
        switch (
          (-1 !== ["number", "int", "float", "money"].indexOf(s) &&
            (t = H.parseNumber(t, o, r)),
          s)
        ) {
          case "date":
            t = H.isValue(a) ? t.toDate(a) : new Date(t);
            break;
          case "number":
            t = Number(t);
            break;
          case "int":
            t = parseInt(t);
            break;
          case "float":
            t = parseFloat(t);
            break;
          case "money":
            t = H.parseMoney(t);
            break;
          case "card":
            t = H.parseCard(t);
            break;
          case "phone":
            t = H.parsePhone(t);
        }
      return t;
    },
    updateItem: function(e, n, t) {
      var i = this.items[this.index[e]],
        s = null;
      return H.isNull(i)
        ? (console.log("Item is undefined for update"), this)
        : (isNaN(n) &&
            this.heads.forEach(function(e, t) {
              e.name === n && (s = t);
            }),
          H.isNull(s)
            ? console.log(
                "Item is undefined for update. Field " +
                  n +
                  " not found in data structure"
              )
            : ((i[s] = t), (this.items[this.index[e]] = i)),
          this);
    },
    getItem: function(e) {
      return this.items[this.index[e]];
    },
    deleteItem: function(e, t) {
      var n,
        i = [],
        s = H.isFunc(t);
      for (n = 0; n < this.items.length; n++)
        s
          ? H.exec(t, [this.items[n][e]]) && i.push(n)
          : this.items[n][e] === t && i.push(n);
      return (this.items = H.arrayDeleteByMultipleKeys(this.items, i)), this;
    },
    deleteItemByName: function(e, t) {
      var n,
        i,
        s = [],
        a = H.isFunc(t);
      for (n = 0; n < this.heads.length; n++)
        if (this.heads[n].name === e) {
          i = n;
          break;
        }
      for (n = 0; n < this.items.length; n++)
        a
          ? H.exec(t, [this.items[n][i]]) && s.push(n)
          : this.items[n][i] === t && s.push(n);
      return (this.items = H.arrayDeleteByMultipleKeys(this.items, s)), this;
    },
    draw: function() {
      return this._draw(), this;
    },
    sorting: function(e) {
      var a = this,
        o = this.element,
        r = this.options;
      return (
        H.isValue(e) && (this.sort.dir = e),
        H.exec(r.onSortStart, [this.items], o[0]),
        o.fire("sortstart", this.items),
        this.items.sort(function(e, t) {
          var n = a._getItemContent(e),
            i = a._getItemContent(t),
            s = 0;
          return (
            n < i && (s = "asc" === a.sort.dir ? -1 : 1),
            i < n && (s = "asc" === a.sort.dir ? 1 : -1),
            0 !== s &&
              (H.exec(r.onSortItemSwitch, [e, t, s], o[0]),
              o.fire("sortitemswitch", { a: e, b: t, result: s })),
            s
          );
        }),
        H.exec(r.onSortStop, [this.items], o[0]),
        o.fire("sortstop", this.items),
        this
      );
    },
    search: function(e) {
      return (
        (this.searchString = e.trim().toLowerCase()),
        (this.currentPage = 1),
        this._draw(),
        this
      );
    },
    _rebuild: function(e) {
      var t,
        n = this,
        i = this.element,
        s = !1;
      this._createIndex(),
        !0 === e && (this.view = this._createView()),
        this._createTableHeader(),
        this._createTableBody(),
        this._createTableFooter(),
        0 < this.heads.length &&
          k.each(this.heads, function(e) {
            !s &&
              -1 < ["asc", "desc"].indexOf(this.sortDir) &&
              ((s = !0), (n.sort.colIndex = e), (n.sort.dir = this.sortDir));
          }),
        s &&
          ((t = i.find(".sortable-column")),
          this._resetSortClass(t),
          k(t.get(n.sort.colIndex)).addClass("sort-" + n.sort.dir),
          this.sorting()),
        (n.currentPage = 1),
        n._draw();
    },
    setHeads: function(e) {
      return (this.heads = e), this;
    },
    setHeadItem: function(e, t) {
      var n, i;
      for (n = 0; n < this.heads.length; n++)
        if (item.name === e) {
          i = n;
          break;
        }
      return (this.heads[i] = t), this;
    },
    setItems: function(e) {
      return (this.items = e), this;
    },
    setData: function(e) {
      return (
        (this.items = []),
        (this.heads = []),
        (this.foots = []),
        this._createItemsFromJSON(e),
        this._rebuild(!0),
        this
      );
    },
    loadData: function(e, t) {
      var n = this,
        i = this.element,
        s = this.options;
      H.isValue(t) || (t = !0),
        i.html(""),
        H.isValue(e)
          ? ((s.source = e),
            H.exec(s.onDataLoad, [s.source], i[0]),
            i.fire("dataload", { source: s.source }),
            k.json(s.source).then(
              function(e) {
                (n.items = []),
                  (n.heads = []),
                  (n.foots = []),
                  H.exec(s.onDataLoaded, [s.source, e], i[0]),
                  i.fire("dataloaded", { source: s.source, data: e }),
                  n._createItemsFromJSON(e),
                  n._rebuild(t);
              },
              function(e) {
                H.exec(s.onDataLoadError, [s.source, e], i[0]),
                  n._createItemsFromJSON(data),
                  n._rebuild(t),
                  i.fire("dataloaderror", { source: s.source, xhr: e });
              }
            ))
          : this._rebuild(t);
    },
    reload: function(e) {
      this.loadData(this.options.source, e);
    },
    next: function() {
      if (0 !== this.items.length) {
        if ((this.currentPage++, !(this.currentPage > this.pagesCount)))
          return this._draw(), this;
        this.currentPage = this.pagesCount;
      }
    },
    prev: function() {
      if (0 !== this.items.length) {
        if ((this.currentPage--, 0 !== this.currentPage))
          return this._draw(), this;
        this.currentPage = 1;
      }
    },
    first: function() {
      if (0 !== this.items.length)
        return (this.currentPage = 1), this._draw(), this;
    },
    last: function() {
      if (0 !== this.items.length)
        return (this.currentPage = this.pagesCount), this._draw(), this;
    },
    page: function(e) {
      return (
        e <= 0 && (e = 1),
        e > this.pagesCount && (e = this.pagesCount),
        (this.currentPage = e),
        this._draw(),
        this
      );
    },
    addFilter: function(e, t) {
      var n,
        i = null,
        s = H.isFunc(e);
      if (!1 !== s) {
        for (n = 0; n < this.filters.length; n++)
          if (H.isNull(this.filters[n])) {
            (i = n), (this.filters[n] = s);
            break;
          }
        return (
          H.isNull(i) && (this.filters.push(s), (i = this.filters.length - 1)),
          !0 === t && ((this.currentPage = 1), this.draw()),
          i
        );
      }
    },
    removeFilter: function(e, t) {
      return (
        !(this.filters[e] = null) === t &&
          ((this.currentPage = 1), this.draw()),
        this
      );
    },
    removeFilters: function(e) {
      return (
        (this.filters = []),
        !0 === e && ((this.currentPage = 1), this.draw()),
        this
      );
    },
    getItems: function() {
      return this.items;
    },
    getHeads: function() {
      return this.heads;
    },
    getView: function() {
      return this.view;
    },
    getFilteredItems: function() {
      return 0 < this.filteredItems.length ? this.filteredItems : this.items;
    },
    getSelectedItems: function() {
      var e = this.element,
        t = this.options,
        n = C.storage.getItem(t.checkStoreKey.replace("$1", e.attr("id"))),
        i = [];
      return H.isValue(n)
        ? (k.each(this.items, function() {
            -1 !== n.indexOf("" + this[t.checkColIndex]) && i.push(this);
          }),
          i)
        : [];
    },
    getStoredKeys: function() {
      var e = this.element,
        t = this.options;
      return C.storage.getItem(t.checkStoreKey.replace("$1", e.attr("id")), []);
    },
    clearSelected: function(e) {
      var t = this.element,
        n = this.options;
      C.storage.setItem(n.checkStoreKey.replace("$1", t.attr("id")), []),
        t.find("table-service-check-all input").prop("checked", !1),
        !0 === e && this._draw();
    },
    getFilters: function() {
      return this.filters;
    },
    getFiltersIndexes: function() {
      return this.filtersIndexes;
    },
    openInspector: function(e) {
      var t = this.inspector;
      e
        ? t.show(0, function() {
            t.css({
              top: (k(window).height() - t.outerHeight(!0)) / 2 + pageYOffset,
              left: (k(window).width() - t.outerWidth(!0)) / 2 + pageXOffset
            }).data("open", !0);
          })
        : t.hide().data("open", !1);
    },
    closeInspector: function() {
      this.openInspector(!1);
    },
    toggleInspector: function() {
      this.openInspector(!this.inspector.data("open"));
    },
    resetView: function() {
      (this.view = this._createView()),
        this._createTableHeader(),
        this._createTableFooter(),
        this._draw(),
        this._resetInspector(),
        this._saveTableView();
    },
    rebuildIndex: function() {
      this._createIndex();
    },
    getIndex: function() {
      return this.index;
    },
    export: function(e, t, n, i) {
      var s,
        a,
        o,
        r,
        l,
        c,
        d,
        h,
        u = this,
        p = this.options,
        f = document.createElement("table"),
        m = k("<thead>").appendTo(f),
        v = k("<tbody>").appendTo(f),
        g = [];
      if ("function" == typeof x.tableToCSV) {
        for (
          t = H.isValue(t) ? t.toLowerCase() : "all-filtered",
            n = H.isValue(n) ? n : H.elementId("table") + "-export.csv",
            l = k("<tr>"),
            o = this.heads,
            a = 0;
          a < o.length;
          a++
        )
          g[a] = null;
        for (
          k.each(o, function(e) {
            !1 !== H.bool(u.view[e].show) &&
              ((c = k("<th>")),
              H.isValue(this.title) && c.html(this.title),
              (g[u.view[e]["index-view"]] = c));
          }),
            a = 0;
          a < o.length;
          a++
        )
          H.isValue(g[a]) && g[a].appendTo(l);
        for (
          l.appendTo(m),
            h =
              "checked" === t
                ? ((d = 0), (r = this.getSelectedItems()).length - 1)
                : "view" === t
                ? ((r = this._filter()),
                  (d =
                    -1 === parseInt(p.rows)
                      ? 0
                      : p.rows * (this.currentPage - 1)),
                  -1 === parseInt(p.rows) ? r.length - 1 : d + p.rows - 1)
                : "all" === t
                ? ((d = 0), (r = this.items).length - 1)
                : ((d = 0), (r = this._filter()).length - 1),
            s = d;
          s <= h;
          s++
        )
          if (H.isValue(r[s])) {
            for (l = k("<tr>"), o = r[s], a = 0; a < o.length; a++) g[a] = null;
            for (
              k.each(o, function(e) {
                !1 !== H.bool(u.view[e].show) &&
                  ((c = k("<td>").html(this)),
                  (g[u.view[e]["index-view"]] = c));
              }),
                a = 0;
              a < o.length;
              a++
            )
              H.isValue(g[a]) && g[a].appendTo(l);
            l.appendTo(v);
          }
        x.tableToCSV(f, n, i), f.remove();
      }
    },
    changeAttribute: function(e) {
      var t = this,
        n = this.element,
        i = this.options;
      switch (e) {
        case "data-check":
          (i.check = H.bool(n.attr("data-check"))),
            t._service(),
            t._createTableHeader(),
            t._draw();
          break;
        case "data-rownum":
          (i.rownum = H.bool(n.attr("data-rownum"))),
            t._service(),
            t._createTableHeader(),
            t._draw();
      }
    },
    destroy: function() {
      var e = this.element,
        t = e.closest(".table-component"),
        n = t.find("input"),
        i = t.find("select");
      if (
        (n.data("input").destroy(),
        i.data("select").destroy(),
        k(window).off(C.events.resize, { ns: t.attr("id") }),
        e.off(C.events.click, ".sortable-column"),
        e.off(C.events.click, ".table-service-check input"),
        e.off(C.events.click, ".table-service-check-all input"),
        n.off(C.events.inputchange),
        H.isValue(this.wrapperSearch))
      ) {
        var s = this.wrapperSearch.find("input");
        0 < s.length && s.off(C.events.inputchange);
      }
      return (
        t.off(C.events.click, ".pagination .page-link"),
        H.isValue(this.wrapperPagination) &&
          this.wrapperPagination.off(C.events.click, ".pagination .page-link"),
        e.off(C.events.click, ".js-table-crud-button"),
        this._removeInspectorEvents(),
        e
      );
    }
  };
  C.plugin("table", Yt);
  var Jt = {
    deep: !1,
    fixedTabs: !1,
    clsComponent: "",
    clsTab: "",
    clsTabActive: "",
    clsMarker: "",
    onBeforeTabOpen: C.noop_true,
    onTabOpen: C.noop,
    onTabsScroll: C.noop,
    onTabsCreate: C.noop
  };
  (C.materialTabsSetup = function(e) {
    Jt = k.extend({}, Jt, e);
  }),
    window.metroMaterialTabsSetup,
    C.materialTabsSetup(window.metroMaterialTabsSetup);
  var Gt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Jt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.marker = null),
        (this.scroll = 0),
        (this.scrollDir = "left"),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "materialtabs"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onTabsCreate, null, e[0]),
        e.fire("tabscreate");
    },
    _applyColor: function(e, t, n) {
      (e = k(e)), H.isValue(t) && (H.isColor(t) ? e.css(n, t) : e.addClass(t));
    },
    _createStructure: function() {
      var e = this.element,
        t = this.options,
        n = e.find("li"),
        i = e.find("li.active");
      e.addClass("tabs-material").addClass(t.clsComponent),
        n.addClass(t.clsTab),
        !0 === t.deep && e.addClass("deep"),
        !0 === t.fixedTabs && e.addClass("fixed-tabs"),
        (this.marker = e.find(".tab-marker")),
        0 === this.marker.length &&
          (this.marker = k("<span>")
            .addClass("tab-marker")
            .addClass(t.clsMarker)
            .appendTo(e)),
        this.openTab(0 === i.length ? n[0] : i[0]);
    },
    _createEvents: function() {
      var a = this,
        o = this.element,
        r = this.options;
      o.on(C.events.click, "li", function(e) {
        var t = k(this),
          n = o.find("li.active"),
          i = t.index() > n.index(),
          s = t.children("a").attr("href");
        if (H.isValue(s) && "#" === s[0]) {
          if (t.hasClass("active")) return;
          if (t.hasClass("disabled")) return;
          if (!1 === H.exec(r.onBeforeTabOpen, [t, s, i], this)) return;
          a.openTab(t, i), e.preventDefault();
        }
      }),
        o.on(C.events.scroll, function() {
          var e = this.scroll;
          (this.scrollDir = this.scroll < o[0].scrollLeft ? "left" : "right"),
            (this.scroll = o[0].scrollLeft),
            H.exec(r.onTabsScroll, [o[0].scrollLeft, e, this.scrollDir], o[0]),
            o.fire("tabsscroll", {
              scrollLeft: o[0].scrollLeft,
              oldScroll: e,
              scrollDir: a.scrollDir
            });
        });
    },
    openTab: function(e, t) {
      var n,
        i,
        s,
        a,
        o,
        r,
        l,
        c = this.element,
        d = this.options,
        h = c.find("li");
      (e = k(e)),
        k.each(h, function() {
          var e = k(this)
            .find("a")
            .attr("href");
          H.isValue(e) && "#" === e[0] && 1 < e.length && k(e).hide();
        }),
        (i = c.width()),
        (r = c.scrollLeft()),
        (n = (o = e.position().left) + (s = e.width())),
        h.removeClass("active").removeClass(d.clsTabActive),
        e.addClass("active").addClass(d.clsTabActive),
        (l = i + r < n + 52 ? r + 104 : o < r ? o - 104 : r),
        c.animate({ scrollLeft: l }),
        this.marker.animate({ left: o, width: s }),
        (a = e.find("a").attr("href")),
        H.isValue(a) && "#" === a[0] && 1 < a.length && k(a).show(),
        H.exec(d.onTabOpen, [e[0], a, t], c[0]),
        c.fire("tabopen", { tab: e[0], target: a, tab_next: t });
    },
    open: function(e) {
      var t = this.element,
        n = t.find("li"),
        i = t.find("li.active"),
        s = n.eq(e - 1),
        a = n.index(s) > n.index(i);
      this.openTab(s, a);
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return e.off(C.events.click, "li"), e.off(C.events.scroll), e;
    }
  };
  C.plugin("materialtabs", Gt);
  var Kt = {
    expand: !1,
    expandPoint: null,
    tabsPosition: "top",
    tabsType: "default",
    clsTabs: "",
    clsTabsList: "",
    clsTabsListItem: "",
    clsTabsListItemActive: "",
    onTab: C.noop,
    onBeforeTab: C.noop_true,
    onTabsCreate: C.noop
  };
  (C.tabsSetup = function(e) {
    Kt = k.extend({}, Kt, e);
  }),
    window.metroTabsSetup,
    C.tabsSetup(window.metroTabsSetup);
  var qt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Kt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this._targets = []),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options,
        n = 0 < e.find(".active").length ? k(e.find(".active")[0]) : void 0;
      C.checkRuntime(e, "tabs"),
        this._createStructure(),
        this._createEvents(),
        this._open(n),
        H.exec(t.onTabsCreate, null, e[0]),
        e.fire("tabscreate");
    },
    _createStructure: function() {
      var e,
        t,
        n = this.element,
        i = this.options,
        s = n.parent(),
        a = s.hasClass("tabs"),
        o = a ? s : k("<div>").addClass("tabs tabs-wrapper");
      if (
        (H.isValue(n.attr("id")) || n.attr("id", H.elementId("tabs")),
        o.addClass(i.tabsPosition.replace(["-", "_", "+"], " ")),
        n.addClass("tabs-list"),
        "default" !== i.tabsType && n.addClass("tabs-" + i.tabsType),
        a || (o.insertBefore(n), n.appendTo(o)),
        n.data("expanded", !1),
        (e = k("<div>").addClass("expand-title")),
        o.prepend(e),
        0 === (t = o.find(".hamburger")).length)
      ) {
        t = k("<button>")
          .attr("type", "button")
          .addClass("hamburger menu-down")
          .appendTo(o);
        for (var r = 0; r < 3; r++)
          k("<span>")
            .addClass("line")
            .appendTo(t);
        !0 ===
          y.isLight(H.computedRgbToHex(H.getStyleOne(o, "background-color"))) &&
          t.addClass("dark");
      }
      o.addClass(i.clsTabs),
        n.addClass(i.clsTabsList),
        n.children("li").addClass(i.clsTabsListItem),
        !0 !== i.expand || i.tabsPosition.contains("vertical")
          ? H.isValue(i.expandPoint) &&
            H.mediaExist(i.expandPoint) &&
            !i.tabsPosition.contains("vertical") &&
            o.addClass("tabs-expand")
          : o.addClass("tabs-expand"),
        i.tabsPosition.contains("vertical") && o.addClass("tabs-expand");
    },
    _createEvents: function() {
      var s = this,
        a = this.element,
        o = this.options,
        r = a.parent();
      k(window).on(
        C.events.resize,
        function() {
          o.tabsPosition.contains("vertical") ||
            (!0 !== o.expand || o.tabsPosition.contains("vertical")
              ? H.isValue(o.expandPoint) &&
                H.mediaExist(o.expandPoint) &&
                !o.tabsPosition.contains("vertical")
                ? r.hasClass("tabs-expand") || r.addClass("tabs-expand")
                : r.hasClass("tabs-expand") && r.removeClass("tabs-expand")
              : r.addClass("tabs-expand"));
        },
        { ns: a.attr("id") }
      ),
        r.on(C.events.click, ".hamburger, .expand-title", function() {
          !1 === a.data("expanded")
            ? (a.addClass("expand"),
              a.data("expanded", !0),
              r.find(".hamburger").addClass("active"))
            : (a.removeClass("expand"),
              a.data("expanded", !1),
              r.find(".hamburger").removeClass("active"));
        }),
        a.on(C.events.click, "a", function(e) {
          var t = k(this),
            n = t.attr("href").trim(),
            i = t.parent("li");
          if (
            (i.hasClass("active") && e.preventDefault(),
            !0 === a.data("expanded") &&
              (a.removeClass("expand"),
              a.data("expanded", !1),
              r.find(".hamburger").removeClass("active")),
            !0 !== H.exec(o.onBeforeTab, [i, a], i[0]))
          )
            return !1;
          H.isValue(n) && "#" === n[0] && (s._open(i), e.preventDefault());
        });
    },
    _collectTargets: function() {
      var t = this,
        e = this.element.find("li");
      (this._targets = []),
        k.each(e, function() {
          var e = k(this)
            .find("a")
            .attr("href")
            .trim();
          1 < e.length && "#" === e[0] && t._targets.push(e);
        });
    },
    _open: function(e) {
      var t = this.element,
        n = this.options,
        i = t.find("li"),
        s = t.siblings(".expand-title");
      if (0 !== i.length) {
        this._collectTargets(), void 0 === e && (e = k(i[0]));
        var a = e.find("a").attr("href");
        void 0 !== a &&
          (i.removeClass("active"),
          e.parent().hasClass("d-menu")
            ? e
                .parent()
                .parent()
                .addClass("active")
            : e.addClass("active"),
          k.each(this._targets, function() {
            var e = k(this);
            0 < e.length && e.hide();
          }),
          "#" !== a && "#" === a[0] && k(a).show(),
          s.html(e.find("a").html()),
          e.addClass(n.clsTabsListItemActive),
          H.exec(n.onTab, [e[0]], t[0]),
          t.fire("tab", { tab: e[0] }));
      }
    },
    next: function() {
      var e;
      0 < (e = this.element.find("li.active").next("li")).length &&
        this._open(e);
    },
    prev: function() {
      var e;
      0 < (e = this.element.find("li.active").prev("li")).length &&
        this._open(e);
    },
    open: function(e) {
      var t = this.element.find("li");
      H.isValue(e) || (e = 1),
        H.isInt(e)
          ? H.isValue(t[e - 1]) && this._open(k(t[e - 1]))
          : this._open(k(e));
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element,
        t = e.parent();
      return (
        k(window).off(C.events.resize, { ns: e.attr("id") }),
        t.off(C.events.click, ".hamburger, .expand-title"),
        e.off(C.events.click, "a"),
        e
      );
    }
  };
  C.plugin("tabs", qt);
  var Qt = {
    randomColor: !1,
    maxTags: 0,
    tagSeparator: ",",
    tagTrigger: "13,188",
    clsTag: "",
    clsTagTitle: "",
    clsTagRemover: "",
    onBeforeTagAdd: C.noop_true,
    onTagAdd: C.noop,
    onBeforeTagRemove: C.noop_true,
    onTagRemove: C.noop,
    onTag: C.noop,
    onTagInputCreate: C.noop
  };
  (C.tagInputSetup = function(e) {
    Qt = k.extend({}, Qt, e);
  }),
    window.metroTagInputSetup,
    C.tagInputSetup(window.metroTagInputSetup);
  var Xt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, Qt, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.values = []),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "taginput"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onTagInputCreate, null, e[0]),
        e.fire("taginputcreate");
    },
    _createStructure: function() {
      var e,
        t = this,
        n = this.element,
        i = this.options,
        s = n.val().trim();
      (e = k("<div>")
        .addClass("tag-input " + n[0].className)
        .insertBefore(n)),
        n.appendTo(e),
        (n[0].className = ""),
        n.addClass("original-input"),
        k("<input type='text'>")
          .addClass("input-wrapper")
          .attr("size", 1)
          .appendTo(e),
        H.isValue(s) &&
          k.each(H.strToArray(s, i.tagSeparator), function() {
            t._addTag(this);
          }),
        n.is(":disabled") ? this.disable() : this.enable();
    },
    _createEvents: function() {
      var n = this,
        e = this.element,
        i = this.options,
        t = e.closest(".tag-input"),
        s = t.find(".input-wrapper");
      s.on(C.events.focus, function() {
        t.addClass("focused");
      }),
        s.on(C.events.blur, function() {
          t.removeClass("focused");
        }),
        s.on(C.events.inputchange, function() {
          s.attr("size", Math.ceil(s.val().length / 2) + 2);
        }),
        s.on(C.events.keyup, function(e) {
          var t = s.val().trim();
          "" !== t &&
            -1 !==
              H.strToArray(i.tagTrigger, ",", "integer").indexOf(e.keyCode) &&
            (s.val(""),
            n._addTag(t.replace(",", "")),
            s.attr("size", 1),
            e.keyCode === C.keyCode.ENTER && e.preventDefault());
        }),
        t.on(C.events.click, ".tag .remover", function() {
          var e = k(this).closest(".tag");
          n._delTag(e);
        }),
        t.on(C.events.click, function() {
          s.focus();
        });
    },
    _addTag: function(e) {
      var t,
        n,
        i,
        s = this.element,
        a = this.options,
        o = s.closest(".tag-input").find(".input-wrapper");
      if (
        !(0 < a.maxTags && this.values.length === a.maxTags) &&
        "" !== ("" + e).trim() &&
        H.exec(a.onBeforeTagAdd, [e, this.values], s[0])
      ) {
        if (
          ((t = k("<span>")
            .addClass("tag")
            .addClass(a.clsTag)
            .insertBefore(o)).data("value", e),
          (n = k("<span>")
            .addClass("title")
            .addClass(a.clsTagTitle)
            .html(e)),
          (i = k("<span>")
            .addClass("remover")
            .addClass(a.clsTagRemover)
            .html("&times;")),
          n.appendTo(t),
          i.appendTo(t),
          !0 === a.randomColor)
        ) {
          var r,
            l,
            c,
            d = y.colors(y.PALETTES.ALL);
          (r = d[H.random(0, d.length - 1)]),
            (c = y.darken(r, 15)),
            (l = y.isDark(r) ? "#ffffff" : "#000000"),
            t.css({ backgroundColor: r, color: l }),
            i.css({ backgroundColor: c, color: l });
        }
        this.values.push(e),
          s.val(this.values.join(a.tagSeparator)),
          H.exec(a.onTagAdd, [t[0], e, this.values], s[0]),
          s.fire("tagadd", { tag: t[0], val: e, values: this.values }),
          H.exec(a.onTag, [t[0], e, this.values], s[0]),
          s.fire("tag", { tag: t[0], val: e, values: this.values });
      }
    },
    _delTag: function(e) {
      var t = this.element,
        n = this.options,
        i = e.data("value");
      H.exec(n.onBeforeTagRemove, [e, i, this.values], t[0]) &&
        (H.arrayDelete(this.values, i),
        t.val(this.values.join(n.tagSeparator)),
        H.exec(n.onTagRemove, [e[0], i, this.values], t[0]),
        t.fire("tagremove", { tag: e[0], val: i, values: this.values }),
        H.exec(n.onTag, [e[0], i, this.values], t[0]),
        t.fire("tag", { tag: e[0], val: i, values: this.values }),
        e.remove());
    },
    tags: function() {
      return this.values;
    },
    val: function(e) {
      var t = this,
        n = this.options;
      if (!H.isValue(e)) return this.tags();
      (this.values = []),
        H.isValue(e) &&
          k.each(H.strToArray(e, n.tagSeparator), function() {
            t._addTag(this);
          });
    },
    clear: function() {
      var e = this.element,
        t = e.closest(".tag-input");
      (this.values = []), e.val(""), t.find(".tag").remove();
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      var t,
        n = this,
        i = this.element;
      this.options;
      switch (e) {
        case "value":
          (t = i.attr("value").trim()),
            n.clear(),
            H.isValue(t) && n.val(H.strToArray(t, ","));
          break;
        case "disabled":
          this.toggleState();
      }
    },
    destroy: function() {
      var e = this.element,
        t = e.closest(".tag-input"),
        n = t.find(".input-wrapper");
      return (
        n.off(C.events.focus),
        n.off(C.events.blur),
        n.off(C.events.keydown),
        t.off(C.events.click, ".tag .remover"),
        t.off(C.events.click),
        e
      );
    }
  };
  C.plugin("taginput", Xt);
  var $t = {
    charsCounter: null,
    charsCounterTemplate: "$1",
    defaultValue: "",
    prepend: "",
    append: "",
    copyInlineStyles: !0,
    clearButton: !0,
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    autoSize: !0,
    clsPrepend: "",
    clsAppend: "",
    clsComponent: "",
    clsTextarea: "",
    onChange: C.noop,
    onTextareaCreate: C.noop
  };
  (C.textareaSetup = function(e) {
    $t = k.extend({}, $t, e);
  }),
    window.metroTextareaSetup,
    C.textareaSetup(window.metroTextareaSetup);
  var Zt = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, $t, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "textarea"),
        this._createStructure(),
        this._createEvents(),
        H.exec(t.onTextareaCreate, null, e[0]),
        e.fire("textareacreate");
    },
    _createStructure: function() {
      var e,
        t = this,
        n = this.element,
        i = this.elem,
        s = this.options,
        a = k("<div>").addClass("textarea " + n[0].className),
        o = k("<textarea>").addClass("fake-textarea");
      a.insertBefore(n),
        n.appendTo(a),
        o.appendTo(a),
        !1 === s.clearButton ||
          n[0].readOnly ||
          (e = k("<button>")
            .addClass("button input-clear-button")
            .attr("tabindex", -1)
            .attr("type", "button")
            .html(s.clearButtonIcon)).appendTo(a),
        "rtl" === n.attr("dir") && a.addClass("rtl").attr("dir", "rtl"),
        "" !== s.prepend &&
          k("<div>")
            .html(s.prepend)
            .addClass("prepend")
            .addClass(s.clsPrepend)
            .appendTo(a);
      if ("" !== s.append) {
        var r = k("<div>").html(s.append);
        r
          .addClass("append")
          .addClass(s.clsAppend)
          .appendTo(a),
          e.css({ right: r.outerWidth() + 4 });
      }
      if (!(i.className = "") === s.copyInlineStyles)
        for (var l = 0, c = i.style.length; l < c; l++)
          a.css(i.style[l], n.css(i.style[l]));
      H.isValue(s.defaultValue) &&
        "" === n.val().trim() &&
        n.val(s.defaultValue),
        a.addClass(s.clsComponent),
        n.addClass(s.clsTextarea),
        n.is(":disabled") ? this.disable() : this.enable(),
        o.val(n.val()),
        !0 === s.autoSize &&
          (a.addClass("autosize no-scroll-vertical"),
          setTimeout(function() {
            null, t.resize();
          }, 100));
    },
    _createEvents: function() {
      var e = this,
        t = this.element,
        n = this.options,
        i = t.closest(".textarea"),
        s = i.find(".fake-textarea"),
        a = k(n.charsCounter);
      i.on(C.events.click, ".input-clear-button", function() {
        t.val(H.isValue(n.defaultValue) ? n.defaultValue : "")
          .trigger("change")
          .trigger("keyup")
          .focus();
      }),
        n.autoSize &&
          t.on(C.events.inputchange + " " + C.events.keyup, function() {
            s.val(this.value), e.resize();
          }),
        t.on(C.events.blur, function() {
          i.removeClass("focused");
        }),
        t.on(C.events.focus, function() {
          i.addClass("focused");
        }),
        t.on(C.events.keyup, function() {
          H.isValue(n.charsCounter) &&
            0 < a.length &&
            ("INPUT" === a[0].tagName
              ? a.val(e.length())
              : a.html(n.charsCounterTemplate.replace("$1", e.length()))),
            H.exec(n.onChange, [t.val(), e.length()], t[0]),
            t.fire("change", { val: t.val(), length: e.length() });
        });
    },
    resize: function() {
      var e = this.element,
        t = e.closest(".textarea").find(".fake-textarea");
      (t[0].style.cssText = "height:auto;"),
        (t[0].style.cssText = "height:" + t[0].scrollHeight + "px"),
        (e[0].style.cssText = "height:" + t[0].scrollHeight + "px");
    },
    clear: function() {
      this.element
        .val("")
        .trigger("change")
        .trigger("keyup")
        .focus();
    },
    toDefault: function() {
      this.element
        .val(
          H.isValue(this.options.defaultValue) ? this.options.defaultValue : ""
        )
        .trigger("change")
        .trigger("keyup")
        .focus();
    },
    length: function() {
      return this.elem.value.split("").length;
    },
    disable: function() {
      this.element.data("disabled", !0),
        this.element.parent().addClass("disabled");
    },
    enable: function() {
      this.element.data("disabled", !1),
        this.element.parent().removeClass("disabled");
    },
    toggleState: function() {
      this.elem.disabled ? this.disable() : this.enable();
    },
    changeAttribute: function(e) {
      switch (e) {
        case "disabled":
          this.toggleState();
      }
    },
    destroy: function() {
      var e = this.element,
        t = this.options;
      return (
        e.closest(".textarea").off(C.events.click, ".input-clear-button"),
        t.autoSize && e.off(C.events.inputchange + " " + C.events.keyup),
        e.off(C.events.blur),
        e.off(C.events.focus),
        e.off(C.events.keyup),
        e
      );
    }
  };
  C.plugin("textarea", Zt);
  var en = {
    size: "medium",
    cover: "",
    coverPosition: "center",
    effect: "",
    effectInterval: 3e3,
    effectDuration: 500,
    target: null,
    canTransform: !0,
    onClick: C.noop,
    onTileCreate: C.noop
  };
  (C.tileSetup = function(e) {
    en = k.extend({}, en, e);
  }),
    window.metroTileSetup,
    C.tileSetup(window.metroTileSetup);
  var tn = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, en, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.effectInterval = !1),
        (this.images = []),
        (this.slides = []),
        (this.currentSlide = -1),
        (this.unload = !1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "tile"),
        this._createTile(),
        this._createEvents(),
        H.exec(t.onTileCreate, null, e[0]),
        e.fire("tilecreate");
    },
    _createTile: function() {
      function a(e, t, n) {
        k.setTimeout(function() {
          e.fadeOut(500, function() {
            e.css("background-image", "url(" + t + ")"), e.fadeIn();
          });
        }, 300 * n);
      }
      var o = this,
        r = this.element,
        n = this.options,
        e = r.find(".slide"),
        t = r.find(".slide-front, .slide-back");
      if (
        (r.addClass("tile-" + n.size),
        -1 < n.effect.indexOf("hover-") &&
          (r.addClass("effect-" + n.effect),
          k.each(t, function() {
            var e = k(this);
            void 0 !== e.data("cover") &&
              o._setCover(e, e.data("cover"), e.data("cover-position"));
          })),
        -1 < n.effect.indexOf("animate-") &&
          1 < e.length &&
          (k.each(e, function(e) {
            var t = k(this);
            o.slides.push(this),
              void 0 !== t.data("cover") &&
                o._setCover(t, t.data("cover"), t.data("cover-position")),
              0 < e &&
                (-1 <
                  ["animate-slide-up", "animate-slide-down"].indexOf(
                    n.effect
                  ) && t.css("top", "100%"),
                -1 <
                  ["animate-slide-left", "animate-slide-right"].indexOf(
                    n.effect
                  ) && t.css("left", "100%"),
                -1 < ["animate-fade"].indexOf(n.effect) && t.css("opacity", 0));
          }),
          (this.currentSlide = 0),
          this._runEffects()),
        "" !== n.cover && this._setCover(r, n.cover),
        "image-set" === n.effect)
      ) {
        r.addClass("image-set"),
          k.each(r.children("img"), function(e) {
            o.images.push(this), k(this).remove();
          });
        for (var i = this.images.slice(), s = 0; s < 5; s++) {
          var l = H.random(0, i.length - 1),
            c = k("<div>")
              .addClass("img -js-img-" + s)
              .css("background-image", "url(" + i[l].src + ")");
          r.prepend(c), i.splice(l, 1);
        }
        var d = [0, 1, 4, 3, 2];
        k.setInterval(function() {
          var e,
            t = o.images.slice(),
            n = y.colors(y.PALETTES.ALL);
          (e = n[H.random(0, n.length - 1)]), r.css("background-color", e);
          for (var i = 0; i < d.length; i++) {
            var s = H.random(0, t.length - 1);
            a(r.find(".-js-img-" + d[i]), t[s].src, i), t.splice(s, 1);
          }
          d = d.reverse();
        }, 5e3);
      }
    },
    _runEffects: function() {
      var n = this,
        i = this.options;
      !1 === this.effectInterval &&
        (this.effectInterval = k.setInterval(function() {
          var e, t;
          (e = k(n.slides[n.currentSlide])),
            n.currentSlide++,
            n.currentSlide === n.slides.length && (n.currentSlide = 0),
            (t = n.slides[n.currentSlide]),
            "animate-slide-up" === i.effect &&
              v.slideUp(k(e), k(t), i.effectDuration),
            "animate-slide-down" === i.effect &&
              v.slideDown(k(e), k(t), i.effectDuration),
            "animate-slide-left" === i.effect &&
              v.slideLeft(k(e), k(t), i.effectDuration),
            "animate-slide-right" === i.effect &&
              v.slideRight(k(e), k(t), i.effectDuration),
            "animate-fade" === i.effect && v.fade(k(e), k(t), i.effectDuration);
        }, i.effectInterval));
    },
    _stopEffects: function() {
      k.clearInterval(this.effectInterval), (this.effectInterval = !1);
    },
    _setCover: function(e, t, n) {
      H.isValue(n) || (n = this.options.coverPosition),
        e.css({
          backgroundImage: "url(" + t + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: n
        });
    },
    _createEvents: function() {
      var r = this.element,
        l = this.options;
      r.on(C.events.startAll, function(e) {
        var t,
          n = k(this),
          i = r.width(),
          s = r.height(),
          a = H.pageXY(e).x - n.offset().left,
          o = H.pageXY(e).y - n.offset().top;
        !1 === H.isRightMouse(e) &&
          ((t =
            a < (1 * i) / 3 && (o < (1 * s) / 2 || (1 * s) / 2 < o)
              ? "left"
              : (2 * i) / 3 < a && (o < (1 * s) / 2 || (1 * s) / 2 < o)
              ? "right"
              : (1 * i) / 3 < a && a < (2 * i) / 3 && s / 2 < o
              ? "bottom"
              : "top"),
          !0 === l.canTransform && n.addClass("transform-" + t),
          null !== l.target &&
            setTimeout(function() {
              document.location.href = l.target;
            }, 100),
          H.exec(l.onClick, [t], r[0]),
          r.fire("click", { side: t }));
      }),
        r.on([C.events.stopAll, C.events.leave].join(" "), function() {
          k(this)
            .removeClass("transform-left")
            .removeClass("transform-right")
            .removeClass("transform-top")
            .removeClass("transform-bottom");
        });
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return (
        e.off(C.events.startAll),
        e.off([C.events.stopAll, C.events.leave].join(" ")),
        e
      );
    }
  };
  C.plugin("tile", tn);
  var nn = {
    hoursStep: 1,
    minutesStep: 1,
    secondsStep: 1,
    value: null,
    locale: METRO_LOCALE,
    distance: 3,
    hours: !0,
    minutes: !0,
    seconds: !0,
    showLabels: !0,
    scrollSpeed: 4,
    copyInlineStyles: !0,
    clsPicker: "",
    clsPart: "",
    clsHours: "",
    clsMinutes: "",
    clsSeconds: "",
    okButtonIcon: "<span class='default-icon-check'></span>",
    cancelButtonIcon: "<span class='default-icon-cross'></span>",
    onSet: C.noop,
    onOpen: C.noop,
    onClose: C.noop,
    onScroll: C.noop,
    onTimePickerCreate: C.noop
  };
  (C.timePickerSetup = function(e) {
    nn = k.extend({}, nn, e);
  }),
    window.metroTimePickerSetup,
    C.timePickerSetup(window.metroTimePickerSetup);
  var sn = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, nn, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.picker = null),
        (this.isOpen = !1),
        (this.value = []),
        (this.locale = C.locales[METRO_LOCALE].calendar),
        (this.listTimer = { hours: null, minutes: null, seconds: null }),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e,
        t = this.element,
        n = this.options;
      for (
        C.checkRuntime(t, "timepicker"),
          n.distance < 1 && (n.distance = 1),
          n.hoursStep < 1 && (n.hoursStep = 1),
          23 < n.hoursStep && (n.hoursStep = 23),
          n.minutesStep < 1 && (n.minutesStep = 1),
          59 < n.minutesStep && (n.minutesStep = 59),
          n.secondsStep < 1 && (n.secondsStep = 1),
          59 < n.secondsStep && (n.secondsStep = 59),
          "" !== t.val() ||
            H.isValue(n.value) ||
            (n.value = new Date().format("%H:%M:%S")),
          this.value = H.strToArray(
            "" !== t.val() ? t.val() : String(n.value),
            ":"
          ),
          e = 0;
        e < 3;
        e++
      )
        void 0 === this.value[e] || null === this.value[e]
          ? (this.value[e] = 0)
          : (this.value[e] = parseInt(this.value[e]));
      this._normalizeValue(),
        void 0 === C.locales[n.locale] && (n.locale = METRO_LOCALE),
        (this.locale = C.locales[n.locale].calendar),
        this._createStructure(),
        this._createEvents(),
        this._set(),
        H.exec(n.onTimePickerCreate, null, t[0]),
        t.fire("timepickercreate");
    },
    _normalizeValue: function() {
      var e = this.options;
      1 < e.hoursStep &&
        (this.value[0] = H.nearest(this.value[0], e.hoursStep, !0)),
        1 < e.minutesStep &&
          (this.value[1] = H.nearest(this.value[1], e.minutesStep, !0)),
        1 < e.minutesStep &&
          (this.value[2] = H.nearest(this.value[2], e.secondsStep, !0));
    },
    _createStructure: function() {
      var e,
        t,
        n,
        i,
        s,
        a,
        o,
        r,
        l,
        c = this.element,
        d = this.options,
        h = c.prev(),
        u = c.parent(),
        p = H.elementId("time-picker");
      if (
        ((e = k("<div>")
          .attr("id", p)
          .addClass("wheel-picker time-picker " + c[0].className)
          .addClass(d.clsPicker)),
        0 === h.length ? u.prepend(e) : e.insertAfter(h),
        c.attr("readonly", !0).appendTo(e),
        (a = k("<div>")
          .addClass("time-wrapper")
          .appendTo(e)),
        !0 === d.hours &&
          (t = k("<div>")
            .attr("data-title", this.locale.time.hours)
            .addClass("hours")
            .addClass(d.clsPart)
            .addClass(d.clsHours)
            .appendTo(a)),
        !0 === d.minutes &&
          (n = k("<div>")
            .attr("data-title", this.locale.time.minutes)
            .addClass("minutes")
            .addClass(d.clsPart)
            .addClass(d.clsMinutes)
            .appendTo(a)),
        !0 === d.seconds &&
          (i = k("<div>")
            .attr("data-title", this.locale.time.seconds)
            .addClass("seconds")
            .addClass(d.clsPart)
            .addClass(d.clsSeconds)
            .appendTo(a)),
        (o = k("<div>")
          .addClass("select-wrapper")
          .appendTo(e)),
        (r = k("<div>")
          .addClass("select-block")
          .appendTo(o)),
        !0 === d.hours)
      ) {
        for (
          t = k("<ul>")
            .addClass("sel-hours")
            .appendTo(r),
            s = 0;
          s < d.distance;
          s++
        )
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(t);
        for (s = 0; s < 24; s += d.hoursStep)
          k("<li>")
            .addClass("js-hours-" + s)
            .html(s < 10 ? "0" + s : s)
            .data("value", s)
            .appendTo(t);
        for (s = 0; s < d.distance; s++)
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(t);
      }
      if (!0 === d.minutes) {
        for (
          n = k("<ul>")
            .addClass("sel-minutes")
            .appendTo(r),
            s = 0;
          s < d.distance;
          s++
        )
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(n);
        for (s = 0; s < 60; s += d.minutesStep)
          k("<li>")
            .addClass("js-minutes-" + s)
            .html(s < 10 ? "0" + s : s)
            .data("value", s)
            .appendTo(n);
        for (s = 0; s < d.distance; s++)
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(n);
      }
      if (!0 === d.seconds) {
        for (
          i = k("<ul>")
            .addClass("sel-seconds")
            .appendTo(r),
            s = 0;
          s < d.distance;
          s++
        )
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(i);
        for (s = 0; s < 60; s += d.secondsStep)
          k("<li>")
            .addClass("js-seconds-" + s)
            .html(s < 10 ? "0" + s : s)
            .data("value", s)
            .appendTo(i);
        for (s = 0; s < d.distance; s++)
          k("<li>")
            .html("&nbsp;")
            .data("value", -1)
            .appendTo(i);
      }
      if (
        (r.height(40 * (2 * d.distance + 1)),
        (l = k("<div>")
          .addClass("action-block")
          .appendTo(o)),
        k("<button>")
          .attr("type", "button")
          .addClass("button action-ok")
          .html(d.okButtonIcon)
          .appendTo(l),
        k("<button>")
          .attr("type", "button")
          .addClass("button action-cancel")
          .html(d.cancelButtonIcon)
          .appendTo(l),
        !(c[0].className = "") === d.copyInlineStyles)
      )
        for (s = 0; s < c[0].style.length; s++)
          e.css(c[0].style[s], c.css(c[0].style[s]));
      !0 === d.showLabels && e.addClass("show-labels"), (this.picker = e);
    },
    _createEvents: function() {
      var r = this,
        a = this.options,
        l = this.picker;
      l.on(C.events.start, ".select-block ul", function(e) {
        if (!e.changedTouches) {
          var t = this,
            n = H.pageXY(e).y;
          k(document).on(
            C.events.move,
            function(e) {
              (t.scrollTop -= a.scrollSpeed * (n > H.pageXY(e).y ? -1 : 1)),
                (n = H.pageXY(e).y);
            },
            { ns: l.attr("id") }
          ),
            k(document).on(
              C.events.stop,
              function() {
                k(document).off(C.events.move, { ns: l.attr("id") }),
                  k(document).off(C.events.stop, { ns: l.attr("id") });
              },
              { ns: l.attr("id") }
            );
        }
      }),
        l.on(C.events.click, function(e) {
          !1 === r.isOpen && r.open(), e.stopPropagation();
        }),
        l.on(C.events.click, ".action-ok", function(e) {
          var t,
            n,
            i,
            s = l.find(".sel-hours li.active"),
            a = l.find(".sel-minutes li.active"),
            o = l.find(".sel-seconds li.active");
          (t = 0 === s.length ? 0 : s.data("value")),
            (n = 0 === a.length ? 0 : a.data("value")),
            (i = 0 === o.length ? 0 : o.data("value")),
            (r.value = [t, n, i]),
            r._normalizeValue(),
            r._set(),
            r.close(),
            e.stopPropagation();
        }),
        l.on(C.events.click, ".action-cancel", function(e) {
          r.close(), e.stopPropagation();
        });
      k.each(["hours", "minutes", "seconds"], function() {
        var i = this,
          s = l.find(".sel-" + i);
        s.on("scroll", function() {
          r.isOpen &&
            (r.listTimer[i] &&
              (clearTimeout(r.listTimer[i]), (r.listTimer[i] = null)),
            r.listTimer[i] ||
              (r.listTimer[i] = setTimeout(function() {
                var e, t, n;
                (r.listTimer[i] = null),
                  (e = Math.round(Math.ceil(s.scrollTop()) / 40)),
                  (n =
                    (t = s.find(".js-" + i + "-" + e)).position().top -
                    40 * a.distance),
                  s.find(".active").removeClass("active"),
                  (s[0].scrollTop = n),
                  t.addClass("active"),
                  H.exec(a.onScroll, [t, s, l], s[0]);
              }, 150)));
        });
      });
    },
    _set: function() {
      var e = this.element,
        t = this.options,
        n = this.picker,
        i = "00",
        s = "00",
        a = "00";
      !0 === t.hours &&
        ((i = parseInt(this.value[0])) < 10 && (i = "0" + i),
        n.find(".hours").html(i)),
        !0 === t.minutes &&
          ((s = parseInt(this.value[1])) < 10 && (s = "0" + s),
          n.find(".minutes").html(s)),
        !0 === t.seconds &&
          ((a = parseInt(this.value[2])) < 10 && (a = "0" + a),
          n.find(".seconds").html(a)),
        e.val([i, s, a].join(":")).trigger("change"),
        H.exec(t.onSet, [this.value, e.val()], e[0]),
        e.fire("set", { val: this.value, elementVal: e.val() });
    },
    open: function() {
      var e,
        t,
        n,
        i,
        s,
        a,
        o,
        r,
        l,
        c,
        d,
        h = this.element,
        u = this.options,
        p = this.picker,
        f = p.find("li"),
        m = p.find(".select-wrapper");
      m.parent().removeClass("for-top for-bottom"),
        m.show(0),
        f.removeClass("active"),
        (o = H.inViewport(m[0])),
        (r = H.rect(m[0])),
        !o && 0 < r.top && m.parent().addClass("for-bottom"),
        !o && r.top < 0 && m.parent().addClass("for-top");
      function v(e, t) {
        e.scrollTop(0).animate(
          { scrollTop: t.position().top - 40 * u.distance + e.scrollTop() },
          100
        );
      }
      !0 === u.hours &&
        ((e = parseInt(this.value[0])),
        (l = (i = p.find(".sel-hours"))
          .find("li.js-hours-" + e)
          .addClass("active")),
        v(i, l)),
        !0 === u.minutes &&
          ((t = parseInt(this.value[1])),
          (c = (s = p.find(".sel-minutes"))
            .find("li.js-minutes-" + t)
            .addClass("active")),
          v(s, c)),
        !0 === u.seconds &&
          ((n = parseInt(this.value[2])),
          (d = (a = p.find(".sel-seconds"))
            .find("li.js-seconds-" + n)
            .addClass("active")),
          v(a, d)),
        (this.isOpen = !0),
        H.exec(u.onOpen, [this.value], h[0]),
        h.fire("open", { val: this.value });
    },
    close: function() {
      var e = this.picker,
        t = this.options,
        n = this.element;
      e.find(".select-wrapper").hide(0),
        (this.isOpen = !1),
        H.exec(t.onClose, [this.value], n[0]),
        n.fire("close", { val: this.value });
    },
    _convert: function(e) {
      return Array.isArray(e)
        ? e
        : "function" == typeof e.getMonth
        ? [e.getHours(), e.getMinutes(), e.getSeconds()]
        : H.isObject(e)
        ? [e.h, e.m, e.s]
        : H.strToArray(e, ":");
    },
    val: function(e) {
      if (void 0 === e) return this.element.val();
      (this.value = this._convert(e)), this._normalizeValue(), this._set();
    },
    time: function(e) {
      if (void 0 === e)
        return { h: this.value[0], m: this.value[1], s: this.value[2] };
      (this.value = this._convert(e)), this._normalizeValue(), this._set();
    },
    date: function(e) {
      if (void 0 === e || "function" != typeof e.getMonth) {
        var t = new Date();
        return (
          t.setHours(this.value[0]),
          t.setMinutes(this.value[1]),
          t.setSeconds(this.value[2]),
          t.setMilliseconds(0),
          t
        );
      }
      (this.value = this._convert(e)), this._normalizeValue(), this._set();
    },
    changeAttribute: function(e) {
      var t = this,
        n = this.element;
      "data-value" === e && t.val(n.attr("data-value"));
    },
    destroy: function() {
      var e = this.element,
        t = this.picker;
      return (
        k.each(["hours", "minutes", "seconds"], function() {
          t.find(".sel-" + this).off("scroll");
        }),
        t.off(C.events.start, ".select-block ul"),
        t.off(C.events.click),
        t.off(C.events.click, ".action-ok"),
        t.off(C.events.click, ".action-cancel"),
        e
      );
    }
  };
  C.plugin("timepicker", sn),
    k(document).on(C.events.click, function() {
      k.each(k(".time-picker"), function() {
        k(this)
          .find("input")
          .each(function() {
            C.getPlugin(this, "timepicker").close();
          });
      });
    });
  var an = {
    options: {
      callback: C.noop,
      timeout: METRO_TIMEOUT,
      distance: 20,
      showTop: !1,
      clsToast: ""
    },
    create: function(e, t, n, i, s) {
      var a = s || an.options,
        o = k("<div>")
          .addClass("toast")
          .html(e)
          .appendTo(k("body"))
          .hide(),
        r = o.outerWidth();
      (n = n || a.timeout),
        (t = t || a.callback),
        (i = i || a.clsToast),
        !0 === a.showTop
          ? o.addClass("show-top").css({ top: a.distance })
          : o.css({ bottom: a.distance }),
        o.css({ left: "50%", "margin-left": -r / 2 }),
        o.addClass(a.clsToast),
        o.addClass(i),
        o.fadeIn(METRO_ANIMATION_DURATION),
        setTimeout(function() {
          null,
            o.fadeOut(METRO_ANIMATION_DURATION, function() {
              o.remove(), H.callback(t);
            });
        }, n);
    }
  };
  C.toast = an;
  var on = {
      LEFT: "left",
      RIGHT: "right",
      UP: "up",
      DOWN: "down",
      IN: "in",
      OUT: "out",
      NONE: "none",
      AUTO: "auto",
      SWIPE: "swipe",
      PINCH: "pinch",
      TAP: "tap",
      DOUBLE_TAP: "doubletap",
      LONG_TAP: "longtap",
      HOLD: "hold",
      HORIZONTAL: "horizontal",
      VERTICAL: "vertical",
      ALL_FINGERS: "all",
      DOUBLE_TAP_THRESHOLD: 10,
      PHASE_START: "start",
      PHASE_MOVE: "move",
      PHASE_END: "end",
      PHASE_CANCEL: "cancel",
      SUPPORTS_TOUCH: "ontouchstart" in window,
      SUPPORTS_POINTER_IE10:
        window.navigator.msPointerEnabled &&
        !window.navigator.pointerEnabled &&
        !("ontouchstart" in window),
      SUPPORTS_POINTER:
        (window.navigator.pointerEnabled ||
          window.navigator.msPointerEnabled) &&
        !("ontouchstart" in window),
      IN_TOUCH: "intouch"
    },
    rn = {
      init: function(e, t) {
        return (
          (this.options = k.extend({}, this.options, e)),
          (this.elem = t),
          (this.element = k(t)),
          (this.useTouchEvents =
            on.SUPPORTS_TOUCH ||
            on.SUPPORTS_POINTER ||
            !this.options.fallbackToMouseEvents),
          (this.START_EV = this.useTouchEvents
            ? on.SUPPORTS_POINTER
              ? on.SUPPORTS_POINTER_IE10
                ? "MSPointerDown"
                : "pointerdown"
              : "touchstart"
            : "mousedown"),
          (this.MOVE_EV = this.useTouchEvents
            ? on.SUPPORTS_POINTER
              ? on.SUPPORTS_POINTER_IE10
                ? "MSPointerMove"
                : "pointermove"
              : "touchmove"
            : "mousemove"),
          (this.END_EV = this.useTouchEvents
            ? on.SUPPORTS_POINTER
              ? on.SUPPORTS_POINTER_IE10
                ? "MSPointerUp"
                : "pointerup"
              : "touchend"
            : "mouseup"),
          (this.LEAVE_EV = this.useTouchEvents
            ? on.SUPPORTS_POINTER
              ? "mouseleave"
              : null
            : "mouseleave"),
          (this.CANCEL_EV = on.SUPPORTS_POINTER
            ? on.SUPPORTS_POINTER_IE10
              ? "MSPointerCancel"
              : "pointercancel"
            : "touchcancel"),
          (this.distance = 0),
          (this.direction = null),
          (this.currentDirection = null),
          (this.duration = 0),
          (this.startTouchesDistance = 0),
          (this.endTouchesDistance = 0),
          (this.pinchZoom = 1),
          (this.pinchDistance = 0),
          (this.pinchDirection = 0),
          (this.maximumsMap = null),
          (this.phase = "start"),
          (this.fingerCount = 0),
          (this.fingerData = {}),
          (this.startTime = 0),
          (this.endTime = 0),
          (this.previousTouchEndTime = 0),
          (this.fingerCountAtRelease = 0),
          (this.doubleTapStartTime = 0),
          (this.singleTapTimeout = null),
          (this.holdTimeout = null),
          this._setOptionsFromDOM(),
          this._create(),
          this
        );
      },
      options: {
        fingers: 2,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: ".no-swipe",
        preventDefaultEvents: !0,
        onSwipe: C.noop,
        onSwipeLeft: C.noop,
        onSwipeRight: C.noop,
        onSwipeUp: C.noop,
        onSwipeDown: C.noop,
        onSwipeStatus: C.noop_true,
        onPinchIn: C.noop,
        onPinchOut: C.noop,
        onPinchStatus: C.noop_true,
        onTap: C.noop,
        onDoubleTap: C.noop,
        onLongTap: C.noop,
        onHold: C.noop,
        onSwipeCreate: C.noop
      },
      _setOptionsFromDOM: function() {
        var e = this.element,
          i = this.options;
        k.each(e.data(), function(t, n) {
          if (t in i)
            try {
              i[t] = JSON.parse(n);
            } catch (e) {
              i[t] = n;
            }
        });
      },
      _create: function() {
        var e = this.element,
          t = this.options;
        void 0 !== t.allowPageScroll ||
          (t.onSwipe === C.noop && t.onSwipeStatus === C.noop) ||
          (t.allowPageScroll = on.NONE);
        try {
          e.on(this.START_EV, k.proxy(this.touchStart, this)),
            e.on(this.CANCEL_EV, k.proxy(this.touchCancel, this));
        } catch (e) {
          throw new Error(
            "Events not supported " +
              this.START_EV +
              "," +
              this.CANCEL_EV +
              " on Swipe"
          );
        }
        H.exec(t.onSwipeCreate, null, e[0]), e.fire("swipecreate");
      },
      touchStart: function(e) {
        var t = this.element,
          n = this.options;
        if (
          !(
            this.getTouchInProgress() ||
            0 < k(e.target).closest(n.excludedElements).length
          )
        ) {
          var i,
            s = e,
            a = s.touches,
            o = a ? a[0] : s;
          return (
            (this.phase = on.PHASE_START),
            a
              ? (this.fingerCount = a.length)
              : !1 !== n.preventDefaultEvents && e.preventDefault(),
            (this.distance = 0),
            (this.direction = null),
            (this.currentDirection = null),
            (this.pinchDirection = null),
            (this.duration = 0),
            (this.startTouchesDistance = 0),
            (this.endTouchesDistance = 0),
            (this.pinchZoom = 1),
            (this.pinchDistance = 0),
            (this.maximumsMap = this.createMaximumsData()),
            this.cancelMultiFingerRelease(),
            this.createFingerData(0, o),
            !a ||
            this.fingerCount === n.fingers ||
            n.fingers === on.ALL_FINGERS ||
            this.hasPinches()
              ? ((this.startTime = this.getTimeStamp()),
                2 === this.fingerCount &&
                  (this.createFingerData(1, a[1]),
                  (this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(
                    this.fingerData[0].start,
                    this.fingerData[1].start
                  ))),
                (n.onSwipeStatus === C.noop && n.onPinchStatus === C.noop) ||
                  (i = this.triggerHandler(s, this.phase)))
              : (i = !1),
            !1 === i
              ? ((this.phase = on.PHASE_CANCEL),
                this.triggerHandler(s, this.phase),
                i)
              : (n.onHold !== C.noop &&
                  (this.holdTimeout = setTimeout(
                    k.proxy(function() {
                      t.trigger("hold", [s.target]),
                        n.onHold !== C.noop &&
                          ((i = H.exec(n.onHold, [s, s.target], t[0])),
                          t.fire("hold", { event: s, target: s.target }));
                    }, this),
                    n.longTapThreshold
                  )),
                this.setTouchInProgress(!0),
                null)
          );
        }
      },
      touchMove: function(e) {
        var t = e;
        if (
          this.phase !== on.PHASE_END &&
          this.phase !== on.PHASE_CANCEL &&
          !this.inMultiFingerRelease()
        ) {
          var n,
            i = t.touches,
            s = i ? i[0] : t,
            a = this.updateFingerData(s);
          if (
            ((this.endTime = this.getTimeStamp()),
            i && (this.fingerCount = i.length),
            this.options.onHold !== C.noop && clearTimeout(this.holdTimeout),
            (this.phase = on.PHASE_MOVE),
            2 === this.fingerCount &&
              (0 === this.startTouchesDistance
                ? (this.createFingerData(1, i[1]),
                  (this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(
                    this.fingerData[0].start,
                    this.fingerData[1].start
                  )))
                : (this.updateFingerData(i[1]),
                  (this.endTouchesDistance = this.calculateTouchesDistance(
                    this.fingerData[0].end,
                    this.fingerData[1].end
                  )),
                  (this.pinchDirection = this.calculatePinchDirection(
                    this.fingerData[0].end,
                    this.fingerData[1].end
                  ))),
              (this.pinchZoom = this.calculatePinchZoom(
                this.startTouchesDistance,
                this.endTouchesDistance
              )),
              (this.pinchDistance = Math.abs(
                this.startTouchesDistance - this.endTouchesDistance
              ))),
            this.fingerCount === this.options.fingers ||
              this.options.fingers === on.ALL_FINGERS ||
              !i ||
              this.hasPinches())
          ) {
            if (
              ((this.direction = this.calculateDirection(a.start, a.end)),
              (this.currentDirection = this.calculateDirection(a.last, a.end)),
              this.validateDefaultEvent(e, this.currentDirection),
              (this.distance = this.calculateDistance(a.start, a.end)),
              (this.duration = this.calculateDuration()),
              this.setMaxDistance(this.direction, this.distance),
              (n = this.triggerHandler(t, this.phase)),
              !this.options.triggerOnTouchEnd ||
                this.options.triggerOnTouchLeave)
            ) {
              var o = !0;
              if (this.options.triggerOnTouchLeave) {
                var r = this.getBounds(this);
                o = this.isInBounds(a.end, r);
              }
              !this.options.triggerOnTouchEnd && o
                ? (this.phase = this.getNextPhase(on.PHASE_MOVE))
                : this.options.triggerOnTouchLeave &&
                  !o &&
                  (this.phase = this.getNextPhase(on.PHASE_END)),
                (this.phase !== on.PHASE_CANCEL &&
                  this.phase !== on.PHASE_END) ||
                  this.triggerHandler(t, this.phase);
            }
          } else
            (this.phase = on.PHASE_CANCEL), this.triggerHandler(t, this.phase);
          !1 === n &&
            ((this.phase = on.PHASE_CANCEL),
            this.triggerHandler(t, this.phase));
        }
      },
      touchEnd: function(e) {
        var t = e,
          n = t.touches;
        if (n) {
          if (n.length && !this.inMultiFingerRelease())
            return this.startMultiFingerRelease(t), !0;
          if (n.length && this.inMultiFingerRelease()) return !0;
        }
        return (
          this.inMultiFingerRelease() &&
            (this.fingerCount = this.fingerCountAtRelease),
          (this.endTime = this.getTimeStamp()),
          (this.duration = this.calculateDuration()),
          this.didSwipeBackToCancel() || !this.validateSwipeDistance()
            ? ((this.phase = on.PHASE_CANCEL),
              this.triggerHandler(t, this.phase))
            : this.options.triggerOnTouchEnd ||
              (!1 === this.options.triggerOnTouchEnd &&
                this.phase === on.PHASE_MOVE)
            ? (!1 !== this.options.preventDefaultEvents && e.preventDefault(),
              (this.phase = on.PHASE_END),
              this.triggerHandler(t, this.phase))
            : !this.options.triggerOnTouchEnd && this.hasTap()
            ? ((this.phase = on.PHASE_END),
              this.triggerHandlerForGesture(t, this.phase, on.TAP))
            : this.phase === on.PHASE_MOVE &&
              ((this.phase = on.PHASE_CANCEL),
              this.triggerHandler(t, this.phase)),
          this.setTouchInProgress(!1),
          null
        );
      },
      touchCancel: function() {
        (this.fingerCount = 0),
          (this.endTime = 0),
          (this.startTime = 0),
          (this.startTouchesDistance = 0),
          (this.endTouchesDistance = 0),
          (this.pinchZoom = 1),
          this.cancelMultiFingerRelease(),
          this.setTouchInProgress(!1);
      },
      touchLeave: function(e) {
        this.options.triggerOnTouchLeave &&
          ((this.phase = this.getNextPhase(on.PHASE_END)),
          this.triggerHandler(e, this.phase));
      },
      getNextPhase: function(e) {
        var t = this.options,
          n = e,
          i = this.validateSwipeTime(),
          s = this.validateSwipeDistance(),
          a = this.didSwipeBackToCancel();
        return (
          !i || a
            ? (n = on.PHASE_CANCEL)
            : !s ||
              e !== on.PHASE_MOVE ||
              (t.triggerOnTouchEnd && !t.triggerOnTouchLeave)
            ? !s &&
              e === on.PHASE_END &&
              t.triggerOnTouchLeave &&
              (n = on.PHASE_CANCEL)
            : (n = on.PHASE_END),
          n
        );
      },
      triggerHandler: function(e, t) {
        var n,
          i = e.touches;
        return (
          (this.didSwipe() || this.hasSwipes()) &&
            (n = this.triggerHandlerForGesture(e, t, on.SWIPE)),
          (this.didPinch() || this.hasPinches()) &&
            !1 !== n &&
            (n = this.triggerHandlerForGesture(e, t, on.PINCH)),
          this.didDoubleTap() && !1 !== n
            ? (n = this.triggerHandlerForGesture(e, t, on.DOUBLE_TAP))
            : this.didLongTap() && !1 !== n
            ? (n = this.triggerHandlerForGesture(e, t, on.LONG_TAP))
            : this.didTap() &&
              !1 !== n &&
              (n = this.triggerHandlerForGesture(e, t, on.TAP)),
          t === on.PHASE_CANCEL && this.touchCancel(e),
          t === on.PHASE_END && ((i && i.length) || this.touchCancel(e)),
          n
        );
      },
      triggerHandlerForGesture: function(e, t, n) {
        var i,
          s = this.element,
          a = this.options;
        if (n === on.SWIPE) {
          if (
            (s.trigger("swipeStatus", [
              t,
              this.direction || null,
              this.distance || 0,
              this.duration || 0,
              this.fingerCount,
              this.fingerData,
              this.currentDirection
            ]),
            (i = H.exec(
              a.onSwipeStatus,
              [
                e,
                t,
                this.direction || null,
                this.distance || 0,
                this.duration || 0,
                this.fingerCount,
                this.fingerData,
                this.currentDirection
              ],
              s[0]
            )),
            s.fire("swipestatus", {
              event: e,
              phase: t,
              direction: this.direction,
              distance: this.distance,
              duration: this.duration,
              fingerCount: this.fingerCount,
              fingerData: this.fingerData,
              currentDirection: this.currentDirection
            }),
            !1 === i)
          )
            return !1;
          if (t === on.PHASE_END && this.validateSwipe()) {
            if (
              (clearTimeout(this.singleTapTimeout),
              clearTimeout(this.holdTimeout),
              s.trigger("swipe", [
                this.direction,
                this.distance,
                this.duration,
                this.fingerCount,
                this.fingerData,
                this.currentDirection
              ]),
              (i = H.exec(
                a.onSwipe,
                [
                  e,
                  this.direction,
                  this.distance,
                  this.duration,
                  this.fingerCount,
                  this.fingerData,
                  this.currentDirection
                ],
                s[0]
              )),
              s.fire("swipe", {
                event: e,
                direction: this.direction,
                distance: this.distance,
                duration: this.duration,
                fingerCount: this.fingerCount,
                fingerData: this.fingerData,
                currentDirection: this.currentDirection
              }),
              !1 === i)
            )
              return !1;
            switch (this.direction) {
              case on.LEFT:
                s.trigger("swipeLeft", [
                  this.direction,
                  this.distance,
                  this.duration,
                  this.fingerCount,
                  this.fingerData,
                  this.currentDirection
                ]),
                  (i = H.exec(
                    a.onSwipeLeft,
                    [
                      e,
                      this.direction,
                      this.distance,
                      this.duration,
                      this.fingerCount,
                      this.fingerData,
                      this.currentDirection
                    ],
                    s[0]
                  )),
                  s.fire("swipeleft", {
                    event: e,
                    direction: this.direction,
                    distance: this.distance,
                    duration: this.duration,
                    fingerCount: this.fingerCount,
                    fingerData: this.fingerData,
                    currentDirection: this.currentDirection
                  });
                break;
              case on.RIGHT:
                s.trigger("swipeRight", [
                  this.direction,
                  this.distance,
                  this.duration,
                  this.fingerCount,
                  this.fingerData,
                  this.currentDirection
                ]),
                  (i = H.exec(
                    a.onSwipeRight,
                    [
                      e,
                      this.direction,
                      this.distance,
                      this.duration,
                      this.fingerCount,
                      this.fingerData,
                      this.currentDirection
                    ],
                    s[0]
                  )),
                  s.fire("swiperight", {
                    event: e,
                    direction: this.direction,
                    distance: this.distance,
                    duration: this.duration,
                    fingerCount: this.fingerCount,
                    fingerData: this.fingerData,
                    currentDirection: this.currentDirection
                  });
                break;
              case on.UP:
                s.trigger("swipeUp", [
                  this.direction,
                  this.distance,
                  this.duration,
                  this.fingerCount,
                  this.fingerData,
                  this.currentDirection
                ]),
                  (i = H.exec(
                    a.onSwipeUp,
                    [
                      e,
                      this.direction,
                      this.distance,
                      this.duration,
                      this.fingerCount,
                      this.fingerData,
                      this.currentDirection
                    ],
                    s[0]
                  )),
                  s.fire("swipeup", {
                    event: e,
                    direction: this.direction,
                    distance: this.distance,
                    duration: this.duration,
                    fingerCount: this.fingerCount,
                    fingerData: this.fingerData,
                    currentDirection: this.currentDirection
                  });
                break;
              case on.DOWN:
                s.trigger("swipeDown", [
                  this.direction,
                  this.distance,
                  this.duration,
                  this.fingerCount,
                  this.fingerData,
                  this.currentDirection
                ]),
                  (i = H.exec(
                    a.onSwipeDown,
                    [
                      e,
                      this.direction,
                      this.distance,
                      this.duration,
                      this.fingerCount,
                      this.fingerData,
                      this.currentDirection
                    ],
                    s[0]
                  )),
                  s.fire("swipedown", {
                    event: e,
                    direction: this.direction,
                    distance: this.distance,
                    duration: this.duration,
                    fingerCount: this.fingerCount,
                    fingerData: this.fingerData,
                    currentDirection: this.currentDirection
                  });
            }
          }
        }
        if (n === on.PINCH) {
          if (
            (s.trigger("pinchStatus", [
              t,
              this.pinchDirection || null,
              this.pinchDistance || 0,
              this.duration || 0,
              this.fingerCount,
              this.fingerData,
              this.pinchZoom
            ]),
            (i = H.exec(
              a.onPinchStatus,
              [
                e,
                t,
                this.pinchDirection || null,
                this.pinchDistance || 0,
                this.duration || 0,
                this.fingerCount,
                this.fingerData,
                this.pinchZoom
              ],
              s[0]
            )),
            s.fire("pinchstatus", {
              event: e,
              phase: t,
              direction: this.pinchDirection,
              distance: this.pinchDistance,
              duration: this.duration,
              fingerCount: this.fingerCount,
              fingerData: this.fingerData,
              zoom: this.pinchZoom
            }),
            !1 === i)
          )
            return !1;
          if (t === on.PHASE_END && this.validatePinch())
            switch (this.pinchDirection) {
              case on.IN:
                s.trigger("pinchIn", [
                  this.pinchDirection || null,
                  this.pinchDistance || 0,
                  this.duration || 0,
                  this.fingerCount,
                  this.fingerData,
                  this.pinchZoom
                ]),
                  (i = H.exec(
                    a.onPinchIn,
                    [
                      e,
                      this.pinchDirection || null,
                      this.pinchDistance || 0,
                      this.duration || 0,
                      this.fingerCount,
                      this.fingerData,
                      this.pinchZoom
                    ],
                    s[0]
                  )),
                  s.fire("pinchin", {
                    event: e,
                    direction: this.pinchDirection,
                    distance: this.pinchDistance,
                    duration: this.duration,
                    fingerCount: this.fingerCount,
                    fingerData: this.fingerData,
                    zoom: this.pinchZoom
                  });
                break;
              case on.OUT:
                s.trigger("pinchOut", [
                  this.pinchDirection || null,
                  this.pinchDistance || 0,
                  this.duration || 0,
                  this.fingerCount,
                  this.fingerData,
                  this.pinchZoom
                ]),
                  (i = H.exec(
                    a.onPinchOut,
                    [
                      e,
                      this.pinchDirection || null,
                      this.pinchDistance || 0,
                      this.duration || 0,
                      this.fingerCount,
                      this.fingerData,
                      this.pinchZoom
                    ],
                    s[0]
                  )),
                  s.fire("pinchout", {
                    event: e,
                    direction: this.pinchDirection,
                    distance: this.pinchDistance,
                    duration: this.duration,
                    fingerCount: this.fingerCount,
                    fingerData: this.fingerData,
                    zoom: this.pinchZoom
                  });
            }
        }
        return (
          n === on.TAP
            ? (t !== on.PHASE_CANCEL && t !== on.PHASE_END) ||
              (clearTimeout(this.singleTapTimeout),
              clearTimeout(this.holdTimeout),
              this.hasDoubleTap() && !this.inDoubleTap()
                ? ((this.doubleTapStartTime = this.getTimeStamp()),
                  (this.singleTapTimeout = setTimeout(
                    k.proxy(function() {
                      (this.doubleTapStartTime = null),
                        (i = H.exec(a.onTap, [e, e.target], s[0])),
                        s.fire("tap", { event: e, target: e.target });
                    }, this),
                    a.doubleTapThreshold
                  )))
                : ((this.doubleTapStartTime = null),
                  (i = H.exec(a.onTap, [e, e.target], s[0])),
                  s.fire("tap", { event: e, target: e.target })))
            : n === on.DOUBLE_TAP
            ? (t !== on.PHASE_CANCEL && t !== on.PHASE_END) ||
              (clearTimeout(this.singleTapTimeout),
              clearTimeout(this.holdTimeout),
              (this.doubleTapStartTime = null),
              (i = H.exec(a.onDoubleTap, [e, e.target], s[0])),
              s.fire("doubletap", { event: e, target: e.target }))
            : n === on.LONG_TAP &&
              ((t !== on.PHASE_CANCEL && t !== on.PHASE_END) ||
                (clearTimeout(this.singleTapTimeout),
                (this.doubleTapStartTime = null),
                (i = H.exec(a.onLongTap, [e, e.target], s[0])),
                s.fire("longtap", { event: e, target: e.target }))),
          i
        );
      },
      validateSwipeDistance: function() {
        var e = !0;
        return (
          null !== this.options.threshold &&
            (e = this.distance >= this.options.threshold),
          e
        );
      },
      didSwipeBackToCancel: function() {
        var e = this.options,
          t = !1;
        return (
          null !== e.cancelThreshold &&
            null !== this.direction &&
            (t =
              this.getMaxDistance(this.direction) - this.distance >=
              e.cancelThreshold),
          t
        );
      },
      validatePinchDistance: function() {
        return (
          null === this.options.pinchThreshold ||
          this.pinchDistance >= this.options.pinchThreshold
        );
      },
      validateSwipeTime: function() {
        var e = this.options;
        return !e.maxTimeThreshold || duration < e.maxTimeThreshold;
      },
      validateDefaultEvent: function(e, t) {
        var n = this.options;
        if (!1 !== n.preventDefaultEvents)
          if (n.allowPageScroll === on.NONE) e.preventDefault();
          else {
            var i = n.allowPageScroll === on.AUTO;
            switch (t) {
              case on.LEFT:
                ((n.onSwipeLeft !== C.noop && i) ||
                  (!i && n.allowPageScroll.toLowerCase() !== on.HORIZONTAL)) &&
                  e.preventDefault();
                break;
              case on.RIGHT:
                ((n.onSwipeRight !== C.noop && i) ||
                  (!i && n.allowPageScroll.toLowerCase() !== on.HORIZONTAL)) &&
                  e.preventDefault();
                break;
              case on.UP:
                ((n.onSwipeUp !== C.noop && i) ||
                  (!i && n.allowPageScroll.toLowerCase() !== on.VERTICAL)) &&
                  e.preventDefault();
                break;
              case on.DOWN:
                ((n.onSwipeDown !== C.noop && i) ||
                  (!i && n.allowPageScroll.toLowerCase() !== on.VERTICAL)) &&
                  e.preventDefault();
            }
          }
      },
      validatePinch: function() {
        var e = this.validateFingers(),
          t = this.validateEndPoint(),
          n = this.validatePinchDistance();
        return e && t && n;
      },
      hasPinches: function() {
        return !!(
          this.options.onPinchStatus ||
          this.options.onPinchIn ||
          this.options.onPinchOut
        );
      },
      didPinch: function() {
        return !(!this.validatePinch() || !this.hasPinches());
      },
      validateSwipe: function() {
        var e = this.validateSwipeTime(),
          t = this.validateSwipeDistance(),
          n = this.validateFingers(),
          i = this.validateEndPoint();
        return !this.didSwipeBackToCancel() && i && n && t && e;
      },
      hasSwipes: function() {
        var e = this.options;
        return !(
          e.onSwipe === C.noop &&
          e.onSwipeStatus === C.noop &&
          e.onSwipeLeft === C.noop &&
          e.onSwipeRight === C.noop &&
          e.onSwipeUp === C.noop &&
          e.onSwipeDown === C.noop
        );
      },
      didSwipe: function() {
        return !(!this.validateSwipe() || !this.hasSwipes());
      },
      validateFingers: function() {
        return (
          this.fingerCount === this.options.fingers ||
          this.options.fingers === on.ALL_FINGERS ||
          !on.SUPPORTS_TOUCH
        );
      },
      validateEndPoint: function() {
        return 0 !== this.fingerData[0].end.x;
      },
      hasTap: function() {
        return this.options.onTap !== C.noop;
      },
      hasDoubleTap: function() {
        return this.options.onDoubleTap !== C.noop;
      },
      hasLongTap: function() {
        return this.options.onLongTap !== C.noop;
      },
      validateDoubleTap: function() {
        if (null == this.doubleTapStartTime) return !1;
        var e = this.getTimeStamp();
        return (
          this.hasDoubleTap() &&
          e - this.doubleTapStartTime <= this.options.doubleTapThreshold
        );
      },
      inDoubleTap: function() {
        return this.validateDoubleTap();
      },
      validateTap: function() {
        return (
          (1 === this.fingerCount || !on.SUPPORTS_TOUCH) &&
          (isNaN(this.distance) || this.distance < this.options.threshold)
        );
      },
      validateLongTap: function() {
        var e = this.options;
        return (
          this.duration > e.longTapThreshold &&
          this.distance < on.DOUBLE_TAP_THRESHOLD
        );
      },
      didTap: function() {
        return !(!this.validateTap() || !this.hasTap());
      },
      didDoubleTap: function() {
        return !(!this.validateDoubleTap() || !this.hasDoubleTap());
      },
      didLongTap: function() {
        return !(!this.validateLongTap() || !this.hasLongTap());
      },
      startMultiFingerRelease: function(e) {
        (this.previousTouchEndTime = this.getTimeStamp()),
          (this.fingerCountAtRelease = e.touches.length + 1);
      },
      cancelMultiFingerRelease: function() {
        (this.previousTouchEndTime = 0), (this.fingerCountAtRelease = 0);
      },
      inMultiFingerRelease: function() {
        var e = !1;
        this.previousTouchEndTime &&
          this.getTimeStamp() - this.previousTouchEndTime <=
            this.options.fingerReleaseThreshold &&
          (e = !0);
        return e;
      },
      getTouchInProgress: function() {
        return !0 === this.element.data("intouch");
      },
      setTouchInProgress: function(e) {
        var t = this.element;
        t &&
          (!0 === e
            ? (t.on(this.MOVE_EV, k.proxy(this.touchMove, this)),
              t.on(this.END_EV, k.proxy(this.touchEnd, this)),
              this.LEAVE_EV &&
                t.on(this.LEAVE_EV, k.proxy(this.touchLeave, this)))
            : (t.off(this.MOVE_EV),
              t.off(this.END_EV),
              this.LEAVE_EV && t.off(this.LEAVE_EV)),
          t.data("intouch", !0 === e));
      },
      createFingerData: function(e, t) {
        var n = {
          start: { x: 0, y: 0 },
          last: { x: 0, y: 0 },
          end: { x: 0, y: 0 }
        };
        return (
          (n.start.x = n.last.x = n.end.x = t.pageX || t.clientX),
          (n.start.y = n.last.y = n.end.y = t.pageY || t.clientY),
          (this.fingerData[e] = n)
        );
      },
      updateFingerData: function(e) {
        var t = void 0 !== e.identifier ? e.identifier : 0,
          n = this.getFingerData(t);
        return (
          null === n && (n = this.createFingerData(t, e)),
          (n.last.x = n.end.x),
          (n.last.y = n.end.y),
          (n.end.x = e.pageX || e.clientX),
          (n.end.y = e.pageY || e.clientY),
          n
        );
      },
      getFingerData: function(e) {
        return this.fingerData[e] || null;
      },
      setMaxDistance: function(e, t) {
        e !== on.NONE &&
          ((t = Math.max(t, this.getMaxDistance(e))),
          (this.maximumsMap[e].distance = t));
      },
      getMaxDistance: function(e) {
        return this.maximumsMap[e] ? this.maximumsMap[e].distance : void 0;
      },
      createMaximumsData: function() {
        var e = {};
        return (
          (e[on.LEFT] = this.createMaximumVO(on.LEFT)),
          (e[on.RIGHT] = this.createMaximumVO(on.RIGHT)),
          (e[on.UP] = this.createMaximumVO(on.UP)),
          (e[on.DOWN] = this.createMaximumVO(on.DOWN)),
          e
        );
      },
      createMaximumVO: function(e) {
        return { direction: e, distance: 0 };
      },
      calculateDuration: function() {
        return this.endTime - this.startTime;
      },
      calculateTouchesDistance: function(e, t) {
        var n = Math.abs(e.x - t.x),
          i = Math.abs(e.y - t.y);
        return Math.round(Math.sqrt(n * n + i * i));
      },
      calculatePinchZoom: function(e, t) {
        return ((t / e) * 100).toFixed(2);
      },
      calculatePinchDirection: function() {
        return this.pinchZoom < 1 ? on.OUT : on.IN;
      },
      calculateDistance: function(e, t) {
        return Math.round(
          Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
        );
      },
      calculateAngle: function(e, t) {
        var n = e.x - t.x,
          i = t.y - e.y,
          s = Math.atan2(i, n),
          a = Math.round((180 * s) / Math.PI);
        return a < 0 && (a = 360 - Math.abs(a)), a;
      },
      calculateDirection: function(e, t) {
        if (this.comparePoints(e, t)) return on.NONE;
        var n = this.calculateAngle(e, t);
        return n <= 45 && 0 <= n
          ? on.LEFT
          : n <= 360 && 315 <= n
          ? on.LEFT
          : 135 <= n && n <= 225
          ? on.RIGHT
          : 45 < n && n < 135
          ? on.DOWN
          : on.UP;
      },
      getTimeStamp: function() {
        return new Date().getTime();
      },
      getBounds: function(e) {
        var t = (e = k(e)).offset();
        return {
          left: t.left,
          right: t.left + e.outerWidth(),
          top: t.top,
          bottom: t.top + e.outerHeight()
        };
      },
      isInBounds: function(e, t) {
        return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom;
      },
      comparePoints: function(e, t) {
        return e.x === t.x && e.y === t.y;
      },
      removeListeners: function() {
        var e = this.element;
        e.off(this.START_EV),
          e.off(this.CANCEL_EV),
          e.off(this.MOVE_EV),
          e.off(this.END_EV),
          this.LEAVE_EV && e.off(this.LEAVE_EV),
          this.setTouchInProgress(!1);
      },
      enable: function() {
        return (
          this.disable(),
          this.element.on(this.START_EV, this.touchStart),
          this.element.on(this.CANCEL_EV, this.touchCancel),
          this.element
        );
      },
      disable: function() {
        return this.removeListeners(), this.element;
      },
      changeAttribute: function(e) {},
      destroy: function() {
        this.removeListeners();
      }
    };
  (C.touch = on), C.plugin("touch", rn);
  var ln = {
    showChildCount: !1,
    duration: 80,
    onNodeClick: C.noop,
    onNodeDblClick: C.noop,
    onNodeDelete: C.noop,
    onNodeInsert: C.noop,
    onNodeClean: C.noop,
    onCheckClick: C.noop,
    onRadioClick: C.noop,
    onExpandNode: C.noop,
    onCollapseNode: C.noop,
    onTreeViewCreate: C.noop
  };
  (C.treeViewSetup = function(e) {
    ln = k.extend({}, ln, e);
  }),
    window.metroTreeViewSetup,
    C.treeViewSetup(window.metroTreeViewSetup);
  var cn = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, ln, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this,
        t = this.element,
        n = this.options;
      C.checkRuntime(t, "treeview"),
        this._createTree(),
        this._createEvents(),
        k.each(t.find("input"), function() {
          k(this).is(":checked") && e._recheck(this);
        }),
        H.exec(n.onTreeViewCreate, null, t[0]),
        t.fire("treeviewcreate");
    },
    _createIcon: function(e) {
      var t, n;
      return (
        (n = H.isTag(e) ? k(e) : k("<img src='' alt=''>").attr("src", e)),
        (t = k("<span>").addClass("icon")).html(n.outerHTML()),
        t
      );
    },
    _createCaption: function(e) {
      return k("<span>")
        .addClass("caption")
        .html(e);
    },
    _createToggle: function() {
      return k("<span>").addClass("node-toggle");
    },
    _createNode: function(e) {
      var t;
      return (
        (t = k("<li>")),
        void 0 !== e.caption && t.prepend(this._createCaption(e.caption)),
        void 0 !== e.icon && t.prepend(this._createIcon(e.icon)),
        void 0 !== e.html && t.append(e.html),
        t
      );
    },
    _createTree: function() {
      var i = this,
        e = this.element,
        t = (this.options, e.find("li"));
      e.addClass("treeview"),
        k.each(t, function() {
          var e,
            t,
            n = k(this);
          (e = n.data("caption")),
            (t = n.data("icon")),
            void 0 !== e &&
              (0 < n.children("ul").length &&
                (e += " (" + n.children("ul").children("li").length + ")"),
              n.prepend(i._createCaption(e))),
            void 0 !== t && n.prepend(i._createIcon(t)),
            0 < n.children("ul").length &&
              (n.addClass("tree-node"),
              n.append(i._createToggle()),
              !0 !== H.bool(n.attr("data-collapsed"))
                ? n.addClass("expanded")
                : n.children("ul").hide());
        });
    },
    _createEvents: function() {
      var s = this,
        a = this.element,
        o = this.options;
      a.on(C.events.click, ".node-toggle", function(e) {
        var t = k(this).parent();
        s.toggleNode(t), e.preventDefault();
      }),
        a.on(C.events.click, "li > .caption", function(e) {
          var t = k(this).parent();
          s.current(t),
            H.exec(o.onNodeClick, [t[0]], a[0]),
            a.fire("nodeclick", { node: t[0] }),
            e.preventDefault();
        }),
        a.on(C.events.click, "li > .caption", function(e) {
          var t = k(this).closest("li"),
            n = t.children(".node-toggle"),
            i = t.children("ul");
          (0 < n.length || 0 < i.length) && s.toggleNode(t),
            H.exec(o.onNodeClick, [t[0]], a[0]),
            a.fire("nodelclick", { node: t[0] }),
            e.preventDefault();
        }),
        a.on(C.events.click, "input[type=radio]", function() {
          var e = k(this),
            t = e.is(":checked"),
            n = e.closest("li");
          s.current(n),
            H.exec(o.onRadioClick, [t, e[0], n[0]], a[0]),
            a.fire("radioclick", { checked: t, check: e[0], node: n[0] });
        }),
        a.on(C.events.click, "input[type=checkbox]", function() {
          var e = k(this),
            t = e.is(":checked"),
            n = e.closest("li");
          s._recheck(e),
            H.exec(o.onCheckClick, [t, e[0], n[0]], a[0]),
            a.fire("checkclick", { checked: t, check: e[0], node: n[0] });
        });
    },
    _recheck: function(e) {
      var t,
        n,
        i,
        s,
        a = this.element;
      (t = (e = k(e)).is(":checked")),
        (n = e.closest("li")),
        this.current(n),
        (i = e.closest("li").find("ul input[type=checkbox]")).attr(
          "data-indeterminate",
          !1
        ),
        i.prop("checked", t),
        (s = []),
        k.each(a.find("input[type=checkbox]"), function() {
          s.push(this);
        }),
        k.each(s.reverse(), function() {
          var e = k(this),
            t = e
              .closest("li")
              .children("ul")
              .find("input[type=checkbox]").length,
            n = e
              .closest("li")
              .children("ul")
              .find("input[type=checkbox]")
              .filter(function(e) {
                return e.checked;
              }).length;
          0 < t &&
            0 === n &&
            (e.attr("data-indeterminate", !1), e.prop("checked", !1)),
            0 === n
              ? e.attr("data-indeterminate", !1)
              : 0 < n && n < t
              ? e.attr("data-indeterminate", !0)
              : t === n &&
                (e.attr("data-indeterminate", !1), e.prop("checked", !0));
        });
    },
    current: function(e) {
      var t = this.element;
      if (void 0 === e) return t.find("li.current");
      t.find("li").removeClass("current"), e.addClass("current");
    },
    toggleNode: function(e) {
      var t,
        n = k(e),
        i = this.element,
        s = this.options,
        a = !n.data("collapsed");
      n.toggleClass("expanded"),
        n.data("collapsed", a),
        (t = !0 == a ? "slideUp" : "slideDown"),
        a
          ? (H.exec(s.onCollapseNode, [n[0]], i[0]),
            i.fire("collapsenode", { node: n[0] }))
          : (H.exec(s.onExpandNode, [n[0]], i[0]),
            i.fire("expandnode", { node: n[0] })),
        n.children("ul")[t](s.duration);
    },
    addTo: function(e, t) {
      var n,
        i,
        s = this.element,
        a = this.options;
      return (
        null === e
          ? (n = s)
          : 0 === (n = (e = k(e)).children("ul")).length &&
            ((n = k("<ul>").appendTo(e)),
            this._createToggle().appendTo(e),
            e.addClass("expanded")),
        (i = this._createNode(t)).appendTo(n),
        H.exec(a.onNodeInsert, [i[0], e ? e[0] : null], s[0]),
        s.fire("nodeinsert", { node: i[0], parent: e ? e[0] : null }),
        i
      );
    },
    insertBefore: function(e, t) {
      var n = this.element,
        i = this.options,
        s = this._createNode(t);
      return H.isNull(e)
        ? this.addTo(e, t)
        : ((e = k(e)),
          s.insertBefore(e),
          H.exec(i.onNodeInsert, [s[0], e[0]], n[0]),
          n.fire("nodeinsert", { node: s[0], parent: e ? e[0] : null }),
          s);
    },
    insertAfter: function(e, t) {
      var n = this.element,
        i = this.options,
        s = this._createNode(t);
      return H.isNull(e)
        ? this.addTo(e, t)
        : ((e = k(e)),
          s.insertAfter(e),
          H.exec(i.onNodeInsert, [s[0], e[0]], n[0]),
          n.fire("nodeinsert", { node: s[0], parent: e[0] }),
          s);
    },
    del: function(e) {
      var t = this.element,
        n = this.options,
        i = (e = k(e)).closest("ul"),
        s = i.closest("li");
      H.exec(n.onNodeDelete, [e[0]], t[0]),
        t.fire("nodedelete", { node: e[0] }),
        e.remove(),
        0 !== i.children().length ||
          i.is(t) ||
          (i.remove(),
          s.removeClass("expanded"),
          s.children(".node-toggle").remove());
    },
    clean: function(e) {
      var t = this.element,
        n = this.options;
      (e = k(e)).children("ul").remove(),
        e.removeClass("expanded"),
        e.children(".node-toggle").remove(),
        H.exec(n.onNodeClean, [e[0]], t[0]),
        t.fire("nodeclean", { node: e[0] });
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return (
        e.off(C.events.click, ".node-toggle"),
        e.off(C.events.click, "li > .caption"),
        e.off(C.events.dblclick, "li > .caption"),
        e.off(C.events.click, "input[type=radio]"),
        e.off(C.events.click, "input[type=checkbox]"),
        e
      );
    }
  };
  C.plugin("treeview", cn);
  var dn = {
    required: function(e) {
      return Array.isArray(e) ? 0 < e.length && e : !!H.isValue(e) && e.trim();
    },
    length: function(e, t) {
      return Array.isArray(e)
        ? e.length === parseInt(t)
        : !(!H.isValue(t) || isNaN(t) || t <= 0) &&
            e.trim().length === parseInt(t);
    },
    minlength: function(e, t) {
      return Array.isArray(e)
        ? e.length >= parseInt(t)
        : !(!H.isValue(t) || isNaN(t) || t <= 0) &&
            e.trim().length >= parseInt(t);
    },
    maxlength: function(e, t) {
      return Array.isArray(e)
        ? e.length <= parseInt(t)
        : !(!H.isValue(t) || isNaN(t) || t <= 0) &&
            e.trim().length <= parseInt(t);
    },
    min: function(e, t) {
      return (
        !(!H.isValue(t) || isNaN(t)) &&
        (!!this.number(e) && (!isNaN(e) && Number(e) >= Number(t)))
      );
    },
    max: function(e, t) {
      return (
        !(!H.isValue(t) || isNaN(t)) &&
        (!!this.number(e) && (!isNaN(e) && Number(e) <= Number(t)))
      );
    },
    email: function(e) {
      return /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(
        e
      );
    },
    domain: function(e) {
      return /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(e);
    },
    url: function(e) {
      return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        e
      );
    },
    date: function(e, t, n) {
      return H.isNull(t)
        ? "invalid date" !== String(new Date(e)).toLowerCase()
        : "invalid date" !== String(e.toDate(t, n)).toLowerCase();
    },
    number: function(e) {
      return !isNaN(e);
    },
    integer: function(e) {
      return H.isInt(e);
    },
    float: function(e) {
      return H.isFloat(e);
    },
    digits: function(e) {
      return /^\d+$/.test(e);
    },
    hexcolor: function(e) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
    },
    color: function(e) {
      return !!H.isValue(e) && !1 !== y.color(e, y.PALETTES.STANDARD);
    },
    pattern: function(e, t) {
      return !!H.isValue(e) && (!!H.isValue(t) && new RegExp(t).test(e));
    },
    compare: function(e, t) {
      return e === t;
    },
    not: function(e, t) {
      return e !== t;
    },
    notequals: function(e, t) {
      return !H.isNull(e) && (!H.isNull(t) && e.trim() !== t.trim());
    },
    equals: function(e, t) {
      return !H.isNull(e) && (!H.isNull(t) && e.trim() === t.trim());
    },
    custom: function(e, t) {
      return !1 !== H.isFunc(t) && H.exec(t, [e]);
    },
    is_control: function(e) {
      return (
        e.parent().hasClass("input") ||
        e.parent().hasClass("select") ||
        e.parent().hasClass("textarea") ||
        e.parent().hasClass("checkbox") ||
        e.parent().hasClass("switch") ||
        e.parent().hasClass("radio") ||
        e.parent().hasClass("spinner")
      );
    },
    reset_state: function(e) {
      var t = k(e);
      dn.is_control(t)
        ? t.parent().removeClass("invalid valid")
        : t.removeClass("invalid valid");
    },
    set_valid_state: function(e) {
      var t = k(e);
      dn.is_control(t) ? t.parent().addClass("valid") : t.addClass("valid");
    },
    set_invalid_state: function(e) {
      var t = k(e);
      dn.is_control(t) ? t.parent().addClass("invalid") : t.addClass("invalid");
    },
    reset: function(e) {
      var t = this;
      return (
        k.each(k(e).find("[data-validate]"), function() {
          t.reset_state(this);
        }),
        this
      );
    },
    validate: function(e, s, t, n, a) {
      var o = !0,
        r = k(e),
        i =
          void 0 !== r.data("validate")
            ? String(r.data("validate"))
                .split(" ")
                .map(function(e) {
                  return e.trim();
                })
            : [],
        l = [];
      if (0 === i.length) return !0;
      if (
        (this.reset_state(r),
        r.attr("type") && "checkbox" === r.attr("type").toLowerCase())
      )
        !1 === (o = -1 === i.indexOf("required") || r.is(":checked")) &&
          l.push("required"),
          void 0 !== s && (s.val += o ? 0 : 1);
      else if (r.attr("type") && "radio" === r.attr("type").toLowerCase()) {
        void 0 === r.attr("name") && (o = !0);
        var c = "input[name=" + r.attr("name") + "]:checked";
        (o = 0 < k(c).length), void 0 !== s && (s.val += o ? 0 : 1);
      } else
        k.each(i, function() {
          if (!1 !== o) {
            var e,
              t,
              n,
              i = this.split("=");
            (e = i[0]),
              i.shift(),
              (t = i.join("=")),
              -1 < ["compare", "equals", "notequals"].indexOf(e) &&
                (t = r[0].form.elements[t].value),
              "date" === e &&
                ((t = r.attr("data-value-format")),
                (n = r.attr("data-value-locale"))),
              !1 ===
                (o =
                  !1 === H.isFunc(dn[e]) ||
                  (!0 === a || "required" === e
                    ? dn[e](r.val(), t, n)
                    : "" === r.val().trim() || dn[e](r.val(), t, n))) &&
                l.push(e),
              void 0 !== s && (s.val += o ? 0 : 1);
          }
        });
      return (
        !1 === o
          ? (this.set_invalid_state(r),
            void 0 !== s &&
              s.log.push({
                input: r[0],
                name: r.attr("name"),
                value: r.val(),
                funcs: i,
                errors: l
              }),
            void 0 !== n && H.exec(n, [r, r.val()], r[0]))
          : (this.set_valid_state(r),
            void 0 !== t && H.exec(t, [r, r.val()], r[0])),
        o
      );
    }
  };
  C.validator = dn;
  var hn = {
    submitTimeout: 200,
    interactiveCheck: !1,
    clearInvalid: 0,
    requiredMode: !0,
    useRequiredClass: !0,
    onBeforeSubmit: C.noop_true,
    onSubmit: C.noop,
    onError: C.noop,
    onValidate: C.noop,
    onErrorForm: C.noop,
    onValidateForm: C.noop,
    onValidatorCreate: C.noop
  };
  (C.validatorSetup = function(e) {
    hn = k.extend({}, hn, e);
  }),
    window.metroValidatorSetup,
    C.validatorSetup(window.metroValidatorSetup);
  var un = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, hn, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this._onsubmit = null),
        (this._onreset = null),
        (this.result = []),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    dependencies: ["utils", "colors"],
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this,
        t = this.element,
        n = this.options,
        i = t.find("[data-validate]");
      t.attr("novalidate", "novalidate"),
        k.each(i, function() {
          var e = k(this);
          -1 < e.data("validate").indexOf("required") &&
            !0 === n.useRequiredClass &&
            (dn.is_control(e)
              ? e.parent().addClass("required")
              : e.addClass("required")),
            !0 === n.interactiveCheck &&
              e.on(C.events.inputchange, function() {
                dn.validate(this, void 0, void 0, void 0, n.requiredMode);
              });
        }),
        (this._onsubmit = null),
        (this._onreset = null) !== t[0].onsubmit &&
          ((this._onsubmit = t[0].onsubmit), (t[0].onsubmit = null)),
        null !== t[0].onreset &&
          ((this._onreset = t[0].onreset), (t[0].onreset = null)),
        (t[0].onsubmit = function() {
          return e._submit();
        }),
        (t[0].onreset = function() {
          return e._reset();
        }),
        H.exec(n.onValidatorCreate, null, t[0]),
        t.fire("validatorcreate");
    },
    _reset: function() {
      dn.reset(this.element),
        null !== this._onsubmit &&
          H.exec(this._onsubmit, null, this.element[0]);
    },
    _submit: function() {
      var e = this,
        t = this.element,
        n = this.options,
        i = this.elem,
        s = t.find("[data-validate]"),
        a = t.find("input[type=submit], button[type=submit]"),
        o = { val: 0, log: [] },
        r = H.formData(t);
      return (
        0 < a.length && a.attr("disabled", "disabled").addClass("disabled"),
        k.each(s, function() {
          dn.validate(this, o, n.onValidate, n.onError, n.requiredMode);
        }),
        a.removeAttr("disabled").removeClass("disabled"),
        (o.val += !1 === H.exec(n.onBeforeSubmit, [r], this.elem) ? 1 : 0),
        0 === o.val
          ? (H.exec(n.onValidateForm, [r], i),
            t.fire("validateform", { data: r }),
            setTimeout(function() {
              H.exec(n.onSubmit, [r], i),
                t.fire("formsubmit", { data: r }),
                null !== e._onsubmit && H.exec(e._onsubmit, null, i);
            }, n.submitTimeout))
          : (H.exec(n.onErrorForm, [o.log, r], i),
            t.fire("errorform", { log: o.log, data: r }),
            0 < n.clearInvalid &&
              setTimeout(function() {
                k.each(s, function() {
                  var e = k(this);
                  dn.is_control(e)
                    ? e.parent().removeClass("invalid")
                    : e.removeClass("invalid");
                });
              }, n.clearInvalid)),
        0 === o.val
      );
    },
    changeAttribute: function(e) {}
  };
  C.plugin("validator", un);
  var pn = {
    src: null,
    poster: "",
    logo: "",
    logoHeight: 32,
    logoWidth: "auto",
    logoTarget: "",
    volume: 0.5,
    loop: !1,
    autoplay: !1,
    fullScreenMode: C.fullScreenMode.DESKTOP,
    aspectRatio: C.aspectRatio.HD,
    controlsHide: 3e3,
    showLoop: !0,
    showPlay: !0,
    showStop: !0,
    showMute: !0,
    showFull: !0,
    showStream: !0,
    showVolume: !0,
    showInfo: !0,
    loopIcon: "<span class='default-icon-loop'></span>",
    stopIcon: "<span class='default-icon-stop'></span>",
    playIcon: "<span class='default-icon-play'></span>",
    pauseIcon: "<span class='default-icon-pause'></span>",
    muteIcon: "<span class='default-icon-mute'></span>",
    volumeLowIcon: "<span class='default-icon-low-volume'></span>",
    volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
    volumeHighIcon: "<span class='default-icon-high-volume'></span>",
    screenMoreIcon: "<span class='default-icon-enlarge'></span>",
    screenLessIcon: "<span class='default-icon-shrink'></span>",
    onPlay: C.noop,
    onPause: C.noop,
    onStop: C.noop,
    onEnd: C.noop,
    onMetadata: C.noop,
    onTime: C.noop,
    onVideoCreate: C.noop
  };
  (C.videoSetup = function(e) {
    pn = k.extend({}, pn, e);
  }),
    window.metroVideoSetup,
    C.videoSetup(window.metroVideoSetup);
  var fn = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, pn, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.fullscreen = !1),
        (this.preloader = null),
        (this.player = null),
        (this.video = t),
        (this.stream = null),
        (this.volume = null),
        (this.volumeBackup = 0),
        (this.muted = !1),
        (this.fullScreenInterval = !1),
        (this.isPlaying = !1),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      this.video;
      C.checkRuntime(e, "video"),
        !1 === C.fullScreenEnabled &&
          (t.fullScreenMode = C.fullScreenMode.WINDOW),
        this._createPlayer(),
        this._createControls(),
        this._createEvents(),
        this._setAspectRatio(),
        !0 === t.autoplay && this.play(),
        H.exec(t.onVideoCreate, [e, this.player], e[0]),
        e.fire("videocreate");
    },
    _createPlayer: function() {
      var e = this.element,
        t = this.options,
        n = this.video,
        i = k("<div>").addClass("media-player video-player " + e[0].className),
        s = k("<div>")
          .addClass("preloader")
          .appendTo(i),
        a = k("<a>")
          .attr("href", t.logoTarget)
          .addClass("logo")
          .appendTo(i);
      e.attr("id") || e.attr("id", H.elementId("video")),
        i.insertBefore(e),
        e.appendTo(i),
        k.each(
          [
            "muted",
            "autoplay",
            "controls",
            "height",
            "width",
            "loop",
            "poster",
            "preload"
          ],
          function() {
            e.removeAttr(this);
          }
        ),
        e.attr("preload", "auto"),
        "" !== t.poster && e.attr("poster", t.poster),
        (n.volume = t.volume),
        s.activity({ type: "cycle", style: "color" }),
        s.hide(),
        (this.preloader = s),
        "" !== t.logo &&
          k("<img>")
            .css({ height: t.logoHeight, width: t.logoWidth })
            .attr("src", t.logo)
            .appendTo(a),
        null !== t.src && this._setSource(t.src),
        (e[0].className = ""),
        (this.player = i);
    },
    _setSource: function(e) {
      var t = this.element;
      t.find("source").remove(),
        t.removeAttr("src"),
        Array.isArray(e)
          ? k.each(e, function() {
              void 0 !== this.src &&
                k("<source>")
                  .attr("src", this.src)
                  .attr("type", void 0 !== this.type ? this.type : "")
                  .appendTo(t);
            })
          : t.attr("src", e);
    },
    _createControls: function() {
      var e,
        t = this,
        n = this.element,
        i = this.options,
        s = this.elem,
        a =
          (this.player,
          k("<div>")
            .addClass("controls")
            .addClass(i.clsControls)
            .insertAfter(n)),
        o = k("<div>")
          .addClass("stream")
          .appendTo(a),
        r = k("<input>")
          .addClass("stream-slider ultra-thin cycle-marker")
          .appendTo(o),
        l = k("<div>")
          .addClass("volume")
          .appendTo(a),
        c = k("<input>")
          .addClass("volume-slider ultra-thin cycle-marker")
          .appendTo(l),
        d = k("<div>")
          .addClass("info-box")
          .appendTo(a);
      !0 !== i.showInfo && d.hide(),
        C.makePlugin(r, "slider", {
          clsMarker: "bg-red",
          clsHint: "bg-cyan fg-white",
          clsComplete: "bg-cyan",
          hint: !0,
          onStart: function() {
            s.paused || s.pause();
          },
          onStop: function(e) {
            0 < s.seekable.length &&
              (s.currentTime = ((t.duration * e) / 100).toFixed(0)),
              s.paused && 0 < s.currentTime && s.play();
          }
        }),
        (this.stream = r),
        !0 !== i.showStream && o.hide(),
        C.makePlugin(c, "slider", {
          clsMarker: "bg-red",
          clsHint: "bg-cyan fg-white",
          hint: !0,
          value: 100 * i.volume,
          onChangeValue: function(e) {
            s.volume = e / 100;
          }
        }),
        (this.volume = c),
        !0 !== i.showVolume && l.hide(),
        !0 === i.showLoop &&
          (e = k("<button>")
            .attr("type", "button")
            .addClass("button square loop")
            .html(i.loopIcon)
            .appendTo(a)),
        !0 === i.showPlay &&
          k("<button>")
            .attr("type", "button")
            .addClass("button square play")
            .html(i.playIcon)
            .appendTo(a),
        !0 === i.showStop &&
          k("<button>")
            .attr("type", "button")
            .addClass("button square stop")
            .html(i.stopIcon)
            .appendTo(a),
        !0 === i.showMute &&
          k("<button>")
            .attr("type", "button")
            .addClass("button square mute")
            .html(i.muteIcon)
            .appendTo(a),
        !0 === i.showFull &&
          k("<button>")
            .attr("type", "button")
            .addClass("button square full")
            .html(i.screenMoreIcon)
            .appendTo(a),
        !0 === i.loop && (e.addClass("active"), n.attr("loop", "loop")),
        this._setVolume(),
        i.muted &&
          ((t.volumeBackup = s.volume),
          C.getPlugin(t.volume[0], "slider").val(0),
          (s.volume = 0)),
        d.html("00:00 / 00:00");
    },
    _createEvents: function() {
      var t = this,
        n = this.element,
        i = this.options,
        s = this.elem,
        a = this.player;
      n.on("loadstart", function() {
        t.preloader.show();
      }),
        n.on("loadedmetadata", function() {
          (t.duration = s.duration.toFixed(0)),
            t._setInfo(0, t.duration),
            H.exec(i.onMetadata, [s, a], n[0]);
        }),
        n.on("canplay", function() {
          t._setBuffer(), t.preloader.hide();
        }),
        n.on("progress", function() {
          t._setBuffer();
        }),
        n.on("timeupdate", function() {
          var e = Math.round((100 * s.currentTime) / t.duration);
          t._setInfo(s.currentTime, t.duration),
            C.getPlugin(t.stream[0], "slider").val(e),
            H.exec(i.onTime, [s.currentTime, t.duration, s, a], n[0]);
        }),
        n.on("waiting", function() {
          t.preloader.show();
        }),
        n.on("loadeddata", function() {}),
        n.on("play", function() {
          a.find(".play").html(i.pauseIcon),
            H.exec(i.onPlay, [s, a], n[0]),
            t._onMouse();
        }),
        n.on("pause", function() {
          a.find(".play").html(i.playIcon),
            H.exec(i.onPause, [s, a], n[0]),
            t._offMouse();
        }),
        n.on("stop", function() {
          C.getPlugin(t.stream[0], "slider").val(0),
            H.exec(i.onStop, [s, a], n[0]),
            t._offMouse();
        }),
        n.on("ended", function() {
          C.getPlugin(t.stream[0], "slider").val(0),
            H.exec(i.onEnd, [s, a], n[0]),
            t._offMouse();
        }),
        n.on("volumechange", function() {
          t._setVolume();
        }),
        a.on(C.events.click, ".play", function(e) {
          s.paused ? t.play() : t.pause();
        }),
        a.on(C.events.click, ".stop", function(e) {
          t.stop();
        }),
        a.on(C.events.click, ".mute", function(e) {
          t._toggleMute();
        }),
        a.on(C.events.click, ".loop", function() {
          t._toggleLoop();
        }),
        a.on(C.events.click, ".full", function() {
          (t.fullscreen = !t.fullscreen),
            a
              .find(".full")
              .html(!0 === t.fullscreen ? i.screenLessIcon : i.screenMoreIcon),
            i.fullScreenMode === C.fullScreenMode.WINDOW
              ? !0 === t.fullscreen
                ? a.addClass("full-screen")
                : a.removeClass("full-screen")
              : !0 === t.fullscreen
              ? (C.requestFullScreen(s),
                !1 === t.fullScreenInterval &&
                  (t.fullScreenInterval = setInterval(function() {
                    !1 === C.inFullScreen() &&
                      ((t.fullscreen = !1),
                      clearInterval(t.fullScreenInterval),
                      (t.fullScreenInterval = !1),
                      a.find(".full").html(i.screenMoreIcon));
                  }, 1e3)))
              : C.exitFullScreen();
        }),
        k(window).on(
          C.events.keyup,
          function(e) {
            t.fullscreen && 27 === e.keyCode && a.find(".full").click();
          },
          { ns: n.attr("id") }
        ),
        k(window).on(
          C.events.resize,
          function() {
            t._setAspectRatio();
          },
          { ns: n.attr("id") }
        );
    },
    _onMouse: function() {
      var t = this.options,
        n = this.player;
      n.on(C.events.enter, function() {
        var e = n.find(".controls");
        0 < t.controlsHide &&
          "none" === e.style("display") &&
          e.stop(!0).fadeIn(500, function() {
            e.css("display", "flex");
          });
      }),
        n.on(C.events.leave, function() {
          var e = n.find(".controls");
          0 < t.controlsHide &&
            1 === parseInt(e.style("opacity")) &&
            setTimeout(function() {
              e.stop(!0).fadeOut(500);
            }, t.controlsHide);
        });
    },
    _offMouse: function() {
      var e = this.player,
        t = this.options,
        n = e.find(".controls");
      e.off(C.events.enter),
        e.off(C.events.leave),
        0 < t.controlsHide &&
          "none" === n.style("display") &&
          n.stop(!0).fadeIn(500, function() {
            n.css("display", "flex");
          });
    },
    _toggleLoop: function() {
      var e = this.player.find(".loop");
      0 !== e.length &&
        (e.toggleClass("active"),
        e.hasClass("active")
          ? this.element.attr("loop", "loop")
          : this.element.removeAttr("loop"));
    },
    _toggleMute: function() {
      (this.muted = !this.muted),
        !1 === this.muted
          ? (this.video.volume = this.volumeBackup)
          : ((this.volumeBackup = this.video.volume), (this.video.volume = 0)),
        C.getPlugin(this.volume, "slider").val(
          !1 === this.muted ? 100 * this.volumeBackup : 0
        );
    },
    _setInfo: function(e, t) {
      this.player
        .find(".info-box")
        .html(
          H.secondsToFormattedString(Math.round(e)) +
            " / " +
            H.secondsToFormattedString(Math.round(t))
        );
    },
    _setBuffer: function() {
      var e = this.video.buffered.length
        ? Math.round(
            (Math.floor(this.video.buffered.end(0)) /
              Math.floor(this.video.duration)) *
              100
          )
        : 0;
      C.getPlugin(this.stream, "slider").buff(e);
    },
    _setVolume: function() {
      var e = this.video,
        t = this.player,
        n = this.options,
        i = t.find(".mute"),
        s = 100 * e.volume;
      1 < s && s < 30
        ? i.html(n.volumeLowIcon)
        : 30 <= s && s < 60
        ? i.html(n.volumeMediumIcon)
        : 60 <= s && s <= 100
        ? i.html(n.volumeHighIcon)
        : i.html(n.muteIcon);
    },
    _setAspectRatio: function() {
      var e,
        t = this.player,
        n = this.options,
        i = t.outerWidth();
      switch (n.aspectRatio) {
        case C.aspectRatio.SD:
          e = H.aspectRatioH(i, "4/3");
          break;
        case C.aspectRatio.CINEMA:
          e = H.aspectRatioH(i, "21/9");
          break;
        default:
          e = H.aspectRatioH(i, "16/9");
      }
      t.outerHeight(e);
    },
    aspectRatio: function(e) {
      (this.options.aspectRatio = e), this._setAspectRatio();
    },
    play: function(e) {
      void 0 !== e && this._setSource(e),
        (void 0 === this.element.attr("src") &&
          0 === this.element.find("source").length) ||
          ((this.isPlaying = !0), this.video.play());
    },
    pause: function() {
      (this.isPlaying = !1), this.video.pause();
    },
    resume: function() {
      this.video.paused && this.play();
    },
    stop: function() {
      (this.isPlaying = !1),
        this.video.pause(),
        (this.video.currentTime = 0),
        C.getPlugin(this.stream[0], "slider").val(0),
        this._offMouse();
    },
    volume: function(e) {
      if (void 0 === e) return this.video.volume;
      1 < e && (e /= 100),
        (this.video.volume = e),
        C.getPlugin(this.volume[0], "slider").val(100 * e);
    },
    loop: function() {
      this._toggleLoop();
    },
    mute: function() {
      this._toggleMute();
    },
    changeAspectRatio: function() {
      (this.options.aspectRatio = this.element.attr("data-aspect-ratio")),
        this._setAspectRatio();
    },
    changeSource: function() {
      var e = JSON.parse(this.element.attr("data-src"));
      this.play(e);
    },
    changeVolume: function() {
      var e = this.element.attr("data-volume");
      this.volume(e);
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-aspect-ratio":
          this.changeAspectRatio();
          break;
        case "data-src":
          this.changeSource();
          break;
        case "data-volume":
          this.changeVolume();
      }
    },
    destroy: function() {
      var e = this.element,
        t = this.player;
      return (
        C.getPlugin(this.stream[0], "slider").destroy(),
        C.getPlugin(this.volume[0], "slider").destroy(),
        e.off("loadstart"),
        e.off("loadedmetadata"),
        e.off("canplay"),
        e.off("progress"),
        e.off("timeupdate"),
        e.off("waiting"),
        e.off("loadeddata"),
        e.off("play"),
        e.off("pause"),
        e.off("stop"),
        e.off("ended"),
        e.off("volumechange"),
        t.off(C.events.click, ".play"),
        t.off(C.events.click, ".stop"),
        t.off(C.events.click, ".mute"),
        t.off(C.events.click, ".loop"),
        t.off(C.events.click, ".full"),
        k(window).off(C.events.keyup, { ns: e.attr("id") }),
        k(window).off(C.events.resize, { ns: e.attr("id") }),
        e
      );
    }
  };
  C.plugin("video", fn);
  var mn = {
    hidden: !1,
    width: "auto",
    height: "auto",
    btnClose: !0,
    btnMin: !0,
    btnMax: !0,
    draggable: !0,
    dragElement: ".window-caption .icon, .window-caption .title",
    dragArea: "parent",
    shadow: !1,
    icon: "",
    title: "Window",
    content: null,
    resizable: !0,
    overlay: !1,
    overlayColor: "transparent",
    overlayAlpha: 0.5,
    modal: !1,
    position: "absolute",
    checkEmbed: !0,
    top: "auto",
    left: "auto",
    place: "auto",
    closeAction: C.actions.REMOVE,
    customButtons: null,
    clsCustomButton: "",
    clsCaption: "",
    clsContent: "",
    clsWindow: "",
    _runtime: !1,
    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
    onDragStart: C.noop,
    onDragStop: C.noop,
    onDragMove: C.noop,
    onCaptionDblClick: C.noop,
    onCloseClick: C.noop,
    onMaxClick: C.noop,
    onMinClick: C.noop,
    onResizeStart: C.noop,
    onResizeStop: C.noop,
    onResize: C.noop,
    onWindowCreate: C.noop,
    onShow: C.noop,
    onWindowDestroy: C.noop,
    onCanClose: C.noop_true,
    onClose: C.noop
  };
  (C.windowSetup = function(e) {
    mn = k.extend({}, mn, e);
  }),
    window.metroWindowSetup,
    C.windowSetup(window.metroWindowSetup);
  var vn = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, mn, e)),
        (this.elem = t),
        (this.element = k(t)),
        (this.win = null),
        (this.overlay = null),
        (this.position = { top: 0, left: 0 }),
        (this.hidden = !1),
        (this.content = null),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    dependencies: ["draggable", "resizeable"],
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e,
        t,
        n = this,
        i = this.element,
        s = this.options,
        a = "parent" === s.dragArea ? i.parent() : k(s.dragArea);
      C.checkRuntime(i, "window"),
        !0 === s.modal &&
          ((s.btnMax = !1), (s.btnMin = !1), (s.resizable = !1)),
        H.isNull(s.content) ||
          (H.isUrl(s.content) && H.isVideoUrl(s.content)
            ? ((s.content = H.embedUrl(s.content)), i.css({ height: "100%" }))
            : !H.isQ(s.content) &&
              H.isFunc(s.content) &&
              (s.content = H.exec(s.content)),
          i.append(s.content)),
        (s.content = i),
        !0 === s._runtime && C.makeRuntime(i, "window"),
        (e = this._window(s)).addClass("no-visible"),
        a.append(e),
        !0 === s.overlay &&
          ((t = this._overlay()).appendTo(e.parent()), (this.overlay = t)),
        (this.win = e),
        H.exec(s.onWindowCreate, [this.win[0]], i[0]),
        i.fire("windowcreate", { win: e[0] }),
        setTimeout(function() {
          n._setPosition(),
            !0 !== s.hidden && n.win.removeClass("no-visible"),
            H.exec(s.onShow, [n.win[0]], i[0]),
            i.fire("show", { win: n.win[0] });
        }, 100);
    },
    _setPosition: function() {
      var e,
        t,
        n,
        i,
        s = this.options,
        a = this.win,
        o = "parent" === s.dragArea ? a.parent() : k(s.dragArea),
        r = o.height() / 2 - a[0].offsetHeight / 2,
        l = o.width() / 2 - a[0].offsetWidth / 2;
      if ("auto" !== s.place) {
        switch (s.place.toLowerCase()) {
          case "top-left":
            (t = e = 0), (i = n = "auto");
            break;
          case "top-center":
            (e = 0), (t = l), (i = n = "auto");
            break;
          case "top-right":
            (n = e = 0), (i = t = "auto");
            break;
          case "right-center":
            (e = r), (n = 0), (i = t = "auto");
            break;
          case "bottom-right":
            (n = i = 0), (e = t = "auto");
            break;
          case "bottom-center":
            (i = 0), (t = l), (e = n = "auto");
            break;
          case "bottom-left":
            (t = i = 0), (e = n = "auto");
            break;
          case "left-center":
            (e = r), (t = 0), (i = n = "auto");
            break;
          default:
            (e = r), (t = l), (n = i = "auto");
        }
        a.css({ top: e, left: t, bottom: i, right: n });
      }
    },
    _window: function(t) {
      var e,
        n,
        i,
        s,
        a,
        o = this,
        r = (this.element, t.width),
        l = t.height;
      if (
        ((e = k("<div>").addClass("window")),
        !0 === t.modal && e.addClass("modal"),
        (n = k("<div>").addClass("window-caption")),
        (i = k("<div>").addClass("window-content")),
        e.append(n),
        e.append(i),
        !0 === t.status &&
          ((a = k("<div>").addClass("window-status")), e.append(a)),
        !0 === t.shadow && e.addClass("win-shadow"),
        H.isValue(t.icon) &&
          k("<span>")
            .addClass("icon")
            .html(t.icon)
            .appendTo(n),
        k("<span>")
          .addClass("title")
          .html(H.isValue(t.title) ? t.title : "&nbsp;")
          .appendTo(n),
        H.isNull(t.content) ||
          (H.isQ(t.content) ? t.content.appendTo(i) : i.html(t.content)),
        (s = k("<div>").addClass("buttons")).appendTo(n),
        !0 === t.btnMax &&
          k("<span>")
            .addClass("button btn-max sys-button")
            .appendTo(s),
        !0 === t.btnMin &&
          k("<span>")
            .addClass("button btn-min sys-button")
            .appendTo(s),
        !0 === t.btnClose &&
          k("<span>")
            .addClass("button btn-close sys-button")
            .appendTo(s),
        H.isValue(t.customButtons))
      ) {
        var c = [];
        !1 !== H.isObject(t.customButtons) &&
          (t.customButtons = H.isObject(t.customButtons)),
          "string" == typeof t.customButtons &&
          -1 < t.customButtons.indexOf("{")
            ? (c = JSON.parse(t.customButtons))
            : "object" == typeof t.customButtons &&
              0 < H.objectLength(t.customButtons)
            ? (c = t.customButtons)
            : console.log("Unknown format for custom buttons"),
          k.each(c, function() {
            var e = k("<span>");
            e
              .addClass("button btn-custom")
              .addClass(t.clsCustomButton)
              .addClass(this.cls)
              .attr("tabindex", -1)
              .html(this.html),
              e.data("action", this.onclick),
              s.prepend(e);
          });
      }
      return (
        n.on(C.events.stop, ".btn-custom", function(e) {
          if (!H.isRightMouse(e)) {
            var t = k(this),
              n = t.data("action");
            H.exec(n, [t], this);
          }
        }),
        e.attr("id", void 0 === t.id ? H.elementId("window") : t.id),
        e.on(C.events.dblclick, ".window-caption", function(e) {
          o.maximized(e);
        }),
        n.on(C.events.click, ".btn-max, .btn-min, .btn-close", function(e) {
          if (!H.isRightMouse(e)) {
            var t = k(e.target);
            t.hasClass("btn-max") && o.maximized(e),
              t.hasClass("btn-min") && o.minimized(e),
              t.hasClass("btn-close") && o.close(e);
          }
        }),
        !0 === t.draggable &&
          C.makePlugin(e, "draggable", {
            dragElement: t.dragElement,
            dragArea: t.dragArea,
            onDragStart: t.onDragStart,
            onDragStop: t.onDragStop,
            onDragMove: t.onDragMove
          }),
        e.addClass(t.clsWindow),
        n.addClass(t.clsCaption),
        i.addClass(t.clsContent),
        0 === t.minWidth &&
          ((t.minWidth = 34),
          k.each(s.children(".btn-custom"), function() {
            t.minWidth += H.hiddenElementSize(this).width;
          }),
          t.btnMax && (t.minWidth += 34),
          t.btnMin && (t.minWidth += 34),
          t.btnClose && (t.minWidth += 34)),
        0 < t.minWidth &&
          !isNaN(t.width) &&
          t.width < t.minWidth &&
          (r = t.minWidth),
        0 < t.minHeight &&
          !isNaN(t.height) &&
          t.height > t.minHeight &&
          (l = t.minHeight),
        !0 === t.resizable &&
          (k("<span>")
            .addClass("resize-element")
            .appendTo(e),
          e.addClass("resizable"),
          C.makePlugin(e, "resizable", {
            minWidth: t.minWidth,
            minHeight: t.minHeight,
            maxWidth: t.maxWidth,
            maxHeight: t.maxHeight,
            resizeElement: ".resize-element",
            onResizeStart: t.onResizeStart,
            onResizeStop: t.onResizeStop,
            onResize: t.onResize
          })),
        e.css({
          width: r,
          height: l,
          position: t.position,
          top: t.top,
          left: t.left
        }),
        e
      );
    },
    _overlay: function() {
      var e = this.options,
        t = k("<div>");
      return (
        t.addClass("overlay"),
        "transparent" === e.overlayColor
          ? t.addClass("transparent")
          : t.css({ background: H.hex2rgba(e.overlayColor, e.overlayAlpha) }),
        t
      );
    },
    maximized: function(e) {
      var t = this.win,
        n = this.element,
        i = this.options,
        s = k(e.currentTarget);
      t.removeClass("minimized"),
        t.toggleClass("maximized"),
        s.hasClass("window-caption")
          ? (H.exec(i.onCaptionDblClick, [t[0]], n[0]),
            n.fire("captiondblclick", { win: t[0] }))
          : (H.exec(i.onMaxClick, [t[0]], n[0]),
            n.fire("maxclick", { win: t[0] }));
    },
    minimized: function() {
      var e = this.win,
        t = this.element,
        n = this.options;
      e.removeClass("maximized"),
        e.toggleClass("minimized"),
        H.exec(n.onMinClick, [e[0]], t[0]),
        t.fire("minclick", { win: e[0] });
    },
    close: function() {
      var e = this,
        t = this.win,
        n = this.element,
        i = this.options;
      if (!1 === H.exec(i.onCanClose, [t])) return !1;
      var s = 0;
      i.onClose !== C.noop && (s = 500),
        H.exec(i.onClose, [t[0]], n[0]),
        n.fire("close", { win: t[0] }),
        setTimeout(function() {
          !null === i.modal && t.siblings(".overlay").remove(),
            H.exec(i.onCloseClick, [t[0]], n[0]),
            n.fire("closeclick", { win: t[0] }),
            H.exec(i.onWindowDestroy, [t[0]], n[0]),
            n.fire("windowdestroy", { win: t[0] }),
            i.closeAction === C.actions.REMOVE ? t.remove() : e.hide();
        }, s);
    },
    hide: function() {
      var e = this.element,
        t = this.options;
      this.win.css({ display: "none" }),
        H.exec(t.onHide, [this.win[0]], e[0]),
        e.fire("hide", { win: this.win[0] });
    },
    show: function() {
      var e = this.element,
        t = this.options;
      this.win.removeClass("no-visible"),
        this.win.css({ display: "flex" }),
        H.exec(t.onShow, [this.win[0]], e[0]),
        e.fire("show", { win: this.win[0] });
    },
    toggle: function() {
      "none" === this.win.css("display") || this.win.hasClass("no-visible")
        ? this.show()
        : this.hide();
    },
    isOpen: function() {
      return this.win.hasClass("no-visible");
    },
    min: function(e) {
      e ? this.win.addClass("minimized") : this.win.removeClass("minimized");
    },
    max: function(e) {
      e ? this.win.addClass("maximized") : this.win.removeClass("maximized");
    },
    toggleButtons: function(e) {
      var t = this.win,
        n = t.find(".btn-close"),
        i = t.find(".btn-min"),
        s = t.find(".btn-max");
      "data-btn-close" === e && n.toggle(),
        "data-btn-min" === e && i.toggle(),
        "data-btn-max" === e && s.toggle();
    },
    changeSize: function(e) {
      var t = this.element,
        n = this.win;
      "data-width" === e && n.css("width", t.data("width")),
        "data-height" === e && n.css("height", t.data("height"));
    },
    changeClass: function(e) {
      var t = this.element,
        n = this.win,
        i = this.options;
      "data-cls-window" === e &&
        (n[0].className =
          "window " +
          (i.resizable ? " resizeable " : " ") +
          t.attr("data-cls-window")),
        "data-cls-caption" === e &&
          (n.find(".window-caption")[0].className =
            "window-caption " + t.attr("data-cls-caption")),
        "data-cls-content" === e &&
          (n.find(".window-content")[0].className =
            "window-content " + t.attr("data-cls-content"));
    },
    toggleShadow: function() {
      var e = this.element,
        t = this.win;
      !0 === JSON.parse(e.attr("data-shadow"))
        ? t.addClass("win-shadow")
        : t.removeClass("win-shadow");
    },
    setContent: function(e) {
      var t,
        n = this.element,
        i = this.win,
        s = H.isValue(e) ? e : n.attr("data-content");
      (t = !H.isQ(s) && H.isFunc(s) ? H.exec(s) : H.isQ(s) ? s.html() : s),
        i.find(".window-content").html(t);
    },
    setTitle: function(e) {
      var t = this.element,
        n = this.win,
        i = H.isValue(e) ? e : t.attr("data-title");
      n.find(".window-caption .title").html(i);
    },
    setIcon: function(e) {
      var t = this.element,
        n = this.win,
        i = H.isValue(e) ? e : t.attr("data-icon");
      n.find(".window-caption .icon").html(i);
    },
    getIcon: function() {
      return this.win.find(".window-caption .icon").html();
    },
    getTitle: function() {
      return this.win.find(".window-caption .title").html();
    },
    toggleDraggable: function() {
      var e = this.element,
        t = this.win,
        n = JSON.parse(e.attr("data-draggable")),
        i = C.getPlugin(t, "draggable");
      !0 === n ? i.on() : i.off();
    },
    toggleResizable: function() {
      var e = this.element,
        t = this.win,
        n = JSON.parse(e.attr("data-resizable")),
        i = C.getPlugin(t, "resizable");
      !0 === n
        ? (i.on(),
          t.find(".resize-element").removeClass("resize-element-disabled"))
        : (i.off(),
          t.find(".resize-element").addClass("resize-element-disabled"));
    },
    changeTopLeft: function(e) {
      var t,
        n = this.element,
        i = this.win;
      if ("data-top" === e) {
        if (((t = parseInt(n.attr("data-top"))), !isNaN(t))) return;
        i.css("top", t);
      }
      if ("data-left" === e) {
        if (((t = parseInt(n.attr("data-left"))), !isNaN(t))) return;
        i.css("left", t);
      }
    },
    changePlace: function(e) {
      var t = this.element,
        n = this.win,
        i = H.isValue(e) ? e : t.attr("data-place");
      n.addClass(i);
    },
    changeAttribute: function(e) {
      switch (e) {
        case "data-btn-close":
        case "data-btn-min":
        case "data-btn-max":
          this.toggleButtons(e);
          break;
        case "data-width":
        case "data-height":
          this.changeSize(e);
          break;
        case "data-cls-window":
        case "data-cls-caption":
        case "data-cls-content":
          this.changeClass(e);
          break;
        case "data-shadow":
          this.toggleShadow();
          break;
        case "data-icon":
          this.setIcon();
          break;
        case "data-title":
          this.setTitle();
          break;
        case "data-content":
          this.setContent();
          break;
        case "data-draggable":
          this.toggleDraggable();
          break;
        case "data-resizable":
          this.toggleResizable();
          break;
        case "data-top":
        case "data-left":
          this.changeTopLeft(e);
          break;
        case "data-place":
          this.changePlace();
      }
    },
    destroy: function() {
      return this.element;
    }
  };
  C.plugin("window", vn),
    (C.window = {
      isWindow: function(e) {
        return H.isMetroObject(e, "window");
      },
      min: function(e, t) {
        if (!this.isWindow(e)) return !1;
        C.getPlugin(e, "window").min(t);
      },
      max: function(e, t) {
        if (!this.isWindow(e)) return !1;
        C.getPlugin(e, "window").max(t);
      },
      show: function(e) {
        if (!this.isWindow(e)) return !1;
        C.getPlugin(e, "window").show();
      },
      hide: function(e) {
        if (!this.isWindow(e)) return !1;
        C.getPlugin(e, "window").hide();
      },
      toggle: function(e) {
        if (!this.isWindow(e)) return !1;
        C.getPlugin(e, "window").toggle();
      },
      isOpen: function(e) {
        return !!this.isWindow(e) && C.getPlugin(e, "window").isOpen();
      },
      close: function(e) {
        if (!this.isWindow(e)) return !1;
        C.getPlugin(e, "window").close();
      },
      create: function(e) {
        var t;
        t = k("<div>").appendTo(k("body"));
        var n = k.extend({}, {}, void 0 !== e ? e : {});
        return (n._runtime = !0), t.window(n);
      }
    });
  var gn = {
    start: 1,
    finish: 0,
    iconHelp: "<span class='default-icon-help'></span>",
    iconPrev: "<span class='default-icon-left-arrow'></span>",
    iconNext: "<span class='default-icon-right-arrow'></span>",
    iconFinish: "<span class='default-icon-check'></span>",
    buttonMode: "cycle",
    buttonOutline: !0,
    clsWizard: "",
    clsActions: "",
    clsHelp: "",
    clsPrev: "",
    clsNext: "",
    clsFinish: "",
    onPage: C.noop,
    onNextPage: C.noop,
    onPrevPage: C.noop,
    onFirstPage: C.noop,
    onLastPage: C.noop,
    onFinishPage: C.noop,
    onHelpClick: C.noop,
    onPrevClick: C.noop,
    onNextClick: C.noop,
    onFinishClick: C.noop,
    onBeforePrev: C.noop_true,
    onBeforeNext: C.noop_true,
    onWizardCreate: C.noop
  };
  (C.wizardSetup = function(e) {
    gn = k.extend({}, gn, e);
  }),
    window.metroWizardSetup,
    C.wizardSetup(window.metroWizardSetup);
  var Cn = {
    init: function(e, t) {
      return (
        (this.options = k.extend({}, gn, e)),
        (this.elem = t),
        (this.element = k(t)),
        this._setOptionsFromDOM(),
        this._create(),
        this
      );
    },
    _setOptionsFromDOM: function() {
      var e = this.element,
        i = this.options;
      k.each(e.data(), function(t, n) {
        if (t in i)
          try {
            i[t] = JSON.parse(n);
          } catch (e) {
            i[t] = n;
          }
      });
    },
    _create: function() {
      var e = this.element,
        t = this.options;
      C.checkRuntime(e, "wizard"),
        this._createWizard(),
        this._createEvents(),
        H.exec(t.onWizardCreate, null, e[0]),
        e.fire("wizardcreate");
    },
    _createWizard: function() {
      var e,
        t = this.element,
        n = this.options;
      t.attr("id") || t.attr("id", H.elementId("wizard")),
        t
          .addClass("wizard")
          .addClass(n.view)
          .addClass(n.clsWizard),
        (e = k("<div>")
          .addClass("action-bar")
          .addClass(n.clsActions)
          .appendTo(t));
      var i = "button" === n.buttonMode ? "" : n.buttonMode;
      !0 === n.buttonOutline && (i += " outline"),
        !1 !== n.iconHelp &&
          k("<button>")
            .attr("type", "button")
            .addClass("button wizard-btn-help")
            .addClass(i)
            .addClass(n.clsHelp)
            .html(
              H.isTag(n.iconHelp)
                ? n.iconHelp
                : k("<img>").attr("src", n.iconHelp)
            )
            .appendTo(e),
        !1 !== n.iconPrev &&
          k("<button>")
            .attr("type", "button")
            .addClass("button wizard-btn-prev")
            .addClass(i)
            .addClass(n.clsPrev)
            .html(
              H.isTag(n.iconPrev)
                ? n.iconPrev
                : k("<img>").attr("src", n.iconPrev)
            )
            .appendTo(e),
        !1 !== n.iconNext &&
          k("<button>")
            .attr("type", "button")
            .addClass("button wizard-btn-next")
            .addClass(i)
            .addClass(n.clsNext)
            .html(
              H.isTag(n.iconNext)
                ? n.iconNext
                : k("<img>").attr("src", n.iconNext)
            )
            .appendTo(e),
        !1 !== n.iconFinish &&
          k("<button>")
            .attr("type", "button")
            .addClass("button wizard-btn-finish")
            .addClass(i)
            .addClass(n.clsFinish)
            .html(
              H.isTag(n.iconFinish)
                ? n.iconFinish
                : k("<img>").attr("src", n.iconFinish)
            )
            .appendTo(e),
        this.toPage(n.start),
        this._setHeight();
    },
    _setHeight: function() {
      var e = this.element,
        t = (this.options, e.children("section")),
        n = 0;
      t.children(".page-content").css("max-height", "none"),
        k.each(t, function() {
          var e = k(this).height();
          n < parseInt(e) && (n = e);
        }),
        e.height(n);
    },
    _createEvents: function() {
      var t = this,
        n = this.element,
        i = this.options;
      n.on(C.events.click, ".wizard-btn-help", function() {
        var e = n.children("section").get(t.current - 1);
        H.exec(i.onHelpClick, [t.current, e, n[0]]),
          n.fire("helpclick", { index: t.current, page: e });
      }),
        n.on(C.events.click, ".wizard-btn-prev", function() {
          t.prev();
          var e = n.children("section").get(t.current - 1);
          H.exec(i.onPrevClick, [t.current, e], n[0]),
            n.fire("prevclick", { index: t.current, page: e });
        }),
        n.on(C.events.click, ".wizard-btn-next", function() {
          t.next();
          var e = n.children("section").get(t.current - 1);
          H.exec(i.onNextClick, [t.current, e], n[0]),
            n.fire("nextclick", { index: t.current, page: e });
        }),
        n.on(C.events.click, ".wizard-btn-finish", function() {
          var e = n.children("section").get(t.current - 1);
          H.exec(i.onFinishClick, [t.current, e], n[0]),
            n.fire("finishclick", { index: t.current, page: e });
        }),
        n.on(C.events.click, ".complete", function() {
          var e = k(this).index() + 1;
          t.toPage(e);
        }),
        k(window).on(
          C.events.resize,
          function() {
            t._setHeight();
          },
          { ns: n.attr("id") }
        );
    },
    next: function() {
      var e = this.element,
        t = this.options,
        n = e.children("section"),
        i = k(e.children("section").get(this.current - 1));
      this.current + 1 > n.length ||
        !1 === H.exec(t.onBeforeNext, [this.current, i, e]) ||
        (this.current++,
        this.toPage(this.current),
        (i = k(e.children("section").get(this.current - 1))),
        H.exec(t.onNextPage, [this.current, i[0]], e[0]),
        e.fire("nextpage", { index: this.current, page: i[0] }));
    },
    prev: function() {
      var e = this.element,
        t = this.options,
        n = k(e.children("section").get(this.current - 1));
      this.current - 1 != 0 &&
        !1 !== H.exec(t.onBeforePrev, [this.current, n, e]) &&
        (this.current--,
        this.toPage(this.current),
        (n = k(e.children("section").get(this.current - 1))),
        H.exec(t.onPrevPage, [this.current, n[0]], e[0]),
        e.fire("prevpage", { index: this.current, page: n[0] }));
    },
    last: function() {
      var e,
        t = this.element,
        n = this.options;
      this.toPage(t.children("section").length),
        (e = k(t.children("section").get(this.current - 1))),
        H.exec(n.onLastPage, [this.current, e[0]], t[0]),
        t.fire("lastpage", { index: this.current, page: e[0] });
    },
    first: function() {
      var e,
        t = this.element,
        n = this.options;
      this.toPage(1),
        (e = k(t.children("section").get(0))),
        H.exec(n.onFirstPage, [this.current, e[0]], t[0]),
        t.fire("firstpage", { index: this.current, page: e[0] });
    },
    toPage: function(e) {
      var t = this.element,
        n = this.options,
        i = k(t.children("section").get(e - 1)),
        s = t.children("section"),
        a = t.find(".action-bar");
      if (0 !== i.length) {
        var o = t.find(".wizard-btn-finish").addClass("disabled"),
          r = t.find(".wizard-btn-next").addClass("disabled"),
          l = t.find(".wizard-btn-prev").addClass("disabled");
        (this.current = e),
          t
            .children("section")
            .removeClass("complete current")
            .removeClass(n.clsCurrent)
            .removeClass(n.clsComplete),
          i.addClass("current").addClass(n.clsCurrent),
          i
            .prevAll()
            .addClass("complete")
            .addClass(n.clsComplete);
        var c =
          0 === t.children("section.complete").length
            ? 0
            : parseInt(
                H.getStyleOne(
                  t.children("section.complete")[0],
                  "border-left-width"
                )
              );
        a.animate({ left: t.children("section.complete").length * c + 41 }),
          (this.current === s.length ||
            (0 < n.finish && this.current >= n.finish)) &&
            o.removeClass("disabled"),
          0 < parseInt(n.finish) &&
            this.current === parseInt(n.finish) &&
            (H.exec(n.onFinishPage, [this.current, i[0]], t[0]),
            t.fire("finishpage", { index: this.current, page: i[0] })),
          this.current < s.length && r.removeClass("disabled"),
          1 < this.current && l.removeClass("disabled"),
          H.exec(n.onPage, [this.current, i[0]], t[0]),
          t.fire("page", { index: this.current, page: i[0] });
      }
    },
    changeAttribute: function(e) {},
    destroy: function() {
      var e = this.element;
      return (
        e.off(C.events.click, ".wizard-btn-help"),
        e.off(C.events.click, ".wizard-btn-prev"),
        e.off(C.events.click, ".wizard-btn-next"),
        e.off(C.events.click, ".wizard-btn-finish"),
        e.off(C.events.click, ".complete"),
        k(window).off(C.events.resize, { ns: e.attr("id") }),
        e
      );
    }
  };
  return C.plugin("wizard", Cn), !0 === METRO_INIT ? C.init() : C;
});
