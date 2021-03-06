import React           from 'react';
import { Route }       from 'react-router-dom';

import AllMerchPage    from '../modules/musician/pages/all_merch_page';
import AllEventsPage   from '../modules/musician/pages/all_events_page';
import ProductPage     from '../modules/merch/pages/product_page';
import ProfileHomePage from '../modules/musician/pages/profile_home_page';
import OrderForm       from '../modules/merch/forms/order_form';

export default (
  <React.Fragment>
    <Route exact path="/musicians/:id"                  component={ProfileHomePage} />
    <Route exact path="/musicians/:id/merch"            component={AllMerchPage} />
    <Route exact path="/musicians/:id/events"           component={AllEventsPage} />
    <Route exact path="/musicians/:id/merch/:productId" component={ProductPage} />
    <Route exact path="/musicians/:id/checkout"         component={OrderForm} />
  </React.Fragment>
);
