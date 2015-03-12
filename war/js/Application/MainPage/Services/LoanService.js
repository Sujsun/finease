(function(root) {

	var models = {};
	var jsonMap = {};
	var getDeferreds = {};
	var loansBySubAccountId = {};
	var getAllDeferred = new root.dfrd.Deferred();

	function LoanService() {

		var factory = new root.LoanFactory();

		function get(id) {
			var deferred = new root.dfrd.Deferred();
			var model = _get(id);
			var getDeferred = getDeferreds[id];
			if (model) {
				// If we have the already fetched, then return the value.
				deferred.resolve.call(deferred, model);
			} else if (getDeferred) {
				// If already made the service call, then just return the deferred,
				deferred = getDeferred;
			} else {
				// If we have no data regarding the given id, then make the service call.
				deferred = factory.get(id)
					.done(function(model) {
						_add(model);
					});
				getDeferreds[id] = deferred;
			}
			deferred
				.always(function(model) {
					if (model) {
						delete getDeferreds[model.attr('id')];
					}
				});
			return deferred;
		}

		function getBySubAccountId(subAccountId) {
			return new getBySubAccountIdClass(subAccountId)
				.done(function() {
					getAllDeferred.resolve(models);
				})
				.fail(function() {
					getAllDeferred.reject.apply(getAllDeferred, arguments);
				});
		}

		function getBySubAccountIdClass(subAccountId) {
			var deferred = new root.dfrd.Deferred();
			var models = loansBySubAccountId[subAccountId];
			var getDeferred = getDeferreds[subAccountId];
			if (models) {
				// If we have the already fetched, then return the value.
				deferred.resolve.call(deferred, models);
			} else if (getDeferred) {
				// If already made the service call, then just return the deferred,
				deferred = getDeferred;
			} else {
				// If we have no data regarding the given id, then make the service call.
				deferred = factory.getBySubAccountId(subAccountId)
					.done(function(models) {
						loansBySubAccountId[subAccountId] = models;
						for (var index in models) {
							var model = models[index];
							_add(model);
						}
					});
				getDeferreds[subAccountId] = deferred;
			}
			deferred
				.always(function(contactModels) {
					delete getDeferreds[subAccountId];
				});
			return deferred;
		}

		function put(model) {
			return (_get(model.attr('id')) ? update(model) : create(model));
		}

		function create(model) {
			return factory.create(model)
				.done(function(model) {
					_add(model);
				});
		}

		function update(model) {
			return factory.update(model)
				.done(function(model) {
					_add(model);
				});
		}

		function remove(model) {
			return factory.remove(model)
				.done(function(model) {
					_remove(model);
				});
		}

		function _add(model) {
			models[model.attr('id')] = model;
			jsonMap[model.attr('id')] = model.toJSON();
		}

		function _get(id) {
			return models[id];
		}

		function _remove(model) {
			delete models[model.attr('id')];
			delete jsonMap[model.attr('id')];
		}

		function toJSON() {
			return jsonMap;
		}

		function toArray() {
			return root.ObjectUtil.toArray(jsonMap);
		}

		function getAll() {
			return getAllDeferred;
		}

		return {
			get: get,
			getBySubAccountId: getBySubAccountId,
			put: put,
			remove: remove,
			toJSON: toJSON,
			toArray: toArray,
			getAll: getAll,
		};

	}

	root['LoanService'] = LoanService;

})(window);