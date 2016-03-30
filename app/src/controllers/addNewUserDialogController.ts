module ContactManagerApp {
  export class AddNewUserDialogController {

    static $inject = ['$mdDialog'];

    constructor(private $mdDialog){}

    cancel(): void {
      this.$mdDialog.cancel();
    }

    save(): void {
      this.$mdDialog.hide(new User("Placeholder", "", "", []));
    }

  }
}
