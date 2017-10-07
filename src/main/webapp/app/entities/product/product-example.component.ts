import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

import {ElementRef, Renderer2} from '@angular/core';

@Component({
    selector: 'jhi-product',
    templateUrl: './product-example.component.html',
    styleUrls: [
        'product-example.scss'
    ]
})
export class ProductExampleComponent implements OnInit, OnDestroy {
    products: Product[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productService: ProductService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private rd: Renderer2
    ) {
    }

    loadAll() {
        this.productService.query().subscribe(
            (res: ResponseWrapper) => {
                this.products = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        const style = document.getElementsByTagName('style');
        style[0].parentNode.removeChild(style[0]);
        const bootstrapLegacy = document.getElementsByClassName('bootstrapLegacy');
        bootstrapLegacy[0].parentNode.removeChild(bootstrapLegacy[0]);
        bootstrapLegacy[0].parentNode.removeChild(bootstrapLegacy[0]);

        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Product) {
        return item.id;
    }
    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe('productListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
    removeProduct(id: number) {
        this.productService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
        });
    }
    hideAll(cards: any, hide: boolean) {
        for (let i = 0; i < cards.length; i++) {
            // const obj = cards[i];
            // Object.assign({}, cards[i]);
            const card = cards[i];
            if (hide) {
                this.rd.addClass(card.firstElementChild.firstElementChild, 'faded');
            } else {
                this.rd.removeClass(card.firstElementChild.firstElementChild, 'faded');
            }
        }
    }
    showProductDetails(id: number, e: any) {

        // console.log('showProductDetails', e.target.className, e);
        let card, icon, desc, img, classToCheck, cardContainer;
        const parent = e.target.parentElement;
        const ppp = parent.parentElement.parentElement.parentElement;

        if (e.target.className === 'fa fa-bars' ||
            e.target.className === 'fa fa-arrow-left') {
            classToCheck = e.target.className;
            card = parent.parentElement;
            icon = parent.children[0];
            desc = parent.previousElementSibling.children[1];
            img = parent.previousElementSibling.children[0].children[0];
            cardContainer = ppp.parentElement.children;

        } else if (e.target.className === 'mc-btn-action') {
            classToCheck = e.target.children[0].className;
            card = parent;
            icon = e.target.children[0];
            desc = e.target.previousElementSibling.children[1];
            img = e.target.previousElementSibling.children[0].children[0];

            cardContainer = ppp.children;

        }
        // console.log('cardContainer', cardContainer);

        if (classToCheck === 'fa fa-bars') {
            this.hideAll(cardContainer, true);
            this.rd.removeClass(card, 'faded');

            img.classList.add('img-responsive-small');
            card.classList.add('mc-active');
            icon.classList.add('fa-spin-fast');
            window.setTimeout(function() {
                icon.classList.remove('fa-bars');
                icon.classList.remove('fa-spin-fast');
                icon.classList.add('fa-arrow-left');
            }, 800);
        } else {

            this.hideAll(cardContainer, false);

            img.classList.remove('img-responsive-small');
            card.classList.remove('mc-active');
            window.setTimeout(function() {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-spin-fast');
                icon.classList.remove('fa-arrow-left');
            }, 800);
        }
    }
}
