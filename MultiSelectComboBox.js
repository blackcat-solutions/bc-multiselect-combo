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
    "dojo/dom-geometry",

    "dijit/form/ComboButton"
], function (declare, on, aspect, query, style, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template, MultiSelectDropDown, DropDownMenu, geom) {

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
        // showFieldField: Boolean
        //        Whether to show a filter field that allows the user to perform type-ahead filtering of the entries.
        showFilterField: false,
        // emptyLabel: {string}
        //        The label to show when no entries are selected.
        emptyLabel: "0 selected",
        // singularValueLabel: {string}
        //        The singular noun to go in to the selection count string when showing selection counts.
        singularValueLabel: null,
        // pluralValueLabel: {string}
        //        The plural noun to go in to the selection count string when showing selection counts.
        pluralValueLabel: null,
        // showClearAllButton: Boolean
        //        Whether to show a button that clears all selections.
        showClearAllButton: true,
        // clearAllButtonLabel: {string}
        //        The label to show in the clear all button.  There are use cases where it might be more logical
        //        to show text such as "Select all".
        clearAllButtonLabel: "Clear all",
        // showSelectionCount: Boolean
        //        Whether to show a selection count in the main button text.
        showSelectionCount: true,
        // onChange: Function
        //        A function to be called when the selected values change.
        onChange: null,
        // labelWidth: {string}
        //        A CSS width value for the label part of the combo button.
        labelWidth: null,

        templateString: template,
        dapButton: null,

        _dropDown: null,
        _selectionHandler: null,

        postCreate: function () {

            var dropDown = new DropDownMenu(),
                self = this;

            this._dropDown = new MultiSelectDropDown({
                store: this.store,
                displayAttr: this.displayAttr,
                showFilterField: this.showFilterField,
                showApplyButton: this.showApplyButton,
                showClearAllButton: this.showClearAllButton,
                clearAllButtonLabel: this.clearAllButtonLabel,
                onApply: function () {
                    self.dapButton.closeDropDown();
                    self._dropDown.onClose();
                }
            });

            this._dropDown.watch('selection', function () {
                self._internalSetSelection = true;
                self.set('selection', JSON.parse(JSON.stringify(self._dropDown.get('selection'))));
                self._internalSetSelection = true;
            });

            dropDown.addChild(this._dropDown);

            this.dapButton.set('dropDown', dropDown);

            aspect.after(this.dapButton, 'closeDropDown', function () {
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

            aspect.after(this.dapButton, 'openDropDown', function () {
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

        startup: function () {
            this.inherited(arguments);
            // TODO - I know this is wrong, just a little tired at this stage - someone please tell me how to handle this properly.
            this._dropDown.setWidth(geom.getContentBox(this.dapButton.domNode).w - 4);
        },

        destroy: function () {
            this.inherited(arguments);
            this._selectionHandler.remove();
        },

        _setSelectionAttr: function (selection) {
            this._set('selection', selection);
            var key, values = [];
            for (key in selection) {
                if (selection.hasOwnProperty(key)) {
                    values.push(key);
                }
            }
            if (this._dropDown && !this._internalSetSelection) {
                this._dropDown.setSelection(selection);
            }
            self._updateLabel();
            this.set('value', values);
            if (this.onChange) {
                this.onChange(values);
            }
        },

        _setStoreAttr: function (store) {
            if (this._dropDown) {
                this._dropDown.set('store', store);
            }
            else {
                this.store = store;
            }
        },

        _updateLabel: function () {
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
