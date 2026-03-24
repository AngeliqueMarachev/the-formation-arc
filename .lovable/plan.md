

## Plan: Hide placeholder text on focus

Standard HTML placeholders only disappear when the user starts typing. To make them disappear on focus, we need to add CSS that targets the `:focus::placeholder` pseudo-element.

### Change

**File: `src/index.css`** — Add a rule to hide placeholders on focus:

```css
input:focus::placeholder,
textarea:focus::placeholder {
  opacity: 0;
  transition: opacity 0.15s ease;
}
```

This will also add `transition: opacity 0.15s ease` to the existing `input::placeholder, textarea::placeholder` rule for a smooth fade-out effect.

Single file, two lines added. Applies globally to all input and textarea fields.

