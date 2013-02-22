define([
    "dojo/_base/declare",
    "dgrid/OnDemandGrid",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectComboBox.html",

    "dijit/form/ComboButton"
], function (declare, OnDemandGrid, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template) {

    return declare("dgrid-multiselect-combo.MultiSelectComboBox", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {
        templateString: template
    });

});
