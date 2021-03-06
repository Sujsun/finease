(function (root) {
    'use strict';
    function ContactFactory() {

        var self = this, contactPath = '/localContact';

        function get(id) {
            var deferred = new root.dfrd.Deferred();
            root.AJAXUtil.call(contactPath + '?id=' + id, 'get')
                .done(function (data) {
                    deferred.resolve(new root.ContactModel(data));
                })
                .fail(function () {
                    deferred.reject.apply(deferred, arguments);
                });
            return deferred;
        }

        function getBySubAccountId(subAccountId) {
            var deferred = new root.dfrd.Deferred();
            root.AJAXUtil.call(contactPath + '?subAccountId=' + subAccountId, 'get')
                .done(function (data) {
                    var contactModelArray = [];
                    for (var index in data) {
                        contactModelArray.push(root.ContactModel(data[index]));
                    }
                    deferred.resolve(contactModelArray);
                })
                .fail(function() {
                    deferred.reject.apply(deferred, arguments);
                });
            return deferred;
        }

        function create(contactModel) {
            var deferred = new dfrd.Deferred();
            root.AJAXUtil.call(contactPath, 'post', contactModel.toJSON())
                .done(function(data) {
                    deferred.resolve(new root.ContactModel(data));
                })
                .fail(function() {
                    deferred.reject.apply(deferred, arguments);
                });
            return deferred;
        }

        function update(contactModel) {
            var deferred = new dfrd.Deferred();
            root.AJAXUtil.call(contactPath, 'put', contactModel.toJSON())
                .done(function(data) {
                    deferred.resolve(new root.ContactModel(data));
                })
                .fail(function() {
                    deferred.reject.apply(deferred, arguments);
                });
            return deferred;
        }

        function remove(contactModel) {
            var deferred = new dfrd.Deferred();
            root.AJAXUtil.call(contactPath, 'delete', contactModel.toJSON())
                .done(function(data) {
                    deferred.resolve(new root.ContactModel(data));
                })
                .fail(function() {
                    deferred.reject.apply(deferred, arguments);
                });
            return deferred;
        }

        return {
            get: get,
            getBySubAccountId: getBySubAccountId,
            create: create,
            update: update,
            remove: remove,
        };

    }

    root['ContactFactory'] = ContactFactory;

})(window);