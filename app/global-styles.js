import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    // font-family: 'Roboto', sans-serif;
    font-family: 'Metropolis', sans-serif;
                                                
  }

  body.fontLoaded {
    // font-family: 'Roboto', sans-serif;
    font-family: 'Metropolis', sans-serif;
  }

  #app {
    background-color: #fafafa;
    height: 100%;
    min-width: 100%;
  }

  p,
  label {
    // font-family: 'Roboto', sans-serif;
    font-family: 'Metropolis', sans-serif;
    line-height: 1.5em;
  }


  .rs-btn-green {
    background-color: #32C5F4 !important;
  }

  .custom-input-number {
    input {
      text-align: center;
    }
  
    .rs-input-number-btn-group-vertical {
      display: none;
    }
  }

  .react-tel-input input[type='tel']{
    border:none;
    background:transparent;
    padding-left:30px
  }
 
`;

export default GlobalStyle;
