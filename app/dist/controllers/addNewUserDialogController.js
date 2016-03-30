var ContactManagerApp;
(function (ContactManagerApp) {
    var AddNewUserDialogController = (function () {
        function AddNewUserDialogController($mdDialog) {
            this.$mdDialog = $mdDialog;
        }
        AddNewUserDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        AddNewUserDialogController.prototype.save = function () {
            this.$mdDialog.hide(new ContactManagerApp.User("Placeholder", "", "", []));
        };
        AddNewUserDialogController.$inject = ['$mdDialog'];
        return AddNewUserDialogController;
    }());
    ContactManagerApp.AddNewUserDialogController = AddNewUserDialogController;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=addNewUserDialogController.js.map