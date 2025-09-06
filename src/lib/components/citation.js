export class BookCitation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render()
  }

  render() {
    const source = this.getAttribute('source');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .book-citation {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .citation-bg {
          width: 80%;
          height: 100%;
          border-radius: 10px;
          box-shadow: 0 1mm 4mm hsla(197, 67%, 41%, 0.26);
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          border-radius: 10px;
          border-width: 4px;
          border-style: solid;
          border-color: transparent;
          background-color: hsla(225deg, 30%, 24%, 1);
        }

        .citation-source {
          padding: 0.6rem;
          font-weight: bold;
          text-align: left;
          line-height: 1.33;
          text-transform: uppercase;
          font-family: var(--heading-font, Arial, sans-serif);
          font-size: 1.03rem;
          letter-spacing: 0.6px;
          color: white;
        }

        .citation-content {
          padding: 1rem;
          border-radius: 10px;
          background-color: #b0b0bf;
          border-color: hsla(225deg, 30%, 24%, 1);
          color: #161418;
        }

        .citation-content p > code,
        .citation-content p {
          padding: 2px 0px;
          text-align: justify;
          margin-bottom: 2rem;
          font-weight: bold;
        }

        .citation-content ::slotted(*) {
          margin: 0;
        }

        .citation-content ::slotted(p) {
          padding: 2px 0px;
          text-align: justify;
          margin-bottom: 2rem;
          font-weight: bold;
        }

        .citation-content ::slotted(p > code) {
          padding: 2px 0px;
          text-align: justify;
          margin-bottom: 2rem;
          font-weight: bold;
        }
      </style>

      <div class="book-citation">
        <div class="citation-bg">
          <div class="citation-source">
            <span>${source}</span>
          </div>
          <div class="citation-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('custom-citation', BookCitation);
