import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('author', {path: '/authors'}, function() {
    this.route('detail', { path: '/:id'});
    this.route('create');
    this.route('edit',{ path: '/:id/edit'});
  });
  this.route('404', {path: '*path'});
  this.route('error', { path: '/:error'});
});

export default Router;
