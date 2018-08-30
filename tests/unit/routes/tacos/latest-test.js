import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | tacos/latest', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:tacos/latest');
    assert.ok(route);
  });
});
