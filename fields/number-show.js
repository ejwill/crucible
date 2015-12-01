"use strict";

var m      = require("mithril"),
    assign = require("lodash.assign"),
    
    loading = require("./loading");

module.exports = {
    controller : function(options) {
        var ctrl = this;
        
        options.field.on("value", function(snap) {
            ctrl.field = snap.val();
            
            m.redraw();
        });
        
        if(options.callback) {
            ctrl.oninput = function(e) {
                options.callback(e.target.valueAsNumber);
            };
        }
    },

    view : function(ctrl, options) {
        if(!("field" in ctrl)) {
            return m.component(loading);
        }
        
        if(ctrl.field === null) {
            return m("span", "BYE!");
        }
        
        return m("label", ctrl.field.name + ": ",
            m("input[type=number]", assign({}, ctrl.field, { value : options.data || "" }, {
                oninput : ctrl.oninput
            }))
        );
    }
};