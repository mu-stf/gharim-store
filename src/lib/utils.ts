/**
 * Scrolls to a section with a delay
 * @param id - The element ID to scroll to
 * @param delay - Delay in milliseconds before scrolling
 */
export function scrollToSection(id: string, delay: number) {
    setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, delay);
}

/**
 * Scrolls to the top of the page
 */
export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Checks if an element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
