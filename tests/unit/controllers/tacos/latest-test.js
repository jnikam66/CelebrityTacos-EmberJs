import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | tacos/latest', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:tacos/latest');
    assert.ok(controller);
  });
});
