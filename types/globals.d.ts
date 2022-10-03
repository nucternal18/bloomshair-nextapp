declare global {
  interface Window {
    paypal?: any;
    Square?: any;
    Snipcart: any;
  }

  namespace JSX {
    interface IntrinsicElements {
      "address-fields": any;
      "snipcart-label": any;
      "snipcart-input": any;
    }
  }
}
