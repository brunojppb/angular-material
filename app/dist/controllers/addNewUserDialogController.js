var ContactManagerApp;
(function (ContactManagerApp) {
    var AddNewUserDialogController = (function () {
        function AddNewUserDialogController($mdDialog) {
            this.$mdDialog = $mdDialog;
            this.avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
        }
        AddNewUserDialogController.prototype.cancel = function () {
            this.$mdDialog.cancel();
        };
        AddNewUserDialogController.prototype.save = function () {
            this.$mdDialog.hide(this.user);
        };
        AddNewUserDialogController.$inject = ['$mdDialog'];
        return AddNewUserDialogController;
    }());
    ContactManagerApp.AddNewUserDialogController = AddNewUserDialogController;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=addNewUserDialogController.js.map