function mouseEnter(event) {
    const offsetWidth = event.target.offsetWidth;
    const scrollWidth = event.target.scrollWidth;
    return offsetWidth < scrollWidth;
}
export {mouseEnter}; 