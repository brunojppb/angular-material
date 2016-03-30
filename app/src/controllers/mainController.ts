module ContactManagerApp {
  export class MainController {

    static $inject = [
      'userService',
      '$mdSidenav',
      '$mdToast'
    ];

    constructor(
      private userService: IUserService,
      private $mdSidenav: angular.material.ISidenavService,
      private $mdToast: angular.material.IToastService) {
      var self = this;

      this.userService
        .loadAllUsers()
        .then((users: User[]) => {
          self.users = users;
          self.selected = users[0];
          console.log(self.users);
        });
    }

    users: User[] = [];
    selected: User = null;
    message: string = "Hello from main controller";
    searchText: string = '';
    tabIndex: number = 0;

    toggleSidenav(): void {
      this.$mdSidenav('left').toggle();
    }

    selectUser(user: User): void {
      this.selected = user;
      var sidenav = this.$mdSidenav('left');
      if(sidenav.isOpen()) {
        sidenav.close();
      }
      this.tabIndex = 0;
    }

    removeNote(note: Note): void {
      var foundIndex = this.selected.notes.indexOf(note);
      this.selected.notes.splice(foundIndex, 1);
      this.openToast('Note removed.');
    }

    openToast(message: string): void {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(message)
          .position('top left')
          .hideDelay(3000)
      );
    }

  }
}
