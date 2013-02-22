define([
    "dojo/_base/declare",
    "dgrid/OnDemandGrid",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectDropDown.html",

    "dijit/form/TextBox"
], function (declare, OnDemandGrid, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template) {

    return declare("dgrid-multiselect-combo.MultiSelectDropDown", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {
        templateString: template
    });

});
