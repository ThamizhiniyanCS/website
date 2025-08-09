export const handleMobileNavTriggerOnClick = () => {
  const navMobile: HTMLElement | null =
    document.getElementById("nav-menu-mobile");
  const trigger: HTMLElement | null =
    document.getElementById("nav-mobile-trigger");

  // The `if` block not only prevents errors but also acts as a type guard.
  // Inside this block, TypeScript knows that `navMobile` and `trigger` are HTMLElements, not null.
  if (navMobile && trigger) {
    // Find all focusable elements within the mobile navigation
    const focusableElements: NodeListOf<HTMLElement> =
      navMobile.querySelectorAll(
        "a[href], button:not([disabled]), textarea, input, select",
      );
    const firstFocusableElement: HTMLElement | undefined = focusableElements[0];
    const lastFocusableElement: HTMLElement | undefined =
      focusableElements[focusableElements.length - 1];

    // --- Core Functions ---

    const openMenu = (): void => {
      navMobile.setAttribute("data-state", "open");
      // Let screen readers know the menu is expanded
      trigger.setAttribute("aria-expanded", "true");
      trigger.setAttribute("aria-label", "Close navigation menu");
      // Make the navigation visible to screen readers
      navMobile.setAttribute("aria-hidden", "false");

      // Move focus to the first item in the menu
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    };

    const closeMenu = (): void => {
      navMobile.setAttribute("data-state", "closed");
      // Let screen readers know the menu is collapsed
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-label", "Open navigation menu");
      // Hide the navigation from screen readers
      navMobile.setAttribute("aria-hidden", "true");

      // Return focus to the trigger button
      trigger.focus();
    };

    // --- Event Listeners ---

    // Toggle menu on trigger click
    trigger.addEventListener("click", (): void => {
      const currentState = navMobile.getAttribute("data-state");
      if (currentState === "open") {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking outside of it
    const clickOutsideListener = (event: MouseEvent | TouchEvent): void => {
      // We use a type assertion `as Node` because `event.target` is of a broad `EventTarget` type.
      if (
        trigger.contains(event.target as Node) ||
        navMobile.contains(event.target as Node)
      ) {
        return;
      }
      if (navMobile.getAttribute("data-state") === "open") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", clickOutsideListener);
    document.addEventListener("touchstart", clickOutsideListener);

    // Close menu on "Escape" key press
    document.addEventListener("keydown", (event: KeyboardEvent): void => {
      if (
        event.key === "Escape" &&
        navMobile.getAttribute("data-state") === "open"
      ) {
        closeMenu();
      }
    });

    // Optional: Add a focus trap for advanced accessibility
    // This keeps the user from tabbing outside the menu when it's open
    navMobile.addEventListener("keydown", (event: KeyboardEvent): void => {
      if (event.key !== "Tab") {
        return;
      }

      // If shift + tab is pressed on the first element, move focus to the last
      if (event.shiftKey) {
        if (
          document.activeElement === firstFocusableElement &&
          lastFocusableElement
        ) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
        // If tab is pressed on the last element, move focus to the first
      } else {
        if (
          document.activeElement === lastFocusableElement &&
          firstFocusableElement
        ) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    });
  }
};
