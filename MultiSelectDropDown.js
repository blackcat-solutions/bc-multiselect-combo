define([
    "dojo/_base/declare",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dgrid/Keyboard",
    "dgrid/selector",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectDropDown.html",

    "dijit/form/TextBox",
    "dijit/layout/ContentPane"
], function (declare, Grid, Selection, Keyboard, selector, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template) {

    var MyGrid = declare([Grid, Selection, Keyboard], {
        showHeader: false,
        selectionMode: 'none',
        allowSelectAll: true
    });

    return declare("dgrid-multiselect-combo.MultiSelectDropDown", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {

        store: null,

        templateString: template,
        dapFilterField: null,
        dapGridContainer: null,
        displayAttr: null,

        _grid: null,

        postCreate: function() {
            var cols = [
                selector({}),
                {field: this.displayAttr}
            ];

            var grid = new MyGrid({
                columns: cols,
                store: this.store
            });
            this.dapGridContainer.set('content', grid);
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
