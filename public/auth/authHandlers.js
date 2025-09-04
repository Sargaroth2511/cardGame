// Authentication and name entry overlays
// Depends on globals from declarations and Firebase SDK: firebase, nameForm, nameField,
// nameOuter2, signInForm, signInOuter2, onlineName, currentUser, uniqueOnlineName,
// db, setDBdocs

(function () {
  function initAuthHandlers() {
    if (typeof nameForm !== 'undefined' && nameForm) {
      nameForm.addEventListener('submit', onSubmitNameForm);
    }
    if (typeof signInForm !== 'undefined' && signInForm) {
      signInForm.addEventListener('submit', onSubmitSignInForm);
    }
    if (typeof nameBackbtn !== 'undefined' && nameBackbtn) {
      nameBackbtn.addEventListener('click', () => { if (nameOuter2) nameOuter2.style.display = 'none'; });
    }
  }

  function onSubmitNameForm(e) {
    e.preventDefault();
    const invalidCharRE = /[^a-zA-Z0-9_-]/;
    const invalid = invalidCharRE.test(nameField.value);
    if (invalid) {
      alert('Es sind leider keine Leerzeichen oder Sonderzeichen erlaubt');
      return;
    }
    onlineName = nameField.value;
    localStorage.setItem('userName', onlineName);
    currentUser = firebase.auth().currentUser;
    uniqueOnlineName = onlineName + currentUser.uid;
    db.collection('Users').doc(uniqueOnlineName).set({
      UserId: currentUser.uid,
      UserName: onlineName,
      startNumber: 0,
      isRdy: '',
      Cards: JSON.parse(JSON.stringify(cardIds))
    })
      .then(() => { if (typeof setDBdocs === 'function') setDBdocs(); })
      .catch(error => { console.error('Error writing document: ', error); });
    if (nameOuter2) nameOuter2.style.display = 'none';
  }

  function onSubmitSignInForm(e) {
    e.preventDefault();
    if (signInForm.SignIn.value === 'Google') {
      loginWithGoogle();
    } else if (signInForm.SignIn.value === 'Anonym') {
      loginAnonymously();
    } else {
      console.log('No SignIn Method chosen');
    }
  }

  function loginWithGoogle() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (signInOuter2) signInOuter2.style.display = 'none';
        if (!onlineName && nameOuter2) nameOuter2.style.display = 'grid';
      } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(result => {
            const user = result.user;
            if (signInOuter2) signInOuter2.style.display = 'none';
            if (!onlineName && nameOuter2) nameOuter2.style.display = 'grid';
          })
          .catch(console.log)
      }
    });
  }

  function loginAnonymously() {
    firebase.auth().signInAnonymously()
      .then(result => {
        const user = result.user;
        if (nameOuter2) nameOuter2.style.display = 'grid';
        if (signInOuter2) signInOuter2.style.display = 'none';
        console.log(user)
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  window.initAuthHandlers = initAuthHandlers;
})();

