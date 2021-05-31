export const BASE_STYLE = `
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .align-end {
    align-items: flex-end;
  }
  .align-center {
    align-items: center;
  }
  .flex-1 {
    flex: 1;
  }
  .flex-column {
    flex-direction: column;
  }
  .height-full {
    height: 100%;
  }
  .width-full {
    width: 100%;
  }
  .mr-3 {
    margin-right: 16px;
  }
  .ml-3 {
    margin-left: 16px;
  }
  .mt-4 {
    margin-top: 24px;
  }
  .py-4 {
    padding: 0 24px;
  }
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
  }
  .sticky {
    position: -webkit-sticky;
    position: sticky;
  }
`;
