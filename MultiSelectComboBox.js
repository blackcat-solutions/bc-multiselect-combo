define([
    "dojo/_base/declare",
    "dojo/on",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectComboBox.html",
    "./MultiSelectDropDown",
    "dijit/DropDownMenu",

    "dijit/form/ComboButton"
], function (declare, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template, MultiSelectDropDown,
    DropDownMenu) {

    return declare("dgrid-multiselect-combo.MultiSelectComboBox", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin], {

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
        showClearAllButton: false,

        templateString: template,
        dapButton: null,

        _dropDown: null,
        _selectionHandler: null,
        _selection: null,

        postCreate: function() {
            var dropDown = new DropDownMenu(),
                self = this;

            this._dropDown = new MultiSelectDropDown({
                store: this.store,
                displayAttr: this.displayAttr,
                showApplyButton: this.showApplyButton,
                showClearAllButton: this.showClearAllButton
            });

            this._dropDown.watch('selection', function(value){
                console.log('selection changed');
                self.set('selection', value);
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
        },

        _setSelectionAttr: function(value) {
            this._selection = value;
        },

        _getSelectionAttr: function() {
            return this._selection;
        }
    });

});
