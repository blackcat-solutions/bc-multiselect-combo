define([
    "dojo/_base/declare",
    "dgrid/OnDemandGrid",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectComboBox.html",
    "./MultiSelectDropDown",

    "dijit/form/ComboButton"
], function (declare, OnDemandGrid, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template, MultiSelectDropDown) {

    return declare("dgrid-multiselect-combo.MultiSelectComboBox", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {

        store: null,
        displayAttr: null,

        templateString: template,
        dapButton: null,

        _dropDown: null,

        postCreate: function() {
            this._dropDown = new MultiSelectDropDown({
                store: this.store,
                displayAttr: this.displayAttr
            });

            this.dapButton.set('dropDown', this._dropDown);
        }
    });

});
