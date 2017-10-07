import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { HomeComponent } from './';

import { ProductExampleComponent } from '../entities/product/product-example.component';
import { Routes, } from '@angular/router';

// export const HOME_ROUTE: Route = {
//     path: '',
//     component: HomeComponent,
//     data: {
//         authorities: [],
//         pageTitle: 'home.title'
//     }
// };

export const HOME_ROUTE: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    }, {
        path: 'productexample',
        component: ProductExampleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipsterappApp.product.home.title'
        }
        // ,
        // canActivate: [UserRouteAccessService]
    }
]
