# Match Two

This match-two memory game is a simple web-page application coded primarily with JavaScript, followed by CSS and HTML. This was a rather quick and easy project which I completed within a few hours. I've attempted this same JavaScript app before, and I failed to some extent for some reason or another. 

### Issue

There is one logic error which confuses me. In the CSS, the 'background-color' property of the circle class is set to 'white' whenever the user hovers their cursor over the div element:

```css
.circle:hover {
    background-color: white;
}
```

This property is expressed however, when one of the circles is clicked, this property is removed for some reason or another. In my previous attempt at this project, this component worked completely fine...
