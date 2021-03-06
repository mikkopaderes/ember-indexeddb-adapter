import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | delete record', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
    window.indexedDB.deleteDatabase('DummyDatabase');
  }
});

test('delete-record works', function(assert) {
  assert.expect(2);

  visit('/posts');

  click('a:contains("Dummy 1")');
  click('div:contains("Delete Post")');
  
  andThen(function() {
    // Give 500ms for all promises to finish as an ugly workaround to avoid
    // inFlight errors
    Ember.run.later(() => {
      assert.equal(currentURL(), '/posts');
      assert.ok(find('#find-all a:contains("Dummy 1")').length === 0);
    }, 500);
  });
});
