
export class Auth {
  constructor() {
    this.user = null;
    this.additionRole = null;
    this.error = null;
  }

  onAuthStateChanged(cb) {
    this.cb = cb;
    return () => {
      this.cb = null;
    };
  }

  onUserChange(user, additionRole, error) {
    this.cb && this.cb(user, additionRole, error);
  }


  resolveUser(timeout) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.localStorage.getItem("token");
        const additionRole = window.localStorage.getItem("additionRole");
        if (signedInUser) {
          this.user = signedInUser;
          this.additionRole = additionRole;
        }
      } else {
        this.user = null;
        this.additionRole = null;
      }
      this.onUserChange(this.user, this.additionRole);
    }, timeout);

    return this;
  }
}