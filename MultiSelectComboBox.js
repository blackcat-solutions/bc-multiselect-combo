define([
    "dojo/_base/declare",
    "dojo/on",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectComboBox.html",
    "./MultiSelectDropDown",
    "dijit/DropDownMenu",
    "dijit/MenuItem",

    "dijit/form/ComboButton"
], function (declare, on, _Widget, _TemplatedMixin, _WidgetsInTemplatedMixin, template, MultiSelectDropDown,
    DropDownMenu, MenuItem) {

    return declare("dgrid-multiselect-combo.MultiSelectComboBox", [_Widget, _TemplatedMixin, _WidgetsInTemplatedMixin], {

        // store: Store
        //        The store which gives the objects we are selecting.
        store: null,
        // displayAttr: String
        //        The name of the attribute of each object that should be displayed in the drop down.
        displayAttr: null,
        // showApplyButton: Boolean
        //        Whether to show an 'Apply' button (defaults to false).  If true, then an 'Apply' button will
        //        be shown, and the selection state will only be updated when this button is pressed.  This is
        //        useful when the action you perform on selection state change is costly.
        showApplyButton: false,

        templateString: template,
        dapButton: null,

        _dropDown: null,

        _selectionHandler: null,

        postCreate: function() {
            var dropDown = new DropDownMenu();

            this._dropDown = new MultiSelectDropDown({
                store: this.store,
                displayAttr: this.displayAttr
            });

            dropDown.addChild(this._dropDown);

            this.dapButton.set('dropDown', dropDown);

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
