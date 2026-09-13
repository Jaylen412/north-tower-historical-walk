// Converts a standard-mapped controller into repeatable menu actions.
export function createMenuInput() {
  const held = { vertical: { direction: 0, next: 0 }, horizontal: { direction: 0, next: 0 } };
  return {
    reset() { for (const state of Object.values(held)) { state.direction = 0; state.next = 0; } },
    sample(buttons, axes, now) {
      const axis = value => Math.abs(value || 0) > .55 ? Math.sign(value) : 0;
      const vertical = buttons[13] ? 1 : buttons[12] ? -1 : axis(axes[1]);
      const horizontal = buttons[15] ? 1 : buttons[14] ? -1 : axis(axes[0]);
      const result = { vertical: 0, horizontal: 0, scroll: Math.abs(axes[3] || 0) > .18 ? axes[3] : 0 };
      for (const key of ['vertical', 'horizontal']) {
        const direction = key === 'vertical' ? vertical : horizontal;
        const state = held[key];
        if (!direction) { state.direction = 0; continue; }
        if (direction !== state.direction) {
          result[key] = direction; state.direction = direction; state.next = now + 360;
        } else if (now >= state.next) {
          result[key] = direction; state.next = now + 140;
        }
      }
      return result;
    }
  };
}
