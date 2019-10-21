# Pagiator
JavaScript Library - Create custom able Pagination

> ##### Author: Lmint - CyberSkill.tech

## Usage

**Include** the file to your project, place it before the .js file which use this library!

**Create** new Pagination Object

```
var Pagination = new Pg(your_total_page);
```

Then **choose** the current page for Pagination

```
Pagination.choose(current_page);
```

### Render your result

Your can render HTML to your special css _**selector**_ (like $ Selector of Jquery)

```
Pagination.HTMLRender('.classname');
Pagination.HTMLRender('#ElementId');
Pagination.HTMLRender('tagname');
Pagination.HTMLRender('tagname .classname');
...
```

#### OR

You can render an Array of result then .map it to render in other way like **React, Vue...**

```
Pagination.ArrayRender(); // Return an Array of Pages
```

## Recommended Usage - Chain your code

You will be able to write the chain code like this:

```
var Pagination = new Pg(30);
Pagination.setup(_options_).choose(current_page).HTMLRender(_selector_);
```
  
###### OR Array Render
  
```
Pagination.setup(_options_).choose(current_page).ArrayRender().map(...);
```

###### OR use default configuation (without setup)

```
Pagination.choose(current_page).HTMLRender(_selector_);
Pagination.choose(current_page).ArrayRender().map(...);
```

## Configuations

```
var options = {
  baseUrl: '/index',

  HTMLClasses: {
    container: 'pagination',
    page: 'page',
    currentPage: 'page choosing',
    direction: 'direction'
  },

  textContent: {
    leftDirection: '<<',
    rightDirection: '>>'
  }
};

Pagination.setup(options)
```

- **baseUrl**: Url you want to use as root url in your pagination buttons
- **HTMLClasses**: Change your CSS class of your Pagination elements
- **textContent**: Change text content of directions "<" and ">" button
