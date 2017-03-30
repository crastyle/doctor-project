<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
body {
  background: #f5f5f5;
}

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html{
    -webkit-text-size-adjust: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    max-width: 640px;
    margin: 0 auto;
  }
  body{
    
    color:#666;
    font-family: "Helvetica Neue",Helvetica,STHeiTi,sans-serif;
    line-height: 1.6;
    -webkit-user-select: none;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }
  body, html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  body, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article,
  aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    -webkit-tap-highlight-color: transparent;font-family: "Helvetica Neue",Helvetica,STHeiTi,sans-serif;}

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block; }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    width: auto\9;
    -ms-interpolation-mode: bicubic; }

  body, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article,
  aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    border: none; }

  input[type="submit"],

  input[type="reset"],

  input[type="button"],

  input{resize: none;}

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
  }
  input::-webkit-calendar-picker-indicator{
    display:none;
    -webkit-appearance:none;
  }
  input[type="button"]{
    -webkit-appearance: none;
  }

  input[type="submit"], input[type="reset"] {
    -webkit-appearance: none;
  }

  em, i {
    font-style: normal; }

  strong {
    font-weight: normal; }

  .clearfix:after {
    content: "";
    display: block;
    visibility: hidden;
    height: 0;
    clear: both; }

  .clearfix {
    zoom: 1; }

  a {
    text-decoration: none;
    color: #969696;
  }

  a:hover {
    color: #979797;
    text-decoration: none; }

  ul, ol {
    list-style: none; }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;  }

  textarea{
    resize: none;
    overflow: auto;
  }
  table{
    border-collapse: collapse;
  }
  a,button,input,textarea,select{
    background: none;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
    outline: none;
  }
  .section-button {
    padding: 0 16px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #f2f2f2;
    color: #666;
    height: 100%;
  }
</style>
