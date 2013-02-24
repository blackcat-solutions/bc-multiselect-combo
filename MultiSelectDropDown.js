define([
    "dojo/_base/declare",
    "dgrid/OnDemandGrid",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectDropDown.html",

    "dijit/form/TextBox"
], function (declare, OnDemandGrid, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template) {

    var MyGrid = declare([OnDemandGrid], {
        showHeader: false
    });

    return declare("dgrid-multiselect-combo.MultiSelectDropDown", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {

        store: null,

        templateString: template,
        dapFilterField: null,
        dapGrid: null,
        displayAttr: null,

        _grid: null,

        postCreate: function() {
            var cols = {};
            cols[this.displayAttr] = {};
            var grid = new MyGrid({
                columns: cols,
                store: this.store
            });
            this.dapGrid.appendChild(grid.domNode);
            grid.refresh();
            this._grid = grid;
        },

        _handleFilterChange: function() {
            var query = {};
            query[this.displayAttr] = new RegExp('^.*' + this.dapFilterField.get('displayedValue') + '.*$');
            this._grid.set('query', query);
        }
    });

});
