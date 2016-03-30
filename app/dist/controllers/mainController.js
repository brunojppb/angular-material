var ContactManagerApp;
(function (ContactManagerApp) {
    var MainController = (function () {
        function MainController(userService, $mdSidenav, $mdToast, $mdDialog) {
            this.userService = userService;
            this.$mdSidenav = $mdSidenav;
            this.$mdToast = $mdToast;
            this.$mdDialog = $mdDialog;
            this.users = [];
            this.selected = null;
            this.message = "Hello from main controller";
            this.searchText = '';
            this.tabIndex = 0;
            var self = this;
            this.userService
                .loadAllUsers()
                .then(function (users) {
                self.users = users;
                self.selected = users[0];
                console.log(self.users);
            });
        }
        MainController.prototype.toggleSidenav = function () {
            this.$mdSidenav('left').toggle();
        };
        MainController.prototype.selectUser = function (user) {
            this.selected = user;
            var sidenav = this.$mdSidenav('left');
            if (sidenav.isOpen()) {
                sidenav.close();
            }
            this.tabIndex = 0;
        };
        MainController.prototype.removeNote = function (note) {
            var foundIndex = this.selected.notes.indexOf(note);
            this.selected.notes.splice(foundIndex, 1);
            this.openToast('Note removed.');
        };
        MainController.prototype.clearNotes = function ($event) {
            var confirm = this.$mdDialog.confirm()
                .title('Are you sure you want to delete all notes?')
                .textContent('All notes will be deleted')
                .targetEvent($event)
                .ok('Yes')
                .cancel('No');
            var self = this;
            this.$mdDialog.show(confirm).then(function () {
                self.selected.notes = [];
                self.openToast('All notes deleted');
            });
        };
        MainController.prototype.openToast = function (message) {
            this.$mdToast.show(this.$mdToast.simple()
                .textContent(message)
                .position('top left')
                .hideDelay(3000));
        };
        MainController.$inject = [
            'userService',
            '$mdSidenav',
            '$mdToast',
            '$mdDialog'
        ];
        return MainController;
    }());
    ContactManagerApp.MainController = MainController;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=mainController.js.map