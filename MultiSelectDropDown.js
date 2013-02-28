define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dgrid/Keyboard",
    "dgrid/selector",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectDropDown.html",
    "dijit/layout/_ContentPaneResizeMixin",
    "dijit/form/Button",

    "dijit/form/TextBox",
    "dijit/layout/ContentPane"
], function (declare, lang, on, Grid, Selection, Keyboard, selector, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template, _ContentPaneResizeMixin, Button) {

    var MyGrid = declare([Grid, Selection, Keyboard], {
        showHeader: false,
        selectionMode: 'multiple',
        allowSelectAll: true,
        deselectOnRefresh: false,
        noDataMessage: "No data matched your selection"
    });

    return declare("bc-multiselect-combo.MultiSelectDropDown", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin,
        _ContentPaneResizeMixin], {

        store: null,
        displayAttr: null,
        showApplyButton: false,
        showClearAllButton: false,
        clearAllButtonLabel: null,
        showFilterField: false,

        templateString: template,
        dapFilterField: null,
        dapGridContainer: null,
        dapButtonContainer: null,

        _grid: null,
        _selectionHandler: null,

        postCreate: function () {
            var cols = [
                    selector({}),
                    {field: this.displayAttr}
                ],
                applyButton,
                clearAllButton,
                self = this;

            var grid = new MyGrid({
                columns: cols,
                store: this.store
            });
            this.dapGridContainer.appendChild(grid.domNode);
            grid.refresh();

            this.own(
                on(grid.domNode, 'dgrid-select,dgrid-deselect', function (evt) {
                    // if we are not showing an apply button, change the property immediately
                    if (!self.showApplyButton) {
                        self._applySelection();
                    }
                })
            );

            this._grid = grid;

            if (this.showApplyButton) {
                applyButton = new Button({
                    label: 'Apply',
                    onClick: lang.hitch(this, this._applyButtonClicked)
                });
                this.dapButtonContainer.appendChild(applyButton.domNode);
            }

            if (this.showClearAllButton) {
                clearAllButton = new Button({
                    label: this.clearAllButtonLabel,
                    onClick: lang.hitch(this, this._clearButtonClicked)
                });
                this.dapButtonContainer.appendChild(clearAllButton.domNode);
            }

            if (!this.showFilterField) {
                this.dapFilterField.destroy();
                this.dapFilterField = null;
            }
        },

        onClose: function () {
            this.inherited(arguments);
            if (this.dapFilterField) {
                this.dapFilterField.set('value', null);
            }
            this._handleFilterChange();
        },

        setWidth: function (w) {
            if (this.dapFilterField) {
                this.dapFilterField.set('style', {width: w + 'px'});
            }
        },

        onOpen: function () {
            this.inherited(arguments);
            this.resize();
            this._grid.refresh();
        },

        destroy: function () {
            this._selectionHandler.remove();
            this.inherited(arguments);
        },

        setSelection: function (selection) {
            this._grid.selection = selection;
            this._grid.refresh();
        },

        _setStoreAttr: function (store) {
            if (this._grid) {
                this._grid.set('store', store);
            }
            else {
                this.store = store;
            }
        },

        _handleFilterChange: function () {
            var query = {};
            if (this.dapFilterField) {
                query[this.displayAttr] = new RegExp('^.*' + this.dapFilterField.get('displayedValue') + '.*$', 'i');
            }
            this._grid.set('query', query);
        },

        _applyButtonClicked: function () {
            this._applySelection();
            this.emit('Apply', {});
        },

        _applySelection: function () {
            this.set('selection', JSON.parse(JSON.stringify(this._grid.selection))); // create a copy or various things will go wrong
        },

        _clearButtonClicked: function () {
            this._grid.clearSelection();
            if (!this.showApplyButton) {
                this._applySelection();
            }
        }
    });

});
