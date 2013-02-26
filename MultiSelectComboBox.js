define([
    "dojo/_base/declare",
    "dojo/on",
    "dojo/aspect",
    "dojo/query",
    "dojo/dom-style",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/MultiSelectComboBox.html",
    "./MultiSelectDropDown",
    "dijit/DropDownMenu",

    "dijit/form/ComboButton"
], function (declare, on, aspect, query, style, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template, MultiSelectDropDown,
    DropDownMenu) {

    return declare("bc-multiselect-combo.MultiSelectComboBox", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin], {

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
        emptyLabel: "0 selected",
        singularValueLabel: null,
        pluralValueLabel: null,
        showClearAllButton: true,
        showSelectionCount: true,
        onChange: null,

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
                    self._dropDown.onClose();
                }
            });

            this._dropDown.watch('selection', function(){
                self.set('selection', JSON.parse(JSON.stringify(self._dropDown.get('selection'))));
                self._updateLabel();
            });

            dropDown.addChild(this._dropDown);

            this.dapButton.set('dropDown', dropDown);

            aspect.after(this.dapButton, 'closeDropDown', function(){
                self._dropDown.onClose();
                if (self.showApplyButton) {
                    // set the selection on the grid to the one last applied by the 'Apply' button in case
                    // the user closed without applying.
                    var s = self.get('selection');
                    if (s) {
                        s = JSON.parse(JSON.stringify(s)); // make a copy
                    } else {
                        s = {};
                    }
                    self._dropDown.setSelection(s);
                }
            });

            aspect.after(this.dapButton, 'openDropDown', function(){
                self._dropDown.onOpen();
            });

            if (this.labelWidth) {
                style.set(
                    query('.dijitButtonText', this.dapButton.domNode)[0],
                    'width',
                    this.labelWidth
                );
            }
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
            this.set('value', values);
            if (this.onChange) {
                this.onChange(values);
            }
        },

        _updateLabel: function() {
            var label;
            if (this.showSelectionCount) {
                var count = 0, key, selection = this.get('selection');
                for (key in selection) {
                    if (selection.hasOwnProperty(key)) {
                        count = count + 1;
                    }
                }
                if (count > 0) {
                    label = '' + count;
                    if (count === 1 && this.singularValueLabel) {
                        label = label + ' ' + this.singularValueLabel;
                    }
                    else if (count > 1 && this.pluralValueLabel) {
                        label = label + ' ' + this.pluralValueLabel;
                    }
                    label = label + ' selected';
                }
                else {
                    label = this.emptyLabel;
                }
                this.dapButton.set('label', label);
            }
        }
    });

});
