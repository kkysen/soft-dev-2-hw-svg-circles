Element.prototype.clearHTML = function() {
    this.innerHTML = "";
};

Element.prototype.setAttributes = function(attributes) {
    for (const attribute in attributes) {
        if (attributes.hasOwnProperty(attribute) && attributes[attribute]) {
            this.setAttribute(attribute, attributes[attribute].toString());
        }
    }
};

const div = document.body.appendChild(document.createElement("div"));

const svgCreate = document.createElementNS.bind(document, "http://www.w3.org/2000/svg");

const addProperty = function(obj, attr) {
    Object.defineProperty(obj, attr, {
        get: function() {
            return this.getAttribute(attr);
        },
        set: function(value) {
            this.setAttribute(attr, value);
        },
    });
}

const svg = div.appendChild(svgCreate("svg"));
addProperty(svg, "width");
addProperty(svg, "height");
svg.width = 600;
svg.height = 600;
svg.style.border = "1px solid black";

const button = div.appendChild(document.createElement("button"));
button.innerText = "Clear";
button.addEventListener("click", function(e) {
    e.preventDefault();
    svg.clearHTML();
});

const RADIUS = 50;
const COLOR_1 = "red";
const COLOR_2 = "blue";

const addCircleAt = function(x, y) {
    const circle = svg.appendChild(svgCreate("circle"));
    circle.setAttributes({
        cx: x,
        cy: y,
        r: RADIUS,
        fill: COLOR_1,
        stroke: COLOR_1,
    });
    let numClicks = 0;
    circle.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        numClicks++;
        if (numClicks === 1) {
            circle.setAttributes({
                fill: COLOR_2,
                stroke: COLOR_2,
            });
        } else if (numClicks === 2) {
            circle.remove();
            addCircleAt(Math.random() * svg.width, Math.random() * svg.height);
        }
    });
}

svg.addEventListener("click", function(e) {
    e.preventDefault();
    addCircleAt(e.offsetX, e.offsetY);
});
