define([
    "dojo/_base/declare",
    "dojo/on",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectComboBox.html",
    "./MultiSelectDropDown",

    "dijit/form/ComboButton"
], function (declare, on, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template, MultiSelectDropDown) {

    return declare("dgrid-multiselect-combo.MultiSelectComboBox", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {

        store: null,
        displayAttr: null,

        templateString: template,
        dapButton: null,

        _dropDown: null,

        _selectionHandler: null,

        postCreate: function() {
            this._dropDown = new MultiSelectDropDown({
                store: this.store,
                displayAttr: this.displayAttr
            });

            this.dapButton.set('dropDown', this._dropDown);

            this._selectionHandler = on(this.domNode, 'dgrid-select', function(evt){
                console.log(JSON.stringify(evt.grid.selection));
            });
        },

        openDropDown: function() {
            this.inherited(arguments);
            this._dropDown.onOpen();
        },

        destroy: function() {
            this.inherited(arguments);
            this._selectionHandler.remove();
        }
    });

});
