# This element have not css styles by .class or #id

#### Basic styles use DATA-attributes

#### Use base

```html
<ul data-acc>
    <li data-acc-item>
        <button data-acc-title type="button" name="open accordion">
            <h2>Accordion Title</h2>
        </button>
        <div data-acc-content>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde, ex rem voluptates autem aliquid veniam quis temporibus!</p>

            <p>Facilis ducimus iure officia quos possimus quaerat iusto, quas, laboriosam sapiente autem ab consequuntur? Nihil, soluta.</p>
            <p><a title="Accessibility using aria-details" href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-details" target="blank">The 'aria-details' and 'role' attributes have been implemented to ensure accessibility.</a></p>
        </div>
    </li>
</ul>
```

#### Can be Open just One Accordion Item

```html
<ul data-acc data-open-one></ul>
```

#### Always open One Accordion Item

```html
<ul data-acc data-one-always-open></ul>
```

#### Open Accordion Item

```html
<li data-acc-item data-open-acc></li>
```

## You can change all Tags. You can wrap accordion items and Accordions steal works, because JS use Event Delegation
