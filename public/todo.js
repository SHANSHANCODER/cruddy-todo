
// Todo Model //////////////////////////////////////////////////////////////////

window.Todo = {

  url: '/todo',

  // Create (Crud) -- collection
  //might need to change the callback to somehow retrain the informaiton?

  create: function(text, callback) {
    return $.ajax({
      url: this.url,
      type: 'POST',
      dataType: 'json',
      data: {todoText: text},
      success: callback
    });
  },

  // Read all (cRud) -- collection
  readAll: function(callback) {
    return $.ajax({
      url: this.url,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  },

  // Read one (cRud) -- member
  readOne: function(id, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  },

  // Update (crUd) -- member
  /*      10) should not change the counter
      11) should update the todo text for existing todo
      */
  update: function(id, text, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'PUT',
      dataType: 'json',
      data: {todoText: text},
      success: callback
    });
  },
  // 12) should not change the counter
  // Delete (cruD) -- member
  delete: function(id, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'DELETE',
      dataType: 'json',
      success: callback
    });
  }
};
