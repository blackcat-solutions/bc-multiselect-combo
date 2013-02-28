bc-multiselect-combo
=======================

This component is designed to allow multiple selection from large data sets, and uses a regular dijit ComboButton combined with a custom popup that uses a dgrid for easy filtering.

See [the test page](http://blackcatsolutions.co.uk/bc-components/bc-multiselect-combo/test/TestMultiSelectComboBox.html) for examples of how it can be configured for different use cases.

Features:
* Filter within large data sets to easily find the entries you want;
* Choose whether to have selections applied immediately, or whether to wait for the user to click an 'Apply' button in the case that expensive operations are performed on change of selection;
* Simple 'Clear all' option;
* Presentation options including whether you want selection counts, and optionally nouns with those selection counts.

Usage
=====
Look at the test page for example instantiation.  Please note that due to what is no doubt my lack of deep knowledge about
how to do drop down menus in dojo, it is vital that if you are showing the filter field, you call startup on the widget after it has been placed in the DOM.
This is so that we can force the text field to have the correct width for the drop down.  If you don't, it will be too wide.

Example:

```javascript
w2 = new MultiSelectComboBox({
  id: 'select2',
  displayAttr: 'name',
  labelWidth: '10em',
  showApplyButton: true,
  showFilterField: true,
  store: store,
  onChange: function (value) {
    dom.byId('selection-output2').innerHTML = JSON.stringify(value);
  }
}).placeAt(dom.byId('placeholder2'));
w2.startup();
```

Limitations
===========
This component is currently only suitable for local stores, as there is no processing for a suitable delay before re-querying the store, it is done on each keypress.
This means that if you were to use a remote store such as a JsonRest you would re-query the server on each key press, which is unlikely
to be acceptable.

The component does not support external setting of the selection - selection is currently entirely self-contained.
