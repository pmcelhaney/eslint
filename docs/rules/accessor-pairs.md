# Disallow setters without getters in objects (accessor-pairs)

It's a common mistake in JavaScript to create an object with just setter but never have a getter defined for it.
Here are some examples:

```js
// Bad
var o = {
    set a(value) {
        val = value;
    }
};

// Good
var o = {
    set a(value) {
        val = value;
    },
    get a(value) {
        return val;
    }
};

```

This rule warns if setters are defined without getters. Using an option `getWithNoSet`, it will warn if you have a getter without a setter also.

## Rule Details

This rule enforces a style where it requires to have a getter for every object which has a setter defined. By activating the below option it enforces vice-versa behaviour also.

### Options

`getWithNoSet` set to `true` would also check for getters without setters.

#### Usage

```js
{
    accessor-pairs: [2, {getWithNoSet: true}]
}
```

The following patterns are considered warnings by default:

```js
var o = {
    set a(value) {
        val = value;
    }
};

var o = {d: 1};
Object.defineProperty(o, 'c', {
    set: function(value) {
        val = value;
    }
});
```

The following patterns are not considered warnings by default:

```js
var o = {
    set a(value) {
        val = value;
    },
    get a(value) {
        return val;
    }
};

var o = {d: 1};
Object.defineProperty(o, 'c', {
    set: function(value) {
        val = value;
    },
    get: function(value) {
        return val;
    }
});

```

The following patterns are considered warnings with option `getWithNoSet` set:

```js
var o = {
    set a(value) {
        val = value;
    }
};

var o = {
    get a(value) {
        return val;
    }
};

var o = {d: 1};
Object.defineProperty(o, 'c', {
    set: function(value) {
        val = value;
    }
});

var o = {d: 1};
Object.defineProperty(o, 'c', {
    get: function(value) {
        return val;
    }
});
```

The following patterns are not considered warnings by option `getWithNoSet` set:

```js
var o = {
    set a(value) {
        val = value;
    },
    get a(value) {
        return val;
    }
};

var o = {d: 1};
Object.defineProperty(o, 'c', {
    set: function(value) {
        val = value;
    },
    get: function(value) {
        return val;
    }
});

```

## When Not To Use It

You can turn this rule off if you are not concerned with the presence of setters or getters on objects.

## Further Reading

* [Object Setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
* [Object Getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
* [Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
