bc-multiselect-combo
=======================

This component is designed to allow multiple selection from large data sets, and uses a regular dijit ComboButton combined with a custom popup that uses a dgrid for easy filtering.

See [the test page](http://blackcatsolutions.co.uk/bc-components/bc-multiselect-combo/test/TestMultiSelectComboBox.html) for examples of how it can be configured for different use cases.

Features:
* Filter within large data sets to easily find the entries you want;
* Choose whether to have selections applied immediately, or whether to wait for the user to click an 'Apply' button in the case that expensive operations are performed on change of selection;
* Simple 'Clear all' option;
* Presentation options including whether you want selection counts, and optionally nouns with those selection counts.

Limitations
===========
This component is currently only suitable for local stores, as there is no processing for a suitable delay before re-querying the store, it is done on each keypress.
This means that if you were to use a remote store such as a JsonRest you would re-query the server on each key press, which is unlikely
to be acceptable.

The component does not support external setting of the selection - selection is currently entirely self-contained.
