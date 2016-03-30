module ContactManagerApp {
  export class MainController {

    static $inject = [
      'userService',
      '$mdSidenav',
      '$mdToast',
      '$mdDialog',
      '$mdMedia',
      '$mdBottomSheet'
    ];

    constructor(
      private userService: IUserService,
      private $mdSidenav: angular.material.ISidenavService,
      private $mdToast: angular.material.IToastService,
      private $mdDialog: angular.material.IDialogService,
      private $mdMedia: angular.material.IMedia,
      private $mdBottomSheet: angular.material.IBottomSheetService) {
      var self = this;

      this.userService
        .loadAllUsers()
        .then((users: User[]) => {
          self.users = users;
          self.selectUser(users[0]);
          console.log(self.users);
        });
    }

    users: User[] = [];
    selected: User = null;
    message: string = "Hello from main controller";
    searchText: string = '';
    tabIndex: number = 0;
    newNote: Note = new Note('', null);
    formScope: any;

    setFormScope(scope) {
      this.formScope = scope;
    }

    toggleSidenav(): void {
      this.$mdSidenav('left').toggle();
    }

    selectUser(user: User): void {
      this.selected = user;
      this.userService.selectedUser = this.selected;
      var sidenav = this.$mdSidenav('left');
      if(sidenav.isOpen()) {
        sidenav.close();
      }
      this.tabIndex = 0;
    }

    showContactOptions($event) {
      this.$mdBottomSheet.show({
        parent: angular.element(document.getElementById('wrapper')),
        templateUrl: '../dist/views/contactSheet.html',
        controller: ContactPanelController,
        controllerAs: 'cp',
        bindToController: true,
        targetEvent: $event
      }).then((clickItem) => {
        clickItem && console.log(clickItem.name + 'clicked!');
      });
    }

    addUser($event) {
      var self = this;
      // Check device screen
      // if it is a mobile device, show full screen dialog
      // if not, show dialog
      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));

      this.$mdDialog.show({
        templateUrl: '../dist/views/newUserDialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        controller: AddNewUserDialogController,
        controllerAs: 'ctrl',
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      }).then((user: CreateUser) => {
        var newUser: User = User.fromCreate(user);
        self.users.push(newUser);
        self.openToast('User has been created');
      }, () => {
        console.log('You cancelled the dialog');
      });

    }

    removeNote(note: Note): void {
      var foundIndex = this.selected.notes.indexOf(note);
      this.selected.notes.splice(foundIndex, 1);
      this.openToast('Note removed.');
    }

    addNote() {
      this.selected.notes.push(this.newNote);
      this.newNote = new Note('', null);
      this.openToast("Note added");

      // Reset note form
      this.formScope.noteForm.$setUntouched();
      this.formScope.noteForm.$setPristine();
    }

    clearNotes($event) {
      var confirm = this.$mdDialog.confirm()
        .title('Are you sure you want to delete all notes?')
        .textContent('All notes will be deleted')
        .targetEvent($event)
        .ok('Yes')
        .cancel('No');

        var self = this;
        this.$mdDialog.show(confirm).then(() => {
          self.selected.notes = [];
          self.openToast('All notes deleted');
        });
    }

    openToast(message: string): void {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(message)
          .position("top right")
          .hideDelay(3000)
      );
    }

  }
}
