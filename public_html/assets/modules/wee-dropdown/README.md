# [Dropdown 1.0.0](https://github.com/weepower/wee)

Wee Module for creating dropdown menus.

## Quick Start

This module is made for [Wee](http://www.weepower.com) and assumes you are already up and running with it.

To use this module, simply drop the entire dropdown directory in Wee's `"modules"` directory and include `dropdown:init` in your route for any of your pages that have dropdown menus or call `Wee.dropdown.init()` on demand.

## Markup

```html
<select class="wee-dropdown" data-ref="weeDropdown" data-name="my-name">
	<option value="1">Option 1</option>
	<option value="2">Option 2</option>
	<option value="3">Option 3</option>
	<option value="4">Option 4</option>
	<option value="5">Option 5</option>
</select>
```

## License

Copyright 2014 [Caddis Interactive, LLC](http://www.caddis.co)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.