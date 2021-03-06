var ContactManagerApp;
(function (ContactManagerApp) {
    var MainController = (function () {
        function MainController(userService, $mdSidenav, $mdToast, $mdDialog, $mdMedia, $mdBottomSheet) {
            this.userService = userService;
            this.$mdSidenav = $mdSidenav;
            this.$mdToast = $mdToast;
            this.$mdDialog = $mdDialog;
            this.$mdMedia = $mdMedia;
            this.$mdBottomSheet = $mdBottomSheet;
            this.users = [];
            this.selected = null;
            this.message = "Hello from main controller";
            this.searchText = '';
            this.tabIndex = 0;
            this.newNote = new ContactManagerApp.Note('', null);
            var self = this;
            this.userService
                .loadAllUsers()
                .then(function (users) {
                self.users = users;
                self.selectUser(users[0]);
                console.log(self.users);
            });
        }
        MainController.prototype.setFormScope = function (scope) {
            this.formScope = scope;
        };
        MainController.prototype.toggleSidenav = function () {
            this.$mdSidenav('left').toggle();
        };
        MainController.prototype.selectUser = function (user) {
            this.selected = user;
            this.userService.selectedUser = this.selected;
            var sidenav = this.$mdSidenav('left');
            if (sidenav.isOpen()) {
                sidenav.close();
            }
            this.tabIndex = 0;
        };
        MainController.prototype.showContactOptions = function ($event) {
            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById('wrapper')),
                templateUrl: 'dist/views/contactSheet.html',
                controller: ContactManagerApp.ContactPanelController,
                controllerAs: 'cp',
                bindToController: true,
                targetEvent: $event
            }).then(function (clickItem) {
                clickItem && console.log(clickItem.name + 'clicked!');
            });
        };
        MainController.prototype.addUser = function ($event) {
            var self = this;
            // Check device screen
            // if it is a mobile device, show full screen dialog
            // if not, show dialog
            var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
            this.$mdDialog.show({
                templateUrl: 'dist/views/newUserDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: ContactManagerApp.AddNewUserDialogController,
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            }).then(function (user) {
                var newUser = ContactManagerApp.User.fromCreate(user);
                self.users.push(newUser);
                self.openToast('User has been created');
            }, function () {
                console.log('You cancelled the dialog');
            });
        };
        MainController.prototype.removeNote = function (note) {
            var foundIndex = this.selected.notes.indexOf(note);
            this.selected.notes.splice(foundIndex, 1);
            this.openToast('Note removed.');
        };
        MainController.prototype.addNote = function () {
            this.selected.notes.push(this.newNote);
            this.newNote = new ContactManagerApp.Note('', null);
            this.openToast("Note added");
            // Reset note form
            this.formScope.noteForm.$setUntouched();
            this.formScope.noteForm.$setPristine();
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
                .position("top right")
                .hideDelay(3000));
        };
        MainController.$inject = [
            'userService',
            '$mdSidenav',
            '$mdToast',
            '$mdDialog',
            '$mdMedia',
            '$mdBottomSheet'
        ];
        return MainController;
    }());
    ContactManagerApp.MainController = MainController;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=mainController.js.map