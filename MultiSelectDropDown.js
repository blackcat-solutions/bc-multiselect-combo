define([
    "dojo/_base/declare",
    "dgrid/OnDemandGrid",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectDropDown.html",
    "dojo/store/Memory",

    "dijit/form/TextBox"
], function (declare, OnDemandGrid, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template, Memory) {

    var MyGrid = declare([OnDemandGrid], {
        columns: {
            "foo": {label: "Foo"}
        }
    });

    return declare("dgrid-multiselect-combo.MultiSelectDropDown", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {
        templateString: template,

        dapGrid: null,

        postCreate: function() {
            var grid = new MyGrid({
                store: new Memory({
                    data: [
                        {foo: 'bar'}
                    ]
                })
            });
            this.dapGrid.appendChild(grid.domNode);
            grid.startup();
            grid.resize();
        }
    });

});
