import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly billingFirstName: Locator;
  readonly billingLastName: Locator;
  readonly billingAddress: Locator;
  readonly billingCity: Locator;
  readonly billingPostcode: Locator;
  readonly billingPhone: Locator;
  readonly billingEmail: Locator;
  
  readonly placeOrderButton: Locator;
  readonly errorMessages: Locator;
  
  readonly paymentMethodsList: Locator;
  readonly shippingMethodsList: Locator;
  
  constructor(page: Page) {
    super(page);

    this.billingFirstName = page.locator('#billing_first_name');
    this.billingLastName = page.locator('#billing_last_name');
    this.billingAddress = page.locator('#billing_address_1');
    this.billingCity = page.locator('#billing_city');
    this.billingPostcode = page.locator('#billing_postcode');
    this.billingPhone = page.locator('#billing_phone');
    this.billingEmail = page.locator('#billing_email');

    this.placeOrderButton = page.locator('#place_order');
    this.errorMessages = page.locator('.woocommerce-error li');

    this.paymentMethodsList = page.locator('.wc_payment_methods li');
    this.shippingMethodsList = page.locator('#shipping_method li');
  }

  async goToCheckout() {
    await this.goto('/zamowienie');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillRequiredFields() {
    await this.billingFirstName.fill('TestName');
    await this.billingLastName.fill('TestLastName');
    await this.billingAddress.fill('Testowa 123');
    await this.billingCity.fill('Testowo');
    await this.billingPostcode.fill('00-000');
    await this.billingPhone.fill('123456789');
    await this.billingEmail.fill('test@example.com');
  }
}
