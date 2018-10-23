function highlight(sel) {
    let selector = $(sel);
    let maxDepth = 0;
    let maxDepthElement = selector;

    findDeepest(maxDepth, selector);

    maxDepthElement.addClass('highlight');
    maxDepthElement.parents().addClass('highlight');
    selector.parents().removeClass('highlight');

    function findDeepest(depth, element) {
        if (depth > maxDepth) {
            maxDepth = depth;
            maxDepthElement = $(element);
        }

        $(element)
            .children()
            .each((index, el) => findDeepest(depth + 1, el));
    }
}