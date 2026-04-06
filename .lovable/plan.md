

## Auto-resize Textarea

Modify `src/components/ui/textarea.tsx` to auto-grow with content so the full text is always visible without internal scrolling.

### Implementation

Add an `onInput` handler (alongside the existing `onFocus`/`onBlur`) that resets `height` to `auto` then sets it to `scrollHeight`. Also set `overflow: hidden` to prevent the scrollbar from flashing. Apply the same logic on mount via a `useEffect` so pre-filled values also expand the textarea. The `min-h-[80px]` class stays as the minimum size.

Key details:
- Use a combined ref (merge forwarded `ref` with an internal `useRef`) to access the DOM node
- On every input event and on mount: `el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'`
- Add `overflow: hidden` to the inline styles
- No changes to padding, margin, or surrounding layout

