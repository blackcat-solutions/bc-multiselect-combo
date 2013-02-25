define([
    "dojo/_base/declare",
    "dojo/on",
    "dojo/query",
    "dojo/dom-style",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectComboBox.html",
    "./MultiSelectDropDown",
    "dijit/DropDownMenu",

    "dijit/form/ComboButton"
], function (declare, on, query, style, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template, MultiSelectDropDown,
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
        showClearAllButton: true,
        showSelectionCount: true,

        templateString: template,
        dapButton: null,
        labelWidth: null,

        _dropDown: null,
        _selectionHandler: null,

        postCreate: function() {
            var dropDown = new DropDownMenu(),
                self = this;

            this._dropDown = new MultiSelectDropDown({
                store: this.store,
                displayAttr: this.displayAttr,
                showApplyButton: this.showApplyButton,
                showClearAllButton: this.showClearAllButton,
                onApply: function(){
                    self.dapButton.closeDropDown();
                }
            });

            this._dropDown.watch('selection', function(){
                self.set('selection', JSON.parse(JSON.stringify(self._dropDown.get('selection'))));
                self._updateLabel();
            });

            dropDown.addChild(this._dropDown);

            this.dapButton.set('dropDown', dropDown);

            if (this.labelWidth) {
                style.set(
                    query('.dijitButtonText', this.dapButton.domNode)[0],
                    'width',
                    this.labelWidth
                );
            }
        },

        openDropDown: function() {
            this.inherited(arguments);
            this._dropDown.onOpen();
        },

        destroy: function() {
            this.inherited(arguments);
            this._selectionHandler.remove();
        },

        _setSelectionAttr: function(selection) {
            this._set('selection', selection);
            var key, values = [];
            for (key in selection) {
                if (selection.hasOwnProperty(key)) {
                    values.push(this.store.get(key));
                }
            }
            console.log('Set value');
            this.set('value', values);
        },

        _updateLabel: function() {
            if (this.showSelectionCount) {
                var count = 0, key, selection = this.get('selection');
                for (key in selection) {
                    if (selection.hasOwnProperty(key)) {
                        count = count + 1;
                    }
                }
                this.dapButton.set('label', count + ' selected');
            }
        }
    });

});
