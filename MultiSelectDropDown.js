define([
    "dojo/_base/declare",
    "dojo/on",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dgrid/Keyboard",
    "dgrid/selector",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectDropDown.html",

    "dijit/form/TextBox",
    "dijit/form/Button",
    "dijit/layout/ContentPane"
], function (declare, on, Grid, Selection, Keyboard, selector, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template) {

    var MyGrid = declare([Grid, Selection, Keyboard], {
        showHeader: false,
        selectionMode: 'multiple',
        allowSelectAll: true,
        deselectOnRefresh: false
    });

    return declare("dgrid-multiselect-combo.MultiSelectDropDown", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {

        store: null,

        templateString: template,
        dapFilterField: null,
        dapGridContainer: null,
        displayAttr: null,

        _grid: null,
        _selectionHandler: null,

        postCreate: function() {
            var cols = [
                selector({}),
                {field: this.displayAttr}
            ];

            var grid = new MyGrid({
                columns: cols,
                store: this.store
            });
            this.dapGridContainer.appendChild(grid.domNode);
            grid.refresh();

            this._selectionHandler = on(grid.domNode, 'dgrid-select,dgrid-deselect', function(evt){
                console.log(JSON.stringify(evt.grid.selection));
            });

            this._grid = grid;
        },

        destroy: function() {
            this._selectionHandler.remove();
            this.inherited(arguments);
        },

        _handleFilterChange: function() {
            var query = {};
            query[this.displayAttr] = new RegExp('^.*' + this.dapFilterField.get('displayedValue') + '.*$');
            this._grid.set('query', query);
        }
    });

});
