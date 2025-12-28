"use client";

import { RefObject, useEffect, useState } from "react";

type AnyEvent = MouseEvent | TouchEvent;

/**
 * A custom React hook that triggers a callback when a click or touch occurs
 * outside of the referenced element.
 *
 * @param ref - A React ref object pointing to the element to monitor.
 * The ref's type allows for it to be null, which is typical for refs
 * initialized with `useRef(null)`.
 * @param handler - The callback function to execute on an outside interaction.
 */
export function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: AnyEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      // Get the element from the ref
      const el = ref.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
    // We've removed the generic <T> so the dependency array is simpler
  }, [ref, handler]);
}

export function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id);

        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
}
