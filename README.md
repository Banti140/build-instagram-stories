### Design Choices for Instagram Stories Feature

#### Performance Optimizations

* **Efficient Rendering**

  * Utilized functional components with React hooks to minimize unnecessary re-renders.
  * Implemented `useRef` to hold timer references, preventing recreation on every render.
  * Separated components (`StoryList`, `StoryModal`, `StoryViewer`) to ensure only the necessary parts of the UI re-render.

* **Image Loading Strategy**

  * Images are loaded only when required — story images are not fetched until the modal is opened.
  * Applied proper image sizing with `object-fit` in CSS to prevent layout shifts.
  * Avatar images are kept small (60px) to reduce initial load time.

* **Animation and Transitions**

  * Used CSS transitions for the progress bars, avoiding the need for JavaScript-based animations.
  * Implemented lightweight fade-in animations that don’t block the main thread.
  * Limited animations to essential UI elements, ensuring smooth performance.

* **Timer Implementation**

  * Used `setInterval` with small increments (100ms) for smooth progress updates.
  * Ensured intervals are cleared upon component unmount to prevent memory leaks.
  * Implemented pause and resume functionality, allowing users to interact with the story.

#### Scalability Considerations

* **Data Architecture**

  * Clean separation between data fetching (`storyService`) and UI components.
  * Utilized TypeScript interfaces for type safety, making it easier to scale as the app grows.
  * Structured the data model to easily incorporate additional features (e.g., story reactions).

* **Component Structure**

  * Designed with a modular approach, ensuring single-responsibility components.
  * Props are clearly defined, enabling straightforward future extensions.
  * Navigation logic is isolated, facilitating easy updates for more complex interactions.

* **State Management**

  * Used local component state for UI-specific concerns.
  * Centralized story data management in the parent `StoryViewer` component.
  * Structured for easy integration with global state management if needed in the future.

#### Testing Strategy

* Implemented **End-to-End (E2E) tests** to verify core functionality.
* Added `data-testid` attributes to ensure reliable test selectors.
* Tests cover both main user flows and edge cases to ensure robustness.

#### Mobile Optimization

* Designed with a **mobile-first** approach, using appropriate touch event handlers.
* Utilized viewport units and flexible layouts that adapt to various screen sizes.
* Hid scrollbars for a cleaner mobile experience.
* Integrated both touch and click handlers to optimize mobile interaction.

This implementation successfully balances **performance** with **maintainability**, ensuring a seamless user experience while remaining flexible for future feature additions, even with a large number of stories.
