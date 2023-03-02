export default class Collection {
    constructor(collection) {
        if (collection !== undefined && !Array.isArray(collection) && typeof collection !== 'object') {
            this.items = [collection];
        } else if (collection instanceof this.constructor) {
            this.items = collection.all();
        } else {
            this.items = collection || [];
        }
    }

    all() {
        return this.items;
    }

    avg() {
        const sum = this.items.reduce((acc, item) => acc + item, 0);
        return sum / this.items.length;
    }

    chunk(size) {
        const chunks = [];
        for (let i = 0; i < this.items.length; i += size) {
            chunks.push(this.items.slice(i, i + size));
        }
        return new Collection(chunks);
    }

    collapse() {
        const flattened = this.items.reduce((acc, item) => acc.concat(item), []);
        return new Collection(flattened);
    }

    combine(values) {
        const combined = {};
        this.items.forEach((key, index) => {
            combined[key] = values[index];
        });
        return new Collection(combined);
    }

    concat(values) {
        const concatenated = this.items.concat(values);
        return new Collection(concatenated);
    }

    contains(value) {
        return this.items.includes(value);
    }

    count() {
        return this.items.length;
    }

    diff(values) {
        const diff = this.items.filter((item) => !values.includes(item));
        return new Collection(diff);
    }

    diffAssoc(values) {
        const diff = {};

        Object.keys(this.items).forEach((key) => {
            if (!(key in values) || values[key] !== this.items[key]) {
                diff[key] = this.items[key];
            }
        });

        Object.keys(values).forEach((key) => {
            if (!(key in this.items)) {
                diff[key] = values[key];
            }
        });

        return new Collection(diff);
    }

    diffKeys(values) {
        const diff = {};

        Object.keys(this.items).forEach((key) => {
            if (!(key in values)) {
                diff[key] = this.items[key];
            }
        });

        return new Collection(diff);
    }

    dump() {
        console.log(this.items);
        return this;
    }

    each(callback) {
        for (const [key, value] of Object.entries(this.items)) {
            callback(value, key);
        }

        return this;
    }

    every(callback) {
        for (const [key, value] of Object.entries(this.items)) {
            if (!callback(value, key)) {
                return false;
            }
        }

        return true;
    }

    except(keys) {
        const filtered = {};
        for (const [key, value] of Object.entries(this.items)) {
            if (!keys.includes(key)) {
                filtered[key] = value;
            }
        }

        return new Collection(filtered);
    }

    filter(callback) {
        const filtered = {};
        for (const [key, value] of Object.entries(this.items)) {
            if (callback(value, key)) {
                filtered[key] = value;
            }
        }

        return new Collection(filtered);
    }

    first(callback) {
        if (callback) {
            for (const [key, value] of Object.entries(this.items)) {
                if (callback(value, key)) {
                    return value;
                }
            }
            return null;
        }
        return this.items[0] || null;
    }

    firstWhere(key, operator, value) {
        const operators = {
            '=': (a, b) => a === b,
            '!=': (a, b) => a !== b,
            '>': (a, b) => a > b,
            '>=': (a, b) => a >= b,
            '<': (a, b) => a < b,
            '<=': (a, b) => a <= b,
        };

        const callback = operators[operator] || ((a, b) => a === b);

        for (const [k, v] of Object.entries(this.items)) {
            if (callback(v[key], value)) {
                return v;
            }
        }

        return null;
    }

    flatMap(callback) {
        const mapped = this.items.map(callback);
        const flattened = Array.prototype.concat(...mapped);
        return new Collection(flattened);
    }

    flatten(depth = Infinity) {
        const flattened = [];

        function flattenRecursive(value, depth) {
            if (depth === 0 || !Array.isArray(value)) {
                flattened.push(value);
                return;
            }

            for (const item of value) {
                flattenRecursive(item, depth - 1);
            }
        }

        flattenRecursive(this.items, depth);
        return new Collection(flattened);
    }

    flip() {
        const flipped = {};
        for (const [key, value] of Object.entries(this.items)) {
            flipped[value] = key;
        }

        return new Collection(flipped);
    }

    forget(key) {
        delete this.items[key];
        return this;
    }

    forPage(page, perPage) {
        const start = (page - 1) * perPage;
        const sliced = Object.entries(this.items).slice(start, start + perPage);
        const paginated = {};

        for (const [key, value] of sliced) {
            paginated[key] = value;
        }

        return new Collection(paginated);
    }

    get(key, defaultValue = null) {
        return this.items.hasOwnProperty(key) ? this.items[key] : defaultValue;
    }

    groupBy(callback) {
        const groups = {};

        for (const [key, value] of Object.entries(this.items)) {
            const groupKey = callback(value, key);
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(value);
        }

        for (const key in groups) {
            groups[key] = new Collection(groups[key]);
        }

        return new Collection(groups);
    }

    has(key) {
        return this.items.hasOwnProperty(key);
    }

    implode(separator, key) {
        let values = Object.values(this.items);
        if (key) {
            values = values.map((item) => item[key]);
        }

        return values.join(separator);
    }

    intersect(values) {
        const intersected = {};

        for (const key in this.items) {
            if (key in values && this.items[key] === values[key]) {
                intersected[key] = this.items[key];
            }
        }

        return new Collection(intersected);
    }

    isEmpty() {
        return Object.keys(this.items).length === 0;
    }

    isNotEmpty() {
        return !this.isEmpty();
    }

    keyBy(key) {
        const keyed = {};

        for (const item of Object.values(this.items)) {
            keyed[item[key]] = item;
        }

        return new Collection(keyed);
    }

    keys() {
        return new Collection(Object.keys(this.items));
    }

    last() {
        return this.items[Object.keys(this.items).pop()];
    }

    map(callback) {
        const mappedItems = this.items.map(callback);
        return new Collection(mappedItems);
    }

    mapWithKeys(callback) {
        let keys = Object.keys(this.items);
        let result = {};

        keys.forEach(key => {
            let [newKey, value] = callback(this.items[key], key);
            result[newKey] = value;
        });

        return new Collection(result);
    }

    max(key) {
        const values = Object.values(this.items);
        if (values.length === 0) {
            return null;
        }

        if (key) {
            return Math.max(...values.map((item) => item[key]));
        }

        return Math.max(...values);
    }

    median(key) {
        const values = Object.values(this.items);
        if (values.length === 0) {
            return null;
        }

        if (key) {
            values.sort((a, b) => a[key] - b[key]);
        } else {
            values.sort((a, b) => a - b);
        }

        const middle = Math.floor(values.length / 2);

        if (values.length % 2 === 0) {
            return (values[middle - 1] + values[middle]) / 2;
        }

        return values[middle];
    }

    merge(values) {
        return new Collection({...this.items, ...values});
    }

    mergeRecursive(values) {
        const merge = (target, source) => {
            Object.keys(source).forEach((key) => {
                const sourceValue = source[key];
                const targetValue = target[key];

                if (typeof sourceValue === 'object' && sourceValue !== null) {
                    if (typeof targetValue === 'object' && targetValue !== null) {
                        merge(targetValue, sourceValue);
                    } else {
                        target[key] = sourceValue;
                    }
                } else {
                    target[key] = sourceValue;
                }
            });
        };

        merge(this.items, values);
        return new Collection(this.items);
    }

    min(key) {
        const values = Object.values(this.items);
        if (values.length === 0) {
            return null;
        }

        if (key) {
            return Math.min(...values.map((item) => item[key]));
        }

        return Math.min(...values);
    }

    mode(key) {
        const values = Object.values(this.items);
        if (values.length === 0) {
            return null;
        }

        const frequencies = {};

        for (const item of values) {
            const value = key ? item[key] : item;
            frequencies[value] = (frequencies[value] || 0) + 1;
        }

        const modes = [];
        let maxFrequency = 0;

        for (const [value, frequency] of Object.entries(frequencies)) {
            if (frequency > maxFrequency) {
                modes.length = 0;
                modes.push(value);
                maxFrequency = frequency;
            } else if (frequency === maxFrequency) {
                modes.push(value);
            }
        }

        if (modes.length === 1) {
            return modes[0];
        }

        return modes;
    }

    nth(n, offset = 0) {
        const values = Object.values(this.items);
        if (values.length === 0) {
            return null;
        }

        return values[n + offset] ?? null;
    }

    only(keys) {
        const filtered = {};

        for (const key of keys) {
            if (key in this.items) {
                filtered[key] = this.items[key];
            }
        }

        return new Collection(filtered);
    }

    pad(length, value) {
        const count = Math.max(0, length - Object.keys(this.items).length);
        const padded = {...this.items};

        for (let i = 0; i < count; i++) {
            const key = i + Object.keys(this.items).length;
            padded[key] = value;
        }

        return new Collection(padded);
    }

    partition(callback) {
        const partitions = [[], []];

        for (const [key, value] of Object.entries(this.items)) {
            if (callback(value, key)) {
                partitions[0].push(value);
            } else {
                partitions[1].push(value);
            }
        }

        return new Collection(partitions);
    }

    pipe(callbacks) {
        return callbacks.reduce((collection, callback) => callback(collection), this);
    }

    pluck(key) {
        return new Collection(Object.values(this.items).map((item) => item[key]));
    }

    pop() {
        const items = {...this.items};
        const keys = Object.keys(items);
        const lastKey = keys[keys.length - 1];

        delete items[lastKey];
        return [items[lastKey], new Collection(items)];
    }

    prepend(value, key = null) {
        const items = {...this.items};
        const keys = Object.keys(items);

        if (key !== null) {
            items[key] = value;
        } else if (keys.length === 0) {
            items[0] = value;
        } else {
            const lastKey = keys[keys.length - 1];
            const newKey = parseInt(lastKey, 10) + 1;
            items[newKey] = value;
        }

        return new Collection(items);
    }

    pull(key) {
        const items = {...this.items};
        const value = items[key];
        delete items[key];

        return [value, new Collection(items)];
    }

    push(value, key = null) {
        const items = {...this.items};
        const keys = Object.keys(items);

        if (key !== null) {
            items[key] = value;
        } else if (keys.length === 0) {
            items[0] = value;
        } else {
            const lastKey = keys[keys.length - 1];
            const newKey = parseInt(lastKey, 10) + 1;
            items[newKey] = value;
        }

        return new Collection(items);
    }

    random(keys = null) {
        const items = Object.values(this.items);
        const index = Math.floor(Math.random() * items.length);

        if (keys !== null) {
            return keys.reduce((result, key) => {
                result[key] = items[index][key];
                return result;
            }, {});
        }

        return items[index];
    }

    reduce(callback, initial = null) {
        const values = Object.values(this.items);
        let accumulator = initial !== null ? initial : values.shift();

        for (const value of values) {
            accumulator = callback(accumulator, value);
        }

        return accumulator;
    }

    reject(callback) {
        const filtered = {};

        for (const [key, value] of Object.entries(this.items)) {
            if (!callback(value, key)) {
                filtered[key] = value;
            }
        }

        return new Collection(filtered);
    }

    reverse() {
        const items = Object.values(this.items).reverse();
        return new Collection(items);
    }

    search(value, strict = false) {
        const items = Object.values(this.items);
        const index = items.findIndex((item) => (strict ? item === value : item == value));

        return index !== -1 ? index : null;
    }

    shift() {
        const items = {...this.items};
        const firstKey = Object.keys(items)[0];

        delete items[firstKey];
        return [this.items[firstKey], new Collection(items)];
    }

    shuffle() {
        const items = Object.values(this.items);

        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        const shuffled = {};
        items.forEach((item, index) => {
            shuffled[index] = item;
        });

        return new Collection(shuffled);
    }

    slice(start, length = null) {
        const items = {...this.items};
        const keys = Object.keys(items);

        if (start < 0) {
            start = Math.max(0, keys.length + start);
        }

        if (length === null) {
            length = keys.length - start;
        }

        const sliced = {};
        keys.slice(start, start + length).forEach((key, index) => {
            sliced[index] = items[key];
        });

        return new Collection(sliced);
    }

    sort(callback = null) {
        const items = Object.values(this.items);
        let sorted = null;

        if (callback === null) {
            sorted = items.sort();
        } else {
            sorted = items.sort(callback);
        }

        const result = {};
        sorted.forEach((item, index) => {
            result[index] = item;
        });

        return new Collection(result);
    }

    sortBy(key, options = null) {
        const items = Object.values(this.items);
        const sorted = items.sort((a, b) => {
            if (options !== null && options.natural === true) {
                a = a[key].toLowerCase();
                b = b[key].toLowerCase();
            }

            if (a[key] < b[key]) {
                return -1;
            }

            if (a[key] > b[key]) {
                return 1;
            }

            return 0;
        });

        const result = {};
        sorted.forEach((item, index) => {
            result[index] = item;
        });

        return new Collection(result);
    }

    splice(index, length = 1, replacement = null) {
        const items = {...this.items};
        const keys = Object.keys(items);

        if (index < 0) {
            index = Math.max(0, keys.length + index);
        }

        const removed = {};
        keys.slice(index, index + length).forEach((key, i) => {
            removed[i] = items[key];
            delete items[key];
        });

        if (replacement !== null) {
            if (typeof replacement === 'function') {
                replacement = replacement(new Collection(removed)).all();
            }

            let position = index;
            for (const [key, value] of Object.entries(replacement)) {
                items[position] = value;
                position++;
            }
        }

        return [new Collection(removed), new Collection(items)];
    }

    sum(key = null) {
        const items = Object.values(this.items);

        if (key !== null) {
            return items.reduce((accumulator, item) => accumulator + item[key], 0);
        }

        return items.reduce((accumulator, item) => accumulator + item, 0);
    }

    take(length) {
        const items = {...this.items};

        if (length < 0) {
            length = 0;
        }

        const taken = {};
        let index = 0;
        for (const [key, value] of Object.entries(items)) {
            if (index >= length) {
                break;
            }

            taken[key] = value;
            index++;
        }

        return new Collection(taken);
    }

    tap(callback) {
        callback(new Collection(this.items));
        return this;
    }

    toArray() {
        return Object.values(this.items);
    }

    toJson() {
        return JSON.stringify(this.items);
    }

    transform(callback, initial = null) {
        const items = {...this.items};
        let result = initial;

        for (const [key, value] of Object.entries(items)) {
            result = callback(result, value, key);
        }

        return result;
    }

    unique(key = null) {
        const items = {...this.items};
        const unique = {};
        const uniqueValues = [];

        for (const [key, value] of Object.entries(items)) {
            let compareValue = value;
            if (key !== null && typeof value === 'object' && value.hasOwnProperty(key)) {
                compareValue = value[key];
            }

            if (!uniqueValues.includes(compareValue)) {
                unique[key] = value;
                uniqueValues.push(compareValue);
            }
        }

        return new Collection(unique);
    }

    values() {
        return new Collection(Object.values(this.items));
    }

    when(condition, callback) {
        if (condition) {
            return callback(new Collection(this.items));
        }

        return this;
    }

    where(key, operator, value = null) {
        const items = {...this.items};
        let filtered = {};

        if (value === null) {
            filtered = Object.entries(items).filter(([, item]) => item === operator);
        } else {
            filtered = Object.entries(items).filter(([, item]) => {
                switch (operator) {
                    case '=':
                        return item[key] === value;
                    case '<':
                        return item[key] < value;
                    case '<=':
                        return item[key] <= value;
                    case '>':
                        return item[key] > value;
                    case '>=':
                        return item[key] >= value;
                    case '!=':
                        return item[key] !== value;
                    default:
                        return false;
                }
            });
        }

        const result = {};
        filtered.forEach(([index, value]) => {
            result[index] = value;
        });

        return new Collection(result);
    }

    zip(...collections) {
        const zipped = {};

        for (const [key, value] of Object.entries(this.items)) {
            const items = [value];
            collections.forEach((collection) => {
                items.push(collection.get(key, null));
            });

            zipped[key] = items;
        }

        return new Collection(zipped);
    }
}
