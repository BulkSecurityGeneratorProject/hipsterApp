import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Product e2e test', () => {

    let navBarPage: NavBarPage;
    let productDialogPage: ProductDialogPage;
    let productComponentsPage: ProductComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle()).toMatch(/hipsterappApp.product.home.title/);

    });

    it('should load create Product dialog', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage = new ProductDialogPage();
        expect(productDialogPage.getModalTitle()).toMatch(/hipsterappApp.product.home.createOrEditLabel/);
        productDialogPage.close();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage.setNameInput('name');
        expect(productDialogPage.getNameInput()).toMatch('name');
        productDialogPage.setPictureInput('picture');
        expect(productDialogPage.getPictureInput()).toMatch('picture');
        productDialogPage.setCityInput('city');
        expect(productDialogPage.getCityInput()).toMatch('city');
        productDialogPage.setProviderInput('provider');
        expect(productDialogPage.getProviderInput()).toMatch('provider');
        productDialogPage.setPriceInput('5');
        expect(productDialogPage.getPriceInput()).toMatch('5');
        productDialogPage.setRatingInput('5');
        expect(productDialogPage.getRatingInput()).toMatch('5');
        productDialogPage.setStarsInput('5');
        expect(productDialogPage.getStarsInput()).toMatch('5');
        productDialogPage.setDescriptionInput('description');
        expect(productDialogPage.getDescriptionInput()).toMatch('description');
        productDialogPage.setDistanceInput('5');
        expect(productDialogPage.getDistanceInput()).toMatch('5');
        productDialogPage.getActiveInput().isSelected().then(function (selected) {
            if (selected) {
                productDialogPage.getActiveInput().click();
                expect(productDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                productDialogPage.getActiveInput().click();
                expect(productDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        productDialogPage.save();
        expect(productDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductDialogPage {
    modalTitle = element(by.css('h4#myProductLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    pictureInput = element(by.css('input#field_picture'));
    cityInput = element(by.css('input#field_city'));
    providerInput = element(by.css('input#field_provider'));
    priceInput = element(by.css('input#field_price'));
    ratingInput = element(by.css('input#field_rating'));
    starsInput = element(by.css('input#field_stars'));
    descriptionInput = element(by.css('input#field_description'));
    distanceInput = element(by.css('input#field_distance'));
    activeInput = element(by.css('input#field_active'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setPictureInput = function (picture) {
        this.pictureInput.sendKeys(picture);
    }

    getPictureInput = function () {
        return this.pictureInput.getAttribute('value');
    }

    setCityInput = function (city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function () {
        return this.cityInput.getAttribute('value');
    }

    setProviderInput = function (provider) {
        this.providerInput.sendKeys(provider);
    }

    getProviderInput = function () {
        return this.providerInput.getAttribute('value');
    }

    setPriceInput = function (price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function () {
        return this.priceInput.getAttribute('value');
    }

    setRatingInput = function (rating) {
        this.ratingInput.sendKeys(rating);
    }

    getRatingInput = function () {
        return this.ratingInput.getAttribute('value');
    }

    setStarsInput = function (stars) {
        this.starsInput.sendKeys(stars);
    }

    getStarsInput = function () {
        return this.starsInput.getAttribute('value');
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }

    setDistanceInput = function (distance) {
        this.distanceInput.sendKeys(distance);
    }

    getDistanceInput = function () {
        return this.distanceInput.getAttribute('value');
    }

    getActiveInput = function () {
        return this.activeInput;
    }
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
